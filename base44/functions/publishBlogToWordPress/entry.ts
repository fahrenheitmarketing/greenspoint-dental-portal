import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';

// This function validates an approved blog post and marks it as "ready_to_publish".
// The actual WordPress creation (EN + ES posts, featured image, Polylang translation
// linking) is performed via the WordPress MCP connection (GP Production WordPress),
// which is not callable from a Deno backend function. When the admin triggers
// "Publish to WordPress", this function prepares the data; the Base44 agent then
// publishes it using the MCP tools and updates the entity with WP IDs/URLs.

export default async function (req) {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user || user.role !== 'admin') {
      return Response.json({ error: 'Admin access required' }, { status: 403 });
    }

    const { postId, scheduleDate } = await req.json();
    if (!postId) {
      return Response.json({ error: 'postId is required' }, { status: 400 });
    }

    const post = await base44.asServiceRole.entities.BlogStudioPost.get(postId);
    if (!post) {
      return Response.json({ error: 'Post not found' }, { status: 404 });
    }

    if (!['approved', 'ready_to_publish', 'published', 'scheduled'].includes(post.status)) {
      return Response.json({ error: 'Post must be approved before publishing' }, { status: 400 });
    }

    // Validate required fields for WordPress publishing
    const missing = [];
    if (!post.title) missing.push('title');
    if (!post.content) missing.push('content');
    if (!post.slug) missing.push('slug');
    if (!post.image_url) missing.push('image_url (featured image)');
    if (missing.length > 0) {
      return Response.json({ error: `Missing required fields: ${missing.join(', ')}` }, { status: 400 });
    }

    // Mark as ready to publish
    const patch = { status: 'ready_to_publish' };
    if (scheduleDate) {
      patch.published_date = scheduleDate;
    }
    await base44.asServiceRole.entities.BlogStudioPost.update(postId, patch);

    // Return the prepared data so the caller (the Base44 agent) can publish via MCP
    return Response.json({
      success: true,
      ready: true,
      post: {
        id: post.id,
        title: post.title,
        title_es: post.title_es,
        slug: post.slug,
        excerpt: post.excerpt,
        excerpt_es: post.excerpt_es,
        content: post.content,
        content_es: post.content_es,
        category: post.category,
        meta_title: post.meta_title,
        meta_title_es: post.meta_title_es,
        meta_description: post.meta_description,
        meta_description_es: post.meta_description_es,
        image_url: post.image_url,
        published_date: scheduleDate || post.published_date,
        author: post.author || 'Greenspoint Dental Team',
      },
      message: 'Post is ready to publish. The WordPress MCP connection will create the EN + ES posts with the featured image and Polylang translation link.',
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}