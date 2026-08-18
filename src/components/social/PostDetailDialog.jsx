import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";
import { Loader2, Save, Check } from "lucide-react";
import { base44 } from "@/api/base44Client";
import PlatformBadge from "./PlatformBadge";
import StatusBadge from "./StatusBadge";

export default function PostDetailDialog({ post, open, onOpenChange, onChanged }) {
  const [content, setContent] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (post) {
      setContent(post.content || "");
      setSaved(false);
    }
  }, [post?.id, post?.content, open]);

  if (!post) return null;

  const dirty = content !== (post.content || "");

  const handleSave = async () => {
    setSaving(true);
    try {
      await base44.entities.SocialPost.update(post.id, { content });
      setSaved(true);
      if (onChanged) onChanged();
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 flex-wrap">
            <PlatformBadge platform={post.platform} />
            <StatusBadge status={post.status} />
            {post.scheduled_date && (
              <span className="text-sm text-muted-foreground font-normal ml-auto">
                {format(new Date(post.scheduled_date), "EEE, MMM d, yyyy")}
              </span>
            )}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 mt-2">
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1">Topic</h3>
            <p className="text-foreground font-medium">{post.topic}</p>
          </div>
          <div>
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Post Copy</h3>
              <div className="flex items-center gap-2">
                {saved && !dirty && (
                  <span className="text-xs text-green-600 flex items-center gap-1"><Check className="w-3 h-3" /> Saved</span>
                )}
                <Button size="sm" variant="outline" disabled={saving || !dirty} onClick={handleSave}>
                  {saving ? <Loader2 className="w-3.5 h-3.5 mr-1 animate-spin" /> : <Save className="w-3.5 h-3.5 mr-1" />}
                  Save
                </Button>
              </div>
            </div>
            <Textarea
              value={content}
              onChange={(e) => { setContent(e.target.value); setSaved(false); }}
              rows={8}
              className="leading-relaxed"
            />
          </div>
          {(post.image_url || post.final_image_url) && (
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1">Image</h3>
              <img src={post.final_image_url || post.image_url} alt={post.topic} className="w-full rounded-lg border border-border" />
            </div>
          )}
          {post.brand_compliance_notes && (
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1">Image Direction</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{post.brand_compliance_notes}</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}