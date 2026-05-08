import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function SpecialsSectionES() {
  return (
    <section className="py-20 bg-secondary/5">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <p className="text-secondary font-medium text-sm uppercase tracking-wider mb-3">Oferta para Pacientes Nuevos</p>
            <h2 className="font-heading text-3xl md:text-4xl text-foreground mb-6">Comienza Tu Viaje Dental por Solo $99</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Creemos que el precio nunca debe ser una barrera para el cuidado dental. Por eso ofrecemos nuestra oferta especial para pacientes nuevos — un examen completo, radiografías completas y limpieza profesional, todo por $99.
            </p>
            <div className="space-y-3 mb-8">
              {['Examen Oral Completo', 'Serie Completa de Radiografías', 'Limpieza Dental Profesional', 'Sin costos ocultos ni sorpresas'].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                  <span className="text-foreground">{item}</span>
                </div>
              ))}
            </div>
            <Link to="/es/contacto">
              <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground rounded-full px-8 font-semibold">Aprovechar Esta Oferta</Button>
            </Link>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-card rounded-3xl p-10 border border-border shadow-lg text-center">
            <p className="text-muted-foreground text-sm uppercase tracking-wider mb-2">Oferta Especial para Pacientes Nuevos</p>
            <p className="font-heading text-8xl font-bold text-primary mb-2">$99</p>
            <p className="text-foreground font-medium text-lg mb-1">Examen + Radiografías + Limpieza</p>
            <p className="text-muted-foreground text-sm mb-6">Un valor de más de $300 — disponible para todos los pacientes nuevos</p>
            <div className="bg-primary/5 rounded-2xl p-4">
              <p className="text-sm text-muted-foreground"><strong className="text-foreground">Sin costos ocultos.</strong> El precio que ves es el precio que pagas. Si necesitas tratamiento adicional, te explicaremos todo y discutiremos los costos antes de cualquier trabajo.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}