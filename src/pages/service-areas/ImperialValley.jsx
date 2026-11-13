import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { MapPin, Clock, Phone, Sunrise, Plane, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import usePageMeta from '@/hooks/usePageMeta';
import InternalLinkHub from '@/components/seo/InternalLinkHub';

const TITLE = 'Dentist Near Imperial Valley, Houston TX - Greenspoint Dental';
const DESCRIPTION =
  'Five minutes from Imperial Valley Drive with no freeway. Early morning appointments for shift workers and travelers, plus same-day help for tooth pain.';

const ROUTE_STEPS = [
  {
    title: 'Start on Imperial Valley Drive',
    text: 'Head toward Greens Road. No freeway merge and no tollway, just a straight local drive.',
  },
  {
    title: 'Turn onto Greenspoint Drive',
    text: 'Our address is 12523 Greenspoint Drive, in the Greenspoint business district.',
  },
  {
    title: 'Park at the front door',
    text: 'Free parking sits right in front of the office, so you are not circling a garage before a cleaning.',
  },
];

const EARLY_SLOTS = [
  { day: 'Monday', hours: '8am to 4pm' },
  { day: 'Tuesday', hours: '8am to 12pm' },
  { day: 'Wednesday and Thursday', hours: '8am to 5pm' },
  { day: 'Friday', hours: '8am to 12pm' },
];

const FAQS = [
  {
    q: 'Can I get an appointment before my shift starts?',
    a: 'Yes. We open at 8am every weekday, so a 8am cleaning still leaves time to get to work. Tell us your start time when you book and we will aim for the earliest slot of the day.',
  },
  {
    q: 'I am flying out of Bush Intercontinental and my tooth is aching. What now?',
    a: 'Call us first. We keep room in the schedule for urgent visits and can usually see you the same day. If something need to be stabilized before travel, we will tell you honestly what can and cannot wait.',
  },
  {
    q: 'Do I need to take the freeway from Imperial Valley Drive?',
    a: 'No. The drive is about five minutes on local roads. That is one reason patients along Imperial Valley Drive choose us over offices south of Beltway 8.',
  },
  {
    q: 'What if I only have a short lunch break?',
    a: 'Most cleanings and exams fit comfortably in a lunch hour. Mention the time you have when you book, and we will let you know before the visit if more time is needed.',
  },
];

export default function ImperialValley() {
  usePageMeta({ title: TITLE, description: DESCRIPTION });

  return (
    <div>
      {/* Header */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-primary/5 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <div className="max-w-3xl">
            <Link
              to="/service-areas"
              className="mb-4 inline-block text-sm font-medium text-primary hover:underline"
            >
              ← All Service Areas
            </Link>
            <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 font-body text-sm font-medium text-primary">
              <Sunrise className="h-4 w-4" />
              Early appointments, five minutes from Imperial Valley Drive
            </p>
            <h1 className="mb-6 font-heading text-4xl text-foreground md:text-5xl">
              Dentist Near Imperial Valley, Houston TX
            </h1>
            <p className="font-body text-lg leading-relaxed text-muted-foreground">
              Imperial Valley Drive is a working corridor, and most of our patients here are fitting
              dental care around a shift, a school run, or a flight out of Bush Intercontinental.
              Greenspoint Dental is less than two miles away, about a five minute drive on local
              roads, and we open at 8am on weekdays.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <div className="border-y border-border bg-card py-8">
        <div className="mx-auto grid max-w-5xl gap-6 px-4 sm:grid-cols-3">
          <div className="flex items-center gap-3">
            <MapPin className="h-5 w-5 shrink-0 text-primary" />
            <div>
              <p className="font-heading text-lg text-foreground">Under 2 miles</p>
              <p className="font-body text-sm text-muted-foreground">from Imperial Valley Drive</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Clock className="h-5 w-5 shrink-0 text-primary" />
            <div>
              <p className="font-heading text-lg text-foreground">About 5 minutes</p>
              <p className="font-body text-sm text-muted-foreground">no freeway, no tollway</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="h-5 w-5 shrink-0 text-primary" />
            <div>
              <p className="font-heading text-lg text-foreground">
                <a href="tel:+12818239987" className="hover:underline">
                  (281) 823-9987
                </a>
              </p>
              <p className="font-body text-sm text-muted-foreground">call before you drive over</p>
            </div>
          </div>
        </div>
      </div>

      {/* Route */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="mb-3 font-heading text-3xl text-foreground">
            Three turns between your street and the chair
          </h2>
          <p className="mb-10 max-w-2xl font-body leading-relaxed text-muted-foreground">
            Nobody wants a dental visit that starts with beltway traffic. This is the whole route
            from Imperial Valley Drive, start to parking spot.
          </p>
          <ol className="space-y-6">
            {ROUTE_STEPS.map((step, index) => (
              <motion.li
                key={step.title}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="flex gap-4 rounded-2xl border border-border bg-card p-5"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary font-heading text-base text-primary-foreground">
                  {index + 1}
                </span>
                <div>
                  <h3 className="mb-1 font-heading text-lg text-foreground">{step.title}</h3>
                  <p className="font-body text-sm leading-relaxed text-muted-foreground">{step.text}</p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      {/* Early slots */}
      <section className="bg-primary/5 py-16 md:py-20">
        <div className="mx-auto grid max-w-5xl gap-10 px-4 md:grid-cols-2">
          <div>
            <h2 className="mb-3 font-heading text-3xl text-foreground">
              Book us before your day starts
            </h2>
            <p className="mb-4 font-body leading-relaxed text-muted-foreground">
              Our first appointment of the day is at 8am, which makes a cleaning possible before a
              9am shift, a delivery route, or a full day of classes. Tuesday and Friday mornings are
              the quietest, so they are the easiest to fit in on short notice.
            </p>
            <p className="font-body leading-relaxed text-muted-foreground">
              If you work nights, ask about a late morning slot instead. We would rather find an hour
              that works than have you put off a tooth that is already bothering you.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-background p-6">
            <p className="mb-4 font-heading text-lg text-foreground">Office hours</p>
            <ul className="divide-y divide-border">
              {EARLY_SLOTS.map((slot) => (
                <li key={slot.day} className="flex items-center justify-between py-2.5 font-body text-sm">
                  <span className="text-muted-foreground">{slot.day}</span>
                  <span className="font-medium text-foreground">{slot.hours}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Travelers */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-5xl px-4">
          <div className="rounded-3xl border border-border bg-card p-8 md:p-10">
            <div className="mb-4 flex items-center gap-3">
              <Plane className="h-6 w-6 text-primary" />
              <h2 className="font-heading text-2xl text-foreground md:text-3xl">
                Flying out soon and your tooth will not wait
              </h2>
            </div>
            <p className="mb-5 font-body leading-relaxed text-muted-foreground">
              Greenspoint sits between Imperial Valley Drive and Bush Intercontinental, so we see a
              lot of patients the week before a trip. If a crown feels loose or a tooth has started
              throbbing, call us before you board. We will tell you plainly whether it needs
              treatment now, a temporary fix for the week, or nothing at all until you are back.
            </p>
            <ul className="grid gap-3 sm:grid-cols-2">
              {[
                'Same day visits for pain, swelling and broken teeth',
                'Temporary repairs when you are travelling within days',
                'Honest guidance on what can safely wait',
                'Records you can take with you if you relocate',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 font-body text-sm text-muted-foreground">
                  <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="mb-3 font-heading text-3xl text-foreground">
            What a first visit costs here
          </h2>
          <p className="mb-8 max-w-2xl font-body leading-relaxed text-muted-foreground">
            You should know the price before you book. New patients pay one flat rate for a full
            exam, X-rays and a cleaning, and every treatment after that is quoted in writing first.
            No insurance is required, though we do file with most plans.
          </p>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-primary/20 bg-primary/10 p-6">
              <p className="font-heading text-4xl font-bold text-primary">$99</p>
              <p className="mt-1 font-heading text-lg text-foreground">New patient visit</p>
              <p className="mt-1 font-body text-sm text-muted-foreground">
                Exam, X-rays and cleaning in one appointment
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-6">
              <p className="font-heading text-lg text-foreground">Urgent visit</p>
              <p className="mt-1 font-body text-sm leading-relaxed text-muted-foreground">
                Call ahead and we will quote the exam fee and the likely treatment range on the
                phone, before you drive over.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="bg-muted/50 py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="mb-8 font-heading text-3xl text-foreground">
            Imperial Valley questions we hear most
          </h2>
          <dl className="divide-y divide-border rounded-2xl border border-border bg-background px-6">
            {FAQS.map((faq) => (
              <div key={faq.q} className="py-5">
                <dt className="mb-2 font-heading text-base text-foreground">{faq.q}</dt>
                <dd className="font-body text-sm leading-relaxed text-muted-foreground">{faq.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <InternalLinkHub
        currentPath="/service-areas/imperial-valley/"
        areaName="Imperial Valley"
        intro="Patients along Imperial Valley Drive come to our Greenspoint office for cleanings, crowns, whitening and braces. Explore the treatments we offer, or find the neighborhood page closest to you."
      />

      {/* CTA */}
      <section className="bg-background py-16">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="mb-4 font-heading text-3xl text-foreground">
            An 8am appointment is still open this week
          </h2>
          <p className="mb-8 font-body text-muted-foreground">
            Call and we will find an hour that fits around your shift, or book online and mention
            that you are coming from Imperial Valley Drive.
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