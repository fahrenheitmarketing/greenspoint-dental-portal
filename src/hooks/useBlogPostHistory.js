import { useState, useCallback, useRef } from "react";
import { base44 } from "@/api/base44Client";

const SNAPSHOT_FIELDS = [
  "title", "title_es", "slug", "excerpt", "excerpt_es",
  "content", "content_es", "category",
  "meta_title", "meta_title_es", "meta_description", "meta_description_es",
  "internal_links", "external_links", "ctas",
  "image_url", "image_prompt", "status",
  "campaign_month", "clickup_task_id", "clickup_list_id",
  "wp_post_id_en", "wp_post_id_es", "wp_url_en", "wp_url_es",
  "published_date", "author", "read_time", "seo_score",
  "processed_comment_ids",
];

function pickFields(p) {
  const o = {};
  for (const f of SNAPSHOT_FIELDS) if (f in p) o[f] = p[f];
  return o;
}

export function snapshotBlogPosts(posts) {
  const m = {};
  for (const p of posts) m[p.id] = pickFields(p);
  return m;
}

export function useBlogPostHistory({ postsRef, reload }) {
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

  const applyState = async (state, removeExtra) => {
    const ids = Object.keys(state);
    if (ids.length) {
      const updates = ids.map((id) => ({ id, ...state[id] }));
      await base44.entities.BlogStudioPost.bulkUpdate(updates);
    }
    if (removeExtra) {
      const stateIds = new Set(ids);
      const extraIds = (postsRef.current || [])
        .filter((p) => !stateIds.has(p.id))
        .map((p) => p.id);
      if (extraIds.length) {
        await base44.entities.BlogStudioPost.deleteMany({ id: { $in: extraIds } });
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
    redoLabel: idxRef.current < histRef.current.length ? histRef.current[idxRef.current]?.label : null,
  };
}