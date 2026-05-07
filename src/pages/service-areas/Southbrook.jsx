import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { MapPin, Clock, CheckCircle, Phone } from 'lucide-react';
import { motion } from 'framer-motion';

const faqs = [
  {
    q: "What kind of dental care do you provide to patients near Southbrook?",
    a: "We offer full-service dental care, including cleanings, exams, fillings, crowns, and cosmetic options for both adults and children."
  },
  {
    q: "If something goes wrong with my tooth, how soon can I come in?",
    a: "We keep same-day appointments available and will do our best to see you as quickly as possible."
  },
  {
    q: "Is this a good dentist for families?",
    a: "Yes. We regularly see both adults and children and aim to make visits comfortable for all ages."
  },
  {
    q: "Do I need insurance to book an appointment?",
    a: "No. We welcome patients with or without insurance and will explain costs before starting any treatment."
  },
];

export default function Southbrook() {
  return (
    <div>
      {/* Header */}
      <section className="bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-3xl">
            <Link to="/service-areas" className="text-primary text-sm font-medium hover:underline mb-4 inline-block">← All Service Areas</Link>
            <h1 className="font-heading text-4xl md:text-5xl text-foreground mb-6">Dentist Near Southbrook, Houston TX</h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Living in Southbrook means you're already very close to our office, and most patients are here in just a few minutes. 
              That makes it easier to fit dental visits into your routine without planning around a long drive.
            </p>
          </div>
        </div>
      </section>

      {/* Distance highlights */}
      <div className="bg-primary/5 py-6">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center gap-8">
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="w-4 h-4 text-primary" />
            <span>Under a mile away</span>
          </div>
          <div className="text-border">|</div>
          <div className="flex items-center gap-2 text-sm">
            <Clock className="w-4 h-4 text-secondary" />
            <span>2-5 minutes</span>
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
                When you're choosing a dentist, convenience matters more than most people expect. It's the difference between staying consistent 
                with your care and putting things off longer than you should.
              </p>
              <div className="space-y-2 text-muted-foreground">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <strong>Typically under 5 minutes away</strong> from anywhere in Southbrook
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
                    <strong>Simple route via I-45 service road</strong> — no complicated navigation
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
                Dental care usually falls into a few key areas, and we handle them all in one place.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 rounded-xl bg-card border border-border">
                  <h3 className="font-semibold text-foreground mb-2">Ongoing Care</h3>
                  <p className="text-sm text-muted-foreground">Regular exams, X-rays, and cleanings help keep things stable and prevent small issues from becoming bigger ones.</p>
                </div>
                <div className="p-6 rounded-xl bg-card border border-border">
                  <h3 className="font-semibold text-foreground mb-2">Repair & Restoration</h3>
                  <p className="text-sm text-muted-foreground">Fillings and crowns to restore function and protect your teeth long-term when damage occurs.</p>
                </div>
                <div className="p-6 rounded-xl bg-card border border-border">
                  <h3 className="font-semibold text-foreground mb-2">Smile Improvements</h3>
                  <p className="text-sm text-muted-foreground">Whitening, veneers, and Invisalign for patients interested in improving how their smile looks.</p>
                </div>
                <div className="p-6 rounded-xl bg-card border border-border">
                  <h3 className="font-semibold text-foreground mb-2">Family Care</h3>
                  <p className="text-sm text-muted-foreground">We treat children with patience and clarity so both kids and parents feel comfortable.</p>
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
                Even with regular checkups, dental issues can still happen — and when they do, timing matters.
              </p>
              <div className="bg-primary/5 p-6 rounded-xl mb-6">
                <p className="text-foreground font-medium mb-3">If you're experiencing:</p>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Persistent tooth pain</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Swelling or signs of infection</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>A chipped, cracked, or broken tooth</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>A loose or missing crown or filling</span>
                  </li>
                </ul>
              </div>
              <p className="text-muted-foreground">
                Give us a call. We keep same-day availability where possible and will do our best to fit you in quickly. 
                The priority is to stabilize the situation first, then walk you through the next steps clearly.
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
                We aim to keep dental care easy to understand, especially when it comes to cost.
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
                  <span>Everything is explained up front so you can decide what works for you</span>
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
            If you're near Southbrook and need a dentist, getting started is simple.
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
          "name": "Greenspoint Dental - Southbrook",
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
              "latitude": 29.86,
              "longitude": -95.27
            },
            "geoRadius": "1 mile"
          }
        })}
      </script>
    </div>
  );
}