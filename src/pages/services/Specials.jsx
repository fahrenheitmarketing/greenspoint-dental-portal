import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CheckCircle, Sparkles, Star, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const VENEER_IMAGE = "https://media.base44.com/images/public/69e928fd4b865057d3a65de3/a0da5b2e7_generated_image.png";
const ORTHO_IMAGE = "https://media.base44.com/images/public/69e928fd4b865057d3a65de3/9f231d14f_generated_image.png";

const veneerPackages = [
  {
    label: 'Set of 4',
    price: '$2,500',
    note: '$625 per veneer',
    description: 'Perfect for refreshing your front four teeth — the ones that show most when you smile.',
  },
  {
    label: 'Set of 6',
    price: '$3,750',
    note: '$625 per veneer',
    description: 'Our most popular package. Covers your full smile zone for a completely transformed look.',
  },
];

const veneerBenefits = [
  'Natural-looking, stain-resistant porcelain',
  'Results that last 10–15 years with proper care',
  'Covers chips, gaps, discoloration & uneven teeth',
  'Minimal enamel removal — conservative procedure',
  'Custom-shaded to match your skin tone & face',
];

const orthoBenefits = [
  'Traditional metal braces starting at $3,850',
  'Flexible payment plans available',
  'Free orthodontic consultation included',
  'Treatment typically 12–24 months',
  'Retainers included at end of treatment',
  'Bilingual team — se habla español',
];

export default function Specials() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-secondary/10 text-secondary text-sm font-semibold px-4 py-2 rounded-full mb-6">
            <Sparkles className="w-4 h-4" />
            Limited-Time Offers
          </div>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-foreground mb-6 leading-tight">
            Smile Transformations<br />at Prices That Make Sense
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            We believe everyone deserves a smile they're proud of. These specials are our way of making high-quality cosmetic and orthodontic care truly accessible — no compromises, no hidden fees.
          </p>
          <Link to="/contact">
            <Button size="lg" className="bg-primary hover:bg-primary/90 rounded-full px-8 font-semibold gap-2">
              Claim Your Special Today <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Veneers Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-2 lg:order-1"
            >
              <div className="inline-flex items-center gap-2 bg-secondary/10 text-secondary text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
                <Star className="w-3.5 h-3.5" /> Featured Special
              </div>
              <h2 className="font-heading text-3xl md:text-4xl text-foreground mb-4">
                Porcelain Veneers — <span className="text-primary">$625 Each</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Porcelain veneers are one of the most powerful tools in cosmetic dentistry — ultra-thin, custom-crafted shells that bond to the front of your teeth to create a flawless, natural-looking smile. Whether you're dealing with staining that whitening can't fix, chips, gaps, or teeth that just never looked quite right, veneers can correct it all in as few as two visits.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8">
                At Greenspoint Dental, we price our veneers at <strong className="text-foreground">$625 per veneer</strong> — significantly below the Houston market average — because we believe a beautiful smile shouldn't require a second mortgage.
              </p>

              {/* Packages */}
              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                {veneerPackages.map((pkg) => (
                  <div key={pkg.label} className="border-2 border-primary/20 rounded-2xl p-5 bg-primary/5 hover:border-primary/40 transition-colors">
                    <p className="font-heading text-lg text-foreground mb-1">{pkg.label}</p>
                    <p className="text-3xl font-bold text-primary mb-1">{pkg.price}</p>
                    <p className="text-xs text-muted-foreground mb-3">{pkg.note}</p>
                    <p className="text-sm text-muted-foreground">{pkg.description}</p>
                  </div>
                ))}
              </div>

              {/* Benefits */}
              <ul className="space-y-2.5 mb-8">
                {veneerBenefits.map((b) => (
                  <li key={b} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                    <CheckCircle className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    {b}
                  </li>
                ))}
              </ul>

              <Link to="/contact">
                <Button className="bg-primary hover:bg-primary/90 rounded-full px-8 font-semibold gap-2">
                  Book a Free Veneer Consultation <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2"
            >
              <img
                src={VENEER_IMAGE}
                alt="Beautiful smile after porcelain veneers"
                className="rounded-3xl shadow-2xl w-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-4">
        <hr className="border-border" />
      </div>

      {/* Orthodontics Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <img
                src={ORTHO_IMAGE}
                alt="Happy teen and mom smiling with braces"
                className="rounded-3xl shadow-2xl w-full object-cover"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 bg-secondary/10 text-secondary text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
                <Star className="w-3.5 h-3.5" /> Family Special
              </div>
              <h2 className="font-heading text-3xl md:text-4xl text-foreground mb-4">
                Orthodontics — <span className="text-primary">Starting at $3,850</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                A straight smile isn't just about looks — it's about confidence, health, and function. Properly aligned teeth are easier to clean, less prone to wear, and can prevent jaw problems down the line. And for teenagers especially, that confident smile can change everything.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Our orthodontic services start at just <strong className="text-foreground">$3,850</strong> — and with flexible payment plans, we can break that into manageable monthly payments that fit your family's budget. No need to put it off any longer. The best time to start is now.
              </p>

              <ul className="space-y-2.5 mb-8">
                {orthoBenefits.map((b) => (
                  <li key={b} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                    <CheckCircle className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    {b}
                  </li>
                ))}
              </ul>

              <div className="bg-secondary/5 border border-secondary/20 rounded-2xl p-5 mb-8">
                <p className="text-sm text-foreground font-medium mb-1">💡 Pro tip for parents:</p>
                <p className="text-sm text-muted-foreground">The American Association of Orthodontists recommends children have their first orthodontic evaluation by age 7 — even before all permanent teeth come in. Early assessment means more options and often simpler treatment.</p>
              </div>

              <Link to="/contact">
                <Button className="bg-primary hover:bg-primary/90 rounded-full px-8 font-semibold gap-2">
                  Schedule a Free Ortho Consultation <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-primary/5">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl md:text-4xl text-foreground mb-4">
            Not Sure Which Option Is Right for You?
          </h2>
          <p className="text-muted-foreground mb-8 text-lg">
            Come in for a free consultation and we'll walk you through everything — with no pressure and no surprises. Our team speaks English and Spanish, and we're here to help you make the best decision for your smile and your budget.
          </p>
          <Link to="/contact">
            <Button size="lg" className="bg-primary hover:bg-primary/90 rounded-full px-10 font-semibold">
              Book Your Free Consultation
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}