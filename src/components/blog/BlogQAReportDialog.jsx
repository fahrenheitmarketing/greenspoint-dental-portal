import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle, Loader2, ShieldCheck, Wrench } from "lucide-react";

export default function BlogQAReportDialog({ post, open, onOpenChange, report, busy, onAutoFix, onRecheck }) {
  const checks = report?.checks || [];
  const allPassed = report?.allPassed;
  const hasFail = checks.some((c) => c.passed === false);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <ShieldCheck className="w-5 h-5 text-primary" />
            QA Report
          </DialogTitle>
        </DialogHeader>

        {busy && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground py-2">
            <Loader2 className="w-4 h-4 animate-spin" />
            {report ? "Re-checking and correcting failing checks…" : "Running QA checks…"}
          </div>
        )}

        {!busy && report && (
          <div className={`flex items-center gap-2 rounded-lg p-3 mb-4 ${allPassed ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"}`}>
            {allPassed ? <CheckCircle2 className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
            <span className="font-medium">{allPassed ? "All checks passed" : "Some checks failed — auto-fix required"}</span>
          </div>
        )}

        <div className="space-y-2">
          {checks.length === 0 && !busy && (
            <p className="text-sm text-muted-foreground">No QA report yet. Click "Re-check" to run the QA checks.</p>
          )}
          {checks.map((c) => (
            <div key={c.id} className={`flex items-start gap-3 rounded-lg border p-3 ${c.passed ? "border-green-200 bg-green-50/50" : "border-red-200 bg-red-50/50"}`}>
              {c.passed ? (
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              ) : (
                <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm text-foreground">{c.label}</span>
                  <span className={`text-xs font-semibold px-1.5 py-0.5 rounded ${c.passed ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                    {c.passed ? "PASS" : "FAIL"}
                  </span>
                </div>
                {c.detail && <p className="text-xs text-muted-foreground mt-1">{c.detail}</p>}
              </div>
            </div>
          ))}
        </div>

        {report?.runAt && !busy && (
          <p className="text-xs text-muted-foreground pt-2">Last run: {new Date(report.runAt).toLocaleString()}</p>
        )}

        {post && !["approved", "ready_to_publish", "published", "scheduled"].includes(post.status) && (
          <DialogFooter className="gap-2">
            <Button size="sm" variant="outline" disabled={busy} onClick={onRecheck}>
              <ShieldCheck className="w-3.5 h-3.5 mr-1" />
              Re-check
            </Button>
            {hasFail && (
              <Button size="sm" variant="default" disabled={busy} onClick={onAutoFix}>
                <Wrench className="w-3.5 h-3.5 mr-1" />
                Auto-Fix & Re-check
              </Button>
            )}
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}