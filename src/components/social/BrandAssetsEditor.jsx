import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2, Trash2, Upload } from "lucide-react";

// Editor for the brand_assets array on BrandProfile.
// Each asset is an uploaded image + a label + instructions on how to use it as an overlay.
export default function BrandAssetsEditor({ assets, onChange }) {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const { file_url } = await base44.integrations.Core.UploadFile({ file });
      onChange([...(assets || []), { file_url, label: "", instructions: "" }]);
    } finally {
      setUploading(false);
      if (e.target) e.target.value = "";
    }
  };

  const updateAsset = (i, field, value) => {
    const next = [...(assets || [])];
    next[i] = { ...next[i], [field]: value };
    onChange(next);
  };

  const removeAsset = (i) => {
    onChange((assets || []).filter((_, idx) => idx !== i));
  };

  return (
    <div className="space-y-3">
      <label className="inline-flex items-center gap-2 rounded-md border border-input bg-transparent px-3 py-2 text-sm font-medium cursor-pointer hover:bg-muted">
        <input
          type="file"
          accept="image/*"
          onChange={handleUpload}
          className="hidden"
          disabled={uploading}
        />
        {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
        {uploading ? "Uploading..." : "Upload Image"}
      </label>

      {(assets || []).length === 0 && (
        <p className="text-xs text-muted-foreground">No brand images added yet.</p>
      )}

      {(assets || []).map((asset, i) => (
        <div key={i} className="flex gap-3 rounded-md border p-3 bg-card">
          <img
            src={asset.file_url}
            alt={asset.label || "Brand asset"}
            className="w-20 h-20 rounded-md object-cover border bg-muted shrink-0"
          />
          <div className="flex-1 space-y-2">
            <div>
              <Label htmlFor={`asset-label-${i}`} className="text-xs">Label (what this image is)</Label>
              <Input
                id={`asset-label-${i}`}
                value={asset.label || ""}
                onChange={(e) => updateAsset(i, "label", e.target.value)}
                placeholder="e.g. Primary logo, Corner badge"
                className="h-8"
              />
            </div>
            <div>
              <Label htmlFor={`asset-instr-${i}`} className="text-xs">Instructions (how to use it)</Label>
              <Textarea
                id={`asset-instr-${i}`}
                rows={2}
                value={asset.instructions || ""}
                onChange={(e) => updateAsset(i, "instructions", e.target.value)}
                placeholder="e.g. Place in bottom-right corner at 20% width, keep above captions"
              />
            </div>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="shrink-0 text-muted-foreground hover:text-destructive"
            onClick={() => removeAsset(i)}
            aria-label="Remove asset"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      ))}
    </div>
  );
}