import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';
import { Jimp } from 'npm:jimp@1.6.0';
import { PLATFORM_DIMENSIONS, resizeAndUploadImage } from '../../shared/imageRules.ts';

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

    // Safety net: prefer the designer's returned final branded image; fall back to the AI image.
    const sourceUrl = post.final_image_url || post.image_url;
    if (!sourceUrl) {
      return Response.json({ error: 'Post has no image to resize' }, { status: 400 });
    }

    const dims = PLATFORM_DIMENSIONS[post.platform];
    if (!dims) {
      return Response.json({ error: 'Unknown platform' }, { status: 400 });
    }

    const safeTopic = (post.topic || 'creative').replace(/[^a-zA-Z0-9]+/g, '-').toLowerCase().slice(0, 40);
    const resizedUrl = await resizeAndUploadImage(base44, Jimp, post.platform, sourceUrl, `${postId}-final-${post.platform}-${safeTopic}`);

    await base44.asServiceRole.entities.SocialPost.update(postId, {
      resized_image_url: resizedUrl,
      status: 'ready_to_publish',
    });

    return Response.json({ success: true, resized_image_url: resizedUrl });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}