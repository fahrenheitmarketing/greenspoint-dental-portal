// Shared blog content generation rules, SEO guidelines, and image prompt builders.

// Internal pages that can be linked from blog posts (for internal linking + CTAs).
export const INTERNAL_PAGES = [
  { path: "/services/general", label: "General Dentistry" },
  { path: "/services/cosmetic", label: "Cosmetic Dentistry" },
  { path: "/services/restorative", label: "Restorative Dentistry" },
  { path: "/services/orthodontics", label: "Orthodontics" },
  { path: "/services/specials", label: "Specials & Offers" },
  { path: "/financing", label: "Financing & Insurance" },
  { path: "/new-patients", label: "New Patients" },
  { path: "/contact", label: "Contact Us" },
  { path: "/", label: "Home" },
];

export const BLOG_CONTENT_RULES = `CONTENT RULES — strictly enforced: Do NOT make any medical claims, health claims, guarantees of results, or promises about outcomes. Frame everything as general educational information and friendly suggestions using soft language like "can help support," "may contribute to," "consider," "try," or "many people find." Never state that a treatment or habit will definitively achieve a specific result. Keep content informational, conversational, and patient-friendly.

STYLE RULES: Write in a warm, professional, accessible tone at an 8th-grade reading level. Use the em dash ("—") sparingly — at most once per post. Do NOT use the sparkles emoji ("✨"). Limit emojis to one or two per post. Use clear headings, short paragraphs, and bullet lists where appropriate.

HEADING HIERARCHY (STRICT): Use exactly ONE <h1> per post, and it must be the post title — identical to or highly correlated with the meta_title. Use <h2> for major sections (frame them as user questions where natural) and <h3> for sub-points only. NEVER skip heading levels for visual styling (no jumping from H2 to H4); a logical hierarchy is essential for screen readers and AI parsing. Do NOT use <h1> anywhere else in the content.

ANSWER-FIRST / INVERTED PYRAMID (CRITICAL): Within the first 100-200 words, provide a direct, complete answer to the post's core question. Search engines and LLMs use this lead block to build AI Overviews and featured snippets — getting to the point first is mandatory, not optional. Spend the rest of the post expanding on nuances, examples, and supporting details.

KEYWORD PLACEMENT: Place the primary keyword naturally in the slug, title tag, first paragraph, and at least one H2. Forget outdated keyword density — write naturally using semantic synonyms and related entities for the remainder of the article. Never stuff keywords.

HTML FORMAT: Return all blog content as clean, semantic HTML using <h1> (only once, for the title), <h2>, <h3>, <p>, <ul>, <ol>, <li>, <strong>, <a href="...">, and <blockquote> tags. Internal links should use the full domain path (e.g. <a href="/services/cosmetic">cosmetic dentistry</a>). External links should use full URLs with target="_blank" and rel="noopener noreferrer". CTAs should be styled links at the end of the post: <p><a href="/contact" style="...">Book Your Appointment Today</a></p>.`;

export const SEO_RULES = `SEO REQUIREMENTS (strict — follow every point):
- meta_title: 50-60 characters. Front-load the primary keyword. Treat the title as a "query contract" that accurately promises what the page delivers — not just a catchy slogan. It must be highly correlated with or identical to the H1 (the post title); if they differ wildly, search engines ignore the meta title and display the H1 instead.
- meta_description: 120-160 characters (aim for the lower end on mobile, which truncates near 120). Include the target keyword naturally (Google bolds it in results) and end with a clear benefit or soft call-to-action. This is your click-earning elevator pitch, not a ranking factor.
- slug: short, lowercase, hyphenated, keyword-rich, no stop words (a, the, and), max ~5 words. The primary keyword MUST appear in the slug. NEVER include the year, month, or any date in the slug — URLs must stay evergreen so updates never require redirects.
- title (H1): compelling, includes the primary keyword, 50-70 characters. This is the single H1 of the page and must align with the meta_title.
- excerpt: 1-2 sentence summary, 100-160 characters, used for blog listing previews.
- Include 2-4 internal links to relevant Greenspoint Dental service pages. Use descriptive anchor text so users and crawlers know what the linked page is about — avoid generic text like "click here." Do NOT force exact-match keyword anchor text every time; vary it naturally to avoid over-optimization.
- Include 1-2 external links to authoritative sources (ADA, CDC, health organizations) with target="_blank".
- Include 1-2 hyperlinked CTAs linking to relevant service pages (/contact, /new-patients, /services/...).
- Estimate read_time in minutes based on word count (~200 words per minute).`;

export const BLOG_IMAGE_FORBIDDEN_SUFFIX = `CRITICAL BRAND RULES — ABSOLUTELY FORBIDDEN IN THE IMAGE: No dental office buildings, no dental clinic exteriors, no reception areas, no dentist offices, no dentist chairs, no exam rooms, no dental staff (dentists, hygienists, assistants), no scrubs or lab coats, no scary dental tools, no clinical or surgical shots, no X-ray machines, no text overlaid on the image. Use positive community-based visual metaphors: morning sunlight, coffee, fresh flowers, a bright neighborhood scene, healthy food, a smiling person outdoors. Ensure the image is anatomically correct and logically coherent. Prefer simple, clean compositions with at most one or two people to avoid AI artifacts. When people are shown, feature Hispanic/Latino individuals reflecting the local Greenspoint community.`;

