import React from 'react';
import { Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft, Clock, User, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import ReactMarkdown from 'react-markdown';
import LanguageSwitcher from '@/components/blog/LanguageSwitcher';
import { serviceLinks } from '@/lib/serviceLinks';

const categoryLabels = {
  'affordable-dentistry': 'Affordable Dentistry',
  'dental-health': 'Dental Health',
  'smile-confidence': 'Smile & Confidence',
  'family-dental': 'Family Dental',
  'insurance-financing': 'Insurance & Financing',
  'community': 'Community',
};

// Custom paragraph renderer that auto-links service terms
const ParagraphWithLinks = ({ children }) => {
  if (!children || typeof children !== 'string') {
    return <p>{children}</p>;
  }

  const sortedLinks = Object.keys(serviceLinks).sort((a, b) => b.length - a.length);
  let content = children;
  const parts = [];
  let lastIndex = 0;

  sortedLinks.forEach(term => {
    const regex = new RegExp(`\\b${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'gi');
    const matches = [...content.matchAll(regex)];

    matches.forEach(match => {
      const index = match.index;
      if (index >= lastIndex) {
        if (index > lastIndex) {
          parts.push({ type: 'text', content: content.slice(lastIndex, index) });
        }
        parts.push({
          type: 'link',
          content: match[0],
          href: serviceLinks[term],
        });
        lastIndex = index + match[0].length;
      }
    });
  });

  if (lastIndex < content.length) {
    parts.push({ type: 'text', content: content.slice(lastIndex) });
  }

  if (parts.length === 0) {
    return <p>{children}</p>;
  }

  return (
    <p>
      {parts.map((part, idx) =>
        part.type === 'link' ? (
          <Link key={idx} to={part.href} className="text-primary hover:underline font-medium">
            {part.content}
          </Link>
        ) : (
          <span key={idx}>{part.content}</span>
        )
      )}
    </p>
  );
};

export default function BlogPostPage() {
  const urlParams = new URLSearchParams(window.location.search);
  const slug = window.location.pathname.split('/blog/')[1];

  const { data: posts = [], isLoading } = useQuery({
    queryKey: ['blogPost', slug],
    queryFn: () => base44.entities.BlogPost.filter({ slug }),
  });

  const post = posts[0];

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20">
        <Skeleton className="h-8 w-32 mb-8" />
        <Skeleton className="h-12 w-3/4 mb-4" />
        <Skeleton className="h-4 w-48 mb-8" />
        <Skeleton className="h-64 w-full rounded-2xl mb-8" />
        <div className="space-y-3">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <h1 className="font-heading text-3xl text-foreground mb-4">Article Not Found</h1>
        <p className="text-muted-foreground mb-8">This article may have been moved or removed.</p>
        <Link to="/blog">
          <Button className="bg-primary hover:bg-primary/90 rounded-full px-8">Back to Blog</Button>
        </Link>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <section className="bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-12 md:py-16">
        <div className="max-w-3xl mx-auto px-4">
          <Link to="/blog" className="inline-flex items-center gap-2 text-primary text-sm font-medium hover:underline mb-4">
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
          <Badge className="bg-primary/10 text-primary mb-6 block w-fit">
            {categoryLabels[post.category] || post.category}
          </Badge>
          <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl text-foreground mb-4 leading-tight">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              <span>{format(new Date(post.published_date || post.created_date), 'MMM d, yyyy')}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <User className="w-4 h-4" />
              <span>{post.author || 'Greenspoint Dental Team'}</span>
            </div>
            {post.read_time && (
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                <span>{post.read_time} min read</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4">
          {post.image_url && (
            <img
              src={post.image_url}
              alt={post.title}
              className="w-full rounded-2xl shadow-lg mb-12"
            />
          )}
          <article className="prose prose-lg max-w-none prose-headings:font-heading prose-headings:text-foreground prose-p:text-muted-foreground prose-p:leading-relaxed prose-a:text-primary prose-strong:text-foreground prose-h2:mt-8 prose-h2:mb-4 prose-h3:mt-6 prose-h3:mb-3 prose-p:mb-4 prose-ul:my-4 prose-ol:my-4 prose-li:my-2">
            <ReactMarkdown 
              components={{ 
                p: ParagraphWithLinks,
                ul: ({node, ...props}) => <ul className="list-disc list-inside space-y-2 text-muted-foreground my-4" {...props} />,
                ol: ({node, ...props}) => <ol className="list-decimal list-inside space-y-2 text-muted-foreground my-4" {...props} />,
                li: ({node, ...props}) => <li className="text-muted-foreground" {...props} />
              }}
            >
              {post.content.replace(/^# .*\n/, '')}
            </ReactMarkdown>
          </article>
        </div>
      </section>

      {/* Language switcher */}
      <LanguageSwitcher currentLang="en" translationSlug={post.translation_slug} />

      {/* CTA */}
      <section className="py-16 bg-primary/5 mt-8">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h3 className="font-heading text-2xl text-foreground mb-4">Questions About Your Dental Health?</h3>
          <p className="text-muted-foreground mb-8 text-lg">
            Our bilingual team is happy to answer any questions. Schedule a free consultation today.
          </p>
          <Link to="/contact">
            <Button className="bg-primary hover:bg-primary/90 rounded-full px-8 font-semibold">
              Schedule a Visit
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}