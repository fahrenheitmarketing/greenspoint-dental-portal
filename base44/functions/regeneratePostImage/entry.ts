import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';
import { Jimp } from 'npm:jimp@1.6.0';
import { getBrandGuideText } from '../../shared/clickup.ts';
import { buildImagePrompt, resizeAndUploadImage } from '../../shared/imageRules.ts';
import { getBrandProfile, buildAudienceRef } from '../../shared/brandContext.ts';

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

    const post = await base44.asServiceRole.entities.SocialPost.get(postId);
    if (!post) {
      return Response.json({ error: 'Post not found' }, { status: 404 });
    }

    const settingsList = await base44.asServiceRole.entities.SocialMediaSettings.list();
    const brandGuide = settingsList[0] ? await getBrandGuideText(base44, settingsList[0]) : '';
    const brandProfile = await getBrandProfile(base44);
    const audienceRef = buildAudienceRef(brandProfile);

    const prompt = `${buildImagePrompt(post, brandGuide, audienceRef)}${instruction ? ` Additional instruction: ${instruction}` : ''}`;

    const { url } = await base44.asServiceRole.integrations.Core.GenerateImage({ prompt });

    // Resize to the platform's exact dimensions so the designer receives a correctly-sized creative.
    const safeTopic = (post.topic || 'creative').replace(/[^a-zA-Z0-9]+/g, '-').toLowerCase().slice(0, 40);
    const resizedUrl = await resizeAndUploadImage(base44, Jimp, post.platform, url, `${postId}-${post.platform}-${safeTopic}`);

    await base44.asServiceRole.entities.SocialPost.update(postId, { image_url: resizedUrl });

    return Response.json({ success: true, image_url: resizedUrl });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}