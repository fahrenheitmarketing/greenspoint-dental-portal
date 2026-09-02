# Social Studio Bundle — Migration Guide

A self-contained Social Media Studio you can deploy into any Base44 project: AI content generation, brand-overlay compositing, ClickUp review sync, and Postiz scheduling. The bundle is client-agnostic — every client-specific value (brand name, voice, audience, site URL, ClickUp/Postiz IDs) lives in data records, never in code.

---

## 1. What's in the bundle

### Entities (`base44/entities/`)
| File | Purpose |
|---|---|
| `SocialPost.jsonc` | Generated posts (copy, image, status, schedule, ClickUp/Postiz links) |
| `SocialMediaSettings.jsonc` | Per-client config: ClickUp list ID, brand doc URL, site URL, Postiz integration IDs, short links |
| `BrandProfile.jsonc` | Brand identity + brand_assets (overlay images with usage instructions) |

### Shared modules (`base44/shared/`)
| File | Purpose |
|---|---|
| `scheduleBuilder.ts` | Platform tones, hashtag/CTA/disclaimer rules, month schedule builder |
| `brandContext.ts` | Builds LLM brand intro + audience references from the BrandProfile record |
| `imageRules.ts` | Brand-compliant image prompt rules, platform crop/resize + upload |
| `clickup.ts` | ClickUp API helpers: tasks, comments, attachments, brand guide fetch |
| `overlay.ts` | Jimp compositing of brand assets onto generated images |
| `postiz.ts` | Postiz Public API helpers: image upload, post scheduling |

### Backend functions (`base44/functions/<name>/entry.ts`)
`generateSocialMediaContent` · `generateFullMonth` · `generateSinglePost` · `approveAndSendImageToClickUp` · `bulkApprovePosts` · `bulkGenerateImages` · `regeneratePostImage` · `regenerateMonthPosts` · `resizeImageForPlatform` · `scheduleToPostiz` · `syncPostToClickUp` · `processClickUpFeedback` · `pullFinalImagesFromClickUp` · `restorePostContentFromClickUp` · `appendAiDisclaimerToPosts` · `appendHashtagsToPosts` · `removeHashtagsFromGbpPosts` · `retrofitGbpPosts` · `checkSocialStudioSetup`

### Frontend
| Path | Purpose |
|---|---|
| `src/pages/SocialMediaStudio.jsx` | Studio dashboard page |
| `src/components/social/StudioHeader.jsx` | Header + action buttons |
| `src/components/social/StudioFilterBar.jsx` | Platform/status/month/date filters |
| `src/components/social/BulkActionBar.jsx` | Bulk actions per campaign month |
| `src/components/social/PostCard.jsx` + `PostCardActions.jsx` | Post cards and per-post actions |
| `src/components/social/PostDetailDialog.jsx` | Full post detail/edit dialog |
| `src/components/social/InlineEditableField.jsx` | Inline editing helper |
| `src/components/social/PlatformBadge.jsx` + `StatusBadge.jsx` | Badges |
| `src/components/social/GenerateContentDialog.jsx` | Content generation dialog |
| `src/components/social/ProcessFeedbackDialog.jsx` | ClickUp feedback processing |
| `src/components/social/SettingsDialog.jsx` + `ShortLinksEditor.jsx` | Settings editor |
| `src/components/social/BrandSetupDialog.jsx` + `BrandAssetsEditor.jsx` | Brand profile + overlay asset editor |
| `src/components/social/FixDateDialog.jsx` | Scheduled date editor |
| `src/components/social/SetupWizard.jsx` | First-run setup wizard (driven by the checker) |
| `src/hooks/usePostHistory.js` | Undo/redo history for post changes |

### Connector config
| File | Purpose |
|---|---|
| `base44/connectors/clickup.jsonc` | ClickUp connector definition |

---

## 2. Setup steps (in the target project)

**Step 1 — Copy the files.** Copy every file listed above into the target project, keeping the exact same paths.

**Step 2 — Create the entities.** Copy the three `base44/entities/*.jsonc` files as-is. They are the full schemas; no edits needed.

**Step 3 — Add the route.** In the target app's `src/App.jsx`:

```jsx
import SocialMediaStudio from './pages/SocialMediaStudio';
// inside <Routes> (inside your layout route):
<Route path="/social-media-studio" element={<SocialMediaStudio />} />
```

**Step 4 — Authorize the ClickUp connector.** Settings → Connectors → ClickUp, connect the account that owns the client's social-post list.

**Step 5 — Add the Postiz API key.** Settings → Secrets → add `POSTIZ_API_KEY` (from the Postiz app under Settings → API).

**Step 6 — Open the Studio.** Navigate to `/social-media-studio`. The first-run setup wizard appears automatically and shows a live checklist of anything missing. Its buttons jump straight to Brand Setup and Settings. Close it any time with "Continue to Studio"; it reappears on load until everything required is configured.

**Step 7 — Fill in the client's details (guided):**
- **Brand Setup** — company name, description, audience, voice, banned claims, and overlay assets with plain-language instructions (e.g. "Top-right corner, 20% width, 80% opacity"). Overlays are composited automatically when a post is approved.
- **Settings** — ClickUp List ID, brand guide doc URL (or pasted guide text), site URL, and Postiz integration IDs per platform.

---

## 3. External account prep (outside Base44)

- **ClickUp**: create a list for the client's social posts; the list ID is the number in the list URL.
- **Postiz**: connect the client's Facebook, Instagram, X, and Google Business accounts; copy each integration ID (Settings → Integrations) into the Studio Settings.

---

## 4. How the bundle stays client-agnostic

- All LLM prompts are assembled from the BrandProfile record (via `brandContext.ts`) — no client names or audiences are hard-coded.
- GBP "Learn more" URLs are built from the Settings `site_url` + `?utm_source=gbp&utm_medium=organic`.
- Overlay placement/size/opacity is parsed from each asset's free-text instructions (via `overlay.ts`).
- The setup checker (`checkSocialStudioSetup`) is the single source of truth for readiness — the wizard and any future tooling read from it.