import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { MapPin, Phone, Sparkles, CalendarDays, CreditCard } from 'lucide-react';
import { motion } from 'framer-motion';
import usePageMeta from '@/hooks/usePageMeta';
import InternalLinkHub from '@/components/seo/InternalLinkHub';

const TITLE = 'Cosmetic Dentist Near Green Ridge North, Houston TX - Greenspoint Dental';
const DESCRIPTION =
  'Veneers, whitening and clear aligners five minutes from Green Ridge North. $695 per veneer, free cosmetic consultations and payment plans for smile upgrades.';

const TIMELINE = [
  {
    when: 'Three months before',
    what: 'Consultation and plan',
    text: 'We photograph your smile, talk through veneers, whitening or aligners, and give you a written quote before anything is booked.',
  },
  {
    when: 'Six weeks before',
    what: 'Treatment begins',
    text: 'Prep and impressions for veneers, or the first set of aligner trays. Most cosmetic plans need two or three visits in this window.',
  },
  {
    when: 'Two weeks before',
    what: 'Whitening and fittings',
    text: 'Final shades chosen, trays delivered or veneers seated, with time left to adjust anything that feels off.',
  },
  {
    when: 'The week of',
    what: 'A short polish',
    text: 'A quick visit to polish edges and check the bite, so photos and the event itself go smoothly.',
  },
];

const COMPARISON = [
  {
    option: 'Porcelain veneers',
    best: 'Chipped, uneven or discolored front teeth',
    time: 'Two to three visits',
    price: '$695 per veneer',
  },
  {
    option: 'Professional whitening',
    best: 'Staining from coffee, tea or smoking',
    time: 'One visit plus trays at home',
    price: 'Quoted at consultation',
  },
  {
    option: 'Clear aligners',
    best: 'Crowding or gaps you want closed discreetly',
    time: 'Six to eighteen months',
    price: 'Free consultation first',
  },
];

const FAQS = [
  {
    q: 'How far ahead should I book whitening before a wedding?',
    a: 'Two to three weeks is comfortable. Whitening peaks in the first week and settles after that, and the extra time lets us fine tune the shade if you want it brighter.',
  },
  {
    q: 'What do veneers cost here?',
    a: 'Our veneers are $695 per tooth when you are having four to six done, which comes to $2,780 for four or $4,170 for six. That is well below the Houston average, and you get the full quote in writing first.',
  },
  {
    q: 'Does dental insurance cover cosmetic treatment?',
    a: 'Usually not for pure cosmetic work, though some plans contribute to crowns that also improve appearance. We will check your benefits and show you the cash price alongside it so you can decide.',
  },
  {
    q: 'Can I fix crowding without metal braces?',
    a: 'In many cases yes. Clear aligners handle mild to moderate crowding well. If your bite needs more than that, we will say so honestly rather than sell you trays that will not finish the job.',
  },
];

