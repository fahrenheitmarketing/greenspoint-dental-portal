import React from 'react';
import { Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';

const serviceLinks = {
  'affordable-dentistry': '/financing',
  'dental-health': '/services/general',
  'smile-confidence': '/services/cosmetic',
  'family-dental': '/services/general',
  'insurance-financing': '/financing',
  'community': '/about',
};

const categoryLabels = {
  'affordable-dentistry': 'Affordable Dentistry',
  'dental-health': 'Dental Health',
  'smile-confidence': 'Smile & Confidence',
  'family-dental': 'Family Dental',
  'insurance-financing': 'Insurance & Financing',
  'community': 'Community',
};

export default function RelatedContent({ currentPostId, category }) {
  const { data: allPosts = [] } = useQuery({
    queryKey: ['relatedPosts', category],
    queryFn: () => base44.entities.BlogPost.filter({ category, published: true }),
  });

  const relatedPosts = allPosts.filter(post => post.id !== currentPostId).slice(0, 3);
  const serviceLink = serviceLinks[category];

  return (
    <aside className="space-y-8">
      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <div>
          <h3 className="font-heading text-lg font-semibold text-foreground mb-4">Related Articles</h3>
          <div className="space-y-3">
            {relatedPosts.map(post => (
              <Link key={post.id} to={`/blog/${post.slug}`}>
                <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer group">
                  <h4 className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors mb-2 line-clamp-2">
                    {post.title}
                  </h4>
                  {post.excerpt && (
                    <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
                      {post.excerpt}
                    </p>
                  )}
                  <div className="flex items-center gap-1 text-primary text-xs font-medium group-hover:gap-2 transition-all">
                    Read more <ArrowRight className="w-3 h-3" />
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Service Link */}
      {serviceLink && (
        <div>
          <h3 className="font-heading text-lg font-semibold text-foreground mb-4">Explore Our Services</h3>
          <Link to={serviceLink}>
            <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer group bg-primary/5">
              <Badge className="mb-3 bg-primary/10 text-primary">
                {categoryLabels[category]}
              </Badge>
              <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors mb-2">
                Learn More About Our Care
              </h4>
              <p className="text-sm text-muted-foreground mb-3">
                Discover how we can help you achieve your dental goals with professional, compassionate care.
              </p>
              <div className="flex items-center gap-1 text-primary text-sm font-medium group-hover:gap-2 transition-all">
                Explore <ArrowRight className="w-4 h-4" />
              </div>
            </Card>
          </Link>
        </div>
      )}
    </aside>
  );
}