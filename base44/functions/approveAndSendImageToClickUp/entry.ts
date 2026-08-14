import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';
import { uploadAttachmentToClickUpTask, addClickUpComment } from '../../shared/clickup.ts';

export default async function (req) {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user || user.role !== 'admin') {
      return Response.json({ error: 'Admin access required' }, { status: 403 });
    }

    const { postId } = await req.json();
    if (!postId) {
      return Response.json({ error: 'postId is required' }, { status: 400 });
    }

    const post = await base44.asServiceRole.entities.SocialPost.get(postId);
    if (!post) {
      return Response.json({ error: 'Post not found' }, { status: 404 });
    }

    // Mark the post as approved
    await base44.asServiceRole.entities.SocialPost.update(postId, { status: 'approved' });

    // Attach the current image to the linked ClickUp task for the design team
    let attached = false;
    if (post.clickup_task_id && post.image_url) {
      try {
        const safeTopic = (post.topic || 'creative').replace(/[^a-zA-Z0-9]+/g, '-').toLowerCase().slice(0, 40);
        const filename = `${post.platform}-${post.scheduled_date || 'undated'}-${safeTopic}.jpg`;
        await uploadAttachmentToClickUpTask(base44, post.clickup_task_id, post.image_url, filename);
        await addClickUpComment(
          base44,
          post.clickup_task_id,
          `Content Agent: Post approved in the Social Media Studio. Image attached for design team alterations (logo, branding). Once the final branded version is ready, upload it back to this task or use "Upload Final Image" in the dashboard, then Prepare for Publish.`
        );
        attached = true;
      } catch (attachErr) {
        console.error('ClickUp attachment upload failed:', attachErr.message);
      }
    }

    return Response.json({ success: true, attached_to_clickup: attached });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}