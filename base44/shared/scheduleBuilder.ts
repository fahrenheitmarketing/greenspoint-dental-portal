// Shared scheduling constants and builders for social media content generation.
// Used by generateSocialMediaContent (copy-only) and generateFullMonth (end-to-end with images).

export const PLATFORM_TONE = {
  facebook: "Conversational, community-focused, and reassuring.",
  instagram: "Trendy, visual-first, smile transformations, punchy hooks, no links in the copy.",
  twitter: "Professional thought-leadership, dental industry insights, practice updates.",
  google_business: "Local practice updates, clear calls to action, community focused.",
};

export const PLATFORM_LABEL = {
  facebook: "FACEBOOK",
  instagram: "INSTAGRAM",
  twitter: "TWITTER / X",
  google_business: "GOOGLE BUSINESS",
};

export const PLATFORM_ORDER = ['facebook', 'instagram', 'twitter', 'google_business'];

const SHORT_LINK_PAGE_LABELS = {
  '/': 'Home page',
  '/services/general': 'General Dentistry',
  '/services/restorative': 'Restorative Dentistry',
  '/services/cosmetic': 'Cosmetic Dentistry',
  '/services/orthodontics': 'Orthodontics',
  '/services/specials': 'Specials & Offers',
  '/new-patients': 'New Patients',
  '/contact': 'Contact Us',
};

// Build a per-platform short-link CTA instruction for the LLM.
// Returns '' if no short links are configured for the platform.
export function buildShortLinkCtaInstruction(settings, platform) {
  if (platform === 'google_business') return '';
  const links = (settings && Array.isArray(settings.short_links)) ? settings.short_links : [];
  const platformLinks = links.filter((l) => l.platform === platform || l.platform === 'all');
  if (platformLinks.length === 0) return '';
  const list = platformLinks
    .map((l) => `- ${SHORT_LINK_PAGE_LABELS[l.page] || l.page}: ${l.url}`)
    .join('\n');
  if (platform === 'instagram') {
    return `SHORT LINK CTA RULE (instagram): Do NOT paste any URL in the copy. If relevant to the topic, end with a soft call-to-action like "Tap the link in our bio to learn more" or "Link in bio for details." Pick the most relevant landing page above as the bio-link target, but do NOT include the URL in the copy text.`;
  }
  return `SHORT LINK CTA RULE: End the post with a concise, natural call-to-action linking to the single most relevant landing page for the post's topic. Choose ONE short link from this list (pick the best topical match):
${list}
Paste the short link URL as-is at the end of the post. Do not add UTM params, do not repeat the URL, and only include a link if one is topically relevant.`;
}

export const GBP_CTA_PAGES = [
  { path: '/', label: 'Home page' },
  { path: '/services/general', label: 'General Dentistry' },
  { path: '/services/restorative', label: 'Restorative Dentistry' },
  { path: '/services/cosmetic', label: 'Cosmetic Dentistry' },
  { path: '/services/orthodontics', label: 'Orthodontics' },
  { path: '/services/specials', label: 'Specials & Offers' },
  { path: '/new-patients', label: 'New Patients' },
  { path: '/contact', label: 'Contact Us' },
];

export const GBP_BUTTON_TYPES = ['LEARN_MORE', 'BOOK', 'GET_OFFER', 'CALL', 'SIGN_UP'];

export function buildGbpCtaInstruction() {
  const pageList = GBP_CTA_PAGES.map((p) => `- ${p.path} (${p.label})`).join('\n');
  return `GBP CTA RULE (google_business): Do NOT include any URL in the post copy. Instead, choose the single most relevant landing page and the best GMB button type for the post's topic.
Landing pages:
${pageList}
Button types: LEARN_MORE (educational/general info), GET_OFFER (specials/discounts), BOOK (appointment-focused), CALL (contact/phone-focused), SIGN_UP (newsletter/new patient sign-up).
Return cta_page_path (one of the paths above) and cta_button_type (one of the button types above) as separate fields. The copy itself must never contain a URL.`;
}

export const CONTENT_RULES = `CONTENT RULES — strictly enforced: Do NOT make any claims of any kind. No medical claims, no health claims, no guarantees of results, no promises about outcomes. Do NOT say something "prevents cavities," "whitens teeth," "cures bad breath," "strengthens enamel," "guarantees a straighter smile," or any similar definitive statement. Frame everything as general educational tips and friendly suggestions using soft language like "can help support," "may contribute to," "consider," "try," or "many people find." Never state that a product, service, or habit will definitively achieve a specific result. Keep content informational and conversational only.

STYLE RULES: Use the em dash ("—") sparingly — at most once per post, and prefer regular punctuation (commas, periods, colons) instead. Do NOT use the sparkles emoji ("✨") at all. Limit emojis in general to one or two per post maximum, and only use common, natural ones (a smile, a tooth, a coffee cup) when they fit the tone — never force them.`;

export const GBP_LENGTH_RULE = "GBP (google_business) length: Aim for 150 to 300 words. Google allows up to 1,500 characters, but shorter text is easier to read. Write a substantive local practice update with a few useful details for the reader, and keep the relevant CTA chosen via the GBP CTA rule (never put a URL in the copy).";

