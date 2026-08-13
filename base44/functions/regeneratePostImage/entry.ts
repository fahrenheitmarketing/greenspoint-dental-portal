import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';
import { getBrandGuideText, uploadAttachmentToClickUpTask } from '../../shared/clickup.ts';

export default async function (req) {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user || user.role !== 'admin') {
      return Response.json({ error: 'Admin access required' }, { status: 403 });
    }

    const { postId, instruction } = await req.json();
    if (!postId) {
      return Response.json({ error: 'postId is required' }, { status: 400 });
    }

    const post = await base44.asServiceRole.entities.SocialPost.get(postId);
    if (!post) {
      return Response.json({ error: 'Post not found' }, { status: 404 });
    }

    const settingsList = await base44.asServiceRole.entities.SocialMediaSettings.list();
    const brandGuide = settingsList[0] ? await getBrandGuideText(base44, settingsList[0]) : '';

    const imageDirection = post.brand_compliance_notes ? `Visual direction from creative brief: ${post.brand_compliance_notes}. ` : '';
    const prompt = `${imageDirection}A welcoming, bright, lifestyle photo for a ${post.platform} dental practice social media post about "${post.topic}". The post copy is: "${post.content}". Create an image that VISUALLY REPRESENTS this content — the image must directly reflect the message, not be a generic stock photo. If the post is about the dental office, staff, or "behind the scenes", do NOT show staff or a clinic — instead use a relevant visual metaphor like a welcoming front door with morning sunlight, a tidy desk with coffee, a sunrise over the neighborhood, or a "we're here for you" community scene. Ensure the image is anatomically correct and logically coherent — no extra limbs, no distorted faces, no physically impossible objects. Prefer simple, clean compositions with at most one or two people to avoid AI artifacts. ${brandGuide} When people are shown, feature Hispanic/Latino individuals reflecting the local community. Absolutely no dental staff, no clinic reception areas, no dentist offices, no dental chairs, no scary dental tools, no clinical/surgical shots, no text overlaid on the image.${instruction ? ` Additional instruction: ${instruction}` : ''}`;

    const { url } = await base44.asServiceRole.integrations.Core.GenerateImage({ prompt });

    await base44.asServiceRole.entities.SocialPost.update(postId, { image_url: url });

    // Attach the creative to the linked ClickUp task
    let attached = false;
    if (post.clickup_task_id) {
      try {
        const safeTopic = (post.topic || 'creative').replace(/[^a-zA-Z0-9]+/g, '-').toLowerCase().slice(0, 40);
        const filename = `${post.platform}-${post.scheduled_date || 'undated'}-${safeTopic}.jpg`;
        await uploadAttachmentToClickUpTask(base44, post.clickup_task_id, url, filename);
        attached = true;
      } catch (attachErr) {
        console.error('ClickUp attachment upload failed:', attachErr.message);
      }
    }

    return Response.json({ success: true, image_url: url, attached_to_clickup: attached });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}