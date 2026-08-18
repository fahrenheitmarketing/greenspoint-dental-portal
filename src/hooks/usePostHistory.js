import { useState, useCallback, useRef } from "react";
import { base44 } from "@/api/base44Client";

// Fields tracked in each snapshot so an undo/redo can fully restore a post.
const SNAPSHOT_FIELDS = [
  "platform",
  "topic",
  "content",
  "image_url",
  "final_image_url",
  "resized_image_url",
  "status",
  "scheduled_date",
  "campaign_month",
  "brand_compliance_notes",
  "clickup_task_id",
  "clickup_list_id",
  "postiz_post_id",
  "processed_comment_ids",
];

function pickFields(p) {
  const o = {};
  for (const f of SNAPSHOT_FIELDS) if (f in p) o[f] = p[f];
  return o;
}

// Builds a { id -> fields } snapshot map from a posts array.
export function snapshotPosts(posts) {
  const m = {};
  for (const p of posts) m[p.id] = pickFields(p);
  return m;
}

/**
 * In-memory undo/redo for SocialPost mutations.
 * Each tracked action pushes { before, after, label }.
 * Undo restores `before` (and soft-deletes any posts created by the action).
 * Redo re-applies `after`.
 *
 * @param {Object} opts
 * @param {React.MutableRefObject<Array>} opts.postsRef - ref to the latest posts array
 * @param {() => Promise<Array>} opts.reload - reloads posts from the server, returns the fresh array
 */
export function usePostHistory({ postsRef, reload }) {
  const [busy, setBusy] = useState(false);
  const [, force] = useState(0);
  const rerender = useCallback(() => force((n) => n + 1), []);
  const histRef = useRef([]);
  const idxRef = useRef(0);

  const pushHistory = useCallback((before, after, label) => {
    histRef.current = histRef.current.slice(0, idxRef.current);
    histRef.current.push({ before, after, label });
    idxRef.current = histRef.current.length;
    rerender();
  }, [rerender]);

  // Apply a snapshot state back to the server.
  // If removeExtra is true, any post that exists now but is not in `state`
  // (i.e. created by the action being undone) is soft-deleted.
  const applyState = async (state, removeExtra) => {
    const ids = Object.keys(state);
    if (ids.length) {
      const updates = ids.map((id) => ({ id, ...state[id] }));
      await base44.entities.SocialPost.bulkUpdate(updates);
    }
    if (removeExtra) {
      const stateIds = new Set(ids);
      const extraIds = (postsRef.current || [])
        .filter((p) => !stateIds.has(p.id))
        .map((p) => p.id);
      if (extraIds.length) {
        await base44.entities.SocialPost.updateMany(
          { id: { $in: extraIds } },
          { $set: { status: "deleted" } }
        );
      }
    }
  };

  const undo = useCallback(async () => {
    if (idxRef.current === 0) return;
    setBusy(true);
    try {
      const t = histRef.current[idxRef.current - 1];
      await applyState(t.before, true);
      idxRef.current -= 1;
      await reload();
      rerender();
    } finally {
      setBusy(false);
    }
  }, [reload]);

  const redo = useCallback(async () => {
    if (idxRef.current >= histRef.current.length) return;
    setBusy(true);
    try {
      const t = histRef.current[idxRef.current];
      await applyState(t.after, false);
      idxRef.current += 1;
      await reload();
      rerender();
    } finally {
      setBusy(false);
    }
  }, [reload]);

  return {
    pushHistory,
    undo,
    redo,
    busy,
    canUndo: idxRef.current > 0,
    canRedo: idxRef.current < histRef.current.length,
    undoLabel: idxRef.current > 0 ? histRef.current[idxRef.current - 1]?.label : null,
    redoLabel:
      idxRef.current < histRef.current.length
        ? histRef.current[idxRef.current]?.label
        : null,
  };
}