import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CheckCircle, Heart, Globe, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const services = [
  { title: 'Professional Cleanings', description: "We remove the plaque and tartar buildup that your toothbrush can't reach. A professional cleaning twice a year keeps your teeth and gums healthy and helps prevent more serious problems." },
  { title: 'Fillings', description: "Got a cavity? No worries. Today's composite fillings are stronger, longer-lasting, and can be color-matched to your teeth so they're practically invisible. The procedure is quick and we'll make sure you're comfortable throughout." },
  { title: 'Dental Sealants', description: "Sealants create a protective barrier on your teeth to prevent decay. They're especially great for kids, but adults can benefit too. It's a quick, painless, and affordable way to protect your smile." },
  { title: 'Oral Cancer Screening', description: "As part of your regular exam, we check for signs of oral cancer. Early detection makes a huge difference in treatment outcomes. Dental professionals are often the first to spot oral cancer." },
  { title: 'Emergency Dental Care', description: "Tooth pain or a dental injury can't wait. Call us and we'll do our best to see you the same day. We understand emergencies are stressful, and we'll get you out of pain as quickly as possible." },
  { title: 'Sedation Dentistry', description: "Feel anxious about dental visits? We offer nitrous oxide (laughing gas) and oral sedation options so you can relax — or even sleep — through your procedure. There's no shame in needing a little help to feel comfortable." },
  { title: 'Pediatric Dentistry', description: "We love working with kids! From their first tooth through their teenage years, we provide gentle, judgment-free dental care that makes children feel safe and comfortable." },
];

const faqs = [
  { q: "How often should I visit the dentist?", a: "We recommend a checkup and cleaning every six months. But if it's been longer than that, don't stress — just come in when you can. We're here to help, not lecture." },
  { q: "What if I'm really anxious about going to the dentist?", a: "You're not alone — dental anxiety is very common. We offer sedation options from laughing gas to full sedation. We also have warm blankets, music, and a genuinely caring staff. We'll go at your pace." },
  { q: "How much does a regular cleaning cost?", a: "Our new patient special is $99 for a comprehensive exam, X-rays, and cleaning. We also accept most insurance plans and offer financing. Call us for specific pricing." },
  { q: "Do you see children?", a: "Yes! We're a family practice and love seeing patients of all ages. We recommend kids start seeing a dentist by age 1 or within 6 months of their first tooth." },
];

export default function GeneralDentistry() {
  return (
    <div>
      <section className="bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-3xl">
            <Link to="/services" className="text-primary text-sm font-medium hover:underline mb-4 inline-block">← All Services</Link>
            <h1 className="font-heading text-4xl md:text-5xl text-foreground mb-6">General Dentistry</h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              A healthy mouth starts with the basics. Regular cleanings, exams, and preventive care are the foundation of a lifetime of healthy teeth and gums. Our general dentistry services are designed to keep your smile strong and healthy.
            </p>
          </div>
        </div>
      </section>

      <div className="bg-primary/5 py-6">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center gap-8">
          <div className="flex items-center gap-2 text-sm"><Heart className="w-4 h-4 text-primary" /> Judgment-Free</div>
          <div className="flex items-center gap-2 text-sm"><Globe className="w-4 h-4 text-secondary" /> Se habla español</div>
          <div className="flex items-center gap-2 text-sm"><Shield className="w-4 h-4 text-accent" /> Sedation options available</div>
        </div>
      </div>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, i) => (
              <motion.div key={service.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="p-7 rounded-2xl bg-card border border-border hover:shadow-lg transition-all">
                <div className="flex items-start gap-3 mb-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 shrink-0" />
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
          <h2 className="font-heading text-3xl text-foreground mb-4">Ready for a Comfortable Dental Experience?</h2>
          <p className="text-muted-foreground mb-8">New patient exam, X-rays & cleaning for just $99. No hidden costs.</p>
          <Link to="/contact">
            <Button size="lg" className="bg-primary hover:bg-primary/90 rounded-full px-8 font-semibold">Book Your Appointment</Button>
          </Link>
        </div>
      </section>
    </div>
  );
}