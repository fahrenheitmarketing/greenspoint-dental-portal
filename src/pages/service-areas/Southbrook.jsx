import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { MapPin, Phone, Users, FileText, HeartHandshake } from 'lucide-react';
import { motion } from 'framer-motion';
import usePageMeta from '@/hooks/usePageMeta';
import InternalLinkHub from '@/components/seo/InternalLinkHub';

const TITLE = 'Dentist Near Southbrook, Houston TX - Greenspoint Dental';
const DESCRIPTION =
  'The closest dentist to Southbrook, two to five minutes away. Long term patients, honest second opinions before big treatment, and care for aging teeth.';

const STAY_REASONS = [
  {
    title: 'The same team, year after year',
    text: 'Patients who started with us in the late 1990s still come back with their children and now their grandchildren. Your chart follows you, so nobody starts from scratch.',
  },
  {
    title: 'A record of every filling and crown',
    text: 'We keep the treatment history in one place. When an old restoration finally needs replacing, we already know what is underneath it.',
  },
  {
    title: 'Referred by a neighbor, not an ad',
    text: 'Most Southbrook patients arrive because someone on their street sent them. That is the kind of reputation we work to keep.',
  },
];

const SECOND_OPINION_POINTS = [
  'Bring your X-rays or ask us to take new ones',
  'We explain what is urgent and what can wait',
  'No pressure to book the full plan the same day',
  'A written quote for any treatment you do choose',
];

const AGING_CARE = [
  { title: 'Gum recession', text: 'Sensitive roots and longer looking teeth usually start with gums, not enamel. We measure and monitor it instead of guessing.' },
  { title: 'Dry mouth', text: 'Common with blood pressure and allergy medication, and a leading cause of new cavities after 60. We can help you manage it.' },
  { title: 'Dentures and partials', text: 'Relines, adjustments and repairs for dentures that no longer sit the way they used to.' },
  { title: 'Replacing old work', text: 'Silver fillings and older crowns have a lifespan. We tell you when one is close to failing rather than waiting for it to break.' },
];

const FAQS = [
  {
    q: 'Can I get a second opinion on a large treatment plan?',
    a: 'Please do. Bring the estimate and any X-rays you were given. We will review what is needed now, what is optional, and what could reasonably wait a few months, then put our own quote in writing.',
  },
  {
    q: 'I have been seeing another dentist for years. Is switching awkward?',
    a: 'Not at all. We request your records, review them before your first visit, and carry on from where you left off. Many Southbrook patients came to us exactly this way.',
  },
  {
    q: 'Do you handle denture adjustments and repairs?',
    a: 'Yes. We do relines, adjustments and repairs, including for patients who had the denture made somewhere else.',
  },
  {
    q: 'My insurance changed this year. What should I check first?',
    a: 'Call us with the plan name and we will tell you whether we are in network before you book. If the new plan does not cover us, we will quote our flat fees so you can compare fairly.',
  },
];

