import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle2, AlertTriangle, XCircle, RefreshCw, Sparkles } from "lucide-react";

const ICONS = { pass: CheckCircle2, warn: AlertTriangle, fail: XCircle };
const COLORS = { pass: "text-emerald-600", warn: "text-amber-500", fail: "text-red-500" };
const ACTIONS = { brand: "Open Brand Setup", settings: "Open Settings" };

function CheckRow({ item, onAction }) {
  const Icon = ICONS[item.status] || XCircle;
  return (
    <div className="flex items-start justify-between gap-3 py-2.5 border-b border-border last:border-b-0">
      <div className="flex items-start gap-2.5 min-w-0">
        <Icon className={`w-4 h-4 mt-0.5 shrink-0 ${COLORS[item.status] || ""}`} />
        <div className="min-w-0">
          <p className="text-sm font-medium text-foreground">{item.label}</p>
          <p className="text-xs text-muted-foreground mt-0.5">{item.detail}</p>
        </div>
      </div>
      {item.status !== "pass" && item.action && (
        <Button size="sm" variant="outline" className="shrink-0" onClick={() => onAction(item.action)}>
          {ACTIONS[item.action]}
        </Button>
      )}
    </div>
  );
}

export default function SetupWizard({ open, onOpenChange, check, rechecking, onRecheck, onOpenBrandSetup, onOpenSettings }) {
  const handleAction = (action) => {
    if (action === "brand") onOpenBrandSetup();
    else if (action === "settings") onOpenSettings();
  };

  const ready = check?.ready;
  const checks = check?.checks || [];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-secondary" />
            Social Studio Setup
          </DialogTitle>
          <DialogDescription>
            {ready
              ? "Everything is configured. The studio is ready to go."
              : "Finish these steps to get the studio fully operational. Warnings are optional but recommended."}
          </DialogDescription>
        </DialogHeader>

        {!check ? (
          <div className="flex items-center justify-center py-10 text-muted-foreground">
            <Loader2 className="w-5 h-5 animate-spin mr-2" /> Checking your setup…
          </div>
        ) : (
          <div className="max-h-[55vh] overflow-y-auto pr-1">
            {checks.map((item) => (
              <CheckRow key={item.id} item={item} onAction={handleAction} />
            ))}
          </div>
        )}

        <DialogFooter className="sm:justify-between gap-2">
          <Button variant="ghost" onClick={onRecheck} disabled={rechecking}>
            {rechecking ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
            Re-check
          </Button>
          <Button onClick={() => onOpenChange(false)}>{ready ? "Start creating" : "Continue to Studio"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}