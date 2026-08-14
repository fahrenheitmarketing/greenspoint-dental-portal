import React, { useState, useRef } from "react";
import { base44 } from "@/api/base44Client";
import { format } from "date-fns";
import { ImageIcon } from "lucide-react";
import PlatformBadge from "./PlatformBadge";
import StatusBadge from "./StatusBadge";
import PostCardActions from "./PostCardActions";

export default function PostCard({ post, onChanged }) {
  const [busy, setBusy] = useState(false);
  const fileInputRef = useRef(null);

  const runAction = async (fn) => {
    setBusy(true);
    try {
      await fn();
      onChanged();
    } finally {
      setBusy(false);
    }
  };

  const handleRegenerateImage = () =>
    runAction(() => base44.functions.invoke("regeneratePostImage", { postId: post.id }));

  const handleClone = () =>
    runAction(() =>
      base44.entities.SocialPost.create({
        platform: post.platform,
        topic: post.topic,
        content: post.content,
        status: "draft",
        scheduled_date: post.scheduled_date,
        campaign_month: post.campaign_month,
      })
    );

  const setStatus = (status, note) =>
    runAction(async () => {
      await base44.entities.SocialPost.update(post.id, { status });
      if (post.clickup_task_id) {
        await base44.functions.invoke("syncPostToClickUp", { postId: post.id, note });
      }
    });

  const handleApprove = () =>
    runAction(() => base44.functions.invoke("approveAndSendImageToClickUp", { postId: post.id }));

  const handleReject = () => setStatus("rejected", "Post rejected in the Social Media Studio dashboard.");
  const handlePrepare = () => runAction(() => base44.functions.invoke("resizeImageForPlatform", { postId: post.id }));

  const handleUploadFinalImage = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    runAction(async () => {
      const { file_url } = await base44.integrations.Core.UploadFile({ file });
      await base44.entities.SocialPost.update(post.id, { final_image_url: file_url, status: "ready_to_publish" });
    });
    e.target.value = "";
  };

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
        <p className="text-sm text-foreground/90 line-clamp-4 flex-1">{post.content}</p>
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
          onClone={handleClone}
          onApprove={handleApprove}
          onReject={handleReject}
          onPrepare={handlePrepare}
          onUploadFinalImage={() => fileInputRef.current?.click()}
        />
      </div>
    </div>
  );
}