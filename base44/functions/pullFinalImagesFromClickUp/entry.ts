import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';
import { getClickUpAttachments } from '../../shared/clickup.ts';

// Parse platform + date from a ClickUp attachment filename.
// Expected convention: "{platform}-{YYYY-MM-DD}-{topic}.jpg"
function parseFilename(filename) {
  if (!filename) return null;
  const platformMatch = filename.match(/^(facebook|instagram|twitter|google_business)/);
  const dateMatch = filename.match(/(\d{4}-\d{2}-\d{2})/);
  if (!platformMatch || !dateMatch) return null;
  return { platform: platformMatch[1], date: dateMatch[1] };
}

export default async function (req) {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user || user.role !== 'admin') {
      return Response.json({ error: 'Admin access required' }, { status: 403 });
    }

    const { campaignMonth, taskUrl } = await req.json();
    if (!campaignMonth && !taskUrl) {
      return Response.json({ error: 'Either campaignMonth or taskUrl is required' }, { status: 400 });
    }

    const settingsList = await base44.asServiceRole.entities.SocialMediaSettings.list();
    const settings = settingsList[0];

    // Parse task ID from a ClickUp task URL if provided
    let taskUrlTaskId = null;
    if (taskUrl) {
      try {
        const u = new URL(taskUrl);
        const parts = u.pathname.split("/").filter(Boolean);
        const taskIdx = parts.indexOf("t");
        if (taskIdx >= 0 && parts.length > taskIdx + 1) {
          // URL format: t/{teamId}/{taskId} — task ID is the LAST segment
          taskUrlTaskId = parts[parts.length - 1];
        }
        if (!taskUrlTaskId) {
          for (let i = 0; i < parts.length; i++) {
            if (parts[i] === "task" && parts[i + 1]) { taskUrlTaskId = parts[i + 1]; break; }
          }
        }
      } catch {}
      if (!taskUrlTaskId) {
        return Response.json({ error: 'Could not parse a task ID from the provided URL' }, { status: 400 });
      }
    }

    if (!taskUrlTaskId && (!settings || !settings.clickup_workspace_id)) {
      return Response.json({ error: 'ClickUp workspace ID is required in Settings to pull attachments.' }, { status: 400 });
    }

    const posts = campaignMonth
      ? await base44.asServiceRole.entities.SocialPost.filter({ campaign_month: campaignMonth }, 'scheduled_date', 200)
      : await base44.asServiceRole.entities.SocialPost.list('scheduled_date', 200);

    // Group by ClickUp task ID (filtered to just the URL task if provided)
    const taskGroups = {};
    for (const post of posts) {
      if (post.clickup_task_id) {
        if (taskUrlTaskId && post.clickup_task_id !== taskUrlTaskId) continue;
        if (!taskGroups[post.clickup_task_id]) taskGroups[post.clickup_task_id] = [];
        taskGroups[post.clickup_task_id].push(post);
      }
    }

    // If a task URL was given but no posts are linked to it yet, still fetch attachments
    if (taskUrlTaskId && !taskGroups[taskUrlTaskId]) {
      taskGroups[taskUrlTaskId] = [];
    }

    let matched = 0;
    let unmatched = 0;
    const unmatchedAttachments = [];

    for (const [taskId, taskPosts] of Object.entries(taskGroups)) {
      let attachments = [];
      try {
        attachments = await getClickUpAttachments(base44, taskId, settings.clickup_workspace_id);
      } catch (e) {
        console.error('Failed to fetch attachments for task', taskId, e.message);
        continue;
      }

      for (const att of attachments) {
        const parsed = parseFilename(att.title || att.filename || '');
        if (!parsed) {
          unmatched++;
          unmatchedAttachments.push(att.title || att.filename || 'unknown');
          continue;
        }
        // Find the matching post by platform + date
        // Normalize scheduled_date to YYYY-MM-DD in case the SDK returns a Date object
        const match = taskPosts.find((p) => {
          if (p.platform !== parsed.platform || !p.scheduled_date) return false;
          const dateStr = new Date(p.scheduled_date).toISOString().slice(0, 10);
          return dateStr.startsWith(parsed.date);
        });
        if (match) {
          const imageUrl = att.url || att.url_w_query || att.path;
          if (imageUrl) {
            await base44.asServiceRole.entities.SocialPost.update(match.id, {
              final_image_url: imageUrl,
            });
            matched++;
          }
        } else {
          unmatched++;
          unmatchedAttachments.push(att.title || att.filename || 'unknown');
        }
      }
    }

    return Response.json({
      success: true,
      matched,
      unmatched,
      unmatched_files: unmatchedAttachments.slice(0, 20),
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}