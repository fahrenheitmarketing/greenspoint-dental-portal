import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';
import { GBP_CTA_PAGES, GBP_BUTTON_TYPES } from '../../shared/scheduleBuilder.ts';

function stripUrlsFromContent(content) {
  if (!content) return content;
  return content
    .replace(/https?:\/\/[^\s]+/g, '')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

export default async function (req) {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user || user.role !== 'admin') {
      return Response.json({ error: 'Admin access required' }, { status: 403 });
    }

    // Fetch all GBP posts that need retrofitting (no cta_page_path yet)
    const gbpPosts = await base44.asServiceRole.entities.SocialPost.filter(
      { platform: 'google_business', status: { $in: ['ready_to_publish', 'scheduled', 'approved', 'pending'] } },
      'scheduled_date',
      200
    );

    const pagePaths = GBP_CTA_PAGES.map((p) => p.path);
    let updated = 0;
    let skipped = 0;
    const errors = [];

    for (const post of gbpPosts) {
      if (post.cta_page_path) {
        skipped++;
        continue;
      }

      try {
        const res = await base44.asServiceRole.integrations.Core.InvokeLLM({
          prompt: `You are assigning a Google Business Profile call-to-action button for a dental practice post.

Post topic: ${post.topic || 'n/a'}
Post content: ${post.content || 'n/a'}

Available landing pages (choose the single most relevant):
${GBP_CTA_PAGES.map((p) => `- ${p.path} (${p.label})`).join('\n')}

Available button types (choose the best fit):
- LEARN_MORE: educational tips, general info
- GET_OFFER: specials, discounts, promotions
- BOOK: appointment-focused, scheduling
- CALL: contact/phone-focused
- SIGN_UP: newsletter or new patient sign-up

Return cta_page_path (one of the paths above) and cta_button_type (one of the types above).`,
          model: 'gemini_3_flash',
          response_json_schema: {
            type: 'object',
            properties: {
              cta_page_path: { type: 'string' },
              cta_button_type: { type: 'string' },
            },
            required: ['cta_page_path', 'cta_button_type'],
          },
        });

        const pagePath = pagePaths.includes(res.cta_page_path) ? res.cta_page_path : '/';
        const buttonType = GBP_BUTTON_TYPES.includes(res.cta_button_type) ? res.cta_button_type : 'LEARN_MORE';
        const cleanedContent = stripUrlsFromContent(post.content);

        await base44.asServiceRole.entities.SocialPost.update(post.id, {
          cta_page_path: pagePath,
          cta_button_type: buttonType,
          content: cleanedContent,
        });
        updated++;
      } catch (e) {
        console.error('Retrofit failed for post', post.id, e.message);
        errors.push({ postId: post.id, error: e.message });
      }
    }

    return Response.json({
      success: true,
      processed: gbpPosts.length,
      updated,
      skipped,
      errors: errors.slice(0, 20),
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}