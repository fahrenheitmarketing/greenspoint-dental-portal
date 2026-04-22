import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CreditCard, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const benefits = [
  'Low monthly payment plans',
  'CareCredit & HELPcard accepted',
  'Most insurance plans accepted',
  'No-interest financing available',
  'Transparent pricing — no surprises',
  'Payment plans for major treatments',
];

export default function FinancingBanner() {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative bg-gradient-to-br from-primary to-primary/80 rounded-3xl p-10 md:p-16 text-primary-foreground overflow-hidden"
        >
          <svg className="absolute inset-0 w-full h-full opacity-80 pointer-events-none rounded-3xl" preserveAspectRatio="xMidYMid slice">
            <defs>
              <pattern id="floral-pattern-financing" patternUnits="userSpaceOnUse" width="200" height="200">
                <circle cx="100" cy="100" r="8" fill="white" opacity="0.6" />
                <circle cx="80" cy="90" r="5" fill="white" opacity="0.5" />
                <circle cx="120" cy="90" r="5" fill="white" opacity="0.5" />
                <circle cx="75" cy="110" r="4" fill="white" opacity="0.55" />
                <circle cx="125" cy="110" r="4" fill="white" opacity="0.55" />
                <circle cx="100" cy="130" r="5" fill="white" opacity="0.5" />
                <path d="M 100 80 Q 90 95 100 110 Q 110 95 100 80" fill="white" opacity="0.45" />
                <path d="M 120 100 Q 135 90 120 80 Q 110 90 120 100" fill="white" opacity="0.45" />
                <path d="M 80 100 Q 65 90 80 80 Q 90 90 80 100" fill="white" opacity="0.45" />
                <path d="M 100 120 Q 90 105 80 120 Q 90 130 100 120" fill="white" opacity="0.45" />
                <path d="M 100 120 Q 110 105 120 120 Q 110 130 100 120" fill="white" opacity="0.45" />
                <path d="M 50 50 Q 60 45 70 50 Q 65 55 50 50" stroke="white" opacity="0.4" strokeWidth="1" fill="none" />
                <path d="M 150 150 Q 160 145 170 150 Q 165 155 150 150" stroke="white" opacity="0.4" strokeWidth="1" fill="none" />
                <circle cx="40" cy="160" r="3" fill="white" opacity="0.45" />
                <circle cx="160" cy="40" r="3" fill="white" opacity="0.45" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#floral-pattern-financing)" />
          </svg>
          <div className="grid lg:grid-cols-2 gap-10 items-center relative z-10">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <CreditCard className="w-5 h-5" />
                <span className="text-sm font-medium text-primary-foreground/80 uppercase tracking-wider">Financing Options</span>
              </div>
              <h2 className="font-heading text-3xl md:text-4xl mb-4">
                Don't Let Cost Stop You From Getting the Care You Need
              </h2>
              <p className="text-primary-foreground/80 leading-relaxed mb-8">
                We understand that dental work can be expensive, especially for bigger treatments like braces, implants, or crowns. 
                That's why we offer multiple financing options to help spread the cost into manageable monthly payments. 
                Your health is too important to put on hold.
              </p>
              <Link to="/financing">
                <Button size="lg" className="bg-secondary hover:bg-secondary/80 text-secondary-foreground rounded-full px-8 font-semibold transition-all duration-200">
                  View All Financing Options
                </Button>
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {benefits.map((benefit) => (
                <div key={benefit} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                  <span className="text-sm text-primary-foreground/90">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}