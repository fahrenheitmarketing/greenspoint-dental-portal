import React from 'react';
import { Heart, DollarSign, Globe, Shield, Smile, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';

export default function ValuesSection() {
  const t = useTranslation();

  const values = [
    {
      icon: Heart,
      title: t('home.compassion'),
      description: t('home.compassionDesc'),
    },
    {
      icon: DollarSign,
      title: t('home.affordability'),
      description: t('home.affordabilityDesc'),
    },
    {
      icon: Globe,
      title: t('home.bilingual'),
      description: t('home.bilingualDesc'),
    },
    {
      icon: Shield,
      title: t('home.judgment'),
      description: t('home.judgmentDesc'),
    },
    {
      icon: Smile,
      title: t('home.comfort'),
      description: t('home.comfortDesc'),
    },
    {
      icon: Clock,
      title: t('home.emergency'),
      description: t('home.emergencyDesc'),
    },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-14">
          <p className="text-secondary font-medium text-sm uppercase tracking-wider mb-3">{t('home.valuesTitle')}</p>
          <h2 className="font-heading text-3xl md:text-4xl text-foreground mb-4">
            {t('home.valuesDesc')}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, i) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group p-7 rounded-2xl border border-border bg-card hover:shadow-lg hover:border-primary/20 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                <value.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-heading text-xl text-foreground mb-3">{value.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}