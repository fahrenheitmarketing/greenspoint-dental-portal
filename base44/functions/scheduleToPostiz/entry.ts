import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';
import { uploadImageToPostiz, schedulePostToPostizWithSettings } from '../../shared/postiz.ts';

// Map SocialPost platform → SocialMediaSettings field holding the Postiz integration ID
const PLATFORM_TO_SETTINGS_FIELD = {
  facebook: 'postiz_facebook_id',
  instagram: 'postiz_instagram_id',
  twitter: 'postiz_x_id',
  google_business: 'postiz_gmb_id',
};

export default async function (req) {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user || user.role !== 'admin') {
      return Response.json({ error: 'Admin access required' }, { status: 403 });
    }

    const { campaignMonth, postId, newDate, postNow } = await req.json();
    if (!campaignMonth && !postId) {
      return Response.json({ error: 'campaignMonth or postId is required' }, { status: 400 });
    }

    const settingsList = await base44.asServiceRole.entities.SocialMediaSettings.list();
    const settings = settingsList[0];
    if (!settings) {
      return Response.json({ error: 'Configure Social Media Settings first.' }, { status: 400 });
    }

    let posts;
    if (postId) {
      const singlePost = await base44.asServiceRole.entities.SocialPost.get(postId);
      posts = singlePost ? [singlePost] : [];
    } else {
      const allCampaignPosts = await base44.asServiceRole.entities.SocialPost.filter({ campaign_month: campaignMonth }, 'scheduled_date', 200);
      posts = allCampaignPosts.filter(
        (p) => p.status === 'ready_to_publish' || (p.status === 'approved' && p.final_image_url)
      );
    }

    const now = new Date();
    let scheduled = 0;
    let needsReview = 0;
    let skipped = 0;
    const errors = [];

    for (const post of posts) {
      // Skip posts without a branded/final image (AI-only images are not published)
      if (!post.final_image_url) {
        skipped++;
        continue;
      }

      // If a new date was provided, update it before scheduling
      let scheduledDate;
      if (newDate) {
        scheduledDate = new Date(newDate);
        await base44.asServiceRole.entities.SocialPost.update(post.id, { scheduled_date: newDate });
      } else {
        scheduledDate = new Date(post.scheduled_date);
      }

      // Posts with a past scheduled date need manual review (unless posting now)
      if (!postNow && scheduledDate <= now) {
        await base44.asServiceRole.entities.SocialPost.update(post.id, { status: 'needs_date_review' });
        needsReview++;
        continue;
      }

      // Get the Postiz integration ID for this platform
      const settingsField = PLATFORM_TO_SETTINGS_FIELD[post.platform];
      const integrationId = settings[settingsField];
      if (!integrationId) {
        errors.push({ postId: post.id, platform: post.platform, error: 'No Postiz integration ID configured for this platform' });
        skipped++;
        continue;
      }

      try {
        // Upload the final branded image to Postiz
        const imageData = await uploadImageToPostiz(post.final_image_url);
        // For GBP posts, build the call-to-action URL with UTM tracking
        let callToActionType;
        let callToActionUrl;
        if (post.platform === 'google_business' && post.cta_page_path) {
          callToActionType = post.cta_button_type || 'LEARN_MORE';
          const base = (settings.site_url || '').replace(/\/+$/, '');
          callToActionUrl = `${base}${post.cta_page_path}?utm_source=gbp&utm_medium=organic`;
        }
        // Schedule the post
        const result = await schedulePostToPostizWithSettings({
          integrationId,
          date: postNow ? new Date().toISOString() : scheduledDate.toISOString(),
          content: post.content,
          imageData,
          platform: post.platform,
          postNow,
          callToActionType,
          callToActionUrl,
        });
        const postizPostId = result && result[0] ? result[0].postId : '';
        await base44.asServiceRole.entities.SocialPost.update(post.id, {
          status: postNow ? 'published' : 'scheduled',
          postiz_post_id: postizPostId,
        });
        scheduled++;
      } catch (e) {
        console.error('Postiz scheduling failed for post', post.id, e.message);
        errors.push({ postId: post.id, platform: post.platform, error: e.message });
        skipped++;
      }
    }

    return Response.json({
      success: true,
      scheduled,
      needs_review: needsReview,
      skipped,
      errors: errors.slice(0, 20),
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}