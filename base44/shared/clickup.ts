// Shared ClickUp API helpers used by all social media studio backend functions.

export async function getClickUpToken(base44) {
  const { accessToken } = await base44.asServiceRole.connectors.getConnection("clickup");
  return accessToken;
}

export async function clickupFetch(base44, path, options = {}) {
  const token = await getClickUpToken(base44);
  const res = await fetch(`https://api.clickup.com/api/v2${path}`, {
    ...options,
    headers: {
      "Authorization": token,
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(`ClickUp API error (${res.status}): ${JSON.stringify(data)}`);
  }
  return data;
}

export async function createClickUpTask(base44, listId, { name, description, parent, dueDate }) {
  const body = { name, description };
  if (parent) body.parent = parent;
  if (dueDate) body.due_date = new Date(dueDate).getTime();
  return clickupFetch(base44, `/list/${listId}/task`, {
    method: "POST",
    body: JSON.stringify(body),
  });
}

export async function addClickUpComment(base44, taskId, commentText) {
  return clickupFetch(base44, `/task/${taskId}/comment`, {
    method: "POST",
    body: JSON.stringify({ comment_text: commentText }),
  });
}

export async function getClickUpComments(base44, taskId) {
  const data = await clickupFetch(base44, `/task/${taskId}/comment`, { method: "GET" });
  return data.comments || [];
}

export async function getClickUpAttachments(base44, taskId, workspaceId) {
  if (!workspaceId) {
    throw new Error("ClickUp workspace ID is required to fetch attachments. Set it in Settings.");
  }
  const token = await getClickUpToken(base44);
  const res = await fetch(
    `https://api.clickup.com/api/v3/workspaces/${workspaceId}/attachments/${taskId}/attachments?limit=100`,
    { headers: { Authorization: token } }
  );
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(`ClickUp attachments error (${res.status}): ${JSON.stringify(data)}`);
  }
  return data.attachments || [];
}

export async function updateClickUpTaskDescription(base44, taskId, description) {
  return clickupFetch(base44, `/task/${taskId}`, {
    method: "PUT",
    body: JSON.stringify({ description }),
  });
}

export async function uploadAttachmentToClickUpTask(base44, taskId, imageUrl, filename) {
  const token = await getClickUpToken(base44);
  const imgRes = await fetch(imageUrl);
  if (!imgRes.ok) throw new Error(`Failed to download image from ${imageUrl}`);
  const blob = await imgRes.blob();
  const formData = new FormData();
  formData.append("filename", filename);
  formData.append("attachment", blob, filename);
  const res = await fetch(`https://api.clickup.com/api/v2/task/${taskId}/attachment`, {
    method: "POST",
    headers: { Authorization: token },
    body: formData,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(`ClickUp attachment error (${res.status}): ${JSON.stringify(data)}`);
  }
  return data;
}

const DEFAULT_BRAND_GUIDE =
  "No scary dental tools or invasive-surgery imagery. No overly clinical shots. No text embedded in photos. No unverified medical claims. All imagery must be welcoming, bright, patient-focused, and topic-relevant.";

// Parse a ClickUp doc URL into its workspace (team), doc, and page IDs.
// Supports formats like: app.clickup.com/{team}/docs/{docId} (with ?page={pageId} or a trailing path/hash segment)
function parseClickUpDocUrl(url) {
  try {
    const u = new URL(url);
    const parts = u.pathname.split("/").filter(Boolean);
    let docId = null;
    let teamId = null;
    for (let i = 0; i < parts.length; i++) {
      if ((parts[i] === "docs" || parts[i] === "d") && parts[i + 1]) {
        docId = parts[i + 1];
        if (i > 0 && /^\d+$/.test(parts[i - 1])) teamId = parts[i - 1];
        break;
      }
    }
    let pageId = u.searchParams.get("page");
    if (!pageId && docId) {
      const idx = parts.indexOf(docId);
      if (idx >= 0 && parts[idx + 1] && parts[idx + 1] !== "d" && parts[idx + 1] !== "docs") {
        pageId = parts[idx + 1];
      }
    }
    if (!pageId) {
      const hash = u.hash.replace(/^#/, "");
      if (hash) pageId = new URLSearchParams(hash).get("page") || hash;
    }
    return { teamId, docId, pageId };
  } catch {
    return { teamId: null, docId: null, pageId: null };
  }
}

export async function getBrandGuideText(base44, settings) {
  if (settings.clickup_brand_doc_url) {
    const { teamId, docId, pageId } = parseClickUpDocUrl(settings.clickup_brand_doc_url);
    const workspaceId = settings.clickup_workspace_id || teamId;
    if (workspaceId && docId && pageId) {
      try {
        const token = await getClickUpToken(base44);
        const res = await fetch(
          `https://api.clickup.com/api/v3/workspaces/${workspaceId}/docs/${docId}/pages/${pageId}`,
          { headers: { Authorization: token } }
        );
        if (res.ok) {
          const data = await res.json();
          if (data && data.content) return data.content;
        }
      } catch (e) {
        // fall through to manual text
      }
    }
  }
  return settings.brand_guide_text || DEFAULT_BRAND_GUIDE;
}