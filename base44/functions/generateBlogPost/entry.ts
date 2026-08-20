import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';
import { getBrandGuideText } from '../../shared/clickup.ts';
import { buildBlogGenerationPrompt, BLOG_GENERATION_SCHEMA } from '../../shared/blogContentRules.ts';

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

    const settingsList = await base44.asServiceRole.entities.BlogStudioSettings.list();
    const settings = settingsList[0];
    const brandGuide = settings ? await getBrandGuideText(base44, settings) : '';

    // Fetch existing titles to avoid repetition
    const existingPosts = await base44.asServiceRole.entities.BlogStudioPost.list('-created_date', 100);
    const usedTopics = [...new Set(existingPosts.map((p) => p.title).filter(Boolean))].slice(0, 50);

    const prompt = buildBlogGenerationPrompt({ topic, category, brandGuide, usedTopics, campaignMonth });

    const genRes = await base44.asServiceRole.integrations.Core.InvokeLLM({
      prompt,
      model: 'gemini_3_flash',
      response_json_schema: BLOG_GENERATION_SCHEMA,
    });

    const record = {
      title: genRes.title,
      title_es: genRes.title_es,
      slug: genRes.slug,
      excerpt: genRes.excerpt,
      excerpt_es: genRes.excerpt_es,
      content: genRes.content,
      content_es: genRes.content_es,
      category: genRes.category || category || 'dental-health',
      meta_title: genRes.meta_title,
      meta_title_es: genRes.meta_title_es,
      meta_description: genRes.meta_description,
      meta_description_es: genRes.meta_description_es,
      internal_links: genRes.internal_links || [],
      external_links: genRes.external_links || [],
      ctas: genRes.ctas || [],
      image_prompt: genRes.image_prompt,
      read_time: genRes.read_time || Math.ceil((genRes.content || '').split(/\s+/).length / 200),
      seo_score: genRes.seo_score || 0,
      status: 'draft',
      campaign_month: campaignMonth,
      author: 'Greenspoint Dental Team',
    };

    const created = await base44.asServiceRole.entities.BlogStudioPost.create(record);

    return Response.json({ success: true, post: created });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}