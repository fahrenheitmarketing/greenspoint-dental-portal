import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { BookOpen, Search, Calendar } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

const categoryLabels = {
  'general-dentistry': 'Odontología General',
  'cosmetic-dentistry': 'Odontología Cosmética',
  'restorative-dentistry': 'Odontología Restauradora',
  'orthodontics': 'Ortodoncia',
  'family-dental': 'Dental Familiar',
  'insurance-financing': 'Seguros y Financiamiento',
};

const categoryColors = {
  'general-dentistry': 'bg-primary/10 text-primary',
  'cosmetic-dentistry': 'bg-accent/10 text-accent',
  'restorative-dentistry': 'bg-secondary/10 text-secondary',
  'orthodontics': 'bg-chart-3/10 text-chart-3',
  'family-dental': 'bg-chart-4/10 text-chart-4',
  'insurance-financing': 'bg-chart-5/10 text-chart-5',
};

export default function BlogES() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [displayCount, setDisplayCount] = useState(12);

  const { data: posts = [], isLoading } = useQuery({
    queryKey: ['blogPosts'],
    queryFn: () => base44.entities.BlogPost.list('-published_date', 100),
  });

  const filtered = posts.filter(post => {
    const title = post.title_es || post.title || '';
    const excerpt = post.excerpt_es || post.excerpt || '';
    const matchesCategory = activeCategory === 'all' || post.category === activeCategory;
    const matchesSearch = !searchQuery ||
      title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch && post.published !== false;
  });

  const displayed = filtered.slice(0, displayCount);

  return (
    <div>
      {/* Header */}
      <section className="bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-3xl">
            <p className="text-secondary font-medium text-sm uppercase tracking-wider mb-3">Nuestro Blog</p>
            <h1 className="font-heading text-4xl md:text-5xl text-foreground mb-6">
              Consejos de Salud Dental y Recursos
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Consejos prácticos sobre atención dental asequible, cómo mantener sanos los dientes de tu familia, 
              y por qué una sonrisa saludable importa más de lo que crees.
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
                Todos
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
                placeholder="Buscar artículos..."
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
              <h3 className="font-heading text-xl text-foreground mb-2">No se encontraron artículos</h3>
              <p className="text-muted-foreground">Prueba con otra categoría o término de búsqueda.</p>
            </div>
          ) : (
            <div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {displayed.map((post, i) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: Math.min(i * 0.05, 0.5) }}
                  >
                    <Link to={`/es/blog/${post.slug}`} className="group block h-full">
                      <div className="h-full rounded-2xl border border-border bg-card overflow-hidden hover:shadow-lg transition-all duration-300">
                        {post.image_url && (
                          <div className="aspect-video overflow-hidden">
                            <img
                              src={post.image_url}
                              alt={post.title_es || post.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          </div>
                        )}
                        <div className="p-6">
                          <Badge className={`${categoryColors[post.category] || 'bg-muted text-muted-foreground'} mb-3 text-xs`}>
                            {categoryLabels[post.category] || post.category}
                          </Badge>
                          <h3 className="font-heading text-lg text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                            {post.title_es || post.title}
                          </h3>
                          <p className="text-sm text-muted-foreground line-clamp-3">{post.excerpt_es || post.excerpt}</p>
                          <div className="flex flex-wrap items-center gap-3 mt-3 text-xs text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              <span>{format(new Date(post.published_date || post.created_date), 'd MMM yyyy', { locale: es })}</span>
                            </div>
                            {post.read_time && (
                              <span>{post.read_time} min de lectura</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
              {displayCount < filtered.length && (
                <div className="flex justify-center mt-12">
                  <Button
                    onClick={() => setDisplayCount(prev => prev + 12)}
                    variant="outline"
                    className="rounded-full px-8"
                  >
                    Cargar más artículos
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}