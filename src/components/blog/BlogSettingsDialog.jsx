import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";

export default function BlogSettingsDialog({ open, onOpenChange }) {
  const [settings, setSettings] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (open) {
      base44.entities.BlogStudioSettings.list().then((list) => {
        setSettings(list[0] || {
          clickup_list_id: "",
          clickup_workspace_id: "",
          clickup_brand_doc_url: "",
          brand_guide_text: "",
          wp_site_url: "",
          wp_author_id: "",
          default_category_slug: "dental-health",
        });
      });
    }
  }, [open]);

  const handleSave = async () => {
    setSaving(true);
    try {
      if (settings.id) {
        await base44.entities.BlogStudioSettings.update(settings.id, settings);
      } else {
        await base44.entities.BlogStudioSettings.create(settings);
      }
      onOpenChange(false);
    } finally {
      setSaving(false);
    }
  };

  if (!settings) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader><DialogTitle>Blog Studio Settings</DialogTitle></DialogHeader>
        <div className="space-y-4 py-2 max-h-[70vh] overflow-y-auto pr-1">
          <div>
            <Label>ClickUp List ID *</Label>
            <Input value={settings.clickup_list_id} onChange={(e) => setSettings({ ...settings, clickup_list_id: e.target.value })} placeholder="e.g. 901234567" />
            <p className="text-[11px] text-muted-foreground mt-1">The ClickUp list where blog post review tasks are created.</p>
          </div>
          <div className="space-y-3">
            <div>
              <Label className="text-xs">Workspace ID</Label>
              <Input value={settings.clickup_workspace_id || ""} onChange={(e) => setSettings({ ...settings, clickup_workspace_id: e.target.value })} />
            </div>
            <div>
              <Label className="text-xs">Brand Guide Doc URL</Label>
              <Input value={settings.clickup_brand_doc_url || ""} onChange={(e) => setSettings({ ...settings, clickup_brand_doc_url: e.target.value })} placeholder="https://app.clickup.com/.../docs/..." />
            </div>
          </div>
          <div>
            <Label>Brand Reference Guide (fallback text)</Label>
            <Textarea rows={4} value={settings.brand_guide_text} onChange={(e) => setSettings({ ...settings, brand_guide_text: e.target.value })} placeholder="Paste the brand guide here if you don't want to link a ClickUp doc" />
          </div>
          <div className="border-t border-border pt-4">
            <h4 className="text-sm font-semibold mb-3 text-foreground">WordPress Settings</h4>
            <div className="space-y-3">
              <div>
                <Label className="text-xs">WordPress Site URL</Label>
                <Input value={settings.wp_site_url || ""} onChange={(e) => setSettings({ ...settings, wp_site_url: e.target.value })} placeholder="https://greenspointdental.com" />
              </div>
              <div>
                <Label className="text-xs">Default Category Slug</Label>
                <Input value={settings.default_category_slug || ""} onChange={(e) => setSettings({ ...settings, default_category_slug: e.target.value })} placeholder="dental-health" />
              </div>
            </div>
            <p className="text-[11px] text-muted-foreground mt-2">Publishing to WordPress is handled via the WordPress MCP connection (GP Production WordPress). No API credentials needed.</p>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSave} disabled={saving || !settings.clickup_list_id}>
            {saving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            Save Settings
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}