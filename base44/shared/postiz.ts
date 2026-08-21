// Shared Postiz Public API helpers used by the scheduling backend function.

const POSTIZ_BASE = 'https://api.postiz.com/public/v1';

function getApiKey() {
  const key = process.env.POSTIZ_API_KEY;
  if (!key) {
    throw new Error('POSTIZ_API_KEY secret is not set. Add it in Settings → Secrets before scheduling to Postiz.');
  }
  return key;
}

// Platform → Postiz provider settings object (the `settings` block in the create-post body).
const PLATFORM_SETTINGS = {
  facebook: { __type: 'facebook' },
  instagram: { __type: 'instagram-standalone', post_type: 'post' },
  twitter: { __type: 'x', who_can_reply_post: 'everyone' },
  google_business: { __type: 'gmb', topicType: 'STANDARD' },
};

// Upload an image to Postiz and return { id, path } for use in the create-post body.
export async function uploadImageToPostiz(imageUrl) {
  const key = getApiKey();
  const imgRes = await fetch(imageUrl);
  if (!imgRes.ok) throw new Error(`Failed to download image from ${imageUrl} (${imgRes.status})`);
  const blob = await imgRes.blob();
  const formData = new FormData();
  formData.append('file', blob, 'image.jpg');
  const res = await fetch(`${POSTIZ_BASE}/upload`, {
    method: 'POST',
    headers: { Authorization: key },
    body: formData,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(`Postiz upload error (${res.status}): ${JSON.stringify(data)}`);
  }
  return data;
}

// Schedule a single post to a single integration. Returns the Postiz response array [{ postId, integration }].
export async function schedulePostToPostizWithSettings({ integrationId, date, content, imageData, platform, postNow, callToActionType, callToActionUrl }) {
  const key = getApiKey();
  const baseSettings = PLATFORM_SETTINGS[platform];
  if (!baseSettings) throw new Error(`No Postiz settings for platform: ${platform}`);
  const settings = { ...baseSettings };
  if (platform === 'google_business') {
    settings.callToActionType = callToActionType || 'LEARN_MORE';
    if (callToActionUrl) settings.callToActionUrl = callToActionUrl;
  }
  const body = {
    type: postNow ? 'now' : 'schedule',
    date,
    shortLink: false,
    tags: [],
    posts: [
      {
        integration: { id: integrationId },
        value: [{ content, image: imageData ? [imageData] : [] }],
        settings,
      },
    ],
  };
  const res = await fetch(`${POSTIZ_BASE}/posts`, {
    method: 'POST',
    headers: { Authorization: key, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(`Postiz schedule error (${res.status}): ${JSON.stringify(data)}`);
  }
  return Array.isArray(data) ? data : [data];
}