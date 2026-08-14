import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";

export default function SettingsDialog({ open, onOpenChange }) {
  const [settings, setSettings] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (open) {
      base44.entities.SocialMediaSettings.list().then((list) => {
        setSettings(list[0] || { clickup_list_id: "", clickup_workspace_id: "", clickup_doc_id: "", clickup_doc_page_id: "", brand_guide_text: "", postiz_facebook_id: "", postiz_instagram_id: "", postiz_x_id: "", postiz_gmb_id: "" });
      });
    }
  }, [open]);

  const handleSave = async () => {
    setSaving(true);
    try {
      if (settings.id) {
        await base44.entities.SocialMediaSettings.update(settings.id, settings);
      } else {
        await base44.entities.SocialMediaSettings.create(settings);
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
        <DialogHeader><DialogTitle>Social Media Studio Settings</DialogTitle></DialogHeader>
        <div className="space-y-4 py-2">
          <div>
            <Label>ClickUp List ID *</Label>
            <Input value={settings.clickup_list_id} onChange={(e) => setSettings({ ...settings, clickup_list_id: e.target.value })} placeholder="e.g. 901234567" />
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div>
              <Label className="text-xs">Workspace ID</Label>
              <Input value={settings.clickup_workspace_id} onChange={(e) => setSettings({ ...settings, clickup_workspace_id: e.target.value })} />
            </div>
            <div>
              <Label className="text-xs">Brand Doc ID</Label>
              <Input value={settings.clickup_doc_id} onChange={(e) => setSettings({ ...settings, clickup_doc_id: e.target.value })} />
            </div>
            <div>
              <Label className="text-xs">Doc Page ID</Label>
              <Input value={settings.clickup_doc_page_id} onChange={(e) => setSettings({ ...settings, clickup_doc_page_id: e.target.value })} />
            </div>
          </div>
          <div>
            <Label>Brand Reference Guide (fallback text)</Label>
            <Textarea rows={5} value={settings.brand_guide_text} onChange={(e) => setSettings({ ...settings, brand_guide_text: e.target.value })} placeholder="Paste the brand guide here if you don't want to link a ClickUp doc" />
          </div>
          <div className="border-t border-border pt-4">
            <h4 className="text-sm font-semibold mb-3 text-foreground">Postiz Integration IDs</h4>
            <p className="text-xs text-muted-foreground mb-3">Find these in the Postiz app under Settings → Integrations. Each platform needs its own integration ID.</p>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs">Facebook</Label>
                <Input value={settings.postiz_facebook_id || ""} onChange={(e) => setSettings({ ...settings, postiz_facebook_id: e.target.value })} placeholder="cmp..." />
              </div>
              <div>
                <Label className="text-xs">Instagram</Label>
                <Input value={settings.postiz_instagram_id || ""} onChange={(e) => setSettings({ ...settings, postiz_instagram_id: e.target.value })} placeholder="cmp..." />
              </div>
              <div>
                <Label className="text-xs">X (Twitter)</Label>
                <Input value={settings.postiz_x_id || ""} onChange={(e) => setSettings({ ...settings, postiz_x_id: e.target.value })} placeholder="cmp..." />
              </div>
              <div>
                <Label className="text-xs">Google Business</Label>
                <Input value={settings.postiz_gmb_id || ""} onChange={(e) => setSettings({ ...settings, postiz_gmb_id: e.target.value })} placeholder="cmp..." />
              </div>
            </div>
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