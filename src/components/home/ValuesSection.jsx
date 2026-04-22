import React from 'react';
import { Heart, DollarSign, Globe, Shield, Smile, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const values = [
  {
    icon: Heart,
    title: 'Compassionate Care',
    description: 'We treat every patient like family. No judgment, no lectures — just genuine care and understanding for wherever you are in your dental health journey.',
  },
  {
    icon: DollarSign,
    title: 'Truly Affordable',
    description: 'We keep our prices fair because we believe cost should never prevent you from getting the care you need. Flexible financing available for every budget.',
  },
  {
    icon: Globe,
    title: 'Hablamos Español',
    description: 'Our bilingual staff speaks fluent English and Spanish so you can communicate comfortably and understand every step of your treatment.',
  },
  {
    icon: Shield,
    title: 'Judgment-Free Zone',
    description: "Haven't been to a dentist in years? That's okay. We're here to help, not judge. Everyone deserves a fresh start with their dental health.",
  },
  {
    icon: Smile,
    title: 'Your Comfort First',
    description: 'From warm blankets to sedation options, we go the extra mile to make sure you feel relaxed and at ease during every visit.',
  },
  {
    icon: Clock,
    title: 'Same-Day Emergencies',
    description: "Tooth pain can't wait. Call us for same-day emergency appointments — we'll do our best to see you right away.",
  },
];

export default function ValuesSection() {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-14">
          <p className="text-secondary font-medium text-sm uppercase tracking-wider mb-3">Why Families Choose Us</p>
          <h2 className="font-heading text-3xl md:text-4xl text-foreground mb-4">
            Dental Care Built Around <em>You</em>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We understand that going to the dentist can feel stressful — especially when you're worried about cost. 
            That's why everything we do is designed to put you at ease.
          </p>
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