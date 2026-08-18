import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';

// Strip hashtag tokens from a post's copy while preserving all other text
// (including the AI disclaimer line).
function stripHashtags(content) {
  return content
    .split('\n')
    .map((line) => line.replace(/#\w+/g, '').replace(/\s{2,}/g, ' ').trim())
    .filter((line) => line.length > 0)
    .join('\n');
}

export default async function (req) {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user || user.role !== 'admin') {
      return Response.json({ error: 'Admin access required' }, { status: 403 });
    }

    let posts = await base44.asServiceRole.entities.SocialPost.filter({ platform: 'google_business' }, 'created_date', 500);
    posts = posts.filter((p) => p.status !== 'deleted' && p.content);

    let updated = 0;
    const updates = [];
    for (const post of posts) {
      const cleaned = stripHashtags(post.content);
      if (cleaned !== post.content) {
        updates.push({ id: post.id, content: cleaned });
      }
    }

    const chunkSize = 400;
    for (let i = 0; i < updates.length; i += chunkSize) {
      await base44.asServiceRole.entities.SocialPost.bulkUpdate(updates.slice(i, i + chunkSize));
      updated += Math.min(chunkSize, updates.length - i);
    }

    return Response.json({ success: true, updated, total: posts.length });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}