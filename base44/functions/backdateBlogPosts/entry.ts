import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (!user || user.role !== 'admin') {
      return Response.json({ error: 'Admin access required' }, { status: 403 });
    }

    // Fetch all published blog posts
    const posts = await base44.asServiceRole.entities.BlogPost.filter({ published: true });
    
    // Sort by ID to maintain consistent ordering
    posts.sort((a, b) => a.id.localeCompare(b.id));

    // Starting date: May 7, 2026
    const startDate = new Date('2026-05-07T00:00:00Z');

    // Update each post with a date two weeks apart
    for (let i = 0; i < posts.length; i++) {
      const daysBack = i * 14; // 14 days = 2 weeks
      const newDate = new Date(startDate);
      newDate.setDate(newDate.getDate() - daysBack);

      await base44.asServiceRole.entities.BlogPost.update(posts[i].id, {
        created_date: newDate.toISOString(),
      });
    }

    return Response.json({
      success: true,
      message: `Updated ${posts.length} blog posts with dates every 2 weeks starting from May 7, 2026`,
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});