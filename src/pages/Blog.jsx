import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { BookOpen, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';

const categoryLabels = {
  'general-dentistry': 'General Dentistry',
  'cosmetic-dentistry': 'Cosmetic Dentistry',
  'restorative-dentistry': 'Restorative Dentistry',
  'orthodontics': 'Orthodontics',
  'family-dental': 'Family Dental',
  'insurance-financing': 'Insurance & Financing',
  'dental-health': 'Dental Health',
  'smile-confidence': 'Smile & Confidence',
  'affordable-dentistry': 'Affordable Dentistry',
  'community': 'Community',
};

const categoryColors = {
  'general-dentistry': 'bg-primary/10 text-primary',
  'cosmetic-dentistry': 'bg-accent/10 text-accent',
  'restorative-dentistry': 'bg-secondary/10 text-secondary',
  'orthodontics': 'bg-chart-3/10 text-chart-3',
  'family-dental': 'bg-chart-4/10 text-chart-4',
  'insurance-financing': 'bg-chart-5/10 text-chart-5',
  'dental-health': 'bg-primary/10 text-primary',
  'smile-confidence': 'bg-accent/10 text-accent',
  'affordable-dentistry': 'bg-secondary/10 text-secondary',
  'community': 'bg-chart-1/10 text-chart-1',
};

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const { data: posts = [], isLoading } = useQuery({
    queryKey: ['blogPosts'],
    queryFn: () => base44.entities.BlogPost.list('-created_date', 100),
  });

  const filtered = posts.filter(post => {
    const matchesCategory = activeCategory === 'all' || post.category === activeCategory;
    const matchesSearch = !searchQuery || 
      post.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch && post.published !== false;
  });

  return (
    <div>
      {/* Header */}
      <section className="bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-3xl">
            <p className="text-secondary font-medium text-sm uppercase tracking-wider mb-3">Our Blog</p>
            <h1 className="font-heading text-4xl md:text-5xl text-foreground mb-6">
              Dental Health Tips & Resources
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Practical advice on affordable dental care, keeping your family's teeth healthy, 
              and understanding why a healthy smile matters more than you might think.
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 border-b border-border sticky top-20 bg-background/95 backdrop-blur-md z-40">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveCategory('all')}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === 'all' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-primary/10'
                }`}
              >
                All Posts
              </button>
              {Object.entries(categoryLabels).map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => setActiveCategory(key)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    activeCategory === key ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-primary/10'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 rounded-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Posts grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array(6).fill(0).map((_, i) => (
                <div key={i} className="space-y-3">
                  <Skeleton className="h-48 w-full rounded-2xl" />
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-heading text-xl text-foreground mb-2">No articles found</h3>
              <p className="text-muted-foreground">Try a different category or search term.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((post, i) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.min(i * 0.05, 0.5) }}
                >
                  <Link
                    to={`/blog/${post.slug}`}
                    className="group block h-full"
                  >
                    <div className="h-full rounded-2xl border border-border bg-card overflow-hidden hover:shadow-lg transition-all duration-300">
                      {post.image_url && (
                        <div className="aspect-video overflow-hidden">
                          <img
                            src={post.image_url}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      )}
                      <div className="p-6">
                        <Badge className={`${categoryColors[post.category] || 'bg-muted text-muted-foreground'} mb-3 text-xs`}>
                          {categoryLabels[post.category] || post.category}
                        </Badge>
                        <h3 className="font-heading text-lg text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-3">{post.excerpt}</p>
                        {post.read_time && (
                          <p className="text-xs text-muted-foreground mt-3">{post.read_time} min read</p>
                        )}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}