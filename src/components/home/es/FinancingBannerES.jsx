import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CreditCard, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const benefits = [
  'Planes de pagos mensuales bajos',
  'CareCredit y HELPcard aceptados',
  'Se aceptan la mayoría de planes de seguro',
  'Financiamiento sin intereses disponible',
  'Precios transparentes, sin sorpresas',
  'Planes de pago para tratamientos mayores',
];

export default function FinancingBannerES() {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-gradient-to-br from-primary to-primary/80 rounded-3xl p-10 md:p-16 text-primary-foreground">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <CreditCard className="w-5 h-5" />
                <span className="text-sm font-medium text-primary-foreground/80 uppercase tracking-wider">Opciones de Financiamiento</span>
              </div>
              <h2 className="font-heading text-3xl md:text-4xl mb-4">No Dejes que el Costo te Impida Obtener la Atención que Necesitas</h2>
              <p className="text-primary-foreground/80 leading-relaxed mb-8">
                Entendemos que el trabajo dental puede ser costoso, especialmente para tratamientos más grandes como aparatos, implantes o coronas. Por eso ofrecemos múltiples opciones de financiamiento para ayudarte a distribuir el costo en pagos mensuales manejables. Tu salud es demasiado importante para posponerla.
              </p>
              <Link to="/es/financiacion">
                <Button size="lg" className="bg-secondary hover:bg-secondary/80 text-secondary-foreground rounded-full px-8 font-semibold transition-all duration-200">Ver Todas las Opciones de Financiamiento</Button>
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