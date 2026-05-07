import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { MapPin, Clock, CheckCircle, Phone } from 'lucide-react';
import { motion } from 'framer-motion';

const faqs = [
  {
    q: "What services do you offer for new patients near Green Ridge North?",
    a: "We offer everything from routine cleanings and exams to crowns, fillings, and cosmetic consultations."
  },
  {
    q: "Is it possible to be seen the same day for a dental issue?",
    a: "Yes. We try to accommodate same-day visits whenever possible, especially for urgent concerns."
  },
  {
    q: "Do you provide dental care for the whole family?",
    a: "Yes, we see patients of all ages, including children and teens."
  },
  {
    q: "What are my options if I'm paying out of pocket?",
    a: "We offer affordable exam options and payment plans, and we'll go over costs with you before treatment begins."
  },
];

export default function GreenRidgeNorth() {
  return (
    <div>
      {/* Header */}
      <section className="bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-3xl">
            <Link to="/service-areas" className="text-primary text-sm font-medium hover:underline mb-4 inline-block">← All Service Areas</Link>
            <h1 className="font-heading text-4xl md:text-5xl text-foreground mb-6">Dentist Near Green Ridge North, Houston TX</h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              If you live in Green Ridge North, Greenspoint Dental is about a mile away. Most patients reach us in under five minutes 
              using local roads, without needing to get on the freeway.
            </p>
          </div>
        </div>
      </section>

      {/* Distance highlights */}
      <div className="bg-primary/5 py-6">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center gap-8">
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="w-4 h-4 text-primary" />
            <span>About a mile away</span>
          </div>
          <div className="text-border">|</div>
          <div className="flex items-center gap-2 text-sm">
            <Clock className="w-4 h-4 text-secondary" />
            <span>About 5 minutes</span>
          </div>
          <div className="text-border">|</div>
          <div className="flex items-center gap-2 text-sm">
            <Phone className="w-4 h-4 text-accent" />
            <span className="text-primary font-medium">(281) 823-9987</span>
          </div>
        </div>
      </div>

      {/* Content sections */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="space-y-12">
            {/* Convenience */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-heading text-3xl text-foreground mb-4">A Convenient Local Dentist, Not Across Town</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Having a dentist close by makes it much easier to stay on top of your dental care. It also makes a difference 
                when something starts bothering you and you want it checked quickly.
              </p>
              <div className="space-y-2 text-muted-foreground">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <strong>About 5 minutes away</strong> from Green Ridge North
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <strong>Free, easy parking</strong> right in front of our office
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <strong>Simple neighborhood routes</strong> — no freeway needed
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Family care */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-heading text-3xl text-foreground mb-4">Dental Care for the Whole Family</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Most patients who come in are dealing with one of two things — either staying on top of routine care or fixing something that's already started to go wrong.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 rounded-xl bg-card border border-border">
                  <h3 className="font-semibold text-foreground mb-2">Routine Care</h3>
                  <p className="text-sm text-muted-foreground">Exams, digital X-rays, and cleanings that help prevent bigger issues from developing.</p>
                </div>
                <div className="p-6 rounded-xl bg-card border border-border">
                  <h3 className="font-semibold text-foreground mb-2">Restorative Solutions</h3>
                  <p className="text-sm text-muted-foreground">Treating cavities, restoring damaged teeth with crowns, and replacing missing teeth.</p>
                </div>
                <div className="p-6 rounded-xl bg-card border border-border">
                  <h3 className="font-semibold text-foreground mb-2">Smile Improvements</h3>
                  <p className="text-sm text-muted-foreground">Whitening, veneers, and Invisalign consultations for those who want to improve their smile.</p>
                </div>
                <div className="p-6 rounded-xl bg-card border border-border">
                  <h3 className="font-semibold text-foreground mb-2">Pediatric Care</h3>
                  <p className="text-sm text-muted-foreground">Straightforward, low-stress visits so kids can build good habits early.</p>
                </div>
              </div>
            </motion.div>

            {/* Emergency care */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-heading text-3xl text-foreground mb-4">If Something Goes Wrong, We're Here for That Too</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Things don't always go to plan with your teeth. If something changes suddenly, pain, swelling, or damage, it's worth getting it looked at quickly.
              </p>
              <div className="bg-primary/5 p-6 rounded-xl mb-6">
                <p className="text-foreground font-medium mb-3">If you're dealing with:</p>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Ongoing tooth pain</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Visible swelling</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>A broken or sensitive tooth</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>A missing crown or filling</span>
                  </li>
                </ul>
              </div>
              <p className="text-muted-foreground">
                Call us, and we'll do our best to see you the same day. Once you're in, the first step is always to address the immediate issue. 
                After that, we'll explain what caused it, your options, and what each option entails so you can make an informed decision.
              </p>
            </motion.div>

            {/* Pricing */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-heading text-3xl text-foreground mb-4">Straightforward Pricing & Payment Options</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                We believe dental care should be easy to understand, especially when it comes to pricing. That's why we keep everything upfront.
              </p>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="p-6 rounded-xl bg-secondary/10 border border-secondary/20">
                  <p className="text-3xl font-heading font-bold text-secondary mb-2">$39</p>
                  <p className="font-semibold text-foreground mb-1">Exam & X-Ray</p>
                  <p className="text-sm text-muted-foreground">Special offer for new patients</p>
                </div>
                <div className="p-6 rounded-xl bg-primary/10 border border-primary/20">
                  <p className="text-3xl font-heading font-bold text-primary mb-2">$99</p>
                  <p className="font-semibold text-foreground mb-1">New Patient Package</p>
                  <p className="text-sm text-muted-foreground">Includes exam, X-rays, and cleaning</p>
                </div>
              </div>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <span>Payment plans available</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <span>Most PPO insurance accepted</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <span>There are no surprises. You'll know what to expect before treatment begins.</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 bg-muted/50">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="font-heading text-3xl text-foreground mb-8 text-center">Questions Patients Often Ask</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="p-6 rounded-xl bg-card border border-border"
              >
                <h3 className="font-semibold text-foreground mb-2">{faq.q}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-background">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl text-foreground mb-4">A Local Dentist You Can Rely On</h2>
          <p className="text-muted-foreground mb-8">
            If you're near Green Ridge North, we're just a short drive away. Call or book online.
          </p>
          <Link to="/contact">
            <Button size="lg" className="bg-primary hover:bg-primary/90 rounded-full px-8 font-semibold">
              Book Your Appointment
            </Button>
          </Link>
        </div>
      </section>

      {/* Schema markup */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "Greenspoint Dental - Green Ridge North",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "12523 Greenspoint Dr",
            "addressLocality": "Houston",
            "addressRegion": "TX",
            "postalCode": "77060"
          },
          "telephone": "(281) 823-9987",
          "serviceArea": {
            "@type": "GeoCircle",
            "geoMidpoint": {
              "@type": "GeoCoordinates",
              "latitude": 29.87,
              "longitude": -95.24
            },
            "geoRadius": "1 mile"
          }
        })}
      </script>
    </div>
  );
}