// Mandatory AI disclosure appended to the bottom of every social post (all platforms).
// Exactly one of these two lines — never both — must appear at the end of the copy.
export const AI_DISCLAIMERS = [
  'AI tools were used in the creation of this content',
  'This content was created with AI support',
];

// Append one AI disclaimer to the bottom of a post's content. Idempotent: if either
// disclaimer is already present, the content is returned unchanged. `seed` picks which
// of the two disclaimers is used (use an index for variety across a batch).
export function appendAiDisclaimer(content, seed = 0) {
  if (!content) return content;
  const trimmed = String(content).trim();
  if (trimmed.includes(AI_DISCLAIMERS[0]) || trimmed.includes(AI_DISCLAIMERS[1])) {
    return trimmed;
  }
  const choice = AI_DISCLAIMERS[Math.abs(seed) % AI_DISCLAIMERS.length];
  return `${trimmed}\n${choice}`;
}

export const HASHTAG_RULES = {
  instagram: "Use 3 to 5 highly relevant hashtags. Instagram allows up to 30, but a smaller, targeted group keeps captions clean and performs well.",
  twitter: "Use 1 to 2 focused hashtags. Space is tight, so only use core keywords.",
  facebook: "Use 0 to 2 organic hashtags. Many Facebook posts perform best with zero hashtags; never exceed two.",
  linkedin: "Use 3 to 5 industry-specific hashtags relevant to dentistry and the post topic.",
  google_business: "Do not include any hashtags. GBP posts must never contain hashtags.",
};

// Enforced hashtag count ranges per platform (used by generation + backfill).
export const HASHTAG_COUNTS = {
  instagram: { min: 3, max: 5 },
  linkedin: { min: 3, max: 5 },
  twitter: { min: 1, max: 2 },
  facebook: { min: 0, max: 2 },
  google_business: { min: 0, max: 0 },
};

export function buildHashtagInstruction(platform) {
  const rule = HASHTAG_RULES[platform];
  return rule
    ? `HASHTAG RULE (${platform}): ${rule} Place all hashtags on the final line of the post, separated by spaces.`
    : '';
}

export function getPlatformsForDate(dayOfWeek) {
  const platforms = [];
  if (dayOfWeek === 2 || dayOfWeek === 4) { platforms.push('twitter'); platforms.push('facebook'); platforms.push('instagram'); }
  if (dayOfWeek === 4) platforms.push('google_business');
  return platforms;
}

// Posting times: one post per hour in the 2PM–5PM Johannesburg (SAST) window.
// Tuesdays carry 3 posts (2, 3, 4PM); Thursdays carry 4 (2, 3, 4, 5PM — GBP last).
// Johannesburg has no daylight saving, so SAST is a fixed UTC+2.
export const SAST_OFFSET_HOURS = 2;
export const AFTERNOON_SLOTS_SAST = [14, 15, 16, 17];

// Convert a SAST hour slot on a given UTC calendar date into a full UTC ISO datetime.
export function sastSlotToISO(year, monthIndex, day, sastHour) {
  return new Date(Date.UTC(year, monthIndex, day, sastHour - SAST_OFFSET_HOURS, 0, 0, 0)).toISOString();
}

export function buildSchedule(month, year) {
  const schedule = [];
  const daysInMonth = new Date(Date.UTC(year, month, 0)).getUTCDate();
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(Date.UTC(year, month - 1, day));
    const platforms = getPlatformsForDate(date.getUTCDay());
    if (platforms.length === 0) continue;
    for (let i = 0; i < platforms.length; i++) {
      schedule.push({ date: sastSlotToISO(year, month - 1, day, AFTERNOON_SLOTS_SAST[i]), platform: platforms[i] });
    }
  }
  return schedule;
}

export function formatDateLabel(dateStr) {
  // Handles both date-only ("2026-08-25") and full ISO ("2026-08-25T13:23:00.000Z")
  const d = new Date(dateStr);
  return d.toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
}

export function buildTaskDescription(campaignMonth, posts) {
  let desc = `# GP - Social Posts [${campaignMonth}]\n\n`;
  desc += `Monthly social media content pipeline for ${campaignMonth}.\n\n`;
  desc += `**Review instructions:** Comment on this task with "Approved for Publish" or "Approved for Schedule". Reference the platform and date (e.g., "Facebook - Aug 15: Approved for Publish"). For copy edits, quote the platform/date and provide the revised text. For image changes, mention the platform/date and what to change. Creatives are attached to this task as files.\n\n---\n\n`;
  for (const platform of PLATFORM_ORDER) {
    const platformPosts = posts.filter((p) => p.platform === platform);
    if (platformPosts.length === 0) continue;
    desc += `## ${PLATFORM_LABEL[platform]}\n\n`;
    for (const post of platformPosts) {
      desc += `### ${formatDateLabel(post.date)} — ${post.topic}\n\n`;
      desc += `${post.content}\n\n`;
      desc += `*Image direction: ${post.image_prompt}*\n\n`;
      desc += `---\n\n`;
    }
  }
  return desc;
}