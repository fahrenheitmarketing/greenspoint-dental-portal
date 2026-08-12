import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';
import { getBrandGuideText, createClickUpTask } from '../../shared/clickup.ts';

const PLATFORM_TONE = {
  facebook: "Conversational, community-focused, and reassuring.",
  instagram: "Trendy, visual-first, smile transformations, punchy hooks, no links in the copy.",
  twitter: "Professional thought-leadership, dental industry insights, practice updates.",
  google_business: "Local practice updates, clear calls to action, community focused.",
};

function getPlatformsForDate(dayOfWeek) {
  // 0 = Sunday ... 6 = Saturday
  const platforms = [];
  if (dayOfWeek >= 1 && dayOfWeek <= 5) platforms.push('twitter');
  if (dayOfWeek === 2 || dayOfWeek === 4) { platforms.push('facebook'); platforms.push('instagram'); }
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

For each slot return: date, platform, topic (short theme), content (the actual post copy matching platform tone and length norms), image_prompt (a short description of a brand-compliant, welcoming, bright, patient-focused photo for this post - NO scary tools, NO clinical shots, NO text in the photo, NO surgery).`,
      model: 'claude_sonnet_4_6',
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

    // 3. Create the parent ClickUp task, then a subtask per post, then save SocialPost records
    const parentTask = await createClickUpTask(base44, settings.clickup_list_id, {
      name: `GP - Social Posts [${campaignMonth}]`,
      description: `Monthly social media content pipeline for ${campaignMonth}. Comment "Approved for Publish" or "Approved for Schedule" on a subtask to approve it.`,
    });

    let created = 0;
    for (const post of posts) {
      try {
        const subtask = await createClickUpTask(base44, settings.clickup_list_id, {
          name: `[${post.platform}] ${post.topic} - ${post.date}`,
          description: post.content,
          parent: parentTask.id,
          dueDate: post.date,
        });

        await base44.asServiceRole.entities.SocialPost.create({
          platform: post.platform,
          topic: post.topic,
          content: post.content,
          status: 'pending',
          scheduled_date: post.date,
          campaign_month: campaignMonth,
          clickup_task_id: subtask.id,
          clickup_list_id: settings.clickup_list_id,
          brand_compliance_notes: post.image_prompt,
        });
        created++;
      } catch (innerErr) {
        console.error('Failed to create post for slot', post.date, post.platform, innerErr.message);
      }
    }

    return Response.json({
      success: true,
      campaign_month: campaignMonth,
      parent_task_id: parentTask.id,
      posts_created: created,
      total_slots: schedule.length,
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}