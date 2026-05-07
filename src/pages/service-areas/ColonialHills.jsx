import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { MapPin, Clock, CheckCircle, Phone } from 'lucide-react';
import { motion } from 'framer-motion';

const faqs = [
  {
    q: "What dental services are available near Colonial Hills?",
    a: "We provide preventive care, restorative treatments like fillings and crowns, and cosmetic options, all in one place."
  },
  {
    q: "Can I get a same-day appointment if I'm in pain?",
    a: "Yes. If you're dealing with tooth pain or a dental issue, call us, and we'll do our best to see you the same day."
  },
  {
    q: "Do you treat children as well as adults?",
    a: "We do. Family dentistry is a big part of our practice, including care for kids."
  },
  {
    q: "What if I don't have dental insurance?",
    a: "That's not a problem. We offer straightforward pricing and payment plans to make care more manageable."
  },
];

export default function ColonialHills() {
  return (
    <div>
      {/* Header */}
      <section className="bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-3xl">
            <Link to="/service-areas" className="text-primary text-sm font-medium hover:underline mb-4 inline-block">← All Service Areas</Link>
            <h1 className="font-heading text-4xl md:text-5xl text-foreground mb-6">Dentist Near Colonial Hills, Houston TX</h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              If you live in Colonial Hills on Henry Road, Greenspoint Dental is about a five-minute drive, roughly 1.5 miles via Beltway 8. 
              Our main office is in Greenspoint, where we provide full-service dental care to patients throughout the area.
            </p>
          </div>
        </div>
      </section>

      {/* Distance highlights */}
      <div className="bg-primary/5 py-6">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center gap-8">
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="w-4 h-4 text-primary" />
            <span>Around 1.5 miles away</span>
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
                When a dentist is nearby, it's much easier to stay consistent with your care and much less stressful when something needs attention quickly.
              </p>
              <div className="space-y-2 text-muted-foreground">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <strong>About 5 minutes away</strong> from Colonial Hills via Beltway 8
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
                    <strong>Direct route via Beltway 8</strong> — quick and straightforward
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
                We see a wide range of patients from the surrounding area, and the care we provide reflects that.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 rounded-xl bg-card border border-border">
                  <h3 className="font-semibold text-foreground mb-2">Preventive Care</h3>
                  <p className="text-sm text-muted-foreground">Simple cleanings, exams, making sure everything is in good shape and preventing problems.</p>
                </div>
                <div className="p-6 rounded-xl bg-card border border-border">
                  <h3 className="font-semibold text-foreground mb-2">Restorative Treatments</h3>
                  <p className="text-sm text-muted-foreground">Fillings, crowns, and bridges for treating cavities, worn, or broken teeth.</p>
                </div>
                <div className="p-6 rounded-xl bg-card border border-border">
                  <h3 className="font-semibold text-foreground mb-2">Cosmetic Dentistry</h3>
                  <p className="text-sm text-muted-foreground">Whitening, veneers, and Invisalign for those who want to improve how their smile looks.</p>
                </div>
                <div className="p-6 rounded-xl bg-card border border-border">
                  <h3 className="font-semibold text-foreground mb-2">Family Care</h3>
                  <p className="text-sm text-muted-foreground">Children's visits handled with patience and clarity so both kids and parents feel comfortable.</p>
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
                Not every dental visit is planned. Sometimes something starts bothering you and you just need to get it checked.
              </p>
              <div className="bg-primary/5 p-6 rounded-xl mb-6">
                <p className="text-foreground font-medium mb-3">Common reasons people call us:</p>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Toothaches that are getting worse</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Swelling or irritation in the gums</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Broken or damaged teeth</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Crowns or fillings that have come out</span>
                  </li>
                </ul>
              </div>
              <p className="text-muted-foreground">
                When that happens, call us. We set aside time each day for situations like this and will try to see you as soon as possible. 
                From there, we focus on getting you comfortable and explaining what needs to be done in a straightforward way.
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
                A lot of people delay dental care because they're unsure what it's going to cost. We try to remove that uncertainty.
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
                  <span>Everything is discussed in advance so you can make a decision that works for you</span>
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
            If you're in Colonial Hills and looking for a nearby dentist, give us a call or book online.
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
          "name": "Greenspoint Dental - Colonial Hills",
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
              "latitude": 29.83,
              "longitude": -95.23
            },
            "geoRadius": "1.5 miles"
          }
        })}
      </script>
    </div>
  );
}