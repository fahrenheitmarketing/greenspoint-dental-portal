import React from "react";
import { Button } from "@/components/ui/button";

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
];

export default function StudioFilterBar({ platform, setPlatform, status, setStatus }) {
  return (
    <div className="flex flex-wrap gap-4">
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