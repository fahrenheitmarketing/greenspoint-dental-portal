import React from 'react';
import { Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft, Clock, User } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const categoryLabels = {
  'affordable-dentistry': 'Affordable Dentistry',
  'dental-health': 'Dental Health',
  'smile-confidence': 'Smile & Confidence',
  'family-dental': 'Family Dental',
  'insurance-financing': 'Insurance & Financing',
  'community': 'Community',
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
          <Link to="/blog" className="inline-flex items-center gap-2 text-primary text-sm font-medium hover:underline mb-6">
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
          <Badge className="bg-primary/10 text-primary mb-4">
            {categoryLabels[post.category] || post.category}
          </Badge>
          <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl text-foreground mb-4 leading-tight">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
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
      <section className="py-12">
        <div className="max-w-3xl mx-auto px-4">
          {post.image_url && (
            <img
              src={post.image_url}
              alt={post.title}
              className="w-full rounded-2xl shadow-lg mb-10"
            />
          )}
          <article className="prose prose-lg max-w-none prose-headings:font-heading prose-headings:text-foreground prose-p:text-muted-foreground prose-p:leading-relaxed prose-a:text-primary prose-strong:text-foreground">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </article>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-primary/5">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h3 className="font-heading text-2xl text-foreground mb-3">Questions About Your Dental Health?</h3>
          <p className="text-muted-foreground mb-6">
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