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

export async function getBrandGuideText(base44, settings) {
  if (settings.clickup_workspace_id && settings.clickup_doc_id && settings.clickup_doc_page_id) {
    try {
      const token = await getClickUpToken(base44);
      const res = await fetch(
        `https://api.clickup.com/api/v3/workspaces/${settings.clickup_workspace_id}/docs/${settings.clickup_doc_id}/pages/${settings.clickup_doc_page_id}`,
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
  return settings.brand_guide_text || DEFAULT_BRAND_GUIDE;
}