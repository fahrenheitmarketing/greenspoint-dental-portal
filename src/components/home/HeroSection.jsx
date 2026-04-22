import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Phone, Heart, Globe, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';

export default function HeroSection() {
  const t = useTranslation();
  
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Bilingual badge */}
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Globe className="w-4 h-4" />
              <span>{t('hero.badge')}</span>
            </div>

            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight mb-6">
              {t('hero.title').split('.')[0]}
              <span className="text-primary">.</span> <span className="text-primary">{t('hero.title').split('.')[1].trim()}</span>
              <span className="text-primary">.</span>
            </h1>

            <p className="text-lg text-muted-foreground leading-relaxed mb-4 max-w-lg">
              {t('hero.description')}
            </p>

            <div className="flex items-center gap-2 text-secondary font-medium mb-8">
              <Heart className="w-5 h-5" />
              <span>{t('hero.trusted')}</span>
            </div>

            <div className="flex flex-wrap gap-4 mb-10">
              <Link to="/contact">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 text-base font-semibold">
                  {t('hero.scheduleVisit')}
                </Button>
              </Link>
              <span>
                <Button size="lg" variant="outline" className="rounded-full px-8 text-base font-semibold border-primary/30 text-primary pointer-events-none">
                  <Phone className="w-4 h-4 mr-2" />
                  {t('navbar.phone')}
                </Button>
              </span>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-secondary text-secondary" />
                  ))}
                </div>
                <span className="font-medium">{t('hero.googleRating')}</span>
              </div>
              <span className="text-border">|</span>
              <span>{t('hero.reviews')}</span>
              <span className="text-border">|</span>
              <span>{t('hero.yearsServing')}</span>
            </div>
          </motion.div>

          {/* Right image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://media.base44.com/images/public/69e928fd4b865057d3a65de3/9263aec0b_image.png"
                alt="Greenspoint Dental office building"
                className="w-full h-auto object-cover"
              />
            </div>
            
            {/* Floating card */}
            <div className="absolute -bottom-4 -left-4 md:-left-8 bg-background rounded-2xl shadow-xl p-5 border border-border">
              <p className="text-sm font-semibold text-foreground">{t('hero.newPatientSpecial')}</p>
              <p className="text-3xl font-heading text-primary font-bold">{t('hero.price')}</p>
              <p className="text-xs text-muted-foreground">{t('hero.offer')}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}