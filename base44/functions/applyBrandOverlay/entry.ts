import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';
import { Jimp } from 'npm:jimp@1.6.0';
import { compositeOverlays } from '../../shared/overlay.ts';
import { getBrandProfile } from '../../shared/brandContext.ts';

// Composites the client's brand assets (from Brand Setup) onto a post's AI image
// and stores the branded version back on the post. Manual companion to the
// automatic overlay applied when a post is approved into ClickUp.
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

    let post;
    try {
      post = await base44.asServiceRole.entities.SocialPost.get(postId);
    } catch {
      return Response.json({ error: 'Post not found' }, { status: 404 });
    }
    if (!post.image_url) {
      return Response.json({ error: 'Post has no image to brand' }, { status: 400 });
    }

    const brandProfile = await getBrandProfile(base44);
    if (!brandProfile || !Array.isArray(brandProfile.brand_assets) || brandProfile.brand_assets.length === 0) {
      return Response.json({ error: 'No brand assets configured. Add overlay images in Brand Setup first.' }, { status: 400 });
    }

    const brandedBuffer = await compositeOverlays(Jimp, post.image_url, brandProfile.brand_assets, post.platform);
    if (!brandedBuffer) {
      return Response.json({ error: 'No usable brand assets found (each asset needs a file_url)' }, { status: 400 });
    }

    const safeTopic = (post.topic || 'creative').replace(/[^a-zA-Z0-9]+/g, '-').toLowerCase().slice(0, 40);
    const file = new File([brandedBuffer], `${postId}-branded-${safeTopic}.jpg`, { type: 'image/jpeg' });
    const result = await base44.asServiceRole.integrations.Core.UploadFile({ file });
    if (!result || !result.file_url) {
      throw new Error('Branded image upload failed');
    }

    await base44.asServiceRole.entities.SocialPost.update(postId, { image_url: result.file_url });

    return Response.json({ success: true, image_url: result.file_url });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}