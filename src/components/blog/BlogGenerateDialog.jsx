import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Wand2 } from "lucide-react";

const MONTHS = Array.from({ length: 12 }, (_, i) => ({ value: i + 1, label: new Date(2000, i, 1).toLocaleString("en-US", { month: "long" }) }));
const CATEGORIES = [
  { value: "dental-health", label: "Dental Health" },
  { value: "general-dentistry", label: "General Dentistry" },
  { value: "cosmetic-dentistry", label: "Cosmetic Dentistry" },
  { value: "restorative-dentistry", label: "Restorative Dentistry" },
  { value: "orthodontics", label: "Orthodontics" },
  { value: "family-dental", label: "Family Dental" },
  { value: "insurance-financing", label: "Insurance & Financing" },
  { value: "smile-confidence", label: "Smile Confidence" },
  { value: "affordable-dentistry", label: "Affordable Dentistry" },
  { value: "community", label: "Community" },
];

export default function BlogGenerateDialog({ open, onOpenChange, onGenerated, runAction }) {
  const now = new Date();
  const [month, setMonth] = useState(now.getMonth() + 1);
  const [year, setYear] = useState(now.getFullYear());
  const [category, setCategory] = useState("dental-health");
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const campaignMonth = `${MONTHS[month - 1].label} ${year}`;

  const handleGenerate = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await runAction("Generate Blog Post", () =>
        base44.functions.invoke("generateBlogPost", { topic: topic.trim() || undefined, category, campaignMonth })
      );
      onGenerated(res.data || res);
      onOpenChange(false);
      setTopic("");
    } catch (e) {
      setError(e?.response?.data?.error || e.message || "Failed to generate blog post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Generate Blog Post</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div className="flex gap-3">
            <Select value={String(month)} onValueChange={(v) => setMonth(Number(v))}>
              <SelectTrigger className="flex-1"><SelectValue /></SelectTrigger>
              <SelectContent>
                {MONTHS.map((m) => <SelectItem key={m.value} value={String(m.value)}>{m.label}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={String(year)} onValueChange={(v) => setYear(Number(v))}>
              <SelectTrigger className="w-28"><SelectValue /></SelectTrigger>
              <SelectContent>
                {[now.getFullYear(), now.getFullYear() + 1].map((y) => <SelectItem key={y} value={String(y)}>{y}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((c) => <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Topic (optional)</Label>
            <Input className="mt-1" placeholder="e.g. 5 foods that support healthy teeth" value={topic} onChange={(e) => setTopic(e.target.value)} />
            <p className="text-xs text-muted-foreground mt-1">Leave blank to let the AI pick a fresh topic based on the category.</p>
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
        </div>
        <DialogFooter>
          <Button onClick={handleGenerate} disabled={loading}>
            {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Wand2 className="w-4 h-4 mr-2" />}
            Generate
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}