export function buildBlogImagePrompt(post, brandGuide) {
  const brief = post.image_prompt || "";
  const imageDirection = brief ? `Visual direction: ${brief}. ` : "";
  return `${imageDirection}A welcoming, bright, lifestyle featured image for a dental practice blog post about "${post.title}". The blog content covers: ${(post.excerpt || post.meta_description || "").slice(0, 200)}. Create a high-quality editorial photograph that VISUALLY REPRESENTS this topic — the image must directly reflect the article's message. The image will be displayed as a wide featured image (1200x628px landscape, roughly 1.91:1). ${BLOG_IMAGE_FORBIDDEN_SUFFIX} ${brandGuide || ""}`;
}

// Build the LLM prompt for blog post generation.
export function buildBlogGenerationPrompt({ topic, category, brandGuide, usedTopics, campaignMonth }) {
  const categoryLabel = INTERNAL_PAGES.find((p) => p.path.endsWith(category))?.label || category;
  return `You are the content manager for Greenspoint Dental, a friendly, patient-focused dental practice in the Greenspoint area serving a diverse, largely Hispanic/Latino community.

Brand Reference Guide (must strictly follow):
${brandGuide}

Generate ONE SEO-optimized blog post for the practice website${topic ? ` on the topic: "${topic}"` : ""}${category ? ` in the category: ${categoryLabel}` : ""}${campaignMonth ? ` for the ${campaignMonth} content calendar` : ""}.

Topics already covered in previous posts — do NOT repeat these or create near-duplicates:
${usedTopics.map((t) => `- ${t}`).join('\n')}

${BLOG_CONTENT_RULES}

${SEO_RULES}

SPANISH TRANSLATION: Provide a complete, professional Spanish translation of the entire post — title, excerpt, meta_title, meta_description, and full content (in HTML). The Spanish version should be a natural, culturally appropriate translation, not a literal machine translation. Use Latin American Spanish appropriate for the local community.

INTERNAL LINKING: Embed 2-4 internal links naturally within the content using full paths:
${INTERNAL_PAGES.map((p) => `- <a href="${p.path}">${p.label}</a>`).join('\n')}

CTAs: End the post with 1-2 hyperlinked call-to-action buttons linking to the most relevant page(s) — typically /contact, /new-patients, or a service page.

Return ALL fields: title, title_es, slug, excerpt, excerpt_es, content (HTML), content_es (HTML), category, meta_title, meta_title_es, meta_description, meta_description_es, internal_links (array of {anchor_text, page_path}), external_links (array of {anchor_text, url}), ctas (array of {label, page_path}), image_prompt (a short specific description for the featured image), read_time (integer minutes), seo_score (0-100 integer).`;
}

// Generate a single blog post record via LLM and persist it.
// Shared by generateBlogPost (single) and generateBulkBlogPosts (bulk).
export async function generateOneBlogPost(base44, { topic, category, campaignMonth, existingTitles }) {
  const { getBrandGuideText } = await import('./clickup.ts');
  const settingsList = await base44.asServiceRole.entities.BlogStudioSettings.list();
  const settings = settingsList[0];
  const brandGuide = settings ? await getBrandGuideText(base44, settings) : '';

  const usedTopics = [...new Set(existingTitles || [])].slice(0, 50);
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

  return await base44.asServiceRole.entities.BlogStudioPost.create(record);
}

// Compute all Thursdays in a given month/year as ISO date strings.
// Returns up to `count` Thursdays.
export function getThursdaysInMonth(year, monthIndex, count) {
  const thursdays = [];
  const date = new Date(year, monthIndex, 1);
  // Find the first Thursday
  while (date.getDay() !== 4) {
    date.setDate(date.getDate() + 1);
  }
  // Collect all Thursdays in the month
  while (date.getMonth() === monthIndex) {
    thursdays.push(new Date(date));
    date.setDate(date.getDate() + 7);
  }
  return thursdays.slice(0, count).map((d) => d.toISOString());
}

export const BLOG_GENERATION_SCHEMA = {
  type: 'object',
  properties: {
    title: { type: 'string' },
    title_es: { type: 'string' },
    slug: { type: 'string' },
    excerpt: { type: 'string' },
    excerpt_es: { type: 'string' },
    content: { type: 'string' },
    content_es: { type: 'string' },
    category: { type: 'string', enum: ['general-dentistry', 'cosmetic-dentistry', 'restorative-dentistry', 'orthodontics', 'family-dental', 'insurance-financing', 'dental-health', 'smile-confidence', 'affordable-dentistry', 'community'] },
    meta_title: { type: 'string' },
    meta_title_es: { type: 'string' },
    meta_description: { type: 'string' },
    meta_description_es: { type: 'string' },
    internal_links: { type: 'array', items: { type: 'object', properties: { anchor_text: { type: 'string' }, page_path: { type: 'string' } } } },
    external_links: { type: 'array', items: { type: 'object', properties: { anchor_text: { type: 'string' }, url: { type: 'string' } } } },
    ctas: { type: 'array', items: { type: 'object', properties: { label: { type: 'string' }, page_path: { type: 'string' } } } },
    image_prompt: { type: 'string' },
    read_time: { type: 'number' },
    seo_score: { type: 'number' },
  },
  required: ['title', 'title_es', 'slug', 'excerpt', 'excerpt_es', 'content', 'content_es', 'category', 'meta_title', 'meta_title_es', 'meta_description', 'meta_description_es', 'image_prompt'],
};