import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const services = [
  { title: 'Odontología General', description: 'Exámenes de rutina, limpiezas, empastes y cuidado preventivo para mantener tu sonrisa saludable. Hacemos que cada visita sea cómoda y libre de ansiedad.', path: '/es/servicios/general', color: 'bg-primary/10 text-primary' },
  { title: 'Odontología Cosmética', description: 'Blanqueamiento de dientes, carillas, Invisalign, restauraciones de sonrisa y más. Una sonrisa hermosa puede cambiar cómo te sientes contigo mismo — déjanos ayudarte a llegar allí.', path: '/es/servicios/cosmetica', color: 'bg-secondary/10 text-secondary' },
  { title: 'Odontología Restauradora', description: 'Coronas, puentes, implantes, dentaduras y endodoncias. Restauraremos tu sonrisa y tu confianza — sin prejuicios, solo resultados.', path: '/es/servicios/restauracion', color: 'bg-accent/10 text-accent' },
  { title: 'Ortodoncia', description: 'Aparatos tradicionales e Invisalign para niños y adultos. Planes de pago asequibles hacen que una sonrisa recta sea posible para todos.', path: '/es/servicios/ortodoncia', color: 'bg-chart-4/10 text-chart-4' },
];

export default function ServicesOverviewES() {
  return (
    <section className="py-20 bg-muted/50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-14">
          <p className="text-secondary font-medium text-sm uppercase tracking-wider mb-3">Servicios</p>
          <h2 className="font-heading text-3xl md:text-4xl text-foreground mb-4">Atención Dental Integral para Toda Tu Familia</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Desde limpiezas de rutina hasta restauraciones complejas, ofrecemos el espectro completo de servicios dentales. Y si el costo es una preocupación, tenemos opciones de financiamiento flexible para hacer el tratamiento asequible.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {services.map((service, i) => (
            <motion.div key={service.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <Link to={service.path} className="group block p-8 rounded-2xl bg-card border border-border hover:shadow-xl hover:border-primary/20 transition-all duration-300 h-full">
                <div className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold mb-4 ${service.color}`}>{service.title}</div>
                <h3 className="font-heading text-2xl text-foreground mb-3 group-hover:text-primary transition-colors">{service.title}</h3>
                <p className="text-muted-foreground leading-relaxed mb-5">{service.description}</p>
                <div className="flex items-center text-primary font-medium text-sm group-hover:gap-3 gap-2 transition-all">
                  <span>Ver Servicios</span>
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