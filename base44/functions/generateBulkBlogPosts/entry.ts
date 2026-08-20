import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';
import { generateOneBlogPost, getThursdaysInMonth } from '../../shared/blogContentRules.ts';

export default async function (req) {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user || user.role !== 'admin') {
      return Response.json({ error: 'Admin access required' }, { status: 403 });
    }

    const { category, campaignMonth, count, topics } = await req.json();
    if (!campaignMonth) {
      return Response.json({ error: 'campaignMonth is required' }, { status: 400 });
    }

    const postCount = Math.min(Math.max(parseInt(count, 10) || 1, 1), 8);
    const topicList = Array.isArray(topics) ? topics.filter(Boolean) : [];

    // All assignable blog categories — used to spread posts across distinct
    // categories when "mixed" is requested.
    const ALL_CATEGORIES = [
      'general-dentistry', 'cosmetic-dentistry', 'restorative-dentistry',
      'orthodontics', 'family-dental', 'insurance-financing',
      'dental-health', 'smile-confidence', 'affordable-dentistry', 'community',
    ];

    // Build a per-post category list. "mixed" (or omitted) rotates through all
    // categories in a shuffled order so a batch covers varied topics.
    const buildCategorySequence = (cat, n) => {
      if (cat && cat !== 'mixed') {
        return Array.from({ length: n }, () => cat);
      }
      // Fisher-Yates shuffle for variety
      const pool = [...ALL_CATEGORIES];
      for (let i = pool.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [pool[i], pool[j]] = [pool[j], pool[i]];
      }
      return Array.from({ length: n }, (_, i) => pool[i % pool.length]);
    };
    const categorySequence = buildCategorySequence(category, postCount);

    // Parse campaignMonth ("August 2026") into year and month index
    const [monthName, yearStr] = campaignMonth.split(' ');
    const year = parseInt(yearStr, 10);
    const monthIndex = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December',
    ].indexOf(monthName);

    if (monthIndex === -1 || isNaN(year)) {
      return Response.json({ error: 'Invalid campaignMonth format. Expected "Month Year".' }, { status: 400 });
    }

    // Get Thursdays in the month — one per post
    const thursdayDates = getThursdaysInMonth(year, monthIndex, postCount);

    if (thursdayDates.length < postCount) {
      return Response.json({
        error: `Only ${thursdayDates.length} Thursdays available in ${campaignMonth}, but ${postCount} posts requested. Reduce the count or choose a different month.`,
      }, { status: 400 });
    }

    // Fetch existing titles to avoid repetition across all generated posts
    const existingPosts = await base44.asServiceRole.entities.BlogStudioPost.list('-created_date', 100);
    const existingTitles = existingPosts.map((p) => p.title).filter(Boolean);

    const created = [];
    const errors = [];

    for (let i = 0; i < postCount; i++) {
      try {
        const post = await generateOneBlogPost(base44, {
          topic: topicList[i] || undefined,
          category: categorySequence[i],
          campaignMonth,
          existingTitles,
        });

        // Assign the Thursday publish date
        const updated = await base44.asServiceRole.entities.BlogStudioPost.update(post.id, {
          published_date: thursdayDates[i],
        });

        created.push(updated);
        // Add to existing titles so the next post doesn't duplicate
        existingTitles.push(updated.title);
      } catch (err) {
        errors.push({ index: i + 1, error: err.message });
      }
    }

    return Response.json({
      success: true,
      created: created.map((p) => ({ id: p.id, title: p.title, published_date: p.published_date })),
      count: created.length,
      errors,
      scheduledDates: thursdayDates.slice(0, created.length),
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}