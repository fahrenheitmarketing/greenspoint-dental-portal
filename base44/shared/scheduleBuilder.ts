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

export const CONTENT_RULES = `CONTENT RULES — strictly enforced: Do NOT make any claims of any kind. No medical claims, no health claims, no guarantees of results, no promises about outcomes. Do NOT say something "prevents cavities," "whitens teeth," "cures bad breath," "strengthens enamel," "guarantees a straighter smile," or any similar definitive statement. Frame everything as general educational tips and friendly suggestions using soft language like "can help support," "may contribute to," "consider," "try," or "many people find." Never state that a product, service, or habit will definitively achieve a specific result. Keep content informational and conversational only.

STYLE RULES: Use the em dash ("—") sparingly — at most once per post, and prefer regular punctuation (commas, periods, colons) instead. Do NOT use the sparkles emoji ("✨") at all. Limit emojis in general to one or two per post maximum, and only use common, natural ones (a smile, a tooth, a coffee cup) when they fit the tone — never force them.`;

export function getPlatformsForDate(dayOfWeek) {
  const platforms = [];
  if (dayOfWeek === 2 || dayOfWeek === 4) { platforms.push('twitter'); platforms.push('facebook'); platforms.push('instagram'); }
  if (dayOfWeek === 4) platforms.push('google_business');
  return platforms;
}

export function buildSchedule(month, year) {
  const schedule = [];
  const daysInMonth = new Date(Date.UTC(year, month, 0)).getUTCDate();
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(Date.UTC(year, month - 1, day));
    const platforms = getPlatformsForDate(date.getUTCDay());
    for (const platform of platforms) {
      schedule.push({ date: date.toISOString().slice(0, 10), platform });
    }
  }
  return schedule;
}

export function formatDateLabel(dateStr) {
  const d = new Date(dateStr + 'T00:00:00Z');
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