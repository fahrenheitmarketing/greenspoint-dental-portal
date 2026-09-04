// Composites brand asset overlays (logos, badges, full-image frames) onto a base
// post image using Jimp. Jimp is passed in by the caller (entry file) because its
// default export doesn't resolve correctly when imported from a shared module —
// same pattern as imageRules.ts.

function clampPct(n) {
  if (!isFinite(n)) return 100;
  return Math.max(1, Math.min(100, n));
}

// Parse free-text overlay instructions (+ label) into a structured placement spec.
// Two modes:
//   full mode   — "place over full image" style assets: designed to cover the whole
//                 image (e.g. logo band at the top, banner at the bottom). Stretched
//                 to the exact base dimensions and composited at 0,0 so it keeps
//                 its designed layout. Only ONE full-frame asset is applied per
//                 image (chosen by base-image brightness — dark logo on light
//                 images, light logo on dark images — and by platform match).
//   corner mode — a logo/badge placed in a corner at a % of the base width.
// Supported keywords (case-insensitive):
//   full:     "full image", "over full", "full size", "whole image", "entire image", "cover"
//   position: top-left, top-right, bottom-left, bottom-right, center, top, bottom, left, right
//             (corner mode default: bottom-right)
//   size:     "<n>% width" or bare "<n>%"  -> overlay width as % of base width (default 18)
//   opacity:  "<n>% opacity" or "opacity <n>%" -> 0-100 (default 100)
//   margin:   "<n>% margin" or "margin <n>%" -> edge padding as % of base width (default 3)
export function parseOverlaySpec(instructions, label) {
  const text = `${instructions || ''} ${label || ''}`.toLowerCase();
  const spec = { full: false, position: 'bottom-right', sizePct: 18, opacityPct: 100, marginPct: 3 };

  if (
    text.includes('full image') ||
    text.includes('full size') ||
    text.includes('full-frame') ||
    text.includes('full frame') ||
    text.includes('whole image') ||
    text.includes('entire image') ||
    text.includes('cover the image') ||
    /\bover\s+full\b/.test(text)
  ) {
    spec.full = true;
    spec.position = 'center';
    spec.sizePct = 100;
    spec.marginPct = 0;
    return spec;
  }

  if (text.includes('top-left') || text.includes('top left') || text.includes('upper left')) spec.position = 'top-left';
  else if (text.includes('top-right') || text.includes('top right') || text.includes('upper right')) spec.position = 'top-right';
  else if (text.includes('bottom-left') || text.includes('bottom left') || text.includes('lower left')) spec.position = 'bottom-left';
  else if (text.includes('bottom-right') || text.includes('bottom right') || text.includes('lower right')) spec.position = 'bottom-right';
  else if (text.includes('center') || text.includes('centre')) spec.position = 'center';
  else if (text.includes('top')) spec.position = 'top';
  else if (text.includes('bottom')) spec.position = 'bottom';
  else if (text.includes('left')) spec.position = 'left';
  else if (text.includes('right')) spec.position = 'right';

  const opMatch = text.match(/opacity\s*(\d+(?:\.\d+)?)\s*%/) || text.match(/(\d+(?:\.\d+)?)\s*%\s*opacity/);
  if (opMatch) spec.opacityPct = clampPct(parseFloat(opMatch[1]));

  const marMatch = text.match(/margin\s*(\d+(?:\.\d+)?)\s*%/) || text.match(/(\d+(?:\.\d+)?)\s*%\s*margin/);
  if (marMatch) spec.marginPct = clampPct(parseFloat(marMatch[1]));

  const sizeMatch =
    text.match(/(\d+(?:\.\d+)?)\s*%\s*(?:of\s+)?(?:width|w)\b/) ||
    text.match(/\bsize\s*(\d+(?:\.\d+)?)\s*%/) ||
    text.match(/(\d+(?:\.\d+)?)\s*%(?!\s*(?:opacity|margin)\b)/);
  if (sizeMatch) spec.sizePct = clampPct(parseFloat(sizeMatch[1]));

  return spec;
}

const PLATFORM_MATCHERS = [
  { platform: 'facebook', re: /\bfacebook\b|\bfb\b/ },
  { platform: 'instagram', re: /\binstagram\b|\big\b/ },
  { platform: 'twitter', re: /\btwitter\b/ },
  { platform: 'google_business', re: /\bgoogle business\b|\bgoogle\b|\bgbp\b|\bgmb\b/ },
];

// An asset that names specific platforms in its label/instructions only applies to
// those platforms; one with no platform mention applies to every platform.
function assetAppliesToPlatform(asset, platform) {
  if (!platform) return true;
  const text = `${asset.label || ''} ${asset.instructions || ''}`.toLowerCase();
  const mentioned = PLATFORM_MATCHERS.filter((m) => m.re.test(text)).map((m) => m.platform);
  if (mentioned.length === 0) return true;
  return mentioned.includes(platform);
}

// Average luma (0-255) of the base image, sampled — used to pick the dark-logo
// variant on light images and the light-logo variant on dark images.
function averageBrightness(image) {
  try {
    const data = image.bitmap.data;
    let total = 0;
    let count = 0;
    const step = 16; // every 4th pixel (4 channels each)
    for (let i = 0; i < data.length; i += step) {
      total += 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
      count++;
    }
    return count > 0 ? total / count : 128;
  } catch {
    return 128;
  }
}

// Which named variant ('tagline' or 'url') a full-frame asset is, based on its
// label/instructions text.
function assetVariantName(asset) {
  const text = `${asset.label || ''} ${asset.instructions || ''}`.toLowerCase();
  if (text.includes('tagline')) return 'tagline';
  if (text.includes('url')) return 'url';
  return null;
}

