import React from 'react';
import { Heart, DollarSign, Globe, Shield, Smile, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const values = [
  { icon: Heart, title: 'Compassionate Care', description: 'We treat every patient with respect and understanding, regardless of their dental history.', color: 'text-primary' },
  { icon: DollarSign, title: 'Affordable Dentistry', description: 'Quality care at fair prices, with flexible financing options that work for your budget.', color: 'text-secondary' },
  { icon: Globe, title: 'Bilingual Team', description: 'We have Spanish and English speakers to ensure clear communication every step of the way.', color: 'text-accent' },
  { icon: Shield, title: 'Judgment-Free Zone', description: "It's never too late. We welcome patients of all backgrounds and dental situations.", color: 'text-chart-4' },
  { icon: Smile, title: 'Comfort First', description: 'Modern amenities, sedation options, and a calming environment to ease your anxiety.', color: 'text-secondary' },
  { icon: Clock, title: 'Emergency Care', description: 'We handle urgent dental issues quickly to get you out of pain as fast as possible.', color: 'text-primary' },
];

export default function ValuesSection() {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="font-heading text-3xl md:text-4xl text-foreground mb-4">Why Choose Greenspoint Dental?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">We're not just another dental office. We're your neighbors, committed to providing honest, judgment-free care.</p>
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