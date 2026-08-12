import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';
import { getClickUpComments, addClickUpComment, getBrandGuideText } from '../../shared/clickup.ts';

const CLASSIFY_SCHEMA = {
  type: 'object',
  properties: {
    action: { type: 'string', enum: ['approve_publish', 'approve_schedule', 'edit_copy', 'edit_image', 'no_action'] },
    notes: { type: 'string' },
    revised_copy: { type: 'string' },
    image_instruction: { type: 'string' },
  },
  required: ['action', 'notes'],
};

export default async function (req) {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user || user.role !== 'admin') {
      return Response.json({ error: 'Admin access required' }, { status: 403 });
    }

    const settingsList = await base44.asServiceRole.entities.SocialMediaSettings.list();
    const brandGuide = settingsList[0] ? await getBrandGuideText(base44, settingsList[0]) : '';

    const posts = await base44.asServiceRole.entities.SocialPost.filter({});
    const relevant = posts.filter((p) => p.clickup_task_id && !['published', 'scheduled'].includes(p.status));

    let processedCount = 0;
    const summaries = [];

    for (const post of relevant) {
      const comments = await getClickUpComments(base44, post.clickup_task_id);
      const alreadyProcessed = new Set(post.processed_comment_ids || []);
      const newComments = comments.filter((c) => !alreadyProcessed.has(c.id) && c.comment_text);

      if (newComments.length === 0) continue;

      const actionsTaken = [];
      const newProcessedIds = [...(post.processed_comment_ids || [])];
      let updatedContent = post.content;
      let updatedStatus = post.status;

      for (const comment of newComments) {
        const classification = await base44.asServiceRole.integrations.Core.InvokeLLM({
          prompt: `A client left this comment on a social media post approval task: "${comment.comment_text}"

Current post platform: ${post.platform}
Current post copy: ${updatedContent}
Brand guide: ${brandGuide}

Classify the comment's intent and respond accordingly:
- "approve_publish": comment says something like "Approved for Publish"
- "approve_schedule": comment says something like "Approved for Schedule"
- "edit_copy": comment asks to change the wording/copy - provide the full revised_copy
- "edit_image": comment asks for a different/new image - provide image_instruction describing what to change
- "no_action": comment is just a question/note with nothing actionable`,
          response_json_schema: CLASSIFY_SCHEMA,
        });

        newProcessedIds.push(comment.id);

        if (classification.action === 'approve_publish' || classification.action === 'approve_schedule') {
          updatedStatus = 'approved';
          actionsTaken.push(`Approved (${classification.action === 'approve_publish' ? 'publish' : 'schedule'})`);
        } else if (classification.action === 'edit_copy' && classification.revised_copy) {
          updatedContent = classification.revised_copy;
          actionsTaken.push('Updated post copy per feedback');
        } else if (classification.action === 'edit_image' && classification.image_instruction) {
          const imgRes = await base44.asServiceRole.integrations.Core.GenerateImage({
            prompt: `A welcoming, bright, patient-focused photo for a ${post.platform} dental practice post about "${post.topic}". ${brandGuide} No scary tools, no clinical shots, no text in image. Adjust per: ${classification.image_instruction}`,
          });
          await base44.asServiceRole.entities.SocialPost.update(post.id, { image_url: imgRes.url });
          actionsTaken.push('Regenerated image per feedback');
        }
      }

      await base44.asServiceRole.entities.SocialPost.update(post.id, {
        content: updatedContent,
        status: updatedStatus,
        processed_comment_ids: newProcessedIds,
      });

      if (actionsTaken.length > 0) {
        await addClickUpComment(
          base44,
          post.clickup_task_id,
          `Automated update: ${actionsTaken.join('; ')}.`
        );
        summaries.push({ postId: post.id, actionsTaken });
        processedCount++;
      }
    }

    return Response.json({ success: true, posts_updated: processedCount, summaries });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}