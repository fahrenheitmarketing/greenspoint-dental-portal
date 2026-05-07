import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';

export default function ServicesOverview() {
  const t = useTranslation();

  const services = [
    {
      title: t('services.general'),
      description: t('services.generalDesc'),
      path: '/services/general',
      color: 'bg-primary/10 text-primary',
    },
    {
      title: t('services.cosmetic'),
      description: t('services.cosmeticDesc'),
      path: '/services/cosmetic',
      color: 'bg-secondary/10 text-secondary',
    },
    {
      title: t('services.restorative'),
      description: t('services.restorativeDesc'),
      path: '/services/restorative',
      color: 'bg-accent/10 text-accent',
    },
    {
      title: t('services.ortho'),
      description: t('services.orthoDesc'),
      path: '/services/orthodontics',
      color: 'bg-chart-4/10 text-chart-4',
    },
  ];

  return (
    <section className="py-20 bg-muted/50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-14">
          <p className="text-secondary font-medium text-sm uppercase tracking-wider mb-3">{t('services.badge')}</p>
          <h2 className="font-heading text-3xl md:text-4xl text-foreground mb-4">
            {t('services.title')}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t('services.desc')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                to={service.path}
                className="group block p-8 rounded-2xl bg-card border border-border hover:shadow-xl hover:border-primary/20 transition-all duration-300 h-full"
              >
                <div className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold mb-4 ${service.color}`}>
                  {service.title}
                </div>
                <h3 className="font-heading text-2xl text-foreground mb-3 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-5">{service.description}</p>
                <div className="flex items-center text-primary font-medium text-sm group-hover:gap-3 gap-2 transition-all">
                   <span>{t('services.viewServices')}</span>
                   <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}