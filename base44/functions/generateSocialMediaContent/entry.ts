import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';
import { getBrandGuideText, createClickUpTask } from '../../shared/clickup.ts';
import { PLATFORM_TONE, PLATFORM_LABEL, PLATFORM_ORDER, getPlatformsForDate, buildSchedule, formatDateLabel, buildTaskDescription } from '../../shared/scheduleBuilder.ts';

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

    // 1. Research current trends
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

    // 2. Build the schedule and generate all copy in one structured call
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

    // 3. Build the single task description with all posts grouped by platform
    const description = buildTaskDescription(campaignMonth, posts);

    // 4. Create ONE task in the ClickUp list
    const task = await createClickUpTask(base44, settings.clickup_list_id, {
      name: `GP - Social Posts [${campaignMonth}]`,
      description,
    });

    // 5. Save SocialPost records in bulk, all linked to the same task
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

    return Response.json({
      success: true,
      campaign_month: campaignMonth,
      clickup_task_id: task.id,
      posts_created: created.length,
      total_slots: schedule.length,
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}