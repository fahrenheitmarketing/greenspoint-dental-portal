import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Heart, Globe, Shield, Award, GraduationCap, Stethoscope, Users, Monitor } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';

export default function About() {
  const t = useTranslation();
  return (
    <div>
      {/* Page Header */}
      <section className="bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-3xl">
            <p className="text-secondary font-medium text-sm uppercase tracking-wider mb-3">{t('about.badge')}</p>
            <h1 className="font-heading text-4xl md:text-5xl text-foreground mb-6">
              {t('about.title')}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t('about.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-heading text-3xl md:text-4xl text-foreground mb-6">
                {t('about.storyTitle')}
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>{t('about.storyText1')}</p>
                <p>{t('about.storyText2')}</p>
                <p>{t('about.storyText3')}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="flex items-center gap-3 p-4 bg-primary/5 rounded-xl">
                  <Heart className="w-5 h-5 text-primary" />
                  <span className="text-sm font-medium">{t('about.judgmentFree')}</span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-secondary/5 rounded-xl">
                  <Globe className="w-5 h-5 text-secondary" />
                  <span className="text-sm font-medium">{t('about.bilingualStaff')}</span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-accent/5 rounded-xl">
                  <Shield className="w-5 h-5 text-accent" />
                  <span className="text-sm font-medium">{t('about.yearsExperience')}</span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-chart-4/5 rounded-xl">
                  <Users className="w-5 h-5 text-chart-4" />
                  <span className="text-sm font-medium">{t('about.familyFocused')}</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <img
                src="https://media.base44.com/images/public/69e928fd4b865057d3a65de3/11693f3a5_generated_image.png"
                alt="Greenspoint Dental team"
                className="rounded-3xl shadow-xl w-full"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Bilingual Section */}
      <section className="py-20 bg-secondary/5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Globe className="w-12 h-12 text-secondary mx-auto mb-6" />
            <h2 className="font-heading text-3xl md:text-4xl text-foreground mb-6">
              {t('about.spanishTitle')}
            </h2>
            <p className="text-muted-foreground leading-relaxed text-lg mb-4">
              {t('about.spanishDesc')}
            </p>
            <p className="text-muted-foreground leading-relaxed">
              {t('about.spanishLocalDesc')}
            </p>
          </div>
        </div>
      </section>

      {/* Meet Dr. Bosse */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <img
                src="https://media.base44.com/images/public/69e928fd4b865057d3a65de3/2ea50fc7d_louisxray.png"
                alt="Dr. Louis P. Bosse"
                className="rounded-3xl shadow-xl w-full max-w-md mx-auto"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-secondary font-medium text-sm uppercase tracking-wider mb-3">{t('about.drTitle')}</p>
              <h2 className="font-heading text-3xl md:text-4xl text-foreground mb-6">{t('about.drName')}</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>{t('about.drText1')}</p>
                <p>{t('about.drText2')}</p>
                <p>{t('about.drText3')}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="flex items-start gap-3">
                  <GraduationCap className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-foreground">{t('about.university')}</p>
                    <p className="text-xs text-muted-foreground">{t('about.degree')}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Award className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-foreground">{t('about.fellowship')}</p>
                    <p className="text-xs text-muted-foreground">{t('about.prostho')}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Stethoscope className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-foreground">{t('about.prosthoTitle')}</p>
                    <p className="text-xs text-muted-foreground">{t('about.prosthoDesc')}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Monitor className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-foreground">{t('about.tech')}</p>
                    <p className="text-xs text-muted-foreground">{t('about.techDesc')}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Technology */}
      <section className="py-20 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <p className="text-secondary font-medium text-sm uppercase tracking-wider mb-3">{t('about.techSectionTitle')}</p>
            <h2 className="font-heading text-3xl md:text-4xl text-foreground mb-4">
              {t('about.techSectionDesc')}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t('about.techText')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: t('about.xrays'),
                description: t('about.xraysDesc'),
              },
              {
                title: t('about.cavity'),
                description: t('about.cavityDesc'),
              },
              {
                title: t('about.handpiece'),
                description: t('about.handpieceDesc'),
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-7 rounded-2xl bg-card border border-border"
              >
                <h3 className="font-heading text-xl text-foreground mb-3">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-background">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl text-foreground mb-4">{t('about.ctaTitle')}</h2>
          <p className="text-muted-foreground mb-8">
            {t('about.ctaDesc')}
          </p>
          <Link to="/contact">
            <Button size="lg" className="bg-primary hover:bg-primary/90 rounded-full px-8 font-semibold">
              {t('about.freeConsultation')}
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}