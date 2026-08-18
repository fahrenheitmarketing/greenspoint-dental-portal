import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';
import { HASHTAG_RULES } from '../../shared/scheduleBuilder.ts';

export default async function (req) {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user || user.role !== 'admin') {
      return Response.json({ error: 'Admin access required' }, { status: 403 });
    }

    const body = await req.json().catch(() => ({}));
    const campaignMonth = body.campaignMonth || null;

    let posts = await base44.asServiceRole.entities.SocialPost.filter({}, '-created_date', 500);
    posts = posts.filter((p) => p.status !== 'deleted' && p.content);
    if (campaignMonth) posts = posts.filter((p) => p.campaign_month === campaignMonth);

    // Skip posts that already contain hashtags to avoid duplicating.
    const toUpdate = posts.filter((p) => !p.content.includes('#'));
    if (toUpdate.length === 0) {
      return Response.json({ success: true, updated: 0, total: 0, message: 'No posts need hashtags' });
    }

    const rulesBlock = `Hashtag rules per platform:
- facebook: ${HASHTAG_RULES.facebook}
- instagram: ${HASHTAG_RULES.instagram}
- twitter: ${HASHTAG_RULES.twitter}
- google_business: ${HASHTAG_RULES.google_business}
Place all hashtags on a single line, separated by spaces. Return ONLY the hashtags, not the post copy.`;

    let updated = 0;
    const chunkSize = 20;
    for (let i = 0; i < toUpdate.length; i += chunkSize) {
      const chunk = toUpdate.slice(i, i + chunkSize);
      const res = await base44.asServiceRole.integrations.Core.InvokeLLM({
        prompt: `You generate relevant hashtags for dental practice social media posts. For each post below, return ONLY the hashtags appropriate for its platform, following the rules exactly.
${rulesBlock}

Posts:
${chunk.map((p, idx) => `${idx + 1}. [id:${p.id}] [platform:${p.platform}]\n${p.content}`).join('\n\n')}

Return an array "items" of { id, hashtags } where hashtags is a single string of space-separated hashtags (e.g. "#smile #dentalcare").`,
        model: 'gemini_3_flash',
        response_json_schema: {
          type: 'object',
          properties: {
            items: {
              type: 'array',
              items: {
                type: 'object',
                properties: { id: { type: 'string' }, hashtags: { type: 'string' } },
                required: ['id', 'hashtags'],
              },
            },
          },
          required: ['items'],
        },
      });

      const items = res.items || [];
      const updates = [];
      for (const item of items) {
        const post = chunk.find((p) => p.id === item.id);
        if (!post || !item.hashtags) continue;
        const tags = String(item.hashtags).trim();
        if (!tags) continue;
        updates.push({ id: post.id, content: `${post.content.trim()}\n${tags}` });
      }
      if (updates.length) {
        await base44.asServiceRole.entities.SocialPost.bulkUpdate(updates);
        updated += updates.length;
      }
    }

    return Response.json({ success: true, updated, total: toUpdate.length });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}