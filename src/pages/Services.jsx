import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Heart, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const services = [
  {
    title: 'General Dentistry',
    description: 'Routine checkups, professional cleanings, fillings, sealants, and oral cancer screenings. The foundation of a healthy smile for you and your family.',
    items: ['Checkups & Cleanings', 'Fillings', 'Sealants', 'Oral Cancer Screening', 'Emergency Care', 'Nitrous Oxide Sedation'],
    path: '/services/general',
    color: 'from-primary/10 to-primary/5',
  },
  {
    title: 'Cosmetic Dentistry',
    description: 'Teeth whitening, porcelain veneers, Invisalign, smile makeovers, and more. Your smile is one of the first things people notice — let it shine.',
    items: ['Zoom! Teeth Whitening', 'Porcelain Veneers', 'Invisalign Clear Aligners', 'Smile Makeovers', 'Dental Bonding', 'Gum Contouring'],
    path: '/services/cosmetic',
    color: 'from-secondary/10 to-secondary/5',
  },
  {
    title: 'Restorative Dentistry',
    description: "Crowns, bridges, implants, dentures, root canals, and full mouth rehabilitation. We'll restore your smile and your confidence — no matter where you're starting from.",
    items: ['Dental Crowns', 'Bridges', 'Dental Implants', 'Dentures', 'Root Canal Therapy', 'Full Mouth Rehabilitation'],
    path: '/services/restorative',
    color: 'from-accent/10 to-accent/5',
  },
  {
    title: 'Orthodontics',
    description: 'Traditional metal braces, ceramic braces, and Invisalign for all ages. A straight smile is possible at any age, and our payment plans make it affordable.',
    items: ['Traditional Metal Braces', 'Ceramic Braces', 'Invisalign', 'Retainers', 'Child & Teen Orthodontics', 'Adult Orthodontics'],
    path: '/services/orthodontics',
    color: 'from-chart-4/10 to-chart-4/5',
  },
];

export default function Services() {
  return (
    <div>
      {/* Header */}
      <section className="bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-3xl">
            <p className="text-secondary font-medium text-sm uppercase tracking-wider mb-3">Our Services</p>
            <h1 className="font-heading text-4xl md:text-5xl text-foreground mb-6">
              Complete Dental Care for the Whole Family
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-4">
              From routine cleanings to complete smile transformations, we offer comprehensive dental care 
              under one roof. Every treatment comes with clear pricing, financing options, and a compassionate 
              team that speaks your language.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-sm text-primary">
                <Heart className="w-4 h-4" />
                <span>Judgment-Free Care</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-secondary">
                <Globe className="w-4 h-4" />
                <span>Hablamos Español</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 space-y-8">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                to={service.path}
                className={`group block p-8 md:p-12 rounded-3xl bg-gradient-to-br ${service.color} border border-border hover:shadow-xl transition-all duration-300`}
              >
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h2 className="font-heading text-3xl text-foreground mb-4 group-hover:text-primary transition-colors">
                      {service.title}
                    </h2>
                    <p className="text-muted-foreground leading-relaxed mb-6">{service.description}</p>
                    <div className="flex items-center text-primary font-medium group-hover:gap-3 gap-2 transition-all">
                      <span>View All Services</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {service.items.map((item) => (
                      <div key={item} className="flex items-center gap-2 text-sm text-foreground/80">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Financing CTA */}
      <section className="py-16 bg-primary/5">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl text-foreground mb-4">Worried About Cost?</h2>
          <p className="text-muted-foreground mb-8">
            We offer flexible financing options for all treatments. Don't let cost keep you from getting the care you deserve. Let's find a plan that works for you.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/financing">
              <Button size="lg" className="bg-primary hover:bg-primary/90 rounded-full px-8 font-semibold">
                View Financing Options
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="rounded-full px-8 font-semibold border-primary/30 text-primary">
                Book a Free Consultation
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}