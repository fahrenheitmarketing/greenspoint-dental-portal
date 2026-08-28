import { createClientFromRequest } from "npm:@base44/sdk@0.8.40";
import { runAllChecks } from "../../shared/blogQA.ts";

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

    const post = await base44.asServiceRole.entities.BlogStudioPost.get(postId);
    const report = await runAllChecks(base44, post);

    await base44.asServiceRole.entities.BlogStudioPost.update(postId, { qa_report: report });

    return Response.json({ report });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}