export default function Southbrook() {
  usePageMeta({ title: TITLE, description: DESCRIPTION });

  return (
    <div>
      {/* Header */}
      <section className="bg-gradient-to-br from-secondary/10 via-background to-background py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <div className="max-w-3xl">
            <Link
              to="/service-areas"
              className="mb-4 inline-block text-sm font-medium text-primary hover:underline"
            >
              ← All Service Areas
            </Link>
            <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-secondary/15 px-4 py-1.5 font-body text-sm font-medium text-secondary-foreground">
              <HeartHandshake className="h-4 w-4" />
              Our closest neighborhood, two to five minutes away
            </p>
            <h1 className="mb-6 font-heading text-4xl text-foreground md:text-5xl">
              Dentist Near Southbrook, Houston TX
            </h1>
            <p className="font-body text-lg leading-relaxed text-muted-foreground">
              Southbrook is the shortest drive to our door, and it shows in our schedule: many of the
              patients we see each week have been coming from these few streets since the 1990s. If
              you are looking for a dentist who remembers your history without checking the chart,
              this is the page for you.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <div className="bg-secondary/10 py-6">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-10 gap-y-4 px-4 font-body text-sm">
          <span className="flex items-center gap-2 text-foreground">
            <MapPin className="h-4 w-4 text-secondary" />
            Two to five minutes away
          </span>
          <span className="flex items-center gap-2 text-foreground">
            <Users className="h-4 w-4 text-secondary" />
            Caring for Houston since 1997
          </span>
          <span className="flex items-center gap-2 text-foreground">
            <Phone className="h-4 w-4 text-secondary" />
            <a href="tel:+12818239987" className="font-medium text-primary hover:underline">
              (281) 823-9987
            </a>
          </span>
        </div>
      </div>

      {/* Why patients stay */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="mb-3 font-heading text-3xl text-foreground">
            Why Southbrook patients keep coming back
          </h2>
          <p className="mb-10 max-w-2xl font-body leading-relaxed text-muted-foreground">
            A dentist is not a one visit decision. It is a relationship measured in decades, and it
            matters most when something complicated shows up.
          </p>
          <div className="space-y-4">
            {STAY_REASONS.map((reason, index) => (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="flex gap-4 border-l-4 border-secondary bg-card p-5"
              >
                <div>
                  <h3 className="mb-1 font-heading text-lg text-foreground">{reason.title}</h3>
                  <p className="font-body text-sm leading-relaxed text-muted-foreground">
                    {reason.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Second opinions */}
      <section className="bg-muted/50 py-16 md:py-20">
        <div className="mx-auto grid max-w-5xl gap-10 px-4 md:grid-cols-2">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <FileText className="h-5 w-5 text-secondary" />
              <h2 className="font-heading text-2xl text-foreground md:text-3xl">
                A second opinion before a big bill
              </h2>
            </div>
            <p className="mb-4 font-body leading-relaxed text-muted-foreground">
              A full mouth of crowns or a set of implants is a serious amount of money, and it is
              reasonable to want another set of eyes on it. We will tell you if the plan you were
              given looks right, and we will also tell you if it looks like more than you need.
            </p>
            <p className="font-body leading-relaxed text-muted-foreground">
              That conversation costs you nothing but an exam, and it has saved more than a few
              Southbrook families several thousand dollars.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-background p-6">
            <p className="mb-4 font-heading text-base text-foreground">How a review works</p>
            <ul className="space-y-3">
              {SECOND_OPINION_POINTS.map((point) => (
                <li key={point} className="flex items-start gap-2 font-body text-sm text-muted-foreground">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Aging teeth */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="mb-3 font-heading text-3xl text-foreground">Care that changes as you do</h2>
          <p className="mb-10 max-w-2xl font-body leading-relaxed text-muted-foreground">
            Teeth that have been in service for sixty or seventy years need a different plan than
            teeth that are twenty. Much of our Southbrook work is this quieter, longer term kind of
            dentistry.
          </p>
          <div className="grid gap-5 sm:grid-cols-2">
            {AGING_CARE.map((item) => (
              <div key={item.title} className="rounded-xl border border-border bg-card p-6">
                <h3 className="mb-2 font-heading text-lg text-foreground">{item.title}</h3>
                <p className="font-body text-sm leading-relaxed text-muted-foreground">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Insurance */}
      <section className="bg-secondary/10 py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="mb-4 font-heading text-3xl text-foreground">
            When your insurance changes, we adapt
          </h2>
          <p className="mb-4 font-body leading-relaxed text-muted-foreground">
            Plans change every year, and retirement often means moving off an employer plan
            entirely. We file with most dental plans and will confirm your network status before you
            book, so there is no surprise at the front desk.
          </p>
          <p className="font-body leading-relaxed text-muted-foreground">
            If you are between plans or paying out of pocket, our flat fees are published and our
            payment plans are explained in plain language. Nobody here will pressure you into
            treatment you cannot afford this month.
          </p>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="mb-8 font-heading text-3xl text-foreground">Questions from Southbrook</h2>
          <div className="space-y-4">
            {FAQS.map((faq, index) => (
              <motion.div
                key={faq.q}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="rounded-xl border border-border bg-card p-6"
              >
                <h3 className="mb-2 font-heading text-base text-foreground">{faq.q}</h3>
                <p className="font-body text-sm leading-relaxed text-muted-foreground">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <InternalLinkHub
        currentPath="/service-areas/southbrook/"
        areaName="Southbrook"
        intro="From our Greenspoint office, Southbrook patients reach cleanings, crowns, dentures and root canals in a five minute drive. Here is where to look next."
      />

      {/* CTA */}
      <section className="bg-background py-16">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="mb-4 font-heading text-3xl text-foreground">
            Same neighborhood, same team, since 1997
          </h2>
          <p className="mb-8 font-body text-muted-foreground">
            If it has been a few years since your last visit, that is fine. Call us, or start with a
            second opinion and decide after you have heard us out.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact">
              <Button size="lg" className="rounded-full bg-primary px-8 font-semibold hover:bg-primary/90">
                Book Your Appointment
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