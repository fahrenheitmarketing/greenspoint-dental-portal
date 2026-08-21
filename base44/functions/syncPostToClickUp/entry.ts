import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';
import { addClickUpComment } from '../../shared/clickup.ts';

export default async function (req) {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user || user.role !== 'admin') {
      return Response.json({ error: 'Admin access required' }, { status: 403 });
    }

    const { postId, note } = await req.json();
    if (!postId || !note) {
      return Response.json({ error: 'postId and note are required' }, { status: 400 });
    }

    const post = await base44.asServiceRole.entities.SocialPost.get(postId);
    if (!post) {
      return Response.json({ error: 'Post not found' }, { status: 404 });
    }
    if (!post.clickup_task_id) {
      return Response.json({ error: 'This post has no linked ClickUp task' }, { status: 400 });
    }

    const dateLabel = post.scheduled_date
      ? new Date(post.scheduled_date).toLocaleString('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' })
      : 'undated';
    const commentWithContext = `[${post.platform.toUpperCase()} - ${dateLabel}]\n${note}`;
    await addClickUpComment(base44, post.clickup_task_id, commentWithContext);

    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}