// Shared Blog QA engine: runs the 7 mandatory quality checks and auto-fixes
// failing sections. Used by runBlogQA (report) and autoFixBlogQA (fix loop).

export const QA_CHECKS = [
  { id: "no_em_dashes", label: "No em dashes", description: "No em dashes in title, meta, or body." },
  { id: "meta_title_length", label: "Meta title length", description: "Within 50–60 characters." },
  { id: "meta_description_length", label: "Meta description length", description: "Within 150–160 characters." },
  { id: "word_count", label: "Word count", description: "Within 900–1300 words." },
  { id: "no_unverifiable_statistics", label: "No unverifiable statistics", description: "No specific statistics or percentages; no hallucinated metrics." },
  { id: "no_claims", label: "No claims", description: "No medical claims, health claims, or guarantees of results." },
  { id: "cta_distinct", label: "CTA distinct", description: "CTA is unique and focuses on form submission or calls." },
];

const EM_DASH = "\u2014";

function stripHtml(html) {
  return (html || "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&[a-z]+;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function countWords(html) {
  const text = stripHtml(html);
  if (!text) return 0;
  return text.split(/\s+/).filter(Boolean).length;
}

function hasEmDash(str) {
  return (str || "").includes(EM_DASH);
}

// Programmatic checks (no LLM needed): em dashes, meta lengths, word count.
export function runProgrammaticChecks(post) {
  const metaTitleLen = (post.meta_title || "").length;
  const metaDescLen = (post.meta_description || "").length;
  const words = countWords(post.content);
  return [
    {
      id: "no_em_dashes",
      label: "No em dashes",
      passed: ![post.title, post.meta_title, post.meta_description, post.content].some((s) => hasEmDash(s)),
      detail: "Checked title, meta title, meta description, and body for em dashes (—).",
    },
    {
      id: "meta_title_length",
      label: "Meta title length",
      passed: metaTitleLen >= 50 && metaTitleLen <= 60,
      detail: `Current: ${metaTitleLen} characters (target 50–60).`,
    },
    {
      id: "meta_description_length",
      label: "Meta description length",
      passed: metaDescLen >= 150 && metaDescLen <= 160,
      detail: `Current: ${metaDescLen} characters (target 150–160).`,
    },
    {
      id: "word_count",
      label: "Word count",
      passed: words >= 900 && words <= 1300,
      detail: `Current: ${words} words (target 900–1300).`,
    },
  ];
}

// LLM-based checks: unverifiable statistics, claims, and CTA distinctness.
// Single LLM call evaluates all three and returns structured pass/fail + reason.
export async function runLlmChecks(base44, post) {
  const prompt = `You are a strict QA reviewer for a dental practice blog post. Evaluate the post below against three checks. Return JSON with a boolean "passed" and a short "reason" for each.

CHECKS:
1. "no_unverifiable_statistics": The post must NOT contain specific statistics, percentages, or precise metrics that are unverifiable or potentially hallucinated (e.g. "92% of people", "3 out of 4 patients", "studies show 78%"). Generic, well-established recommendations (e.g. "the ADA recommends brushing twice a day") are acceptable. PASS only if no unverifiable specific statistics or percentages appear anywhere in the content.
2. "no_claims": The post must NOT make medical claims, health claims, or guarantees of results (e.g. "will cure", "guarantees whiter teeth", "prevents cavities completely"). Soft hedging language ("can help support", "may contribute to", "consider") is acceptable. PASS only if no claims or guarantees of outcomes appear.
3. "cta_distinct": The call-to-action must be unique and focus on form submission or phone calls (e.g. "Book Your Appointment", "Call Us Today", "Schedule Your Visit", "Contact Us") rather than generic read-more links. PASS only if at least one CTA focuses on booking, calling, or contacting the practice.

TITLE: ${post.title || ""}
META TITLE: ${post.meta_title || ""}
META DESCRIPTION: ${post.meta_description || ""}
CONTENT (HTML):
${post.content || ""}
CTAS: ${JSON.stringify(post.ctas || [])}

Return JSON with keys "no_unverifiable_statistics", "no_claims", "cta_distinct", each an object { "passed": boolean, "reason": string }.`;

  const res = await base44.asServiceRole.integrations.Core.InvokeLLM({
    prompt,
    model: "gemini_3_flash",
    response_json_schema: {
      type: "object",
      properties: {
        no_unverifiable_statistics: {
          type: "object",
          properties: { passed: { type: "boolean" }, reason: { type: "string" } },
          required: ["passed", "reason"],
        },
        no_claims: {
          type: "object",
          properties: { passed: { type: "boolean" }, reason: { type: "string" } },
          required: ["passed", "reason"],
        },
        cta_distinct: {
          type: "object",
          properties: { passed: { type: "boolean" }, reason: { type: "string" } },
          required: ["passed", "reason"],
        },
      },
      required: ["no_unverifiable_statistics", "no_claims", "cta_distinct"],
    },
  });

  return [
    {
      id: "no_unverifiable_statistics",
      label: "No unverifiable statistics",
      passed: !!res?.no_unverifiable_statistics?.passed,
      detail: res?.no_unverifiable_statistics?.reason || "",
    },
    {
      id: "no_claims",
      label: "No claims",
      passed: !!res?.no_claims?.passed,
      detail: res?.no_claims?.reason || "",
    },
    {
      id: "cta_distinct",
      label: "CTA distinct",
      passed: !!res?.cta_distinct?.passed,
      detail: res?.cta_distinct?.reason || "",
    },
  ];
}

// Run all 7 checks and return a structured report.
export async function runAllChecks(base44, post) {
  const programmatic = runProgrammaticChecks(post);
  const llm = await runLlmChecks(base44, post);
  const checks = [...programmatic, ...llm];
  const allPassed = checks.every((c) => c.passed);
  return { checks, allPassed, runAt: new Date().toISOString() };
}

// Deterministically trim over-length content: keep the first block (answer-first
// intro) and the last block (CTA), dropping middle paragraphs until under the limit.
export function trimToWordCount(html, maxWords = 1250) {
  const words = countWords(html);
  if (words <= maxWords) return html;
  const blocks = html
    .split(/(?<=<\/(?:p|h2|h3|h4|ul|ol|blockquote)>)/i)
    .filter((b) => b.trim());
  if (blocks.length <= 2) return html;
  const first = blocks[0];
  const last = blocks[blocks.length - 1];
  const lastWords = countWords(last);
  const middle = blocks.slice(1, -1);
  const kept = [first];
  let total = countWords(first);
  for (const block of middle) {
    const w = countWords(block);
    if (total + w > maxWords - lastWords) break;
    kept.push(block);
    total += w;
  }
  kept.push(last);
  return kept.join("");
}

// Programmatic fix: replace em dashes with spaced hyphens in title/meta/body.
export function fixEmDashes(post) {
  const replace = (s) => (s || "").replace(new RegExp(EM_DASH, "g"), " - ");
  return {
    ...post,
    title: replace(post.title),
    meta_title: replace(post.meta_title),
    meta_description: replace(post.meta_description),
    content: replace(post.content),
  };
}

// LLM fix: regenerate the failing fields so the post passes the remaining checks.
export async function llmAutoFix(base44, post, failingIds) {
  const currentWords = countWords(post.content);
  const wordInstruction = failingIds.includes("word_count")
    ? `"word_count": The current content is ${currentWords} words — it MUST be between 900 and 1300 words. ${
        currentWords > 1300
          ? `Remove approximately ${currentWords - 1100} words by cutting redundant paragraphs, repeated examples, and filler while keeping every heading, link, and the core educational points. Be aggressive — do not just shave a few words.`
          : `Add approximately ${1100 - currentWords} words of relevant educational detail, examples, and tips while keeping the existing structure, headings, and links.`
      } Return the FULL corrected content as HTML.`
    : "";

  const prompt = `You are fixing a dental practice blog post so it passes specific QA checks. Return ONLY the corrected fields as JSON. Keep the post's topic, structure, and meaning intact. Do NOT introduce em dashes (—). Do NOT add specific statistics, percentages, or medical claims/guarantees. Use soft language ("can help support", "may contribute to").

FAILING CHECKS TO FIX:
${failingIds.map((id) => `- ${id}`).join("\n")}

FIELD-SPECIFIC INSTRUCTIONS:
- "meta_title_length": Rewrite meta_title to be between 50 and 60 characters (currently ${(post.meta_title || "").length} characters).
- "meta_description_length": Rewrite meta_description to be between 150 and 160 characters (currently ${(post.meta_description || "").length} characters).
${wordInstruction}
- "no_unverifiable_statistics": Remove or generalize any specific statistics or percentages in the content.
- "no_claims": Remove or soften any medical claims or guarantees in the title and content.
- "cta_distinct": Ensure at least one CTA focuses on booking, calling, or contacting. Update the ctas array accordingly.

CURRENT POST:
title: ${post.title || ""}
meta_title: ${post.meta_title || ""}
meta_description: ${post.meta_description || ""}
content (HTML):
${post.content || ""}
ctas: ${JSON.stringify(post.ctas || [])}

Return JSON with any of these keys you change: { "title": string, "meta_title": string, "meta_description": string, "content": string, "ctas": [{ "label": string, "page_path": string }] }. Do NOT use em dashes anywhere.`;

  const res = await base44.asServiceRole.integrations.Core.InvokeLLM({
    prompt,
    model: "gemini_3_flash",
    response_json_schema: {
      type: "object",
      properties: {
        title: { type: "string" },
        meta_title: { type: "string" },
        meta_description: { type: "string" },
        content: { type: "string" },
        ctas: {
          type: "array",
          items: {
            type: "object",
            properties: { label: { type: "string" }, page_path: { type: "string" } },
            required: ["label", "page_path"],
          },
        },
      },
    },
  });
  return res;
}