import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';

const DISCLAIMERS = [
  'AI tools were used in the creation of this content',
  'This content was created with AI support',
];

export default async function (req) {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user || user.role !== 'admin') {
      return Response.json({ error: 'Admin access required' }, { status: 403 });
    }

    let posts = await base44.asServiceRole.entities.SocialPost.filter({}, 'created_date', 500);
    posts = posts.filter((p) => p.status !== 'deleted' && p.content);

    // Skip posts that already carry either disclaimer.
    const toUpdate = posts.filter(
      (p) => !p.content.includes(DISCLAIMERS[0]) && !p.content.includes(DISCLAIMERS[1])
    );
    if (toUpdate.length === 0) {
      return Response.json({ success: true, updated: 0, total: 0, message: 'No posts need a disclaimer' });
    }

    // Alternate disclaimers per platform, cycling through posts in creation order.
    const counters = {};
    const updates = [];
    for (const post of toUpdate) {
      const idx = counters[post.platform] || 0;
      const disclaimer = DISCLAIMERS[idx % DISCLAIMERS.length];
      counters[post.platform] = idx + 1;
      updates.push({ id: post.id, content: `${post.content.trim()}\n${disclaimer}` });
    }

    // bulkUpdate capped at 500 — our list is well within that.
    const chunkSize = 400;
    for (let i = 0; i < updates.length; i += chunkSize) {
      await base44.asServiceRole.entities.SocialPost.bulkUpdate(updates.slice(i, i + chunkSize));
    }

    return Response.json({ success: true, updated: updates.length, total: toUpdate.length });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}