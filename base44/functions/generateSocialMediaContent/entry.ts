import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';
import { getBrandGuideText } from '../../shared/clickup.ts';
import { PLATFORM_TONE, buildSchedule, CONTENT_RULES, HASHTAG_RULES, buildGbpCtaInstruction, GBP_LENGTH_RULE, appendAiDisclaimer } from '../../shared/scheduleBuilder.ts';
import { IMAGE_PROMPT_INSTRUCTION } from '../../shared/imageRules.ts';
import { getBrandProfile, buildBrandIntro, buildAudienceRef } from '../../shared/brandContext.ts';

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
    const brandProfile = await getBrandProfile(base44);
    const audienceRef = buildAudienceRef(brandProfile);

    // Fetch topics used in previous months to avoid repetition
    const existingPosts = await base44.asServiceRole.entities.SocialPost.filter({}, 'scheduled_date', 500);
    const usedTopics = [...new Set(existingPosts.map((p) => p.topic).filter(Boolean))].slice(0, 80);

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
      prompt: `${buildBrandIntro(brandProfile)}

Brand Reference Guide (must strictly follow):
${brandGuide}

Trending topics to draw from:
${topics.map((t) => `- ${t}`).join('\n')}

Topics already used in previous months — do NOT repeat these or create near-duplicates:
${usedTopics.map((t) => `- ${t}`).join('\n')}

Platform tone/identity rules:
- facebook: ${PLATFORM_TONE.facebook}
- instagram: ${PLATFORM_TONE.instagram}
- twitter: ${PLATFORM_TONE.twitter}
- google_business: ${PLATFORM_TONE.google_business}

Hashtag rules (append hashtags on the final line of each post):
- facebook: ${HASHTAG_RULES.facebook}
- instagram: ${HASHTAG_RULES.instagram}
- twitter: ${HASHTAG_RULES.twitter}
- google_business: ${HASHTAG_RULES.google_business}
${GBP_LENGTH_RULE}

Generate one post for EACH of the following (date, platform) slots, in the same order. Every post must be patient-friendly and match its platform's tone and include the right number of hashtags for its platform.
${CONTENT_RULES}
${buildGbpCtaInstruction()}
Slots:
${schedule.map((s, i) => `${i + 1}. ${s.date} - ${s.platform}`).join('\n')}

For each slot return: date, platform, topic (short theme), content (the actual post copy matching platform tone and length norms), image_prompt (${IMAGE_PROMPT_INSTRUCTION}${audienceRef ? ' ' + audienceRef : ''}).`,
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
                cta_page_path: { type: 'string' },
                cta_button_type: { type: 'string' },
              },
              required: ['date', 'platform', 'topic', 'content', 'image_prompt'],
            },
          },
        },
        required: ['posts'],
      },
    });

    const posts = genRes.posts || [];

    // Save SocialPost records as pending. They are NOT sent to ClickUp yet —
    // content is only added to the ClickUp task when approved in the Studio dashboard.
    // Prefer the exact datetime from our computed schedule (by index) so the
    // random spread times are preserved even if the LLM truncates the time.
    const records = posts.map((post, i) => ({
      platform: post.platform,
      topic: post.topic,
      content: appendAiDisclaimer(post.content, i),
      status: 'pending',
      scheduled_date: (schedule[i] && schedule[i].date) || post.date,
      campaign_month: campaignMonth,
      clickup_list_id: settings.clickup_list_id,
      brand_compliance_notes: post.image_prompt,
      cta_page_path: post.platform === 'google_business' ? post.cta_page_path : undefined,
      cta_button_type: post.platform === 'google_business' ? post.cta_button_type : undefined,
    }));

    const created = await base44.asServiceRole.entities.SocialPost.bulkCreate(records);

    return Response.json({
      success: true,
      campaign_month: campaignMonth,
      posts_created: created.length,
      total_slots: schedule.length,
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}