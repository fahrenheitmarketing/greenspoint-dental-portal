import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { format } from "date-fns";
import PlatformBadge from "./PlatformBadge";
import StatusBadge from "./StatusBadge";

export default function PostDetailDialog({ post, open, onOpenChange }) {
  if (!post) return null;
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
            <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1">Post Copy</h3>
            <p className="text-foreground whitespace-pre-wrap leading-relaxed">{post.content}</p>
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