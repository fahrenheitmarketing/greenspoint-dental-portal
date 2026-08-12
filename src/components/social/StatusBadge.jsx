import React from "react";
import { Badge } from "@/components/ui/badge";

const CONFIG = {
  draft: { label: "Draft", variant: "outline" },
  pending: { label: "Pending Review", variant: "secondary" },
  approved: { label: "Approved", variant: "default" },
  rejected: { label: "Rejected", variant: "destructive" },
  ready_to_publish: { label: "Ready to Publish", variant: "default" },
  scheduled: { label: "Scheduled", variant: "secondary" },
  published: { label: "Published", variant: "default" },
};

export default function StatusBadge({ status }) {
  const cfg = CONFIG[status] || CONFIG.draft;
  return <Badge variant={cfg.variant}>{cfg.label}</Badge>;
}