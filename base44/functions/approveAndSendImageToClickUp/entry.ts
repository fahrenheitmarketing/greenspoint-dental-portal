import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';
import { createClickUpTask, uploadAttachmentToClickUpTask, uploadAttachmentBufferToClickUpTask, addClickUpComment } from '../../shared/clickup.ts';
import { Jimp } from 'npm:jimp@1.6.0';
import { compositeOverlays } from '../../shared/overlay.ts';
import { getBrandProfile } from '../../shared/brandContext.ts';

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

    // Guard: if this post is already approved and already pushed to ClickUp, don't re-upload
    if (post.status === 'approved' && post.clickup_task_id) {
      return Response.json({ success: true, clickup_task_id: post.clickup_task_id, attached_to_clickup: false, skipped: true });
    }

    const settingsList = await base44.asServiceRole.entities.SocialMediaSettings.list();
    const settings = settingsList[0];
    const listId = post.clickup_list_id || (settings && settings.clickup_list_id);
    if (!listId) {
      return Response.json({ error: 'ClickUp list ID is not configured' }, { status: 400 });
    }

    // Mark the post as approved
    await base44.asServiceRole.entities.SocialPost.update(postId, { status: 'approved' });

    // Resolve the ClickUp task for this campaign month: reuse an existing one if present,
    // otherwise create a new one. Content is only added to ClickUp on approval.
    let taskId = post.clickup_task_id;
    if (!taskId && post.campaign_month) {
      const monthPosts = await base44.asServiceRole.entities.SocialPost.filter({ campaign_month: post.campaign_month }, 'scheduled_date', 200);
      const withTask = monthPosts.find((p) => p.clickup_task_id);
      if (withTask) taskId = withTask.clickup_task_id;
    }
    if (!taskId) {
      const task = await createClickUpTask(base44, listId, {
        name: `GP - Social Posts [${post.campaign_month || 'Approved'}]`,
        description: `Approved social media content for ${post.campaign_month || 'this campaign'}.\n\nEach approved post is added below as a comment with its creative attached for design-team branding.`,
      });
      taskId = task.id;
    }

    // Persist the task link on this post
    await base44.asServiceRole.entities.SocialPost.update(postId, { clickup_task_id: taskId, clickup_list_id: listId });

    const dateLabel = post.scheduled_date
      ? new Date(post.scheduled_date).toLocaleString('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' })
      : 'undated';

    // Attach the branded image to the task for the design team. If the client has
    // brand assets (logos/badges) configured, composite them onto the AI image
    // first so the design team receives an already-branded creative.
    let attached = false;
    if (post.image_url) {
      try {
        const safeTopic = (post.topic || 'creative').replace(/[^a-zA-Z0-9]+/g, '-').toLowerCase().slice(0, 40);
        const datePart = post.scheduled_date ? new Date(post.scheduled_date).toISOString().slice(0, 10) : 'undated';
        const filename = `${post.platform}-${datePart}-${safeTopic}.jpg`;

        let brandedBuffer = null;
        try {
          const brandProfile = await getBrandProfile(base44);
          if (brandProfile && Array.isArray(brandProfile.brand_assets) && brandProfile.brand_assets.length > 0) {
            brandedBuffer = await compositeOverlays(Jimp, post.image_url, brandProfile.brand_assets);
          }
        } catch (overlayErr) {
          console.error('Overlay compositing failed, uploading raw image:', overlayErr.message);
        }

        if (brandedBuffer) {
          await uploadAttachmentBufferToClickUpTask(base44, taskId, brandedBuffer, filename);
        } else {
          await uploadAttachmentToClickUpTask(base44, taskId, post.image_url, filename);
        }
        attached = true;
      } catch (attachErr) {
        console.error('ClickUp attachment upload failed:', attachErr.message);
      }
    }

    // Add a comment with the post copy so the design team has context
    try {
      await addClickUpComment(
        base44,
        taskId,
        `Content Agent: Post approved in the Social Media Studio.\n[${post.platform.toUpperCase()} - ${dateLabel}] Topic: ${post.topic || 'n/a'}\n\n${post.content}\n\nImage attached for design team branding. Once the final branded version is ready, upload it back to this task or use "Upload Final Image" in the dashboard, then Prepare for Publish.`
      );
    } catch (commentErr) {
      console.error('ClickUp comment failed:', commentErr.message);
    }

    return Response.json({ success: true, clickup_task_id: taskId, attached_to_clickup: attached });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}