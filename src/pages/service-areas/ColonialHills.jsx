import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { MapPin, Phone, Smile, ShieldCheck, CalendarCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import usePageMeta from '@/hooks/usePageMeta';
import InternalLinkHub from '@/components/seo/InternalLinkHub';

const TITLE = 'Family Dentist Near Colonial Hills, Houston TX - Greenspoint Dental';
const DESCRIPTION =
  'A kid friendly family dentist five minutes from Colonial Hills. Calm first visits, braces and aligners for teens, sports mouthguards and school forms signed at the visit.';

const FIRST_VISIT_STEPS = [
  {
    title: 'Ten minutes of nothing scary',
    text: 'We start with a chair that goes up and down, a mirror the child can hold, and a count of their teeth. No instruments until they are comfortable.',
  },
  {
    title: 'Show, then tell, then do',
    text: 'Every step gets demonstrated on their own hand first. Kids accept a cleaning far more easily once they know exactly what is coming next.',
  },
  {
    title: 'A parent in the room',
    text: 'You stay with your child the whole time. We explain what we see in plain words and what, if anything, needs watching before the next visit.',
  },
];

const ORTHO_POINTS = [
  { label: 'Braces', text: 'Metal or ceramic brackets for crowding and bite problems that need precise control.' },
  { label: 'Clear aligners', text: 'Removable trays for teens who keep up with them and have simpler corrections.' },
  { label: 'Typical timeline', text: 'Most teen cases run 18 to 24 months, with a free consultation and a written quote first.' },
  { label: 'Retainers', text: 'Included in the plan discussion so teeth do not drift back after the braces come off.' },
];

const FAQS = [
  {
    q: 'How old should my child be at the first dental visit?',
    a: 'Around the first birthday, or within six months of the first tooth appearing. Early visits are short and mostly about habits and comfort, so nothing feels overwhelming.',
  },
  {
    q: 'Can I book all my children on the same day?',
    a: 'Yes, and most Colonial Hills families do. Tell us how many children are coming when you book and we will block consecutive appointments so you make one trip.',
  },
  {
    q: 'Do you make sports mouthguards?',
    a: 'We do. A custom guard fits better than a boil and bite version and costs less than repairing a knocked out tooth. Bring it in for a check if your child plays football, basketball or soccer.',
  },
  {
    q: 'Will you sign school and daycare dental forms?',
    a: 'Yes. Bring the form to the appointment and we will complete and sign it before you leave, so it does not sit on your kitchen counter for a month.',
  },
];

export default function ColonialHills() {
  usePageMeta({ title: TITLE, description: DESCRIPTION });

  return (
    <div>
      {/* Header */}
      <section className="bg-gradient-to-br from-accent/10 via-background to-secondary/10 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <div className="max-w-3xl">
            <Link
              to="/service-areas"
              className="mb-4 inline-block text-sm font-medium text-primary hover:underline"
            >
              ← All Service Areas
            </Link>
            <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-1.5 font-body text-sm font-medium text-accent">
              <Smile className="h-4 w-4" />
              Built for families with kids in tow
            </p>
            <h1 className="mb-6 font-heading text-4xl text-foreground md:text-5xl">
              Family Dentist Near Colonial Hills, Houston TX
            </h1>
            <p className="font-body text-lg leading-relaxed text-muted-foreground">
              Most Colonial Hills households are juggling school runs, practice schedules and one
              child who is nervous about the dentist. Our office is about five minutes away along
              Beltway 8, and our whole approach is designed to make one trip cover the entire family.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <div className="border-b border-border bg-card py-6">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-8 gap-y-3 px-4 font-body text-sm">
          <span className="flex items-center gap-2 text-foreground">
            <MapPin className="h-4 w-4 text-accent" />
            About 5 minutes via Beltway 8
          </span>
          <span className="flex items-center gap-2 text-foreground">
            <CalendarCheck className="h-4 w-4 text-accent" />
            Siblings booked back to back
          </span>
          <span className="flex items-center gap-2 text-foreground">
            <ShieldCheck className="h-4 w-4 text-accent" />
            Free braces consultation
          </span>
          <span className="flex items-center gap-2 text-foreground">
            <Phone className="h-4 w-4 text-accent" />
            <a href="tel:+12818239987" className="font-medium text-primary hover:underline">
              (281) 823-9987
            </a>
          </span>
        </div>
      </div>

      {/* First visit */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="mb-3 font-heading text-3xl text-foreground">
            Your child's first visit, step by step
          </h2>
          <p className="mb-10 max-w-2xl font-body leading-relaxed text-muted-foreground">
            A bad first visit can follow a child for years. We keep it calm, we keep it short, and
            we never hold a child down to finish a cleaning.
          </p>
          <div className="grid gap-6 md:grid-cols-3">
            {FIRST_VISIT_STEPS.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="rounded-3xl bg-accent/5 p-6"
              >
                <span className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-accent/15 font-heading text-lg text-accent">
                  {index + 1}
                </span>
                <h3 className="mb-2 font-heading text-lg text-foreground">{step.title}</h3>
                <p className="font-body text-sm leading-relaxed text-muted-foreground">{step.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Ortho */}
      <section className="bg-muted/50 py-16 md:py-20">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="mb-3 font-heading text-3xl text-foreground">Braces for the teenage years</h2>
          <p className="mb-8 max-w-2xl font-body leading-relaxed text-muted-foreground">
            The orthodontic consult usually comes up in middle school, once the last baby teeth are
            gone. We offer braces and clear aligners in the same office as your family's cleanings,
            which saves a second set of appointments across town.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {ORTHO_POINTS.map((point) => (
              <div key={point.label} className="rounded-2xl border border-border bg-background p-5">
                <p className="mb-1 font-heading text-base text-foreground">{point.label}</p>
                <p className="font-body text-sm leading-relaxed text-muted-foreground">{point.text}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 font-body text-sm text-muted-foreground">
            <Link to="/services/orthodontics" className="font-medium text-primary hover:underline">
              See how orthodontic treatment works at Greenspoint Dental
            </Link>
          </p>
        </div>
      </section>

      {/* Sports + school */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="mb-4 font-heading text-3xl text-foreground">
            Sports season, forms and chipped teeth
          </h2>
          <p className="mb-4 font-body leading-relaxed text-muted-foreground">
            Every fall we see a run of the same three things: mouthguards that do not fit, forms due
            tomorrow, and a chipped front tooth from a Friday night game. All three are easy to sort
            out if you come in before the season starts.
          </p>
          <div className="rounded-2xl border-l-4 border-accent bg-accent/5 p-6">
            <ul className="space-y-3 font-body text-sm leading-relaxed text-muted-foreground">
              <li>Custom mouthguards made from an impression of your child's teeth</li>
              <li>School, daycare and sports physical dental forms signed at the visit</li>
              <li>Same day appointments for knocked out, cracked or displaced teeth</li>
              <li>Guidance on what to do in the first hour after a dental injury</li>
            </ul>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="bg-muted/50 py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="mb-8 font-heading text-3xl text-foreground">Parent questions from Colonial Hills</h2>
          <div className="space-y-4">
            {FAQS.map((faq, index) => (
              <motion.div
                key={faq.q}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="rounded-2xl border border-border bg-background p-6"
              >
                <h3 className="mb-2 font-heading text-base text-foreground">{faq.q}</h3>
                <p className="font-body text-sm leading-relaxed text-muted-foreground">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <InternalLinkHub
        currentPath="/service-areas/colonial-hills/"
        areaName="Colonial Hills"
        intro="Colonial Hills families book cleanings, fillings, braces, mouthguards and whitening at our Greenspoint office. Explore the treatments we offer, or find the neighborhood page closest to you."
      />

      {/* CTA */}
      <section className="bg-background py-16">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="mb-4 font-heading text-3xl text-foreground">
            One trip for the whole family
          </h2>
          <p className="mb-8 font-body text-muted-foreground">
            Tell us how many children are coming and we will line the appointments up back to back.
            Ask about the $99 new patient visit for anyone in the family who is new to us.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact">
              <Button size="lg" className="rounded-full bg-primary px-8 font-semibold hover:bg-primary/90">
                Book Family Appointments
              </Button>
            </Link>
            <a href="tel:+12818239987">
              <Button
                size="lg"
                variant="outline"
                className="rounded-full border-primary/30 px-8 font-semibold text-primary"
              >
                <Phone className="mr-2 h-4 w-4" />
                (281) 823-9987
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}