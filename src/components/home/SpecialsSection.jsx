import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tag, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const specials = [
  { title: 'New Patient Special', description: 'Comprehensive exam, full X-rays, and professional cleaning. Everything you need to start your dental journey with confidence.', price: '$99', note: 'No hidden costs' },
  { title: 'Dental Exam & X-Rays', description: "Quick checkup to see where you stand. Perfect if you haven't been to a dentist in a while and want to know your options.", price: '$39', note: 'No surprises' },
  { title: 'Free Consultation', description: "Thinking about braces, implants, or a smile makeover? Come in for a free consultation and we'll walk you through your options and costs.", price: 'FREE', note: 'No obligation' },
];

export default function SpecialsSection() {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-14">
          <p className="text-secondary font-medium text-sm uppercase tracking-wider mb-3">Current Specials</p>
          <h2 className="font-heading text-3xl md:text-4xl text-foreground mb-4">Quality Dental Care at Prices You Can Afford</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">We believe great dental care shouldn't break the bank. Take advantage of our specials to get started.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {specials.map((special, i) => (
            <motion.div key={special.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }} className="relative group">
              <div className="h-full p-8 rounded-2xl border border-border bg-card hover:shadow-xl hover:border-secondary/30 transition-all duration-300 flex flex-col">
                <div className="flex items-center gap-2 mb-4">
                  <Tag className="w-4 h-4 text-secondary" />
                  <span className="text-xs font-semibold text-secondary uppercase tracking-wider">{special.note}</span>
                </div>
                <h3 className="font-heading text-xl text-foreground mb-3">{special.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed flex-1 mb-6">{special.description}</p>
                <div className="flex items-end justify-between">
                  <p className="text-4xl font-heading font-bold text-primary">{special.price}</p>
                  <Link to="/contact" className="text-primary hover:text-primary/80 transition-colors">
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/financing">
            <Button variant="outline" className="rounded-full px-8 border-primary/30 text-primary hover:bg-primary/5">View Financing Options</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}