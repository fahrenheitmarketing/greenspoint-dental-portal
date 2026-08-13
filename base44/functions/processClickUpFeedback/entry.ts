import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';
import { getClickUpComments, addClickUpComment, getBrandGuideText } from '../../shared/clickup.ts';

const ROUTE_SCHEMA = {
  type: 'object',
  properties: {
    post_indices: { type: 'array', items: { type: 'number' } },
    action: { type: 'string', enum: ['approve_publish', 'approve_schedule', 'edit_copy', 'edit_image', 'no_action'] },
    notes: { type: 'string' },
    revised_copy: { type: 'string' },
    image_instruction: { type: 'string' },
  },
  required: ['post_indices', 'action', 'notes'],
};

export default async function (req) {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user || user.role !== 'admin') {
      return Response.json({ error: 'Admin access required' }, { status: 403 });
    }

    const settingsList = await base44.asServiceRole.entities.SocialMediaSettings.list();
    const brandGuide = settingsList[0] ? await getBrandGuideText(base44, settingsList[0]) : '';

    const allPosts = await base44.asServiceRole.entities.SocialPost.filter({});
    const relevant = allPosts.filter((p) => p.clickup_task_id && !['published', 'scheduled'].includes(p.status));

    // Group posts by their shared ClickUp task ID
    const taskGroups = {};
    for (const post of relevant) {
      const tid = post.clickup_task_id;
      if (!taskGroups[tid]) taskGroups[tid] = [];
      taskGroups[tid].push(post);
    }

    let processedCount = 0;
    const summaries = [];

    for (const [taskId, taskPosts] of Object.entries(taskGroups)) {
      const comments = await getClickUpComments(base44, taskId);

      // Build the set of comment IDs already processed by ANY post in this task
      const allProcessed = new Set();
      for (const p of taskPosts) {
        (p.processed_comment_ids || []).forEach((id) => allProcessed.add(id));
      }
      const newComments = comments.filter((c) => !allProcessed.has(c.id) && c.comment_text);

      if (newComments.length === 0) continue;

      // Build a manifest so the LLM can route each comment to the right post
      const manifest = taskPosts.map((p, i) => `${i}: ${p.platform} - ${p.scheduled_date || 'undated'} - ${p.topic}`).join('\n');

      // Track per-post updates to batch at the end
      const updates = {}; // postId -> { content?, status?, image_url?, newProcessedIds: [] }
      const taskChanges = []; // per-comment change descriptions for the reply comment

      for (const post of taskPosts) {
        updates[post.id] = { newProcessedIds: [...(post.processed_comment_ids || [])] };
      }

      for (const comment of newComments) {
        const routing = await base44.asServiceRole.integrations.Core.InvokeLLM({
          prompt: `A reviewer left this comment on a ClickUp task containing multiple social media posts:

"${comment.comment_text}"

Available posts in this task (index - platform - date - topic):
${manifest}

Determine:
1. post_indices: which post(s) this comment refers to, using the index numbers above. Use [-1] if it applies to ALL posts generally.
2. action: classify the intent —
   - "approve_publish" (comment says approved for publishing)
   - "approve_schedule" (comment says approved for scheduling)
   - "edit_copy" (comment asks to change wording — provide the full revised_copy)
   - "edit_image" (comment asks for a different/new image — provide image_instruction)
   - "no_action" (just a question/note with nothing actionable)
3. If edit_copy: revised_copy = the full revised post copy.
4. If edit_image: image_instruction = what to change about the image.

Brand guide for reference: ${brandGuide}`,
          response_json_schema: ROUTE_SCHEMA,
        });

        const indices = routing.post_indices || [];
        const targets = indices.includes(-1) ? taskPosts : taskPosts.filter((_, i) => indices.includes(i));

        for (const post of targets) {
          const u = updates[post.id];
          if (routing.action === 'approve_publish' || routing.action === 'approve_schedule') {
            u.status = 'approved';
          } else if (routing.action === 'edit_copy' && routing.revised_copy) {
            u.content = routing.revised_copy;
          } else if (routing.action === 'edit_image' && routing.image_instruction) {
            try {
              const imgRes = await base44.asServiceRole.integrations.Core.GenerateImage({
                prompt: `${post.brand_compliance_notes ? `Visual direction from creative brief: ${post.brand_compliance_notes}. ` : ''}A welcoming, bright, lifestyle photo for a ${post.platform} dental practice post about "${post.topic}". The post copy is: "${post.content}". Create an image that VISUALLY REPRESENTS this content — the image must directly reflect the message, not be a generic stock photo. If the post is about the dental office, staff, or "behind the scenes", do NOT show staff or a clinic — instead use a relevant visual metaphor like a welcoming front door with morning sunlight, a tidy desk with coffee, a sunrise over the neighborhood, or a "we're here for you" community scene. Ensure the image is anatomically correct and logically coherent — no extra limbs, no distorted faces, no physically impossible objects. Prefer simple, clean compositions with at most one or two people to avoid AI artifacts. ${brandGuide} When people are shown, feature Hispanic/Latino individuals reflecting the local community. No dental staff, no clinic reception areas, no dentist offices, no dental chairs, no scary tools, no clinical shots, no text in image. Adjust per: ${routing.image_instruction}`,
              });
              u.image_url = imgRes.url;
            } catch (imgErr) {
              console.error('Image regen failed for post', post.id, imgErr.message);
            }
          }
        }

        // Mark this comment as processed on ALL posts in the task (shared task = shared processed set)
        for (const post of taskPosts) {
          updates[post.id].newProcessedIds.push(comment.id);
        }

        summaries.push({
          comment_id: comment.id,
          action: routing.action,
          notes: routing.notes,
          targets: targets.map((t) => t.id),
        });

        // Build a human-readable change description for the reply comment
        const targetLabels = targets.map((t) => `${t.platform} - ${t.scheduled_date || 'undated'}`);
        if (routing.action === 'approve_publish') {
          taskChanges.push(`Approved for publish: ${targetLabels.join(', ')}`);
        } else if (routing.action === 'approve_schedule') {
          taskChanges.push(`Approved for schedule: ${targetLabels.join(', ')}`);
        } else if (routing.action === 'edit_copy') {
          taskChanges.push(`Updated copy for: ${targetLabels.join(', ')}`);
        } else if (routing.action === 'edit_image') {
          taskChanges.push(`Regenerated image for: ${targetLabels.join(', ')}${routing.image_instruction ? ` (${routing.image_instruction})` : ''}`);
        } else {
          taskChanges.push(`No action needed: "${comment.comment_text.slice(0, 80)}"`);
        }
      }

      // Persist all updates for this task
      for (const post of taskPosts) {
        const u = updates[post.id];
        const patch = { processed_comment_ids: u.newProcessedIds };
        if (u.status) patch.status = u.status;
        if (u.content) patch.content = u.content;
        if (u.image_url) patch.image_url = u.image_url;
        await base44.asServiceRole.entities.SocialPost.update(post.id, patch);
      }

      if (taskChanges.length > 0) {
        const reply = `Content Agent: I processed ${newComments.length} new comment(s) on this task.\n\n${taskChanges.map((c) => `- ${c}`).join('\n')}`;
        await addClickUpComment(base44, taskId, reply);
      }

      processedCount++;
    }

    return Response.json({ success: true, tasks_processed: processedCount, summaries });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}