import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

export default function ProcessFeedbackDialog({ open, onOpenChange, onProcess, processing }) {
  const [taskUrl, setTaskUrl] = useState("");
  const [error, setError] = useState("");

  const validate = (url) => {
    if (!url.trim()) return "Please paste a ClickUp task URL.";
    try {
      const u = new URL(url);
      if (!u.hostname.includes("clickup.com")) return "URL must be a ClickUp task link.";
    } catch {
      return "That doesn't look like a valid URL.";
    }
    return "";
  };

  const handleProcess = () => {
    const err = validate(taskUrl);
    if (err) {
      setError(err);
      return;
    }
    setError("");
    onProcess(taskUrl.trim());
  };

  const handleOpenChange = (val) => {
    if (!val) {
      setTaskUrl("");
      setError("");
    }
    onOpenChange(val);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Process Feedback</DialogTitle>
        </DialogHeader>
        <div className="space-y-2 py-2">
          <Label htmlFor="feedback-task-url">ClickUp task URL</Label>
          <Input
            id="feedback-task-url"
            type="url"
            placeholder="https://app.clickup.com/t/..."
            value={taskUrl}
            onChange={(e) => {
              setTaskUrl(e.target.value);
              if (error) setError("");
            }}
          />
          {error && <p className="text-xs text-destructive">{error}</p>}
          <p className="text-xs text-muted-foreground">
            Paste the ClickUp task link. Feedback comments on that task will be processed.
          </p>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => handleOpenChange(false)}>Cancel</Button>
          <Button onClick={handleProcess} disabled={processing}>
            {processing && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            Process
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}