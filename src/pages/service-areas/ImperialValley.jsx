import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { MapPin, Clock, CheckCircle, Phone } from 'lucide-react';
import { motion } from 'framer-motion';

const faqs = [
  {
    q: "Do you offer general dental checkups and cleanings?",
    a: "Yes. Most visits are routine, including cleanings, exams, and catching issues early before they become more serious."
  },
  {
    q: "How quickly can I be seen if I have tooth pain?",
    a: "We do our best to offer same-day appointments whenever possible. Call us and we'll try to get you in as soon as we can."
  },
  {
    q: "Do you see both adults and children?",
    a: "Yes, we provide dental care for the whole family, including pediatric visits."
  },
  {
    q: "Can I come in if I don't have dental insurance?",
    a: "Absolutely. We see many patients without insurance and offer clear pricing along with payment plan options."
  },
];

export default function ImperialValley() {
  return (
    <div>
      {/* Header */}
      <section className="bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-3xl">
            <Link to="/service-areas" className="text-primary text-sm font-medium hover:underline mb-4 inline-block">← All Service Areas</Link>
            <h1 className="font-heading text-4xl md:text-5xl text-foreground mb-6">Dentist Near Imperial Valley, Houston TX</h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              If you're near Imperial Valley Drive, finding a dentist close by makes staying on top of your dental care much easier. 
              Greenspoint Dental is less than two miles away, typically about a five-minute drive with no freeway needed.
            </p>
          </div>
        </div>
      </section>

      {/* Distance highlights */}
      <div className="bg-primary/5 py-6">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center gap-8">
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="w-4 h-4 text-primary" />
            <span>Less than 2 miles away</span>
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
              <h2 className="font-heading text-3xl text-foreground mb-4">A Convenient Local Dentist — Not Across Town</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                When you're choosing a dentist, convenience matters more than anything. Whether it's a routine cleaning or something 
                that needs attention quickly, having a nearby office makes it much easier to stay on top of your dental health.
              </p>
              <div className="space-y-2 text-muted-foreground">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <strong>About 5 minutes away</strong> from most of Imperial Valley Drive
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
                    <strong>No freeway driving required</strong> — simple, direct route
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
                Instead of separating everything into strict categories, we focus on the kind of care most patients actually need day to day.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 rounded-xl bg-card border border-border">
                  <h3 className="font-semibold text-foreground mb-2">Routine Care</h3>
                  <p className="text-sm text-muted-foreground">Exams, X-rays, and cleanings that help catch problems early before they turn into something more serious or more expensive.</p>
                </div>
                <div className="p-6 rounded-xl bg-card border border-border">
                  <h3 className="font-semibold text-foreground mb-2">Restorative Treatments</h3>
                  <p className="text-sm text-muted-foreground">Fillings, crowns, and other treatments to restore function and protect your teeth long-term.</p>
                </div>
                <div className="p-6 rounded-xl bg-card border border-border">
                  <h3 className="font-semibold text-foreground mb-2">Cosmetic Options</h3>
                  <p className="text-sm text-muted-foreground">Whitening, veneers, or Invisalign for patients interested in improving how their smile looks.</p>
                </div>
                <div className="p-6 rounded-xl bg-card border border-border">
                  <h3 className="font-semibold text-foreground mb-2">Family-Friendly</h3>
                  <p className="text-sm text-muted-foreground">Children's visits handled with a calm, straightforward approach so they feel comfortable from the start.</p>
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
                Dental problems rarely stay the same—they usually get worse over time if left alone. That's why it helps to act early when something doesn't feel right.
              </p>
              <div className="bg-primary/5 p-6 rounded-xl mb-6">
                <p className="text-foreground font-medium mb-3">Common reasons patients call us:</p>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Increasing tooth pain</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Swelling or tenderness</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Damage to a tooth</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>A restoration that's come loose</span>
                  </li>
                </ul>
              </div>
              <p className="text-muted-foreground">
                When you call, we'll assess the situation and aim to get you in as soon as possible. The focus is always the same: 
                deal with the immediate problem first, then give you a clear understanding of what needs attention next.
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
                For most patients, cost is one of the biggest concerns when booking a dental visit. We keep things straightforward so you're not left guessing.
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
                  <span>Before anything is done, we'll explain costs clearly so you can decide how to proceed</span>
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
            Whether you need a checkup or want to take care of a problem tooth, we're close by and easy to schedule with.
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
          "name": "Greenspoint Dental - Imperial Valley",
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
              "latitude": 29.85,
              "longitude": -95.25
            },
            "geoRadius": "2 miles"
          }
        })}
      </script>
    </div>
  );
}