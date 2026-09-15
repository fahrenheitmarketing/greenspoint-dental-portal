import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';
import { countWords } from '../../shared/blogQA.ts';

// Rewrites existing BlogStudioPost articles (EN + ES) so the body copy lands
// in the 800-1000 word range. Idempotent: language versions already within
// range are skipped, so a timed-out run can simply be invoked again.

const MIN_WORDS = 800;

function buildExpandPrompt(html, currentWords, isSpanish) {
  const langLine = isSpanish
    ? 'This is the SPANISH version of the post: write the expanded post in natural, culturally appropriate Latin American Spanish (not a literal word-for-word translation).'
    : 'Write the expanded post in English.';
  return `You are expanding an existing blog post for Greenspoint Dental, a friendly dental practice in the Greenspoint area of Houston serving a diverse, largely Hispanic/Latino community.

TASK: Rewrite and expand the post below from ${currentWords} words to 900-1000 words of body copy. Keep the same topic, the same single <h1> title, and the same ending call-to-action. ${langLine}

STRICT RULES:
- Keep ALL existing internal links (<a href="/...">) and external links (<a href="https://..." target="_blank" rel="noopener noreferrer">) with their exact hrefs and natural anchor text.
- Keep the call-to-action block at the very end of the post.
- Use exactly ONE <h1> (the post title). Add new <h2> sections (framed as reader questions where natural) and <h3> sub-points.
- Do NOT use em dashes (—) anywhere.
- Do NOT include specific statistics, percentages, or precise figures.
- Do NOT make medical claims, health claims, or guarantees of results — use soft language ("can help support", "may contribute to").
- Warm, conversational tone at an 8th-grade reading level. Keep the direct answer within the first 100-200 words.
- Reference local Greenspoint/Houston community context (seasonal events, family life) where natural.
- Return clean semantic HTML only (h1, h2, h3, p, ul, ol, li, strong, a, blockquote).

CURRENT POST HTML:
${html}

Return JSON: { "content": "<full expanded post as HTML>" }`;
}

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

    const posts = [];
    for (const cm of campaignMonths) {
      const list = await base44.asServiceRole.entities.BlogStudioPost.filter({ campaign_month: cm });
      posts.push(...list);
    }

    const todo = posts.filter(
      (p) => countWords(p.content) < MIN_WORDS || (p.content_es && countWords(p.content_es) < MIN_WORDS)
    );
    const skipped = posts.length - todo.length;
    if (todo.length === 0) {
      return Response.json({ success: true, posts_total: posts.length, skipped, message: 'All posts are already within the word count range.' });
    }

    const summary = [];
    let nextIdx = 0;

    const expandContent = async (html, isSpanish) => {
      let prompt = buildExpandPrompt(html, countWords(html), isSpanish);
      for (let attempt = 0; attempt < 2; attempt++) {
        if (attempt === 1) {
          prompt += '\n\nIMPORTANT: The previous attempt was too short. The returned HTML MUST contain at least 900 words of body copy.';
        }
        const res = await base44.asServiceRole.integrations.Core.InvokeLLM({
          prompt,
          model: 'gemini_3_flash',
          response_json_schema: { type: 'object', properties: { content: { type: 'string' } }, required: ['content'] },
        });
        const content = String(res?.content || '').replace(/\u2014/g, ' - ');
        if (countWords(content) >= MIN_WORDS) return content;
      }
      throw new Error('expanded content still below 800 words after retry');
    };

    const processPost = async (post) => {
      const update = {};
      const entry = { title: post.title, en: 'skipped', es: 'skipped' };
      try {
        if (countWords(post.content) < MIN_WORDS) {
          update.content = await expandContent(post.content, false);
          entry.en = `${countWords(update.content)} words`;
        }
        if (post.content_es && countWords(post.content_es) < MIN_WORDS) {
          update.content_es = await expandContent(post.content_es, true);
          entry.es = `${countWords(update.content_es)} words`;
        }
        const enWords = countWords(update.content ?? post.content);
        update.read_time = Math.max(1, Math.ceil(enWords / 200));
        await base44.asServiceRole.entities.BlogStudioPost.update(post.id, update);
      } catch (e) {
        entry.error = e.message;
      }
      summary.push(entry);
    };

    const LIMIT = 3;
    const runners = Array.from({ length: Math.min(LIMIT, todo.length) }, async () => {
      while (true) {
        const i = nextIdx++;
        if (i >= todo.length) break;
        await processPost(todo[i]);
      }
    });
    await Promise.all(runners);

    const failed = summary.filter((s) => s.error);
    return Response.json({
      success: failed.length === 0,
      posts_total: posts.length,
      posts_expanded: summary.filter((s) => !s.error && (s.en !== 'skipped' || s.es !== 'skipped')).length,
      skipped,
      failed: failed.length,
      summary,
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}