export default function GreenRidgeNorth() {
  usePageMeta({ title: TITLE, description: DESCRIPTION });

  return (
    <div>
      {/* Header */}
      <section className="bg-gradient-to-br from-secondary/15 via-background to-primary/5 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-10 md:grid-cols-5 md:items-end">
            <div className="md:col-span-3">
              <Link
                to="/service-areas"
                className="mb-4 inline-block text-sm font-medium text-primary hover:underline"
              >
                ← All Service Areas
              </Link>
              <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-secondary/15 px-4 py-1.5 font-body text-sm font-medium text-secondary-foreground">
                <Sparkles className="h-4 w-4" />
                Smile design, five minutes from Green Ridge North
              </p>
              <h1 className="mb-6 font-heading text-4xl text-foreground md:text-5xl">
                Cosmetic Dentist Near Green Ridge North, Houston TX
              </h1>
              <p className="font-body text-lg leading-relaxed text-muted-foreground">
                If you have been putting off whitening, veneers or aligners because the timeline felt
                vague, this page is for you. We plan cosmetic work backwards from the date that
                matters, whether that is a wedding, a graduation or a first day at a new job, and we
                quote the price before we start.
              </p>
            </div>
            <div className="rounded-3xl border border-border bg-card p-6 md:col-span-2">
              <p className="font-heading text-sm uppercase tracking-wide text-muted-foreground">
                Veneer pricing
              </p>
              <p className="mt-2 font-heading text-4xl font-bold text-primary">$695</p>
              <p className="font-body text-sm text-muted-foreground">per veneer, four to six teeth</p>
              <div className="mt-4 space-y-1.5 font-body text-sm text-muted-foreground">
                <p className="flex justify-between">
                  <span>Four veneers</span>
                  <span className="font-medium text-foreground">$2,780</span>
                </p>
                <p className="flex justify-between">
                  <span>Six veneers</span>
                  <span className="font-medium text-foreground">$4,170</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <div className="border-y border-border bg-card py-6">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-8 gap-y-3 px-4 font-body text-sm">
          <span className="flex items-center gap-2 text-foreground">
            <MapPin className="h-4 w-4 text-secondary" />
            About 5 minutes on local roads
          </span>
          <span className="flex items-center gap-2 text-foreground">
            <Sparkles className="h-4 w-4 text-secondary" />
            Free cosmetic consultation
          </span>
          <span className="flex items-center gap-2 text-foreground">
            <CreditCard className="h-4 w-4 text-secondary" />
            Monthly payment plans available
          </span>
          <span className="flex items-center gap-2 text-foreground">
            <Phone className="h-4 w-4 text-secondary" />
            <a href="tel:+12818239987" className="font-medium text-primary hover:underline">
              (281) 823-9987
            </a>
          </span>
        </div>
      </div>

      {/* Timeline */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="mb-3 font-heading text-3xl text-foreground">
            Working backwards from your date
          </h2>
          <p className="mb-10 max-w-2xl font-body leading-relaxed text-muted-foreground">
            Cosmetic dentistry is mostly scheduling. Here is the realistic countdown we use when a
            patient tells us they have a wedding or a photo shoot coming up.
          </p>
          <div className="relative border-l border-border pl-6 md:pl-8">
            {TIMELINE.map((step, index) => (
              <motion.div
                key={step.when}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="relative mb-8 last:mb-0"
              >
                <span className="absolute -left-[31px] top-1.5 h-3 w-3 rounded-full bg-secondary md:-left-[39px]" />
                <p className="font-body text-xs font-medium uppercase tracking-wide text-secondary">
                  {step.when}
                </p>
                <h3 className="mt-1 mb-1 font-heading text-lg text-foreground">{step.what}</h3>
                <p className="font-body text-sm leading-relaxed text-muted-foreground">{step.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="bg-muted/50 py-16 md:py-20">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="mb-3 font-heading text-3xl text-foreground">
            Veneers, whitening or aligners?
          </h2>
          <p className="mb-8 max-w-2xl font-body leading-relaxed text-muted-foreground">
            These three do different jobs, and the right one depends on what is bothering you about
            your smile. Here is the short version.
          </p>
          <div className="overflow-hidden rounded-2xl border border-border bg-background">
            <table className="w-full text-left">
              <thead className="bg-muted/60">
                <tr className="font-body text-xs uppercase tracking-wide text-muted-foreground">
                  <th className="px-4 py-3 font-medium">Treatment</th>
                  <th className="px-4 py-3 font-medium">Best for</th>
                  <th className="hidden px-4 py-3 font-medium sm:table-cell">Time</th>
                  <th className="px-4 py-3 font-medium">Cost</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border font-body text-sm">
                {COMPARISON.map((row) => (
                  <tr key={row.option}>
                    <td className="px-4 py-4 font-medium text-foreground">{row.option}</td>
                    <td className="px-4 py-4 text-muted-foreground">{row.best}</td>
                    <td className="hidden px-4 py-4 text-muted-foreground sm:table-cell">{row.time}</td>
                    <td className="px-4 py-4 text-muted-foreground">{row.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Financing */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-4">
          <div className="rounded-3xl border border-border bg-card p-8 md:p-10">
            <div className="mb-4 flex items-center gap-3">
              <CalendarDays className="h-6 w-6 text-secondary" />
              <h2 className="font-heading text-2xl text-foreground md:text-3xl">
                Paying for elective treatment
              </h2>
            </div>
            <p className="mb-5 font-body leading-relaxed text-muted-foreground">
              Cosmetic work is rarely covered by insurance, so we treat the money side as part of the
              plan. You get a written quote before treatment, and monthly payment plans spread the
              cost of veneers or aligners across the months the work takes.
            </p>
            <div className="flex flex-wrap gap-3 font-body text-sm">
              <Link
                to="/financing"
                className="rounded-full bg-primary/10 px-4 py-2 font-medium text-primary hover:bg-primary/15"
              >
                See financing options
              </Link>
              <Link
                to="/services/specials"
                className="rounded-full bg-secondary/15 px-4 py-2 font-medium text-secondary-foreground hover:bg-secondary/25"
              >
                Current veneer specials
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="bg-muted/50 py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="mb-8 font-heading text-3xl text-foreground">Smile questions from Green Ridge</h2>
          <div className="divide-y divide-border rounded-2xl border border-border bg-background px-6">
            {FAQS.map((faq) => (
              <div key={faq.q} className="py-5">
                <h3 className="mb-2 font-heading text-base text-foreground">{faq.q}</h3>
                <p className="font-body text-sm leading-relaxed text-muted-foreground">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <InternalLinkHub
        currentPath="/service-areas/green-ridge-north/"
        areaName="Green Ridge North"
        intro="Green Ridge North patients come to our Greenspoint office for veneers, whitening, aligners and the general dentistry that keeps a new smile healthy. Explore the treatments we offer, or find the neighborhood page closest to you."
      />

      {/* CTA */}
      <section className="bg-background py-16">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="mb-4 font-heading text-3xl text-foreground">
            Start with a free cosmetic consultation
          </h2>
          <p className="mb-8 font-body text-muted-foreground">
            Bring a photo of the smile you have in mind and any date you are working toward. You will
            leave with a plan, a price and a realistic timeline.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact">
              <Button size="lg" className="rounded-full bg-primary px-8 font-semibold hover:bg-primary/90">
                Book Your Consultation
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