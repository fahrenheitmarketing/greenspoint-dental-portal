import React from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const CATEGORIES = [
  { value: "all", label: "All Categories" },
  { value: "general-dentistry", label: "General Dentistry" },
  { value: "cosmetic-dentistry", label: "Cosmetic Dentistry" },
  { value: "restorative-dentistry", label: "Restorative Dentistry" },
  { value: "orthodontics", label: "Orthodontics" },
  { value: "family-dental", label: "Family Dental" },
  { value: "insurance-financing", label: "Insurance & Financing" },
  { value: "dental-health", label: "Dental Health" },
  { value: "smile-confidence", label: "Smile Confidence" },
  { value: "affordable-dentistry", label: "Affordable Dentistry" },
  { value: "community", label: "Community" },
];

const STATUSES = [
  { value: "all", label: "All Statuses" },
  { value: "draft", label: "Draft" },
  { value: "pending", label: "Pending Review" },
  { value: "approved", label: "Approved" },
  { value: "rejected", label: "Rejected" },
  { value: "needs_revision", label: "Needs Revision" },
  { value: "ready_to_publish", label: "Ready to Publish" },
  { value: "scheduled", label: "Scheduled" },
  { value: "published", label: "Published" },
];

export default function BlogStudioFilterBar({ category, setCategory, status, setStatus, campaignMonthFilter, setCampaignMonthFilter, campaignMonths }) {
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
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map((c) => (
          <Button key={c.value} size="sm" variant={category === c.value ? "default" : "outline"} onClick={() => setCategory(c.value)}>
            {c.label}
          </Button>
        ))}
      </div>
      <div className="h-6 w-px bg-border hidden sm:block" />
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