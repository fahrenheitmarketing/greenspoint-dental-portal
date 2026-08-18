import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Save, Check } from "lucide-react";

export default function InlineEditableField({ postId, field, value, label, rows = 6, placeholder = "", onSave }) {
  const [text, setText] = useState(value || "");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setText(value || "");
    setSaved(false);
  }, [postId, value]);

  const dirty = text !== (value || "");

  const handleSave = async () => {
    setSaving(true);
    try {
      await onSave(field, text);
      setSaved(true);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{label}</h3>
        <div className="flex items-center gap-2">
          {saved && !dirty && (
            <span className="text-xs text-green-600 flex items-center gap-1"><Check className="w-3 h-3" /> Saved</span>
          )}
          <Button size="sm" variant="outline" disabled={saving || !dirty} onClick={handleSave}>
            {saving ? <Loader2 className="w-3.5 h-3.5 mr-1 animate-spin" /> : <Save className="w-3.5 h-3.5 mr-1" />}
            Save
          </Button>
        </div>
      </div>
      <Textarea
        value={text}
        onChange={(e) => { setText(e.target.value); setSaved(false); }}
        rows={rows}
        placeholder={placeholder}
        className="leading-relaxed"
      />
    </div>
  );
}