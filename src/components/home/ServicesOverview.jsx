import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const services = [
  {
    title: 'General Dentistry',
    description: 'Routine checkups, cleanings, fillings, and preventive care to keep your smile healthy. We make every visit comfortable and anxiety-free.',
    path: '/services/general',
    color: 'bg-primary/10 text-primary',
  },
  {
    title: 'Cosmetic Dentistry',
    description: 'Teeth whitening, veneers, smile makeovers, and more. A beautiful smile can change how you feel about yourself — let us help you get there.',
    path: '/services/cosmetic',
    color: 'bg-secondary/10 text-secondary',
  },
  {
    title: 'Restorative Dentistry',
    description: "Crowns, bridges, implants, dentures, and root canals. We'll restore your smile and your confidence — no judgment, just results.",
    path: '/services/restorative',
    color: 'bg-accent/10 text-accent',
  },
  {
    title: 'Orthodontics',
    description: 'Traditional braces and Invisalign for children and adults. Affordable payment plans make a straight smile possible for everyone.',
    path: '/services/orthodontics',
    color: 'bg-chart-4/10 text-chart-4',
  },
];

export default function ServicesOverview() {
  return (
    <section className="py-20 bg-muted/50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-14">
          <p className="text-secondary font-medium text-sm uppercase tracking-wider mb-3">Our Services</p>
          <h2 className="font-heading text-3xl md:text-4xl text-foreground mb-4">
            Complete Dental Care Under One Roof
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From routine cleanings to full smile transformations, we offer affordable care for every member of your family. 
            Financing options available for all treatments.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
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
                className="group block p-8 rounded-2xl bg-card border border-border hover:shadow-xl hover:border-primary/20 transition-all duration-300 h-full"
              >
                <div className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold mb-4 ${service.color}`}>
                  {service.title}
                </div>
                <h3 className="font-heading text-2xl text-foreground mb-3 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-5">{service.description}</p>
                <div className="flex items-center text-primary font-medium text-sm group-hover:gap-3 gap-2 transition-all">
                  <span>Learn More</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}