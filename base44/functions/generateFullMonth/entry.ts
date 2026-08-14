import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';
import { getBrandGuideText, createClickUpTask, uploadAttachmentToClickUpTask, addClickUpComment } from '../../shared/clickup.ts';
import { PLATFORM_TONE, PLATFORM_LABEL, PLATFORM_ORDER, getPlatformsForDate, buildSchedule, formatDateLabel, buildTaskDescription } from '../../shared/scheduleBuilder.ts';

function buildImagePrompt(post, brandGuide) {
  const imageDirection = post.image_prompt ? `Visual direction from creative brief: ${post.image_prompt}. ` : '';
  return `${imageDirection}A welcoming, bright, lifestyle photo for a ${post.platform} dental practice social media post about "${post.topic}". The post copy is: "${post.content}". Create an image that VISUALLY REPRESENTS this content — the image must directly reflect the message, not be a generic stock photo. If the post is about the dental office, staff, or "behind the scenes", do NOT show staff or a clinic — instead use a relevant visual metaphor like a welcoming front door with morning sunlight, a tidy desk with coffee, a sunrise over the neighborhood, or a "we're here for you" community scene. Ensure the image is anatomically correct and logically coherent — no extra limbs, no distorted faces, no physically impossible objects. Prefer simple, clean compositions with at most one or two people to avoid AI artifacts. ${brandGuide} When people are shown, feature Hispanic/Latino individuals reflecting the local community. Absolutely no dental staff, no clinic reception areas, no dentist offices, no dental chairs, no scary dental tools, no clinical/surgical shots, no text overlaid on the image.`;
}

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

    const { month, year } = await req.json();
    if (!month || !year) {
      return Response.json({ error: 'month and year are required' }, { status: 400 });
    }

    const settingsList = await base44.asServiceRole.entities.SocialMediaSettings.list();
    const settings = settingsList[0];
    if (!settings || !settings.clickup_list_id) {
      return Response.json({ error: 'Configure your ClickUp list ID in Settings first' }, { status: 400 });
    }

    const brandGuide = await getBrandGuideText(base44, settings);

    // 1. Research trends
    const trendsRes = await base44.asServiceRole.integrations.Core.InvokeLLM({
      prompt: `List 8 currently high-performing content trends/topics for dental practices to post about on social media, covering oral hygiene tips, cosmetic dentistry, general dental care, and patient wellness. Keep each topic to one short line, patient-friendly (no clinical jargon, no scary procedures).`,
      add_context_from_internet: true,
      model: 'gemini_3_flash',
      response_json_schema: {
        type: 'object',
        properties: { topics: { type: 'array', items: { type: 'string' } } },
        required: ['topics'],
      },
    });
    const topics = trendsRes.topics || [];

    // 2. Generate all copy in one call
    const schedule = buildSchedule(month, year);
    const monthName = new Date(Date.UTC(year, month - 1, 1)).toLocaleString('en-US', { month: 'long', timeZone: 'UTC' });
    const campaignMonth = `${monthName} ${year}`;

    const genRes = await base44.asServiceRole.integrations.Core.InvokeLLM({
      prompt: `You are the social media manager for Greenspoint Dental, a friendly, patient-focused dental practice.

Brand Reference Guide (must strictly follow):
${brandGuide}

Trending topics to draw from:
${topics.map((t) => `- ${t}`).join('\n')}

Platform tone/identity rules:
- facebook: ${PLATFORM_TONE.facebook}
- instagram: ${PLATFORM_TONE.instagram}
- twitter: ${PLATFORM_TONE.twitter}
- google_business: ${PLATFORM_TONE.google_business}

Generate one post for EACH of the following (date, platform) slots, in the same order. Every post must be factual (no medical claims), patient-friendly, and match its platform's tone.
Slots:
${schedule.map((s, i) => `${i + 1}. ${s.date} - ${s.platform}`).join('\n')}

For each slot return: date, platform, topic (short theme), content (the actual post copy matching platform tone and length norms), image_prompt (a short, SPECIFIC description of a brand-compliant, welcoming, bright, lifestyle photo that VISUALLY REPRESENTS the post's content/copy. The image MUST directly reflect what the post is about so a reader who reads the copy finds the image naturally relevant — e.g., if the copy is about morning routines, show a bright morning scene with coffee/breakfast; if it's about healthy snacks for teeth, show colorful healthy food; if it's about family dental care, show a Hispanic/Latino family; if it's about confidence/smiles, show a close-up of a person smiling. CRITICAL: if the post is about the dental office, staff, or "behind the scenes", do NOT show staff or a clinic — instead use a relevant visual metaphor like a welcoming front door with morning sunlight, a tidy desk with coffee, a sunrise over the neighborhood, or a "we're here for you" community scene. Do NOT default to generic "family smiling" — match the specific message. Ensure the image is anatomically correct and logically coherent — no extra limbs, no distorted faces, no physically impossible objects. Prefer simple, clean compositions with at most one or two people to avoid AI artifacts. When people are shown, feature Hispanic/Latino individuals reflecting the local community. NO dental staff, NO clinic reception areas, NO dentist offices, NO dental chairs, NO scary tools, NO clinical shots, NO text in the photo, NO surgery).`,
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

    const posts = genRes.posts || [];

    // 3. Create ClickUp task with description
    const description = buildTaskDescription(campaignMonth, posts);
    const task = await createClickUpTask(base44, settings.clickup_list_id, {
      name: `GP - Social Posts [${campaignMonth}]`,
      description,
    });

    // 4. Save SocialPost records
    const records = posts.map((post) => ({
      platform: post.platform,
      topic: post.topic,
      content: post.content,
      status: 'pending',
      scheduled_date: post.date,
      campaign_month: campaignMonth,
      clickup_task_id: task.id,
      clickup_list_id: settings.clickup_list_id,
      brand_compliance_notes: post.image_prompt,
    }));
    const created = await base44.asServiceRole.entities.SocialPost.bulkCreate(records);

    // 5. Generate all images concurrently and attach to ClickUp
    let imagesGenerated = 0;
    let imagesFailed = 0;
    let attachmentsUploaded = 0;

    await runConcurrent(created, async (post) => {
      try {
        const prompt = buildImagePrompt(post, brandGuide);
        const { url } = await base44.asServiceRole.integrations.Core.GenerateImage({ prompt });
        await base44.asServiceRole.entities.SocialPost.update(post.id, { image_url: url });
        imagesGenerated++;
        // Attach to ClickUp task
        try {
          const safeTopic = (post.topic || 'creative').replace(/[^a-zA-Z0-9]+/g, '-').toLowerCase().slice(0, 40);
          const filename = `${post.platform}-${post.scheduled_date || 'undated'}-${safeTopic}.jpg`;
          await uploadAttachmentToClickUpTask(base44, task.id, url, filename);
          attachmentsUploaded++;
        } catch (attachErr) {
          console.error('ClickUp attachment failed for post', post.id, attachErr.message);
        }
      } catch (imgErr) {
        console.error('Image generation failed for post', post.id, imgErr.message);
        imagesFailed++;
      }
    }, 4);

    // 6. Notify in ClickUp
    try {
      await addClickUpComment(base44, task.id, `Content Agent: Full month generated end-to-end. ${imagesGenerated} images created and ${attachmentsUploaded} attached to this task. Review the copy above and the attached creatives. Comment "Approved" to approve, or request changes.`);
    } catch (e) { /* non-critical */ }

    return Response.json({
      success: true,
      campaign_month: campaignMonth,
      clickup_task_id: task.id,
      posts_created: created.length,
      images_generated: imagesGenerated,
      images_failed: imagesFailed,
      attachments_uploaded: attachmentsUploaded,
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}