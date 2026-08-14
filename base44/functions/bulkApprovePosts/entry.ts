import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';
import { uploadAttachmentToClickUpTask, addClickUpComment } from '../../shared/clickup.ts';

export default async function (req) {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user || user.role !== 'admin') {
      return Response.json({ error: 'Admin access required' }, { status: 403 });
    }

    const { postIds } = await req.json();
    if (!Array.isArray(postIds) || postIds.length === 0) {
      return Response.json({ error: 'postIds array is required' }, { status: 400 });
    }

    // Fetch all posts by ID
    const posts = [];
    for (const id of postIds) {
      try {
        const p = await base44.asServiceRole.entities.SocialPost.get(id);
        if (p) posts.push(p);
      } catch (e) { /* skip missing */ }
    }

    let approved = 0;
    let attached = 0;
    let skipped = 0;

    for (const post of posts) {
      if (post.status === 'approved' || post.status === 'published' || post.status === 'scheduled') {
        skipped++;
        continue;
      }
      await base44.asServiceRole.entities.SocialPost.update(post.id, { status: 'approved' });
      approved++;
      if (post.clickup_task_id && post.image_url) {
        try {
          const safeTopic = (post.topic || 'creative').replace(/[^a-zA-Z0-9]+/g, '-').toLowerCase().slice(0, 40);
          const filename = `${post.platform}-${post.scheduled_date || 'undated'}-${safeTopic}.jpg`;
          await uploadAttachmentToClickUpTask(base44, post.clickup_task_id, post.image_url, filename);
          attached++;
        } catch (e) {
          console.error('ClickUp attachment failed for post', post.id, e.message);
        }
      }
    }

    // Add a summary comment to each affected ClickUp task
    const taskIds = [...new Set(posts.map((p) => p.clickup_task_id).filter(Boolean))];
    for (const taskId of taskIds) {
      try {
        await addClickUpComment(
          base44,
          taskId,
          `Content Agent: ${approved} post(s) bulk-approved in the Social Media Studio. Images attached for design team alterations (logo, branding). Upload the final branded version back to this task, then use "Pull from ClickUp" in the dashboard.`
        );
      } catch (e) { /* non-critical */ }
    }

    return Response.json({ success: true, approved, attached, skipped, total: posts.length });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}