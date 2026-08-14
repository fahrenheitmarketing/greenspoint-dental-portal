import React from "react";
import { Button } from "@/components/ui/button";
import { Sparkles, Check, X, Send, Upload } from "lucide-react";

export default function PostCardActions({ post, busy, onRegenerateImage, onClone, onApprove, onReject, onPrepare, onUploadFinalImage }) {
  return (
    <div className="flex flex-wrap gap-2 pt-3 border-t border-border mt-3">
      <Button size="sm" variant="outline" disabled={busy} onClick={onRegenerateImage}>
        <Sparkles className="w-3.5 h-3.5 mr-1" />
        {post.image_url ? "Regenerate Image" : "Generate Image"}
      </Button>
      <Button size="sm" variant="outline" disabled={busy} onClick={onClone}>
        <Sparkles className="w-3.5 h-3.5 mr-1" />
        Create New Post
      </Button>
      {!["approved", "published", "scheduled", "ready_to_publish"].includes(post.status) && (
        <Button size="sm" variant="default" disabled={busy} onClick={onApprove}>
          <Check className="w-3.5 h-3.5 mr-1" />
          Approve
        </Button>
      )}
      {!["rejected", "published", "scheduled"].includes(post.status) && (
        <Button size="sm" variant="destructive" disabled={busy} onClick={onReject}>
          <X className="w-3.5 h-3.5 mr-1" />
          Reject
        </Button>
      )}
      {(post.status === "approved" || post.status === "ready_to_publish") && (
        <Button size="sm" variant="outline" disabled={busy} onClick={onUploadFinalImage}>
          <Upload className="w-3.5 h-3.5 mr-1" />
          {post.final_image_url ? "Replace Final" : "Upload Final Image"}
        </Button>
      )}
      {post.status === "approved" && (
        <Button size="sm" variant="secondary" disabled={busy} onClick={onPrepare}>
          <Send className="w-3.5 h-3.5 mr-1" />
          Prepare for Publish
        </Button>
      )}
    </div>
  );
}