import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Zap, ImagePlus, CheckCheck, Download, Send, Loader2, RefreshCw } from "lucide-react";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const YEARS = [2026, 2027, 2028];

function parseCampaignMonth(cm) {
  if (!cm) {
    const now = new Date();
    return { month: now.getMonth() + 1, year: now.getFullYear() };
  }
  const [name, yearStr] = cm.split(" ");
  const month = MONTHS.indexOf(name) + 1;
  const year = parseInt(yearStr);
  return { month: month || 1, year: year || new Date().getFullYear() };
}

export default function BulkActionBar({ campaignMonth, onCampaignMonthChange, filteredPendingIds, onRefresh }) {
  const [busyAction, setBusyAction] = useState(null);
  const { toast } = useToast();
  const { month, year } = parseCampaignMonth(campaignMonth);

  const updateMonth = (newMonth) => onCampaignMonthChange(`${MONTHS[newMonth - 1]} ${year}`);
  const updateYear = (newYear) => onCampaignMonthChange(`${MONTHS[month - 1]} ${newYear}`);

  const runBulk = async (actionName, fn, successMsg) => {
    setBusyAction(actionName);
    try {
      const res = await fn();
      const d = res.data || res;
      toast({ title: successMsg.title, description: successMsg.desc(d) });
      onRefresh();
    } catch (e) {
      toast({ title: "Error", description: e?.response?.data?.error || e.message, variant: "destructive" });
    } finally {
      setBusyAction(null);
    }
  };

  const isBusy = (action) => busyAction === action;
  const anyBusy = !!busyAction;

  return (
    <div className="flex flex-wrap items-center gap-3 mb-6 p-4 bg-muted/50 rounded-xl border border-border">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-muted-foreground whitespace-nowrap">Campaign:</span>
        <Select value={String(month)} onValueChange={(v) => updateMonth(parseInt(v))}>
          <SelectTrigger className="w-36 h-9"><SelectValue /></SelectTrigger>
          <SelectContent>
            {MONTHS.map((m, i) => (
              <SelectItem key={m} value={String(i + 1)}>{m}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={String(year)} onValueChange={(v) => updateYear(parseInt(v))}>
          <SelectTrigger className="w-24 h-9"><SelectValue /></SelectTrigger>
          <SelectContent>
            {YEARS.map((y) => (
              <SelectItem key={y} value={String(y)}>{y}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="h-6 w-px bg-border hidden sm:block" />
      <div className="flex flex-wrap items-center gap-2">
        <Button
          size="sm"
          disabled={anyBusy}
          onClick={() => runBulk(
            "generateFullMonth",
            () => base44.functions.invoke("generateFullMonth", { month, year }),
            { title: "Full month generated", desc: (d) => `${d.posts_created} posts, ${d.images_generated} images, ${d.attachments_uploaded} attached to ClickUp.` }
          )}
        >
          {isBusy("generateFullMonth") ? <Loader2 className="w-4 h-4 mr-1 animate-spin" /> : <Zap className="w-4 h-4 mr-1" />}
          Generate Full Month
        </Button>
        <Button
          size="sm"
          variant="outline"
          disabled={anyBusy}
          onClick={() => runBulk(
            "regenerateMonth",
            () => base44.functions.invoke("regenerateMonthPosts", { campaignMonth }),
            { title: "Month regenerated", desc: (d) => `${d.regenerated} posts regenerated, ${d.images_generated} images created, ${d.images_failed} failed.` }
          )}
        >
          {isBusy("regenerateMonth") ? <Loader2 className="w-4 h-4 mr-1 animate-spin" /> : <RefreshCw className="w-4 h-4 mr-1" />}
          Regenerate Month
        </Button>
        <Button
          size="sm"
          variant="outline"
          disabled={anyBusy}
          onClick={() => runBulk(
            "generateImages",
            () => base44.functions.invoke("bulkGenerateImages", { campaignMonth }),
            { title: "Images generated", desc: (d) => `${d.generated} generated, ${d.attached} attached, ${d.failed} failed.` }
          )}
        >
          {isBusy("generateImages") ? <Loader2 className="w-4 h-4 mr-1 animate-spin" /> : <ImagePlus className="w-4 h-4 mr-1" />}
          Generate All Images
        </Button>
        <Button
          size="sm"
          variant="outline"
          disabled={anyBusy || filteredPendingIds.length === 0}
          onClick={() => runBulk(
            "approveAll",
            () => base44.functions.invoke("bulkApprovePosts", { postIds: filteredPendingIds }),
            { title: "Posts approved", desc: (d) => `${d.approved} approved, ${d.attached} sent to ClickUp, ${d.skipped} skipped.` }
          )}
        >
          {isBusy("approveAll") ? <Loader2 className="w-4 h-4 mr-1 animate-spin" /> : <CheckCheck className="w-4 h-4 mr-1" />}
          Approve All ({filteredPendingIds.length})
        </Button>
        <Button
          size="sm"
          variant="outline"
          disabled={anyBusy}
          onClick={() => runBulk(
            "pullClickUp",
            () => base44.functions.invoke("pullFinalImagesFromClickUp", { campaignMonth }),
            { title: "Final images pulled", desc: (d) => `${d.matched} matched, ${d.unmatched} unmatched.` }
          )}
        >
          {isBusy("pullClickUp") ? <Loader2 className="w-4 h-4 mr-1 animate-spin" /> : <Download className="w-4 h-4 mr-1" />}
          Pull from ClickUp
        </Button>
        <Button
          size="sm"
          variant="secondary"
          disabled={anyBusy}
          onClick={() => runBulk(
            "schedulePostiz",
            () => base44.functions.invoke("scheduleToPostiz", { campaignMonth }),
            { title: "Scheduled to Postiz", desc: (d) => `${d.scheduled} scheduled, ${d.needs_review} need date review, ${d.skipped} skipped.` }
          )}
        >
          {isBusy("schedulePostiz") ? <Loader2 className="w-4 h-4 mr-1 animate-spin" /> : <Send className="w-4 h-4 mr-1" />}
          Schedule to Postiz
        </Button>
      </div>
    </div>
  );
}