import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { useToast } from "@/components/ui/use-toast";
import { ImageIcon, Globe, Search, Calendar } from "lucide-react";
import { format } from "date-fns";
import BlogStatusBadge from "./BlogStatusBadge";
import BlogCardActions from "./BlogCardActions";
import BlogDetailDialog from "./BlogDetailDialog";

const CATEGORY_LABELS = {
  "general-dentistry": "General Dentistry",
  "cosmetic-dentistry": "Cosmetic Dentistry",
  "restorative-dentistry": "Restorative Dentistry",
  "orthodontics": "Orthodontics",
  "family-dental": "Family Dental",
  "insurance-financing": "Insurance & Financing",
  "dental-health": "Dental Health",
  "smile-confidence": "Smile Confidence",
  "affordable-dentistry": "Affordable Dentistry",
  "community": "Community",
};

export default function BlogCard({ post, onAction }) {
  const [busy, setBusy] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const { toast } = useToast();

  const runAction = async (label, fn) => {
    setBusy(true);
    try {
      return await onAction(label, fn);
    } finally {
      setBusy(false);
    }
  };

  const handleGenerateImage = () =>
    runAction("Generate Image", () => base44.functions.invoke("generateBlogImage", { postId: post.id }));

  const handleSendToClickUp = () =>
    runAction("Send to ClickUp", () => base44.functions.invoke("approveAndSendBlogToClickUp", { postId: post.id }));

  const handleApprove = () =>
    runAction("Approve Post", async () => {
      await base44.entities.BlogStudioPost.update(post.id, { status: "approved" });
      toast({ title: "Post approved", description: "Ready to publish to WordPress." });
    });

  const handleReject = () =>
    runAction("Reject Post", async () => {
      await base44.entities.BlogStudioPost.update(post.id, { status: "rejected" });
    });

  const handlePublishToWordPress = () =>
    runAction("Prepare for WordPress", async () => {
      const res = await base44.functions.invoke("publishBlogToWordPress", { postId: post.id });
      toast({
        title: "Ready to publish",
        description: "The post is prepared. Ask Base44 to publish it to WordPress via the WordPress connection.",
      });
      return res;
    });

  const handleDelete = async () => {
    if (!window.confirm("Delete this blog post? This cannot be undone.")) return;
    runAction("Delete Post", () => base44.entities.BlogStudioPost.delete(post.id));
  };

  const onSaveField = (field, value) =>
    onAction(`Edit ${field}`, () => base44.entities.BlogStudioPost.update(post.id, { [field]: value }));

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm flex flex-col">
      <div className="aspect-video bg-muted flex items-center justify-center overflow-hidden relative cursor-pointer" onClick={() => setShowDetail(true)}>
        {post.image_url ? (
          <img src={post.image_url} alt={post.title} className="w-full h-full object-cover" />
        ) : (
          <ImageIcon className="w-10 h-10 text-muted-foreground/40" />
        )}
      </div>
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">
            {CATEGORY_LABELS[post.category] || post.category}
          </span>
          {post.published_date && (
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Calendar className="w-3 h-3" />
              {format(new Date(post.published_date), "EEE MMM d")}
            </span>
          )}
          <BlogStatusBadge status={post.status} />
        </div>
        <h3 className="text-sm font-heading font-semibold text-foreground line-clamp-2 mb-1 cursor-pointer hover:text-primary transition-colors" onClick={() => setShowDetail(true)} title="Click to view full post">
          {post.title}
        </h3>
        <p className="text-xs text-muted-foreground line-clamp-2 mb-2">{post.excerpt}</p>
        <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
          {post.read_time && <span>{post.read_time} min read</span>}
          {post.seo_score != null && (
            <span className={`font-medium ${post.seo_score >= 70 ? "text-green-600" : post.seo_score >= 50 ? "text-amber-600" : "text-destructive"}`}>
              SEO {post.seo_score}/100
            </span>
          )}
          {post.title_es && (
            <span className="flex items-center gap-0.5 text-primary"><Globe className="w-3 h-3" /> ES</span>
          )}
        </div>
        <p className="text-xs text-muted-foreground mb-2">
          Slug: <code className="text-foreground/70">/{post.slug}</code>
        </p>
        <BlogCardActions
          post={post}
          busy={busy}
          onGenerateImage={handleGenerateImage}
          onSendToClickUp={handleSendToClickUp}
          onApprove={handleApprove}
          onReject={handleReject}
          onPublishToWordPress={handlePublishToWordPress}
          onViewDetail={() => setShowDetail(true)}
          onDelete={handleDelete}
        />
      </div>
      <BlogDetailDialog post={post} open={showDetail} onOpenChange={setShowDetail} onSaveField={onSaveField} />
    </div>
  );
}