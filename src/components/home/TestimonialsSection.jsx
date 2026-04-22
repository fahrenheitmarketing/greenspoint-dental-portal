import React from 'react';
import { Star, Quote } from 'lucide-react';
import { motion } from 'framer-motion';

const testimonials = [
  {
    name: 'Kaitlyn P.',
    text: "Highly recommend! Dr. Bosse ensures you understand the plan and makes you feel comfortable. He listens to you! His staff is friendly and goes out of their way to help. They were all great in helping me not be nervous and calm my anxiety.",
    rating: 5,
  },
  {
    name: 'Cathy W.',
    text: "This was my first time back since the 90s and it was a great experience. They explained everything well. The doc didn't rush. They have new scan technology that allows you to see your teeth. I will definitely be back.",
    rating: 5,
  },
  {
    name: 'Alice B.',
    text: "Everyone was super nice and friendly. The dentist explained everything to me and was joking to help me feel relaxed. I was given a plan of action and everything is affordable with insurance. My visit went better than I thought!",
    rating: 5,
  },
  {
    name: 'Deja A.',
    text: "Absolutely my favorite dentist office! The staff is kind and takes the time to help you understand everything. The doctor actually sits with you, explains what's going on, and discusses your options. I truly enjoy coming here.",
    rating: 5,
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-20 bg-primary/5">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-14">
          <p className="text-secondary font-medium text-sm uppercase tracking-wider mb-3">Patient Stories</p>
          <h2 className="font-heading text-3xl md:text-4xl text-foreground mb-4">
            Real People, Real Smiles
          </h2>
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-secondary text-secondary" />
              ))}
            </div>
            <span className="font-medium">4.9 rating from 327+ Google reviews</span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card p-8 rounded-2xl border border-border hover:shadow-lg transition-all"
            >
              <Quote className="w-8 h-8 text-primary/20 mb-4" />
              <p className="text-foreground leading-relaxed mb-6">"{t.text}"</p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-foreground">{t.name}</p>
                  <p className="text-sm text-muted-foreground">Google Review</p>
                </div>
                <div className="flex">
                  {[...Array(t.rating)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-secondary text-secondary" />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}