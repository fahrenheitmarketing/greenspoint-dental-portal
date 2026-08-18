import React from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const PLATFORMS = [
  { value: "all", label: "All Platforms" },
  { value: "facebook", label: "Facebook" },
  { value: "instagram", label: "Instagram" },
  { value: "twitter", label: "Twitter/X" },
  { value: "google_business", label: "Google Business" },
];

const STATUSES = [
  { value: "all", label: "All Statuses" },
  { value: "pending", label: "Pending Review" },
  { value: "approved", label: "Approved" },
  { value: "rejected", label: "Rejected" },
  { value: "ready_to_publish", label: "Ready to Publish" },
  { value: "needs_date_review", label: "Needs Date Review" },
  { value: "scheduled", label: "Scheduled" },
  { value: "deleted", label: "Deleted" },
];

const DAYS = Array.from({ length: 31 }, (_, i) => String(i + 1));
const MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export default function StudioFilterBar({ platform, setPlatform, status, setStatus, campaignMonthFilter, setCampaignMonthFilter, campaignMonths, dateFilter, setDateFilter, availableYears }) {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-muted-foreground whitespace-nowrap">Month:</span>
        <Select value={campaignMonthFilter} onValueChange={setCampaignMonthFilter}>
          <SelectTrigger className="w-40 h-9"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Months</SelectItem>
            {campaignMonths.map((m) => (
              <SelectItem key={m} value={m}>{m}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="h-6 w-px bg-border hidden sm:block" />
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-muted-foreground whitespace-nowrap">Date:</span>
        <Select value={dateFilter.day} onValueChange={(v) => setDateFilter((f) => ({ ...f, day: v }))}>
          <SelectTrigger className="w-20 h-9"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Day</SelectItem>
            {DAYS.map((d) => (
              <SelectItem key={d} value={d}>{d}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={dateFilter.month} onValueChange={(v) => setDateFilter((f) => ({ ...f, month: v }))}>
          <SelectTrigger className="w-28 h-9"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Month</SelectItem>
            {MONTH_NAMES.map((m, i) => (
              <SelectItem key={m} value={String(i)}>{m.slice(0, 3)}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={dateFilter.year} onValueChange={(v) => setDateFilter((f) => ({ ...f, year: v }))}>
          <SelectTrigger className="w-24 h-9"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Year</SelectItem>
            {availableYears.map((y) => (
              <SelectItem key={y} value={y}>{y}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="h-6 w-px bg-border hidden sm:block" />
      <div className="flex flex-wrap gap-2">
        {PLATFORMS.map((p) => (
          <Button key={p.value} size="sm" variant={platform === p.value ? "default" : "outline"} onClick={() => setPlatform(p.value)}>
            {p.label}
          </Button>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {STATUSES.map((s) => (
          <Button key={s.value} size="sm" variant={status === s.value ? "secondary" : "ghost"} onClick={() => setStatus(s.value)}>
            {s.label}
          </Button>
        ))}
      </div>
    </div>
  );
}