import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';
import { getBrandGuideText, createClickUpTask } from '../../shared/clickup.ts';

const PLATFORM_TONE = {
  facebook: "Conversational, community-focused, and reassuring.",
  instagram: "Trendy, visual-first, smile transformations, punchy hooks, no links in the copy.",
  twitter: "Professional thought-leadership, dental industry insights, practice updates.",
  google_business: "Local practice updates, clear calls to action, community focused.",
};

const PLATFORM_LABEL = {
  facebook: "FACEBOOK",
  instagram: "INSTAGRAM",
  twitter: "TWITTER / X",
  google_business: "GOOGLE BUSINESS",
};

const PLATFORM_ORDER = ['facebook', 'instagram', 'twitter', 'google_business'];

function getPlatformsForDate(dayOfWeek) {
  const platforms = [];
  if (dayOfWeek === 2 || dayOfWeek === 4) { platforms.push('twitter'); platforms.push('facebook'); platforms.push('instagram'); }
  if (dayOfWeek === 4) platforms.push('google_business');
  return platforms;
}

function buildSchedule(month, year) {
  const schedule = [];
  const daysInMonth = new Date(Date.UTC(year, month, 0)).getUTCDate();
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(Date.UTC(year, month - 1, day));
    const platforms = getPlatformsForDate(date.getUTCDay());
    for (const platform of platforms) {
      schedule.push({ date: date.toISOString().slice(0, 10), platform });
    }
  }
  return schedule;
}

function formatDateLabel(dateStr) {
  const d = new Date(dateStr + 'T00:00:00Z');
  return d.toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
}

function buildTaskDescription(campaignMonth, posts) {
  let desc = `# GP - Social Posts [${campaignMonth}]\n\n`;
  desc += `Monthly social media content pipeline for ${campaignMonth}.\n\n`;
  desc += `**Review instructions:** Comment on this task with "Approved for Publish" or "Approved for Schedule". Reference the platform and date (e.g., "Facebook - Aug 15: Approved for Publish"). For copy edits, quote the platform/date and provide the revised text. For image changes, mention the platform/date and what to change. Creatives are attached to this task as files.\n\n---\n\n`;

  for (const platform of PLATFORM_ORDER) {
    const platformPosts = posts.filter((p) => p.platform === platform);
    if (platformPosts.length === 0) continue;
    desc += `## ${PLATFORM_LABEL[platform]}\n\n`;
    for (const post of platformPosts) {
      desc += `### ${formatDateLabel(post.date)} — ${post.topic}\n\n`;
      desc += `${post.content}\n\n`;
      desc += `*Image direction: ${post.image_prompt}*\n\n`;
      desc += `---\n\n`;
    }
  }
  return desc;
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