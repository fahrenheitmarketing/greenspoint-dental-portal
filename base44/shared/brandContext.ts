// Shared brand context helpers — load the client's BrandProfile and build
// client-agnostic strings for LLM prompts so the Social Media Studio is not
// hard-coded to any one practice.

export async function getBrandProfile(base44) {
  try {
    const list = await base44.asServiceRole.entities.BrandProfile.list();
    return list && list[0] ? list[0] : null;
  } catch (e) {
    return null;
  }
}

// Intro line for the social-media-manager LLM prompt.
// Uses company_name and product_description from the BrandProfile instead of
// hard-coding a practice name.
export function buildBrandIntro(brandProfile) {
  const name = (brandProfile && brandProfile.company_name) || 'our dental practice';
  const desc = brandProfile && brandProfile.product_description;
  if (desc) {
    return `You are the social media manager for ${name}, ${desc}.`;
  }
  return `You are the social media manager for ${name}, a friendly, patient-focused dental practice.`;
}

// Demographic / community reference for image prompts, derived from the brand's
// target audience. Returns '' when no audience is set so callers can append it
// conditionally.
export function buildAudienceRef(brandProfile) {
  const aud = brandProfile && brandProfile.target_audience;
  if (!aud) return '';
  return `When people appear in the image, they should reflect this target audience: ${aud}.`;
}