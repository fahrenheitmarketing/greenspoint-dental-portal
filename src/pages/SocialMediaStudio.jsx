import React, { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { base44 } from "@/api/base44Client";
import { useToast } from "@/components/ui/use-toast";
import StudioHeader from "@/components/social/StudioHeader";
import StudioFilterBar from "@/components/social/StudioFilterBar";
import BulkActionBar from "@/components/social/BulkActionBar";
import PostCard from "@/components/social/PostCard";
import GenerateContentDialog from "@/components/social/GenerateContentDialog";
import SettingsDialog from "@/components/social/SettingsDialog";
import BrandSetupDialog from "@/components/social/BrandSetupDialog";
import ProcessFeedbackDialog from "@/components/social/ProcessFeedbackDialog";
import SetupWizard from "@/components/social/SetupWizard";
import { usePostHistory, snapshotPosts } from "@/hooks/usePostHistory";
import { Loader2 } from "lucide-react";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export default function SocialMediaStudio() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [platform, setPlatform] = useState("all");
  const [status, setStatus] = useState("all");
  const [campaignMonthFilter, setCampaignMonthFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState({ day: "all", month: "all", year: "all" });
  const [showGenerate, setShowGenerate] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showBrandSetup, setShowBrandSetup] = useState(false);
  const [showProcessFeedback, setShowProcessFeedback] = useState(false);
  const [processingFeedback, setProcessingFeedback] = useState(false);
  const [setupCheck, setSetupCheck] = useState(null);
  const [setupChecking, setSetupChecking] = useState(false);
  const [showSetupWizard, setShowSetupWizard] = useState(false);
  const { toast } = useToast();

  const now = new Date();
  const [campaignMonth, setCampaignMonth] = useState(`${MONTHS[now.getMonth()]} ${now.getFullYear()}`);
  const monthInitialized = useRef(false);

  const postsRef = useRef(posts);
  useEffect(() => { postsRef.current = posts; }, [posts]);

  const loadPosts = useCallback(async () => {
    const data = await base44.entities.SocialPost.list("-scheduled_date", 200);
    setPosts(data);
    setLoading(false);
    return data;
  }, []);

  useEffect(() => { loadPosts(); }, [loadPosts]);

  // First-run setup: verify the studio is fully configured on load
  const runSetupCheck = useCallback(async () => {
    setSetupChecking(true);
    try {
      const res = await base44.functions.invoke("checkSocialStudioSetup", {});
      const data = res?.data || res;
      setSetupCheck(data);
      if (data && data.ready === false) setShowSetupWizard(true);
    } catch (e) {
      // Check can't run (e.g. non-admin) — keep the wizard hidden
    } finally {
      setSetupChecking(false);
    }
  }, []);

  useEffect(() => { runSetupCheck(); }, [runSetupCheck]);

  // Auto-set the campaign month from the most recent post, but only once
  useEffect(() => {
    if (!monthInitialized.current && posts.length > 0 && posts[0]?.campaign_month) {
      setCampaignMonth(posts[0].campaign_month);
      monthInitialized.current = true;
    }
  }, [posts]);

  const { pushHistory, undo, redo, busy: historyBusy, canUndo, canRedo, undoLabel, redoLabel } =
    usePostHistory({ postsRef, reload: loadPosts });

  // Wraps any mutating action with before/after snapshots for undo/redo.
  const runWithHistory = useCallback(async (label, fn) => {
    const before = snapshotPosts(postsRef.current);
    try {
      const res = await fn();
      const data = await loadPosts();
      pushHistory(before, snapshotPosts(data), label);
      return res;
    } catch (e) {
      await loadPosts();
      throw e;
    }
  }, [loadPosts, pushHistory]);

  const uniqueMonths = [...new Set(posts.map((p) => p.campaign_month).filter(Boolean))].sort().reverse();

  const filtered = posts.filter((p) => {
    const monthMatch = campaignMonthFilter === "all" || p.campaign_month === campaignMonthFilter;
    const platformMatch = platform === "all" || p.platform === platform;
    const statusMatch = status === "all" ? (p.status !== "rejected" && p.status !== "deleted") : p.status === status;
    let dateMatch = true;
    if (p.scheduled_date) {
      const d = new Date(p.scheduled_date);
      dateMatch =
        (dateFilter.day === "all" || String(d.getDate()) === dateFilter.day) &&
        (dateFilter.month === "all" || String(d.getMonth()) === dateFilter.month) &&
        (dateFilter.year === "all" || String(d.getFullYear()) === dateFilter.year);
    } else if (dateFilter.day !== "all" || dateFilter.month !== "all" || dateFilter.year !== "all") {
      dateMatch = false;
    }
    return monthMatch && platformMatch && statusMatch && dateMatch;
  });

  const availableYears = useMemo(
    () => [...new Set(posts.map((p) => p.scheduled_date ? new Date(p.scheduled_date).getFullYear() : null).filter(Boolean))].sort().reverse(),
    [posts]
  );

  const filteredPendingIds = filtered.filter((p) => p.status === "pending").map((p) => p.id);
  const pendingCount = posts.filter((p) => p.status === "pending").length;

  const handleProcessFeedback = (taskUrl) => {
    setProcessingFeedback(true);
    (async () => {
      try {
        const res = await runWithHistory("Process Feedback", () =>
          base44.functions.invoke("processClickUpFeedback", { taskUrl })
        );
        const data = res?.data || res;
        const pendingImagePosts = (data.summaries || []).flatMap((s) => s.pending_image_posts || []);
        const description = pendingImagePosts.length > 0
          ? `${data.tasks_processed} task(s) processed. ${pendingImagePosts.length} post(s) have pending image edits — use Regenerate Image to apply them.`
          : `${data.tasks_processed} task(s) processed.`;
        toast({ title: "Feedback processed", description });
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
      <StudioHeader
        pendingFeedbackCount={pendingCount}
        onGenerate={() => setShowGenerate(true)}
        onProcessFeedback={() => setShowProcessFeedback(true)}
        onSettings={() => setShowSettings(true)}
        onBrandSetup={() => setShowBrandSetup(true)}
        processing={processingFeedback}
        canUndo={canUndo}
        canRedo={canRedo}
        onUndo={undo}
        onRedo={redo}
        undoLabel={undoLabel}
        redoLabel={redoLabel}
        historyBusy={historyBusy}
      />
      <BulkActionBar
        campaignMonth={campaignMonth}
        onCampaignMonthChange={setCampaignMonth}
        filteredPendingIds={filteredPendingIds}
        runAction={runWithHistory}
      />
      <div className="mb-6">
        <StudioFilterBar platform={platform} setPlatform={setPlatform} status={status} setStatus={setStatus} campaignMonthFilter={campaignMonthFilter} setCampaignMonthFilter={setCampaignMonthFilter} campaignMonths={uniqueMonths} dateFilter={dateFilter} setDateFilter={setDateFilter} availableYears={availableYears} />
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground">
          No posts yet. Click "Generate Full Month" to bootstrap this month's pipeline.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((post) => (
            <PostCard key={post.id} post={post} onAction={runWithHistory} />
          ))}
        </div>
      )}

      <GenerateContentDialog
        open={showGenerate}
        onOpenChange={setShowGenerate}
        runAction={runWithHistory}
        onGenerated={(res) => {
          toast({ title: "Content generated", description: `${res.posts_created} posts created for ${res.campaign_month}.` });
        }}
      />
      <SettingsDialog open={showSettings} onOpenChange={(v) => { setShowSettings(v); if (!v) runSetupCheck(); }} />
      <BrandSetupDialog open={showBrandSetup} onOpenChange={(v) => { setShowBrandSetup(v); if (!v) runSetupCheck(); }} />
      <SetupWizard
        open={showSetupWizard}
        onOpenChange={setShowSetupWizard}
        check={setupCheck}
        rechecking={setupChecking}
        onRecheck={runSetupCheck}
        onOpenBrandSetup={() => setShowBrandSetup(true)}
        onOpenSettings={() => setShowSettings(true)}
      />
      <ProcessFeedbackDialog
        open={showProcessFeedback}
        onOpenChange={setShowProcessFeedback}
        onProcess={handleProcessFeedback}
        processing={processingFeedback}
      />
    </div>
  );
}