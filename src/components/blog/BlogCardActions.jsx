import React from "react";
import { Button } from "@/components/ui/button";
import { Sparkles, Check, X, Send, Trash2, FlaskConical, Rocket, Eye, ShieldCheck } from "lucide-react";

export default function BlogCardActions({ post, busy, onGenerateImage, onSendToClickUp, onApprove, onReject, onPublishToStaging, onPublishToProduction, onViewDetail, onViewQA, onDelete }) {
  const qaPassed = post.qa_report?.allPassed === true;
  const qaRun = !!post.qa_report;
  const prePublish = ["approved", "ready_to_publish"].includes(post.status);
  const preProduction = prePublish || post.status === "staged";
  const staged = !!post.staging_wp_post_id_en || !!post.staging_wp_post_id_es;
  return (
    <div className="flex flex-wrap gap-2 pt-3 border-t border-border mt-3">
      <Button size="sm" variant="outline" disabled={busy} onClick={onViewDetail}>
        <Eye className="w-3.5 h-3.5 mr-1" />
        View
      </Button>
      <Button size="sm" variant="outline" disabled={busy} onClick={onViewQA}>
        <ShieldCheck className={`w-3.5 h-3.5 mr-1 ${qaRun ? (qaPassed ? "text-green-600" : "text-red-600") : ""}`} />
        View QA
      </Button>
      {!["approved", "ready_to_publish", "staged", "published", "scheduled"].includes(post.status) && (
        <Button size="sm" variant="outline" disabled={busy} onClick={onGenerateImage}>
          <Sparkles className="w-3.5 h-3.5 mr-1" />
          {post.image_url ? "Regenerate Image" : "Generate Image"}
        </Button>
      )}
      {!["approved", "ready_to_publish", "staged", "published", "scheduled", "pending"].includes(post.status) && post.status !== "needs_revision" && (
        <Button size="sm" variant="outline" disabled={busy} onClick={onSendToClickUp}>
          <Send className="w-3.5 h-3.5 mr-1" />
          Send to ClickUp
        </Button>
      )}
      {!["approved", "ready_to_publish", "staged", "published", "scheduled"].includes(post.status) && (
        <Button size="sm" variant="default" disabled={busy || !qaPassed} onClick={onApprove} title={qaPassed ? "Approve this post" : "Post must pass all QA checks before it can be approved"}>
          <Check className="w-3.5 h-3.5 mr-1" />
          Approve{!qaPassed && " (QA required)"}
        </Button>
      )}
      {!["rejected", "published", "scheduled"].includes(post.status) && (
        <Button size="sm" variant="destructive" disabled={busy} onClick={onReject}>
          <X className="w-3.5 h-3.5 mr-1" />
          Reject
        </Button>
      )}
      {prePublish && (
        <Button size="sm" variant="default" disabled={busy} onClick={onPublishToStaging}>
          <FlaskConical className="w-3.5 h-3.5 mr-1" />
          Publish to Staging
        </Button>
      )}
      {preProduction && (
        <Button size="sm" variant="secondary" disabled={busy} onClick={onPublishToProduction}>
          <Rocket className="w-3.5 h-3.5 mr-1" />
          Publish to Production
        </Button>
      )}
      {staged && post.staging_wp_url_en && (
        <a href={post.staging_wp_url_en} target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline self-center">View on Staging ↗</a>
      )}
      {(post.status === "published" || post.status === "scheduled") && post.wp_url_en && (
        <a href={post.wp_url_en} target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline self-center">View on WordPress ↗</a>
      )}
      <Button size="sm" variant="destructive" disabled={busy} onClick={onDelete}>
        <Trash2 className="w-3.5 h-3.5 mr-1" />
        Delete
      </Button>
    </div>
  );
}