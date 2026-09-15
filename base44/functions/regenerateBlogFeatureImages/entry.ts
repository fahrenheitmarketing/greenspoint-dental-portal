import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';
import { getBrandGuideText } from '../../shared/clickup.ts';
import { buildBlogImagePrompt } from '../../shared/blogContentRules.ts';
import { resizeAndUploadBlogImage } from '../../shared/blogImages.ts';

// Recreates the featured image for every blog post in the given campaign
// months. Briefs are re-derived from each article's actual content in a
// single planning call (forcing distinct scenes across posts), with early
// autumn/fall seasonal cues, then images are generated, cover-cropped to
// 1200x628, uploaded, and saved back to the post.

export default async function (req) {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user || user.role !== 'admin') {
      return Response.json({ error: 'Admin access required' }, { status: 403 });
    }

    const body = await req.json().catch(() => ({}));
    const campaignMonths = Array.isArray(body?.campaignMonths) && body.campaignMonths.length
      ? body.campaignMonths
      : ['September 2026', 'October 2026'];
    const onlyPostIds = Array.isArray(body?.onlyPostIds) && body.onlyPostIds.length ? body.onlyPostIds : null;

    const posts = [];
    for (const cm of campaignMonths) {
      const list = await base44.asServiceRole.entities.BlogStudioPost.filter({ campaign_month: cm });
      posts.push(...list);
    }
    const targets = onlyPostIds ? posts.filter((p) => onlyPostIds.includes(p.id)) : posts;
    if (targets.length === 0) {
      return Response.json({ error: 'No matching posts found' }, { status: 404 });
    }

    const settingsList = await base44.asServiceRole.entities.BlogStudioSettings.list();
    const brandGuide = settingsList[0] ? await getBrandGuideText(base44, settingsList[0]) : '';

    // 1) Single planning call: one distinct, content-specific visual brief per post.
    const briefs = targets.map((p) => {
      const headings = (String(p.content || '').match(/<h2[^>]*>[\s\S]*?<\/h2>/gi) || [])
        .map((h) => h.replace(/<[^>]+>/g, '').trim())
        .slice(0, 6);
      return `- id: ${p.id}\n  title: ${p.title}\n  excerpt: ${(p.excerpt || '').slice(0, 200)}\n  section headings: ${headings.join(' | ')}`;
    }).join('\n');

    const planRes = await base44.asServiceRole.integrations.Core.InvokeLLM({
      prompt: `You are an art director for Greenspoint Dental's blog (a friendly dental practice in the Greenspoint area of Houston serving a diverse, largely Hispanic/Latino community).

For EACH blog post below, write ONE new featured-image brief (image_prompt): a specific, distinct editorial lifestyle photograph that directly represents that article's core topic.

RULES:
- Each post gets a completely different main subject, setting, and scene — no two briefs may share the same subject or trope. Do NOT fall back on generic stock-photo clichés like a woman sipping coffee or a smiling person with no context.
- The visual must connect directly to the specific article content (title, excerpt, and section headings) — a reader should be able to guess the article's topic from the image alone.
- NO dental offices, clinics, reception areas, dental chairs, dentists or dental staff, scrubs, dental tools, X-rays, or clinical/surgical shots. Use positive community-lifestyle metaphors instead (home routines, family moments, neighborhood scenes, food, nature, seasonal moments).
- These posts publish from late September through October: weave in early autumn/fall cues (golden afternoon light, fall leaves, autumn produce like apples or pumpkins, cozy layers, back-to-school moments) where they fit naturally.
- When people appear, feature Hispanic/Latino individuals reflecting the local community, at most one or two people per image, simple clean composition, no text in the image.

POSTS:
${briefs}

Return JSON { "images": [{ "id": string, "image_prompt": string }] } with exactly one entry per post id.`,
      model: 'gemini_3_flash',
      response_json_schema: {
        type: 'object',
        properties: {
          images: {
            type: 'array',
            items: {
              type: 'object',
              properties: { id: { type: 'string' }, image_prompt: { type: 'string' } },
              required: ['id', 'image_prompt'],
            },
          },
        },
        required: ['images'],
      },
    });

    const planById = {};
    for (const item of planRes?.images || []) {
      if (item?.id && item?.image_prompt) planById[item.id] = item.image_prompt;
    }

    // 2) Generate, crop, upload, and persist per post with bounded concurrency.
    const summary = [];
    let nextIdx = 0;

    const processPost = async (post) => {
      const newPrompt = planById[post.id];
      const entry = { title: post.title };
      try {
        if (!newPrompt) throw new Error('no image brief returned by planner');
        const fullPrompt = buildBlogImagePrompt({ ...post, image_prompt: newPrompt }, brandGuide);
        const { url } = await base44.asServiceRole.integrations.Core.GenerateImage({ prompt: fullPrompt });
        const finalUrl = await resizeAndUploadBlogImage(base44, url, `blog-${post.id}`);
        await base44.asServiceRole.entities.BlogStudioPost.update(post.id, { image_url: finalUrl, image_prompt: newPrompt });
        entry.status = 'regenerated';
      } catch (e) {
        entry.status = 'failed';
        entry.error = e.message;
      }
      summary.push(entry);
    };

    const LIMIT = 3;
    const runners = Array.from({ length: Math.min(LIMIT, targets.length) }, async () => {
      while (true) {
        const i = nextIdx++;
        if (i >= targets.length) break;
        await processPost(targets[i]);
      }
    });
    await Promise.all(runners);

    const failed = summary.filter((s) => s.error);
    return Response.json({
      success: failed.length === 0,
      regenerated: summary.length - failed.length,
      failed: failed.length,
      summary,
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}