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
          comment_index: { type: 'number' },
          post_id: { type: 'string', description: 'ID of the blog post this comment refers to, or "all"' },
          action: { type: 'string', enum: ['approve', 'edit_copy', 'edit_seo', 'edit_image', 'no_action'] },
          revised_content: { type: 'string', description: 'Full revised HTML content if edit_copy' },
          revised_meta_title: { type: 'string', description: 'Revised meta title if edit_seo' },
          revised_meta_description: { type: 'string', description: 'Revised meta description if edit_seo' },
          image_instruction: { type: 'string', description: 'What to change about the image if edit_image' },
        },
        required: ['comment_index', 'post_id', 'action'],
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

    const settingsList = await base44.asServiceRole.entities.BlogStudioSettings.list();
    const brandGuide = settingsList[0] ? await getBrandGuideText(base44, settingsList[0]) : '';

    const allPosts = await base44.asServiceRole.entities.BlogStudioPost.filter({});
    const relevant = allPosts.filter(
      (p) => p.clickup_task_id === taskId && !['published', 'scheduled'].includes(p.status)
    );

    if (relevant.length === 0) {
      return Response.json({ success: true, tasks_processed: 0, summaries: [], message: 'No blog posts found for this ClickUp task.' });
    }

    const comments = await getClickUpComments(base44, taskId);

    const allProcessed = new Set();
    for (const p of relevant) {
      (p.processed_comment_ids || []).forEach((id) => allProcessed.add(id));
    }
    const newComments = comments.filter((c) => !allProcessed.has(c.id) && c.comment_text);

    if (newComments.length === 0) {
      return Response.json({ success: true, tasks_processed: 0, summaries: [], message: 'No new comments to process.' });
    }

    const manifest = relevant.map((p) => `ID ${p.id}: "${p.title}"`).join('\n');
    const commentsBlock = newComments.map((c, i) => `Comment ${i}:\n"${c.comment_text}"`).join('\n\n');

    const updates = {};
    const pendingImagePosts = [];
    const taskChanges = [];

    for (const post of relevant) {
      updates[post.id] = { newProcessedIds: [...(post.processed_comment_ids || [])] };
    }

    const batchRouting = await base44.asServiceRole.integrations.Core.InvokeLLM({
      prompt: `A reviewer left the following comments on a ClickUp task containing blog posts for editorial review:

${commentsBlock}

Available blog posts in this task:
${manifest}

For EACH comment, determine:
1. comment_index: the index of the comment (from the numbering above).
2. post_id: the ID of the blog post this comment refers to, or "all" if it applies to all posts.
3. action: classify the intent —
   - "approve" (comment says approved for publishing)
   - "edit_copy" (comment asks to change the blog content — provide the full revised_content as HTML)
   - "edit_seo" (comment asks to change meta title/description — provide revised_meta_title and revised_meta_description)
   - "edit_image" (comment asks for a different image — provide image_instruction)
   - "no_action" (just a question/note with nothing actionable)
4. If edit_copy: revised_content = the full revised HTML content.
5. If edit_seo: revised_meta_title and revised_meta_description.
6. If edit_image: image_instruction = what to change about the image.

Return one decision object per comment in the "decisions" array.

Brand guide for reference: ${brandGuide}`,
      response_json_schema: ROUTE_SCHEMA,
    });

    const decisions = batchRouting.decisions || [];

    for (const decision of decisions) {
      const comment = newComments[decision.comment_index];
      if (!comment) continue;

      const targets = decision.post_id === 'all' ? relevant : relevant.filter((p) => p.id === decision.post_id);

      for (const post of targets) {
        const u = updates[post.id];
        if (decision.action === 'approve') {
          u.status = 'approved';
        } else if (decision.action === 'edit_copy' && decision.revised_content) {
          u.content = decision.revised_content;
        } else if (decision.action === 'edit_seo') {
          if (decision.revised_meta_title) u.meta_title = decision.revised_meta_title;
          if (decision.revised_meta_description) u.meta_description = decision.revised_meta_description;
        } else if (decision.action === 'edit_image' && decision.image_instruction) {
          u.image_instruction = decision.image_instruction;
        }
      }

      for (const post of relevant) {
        updates[post.id].newProcessedIds.push(comment.id);
      }

      const targetLabels = targets.map((t) => `"${t.title}"`);
      if (decision.action === 'approve') {
        taskChanges.push(`Approved: ${targetLabels.join(', ')}`);
      } else if (decision.action === 'edit_copy') {
        taskChanges.push(`Updated content for: ${targetLabels.join(', ')}`);
      } else if (decision.action === 'edit_seo') {
        taskChanges.push(`Updated SEO fields for: ${targetLabels.join(', ')}`);
      } else if (decision.action === 'edit_image') {
        taskChanges.push(`Image edit queued for: ${targetLabels.join(', ')}${decision.image_instruction ? ` (${decision.image_instruction})` : ''}`);
        targets.forEach((t) => pendingImagePosts.push(t.id));
      } else {
        taskChanges.push(`No action needed: "${comment.comment_text.slice(0, 80)}"`);
      }
    }

    // Persist all updates
    for (const post of relevant) {
      const u = updates[post.id];
      const patch = { processed_comment_ids: u.newProcessedIds };
      if (u.status) patch.status = u.status;
      if (u.content) patch.content = u.content;
      if (u.meta_title) patch.meta_title = u.meta_title;
      if (u.meta_description) patch.meta_description = u.meta_description;
      if (u.image_instruction) {
        patch.image_prompt = u.image_instruction;
      }
      await base44.asServiceRole.entities.BlogStudioPost.update(post.id, patch);
    }

    if (taskChanges.length > 0) {
      const reply = `Content Agent: I processed ${newComments.length} new comment(s) on this task.\n\n${taskChanges.map((c) => `- ${c}`).join('\n')}`;
      await addClickUpComment(base44, taskId, reply);
    }

    return Response.json({
      success: true,
      tasks_processed: 1,
      summaries: [{ pending_image_posts: pendingImagePosts }],
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}