import React, { useState, useRef } from "react";
import { base44 } from "@/api/base44Client";
import { useToast } from "@/components/ui/use-toast";
import { format } from "date-fns";
import { ImageIcon } from "lucide-react";
import PlatformBadge from "./PlatformBadge";
import StatusBadge from "./StatusBadge";
import PostCardActions from "./PostCardActions";
import PostDetailDialog from "./PostDetailDialog";
import FixDateDialog from "./FixDateDialog";

export default function PostCard({ post, onAction }) {
  const [busy, setBusy] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [showFixDate, setShowFixDate] = useState(false);
  const fileInputRef = useRef(null);
  const { toast } = useToast();

  const runAction = async (label, fn) => {
    setBusy(true);
    try {
      return await onAction(label, fn);
    } finally {
      setBusy(false);
    }
  };

  // Shows the right toast for a scheduleToPostiz response.
  const notifyScheduleResult = (res) => {
    if (!res) return;
    if (res.needs_review > 0) {
      toast({
        title: "Date is in the past",
        description: "The date you picked is still in the past. Please pick a future date.",
        variant: "destructive",
      });
    } else if (res.scheduled > 0) {
      toast({ title: "Scheduled to Postiz", description: `${res.scheduled} post(s) scheduled.` });
    } else if (res.skipped > 0) {
      toast({
        title: "Nothing scheduled",
        description: res.errors?.[0]?.error || "Post was skipped. Check it has a final image.",
        variant: "destructive",
      });
    }
  };

  const handleRegenerateImage = () =>
    runAction("Regenerate Image", () => base44.functions.invoke("regeneratePostImage", { postId: post.id }));

  const handleCreateNew = () =>
    runAction("Create New Post", () =>
      base44.functions.invoke("generateSinglePost", {
        platform: post.platform,
        campaignMonth: post.campaign_month,
        scheduledDate: post.scheduled_date,
        sourceTopic: post.topic,
      })
    );

  const handleApprove = () =>
    runAction("Approve Post", () => base44.functions.invoke("approveAndSendImageToClickUp", { postId: post.id }));

  const handleReject = () =>
    runAction("Reject Post", async () => {
      await base44.entities.SocialPost.update(post.id, { status: "rejected" });
      await base44.functions.invoke("generateSinglePost", {
        platform: post.platform,
        campaignMonth: post.campaign_month,
        scheduledDate: post.scheduled_date,
        sourceTopic: post.topic,
      });
    });

  const handlePrepare = () =>
    runAction("Prepare for Publish", () => base44.functions.invoke("resizeImageForPlatform", { postId: post.id }));

  const handleScheduleToPostiz = () =>
    runAction("Schedule to Postiz", async () => {
      const res = await base44.functions.invoke("scheduleToPostiz", { postId: post.id });
      notifyScheduleResult(res);
      return res;
    });

  const handleFixDate = () => setShowFixDate(true);

  const handleFixDateConfirm = (newDate) =>
    runAction("Fix Date & Reschedule", async () => {
      const res = await base44.functions.invoke("scheduleToPostiz", { postId: post.id, newDate });
      notifyScheduleResult(res);
      if (res && res.needs_review === 0) setShowFixDate(false);
      return res;
    });

  const handlePostNow = () => {
    if (!window.confirm("Publish this post to Postiz immediately?")) return;
    runAction("Post Now", async () => {
      const res = await base44.functions.invoke("scheduleToPostiz", { postId: post.id, postNow: true });
      notifyScheduleResult(res);
      return res;
    });
  };

  const handleDelete = async () => {
    if (!window.confirm("Move this post to trash? You can restore it from the Deleted filter.")) return;
    runAction("Delete Post", () => base44.entities.SocialPost.update(post.id, { status: "deleted" }));
  };

  const handleRestore = () =>
    runAction("Restore Post", () => base44.entities.SocialPost.update(post.id, { status: "pending" }));

  const handleUnapprove = () =>
    runAction("Un-approve Post", () => base44.entities.SocialPost.update(post.id, { status: "pending" }));

  const handleUploadFinalImage = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    runAction("Upload Final Image", async () => {
      const { file_url } = await base44.integrations.Core.UploadFile({ file });
      await base44.entities.SocialPost.update(post.id, { final_image_url: file_url, status: "ready_to_publish" });
    });
    e.target.value = "";
  };

  const onSaveField = (field, value) =>
    onAction(
      `Edit ${field === "content" ? "Post Copy" : "Image Direction"}`,
      () => base44.entities.SocialPost.update(post.id, { [field]: value })
    );

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm flex flex-col">
      <div className="aspect-square bg-muted flex items-center justify-center overflow-hidden relative">
        {post.final_image_url || post.image_url ? (
          <img src={post.final_image_url || post.image_url} alt={post.topic} className="w-full h-full object-cover" />
        ) : (
          <ImageIcon className="w-10 h-10 text-muted-foreground/40" />
        )}
        {post.final_image_url && (
          <span className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full font-medium shadow-sm">Final</span>
        )}
      </div>
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-center justify-between gap-2 mb-2">
          <PlatformBadge platform={post.platform} />
          <StatusBadge status={post.status} />
        </div>
        {post.scheduled_date && (
          <p className="text-xs text-muted-foreground mb-2">
            {format(new Date(post.scheduled_date), "MMM d, yyyy")}
          </p>
        )}
        <p className="text-sm text-foreground/90 line-clamp-4 flex-1 cursor-pointer hover:text-primary transition-colors" onClick={() => setShowDetail(true)} title="Click to view full post">
          {post.content}
        </p>
        <button className="text-xs text-primary hover:underline self-start mb-2" onClick={() => setShowDetail(true)}>View full post</button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleUploadFinalImage}
        />
        <PostCardActions
          post={post}
          busy={busy}
          onRegenerateImage={handleRegenerateImage}
          onClone={handleCreateNew}
          onApprove={handleApprove}
          onReject={handleReject}
          onPrepare={handlePrepare}
          onScheduleToPostiz={handleScheduleToPostiz}
          onFixDate={handleFixDate}
          onPostNow={handlePostNow}
          onUploadFinalImage={() => fileInputRef.current?.click()}
          onDelete={handleDelete}
          onRestore={handleRestore}
          onUnapprove={handleUnapprove}
        />
      </div>
      <PostDetailDialog post={post} open={showDetail} onOpenChange={setShowDetail} onSaveField={onSaveField} />
      <FixDateDialog post={post} open={showFixDate} onOpenChange={setShowFixDate} onConfirm={handleFixDateConfirm} />
    </div>
  );
}