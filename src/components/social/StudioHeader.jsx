import React from "react";
import { Button } from "@/components/ui/button";
import { Wand2, RefreshCw, Settings, Undo2, Redo2, Loader2 } from "lucide-react";

export default function StudioHeader({
  pendingFeedbackCount,
  onGenerate,
  onProcessFeedback,
  onSettings,
  processing,
  canUndo,
  canRedo,
  onUndo,
  onRedo,
  undoLabel,
  redoLabel,
  historyBusy,
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
      <div>
        <h1 className="text-2xl font-heading font-bold text-foreground">Social Media Studio</h1>
        <p className="text-sm text-muted-foreground">Generate, review, and publish Greenspoint Dental's monthly content.</p>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1 mr-1">
          <Button
            variant="outline"
            size="sm"
            onClick={onUndo}
            disabled={!canUndo || historyBusy}
            title={undoLabel ? `Undo: ${undoLabel}` : "Nothing to undo"}
          >
            {historyBusy ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Undo2 className="w-4 h-4 mr-2" />}
            Undo
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onRedo}
            disabled={!canRedo || historyBusy}
            title={redoLabel ? `Redo: ${redoLabel}` : "Nothing to redo"}
          >
            <Redo2 className="w-4 h-4 mr-2" />
            Redo
          </Button>
        </div>
        <Button variant="outline" size="sm" onClick={onSettings}>
          <Settings className="w-4 h-4 mr-2" />
          Settings
        </Button>
        <Button variant="outline" size="sm" onClick={onProcessFeedback} disabled={processing} className="relative">
          <RefreshCw className={`w-4 h-4 mr-2 ${processing ? "animate-spin" : ""}`} />
          Process Feedback Now
          {pendingFeedbackCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {pendingFeedbackCount}
            </span>
          )}
        </Button>
        <Button size="sm" onClick={onGenerate}>
          <Wand2 className="w-4 h-4 mr-2" />
          Generate Monthly Content
        </Button>
      </div>
    </div>
  );
}