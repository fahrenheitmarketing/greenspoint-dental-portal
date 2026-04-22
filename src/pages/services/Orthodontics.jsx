import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CheckCircle, DollarSign } from 'lucide-react';
import { motion } from 'framer-motion';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const treatments = [
  {
    title: 'Traditional Metal Braces',
    description: "The most effective and affordable option for complex alignment issues. Today's metal braces are smaller and more comfortable than ever. Great for kids, teens, and adults.",
    price: '$4,235 – $6,500',
  },
  {
    title: 'Ceramic Braces',
    description: "Same great results as metal braces, but with clear or tooth-colored brackets that blend in with your smile. A popular choice for adults who want a more discreet look.",
    price: '$4,800 – $7,000',
  },
  {
    title: 'Invisalign Clear Aligners',
    description: "Removable, nearly invisible aligners that gradually straighten your teeth. Convenient, comfortable, and perfect for mild to moderate alignment issues. Eat what you want, remove when you need to.",
    price: 'Varies — free consultation',
  },
  {
    title: 'Retainers',
    description: "After your braces or Invisalign treatment, retainers keep your teeth in their new position. We offer Hawley retainers, clear Essix retainers, and permanent bonded options.",
    price: 'Included with treatment',
  },
];

const faqs = [
  { q: "Am I too old for braces?", a: "Absolutely not! Over 1 million Americans over 18 wear braces. Age is not a barrier to a straighter smile. We see adult patients regularly who are thrilled with their results." },
  { q: "How long will I need to wear braces?", a: "Most treatments last 12-30 months, depending on the severity of your case and the type of braces. We'll give you a clear timeline at your consultation." },
  { q: "Do braces hurt?", a: "You may feel some mild discomfort for a few days after they're first placed and after adjustments, but it's very manageable. Most patients say it's much easier than they expected." },
  { q: "Can I make monthly payments for braces?", a: "Yes! We offer in-house payment plans specifically for orthodontic treatments, plus CareCredit and HELPcard financing. We'll work with you to find a monthly payment that fits your budget." },
  { q: "Does insurance cover braces?", a: "Many insurance plans cover orthodontic treatment for children under 18 (up to 50% in some cases). Coverage for adults varies. We'll verify your benefits and help you maximize them." },
];

export default function Orthodontics() {
  return (
    <div>
      <section className="bg-gradient-to-br from-chart-4/5 via-background to-primary/5 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-3xl">
            <Link to="/services" className="text-primary text-sm font-medium hover:underline mb-4 inline-block">← All Services</Link>
            <h1 className="font-heading text-4xl md:text-5xl text-foreground mb-6">Orthodontics</h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              A straight, aligned smile isn't just about looks — it's about health, confidence, and 
              quality of life. Dr. Bosse has decades of experience in orthodontics and will help you 
              or your child find the right treatment at a price that works.
            </p>
          </div>
        </div>
      </section>

      {/* Treatments */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="font-heading text-3xl text-foreground mb-4">Treatment Options & Pricing</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We believe in transparent pricing. Here's what you can expect — and remember, we offer financing to make every option affordable.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {treatments.map((t, i) => (
              <motion.div
                key={t.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-2xl bg-card border border-border hover:shadow-lg transition-all"
              >
                <div className="flex items-start gap-3 mb-3">
                  <CheckCircle className="w-5 h-5 text-chart-4 mt-0.5 shrink-0" />
                  <h3 className="font-heading text-xl text-foreground">{t.title}</h3>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed pl-8 mb-4">{t.description}</p>
                <div className="flex items-center gap-2 pl-8">
                  <DollarSign className="w-4 h-4 text-primary" />
                  <span className="text-sm font-semibold text-primary">{t.price}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Financing callout */}
      <section className="py-12 bg-secondary/10">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="font-heading text-2xl text-foreground mb-3">Braces Shouldn't Break the Bank</h3>
          <p className="text-muted-foreground mb-6">
            We offer in-house payment plans, CareCredit, and HELPcard financing so your family can afford orthodontic care. 
            Many patients pay as little as a cell phone bill per month for braces.
          </p>
          <Link to="/financing">
            <Button variant="outline" className="rounded-full px-8 border-primary/30 text-primary">
              View Financing Options
            </Button>
          </Link>
        </div>
      </section>

      {/* FAQ */}
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
          <h2 className="font-heading text-3xl text-foreground mb-4">Free Orthodontic Consultation</h2>
          <p className="text-muted-foreground mb-8">Find out which option is right for you or your child. No cost, no obligation. Se habla español.</p>
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