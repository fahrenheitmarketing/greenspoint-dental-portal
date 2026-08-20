import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';
import { clickupFetch, getBrandGuideText } from '../../shared/clickup.ts';
import { IMAGE_PROMPT_INSTRUCTION } from '../../shared/imageRules.ts';

const MONTH_MAP = {
  jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5,
  jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11,
};

const PLATFORM_MAP = {
  facebook: 'facebook',
  instagram: 'instagram',
  twitter: 'twitter',
  google: 'google_business',
};

// Parse a ClickUp task URL to extract the task ID (last path segment after /t/{team}/).
function parseTaskId(taskUrl) {
  try {
    const u = new URL(taskUrl);
    const parts = u.pathname.split('/').filter(Boolean);
    const taskIdx = parts.indexOf('t');
    if (taskIdx >= 0 && parts.length > taskIdx + 1) {
      return parts[parts.length - 1];
    }
    for (let i = 0; i < parts.length; i++) {
      if (parts[i] === 'task' && parts[i + 1]) return parts[i + 1];
    }
  } catch {}
  return null;
}

// Parse the ClickUp task description into structured post sections.
// Each section is delimited by a line of ━ (U+2501) characters and contains:
//   {Platform} — {Mon} {Day}
//   Topic: {topic}
//   {content}
function parseTaskDescription(description, year) {
  const sections = description.split(/\u2501{10,}/).map((s) => s.trim()).filter(Boolean);
  const parsed = [];
  for (const section of sections) {
    const lines = section.split('\n');
    const headerLine = lines.find((l) => l.trim());
    if (!headerLine) continue;
    const headerMatch = headerLine.match(
      /^(Facebook|Instagram|Twitter|Google(?:\s+Business)?)\s*[\u2014\u2013\-]\s*([A-Za-z]+)\s+(\d+)/i
    );
    if (!headerMatch) continue;
    const platformKey = headerMatch[1].toLowerCase().replace(/\s+business/, '');
    const platform = PLATFORM_MAP[platformKey];
    const monthIdx = MONTH_MAP[headerMatch[2].toLowerCase().slice(0, 3)];
    const day = parseInt(headerMatch[3], 10);
    if (!platform || monthIdx === undefined || !day) continue;

    const isoDate = new Date(Date.UTC(year, monthIdx, day)).toISOString().split('T')[0];

    const topicLine = lines.find((l) => l.trim().toLowerCase().startsWith('topic:'));
    const topic = topicLine ? topicLine.replace(/^\s*topic:\s*/i, '').trim() : '';

    const topicIdx = topicLine ? lines.indexOf(topicLine) : -1;
    const contentLines = topicIdx >= 0 ? lines.slice(topicIdx + 1) : [];
    const content = contentLines.join('\n').trim();

    if (content) {
      parsed.push({ platform, scheduled_date: isoDate, topic, content });
    }
  }
  return parsed;
}

const normalize = (s) => (s || '').trim().replace(/\s+/g, ' ');

export default async function (req) {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user || user.role !== 'admin') {
      return Response.json({ error: 'Admin access required' }, { status: 403 });
    }

    const { taskUrl, campaignMonth } = await req.json();
    if (!taskUrl) {
      return Response.json({ error: 'taskUrl is required' }, { status: 400 });
    }

    const taskId = parseTaskId(taskUrl);
    if (!taskId) {
      return Response.json({ error: 'Could not parse a task ID from the provided URL' }, { status: 400 });
    }

    // Determine the year from the campaign month label (e.g. "August 2026")
    let year = new Date().getFullYear();
    if (campaignMonth) {
      const y = parseInt(campaignMonth.split(' ').pop(), 10);
      if (y) year = y;
    }

    // Fetch the task — its description holds the original post copy
    const taskData = await clickupFetch(base44, `/task/${taskId}`, { method: 'GET' });
    const description = taskData.description || '';
    if (!description) {
      return Response.json({ error: 'The ClickUp task has no description to restore from' }, { status: 400 });
    }

    const parsedSections = parseTaskDescription(description, year);
    if (parsedSections.length === 0) {
      return Response.json({ error: 'No post sections found in the task description' }, { status: 400 });
    }

    // Load posts to match against
    const posts = campaignMonth
      ? await base44.asServiceRole.entities.SocialPost.filter({ campaign_month: campaignMonth }, 'scheduled_date', 200)
      : await base44.asServiceRole.entities.SocialPost.list('scheduled_date', 200);

    // Match each parsed section to a post by platform + date + topic (in order)
    const availablePosts = [...posts];
    const toRestore = [];
    let skipped = 0;
    let unmatched = 0;

    for (const section of parsedSections) {
      const matchIdx = availablePosts.findIndex((p) => {
        if (p.platform !== section.platform) return false;
        if (!p.scheduled_date || !p.scheduled_date.startsWith(section.scheduled_date)) return false;
        return normalize(p.topic).toLowerCase() === normalize(section.topic).toLowerCase();
      });

      if (matchIdx === -1) {
        unmatched++;
        continue;
      }

      const match = availablePosts[matchIdx];
      availablePosts.splice(matchIdx, 1);

      // Skip posts whose content is already correct
      if (normalize(match.content) === normalize(section.content)) {
        skipped++;
        continue;
      }

      toRestore.push({ post: match, section });
    }

    // Batch-regenerate image prompts for all posts being restored
    let imagePrompts = [];
    if (toRestore.length > 0) {
      const settingsList = await base44.asServiceRole.entities.SocialMediaSettings.list();
      const settings = settingsList[0];
      const brandGuide = settings ? await getBrandGuideText(base44, settings) : '';

      if (brandGuide) {
        try {
          const llmRes = await base44.asServiceRole.integrations.Core.InvokeLLM({
            prompt: `You are the social media manager for Greenspoint Dental. For each post below, generate a brand-compliant image prompt — a short, SPECIFIC visual direction for a welcoming lifestyle photo.

${IMAGE_PROMPT_INSTRUCTION}

Brand Reference Guide:
${brandGuide}

Posts to generate image prompts for:
${toRestore.map((r, i) => `${i + 1}. Topic: ${r.section.topic}\nPlatform: ${r.post.platform}\nCopy: ${r.section.content}`).join('\n\n')}

Return one image_prompt string per post, in the same order.`,
            model: 'gemini_3_flash',
            response_json_schema: {
              type: 'object',
              properties: {
                prompts: { type: 'array', items: { type: 'string' } },
              },
              required: ['prompts'],
            },
          });
          imagePrompts = llmRes.prompts || [];
        } catch (e) {
          console.error('Image prompt regeneration failed:', e.message);
        }
      }
    }

    // Apply the restored content, regenerated image prompts, and reset status to pending
    for (let i = 0; i < toRestore.length; i++) {
      const { post, section } = toRestore[i];
      const update = {
        content: section.content,
        status: 'pending',
      };
      if (imagePrompts[i]) {
        update.brand_compliance_notes = imagePrompts[i];
      }
      await base44.asServiceRole.entities.SocialPost.update(post.id, update);
    }

    return Response.json({
      success: true,
      restored: toRestore.length,
      skipped,
      unmatched,
      total_sections: parsedSections.length,
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}