import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CheckCircle, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import SmileSimulator from '@/components/services/SmileSimulator';

const services = [
  {
    title: 'Dental Crowns',
    description: "A custom-made cap that fits over a damaged tooth to restore its strength, shape, and appearance. Crowns are used when a cavity is too large for a filling, or when a tooth is cracked, worn, or weakened. They look and function like a natural tooth.",
  },
  {
    title: 'Dental Bridges',
    description: "Missing a tooth? A bridge uses your surrounding teeth to support a replacement tooth, filling the gap and restoring your ability to chew, speak, and smile with confidence. No one needs to know it's not your natural tooth.",
  },
  {
    title: 'Dental Implants',
    description: "The gold standard for replacing missing teeth. An implant is a permanent solution that looks, feels, and works like a real tooth. Dr. Bosse has specialized training in implants and will walk you through every step.",
  },
  {
    title: 'Dentures',
    description: "Full or partial dentures can replace multiple missing teeth and give you back the ability to eat, talk, and smile comfortably. Today's dentures are more natural-looking and comfortable than ever before.",
  },
  {
    title: 'Root Canal Therapy',
    description: "Don't panic — a root canal is much simpler than most people think, and it saves a tooth that would otherwise need to be pulled. We use modern techniques and sedation options to make the procedure comfortable and virtually painless.",
  },
  {
    title: 'Full Mouth Rehabilitation',
    description: "When you need extensive dental work, we'll create a comprehensive plan to restore your entire smile. We break treatment into phases and offer financing to make it manageable — because everyone deserves a second chance at a healthy smile.",
  },
  {
    title: 'Gum & Periodontal Treatment',
    description: "Gum disease is more common than you think, and it's nothing to be embarrassed about. We offer gentle, effective treatments to restore your gum health and prevent further damage.",
  },
  {
    title: 'Inlays & Onlays',
    description: "When a filling isn't enough but a crown isn't necessary, inlays and onlays provide the perfect middle ground. They're custom-crafted to fit your tooth precisely and restore its strength.",
  },
];

const faqs = [
  { q: "I'm embarrassed about my teeth. Will you judge me?", a: "Absolutely not. We see patients every day who have put off dental care for various reasons — life gets in the way. We're here to help, not judge. Whatever shape your teeth are in, we've seen it before and we know how to help." },
  { q: "How much do dental implants cost?", a: "Implant costs vary depending on your specific needs, but we offer free consultations so you'll know exactly what to expect. We also have multiple financing options including CareCredit, HELPcard, and in-house payment plans." },
  { q: "Can I get all my dental work done at once?", a: "In some cases, yes! For extensive work, we often create a phased treatment plan that prioritizes urgent needs first. This also helps spread the cost over time. We'll work with you to find the best approach." },
  { q: "Are root canals painful?", a: "Modern root canals are far more comfortable than their reputation suggests. With local anesthesia and sedation options, most patients feel little to no discomfort. The procedure actually relieves pain by treating the infection causing it." },
];

export default function RestorativeDentistry() {
  return (
    <div>
      <section className="bg-gradient-to-br from-accent/5 via-background to-primary/5 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-3xl">
            <Link to="/services" className="text-primary text-sm font-medium hover:underline mb-4 inline-block">← All Services</Link>
            <h1 className="font-heading text-4xl md:text-5xl text-foreground mb-6">Restorative Dentistry</h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Whether you need a single crown or a complete smile restoration, we're here to help — with 
              compassion, skill, and flexible payment options. This is a judgment-free space, and your 
              fresh start begins here.
            </p>
          </div>
        </div>
      </section>

      {/* Compassion banner */}
      <div className="bg-primary/5 py-6">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 text-primary">
            <Heart className="w-5 h-5" />
            <p className="font-medium">
              We don't care how long it's been. We care about helping you feel good about your smile again.
            </p>
          </div>
        </div>
      </div>

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
                  <CheckCircle className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                  <h3 className="font-heading text-xl text-foreground">{service.title}</h3>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed pl-8">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <SmileSimulator />

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
          <h2 className="font-heading text-3xl text-foreground mb-4">Your Smile Restoration Starts Here</h2>
          <p className="text-muted-foreground mb-8">Free consultation. Clear pricing. Financing available. Se habla español.</p>
          <Link to="/contact">
            <Button size="lg" className="bg-primary hover:bg-primary/90 rounded-full px-8 font-semibold">
              Book Your Free Consultation
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}