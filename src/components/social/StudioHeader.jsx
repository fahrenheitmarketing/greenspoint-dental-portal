import React from "react";
import { Button } from "@/components/ui/button";
import { Wand2, RefreshCw, Settings } from "lucide-react";

export default function StudioHeader({ pendingFeedbackCount, onGenerate, onProcessFeedback, onSettings, processing }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
      <div>
        <h1 className="text-2xl font-heading font-bold text-foreground">Social Media Studio</h1>
        <p className="text-sm text-muted-foreground">Generate, review, and publish Greenspoint Dental's monthly content.</p>
      </div>
      <div className="flex items-center gap-2">
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