function assetMatchesVariant(asset, variant) {
  return Boolean(variant) && assetVariantName(asset) === variant;
}

// Decide which full-frame variant to use for a post: keep an already-recorded
// variant (so re-applying an overlay is idempotent), otherwise alternate per
// platform — the opposite of whatever the most recently branded post on that
// platform used. Callers persist the returned value on the post.
export async function resolveOverlayVariant(base44, post) {
  if (post.overlay_variant) return post.overlay_variant;
  try {
    const recent = await base44.asServiceRole.entities.SocialPost.filter({ platform: post.platform }, '-updated_date', 20);
    const last = recent.find((p) => p.id !== post.id && (p.overlay_variant === 'tagline' || p.overlay_variant === 'url'));
    if (!last) return 'tagline';
    return last.overlay_variant === 'tagline' ? 'url' : 'tagline';
  } catch (e) {
    console.error(`Overlay variant lookup failed: ${e.message}`);
    return 'tagline';
  }
}

// Composite brand assets onto a base image. Returns a JPEG Buffer, or null
// when there are no usable assets (caller should fall back to the raw image).
// preferredVariant ('tagline' | 'url', optional) narrows the full-frame pick.
export async function compositeOverlays(Jimp, baseImageUrl, brandAssets, platform, preferredVariant) {
  if (!brandAssets || !Array.isArray(brandAssets) || brandAssets.length === 0) return null;
  const assets = brandAssets.filter((a) => a && a.file_url);
  if (assets.length === 0) return null;

  let base;
  try {
    base = await Jimp.read(baseImageUrl);
  } catch (e) {
    throw new Error(`Overlay base image read failed: ${e.message}`);
  }
  const bw = base.width;
  const bh = base.height;

  const applicable = assets.filter((a) => assetAppliesToPlatform(a, platform));
  const fullAssets = applicable.filter((a) => parseOverlaySpec(a.instructions, a.label).full);
  const cornerAssets = applicable.filter((a) => !parseOverlaySpec(a.instructions, a.label).full);

  // Full-frame overlays are sized to cover the whole image (logo at the top,
  // banner at the bottom). Exactly ONE is applied so light/dark variants don't
  // stack: pick by base-image brightness, then first match in asset order.
  if (fullAssets.length > 0) {
    const bright = averageBrightness(base);
    const want = bright > 127 ? 'dark' : 'light';
    let candidates = fullAssets.filter((a) => `${a.label || ''} ${a.instructions || ''}`.toLowerCase().includes(want));
    if (candidates.length === 0) candidates = fullAssets;
    let chosen = candidates.find((a) => assetMatchesVariant(a, preferredVariant));
    if (!chosen) chosen = candidates[0];
    try {
      let overlay = await Jimp.read(chosen.file_url);
      overlay = overlay.resize({ w: bw, h: bh });
      base = base.composite(overlay, 0, 0);
      console.log(`Full-frame overlay applied (${chosen.label || 'unlabeled'}, brightness ${Math.round(bright)} -> ${want} variant, frame variant: ${assetVariantName(chosen) || 'unnamed'})`);
    } catch (e) {
      console.error(`Full-frame overlay failed (${chosen.label}): ${e.message}`);
    }
  }

  // Corner/badge overlays stack as before.
  for (const asset of cornerAssets) {
    let overlay;
    try {
      overlay = await Jimp.read(asset.file_url);
    } catch (e) {
      console.error(`Overlay asset read failed (${asset.label || asset.file_url}): ${e.message}`);
      continue;
    }
    const spec = parseOverlaySpec(asset.instructions, asset.label);
    const targetW = Math.max(1, Math.round((bw * spec.sizePct) / 100));
    const targetH = Math.max(1, Math.round(overlay.height * (targetW / overlay.width)));
    try {
      overlay = overlay.resize({ w: targetW, h: targetH });
    } catch (e) {
      console.error(`Overlay resize failed (${asset.label}): ${e.message}`);
      continue;
    }
    if (spec.opacityPct < 100) {
      try {
        overlay = overlay.opacity(spec.opacityPct / 100);
      } catch (e) {
        console.error(`Overlay opacity failed (${asset.label}): ${e.message}`);
      }
    }
    const ow = overlay.width;
    const oh = overlay.height;
    const margin = Math.round((bw * spec.marginPct) / 100);
    let x, y;
    switch (spec.position) {
      case 'top-left': x = margin; y = margin; break;
      case 'top-right': x = bw - ow - margin; y = margin; break;
      case 'bottom-left': x = margin; y = bh - oh - margin; break;
      case 'bottom-right': x = bw - ow - margin; y = bh - oh - margin; break;
      case 'center': x = Math.round((bw - ow) / 2); y = Math.round((bh - oh) / 2); break;
      case 'top': x = Math.round((bw - ow) / 2); y = margin; break;
      case 'bottom': x = Math.round((bw - ow) / 2); y = bh - oh - margin; break;
      case 'left': x = margin; y = Math.round((bh - oh) / 2); break;
      case 'right': x = bw - ow - margin; y = Math.round((bh - oh) / 2); break;
      default: x = bw - ow - margin; y = bh - oh - margin;
    }
    x = Math.max(0, Math.min(x, bw - ow));
    y = Math.max(0, Math.min(y, bh - oh));
    try {
      base = base.composite(overlay, x, y);
    } catch (e) {
      console.error(`Overlay composite failed (${asset.label}): ${e.message}`);
    }
  }

  try {
    return await base.getBuffer('image/jpeg');
  } catch (e) {
    throw new Error(`Overlay getBuffer failed: ${e.message}`);
  }
}