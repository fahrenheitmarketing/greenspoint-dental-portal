import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';
import { generateOneBlogPost } from '../../shared/blogContentRules.ts';

export default async function (req) {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user || user.role !== 'admin') {
      return Response.json({ error: 'Admin access required' }, { status: 403 });
    }

    const { topic, category, campaignMonth } = await req.json();
    if (!campaignMonth) {
      return Response.json({ error: 'campaignMonth is required' }, { status: 400 });
    }

    const existingPosts = await base44.asServiceRole.entities.BlogStudioPost.list('-created_date', 100);
    const existingTitles = existingPosts.map((p) => p.title).filter(Boolean);

    const created = await generateOneBlogPost(base44, { topic, category, campaignMonth, existingTitles });

    return Response.json({ success: true, post: created });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}