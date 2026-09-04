import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';
import { getBrandGuideText } from '../../shared/clickup.ts';
import { PLATFORM_TONE, PLATFORM_ORDER, CONTENT_RULES, buildShortLinkCtaInstruction } from '../../shared/scheduleBuilder.ts';
import { Jimp } from 'npm:jimp@1.6.0';
import { buildImagePrompt, IMAGE_PROMPT_INSTRUCTION, resizeAndUploadImage } from '../../shared/imageRules.ts';

// Run async tasks with a concurrency cap to avoid overwhelming the image API.
async function runConcurrent(items, fn, concurrency = 4) {
  const results = new Array(items.length);
  let index = 0;
  const workers = Array(Math.min(concurrency, items.length)).fill(0).map(async () => {
    while (index < items.length) {
      const i = index++;
      try { results[i] = await fn(items[i]); } catch (e) { results[i] = { error: e.message }; }
    }
  });
  await Promise.all(workers);
  return results;
}

export default async function (req) {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user || user.role !== 'admin') {
      return Response.json({ error: 'Admin access required' }, { status: 403 });
    }

    const { campaignMonth } = await req.json();
    if (!campaignMonth) {
      return Response.json({ error: 'campaignMonth is required' }, { status: 400 });
    }

    const settingsList = await base44.asServiceRole.entities.SocialMediaSettings.list();
    const settings = settingsList[0];
    if (!settings) {
      return Response.json({ error: 'Configure your social media settings first' }, { status: 400 });
    }
    const brandGuide = await getBrandGuideText(base44, settings);

    // Only non-approved posts are recreated; approved ones are left untouched.
    const all = await base44.asServiceRole.entities.SocialPost.filter({ campaign_month: campaignMonth }, 'scheduled_date', 500);
    const targets = all.filter((p) => p.status !== 'approved');
    if (targets.length === 0) {
      return Response.json({ success: true, message: 'No non-approved posts to regenerate.', regenerated: 0 });
    }

    // Avoid repeating topics from approved posts and other months.
    const targetIds = new Set(targets.map((p) => p.id));
    const usedTopics = [...new Set(all.filter((p) => !targetIds.has(p.id)).map((p) => p.topic).filter(Boolean))].slice(0, 80);

    const ctaBlock = PLATFORM_ORDER.map((pl) =>
      `### ${pl}\nTone: ${PLATFORM_TONE[pl] || 'patient-friendly and welcoming'}\n${buildShortLinkCtaInstruction(settings, pl) || '(no short link CTA configured for this platform)'}`
    ).join('\n\n');

    const genRes = await base44.asServiceRole.integrations.Core.InvokeLLM({
      prompt: `You are the social media manager for Greenspoint Dental, a friendly, patient-focused dental practice.

Brand Reference Guide (must strictly follow):
${brandGuide}

Platform tone and short-link CTA rules:
${ctaBlock}

Topics already used in approved posts or other months — do NOT repeat these or create near-duplicates:
${usedTopics.map((t) => `- ${t}`).join('\n') || '(none)'}

Regenerate ONE fresh post for EACH slot below, in the same order. Each must be patient-friendly, match its platform's tone and length norms, and follow that platform's CTA rule above. Produce a NEW, different topic (not the previous one).
${CONTENT_RULES}

Slots:
${targets.map((t, i) => `${i + 1}. ${(t.scheduled_date || '').slice(0, 10)} - ${t.platform} (previous topic to avoid: "${t.topic || 'n/a'}")`).join('\n')}

For each slot return: date, platform, topic (short new theme), content (post copy with the platform's CTA), image_prompt (${IMAGE_PROMPT_INSTRUCTION}).`,
      model: 'gemini_3_flash',
      response_json_schema: {
        type: 'object',
        properties: {
          posts: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                date: { type: 'string' },
                platform: { type: 'string' },
                topic: { type: 'string' },
                content: { type: 'string' },
                image_prompt: { type: 'string' },
              },
              required: ['date', 'platform', 'topic', 'content', 'image_prompt'],
            },
          },
        },
        required: ['posts'],
      },
    });

    const results = genRes.posts || [];
    const byKey = {};
    for (const r of results) byKey[`${r.date}|${r.platform}`] = r;

    const imageTasks = [];
    let regenerated = 0;
    for (const post of targets) {
      const key = `${(post.scheduled_date || '').slice(0, 10)}|${post.platform}`;
      const r = byKey[key];
      if (!r) continue;
      await base44.asServiceRole.entities.SocialPost.update(post.id, {
        topic: r.topic,
        content: r.content,
        brand_compliance_notes: r.image_prompt,
        status: 'pending',
        final_image_url: null,
        resized_image_url: null,
        postiz_post_id: null,
      });
      imageTasks.push({ id: post.id, platform: post.platform, topic: r.topic, content: r.content, image_prompt: r.image_prompt });
      regenerated++;
    }

    let imagesGenerated = 0;
    let imagesFailed = 0;
    await runConcurrent(imageTasks, async (post) => {
      try {
        const prompt = buildImagePrompt(post, brandGuide);
        const { url } = await base44.asServiceRole.integrations.Core.GenerateImage({ prompt });
        // Cover-crop to the platform's exact dimensions so every stored creative is correctly sized.
        const safeTopic = (post.topic || 'creative').replace(/[^a-zA-Z0-9]+/g, '-').toLowerCase().slice(0, 40);
        const resizedUrl = await resizeAndUploadImage(base44, Jimp, post.platform, url, `${post.id}-${post.platform}-${safeTopic}`);
        await base44.asServiceRole.entities.SocialPost.update(post.id, { image_url: resizedUrl });
        imagesGenerated++;
      } catch (e) {
        console.error('image gen failed for post', post.id, e.message);
        imagesFailed++;
      }
    }, 4);

    return Response.json({
      success: true,
      campaign_month: campaignMonth,
      regenerated,
      images_generated: imagesGenerated,
      images_failed: imagesFailed,
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}