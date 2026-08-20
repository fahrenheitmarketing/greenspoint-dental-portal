// base44/shared/imageRules.ts
// Centralized brand-compliant image rules for all social media image generation.
// Enforced across every image prompt — the dental office, staff, and equipment
// must NEVER appear in generated imagery.

export const PLATFORM_DIMENSIONS = {
  facebook: { width: 1080, height: 1350, hint: 'composed for a 4:5 portrait crop — keep key subjects centered' },
  instagram: { width: 1080, height: 1350, hint: 'composed for a 4:5 portrait crop — keep key subjects centered' },
  twitter: { width: 1600, height: 900, hint: 'composed for a 16:9 landscape crop — keep key subjects centered horizontally' },
  google_business: { width: 1200, height: 900, hint: 'composed for a 4:3 landscape crop — keep key subjects centered' },
};

// Cover-crops an image to the platform's exact dimensions and uploads the
// result, returning the hosted file_url. Used right after AI generation so
// creatives arrive at ClickUp already correctly sized.
// Jimp is passed in by the caller (entry file) because its default export
// doesn't resolve correctly when imported from a shared module.
export async function resizeAndUploadImage(base44, Jimp, platform, imageUrl, filenameBase) {
  const dims = PLATFORM_DIMENSIONS[platform];
  if (!dims) throw new Error(`Unknown platform: ${platform}`);
  const image = await Jimp.read(imageUrl);
  image.cover(dims.width, dims.height);
  const buffer = await image.getBufferAsync(Jimp.MIME_JPEG || 'image/jpeg');
  const file = new File([buffer], `${filenameBase}.jpg`, { type: 'image/jpeg' });
  const { file_url } = await base44.asServiceRole.integrations.Core.UploadFile({ file });
  return file_url;
}

export const IMAGE_FORBIDDEN_SUFFIX = `CRITICAL BRAND RULES — ABSOLUTELY FORBIDDEN IN THE IMAGE: No dental office buildings, no dental clinic exteriors, no reception areas, no dentist offices, no dentist chairs, no exam rooms, no dental staff (dentists, hygienists, assistants), no scrubs or lab coats, no scary dental tools, no clinical or surgical shots, no X-ray machines, no text overlaid on the image. If the post copy references the office, staff, or "behind the scenes", you MUST NOT depict any of those — instead use a relevant visual metaphor (a welcoming front door with morning sunlight, a tidy desk with coffee, a sunrise over the neighborhood, fresh flowers, or a "we're here for you" community scene). Ensure the image is anatomically correct and logically coherent — no extra limbs, no distorted faces, no physically impossible objects. Prefer simple, clean compositions with at most one or two people to avoid AI artifacts. When people are shown, feature Hispanic/Latino individuals reflecting the local Greenspoint community.`;

export const IMAGE_PROMPT_INSTRUCTION = `a short, SPECIFIC description of a brand-compliant, welcoming, bright, lifestyle photo that VISUALLY REPRESENTS the post's content/copy. The image MUST directly reflect what the post is about so a reader who reads the copy finds the image naturally relevant — e.g., if the copy is about morning routines, show a bright morning scene with coffee/breakfast; if it's about healthy snacks for teeth, show colorful healthy food; if it's about family dental care, show a Hispanic/Latino family; if it's about confidence/smiles, show a close-up of a person smiling. CRITICAL: if the post is about the dental office, staff, or "behind the scenes", do NOT show the office, staff, or any clinic setting — instead describe a relevant visual metaphor like a welcoming front door with morning sunlight, a tidy desk with coffee, a sunrise over the neighborhood, fresh flowers, or a "we're here for you" community scene. Do NOT default to generic "family smiling" — match the specific message. Ensure the image is anatomically correct and logically coherent — no extra limbs, no distorted faces, no physically impossible objects. Prefer simple, clean compositions with at most one or two people to avoid AI artifacts. When people are shown, feature Hispanic/Latino individuals reflecting the local community. ABSOLUTELY FORBIDDEN: no dental office buildings, no dental clinic, no reception areas, no dentist offices, no dentist chairs, no exam rooms, no dental staff, no scrubs/lab coats, no scary dental tools, no clinical/surgical shots, no text in the photo, no surgery`;

export function buildImagePrompt(post, brandGuide) {
  const brief = post.image_prompt || post.brand_compliance_notes || '';
  const imageDirection = brief ? `Visual direction from creative brief: ${brief}. ` : '';
  const dims = PLATFORM_DIMENSIONS[post.platform];
  const cropHint = dims ? `The image will be cropped to ${dims.width}x${dims.height}px — ${dims.hint}. ` : '';
  return `${imageDirection}A welcoming, bright, lifestyle photo for a ${post.platform} dental practice social media post about "${post.topic}". The post copy is: "${post.content}". Create an image that VISUALLY REPRESENTS this content — the image must directly reflect the message, not be a generic stock photo. ${cropHint}${IMAGE_FORBIDDEN_SUFFIX} ${brandGuide}`;
}