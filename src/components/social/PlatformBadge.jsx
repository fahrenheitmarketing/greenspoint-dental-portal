import React from "react";
import { Facebook, Instagram, Twitter, MapPin } from "lucide-react";

const CONFIG = {
  facebook: { label: "Facebook", icon: Facebook, classes: "bg-blue-600 text-white" },
  instagram: { label: "Instagram", icon: Instagram, classes: "bg-gradient-to-tr from-purple-600 via-pink-600 to-orange-400 text-white" },
  twitter: { label: "Twitter/X", icon: Twitter, classes: "bg-gray-900 text-white" },
  google_business: { label: "Google Business", icon: MapPin, classes: "bg-gradient-to-r from-blue-500 via-red-500 to-yellow-500 text-white" },
};

export default function PlatformBadge({ platform }) {
  const cfg = CONFIG[platform] || CONFIG.facebook;
  const Icon = cfg.icon;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${cfg.classes}`}>
      <Icon className="w-3.5 h-3.5" />
      {cfg.label}
    </span>
  );
}