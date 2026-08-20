import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';
import { Jimp } from 'npm:jimp@1.6.0';
import { getBrandGuideText } from '../../shared/clickup.ts';
import { buildBlogImagePrompt } from '../../shared/blogContentRules.ts';

// Featured blog images are cropped to this exact size (px).
const BLOG_IMAGE_WIDTH = 1200;
const BLOG_IMAGE_HEIGHT = 628;

// Cover-crop a generated image to the blog featured-image dimensions and upload it.
async function resizeAndUploadBlogImage(base44, imageUrl, filenameBase) {
  const image = await Jimp.read(imageUrl);
  image.cover({ w: BLOG_IMAGE_WIDTH, h: BLOG_IMAGE_HEIGHT });
  const buffer = await image.getBuffer('image/jpeg');
  const file = new File([buffer], `${filenameBase}.jpg`, { type: 'image/jpeg' });
  const result = await base44.asServiceRole.integrations.Core.UploadFile({ file });
  return result.file_url;
}

export default async function (req) {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user || user.role !== 'admin') {
      return Response.json({ error: 'Admin access required' }, { status: 403 });
    }

    const { postId, instruction } = await req.json();
    if (!postId) {
      return Response.json({ error: 'postId is required' }, { status: 400 });
    }

    const post = await base44.asServiceRole.entities.BlogStudioPost.get(postId);
    if (!post) {
      return Response.json({ error: 'Post not found' }, { status: 404 });
    }

    const settingsList = await base44.asServiceRole.entities.BlogStudioSettings.list();
    const brandGuide = settingsList[0] ? await getBrandGuideText(base44, settingsList[0]) : '';

    const prompt = `${buildBlogImagePrompt(post, brandGuide)}${instruction ? ` Additional instruction: ${instruction}` : ''}`;

    const { url } = await base44.asServiceRole.integrations.Core.GenerateImage({ prompt });

    // Resize the generated image to the exact blog featured-image dimensions (1200x628).
    const finalUrl = await resizeAndUploadBlogImage(base44, url, `blog-${postId}`);

    await base44.asServiceRole.entities.BlogStudioPost.update(postId, { image_url: finalUrl });

    return Response.json({ success: true, image_url: finalUrl });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}