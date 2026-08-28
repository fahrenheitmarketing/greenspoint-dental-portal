import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';
import { HASHTAG_RULES, HASHTAG_COUNTS } from '../../shared/scheduleBuilder.ts';

function extractHashtags(text) {
  const matches = String(text).match(/#[A-Za-z0-9_]+/g);
  return matches ? matches.map((t) => t.toLowerCase()) : [];
}

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

    // Skip platforms with a 0 minimum (google_business, facebook) and posts that
    // already meet their platform's hashtag minimum.
    const toUpdate = posts.filter((p) => {
      const range = HASHTAG_COUNTS[p.platform];
      if (!range || range.min === 0) return false;
      return extractHashtags(p.content).length < range.min;
    });

    if (toUpdate.length === 0) {
      return Response.json({ success: true, updated: 0, total: 0, message: 'No posts need hashtags' });
    }

    const rulesBlock = `Hashtag rules per platform:
- facebook: ${HASHTAG_RULES.facebook}
- instagram: ${HASHTAG_RULES.instagram}
- twitter: ${HASHTAG_RULES.twitter}
- linkedin: ${HASHTAG_RULES.linkedin}
- google_business: ${HASHTAG_RULES.google_business}
Place all hashtags on a single line, separated by spaces. Return ONLY the new hashtags to add, not the post copy.`;

    let updated = 0;
    const chunkSize = 20;
    for (let i = 0; i < toUpdate.length; i += chunkSize) {
      const chunk = toUpdate.slice(i, i + chunkSize);
      const res = await base44.asServiceRole.integrations.Core.InvokeLLM({
        prompt: `You generate relevant hashtags for dental practice social media posts. For each post below, return NEW hashtags (not already present in the post) appropriate for its platform, following the rules exactly.
${rulesBlock}

Posts:
${chunk.map((p, idx) => {
  const range = HASHTAG_COUNTS[p.platform];
  const existing = extractHashtags(p.content).length;
  const need = Math.max(0, range.min - existing);
  return `${idx + 1}. [id:${p.id}] [platform:${p.platform}] [add ${need} new hashtags, max ${range.max} total]\n${p.content}`;
}).join('\n\n')}

Return an array "items" of { id, hashtags } where hashtags is a single string of space-separated NEW hashtags (e.g. "#smile #dentalcare"). Provide exactly the number requested per post, all not already in the post.`,
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
        const existing = new Set(extractHashtags(post.content));
        const range = HASHTAG_COUNTS[post.platform];
        const newTags = String(item.hashtags)
          .split(/\s+/)
          .filter((t) => t.startsWith('#') && !existing.has(t.toLowerCase()));
        const room = Math.max(0, range.max - existing.size);
        const finalTags = newTags.slice(0, room);
        if (!finalTags.length) continue;
        updates.push({ id: post.id, content: `${post.content.trim()}\n${finalTags.join(' ')}` });
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