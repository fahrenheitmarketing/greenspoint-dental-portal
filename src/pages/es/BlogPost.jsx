import React from 'react';
import { Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft, Clock, User, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import ReactMarkdown from 'react-markdown';
import BlogLanguageSwitcher from '@/components/blog/BlogLanguageSwitcher';

const categoryLabels = {
  'general-dentistry': 'Odontología General',
  'cosmetic-dentistry': 'Odontología Cosmética',
  'restorative-dentistry': 'Odontología Restauradora',
  'orthodontics': 'Ortodoncia',
  'family-dental': 'Dental Familiar',
  'insurance-financing': 'Seguros y Financiamiento',
};

export default function BlogPostPageES() {
  const slug = window.location.pathname.split('/es/blog/')[1];

  const { data: posts = [], isLoading } = useQuery({
    queryKey: ['blogPostES', slug],
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
        <h1 className="font-heading text-3xl text-foreground mb-4">Artículo no encontrado</h1>
        <p className="text-muted-foreground mb-8">Este artículo puede haber sido movido o eliminado.</p>
        <Link to="/es/blog">
          <Button className="bg-primary hover:bg-primary/90 rounded-full px-8">Volver al Blog</Button>
        </Link>

      </div>
    );
  }

  const title = post.title_es || post.title;
  let content = post.content_es || post.content || '';
  // Reconstruct content split across content_es + content for oversized posts
  if (content.includes('<!--BASE44_SPLIT-->')) {
    content = content.replace('<!--BASE44_SPLIT-->', '') + (post.content || '');
  }

  return (
    <div>
      {/* Header */}
      <section className="bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-12 md:py-16">
        <div className="max-w-3xl mx-auto px-4">
          <Link to="/es/blog" className="inline-flex items-center gap-2 text-primary text-sm font-medium hover:underline mb-4">

            <ArrowLeft className="w-4 h-4" />
            Volver al Blog
          </Link>
          <Badge className="bg-primary/10 text-primary mb-6 block w-fit">
            {categoryLabels[post.category] || post.category}
          </Badge>
          <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl text-foreground mb-4 leading-tight">
            {title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              <span>{format(new Date(post.published_date || post.created_date), "d 'de' MMMM yyyy", { locale: es })}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <User className="w-4 h-4" />
              <span>{post.author || 'Equipo de Greenspoint Dental'}</span>
            </div>
            {post.read_time && (
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                <span>{post.read_time} min de lectura</span>
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
              alt={title}
              className="w-full rounded-2xl shadow-lg mb-12"
            />
          )}
          <article className="prose prose-lg max-w-none prose-headings:font-heading prose-headings:text-foreground prose-p:text-muted-foreground prose-p:leading-relaxed prose-a:text-primary prose-strong:text-foreground prose-h2:mt-8 prose-h2:mb-4 prose-h3:mt-6 prose-h3:mb-3 prose-p:mb-4 prose-ul:my-4 prose-ol:my-4 prose-li:my-2">
            <ReactMarkdown
              components={{
                ul: ({node, ...props}) => <ul className="list-disc list-inside space-y-2 text-muted-foreground my-4" {...props} />,
                ol: ({node, ...props}) => <ol className="list-decimal list-inside space-y-2 text-muted-foreground my-4" {...props} />,
                li: ({node, ...props}) => <li className="text-muted-foreground" {...props} />
              }}
            >
              {content.replace(/^# .*\n/, '')}
            </ReactMarkdown>
          </article>
          <BlogLanguageSwitcher slug={post.slug} current="es" />
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary/5 mt-8">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h3 className="font-heading text-2xl text-foreground mb-4">¿Tienes preguntas sobre tu salud dental?</h3>
          <p className="text-muted-foreground mb-8 text-lg">
            Nuestro equipo bilingüe está feliz de responder tus preguntas. Programa una consulta gratuita hoy.
          </p>
          <Link to="/es/contacto">
            <Button className="bg-primary hover:bg-primary/90 rounded-full px-8 font-semibold">
              Programa Tu Visita
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}