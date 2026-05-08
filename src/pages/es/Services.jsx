import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Heart, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const services = [
  {
    title: 'Odontología General',
    description: 'Exámenes de rutina, limpiezas profesionales, empastes, selladores y detección de cáncer oral. La base de una sonrisa saludable para ti y tu familia.',
    items: ['Exámenes y Limpiezas', 'Empastes', 'Selladores', 'Detección de Cáncer Oral', 'Atención de Emergencia', 'Sedación con Óxido Nitroso'],
    path: '/es/services/general',
    color: 'from-primary/10 to-primary/5',
  },
  {
    title: 'Odontología Cosmética',
    description: 'Blanqueamiento, carillas de porcelana, Invisalign, restauraciones de sonrisa y más. Tu sonrisa es una de las primeras cosas que la gente nota — deja que brille.',
    items: ['Blanqueamiento Zoom!', 'Carillas de Porcelana', 'Alineadores Invisalign', 'Restauraciones de Sonrisa', 'Adhesión Dental', 'Contorneado de Encía'],
    path: '/es/services/cosmetic',
    color: 'from-secondary/10 to-secondary/5',
  },
  {
    title: 'Odontología Restauradora',
    description: 'Coronas, puentes, implantes, dentaduras, endodoncias y rehabilitación bucal completa. Restauraremos tu sonrisa y tu confianza, sin importar el punto de partida.',
    items: ['Coronas Dentales', 'Puentes', 'Implantes Dentales', 'Dentaduras', 'Terapia de Endodoncia', 'Rehabilitación Bucal Completa'],
    path: '/es/services/restorative',
    color: 'from-accent/10 to-accent/5',
  },
  {
    title: 'Ortodoncia',
    description: 'Aparatos metálicos tradicionales, aparatos cerámicos e Invisalign para todas las edades. Una sonrisa recta es posible a cualquier edad, y nuestros planes de pago la hacen asequible.',
    items: ['Aparatos Metálicos', 'Aparatos Cerámicos', 'Invisalign', 'Retenedores', 'Ortodoncia Infantil y Juvenil', 'Ortodoncia para Adultos'],
    path: '/es/services/orthodontics',
    color: 'from-chart-4/10 to-chart-4/5',
  },
];

export default function ServicesES() {
  return (
    <div>
      <section className="bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-3xl">
            <p className="text-secondary font-medium text-sm uppercase tracking-wider mb-3">Nuestros Servicios</p>
            <h1 className="font-heading text-4xl md:text-5xl text-foreground mb-6">Atención Dental Integral para Toda Tu Familia</h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-4">
              Desde limpiezas de rutina hasta transformaciones completas de sonrisa, ofrecemos atención dental integral bajo un mismo techo. Cada tratamiento viene con precios claros, opciones de financiamiento y un equipo compasivo que habla tu idioma.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-sm text-primary"><Heart className="w-4 h-4" /><span>Atención Sin Prejuicios</span></div>
              <div className="flex items-center gap-2 text-sm text-secondary"><Globe className="w-4 h-4" /><span>Hablamos Español</span></div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 space-y-8">
          {services.map((service, i) => (
            <motion.div key={service.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <Link to={service.path} className={`group block p-8 md:p-12 rounded-3xl bg-gradient-to-br ${service.color} border border-border hover:shadow-xl transition-all duration-300`}>
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h2 className="font-heading text-3xl text-foreground mb-4 group-hover:text-primary transition-colors">{service.title}</h2>
                    <p className="text-muted-foreground leading-relaxed mb-6">{service.description}</p>
                    <div className="flex items-center text-primary font-medium group-hover:gap-3 gap-2 transition-all">
                      <span>Ver Todos los Servicios</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {service.items.map((item) => (
                      <div key={item} className="flex items-center gap-2 text-sm text-foreground/80">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-16 bg-primary/5">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl text-foreground mb-4">¿Preocupado por el Costo?</h2>
          <p className="text-muted-foreground mb-8">
            Ofrecemos opciones de financiamiento flexible para todos los tratamientos. No dejes que el costo te impida obtener la atención que mereces. Encontremos un plan que funcione para ti.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/es/financing">
              <Button size="lg" className="bg-primary hover:bg-primary/90 rounded-full px-8 font-semibold">Ver Opciones de Financiamiento</Button>
            </Link>
            <Link to="/es/contact">
              <Button size="lg" variant="outline" className="rounded-full px-8 font-semibold border-primary/30 text-primary">Consulta Gratuita</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}