import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CheckCircle, Heart, Globe, DollarSign, Shield, Smile, Download } from 'lucide-react';
import { motion } from 'framer-motion';

const steps = [
  {
    number: '01',
    title: 'Schedule Your Visit',
    description: "Call us at (281) 823-9987 or fill out our online form. Our bilingual team will find a time that works for you. We'll answer any questions you have upfront.",
  },
  {
    number: '02',
    title: 'Your First Appointment',
    description: "We start with digital X-rays and a thorough exam. We'll take the time to listen to your concerns and understand your dental history — without any judgment.",
  },
  {
    number: '03',
    title: 'Clear Treatment Plan',
    description: "If treatment is needed, we'll explain every option in plain language and show you the costs upfront. We'll work with your insurance and discuss financing if needed.",
  },
  {
    number: '04',
    title: 'Start Your Journey',
    description: "Whether it's a cleaning, a filling, or a smile makeover — we'll make sure you're comfortable every step of the way. Your new smile journey begins here.",
  },
];

export default function NewPatients() {
  return (
    <div>
      {/* Header */}
      <section className="relative bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-16 md:py-24 overflow-hidden">
        <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" preserveAspectRatio="xMidYMid slice">
          <defs>
            <pattern id="floral-pattern" patternUnits="userSpaceOnUse" width="200" height="200">
              {/* Intricate floral design */}
              <circle cx="100" cy="100" r="8" fill="currentColor" className="text-primary/40" />
              <circle cx="80" cy="90" r="5" fill="currentColor" className="text-primary/30" />
              <circle cx="120" cy="90" r="5" fill="currentColor" className="text-primary/30" />
              <circle cx="75" cy="110" r="4" fill="currentColor" className="text-primary/35" />
              <circle cx="125" cy="110" r="4" fill="currentColor" className="text-primary/35" />
              <circle cx="100" cy="130" r="5" fill="currentColor" className="text-primary/30" />
              
              {/* Petals pattern */}
              <path d="M 100 80 Q 90 95 100 110 Q 110 95 100 80" fill="currentColor" className="text-primary/25" />
              <path d="M 120 100 Q 135 90 120 80 Q 110 90 120 100" fill="currentColor" className="text-primary/25" />
              <path d="M 80 100 Q 65 90 80 80 Q 90 90 80 100" fill="currentColor" className="text-primary/25" />
              <path d="M 100 120 Q 90 105 80 120 Q 90 130 100 120" fill="currentColor" className="text-primary/25" />
              <path d="M 100 120 Q 110 105 120 120 Q 110 130 100 120" fill="currentColor" className="text-primary/25" />
              
              {/* Decorative flourishes */}
              <path d="M 50 50 Q 60 45 70 50 Q 65 55 50 50" stroke="currentColor" className="text-primary/20" strokeWidth="1" fill="none" />
              <path d="M 150 150 Q 160 145 170 150 Q 165 155 150 150" stroke="currentColor" className="text-primary/20" strokeWidth="1" fill="none" />
              <circle cx="40" cy="160" r="3" fill="currentColor" className="text-primary/25" />
              <circle cx="160" cy="40" r="3" fill="currentColor" className="text-primary/25" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#floral-pattern)" />
        </svg>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-secondary font-medium text-sm uppercase tracking-wider mb-3">New Patients</p>
              <h1 className="font-heading text-4xl md:text-5xl text-foreground mb-6">
                Welcome — We're Glad You're Here
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Whether it's been six months or six years since your last dental visit, you're welcome here. 
                No lectures, no judgment — just a fresh start for your smile. Our bilingual team will make 
                you feel right at home from your very first call.
              </p>
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-8">
                <Globe className="w-4 h-4" />
                <span>Hablamos Español — Our staff speaks fluent Spanish</span>
              </div>
              <div className="flex flex-wrap gap-4">
                <Link to="/contact">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 rounded-full px-8 font-semibold">
                    Schedule Your First Visit
                  </Button>
                </Link>
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <img
                src="https://media.base44.com/images/public/69e928fd4b865057d3a65de3/a17d49ce0_generated_image.png"
                alt="Happy family with healthy smiles"
                className="rounded-3xl shadow-xl w-full"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Special offer */}
      <section className="py-16 bg-secondary/10">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl text-foreground mb-2">New Patient Special</h2>
          <p className="text-6xl font-heading font-bold text-primary my-4">$99</p>
          <p className="text-xl text-muted-foreground mb-2">Comprehensive Exam, Full X-Rays & Professional Cleaning</p>
          <p className="text-sm text-muted-foreground mb-8">No hidden costs. No surprises. Just great care at a fair price.</p>
          <Link to="/contact">
            <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground rounded-full px-10 font-semibold">
              Claim This Offer
            </Button>
          </Link>
        </div>
      </section>

      {/* What to Expect */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <p className="text-secondary font-medium text-sm uppercase tracking-wider mb-3">What to Expect</p>
            <h2 className="font-heading text-3xl md:text-4xl text-foreground mb-4">
              Your First Visit, Step by Step
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We've designed our process to be straightforward and stress-free. Here's exactly what happens when you visit us for the first time.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="relative"
              >
                <span className="text-6xl font-heading font-bold text-primary/10">{step.number}</span>
                <h3 className="font-heading text-xl text-foreground mb-3 -mt-4">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Promises */}
      <section className="py-20 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="font-heading text-3xl md:text-4xl text-foreground mb-4">
              Our Promise to You
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { icon: Heart, title: "No Judgment", text: "We don't care how long it's been. We care about helping you move forward." },
              { icon: DollarSign, title: "Transparent Pricing", text: "You'll know exactly what things cost before any work begins. No surprise bills." },
              { icon: Globe, title: "Bilingual Communication", text: "Our team speaks English and Spanish fluently. Communicate in the language you're most comfortable with." },
              { icon: Shield, title: "Your Comfort Matters", text: "Warm blankets, music, sedation options — we do whatever it takes to help you relax." },
              { icon: Smile, title: "Honest Recommendations", text: "We only recommend what you truly need. No upselling, no unnecessary procedures." },
              { icon: CheckCircle, title: "Flexible Payment", text: "Multiple financing options and payment plans so cost doesn't get in the way of your health." },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex items-start gap-4 p-6 rounded-2xl bg-card border border-border"
              >
                <item.icon className="w-6 h-6 text-primary shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* New Patient Forms */}
      <section className="py-20 bg-muted/50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-14">
            <p className="text-secondary font-medium text-sm uppercase tracking-wider mb-3">Before Your Visit</p>
            <h2 className="font-heading text-3xl md:text-4xl text-foreground mb-4">
              New Patient Forms
            </h2>
            <p className="text-muted-foreground">
              Please download and complete these forms before your first appointment. You can bring them with you or fill them out when you arrive.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              { name: 'Patient Information', url: 'https://greenspointdental.com/app/uploads/2024/04/patient-information.pdf' },
              { name: 'Medical History Form', url: 'https://greenspointdental.com/app/uploads/2024/04/medical-history-form.pdf' },
              { name: 'Informed Consent for Treatment', url: 'https://greenspointdental.com/app/uploads/2024/04/INFORMED-CONSENT-FOR-TREATMENT.pdf' },
              { name: 'Acknowledgement of Receipt', url: 'https://greenspointdental.com/app/uploads/2024/04/acknowledgement-of-receipt.pdf' },
              { name: 'Privacy Policy', url: 'https://greenspointdental.com/app/uploads/2024/04/privacy.pdf' },
            ].map((form, i) => (
              <motion.a
                key={form.name}
                href={form.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="p-6 rounded-2xl bg-card border border-border hover:shadow-lg hover:border-primary/20 transition-all flex items-center gap-4 group"
              >
                <Download className="w-6 h-6 text-primary shrink-0 group-hover:scale-110 transition-transform" />
                <div className="text-left">
                  <p className="font-medium text-foreground">{form.name}</p>
                  <p className="text-xs text-muted-foreground">PDF Download</p>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-background">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl text-foreground mb-4">Ready to Get Started?</h2>
          <p className="text-muted-foreground mb-8">
            Take the first step toward a healthier smile. Your first consultation is complimentary, and our team will help you every step of the way. Se habla español.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="tel:2818239987">
              <Button size="lg" className="bg-primary hover:bg-primary/90 rounded-full px-8 font-semibold">
                Call (281) 823-9987
              </Button>
            </a>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="rounded-full px-8 font-semibold border-primary/30 text-primary">
                Book Online
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}