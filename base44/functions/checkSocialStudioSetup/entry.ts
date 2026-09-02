import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';
import { secrets } from 'base44:runtime';

// Fetch the first record of an entity; returns { ok: false } when the entity itself doesn't exist.
async function fetchFirst(base44, entityName) {
  try {
    const list = await base44.asServiceRole.entities[entityName].filter({}, '-created_date', 5);
    return { ok: true, record: list[0] || null };
  } catch (e) {
    return { ok: false, record: null };
  }
}

export default async function (req) {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user || user.role !== 'admin') {
      return Response.json({ error: 'Admin access required' }, { status: 403 });
    }

    const checks = [];
    const add = (id, label, ok, level, detail, action) =>
      checks.push({
        id,
        label,
        status: ok ? 'pass' : level,
        detail: ok ? detail : detail,
        action: action || null,
      });

    // 1. Entities exist
    const settingsRes = await fetchFirst(base44, 'SocialMediaSettings');
    const profileRes = await fetchFirst(base44, 'BrandProfile');
    const postRes = await fetchFirst(base44, 'SocialPost');

    add('entity_settings', 'SocialMediaSettings entity', settingsRes.ok, 'fail',
      settingsRes.ok ? 'Created' : 'Missing — copy base44/entities/SocialMediaSettings.jsonc from the bundle');
    add('entity_brand_profile', 'BrandProfile entity', profileRes.ok, 'fail',
      profileRes.ok ? 'Created' : 'Missing — copy base44/entities/BrandProfile.jsonc from the bundle');
    add('entity_social_post', 'SocialPost entity', postRes.ok, 'fail',
      postRes.ok ? 'Created' : 'Missing — copy base44/entities/SocialPost.jsonc from the bundle');

    // 2. ClickUp connector authorized
    let clickupOk = false;
    try {
      await base44.asServiceRole.connectors.getConnection('clickup');
      clickupOk = true;
    } catch (e) {}
    add('clickup_connector', 'ClickUp connection', clickupOk, 'fail',
      clickupOk ? 'Authorized' : 'Authorize the ClickUp connector in Settings → Connectors');

    // 3. Postiz secret set
    let postizKey = null;
    try { postizKey = secrets.get('POSTIZ_API_KEY'); } catch (e) {}
    add('postiz_secret', 'Postiz API key', Boolean(postizKey), 'fail',
      postizKey ? 'Secret is set' : 'Add the POSTIZ_API_KEY secret in Settings → Secrets');

    // 4. Settings record with ClickUp list
    const settings = settingsRes.record;
    const settingsReady = Boolean(settings && settings.clickup_list_id);
    add('settings_record', 'Social Media Settings', settingsReady, 'fail',
      settingsReady ? `ClickUp list ${settings.clickup_list_id}` : 'Open Settings and set the ClickUp List ID', 'settings');

    // 5. Site URL (used for GBP "Learn more" links)
    const siteOk = Boolean(settings && settings.site_url);
    add('site_url', 'Site URL', siteOk, 'warn',
      siteOk ? settings.site_url : 'Used to build GBP "Learn more" URLs — set it in Settings', 'settings');

    // 6. Brand profile record
    const profile = profileRes.record;
    const profileOk = Boolean(profile && profile.company_name);
    add('brand_profile', 'Brand profile', profileOk, 'fail',
      profileOk ? profile.company_name : 'Open Brand Setup and fill in the company name', 'brand');

    // 7. Brand Reference Guide source
    const hasGuide = Boolean(settings && (settings.brand_guide_text || settings.clickup_brand_doc_url));
    add('brand_guide', 'Brand Reference Guide', hasGuide, 'warn',
      hasGuide ? 'Linked or pasted in Settings' : 'Link a ClickUp brand guide doc or paste guide text in Settings', 'settings');

    // 8. Brand overlay assets
    const assetCount = profile && Array.isArray(profile.brand_assets) ? profile.brand_assets.length : 0;
    add('brand_assets', 'Brand overlay images', assetCount > 0, 'warn',
      assetCount > 0 ? `${assetCount} asset(s) uploaded` : 'Optional — upload logos/badges in Brand Setup to auto-apply overlays on approval', 'brand');

    // 9. Postiz integration IDs
    const postizIds = settings
      ? [settings.postiz_facebook_id, settings.postiz_instagram_id, settings.postiz_x_id, settings.postiz_gmb_id].filter(Boolean)
      : [];
    add('postiz_integrations', 'Postiz integrations', postizIds.length > 0, 'warn',
      postizIds.length > 0 ? `${postizIds.length} platform(s) connected` : 'Add Postiz integration IDs in Settings to enable scheduling', 'settings');

    const ready = checks.every((c) => c.status !== 'fail');

    return Response.json({ ready, checks });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}