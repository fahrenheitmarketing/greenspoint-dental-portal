import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';
import { getBrandGuideText } from '../../shared/clickup.ts';
import { buildImagePrompt } from '../../shared/imageRules.ts';

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

    const prompt = `${buildImagePrompt(post, brandGuide)}${instruction ? ` Additional instruction: ${instruction}` : ''}`;

    const { url } = await base44.asServiceRole.integrations.Core.GenerateImage({ prompt });

    await base44.asServiceRole.entities.SocialPost.update(postId, { image_url: url });

    return Response.json({ success: true, image_url: url });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}