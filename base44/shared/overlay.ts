// Composites brand asset overlays (logos, badges) onto a base post image using Jimp.
// Jimp is passed in by the caller (entry file) because its default export doesn't
// resolve correctly when imported from a shared module — same pattern as imageRules.ts.

function clampPct(n) {
  if (!isFinite(n)) return 100;
  return Math.max(1, Math.min(100, n));
}

// Parse free-text overlay instructions (+ label) into a structured placement spec.
// Supported keywords (case-insensitive):
//   position: top-left, top-right, bottom-left, bottom-right, center, top, bottom, left, right
//             (default: bottom-right)
//   size:     "<n>% width" or bare "<n>%"  -> overlay width as % of base width (default 18)
//   opacity:  "<n>% opacity" or "opacity <n>%" -> 0-100 (default 100)
//   margin:   "<n>% margin" or "margin <n>%" -> edge padding as % of base width (default 3)
export function parseOverlaySpec(instructions, label) {
  const text = `${instructions || ''} ${label || ''}`.toLowerCase();
  const spec = { position: 'bottom-right', sizePct: 18, opacityPct: 100, marginPct: 3 };

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

// Composite every brand asset onto a base image. Returns a JPEG Buffer, or null
// when there are no usable assets (caller should fall back to the raw image).
export async function compositeOverlays(Jimp, baseImageUrl, brandAssets) {
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

  for (const asset of assets) {
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