import React from 'react';
import { Heart, DollarSign, Globe, Shield, Smile, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const values = [
  { icon: Heart, title: 'Atención Compasiva', description: 'Tratamos a cada paciente con respeto y comprensión, sin importar su historial dental.', color: 'text-primary' },
  { icon: DollarSign, title: 'Odontología Asequible', description: 'Atención de calidad a precios justos, con opciones de financiamiento flexible para tu presupuesto.', color: 'text-secondary' },
  { icon: Globe, title: 'Equipo Bilingüe', description: 'Tenemos hablantes de español e inglés para garantizar una comunicación clara.', color: 'text-accent' },
  { icon: Shield, title: 'Zona Sin Prejuicios', description: 'Nunca es demasiado tarde. Bienvenimos pacientes de todos los orígenes y situaciones dentales.', color: 'text-chart-4' },
  { icon: Smile, title: 'Comodidad Primero', description: 'Comodidades modernas, opciones de sedación y un ambiente tranquilo para aliviar tu ansiedad.', color: 'text-secondary' },
  { icon: Clock, title: 'Atención de Emergencia', description: 'Manejamos problemas dentales urgentes rápidamente para aliviar tu dolor.', color: 'text-primary' },
];

export default function ValuesSectionES() {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="font-heading text-3xl md:text-4xl text-foreground mb-4">¿Por Qué Elegir Greenspoint Dental?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">No somos solo otro consultorio dental. Somos tus vecinos, comprometidos a proporcionar atención honesta y sin juzgar.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((value, i) => (
            <motion.div key={value.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="flex items-start gap-4 p-6 rounded-2xl bg-card border border-border hover:shadow-md transition-all">
              <value.icon className={`w-6 h-6 shrink-0 mt-0.5 ${value.color}`} />
              <div>
                <h3 className="font-heading text-lg text-foreground mb-1">{value.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}