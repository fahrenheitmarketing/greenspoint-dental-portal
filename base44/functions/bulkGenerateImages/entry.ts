import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';
import { getBrandGuideText, uploadAttachmentToClickUpTask } from '../../shared/clickup.ts';

function buildImagePrompt(post, brandGuide) {
  const imageDirection = post.brand_compliance_notes ? `Visual direction from creative brief: ${post.brand_compliance_notes}. ` : '';
  return `${imageDirection}A welcoming, bright, lifestyle photo for a ${post.platform} dental practice social media post about "${post.topic}". The post copy is: "${post.content}". Create an image that VISUALLY REPRESENTS this content — the image must directly reflect the message, not be a generic stock photo. If the post is about the dental office, staff, or "behind the scenes", do NOT show staff or a clinic — instead use a relevant visual metaphor like a welcoming front door with morning sunlight, a tidy desk with coffee, a sunrise over the neighborhood, or a "we're here for you" community scene. Ensure the image is anatomically correct and logically coherent — no extra limbs, no distorted faces, no physically impossible objects. Prefer simple, clean compositions with at most one or two people to avoid AI artifacts. ${brandGuide} When people are shown, feature Hispanic/Latino individuals reflecting the local community. Absolutely no dental staff, no clinic reception areas, no dentist offices, no dental chairs, no scary dental tools, no clinical/surgical shots, no text overlaid on the image.`;
}

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
        await base44.asServiceRole.entities.SocialPost.update(post.id, { image_url: url });
        generated++;
        if (post.clickup_task_id) {
          try {
            const safeTopic = (post.topic || 'creative').replace(/[^a-zA-Z0-9]+/g, '-').toLowerCase().slice(0, 40);
            const filename = `${post.platform}-${post.scheduled_date || 'undated'}-${safeTopic}.jpg`;
            await uploadAttachmentToClickUpTask(base44, post.clickup_task_id, url, filename);
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