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

    const { campaignMonth } = await req.json();
    if (!campaignMonth) {
      return Response.json({ error: 'campaignMonth is required' }, { status: 400 });
    }

    const settingsList = await base44.asServiceRole.entities.SocialMediaSettings.list();
    const settings = settingsList[0];
    if (!settings || !settings.clickup_workspace_id) {
      return Response.json({ error: 'ClickUp workspace ID is required in Settings to pull attachments.' }, { status: 400 });
    }

    const posts = await base44.asServiceRole.entities.SocialPost.filter({ campaign_month: campaignMonth }, 'scheduled_date', 200);

    // Group by ClickUp task ID
    const taskGroups = {};
    for (const post of posts) {
      if (post.clickup_task_id) {
        if (!taskGroups[post.clickup_task_id]) taskGroups[post.clickup_task_id] = [];
        taskGroups[post.clickup_task_id].push(post);
      }
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
        const match = taskPosts.find(
          (p) => p.platform === parsed.platform && p.scheduled_date && p.scheduled_date.startsWith(parsed.date)
        );
        if (match) {
          const imageUrl = att.url || att.url_w_query || att.path;
          if (imageUrl) {
            await base44.asServiceRole.entities.SocialPost.update(match.id, {
              final_image_url: imageUrl,
              status: 'ready_to_publish',
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