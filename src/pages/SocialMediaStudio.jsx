import React, { useState, useEffect, useCallback, useRef } from "react";
import { base44 } from "@/api/base44Client";
import { useToast } from "@/components/ui/use-toast";
import StudioHeader from "@/components/social/StudioHeader";
import StudioFilterBar from "@/components/social/StudioFilterBar";
import BulkActionBar from "@/components/social/BulkActionBar";
import PostCard from "@/components/social/PostCard";
import GenerateContentDialog from "@/components/social/GenerateContentDialog";
import SettingsDialog from "@/components/social/SettingsDialog";
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
  const [showGenerate, setShowGenerate] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [processingFeedback, setProcessingFeedback] = useState(false);
  const { toast } = useToast();

  const now = new Date();
  const [campaignMonth, setCampaignMonth] = useState(`${MONTHS[now.getMonth()]} ${now.getFullYear()}`);
  const monthInitialized = useRef(false);

  const loadPosts = useCallback(async () => {
    const data = await base44.entities.SocialPost.list("-scheduled_date", 200);
    setPosts(data);
    setLoading(false);
  }, []);

  useEffect(() => { loadPosts(); }, [loadPosts]);

  // Auto-set the campaign month from the most recent post, but only once
  useEffect(() => {
    if (!monthInitialized.current && posts.length > 0 && posts[0]?.campaign_month) {
      setCampaignMonth(posts[0].campaign_month);
      monthInitialized.current = true;
    }
  }, [posts]);

  const filtered = posts.filter((p) => {
    const platformMatch = platform === "all" || p.platform === platform;
    const statusMatch = status === "all" ? p.status !== "rejected" : p.status === status;
    return platformMatch && statusMatch;
  });

  const filteredPendingIds = filtered.filter((p) => p.status === "pending").map((p) => p.id);
  const pendingCount = posts.filter((p) => p.status === "pending").length;

  const handleProcessFeedback = async () => {
    setProcessingFeedback(true);
    try {
      const res = await base44.functions.invoke("processClickUpFeedback", {});
      toast({ title: "Feedback processed", description: `${res.data.posts_updated} post(s) updated.` });
      await loadPosts();
    } catch (e) {
      toast({ title: "Error processing feedback", description: e?.response?.data?.error || e.message, variant: "destructive" });
    } finally {
      setProcessingFeedback(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <StudioHeader
        pendingFeedbackCount={pendingCount}
        onGenerate={() => setShowGenerate(true)}
        onProcessFeedback={handleProcessFeedback}
        onSettings={() => setShowSettings(true)}
        processing={processingFeedback}
      />
      <BulkActionBar
        campaignMonth={campaignMonth}
        onCampaignMonthChange={setCampaignMonth}
        filteredPendingIds={filteredPendingIds}
        onRefresh={loadPosts}
      />
      <div className="mb-6">
        <StudioFilterBar platform={platform} setPlatform={setPlatform} status={status} setStatus={setStatus} />
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
            <PostCard key={post.id} post={post} onChanged={loadPosts} />
          ))}
        </div>
      )}

      <GenerateContentDialog
        open={showGenerate}
        onOpenChange={setShowGenerate}
        onGenerated={(res) => {
          toast({ title: "Content generated", description: `${res.posts_created} posts created for ${res.campaign_month}.` });
          loadPosts();
        }}
      />
      <SettingsDialog open={showSettings} onOpenChange={setShowSettings} />
    </div>
  );
}