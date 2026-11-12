import React from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumbs } from './Breadcrumbs';
import CallLink from './CallLink';

const BREADCRUMBS = [
  { label: 'Home', path: '/' },
  { label: 'Service Areas', path: '/service-areas/' },
  { label: 'Greenspoint' },
];

export default function GreenspointHero() {
  return (
    <section className="bg-gradient-to-br from-primary/5 via-background to-secondary/5 pb-12 pt-6 md:pb-16">
      <div className="mx-auto max-w-5xl px-4">
        <Breadcrumbs items={BREADCRUMBS} />

        <h1 className="mb-5 mt-5 font-heading text-3xl leading-tight text-foreground md:text-5xl">
          Dentist in Greenspoint, Houston, TX 77060
        </h1>

        <p className="max-w-3xl font-body text-base leading-relaxed text-muted-foreground md:text-lg">
          Greenspoint Dental has been the family dentist for Greenspoint, Houston, since 1997. You
          will find us at 12523 Greenspoint Drive, ZIP code 77060, at the corner of Greens Road and
          Greenspoint Drive. Our bilingual team speaks English and Spanish, and we keep care honest
          and affordable. If it has been years since your last visit, you are welcome here. No
          judgment, no pressure.
        </p>

        <div className="mt-8">
          <Link
            to="/contact"
            className="inline-block rounded-full bg-primary px-8 py-3.5 font-body font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            Book Your Appointment
          </Link>
        </div>

        <p className="mt-4 font-body text-sm text-muted-foreground">
          Prefer to talk? Call <CallLink />.
        </p>
      </div>
    </section>
  );
}