import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';
import Jimp from 'npm:jimp@0.22.12';

const PLATFORM_DIMENSIONS = {
  facebook: { width: 1080, height: 1350 },
  instagram: { width: 1080, height: 1350 },
  twitter: { width: 1600, height: 900 },
  google_business: { width: 1200, height: 900 },
};

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
    if (!post || !post.image_url) {
      return Response.json({ error: 'Post has no image to resize' }, { status: 400 });
    }

    const dims = PLATFORM_DIMENSIONS[post.platform];
    if (!dims) {
      return Response.json({ error: 'Unknown platform' }, { status: 400 });
    }

    const image = await Jimp.read(post.image_url);
    image.cover(dims.width, dims.height);
    const buffer = await image.getBufferAsync(Jimp.MIME_JPEG);

    const file = new File([buffer], `${postId}-${post.platform}.jpg`, { type: 'image/jpeg' });
    const { file_url } = await base44.asServiceRole.integrations.Core.UploadFile({ file });

    await base44.asServiceRole.entities.SocialPost.update(postId, {
      resized_image_url: file_url,
      status: 'ready_to_publish',
    });

    return Response.json({ success: true, resized_image_url: file_url });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}