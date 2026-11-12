import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Phone, Heart, Globe, Star } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-2xl sm:rounded-full text-sm md:text-base font-medium mb-6">
              <Globe className="w-4 h-4" />
              <span>Affordable Family Dentist in North Houston, TX</span>
            </h1>

            <p className="font-heading text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight mb-6">
              No Judgment.<span className="text-primary"> No Pressure.</span>
              <span className="text-primary"> Just Smiles.</span>
            </p>

            <p className="text-lg text-muted-foreground leading-relaxed mb-4 max-w-lg">
              Affordable, quality dental care for your whole family in Houston. We speak Spanish fluently, offer flexible financing, and welcome you no matter how long it's been since your last visit.
            </p>

            <div className="flex items-center gap-2 text-secondary font-medium mb-8">
              <Heart className="w-5 h-5" />
              <span>Trusted in Greenspoint Since 1997</span>
            </div>

            <div className="flex flex-wrap gap-4 mb-10">
              <Link to="/contact">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 text-base font-semibold">
                  Schedule Your Visit
                </Button>
              </Link>
              <span>
                <Button size="lg" variant="outline" className="rounded-full px-8 text-base font-semibold border-primary/30 text-primary pointer-events-none">
                  <Phone className="w-4 h-4 mr-2" />
                  (281) 823-9987
                </Button>
              </span>
            </div>

            <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <div className="flex">{[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-secondary text-secondary" />)}</div>
                <span className="font-medium">4.9 on Google</span>
              </div>
              <span className="text-border">|</span>
              <span>200+ verified reviews</span>
              <span className="text-border">|</span>
              <span>Serving Houston since 1997</span>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.2 }} className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img src="https://media.base44.com/images/public/69e928fd4b865057d3a65de3/9263aec0b_image.png" alt="Greenspoint Dental office building" className="w-full h-auto object-cover" />
            </div>
            <div className="absolute -bottom-4 -left-4 md:-left-8 bg-background rounded-2xl shadow-xl p-5 border border-border">
              <p className="text-sm font-semibold text-foreground">New Patient Special</p>
              <p className="text-3xl font-heading text-primary font-bold">$99</p>
              <p className="text-xs text-muted-foreground">Exam + X-Rays + Cleaning</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}