import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';
import { getBrandGuideText } from '../../shared/clickup.ts';
import { PLATFORM_TONE, CONTENT_RULES, buildShortLinkCtaInstruction, buildHashtagInstruction, buildGbpCtaInstruction, GBP_LENGTH_RULE, appendAiDisclaimer } from '../../shared/scheduleBuilder.ts';
import { IMAGE_PROMPT_INSTRUCTION } from '../../shared/imageRules.ts';
import { getBrandProfile, buildBrandIntro, buildAudienceRef } from '../../shared/brandContext.ts';

export default async function (req) {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user || user.role !== 'admin') {
      return Response.json({ error: 'Admin access required' }, { status: 403 });
    }

    const { platform, campaignMonth, scheduledDate, sourceTopic } = await req.json();
    if (!platform || !campaignMonth) {
      return Response.json({ error: 'platform and campaignMonth are required' }, { status: 400 });
    }

    const settingsList = await base44.asServiceRole.entities.SocialMediaSettings.list();
    const settings = settingsList[0];
    const brandGuide = settings ? await getBrandGuideText(base44, settings) : '';
    const brandProfile = await getBrandProfile(base44);
    const audienceRef = buildAudienceRef(brandProfile);
    const ctaInstruction = settings ? (platform === 'google_business' ? buildGbpCtaInstruction() : buildShortLinkCtaInstruction(settings, platform)) : '';

    // Fetch topics already used to avoid repetition
    const existingPosts = await base44.asServiceRole.entities.SocialPost.filter({}, 'scheduled_date', 500);
    const usedTopics = [...new Set(existingPosts.map((p) => p.topic).filter(Boolean))].slice(0, 80);

    const genRes = await base44.asServiceRole.integrations.Core.InvokeLLM({
      prompt: `${buildBrandIntro(brandProfile)}

Brand Reference Guide (must strictly follow):
${brandGuide}

Platform tone/identity rule for ${platform}: ${PLATFORM_TONE[platform] || 'patient-friendly and welcoming'}

Topics already used in previous posts — do NOT repeat these or create near-duplicates:
${usedTopics.map((t) => `- ${t}`).join('\n')}

${sourceTopic ? `The user wants a new, DIFFERENT take on this theme (do NOT reuse the old copy): "${sourceTopic}"` : 'Generate a fresh, engaging topic for a dental practice social media post.'}

Generate ONE new post for ${platform}${scheduledDate ? ` scheduled for ${scheduledDate}` : ''}. It must be patient-friendly and match the platform's tone and length norms.
${platform === 'google_business' ? GBP_LENGTH_RULE : ''}
${CONTENT_RULES}
${buildHashtagInstruction(platform)}
${ctaInstruction}

Return: topic (short theme), content (the actual post copy), image_prompt (${IMAGE_PROMPT_INSTRUCTION}${audienceRef ? ' ' + audienceRef : ''}).`,
      model: 'gemini_3_flash',
      response_json_schema: {
        type: 'object',
        properties: {
          topic: { type: 'string' },
          content: { type: 'string' },
          image_prompt: { type: 'string' },
          cta_page_path: { type: 'string' },
          cta_button_type: { type: 'string' },
        },
        required: ['topic', 'content', 'image_prompt'],
      },
    });

    const record = {
      platform,
      topic: genRes.topic,
      content: appendAiDisclaimer(genRes.content, (genRes.topic || '').length),
      status: 'draft',
      scheduled_date: scheduledDate || null,
      campaign_month: campaignMonth,
      brand_compliance_notes: genRes.image_prompt,
      cta_page_path: platform === 'google_business' ? genRes.cta_page_path : undefined,
      cta_button_type: platform === 'google_business' ? genRes.cta_button_type : undefined,
    };

    const created = await base44.asServiceRole.entities.SocialPost.create(record);

    return Response.json({ success: true, post: created });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}