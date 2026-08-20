import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import BlogStatusBadge from "./BlogStatusBadge";

export default function BlogDetailDialog({ post, open, onOpenChange, onSaveField }) {
  const [editing, setEditing] = useState(null);
  const [draft, setDraft] = useState("");

  if (!post) return null;

  const startEdit = (field, value) => {
    setEditing(field);
    setDraft(value || "");
  };

  const saveEdit = () => {
    if (editing && draft !== (post[editing] || "")) {
      onSaveField(editing, draft);
    }
    setEditing(null);
  };

  const renderField = (field, label, multiline = false) => {
    const value = post[field];
    if (editing === field) {
      return (
        <div className="space-y-2">
          {multiline ? (
            <Textarea rows={12} value={draft} onChange={(e) => setDraft(e.target.value)} className="font-mono text-xs" />
          ) : (
            <Input value={draft} onChange={(e) => setDraft(e.target.value)} />
          )}
          <div className="flex gap-2">
            <button className="text-xs text-primary hover:underline" onClick={saveEdit}>Save</button>
            <button className="text-xs text-muted-foreground hover:underline" onClick={() => setEditing(null)}>Cancel</button>
          </div>
        </div>
      );
    }
    return (
      <div onClick={() => startEdit(field, value)} className="cursor-pointer hover:bg-muted/50 rounded p-2 -m-2 transition-colors">
        {multiline ? (
          <div className="text-xs text-foreground/80 whitespace-pre-wrap font-mono max-h-64 overflow-y-auto">{value || "Not set — click to edit"}</div>
        ) : (
          <p className="text-sm text-foreground">{value || "Not set — click to edit"}</p>
        )}
      </div>
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">{post.title}</DialogTitle>
        </DialogHeader>

        <div className="flex flex-wrap items-center gap-2 mb-4">
          <BlogStatusBadge status={post.status} />
          <Badge variant="outline">{post.category}</Badge>
          {post.seo_score != null && <Badge variant="outline">SEO: {post.seo_score}/100</Badge>}
          {post.read_time && <Badge variant="outline">{post.read_time} min read</Badge>}
          {post.campaign_month && <Badge variant="outline">{post.campaign_month}</Badge>}
        </div>

        <Tabs defaultValue="en">
          <TabsList>
            <TabsTrigger value="en">English</TabsTrigger>
            <TabsTrigger value="es">Spanish</TabsTrigger>
            <TabsTrigger value="seo">SEO & Meta</TabsTrigger>
            <TabsTrigger value="links">Links & CTAs</TabsTrigger>
          </TabsList>

          <TabsContent value="en" className="space-y-4 mt-4">
            <div>
              <Label className="text-xs text-muted-foreground">Title (EN)</Label>
              {renderField("title", "Title")}
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Excerpt (EN)</Label>
              {renderField("excerpt", "Excerpt")}
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Content (EN) — HTML</Label>
              {renderField("content", "Content", true)}
            </div>
          </TabsContent>

          <TabsContent value="es" className="space-y-4 mt-4">
            <div>
              <Label className="text-xs text-muted-foreground">Title (ES)</Label>
              {renderField("title_es", "Title ES")}
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Excerpt (ES)</Label>
              {renderField("excerpt_es", "Excerpt ES")}
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Content (ES) — HTML</Label>
              {renderField("content_es", "Content ES", true)}
            </div>
          </TabsContent>

          <TabsContent value="seo" className="space-y-4 mt-4">
            <div>
              <Label className="text-xs text-muted-foreground">Slug</Label>
              {renderField("slug", "Slug")}
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Meta Title (EN) — {post.meta_title?.length || 0} chars</Label>
              {renderField("meta_title", "Meta Title")}
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Meta Description (EN) — {post.meta_description?.length || 0} chars</Label>
              {renderField("meta_description", "Meta Description")}
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Meta Title (ES) — {post.meta_title_es?.length || 0} chars</Label>
              {renderField("meta_title_es", "Meta Title ES")}
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Meta Description (ES) — {post.meta_description_es?.length || 0} chars</Label>
              {renderField("meta_description_es", "Meta Description ES")}
            </div>
          </TabsContent>

          <TabsContent value="links" className="space-y-4 mt-4">
            <div>
              <Label className="text-xs text-muted-foreground">Internal Links</Label>
              <div className="space-y-1 mt-1">
                {(post.internal_links || []).length === 0 ? (
                  <p className="text-sm text-muted-foreground">None</p>
                ) : (
                  (post.internal_links || []).map((l, i) => (
                    <div key={i} className="text-sm text-foreground">
                      <strong>{l.anchor_text}</strong> → <code className="text-xs">{l.page_path}</code>
                    </div>
                  ))
                )}
              </div>
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">External Links</Label>
              <div className="space-y-1 mt-1">
                {(post.external_links || []).length === 0 ? (
                  <p className="text-sm text-muted-foreground">None</p>
                ) : (
                  (post.external_links || []).map((l, i) => (
                    <div key={i} className="text-sm text-foreground">
                      <strong>{l.anchor_text}</strong> → <a href={l.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline text-xs">{l.url}</a>
                    </div>
                  ))
                )}
              </div>
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Call-to-Actions</Label>
              <div className="space-y-1 mt-1">
                {(post.ctas || []).length === 0 ? (
                  <p className="text-sm text-muted-foreground">None</p>
                ) : (
                  (post.ctas || []).map((c, i) => (
                    <div key={i} className="text-sm text-foreground">
                      <strong>{c.label}</strong> → <code className="text-xs">{c.page_path}</code>
                    </div>
                  ))
                )}
              </div>
            </div>
            {post.image_prompt && (
              <div>
                <Label className="text-xs text-muted-foreground">Image Prompt</Label>
                <p className="text-xs text-muted-foreground mt-1">{post.image_prompt}</p>
              </div>
            )}
          </TabsContent>
        </Tabs>

        {post.wp_url_en && (
          <div className="mt-4 pt-4 border-t border-border">
            <Label className="text-xs text-muted-foreground">WordPress</Label>
            <div className="flex gap-4 mt-1">
              {post.wp_url_en && <a href={post.wp_url_en} target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline">EN: {post.wp_url_en}</a>}
              {post.wp_url_es && <a href={post.wp_url_es} target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline">ES: {post.wp_url_es}</a>}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}