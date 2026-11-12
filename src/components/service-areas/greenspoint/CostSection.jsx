import React from 'react';
import { Link } from 'react-router-dom';
import CallLink from './CallLink';

const LINK_CLASS =
  'rounded font-semibold text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2';

export default function CostSection() {
  return (
    <section className="bg-muted/40 py-12 md:py-16">
      <div className="mx-auto max-w-5xl px-4">
        <h2 className="mb-8 font-heading text-2xl text-foreground md:text-3xl">
          Clear Costs, No Surprises
        </h2>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6">
            <h3 className="mb-2 font-heading text-lg text-foreground">$99 New Patient Special.</h3>
            <p className="mb-3 font-body text-sm leading-relaxed text-muted-foreground">
              Comprehensive exam, full X-rays and a professional cleaning. No hidden costs.
            </p>
            <Link to="/services/specials/" className={`font-body text-sm ${LINK_CLASS}`}>
              See all specials
            </Link>
          </div>

          <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6">
            <h3 className="mb-2 font-heading text-lg text-foreground">$39 Dental Exam and X-Rays.</h3>
            <p className="mb-3 font-body text-sm leading-relaxed text-muted-foreground">
              A quick checkup if it has been a while since you saw a dentist. No surprises.
            </p>
            <Link to="/services/specials/" className={`font-body text-sm ${LINK_CLASS}`}>
              See all specials
            </Link>
          </div>
        </div>

        <p className="mt-2 font-body text-sm leading-relaxed text-muted-foreground md:mt-6">
          We accept most insurance plans, including Aetna, Anthem, Blue Cross, Cigna, Guardian,
          Humana Dental, MetLife, United Healthcare and United Concordia. Please call{' '}
          <CallLink /> to confirm your plan before your visit.{' '}
          <Link to="/financing/" className={LINK_CLASS}>
            Insurance and financing details
          </Link>
        </p>

        <p className="mt-4 font-body text-sm leading-relaxed text-muted-foreground">
          No insurance? We offer phased treatment plans and financing through CareCredit, The
          HELPcard and LendingUSA.
        </p>
      </div>
    </section>
  );
}