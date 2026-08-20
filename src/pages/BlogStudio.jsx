import React, { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { base44 } from "@/api/base44Client";
import { useToast } from "@/components/ui/use-toast";
import BlogStudioHeader from "@/components/blog/BlogStudioHeader";
import BlogStudioFilterBar from "@/components/blog/BlogStudioFilterBar";
import BlogCard from "@/components/blog/BlogCard";
import BlogGenerateDialog from "@/components/blog/BlogGenerateDialog";
import BlogSettingsDialog from "@/components/blog/BlogSettingsDialog";
import BlogProcessFeedbackDialog from "@/components/blog/BlogProcessFeedbackDialog";
import { useBlogPostHistory, snapshotBlogPosts } from "@/hooks/useBlogPostHistory";
import { Loader2 } from "lucide-react";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export default function BlogStudio() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("all");
  const [status, setStatus] = useState("all");
  const [campaignMonthFilter, setCampaignMonthFilter] = useState("all");
  const [showGenerate, setShowGenerate] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showProcessFeedback, setShowProcessFeedback] = useState(false);
  const [processingFeedback, setProcessingFeedback] = useState(false);
  const { toast } = useToast();

  const now = new Date();
  const [campaignMonth] = useState(`${MONTHS[now.getMonth()]} ${now.getFullYear()}`);
  const monthInitialized = useRef(false);

  const postsRef = useRef(posts);
  useEffect(() => { postsRef.current = posts; }, [posts]);

  const loadPosts = useCallback(async () => {
    const data = await base44.entities.BlogStudioPost.list("-created_date", 200);
    setPosts(data);
    setLoading(false);
    return data;
  }, []);

  useEffect(() => { loadPosts(); }, [loadPosts]);

  useEffect(() => {
    if (!monthInitialized.current && posts.length > 0 && posts[0]?.campaign_month) {
      setCampaignMonthFilter(posts[0].campaign_month);
      monthInitialized.current = true;
    }
  }, [posts]);

  const { pushHistory, undo, redo, busy: historyBusy, canUndo, canRedo, undoLabel, redoLabel } =
    useBlogPostHistory({ postsRef, reload: loadPosts });

  const runWithHistory = useCallback(async (label, fn) => {
    const before = snapshotBlogPosts(postsRef.current);
    try {
      const res = await fn();
      const data = await loadPosts();
      pushHistory(before, snapshotBlogPosts(data), label);
      return res;
    } catch (e) {
      await loadPosts();
      throw e;
    }
  }, [loadPosts, pushHistory]);

  const uniqueMonths = useMemo(
    () => [...new Set(posts.map((p) => p.campaign_month).filter(Boolean))].sort().reverse(),
    [posts]
  );

  const filtered = posts.filter((p) => {
    const monthMatch = campaignMonthFilter === "all" || p.campaign_month === campaignMonthFilter;
    const categoryMatch = category === "all" || p.category === category;
    const statusMatch = status === "all" ? (p.status !== "rejected") : p.status === status;
    return monthMatch && categoryMatch && statusMatch;
  });

  const pendingCount = posts.filter((p) => p.status === "pending").length;

  const handleProcessFeedback = (taskUrl) => {
    setProcessingFeedback(true);
    (async () => {
      try {
        const res = await runWithHistory("Process Feedback", () =>
          base44.functions.invoke("processBlogClickUpFeedback", { taskUrl })
        );
        const data = res?.data || res;
        toast({ title: "Feedback processed", description: data.message || `${data.tasks_processed} task(s) processed.` });
        setShowProcessFeedback(false);
      } catch (e) {
        toast({ title: "Error processing feedback", description: e?.response?.data?.error || e.message, variant: "destructive" });
      } finally {
        setProcessingFeedback(false);
      }
    })();
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <BlogStudioHeader
        pendingCount={pendingCount}
        onGenerate={() => setShowGenerate(true)}
        onProcessFeedback={() => setShowProcessFeedback(true)}
        onSettings={() => setShowSettings(true)}
        processing={processingFeedback}
        canUndo={canUndo}
        canRedo={canRedo}
        onUndo={undo}
        onRedo={redo}
        undoLabel={undoLabel}
        redoLabel={redoLabel}
        historyBusy={historyBusy}
      />
      <div className="mb-6">
        <BlogStudioFilterBar
          category={category}
          setCategory={setCategory}
          status={status}
          setStatus={setStatus}
          campaignMonthFilter={campaignMonthFilter}
          setCampaignMonthFilter={setCampaignMonthFilter}
          campaignMonths={uniqueMonths}
        />
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground">
          No blog posts yet. Click "Generate Blog Post" to create your first article.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((post) => (
            <BlogCard key={post.id} post={post} onAction={runWithHistory} />
          ))}
        </div>
      )}

      <BlogGenerateDialog
        open={showGenerate}
        onOpenChange={setShowGenerate}
        runAction={runWithHistory}
        onGenerated={(res) => {
          const count = res?.count || 1;
          if (count > 1) {
            toast({ title: `${count} blog posts generated`, description: `Each post is scheduled to a Thursday in the selected month.` });
          } else {
            toast({ title: "Blog post generated", description: `"${res?.created?.[0]?.title || "New post"}" created and ready for review.` });
          }
        }}
      />
      <BlogSettingsDialog open={showSettings} onOpenChange={setShowSettings} />
      <BlogProcessFeedbackDialog
        open={showProcessFeedback}
        onOpenChange={setShowProcessFeedback}
        onProcess={handleProcessFeedback}
        processing={processingFeedback}
      />
    </div>
  );
}