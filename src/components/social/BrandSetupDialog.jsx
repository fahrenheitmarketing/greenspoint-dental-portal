import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";
import BrandAssetsEditor from "./BrandAssetsEditor";

const FIELDS = [
  { key: "product_description", label: "Product / Service Description", rows: 4, placeholder: "What your practice offers, in plain language" },
  { key: "target_audience", label: "Target Audience", rows: 4, placeholder: "Who you're speaking to — demographics, location, needs" },
  { key: "voice_guidelines", label: "Voice Guidelines", rows: 4, placeholder: "Tone, personality, and style rules for your brand voice" },
  { key: "product_facts", label: "Product Facts", rows: 5, placeholder: "Key facts, features, pricing, and differentiators" },
  { key: "banned_claims", label: "Banned Claims", rows: 4, placeholder: "Claims or phrases that must never appear in content" },
  { key: "internal_links", label: "Internal Links", rows: 4, placeholder: "Site pages and anchor text to use for internal linking" },
  { key: "style_examples", label: "Style Examples", rows: 6, placeholder: "Sample copy or reference posts that capture the desired style" },
];

export default function BrandSetupDialog({ open, onOpenChange }) {
  const [profile, setProfile] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (open) {
      base44.entities.BrandProfile.list().then((list) => {
        setProfile(list[0] || { company_name: "", product_description: "", target_audience: "", voice_guidelines: "", product_facts: "", banned_claims: "", internal_links: "", style_examples: "" });
      });
    }
  }, [open]);

  const handleSave = async () => {
    setSaving(true);
    try {
      if (profile.id) {
        await base44.entities.BrandProfile.update(profile.id, profile);
      } else {
        await base44.entities.BrandProfile.create(profile);
      }
      onOpenChange(false);
    } finally {
      setSaving(false);
    }
  };

  if (!profile) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader><DialogTitle>Brand Setup</DialogTitle></DialogHeader>
        <div className="space-y-4 py-2 max-h-[70vh] overflow-y-auto pr-1">
          <div>
            <Label htmlFor="brand-company-name">Company Name</Label>
            <Input id="brand-company-name" value={profile.company_name || ""} onChange={(e) => setProfile({ ...profile, company_name: e.target.value })} placeholder="e.g. Greenspoint Dental" />
          </div>
          {FIELDS.map((f) => (
            <div key={f.key}>
              <Label htmlFor={`brand-${f.key}`}>{f.label}</Label>
              <Textarea id={`brand-${f.key}`} rows={f.rows} value={profile[f.key] || ""} onChange={(e) => setProfile({ ...profile, [f.key]: e.target.value })} placeholder={f.placeholder} />
            </div>
          ))}

          <div className="pt-4 border-t mt-4">
            <h3 className="text-sm font-semibold mb-1">Brand Images &amp; Overlays</h3>
            <p className="text-xs text-muted-foreground mb-3">
              Upload logos, badges, or overlay images and describe how each should be used. These are applied as overlays when a post reaches the approved step.
            </p>
            <BrandAssetsEditor
              assets={profile.brand_assets || []}
              onChange={(brand_assets) => setProfile({ ...profile, brand_assets })}
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSave} disabled={saving || !profile.company_name}>
            {saving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            Save Brand Setup
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}