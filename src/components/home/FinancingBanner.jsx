import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CreditCard, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';

export default function FinancingBanner() {
  const t = useTranslation();

  const benefits = [
    t('services.lowPayments'),
    t('services.creditCard'),
    t('services.insurance'),
    t('services.noInterest'),
    t('services.transparent'),
    t('services.majorTreatments'),
  ];

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-primary to-primary/80 rounded-3xl p-10 md:p-16 text-primary-foreground"
        >
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <CreditCard className="w-5 h-5" />
                <span className="text-sm font-medium text-primary-foreground/80 uppercase tracking-wider">{t('services.paymentTitle') || 'Financing Options'}</span>
              </div>
              <h2 className="font-heading text-3xl md:text-4xl mb-4">
                {t('services.financeTitle')}
              </h2>
              <p className="text-primary-foreground/80 leading-relaxed mb-8">
                {t('services.financeDesc')}
              </p>
              <Link to="/financing">
                <Button size="lg" className="bg-secondary hover:bg-secondary/80 text-secondary-foreground rounded-full px-8 font-semibold transition-all duration-200">
                  {t('services.financing')}
                </Button>
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {benefits.map((benefit) => (
                <div key={benefit} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                  <span className="text-sm text-primary-foreground/90">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}