import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';
import { AFTERNOON_SLOTS_SAST, sastSlotToISO } from '../../shared/scheduleBuilder.ts';

// Same per-hour slot order used when generating a new month.
const PLATFORM_SLOT_ORDER = ['twitter', 'facebook', 'instagram', 'google_business'];

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

    const all = await base44.asServiceRole.entities.SocialPost.filter({ campaign_month: campaignMonth }, 'scheduled_date', 500);
    // Only posts that have NOT been pushed to Postiz yet can be re-timed.
    const targets = all.filter(
      (p) => p.scheduled_date && !p.postiz_post_id && !['scheduled', 'published', 'deleted'].includes(p.status)
    );
    if (targets.length === 0) {
      return Response.json({ success: true, retimed: 0, message: 'No unscheduled posts to re-time for this campaign.' });
    }

    // Group by calendar day and assign one post per hour in the 2PM–5PM SAST window.
    const byDay = {};
    for (const p of targets) {
      const dayKey = String(p.scheduled_date).slice(0, 10);
      (byDay[dayKey] = byDay[dayKey] || []).push(p);
    }

    let retimed = 0;
    for (const [dayKey, posts] of Object.entries(byDay)) {
      posts.sort((a, b) => PLATFORM_SLOT_ORDER.indexOf(a.platform) - PLATFORM_SLOT_ORDER.indexOf(b.platform));
      const [y, m, d] = dayKey.split('-').map(Number);
      for (let i = 0; i < posts.length; i++) {
        const slot = AFTERNOON_SLOTS_SAST[i] || 17;
        let iso = sastSlotToISO(y, m - 1, d, slot);
        // Edge case: more posts on a day than hourly slots — space extras 15 minutes apart after 5PM.
        if (i >= AFTERNOON_SLOTS_SAST.length) {
          const extraMinutes = (i - AFTERNOON_SLOTS_SAST.length + 1) * 15;
          iso = new Date(new Date(iso).getTime() + extraMinutes * 60000).toISOString();
        }
        await base44.asServiceRole.entities.SocialPost.update(posts[i].id, { scheduled_date: iso });
        retimed++;
      }
    }

    return Response.json({ success: true, retimed, campaign_month: campaignMonth });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}