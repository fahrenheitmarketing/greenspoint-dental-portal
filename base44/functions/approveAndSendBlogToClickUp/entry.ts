import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';
import { createClickUpTask, uploadAttachmentToClickUpTask, addClickUpComment } from '../../shared/clickup.ts';

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

    const post = await base44.asServiceRole.entities.BlogStudioPost.get(postId);
    if (!post) {
      return Response.json({ error: 'Post not found' }, { status: 404 });
    }

    // Guard: don't re-send if already sent to ClickUp
    if (post.status === 'pending' && post.clickup_task_id) {
      return Response.json({ success: true, clickup_task_id: post.clickup_task_id, skipped: true });
    }

    const settingsList = await base44.asServiceRole.entities.BlogStudioSettings.list();
    const settings = settingsList[0];
    const listId = post.clickup_list_id || (settings && settings.clickup_list_id);
    if (!listId) {
      return Response.json({ error: 'ClickUp list ID is not configured. Open Settings to set it.' }, { status: 400 });
    }

    // Mark as pending review
    await base44.asServiceRole.entities.BlogStudioPost.update(postId, { status: 'pending' });

    // Reuse an existing task for the same campaign month, or create a new one
    let taskId = post.clickup_task_id;
    if (!taskId && post.campaign_month) {
      const monthPosts = await base44.asServiceRole.entities.BlogStudioPost.filter({ campaign_month: post.campaign_month }, 'created_date', 200);
      const withTask = monthPosts.find((p) => p.clickup_task_id);
      if (withTask) taskId = withTask.clickup_task_id;
    }
    if (!taskId) {
      const task = await createClickUpTask(base44, listId, {
        name: `GP - Blog Posts [${post.campaign_month || 'Review'}]`,
        description: `Blog post content for editorial review — ${post.campaign_month || 'current campaign'}.\n\nEach post is added below as a comment with its featured image attached. Review the copy, SEO fields, and image, then comment with approval or revision notes.`,
      });
      taskId = task.id;
    }

    await base44.asServiceRole.entities.BlogStudioPost.update(postId, { clickup_task_id: taskId, clickup_list_id: listId });

    // Build a detailed comment with the post content for editorial review
    const reviewBlock = `Content Agent: Blog post submitted for review.

TITLE (EN): ${post.title}
TITLE (ES): ${post.title_es || 'n/a'}
SLUG: ${post.slug}
CATEGORY: ${post.category}
META TITLE (EN): ${post.meta_title || 'n/a'}
META DESCRIPTION (EN): ${post.meta_description || 'n/a'}
SEO SCORE: ${post.seo_score || 'n/a'}/100
READ TIME: ${post.read_time || 'n/a'} min

EXCERPT (EN):
${post.excerpt || 'n/a'}

CONTENT (EN):
${post.content}

---
CONTENT (ES):
${post.content_es || 'n/a'}

---
INTERNAL LINKS: ${(post.internal_links || []).map((l) => `${l.anchor_text} → ${l.page_path}`).join(', ') || 'none'}
EXTERNAL LINKS: ${(post.external_links || []).map((l) => `${l.anchor_text} → ${l.url}`).join(', ') || 'none'}
CTAs: ${(post.ctas || []).map((c) => `${c.label} → ${c.page_path}`).join(', ') || 'none'}

Featured image attached for design team review. Comment with "Approved" to publish, or provide revision notes.`;

    try {
      await addClickUpComment(base44, taskId, reviewBlock);
    } catch (commentErr) {
      console.error('ClickUp comment failed:', commentErr.message);
    }

    // Attach the featured image if one exists
    let attached = false;
    if (post.image_url) {
      try {
        const safeSlug = (post.slug || 'blog-post').replace(/[^a-zA-Z0-9]+/g, '-').toLowerCase().slice(0, 40);
        const filename = `blog-${safeSlug}.jpg`;
        await uploadAttachmentToClickUpTask(base44, taskId, post.image_url, filename);
        attached = true;
      } catch (attachErr) {
        console.error('ClickUp attachment upload failed:', attachErr.message);
      }
    }

    return Response.json({ success: true, clickup_task_id: taskId, attached_to_clickup: attached });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}