import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CheckCircle, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const services = [
  {
    title: 'Zoom! Teeth Whitening',
    description: 'A safe, fast, professional whitening treatment that can brighten your smile by several shades in just one visit. Perfect for a confidence boost before a special event, job interview, or just because you deserve it.',
  },
  {
    title: 'Porcelain Veneers',
    description: "Thin, custom-made shells that fit over your existing teeth to fix chips, gaps, stains, or misshapen teeth. They look and feel completely natural. Veneers can truly transform your smile — and how you feel about yourself.",
  },
  {
    title: 'Invisalign Clear Aligners',
    description: 'Straighten your teeth discreetly with clear, removable aligners. No metal brackets, no wires. Invisalign is comfortable, convenient, and great for adults and teens who want a straighter smile without traditional braces.',
  },
  {
    title: 'Smile Makeovers',
    description: "A customized plan combining multiple cosmetic procedures to completely revitalize your smile. Whether you need whitening, veneers, bonding, or alignment work, we'll create a plan tailored to your goals and your budget.",
  },
  {
    title: 'Dental Bonding',
    description: 'A quick, affordable way to repair chipped, cracked, or discolored teeth. We apply a tooth-colored composite material that blends seamlessly with your natural teeth. Most bonding procedures are done in a single visit.',
  },
  {
    title: 'Gum Contouring',
    description: "If you feel like your gums show too much or are uneven, gum contouring can create a more balanced, attractive smile line. It's a simple procedure that makes a big difference in how your smile looks.",
  },
];

const faqs = [
  { q: "How much do veneers cost?", a: "Our porcelain veneers start at $2,780. We offer financing options through CareCredit, HELPcard, and in-house payment plans to make veneers affordable. Come in for a free consultation to discuss your options." },
  { q: "Is teeth whitening safe?", a: "Yes! Professional teeth whitening performed by our team is completely safe. You may experience mild sensitivity for a day or two, but it's temporary. Over-the-counter products can be harsh — professional whitening gives better results safely." },
  { q: "How long does Invisalign take?", a: "Most Invisalign treatments take 12-18 months, though simple cases can be faster. We'll give you a clear timeline and cost estimate at your free consultation." },
  { q: "Can I afford cosmetic dentistry?", a: "Cosmetic dentistry is more affordable than many people think, especially with our financing options. We offer low monthly payment plans that make treatments like whitening, bonding, and even veneers accessible to more people." },
];

export default function CosmeticDentistry() {
  return (
    <div>
      <section className="bg-gradient-to-br from-secondary/5 via-background to-primary/5 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-3xl">
            <Link to="/services" className="text-primary text-sm font-medium hover:underline mb-4 inline-block">← All Services</Link>
            <h1 className="font-heading text-4xl md:text-5xl text-foreground mb-6">Cosmetic Dentistry</h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Your smile is one of the most powerful things about you. It opens doors, builds connections, and boosts 
              confidence. If you're not happy with your smile, we can help change that — and it may be more affordable 
              than you think.
            </p>
          </div>
        </div>
      </section>

      {/* Power of a smile */}
      <section className="py-16 bg-secondary/5">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Sparkles className="w-10 h-10 text-secondary mx-auto mb-4" />
          <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-4">
            Never Underestimate the Power of Your Smile
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Research shows that people who smile confidently are perceived as more approachable, more likable, and more 
            capable. Whether it's a job interview, a first date, or a family photo — your smile matters. 
            And at Greenspoint Dental, we make it possible for everyone to have one they're proud of.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="p-7 rounded-2xl bg-card border border-border hover:shadow-lg transition-all"
              >
                <div className="flex items-start gap-3 mb-3">
                  <CheckCircle className="w-5 h-5 text-secondary mt-0.5 shrink-0" />
                  <h3 className="font-heading text-xl text-foreground">{service.title}</h3>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed pl-8">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted/50">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="font-heading text-3xl text-foreground mb-8 text-center">Common Questions</h2>
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="border border-border rounded-xl px-6 bg-card">
                <AccordionTrigger className="text-left font-medium text-foreground hover:no-underline py-5">{faq.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-5">{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl text-foreground mb-4">Free Cosmetic Consultation</h2>
          <p className="text-muted-foreground mb-8">Come in and let's talk about your smile goals. No pressure, no obligation — just honest advice and a clear idea of your options and costs.</p>
          <Link to="/contact">
            <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground rounded-full px-8 font-semibold">
              Book Your Free Consultation
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}