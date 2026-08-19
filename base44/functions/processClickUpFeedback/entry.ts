import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';
import { getClickUpComments, addClickUpComment, getBrandGuideText } from '../../shared/clickup.ts';

const ROUTE_SCHEMA = {
  type: 'object',
  properties: {
    decisions: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          comment_index: { type: 'number', description: 'Index of the comment in the provided comments array' },
          post_indices: { type: 'array', items: { type: 'number' }, description: 'Post indices this comment refers to. Use [-1] if it applies to ALL posts.' },
          action: { type: 'string', enum: ['approve_publish', 'approve_schedule', 'edit_copy', 'edit_image', 'no_action'] },
          revised_copy: { type: 'string', description: 'Full revised post copy if action is edit_copy' },
          image_instruction: { type: 'string', description: 'What to change about the image if action is edit_image' },
        },
        required: ['comment_index', 'post_indices', 'action'],
      },
    },
  },
  required: ['decisions'],
};

export default async function (req) {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user || user.role !== 'admin') {
      return Response.json({ error: 'Admin access required' }, { status: 403 });
    }

    const { taskUrl } = await req.json();
    if (!taskUrl) {
      return Response.json({ error: 'A ClickUp task URL is required' }, { status: 400 });
    }

    // Parse task ID from the ClickUp task URL
    let taskId = null;
    try {
      const u = new URL(taskUrl);
      const parts = u.pathname.split("/").filter(Boolean);
      const taskIdx = parts.indexOf("t");
      if (taskIdx >= 0 && parts.length > taskIdx + 1) {
        // URL format: t/{teamId}/{taskId} — task ID is the LAST segment
        taskId = parts[parts.length - 1];
      }
      if (!taskId) {
        for (let i = 0; i < parts.length; i++) {
          if (parts[i] === "task" && parts[i + 1]) { taskId = parts[i + 1]; break; }
        }
      }
    } catch {}
    if (!taskId) {
      return Response.json({ error: 'Could not parse a task ID from the provided URL' }, { status: 400 });
    }

    const settingsList = await base44.asServiceRole.entities.SocialMediaSettings.list();
    const brandGuide = settingsList[0] ? await getBrandGuideText(base44, settingsList[0]) : '';

    const allPosts = await base44.asServiceRole.entities.SocialPost.filter({});
    const relevant = allPosts.filter(
      (p) => p.clickup_task_id === taskId && !['published', 'scheduled'].includes(p.status)
    );

    // Single task group — only the task ID from the URL
    const taskGroups = {};
    taskGroups[taskId] = relevant;

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
      const commentsBlock = newComments.map((c, i) => `Comment ${i}:\n"${c.comment_text}"`).join('\n\n');

      // Track per-post updates to batch at the end
      const updates = {}; // postId -> { content?, status?, image_instruction?, newProcessedIds: [] }
      const pendingImagePosts = []; // post IDs that need image regeneration
      const taskChanges = []; // per-comment change descriptions for the reply comment

      for (const post of taskPosts) {
        updates[post.id] = { newProcessedIds: [...(post.processed_comment_ids || [])] };
      }

      // Single batched LLM call routes ALL new comments at once
      const batchRouting = await base44.asServiceRole.integrations.Core.InvokeLLM({
        prompt: `A reviewer left the following comments on a ClickUp task containing multiple social media posts:

${commentsBlock}

Available posts in this task (index - platform - date - topic):
${manifest}

For EACH comment, determine:
1. comment_index: the index of the comment (from the numbering above).
2. post_indices: which post(s) that comment refers to, using the index numbers above. Use [-1] if it applies to ALL posts generally.
3. action: classify the intent —
   - "approve_publish" (comment says approved for publishing)
   - "approve_schedule" (comment says approved for scheduling)
   - "edit_copy" (comment asks to change wording — provide the full revised_copy)
   - "edit_image" (comment asks for a different/new image — provide image_instruction)
   - "no_action" (just a question/note with nothing actionable)
4. If edit_copy: revised_copy = the full revised post copy.
5. If edit_image: image_instruction = what to change about the image.

Return one decision object per comment in the "decisions" array.

Brand guide for reference: ${brandGuide}`,
        response_json_schema: ROUTE_SCHEMA,
      });

      const decisions = batchRouting.decisions || [];

      for (const decision of decisions) {
        const comment = newComments[decision.comment_index];
        if (!comment) continue;

        const indices = decision.post_indices || [];
        const targets = indices.includes(-1) ? taskPosts : taskPosts.filter((_, i) => indices.includes(i));

        for (const post of targets) {
          const u = updates[post.id];
          if (decision.action === 'approve_publish' || decision.action === 'approve_schedule') {
            u.status = 'approved';
          } else if (decision.action === 'edit_copy' && decision.revised_copy) {
            u.content = decision.revised_copy;
          } else if (decision.action === 'edit_image' && decision.image_instruction) {
            // Defer image generation — store the instruction on the post for a later step
            u.image_instruction = decision.image_instruction;
          }
        }

        // Mark this comment as processed on ALL posts in the task (shared task = shared processed set)
        for (const post of taskPosts) {
          updates[post.id].newProcessedIds.push(comment.id);
        }

        summaries.push({
          comment_id: comment.id,
          action: decision.action,
          targets: targets.map((t) => t.id),
        });

        // Build a human-readable change description for the reply comment
        const targetLabels = targets.map((t) => `${t.platform} - ${t.scheduled_date || 'undated'}`);
        if (decision.action === 'approve_publish') {
          taskChanges.push(`Approved for publish: ${targetLabels.join(', ')}`);
        } else if (decision.action === 'approve_schedule') {
          taskChanges.push(`Approved for schedule: ${targetLabels.join(', ')}`);
        } else if (decision.action === 'edit_copy') {
          taskChanges.push(`Updated copy for: ${targetLabels.join(', ')}`);
        } else if (decision.action === 'edit_image') {
          taskChanges.push(`Image edit queued for: ${targetLabels.join(', ')}${decision.image_instruction ? ` (${decision.image_instruction})` : ''}`);
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
        if (u.image_instruction) {
          patch.brand_compliance_notes = u.image_instruction;
          pendingImagePosts.push(post.id);
        }
        await base44.asServiceRole.entities.SocialPost.update(post.id, patch);
      }

      if (taskChanges.length > 0) {
        const reply = `Content Agent: I processed ${newComments.length} new comment(s) on this task.\n\n${taskChanges.map((c) => `- ${c}`).join('\n')}`;
        await addClickUpComment(base44, taskId, reply);
      }

      processedCount++;

      if (pendingImagePosts.length > 0) {
        summaries.push({ pending_image_posts: pendingImagePosts });
      }
    }

    return Response.json({ success: true, tasks_processed: processedCount, summaries });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}