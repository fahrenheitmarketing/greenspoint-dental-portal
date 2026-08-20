import React from "react";
import { Badge } from "@/components/ui/badge";

const CONFIG = {
  draft: { label: "Draft", variant: "outline" },
  pending: { label: "Pending Review", variant: "secondary" },
  approved: { label: "Approved", variant: "default" },
  rejected: { label: "Rejected", variant: "destructive" },
  needs_revision: { label: "Needs Revision", variant: "default", className: "bg-amber-500 hover:bg-amber-600" },
  ready_to_publish: { label: "Ready to Publish", variant: "default", className: "bg-primary" },
  scheduled: { label: "Scheduled", variant: "secondary" },
  published: { label: "Published", variant: "default", className: "bg-green-600 hover:bg-green-700" },
};

export default function BlogStatusBadge({ status }) {
  const cfg = CONFIG[status] || CONFIG.draft;
  return <Badge variant={cfg.variant} className={cfg.className}>{cfg.label}</Badge>;
}