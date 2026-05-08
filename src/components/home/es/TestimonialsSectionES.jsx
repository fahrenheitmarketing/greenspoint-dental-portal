import React from 'react';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';

const testimonials = [
  { name: 'Maria G.', text: 'Llevaba años sin ir al dentista por miedo y vergüenza. El equipo de Greenspoint me hizo sentir tan cómoda. Hablaron conmigo en español, explicaron todo y nunca me hicieron sentir juzgada. ¡Ahora voy regularmente!', rating: 5 },
  { name: 'Carlos R.', text: 'Excelente atención. Me hicieron un plan de pago para los aparatos de mi hijo que realmente funciona con nuestro presupuesto. El Dr. Bosse es muy paciente y profesional.', rating: 5 },
  { name: 'Jennifer L.', text: 'The $99 new patient special was amazing value. They were thorough, honest about what I needed, and never tried to upsell me. My whole family goes here now.', rating: 5 },
  { name: 'Roberto M.', text: 'Me hice implantes aquí y quedé muy satisfecho. El Dr. Bosse explicó todo el proceso paso a paso. El financiamiento hizo que fuera posible para mí. Muy recomendado.', rating: 5 },
  { name: 'Ana P.', text: 'Vine con mucha ansiedad dental y el personal fue increíblemente comprensivo. Usaron sedación para que estuviera cómoda. Por primera vez en años, no tengo miedo de ir al dentista.', rating: 5 },
  { name: 'David K.', text: "Great staff, very professional. I appreciate that they're upfront about costs before doing any work. No surprises on my bill.", rating: 5 },
];

export default function TestimonialsSectionES() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-14">
          <p className="text-secondary font-medium text-sm uppercase tracking-wider mb-3">Historias de Pacientes</p>
          <h2 className="font-heading text-3xl md:text-4xl text-foreground mb-4">Personas Reales, Sonrisas Reales</h2>
          <div className="flex items-center justify-center gap-2">
            <div className="flex">{[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-secondary text-secondary" />)}</div>
            <span className="text-muted-foreground text-sm">4.9 de 5 — 200+ reseñas en Google</span>
          </div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div key={t.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="p-6 rounded-2xl bg-card border border-border hover:shadow-md transition-all">
              <div className="flex mb-3">{[...Array(t.rating)].map((_, j) => <Star key={j} className="w-4 h-4 fill-secondary text-secondary" />)}</div>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">"{t.text}"</p>
              <p className="font-semibold text-foreground text-sm">{t.name}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}