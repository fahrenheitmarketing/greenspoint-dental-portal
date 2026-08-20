import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';
import { Jimp } from 'npm:jimp@1.6.0';
import { getBrandGuideText, uploadAttachmentToClickUpTask } from '../../shared/clickup.ts';
import { buildImagePrompt, resizeAndUploadImage } from '../../shared/imageRules.ts';

async function runConcurrent(items, fn, concurrency = 4) {
  let index = 0;
  const workers = Array(Math.min(concurrency, items.length)).fill(0).map(async () => {
    while (index < items.length) {
      const i = index++;
      await fn(items[i]);
    }
  });
  await Promise.all(workers);
}

export default async function (req) {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user || user.role !== 'admin') {
      return Response.json({ error: 'Admin access required' }, { status: 403 });
    }

    const { campaignMonth, regenerate } = await req.json();
    if (!campaignMonth) {
      return Response.json({ error: 'campaignMonth is required' }, { status: 400 });
    }

    const settingsList = await base44.asServiceRole.entities.SocialMediaSettings.list();
    const brandGuide = settingsList[0] ? await getBrandGuideText(base44, settingsList[0]) : '';

    let posts = await base44.asServiceRole.entities.SocialPost.filter({ campaign_month: campaignMonth }, 'scheduled_date', 200);
    if (!regenerate) {
      posts = posts.filter((p) => !p.image_url);
    }

    if (posts.length === 0) {
      return Response.json({ success: true, message: 'No posts need image generation.', generated: 0, failed: 0, attached: 0 });
    }

    let generated = 0;
    let failed = 0;
    let attached = 0;

    await runConcurrent(posts, async (post) => {
      try {
        const prompt = buildImagePrompt(post, brandGuide);
        const { url } = await base44.asServiceRole.integrations.Core.GenerateImage({ prompt });
        // Resize to the platform's exact dimensions so the designer receives a correctly-sized creative.
        const safeTopic = (post.topic || 'creative').replace(/[^a-zA-Z0-9]+/g, '-').toLowerCase().slice(0, 40);
        const resizedUrl = await resizeAndUploadImage(base44, Jimp, post.platform, url, `${post.id}-${post.platform}-${safeTopic}`);
        await base44.asServiceRole.entities.SocialPost.update(post.id, { image_url: resizedUrl });
        generated++;
        if (post.clickup_task_id) {
          try {
            const filename = `${post.platform}-${post.scheduled_date || 'undated'}-${safeTopic}.jpg`;
            await uploadAttachmentToClickUpTask(base44, post.clickup_task_id, resizedUrl, filename);
            attached++;
          } catch (e) { console.error('attach failed', e.message); }
        }
      } catch (e) {
        console.error('image gen failed for post', post.id, e.message);
        failed++;
      }
    }, 4);

    return Response.json({
      success: true,
      generated,
      failed,
      attached,
      total: posts.length,
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}