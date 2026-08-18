import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function FixDateDialog({ post, open, onOpenChange, onConfirm }) {
  const [date, setDate] = useState("");

  useEffect(() => {
    if (open && post?.scheduled_date) {
      const d = new Date(post.scheduled_date);
      d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
      setDate(d.toISOString().slice(0, 16));
    }
  }, [post, open]);

  const handleConfirm = () => {
    if (!date) return;
    onConfirm(new Date(date).toISOString());
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Fix Date &amp; Reschedule</DialogTitle>
        </DialogHeader>
        <div className="space-y-2 py-2">
          <Label htmlFor="fix-date">New scheduled date</Label>
          <Input id="fix-date" type="datetime-local" value={date} onChange={(e) => setDate(e.target.value)} />
          <p className="text-xs text-muted-foreground">Times are in your local timezone.</p>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleConfirm} disabled={!date}>Reschedule</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}