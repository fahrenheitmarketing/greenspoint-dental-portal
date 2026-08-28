import { createClientFromRequest } from "npm:@base44/sdk@0.8.40";
import { runAllChecks, fixEmDashes, llmAutoFix, trimToWordCount, countWords } from "../../shared/blogQA.ts";

// Performs ONE auto-fix pass: evaluate, apply programmatic + LLM corrections
// for the failing checks, then re-run all checks. The frontend drives repeated
// calls until allPassed (or a max number of attempts) so each invocation stays
// well within the function timeout.
export default async function (req) {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user || user.role !== "admin") {
      return Response.json({ error: "Admin access required" }, { status: 403 });
    }

    const { postId } = await req.json();
    if (!postId) {
      return Response.json({ error: "postId is required" }, { status: 400 });
    }

    let post = await base44.asServiceRole.entities.BlogStudioPost.get(postId);
    let report = await runAllChecks(base44, post);

    if (report.allPassed) {
      await base44.asServiceRole.entities.BlogStudioPost.update(postId, { qa_report: report });
      return Response.json({ report, allPassed: true, message: "All QA checks already passed.", changedFields: [] });
    }

    const failing = report.checks.filter((c) => !c.passed).map((c) => c.id);
    const updates = {};
    const changedFields = [];

    // 1. Programmatic fix for em dashes.
    const dashFixed = fixEmDashes(post);
    if (dashFixed.title !== post.title) { updates.title = dashFixed.title; changedFields.push("title"); }
    if (dashFixed.meta_title !== post.meta_title) { updates.meta_title = dashFixed.meta_title; changedFields.push("meta_title"); }
    if (dashFixed.meta_description !== post.meta_description) { updates.meta_description = dashFixed.meta_description; changedFields.push("meta_description"); }
    if (dashFixed.content !== post.content) { updates.content = dashFixed.content; changedFields.push("content"); }

    // 2. LLM fix for the remaining failing checks (em dashes already handled).
    const remainingFailing = failing.filter((id) => id !== "no_em_dashes");
    if (remainingFailing.length > 0) {
      const llmRes = await llmAutoFix(base44, post, remainingFailing);
      if (llmRes?.title) { updates.title = llmRes.title; changedFields.push("title"); }
      if (llmRes?.meta_title) { updates.meta_title = llmRes.meta_title; changedFields.push("meta_title"); }
      if (llmRes?.meta_description) { updates.meta_description = llmRes.meta_description; changedFields.push("meta_description"); }
      if (llmRes?.content) { updates.content = llmRes.content; changedFields.push("content"); }
      if (llmRes?.ctas) { updates.ctas = llmRes.ctas; changedFields.push("ctas"); }
    }

    if (Object.keys(updates).length > 0) {
      await base44.asServiceRole.entities.BlogStudioPost.update(postId, updates);
      post = { ...post, ...updates };
    }

    // Deterministic trim if content is still over the word-count limit (LLM
    // can't count words reliably; this guarantees the over-length case converges).
    const finalContent = updates.content || post.content;
    if (countWords(finalContent) > 1300) {
      const trimmed = trimToWordCount(finalContent, 1250);
      if (trimmed !== finalContent) {
        await base44.asServiceRole.entities.BlogStudioPost.update(postId, { content: trimmed });
        post = { ...post, content: trimmed };
        if (!changedFields.includes("content")) changedFields.push("content");
      }
    }

    // Re-run all checks after the fixes.
    report = await runAllChecks(base44, post);
    await base44.asServiceRole.entities.BlogStudioPost.update(postId, { qa_report: report });

    return Response.json({
      report,
      allPassed: report.allPassed,
      changedFields: [...new Set(changedFields)],
      message: report.allPassed
        ? "All QA checks passed."
        : "Some checks still failing after this pass. Run Auto-Fix again to continue correcting.",
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}