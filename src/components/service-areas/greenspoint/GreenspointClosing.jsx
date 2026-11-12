import React from 'react';
import { Link } from 'react-router-dom';
import CallLink from './CallLink';

export default function GreenspointClosing() {
  return (
    <section className="bg-primary/5 py-14 md:py-20">
      <div className="mx-auto max-w-3xl px-4 text-center">
        <h2 className="mb-4 font-heading text-2xl text-foreground md:text-3xl">
          Your Greenspoint Dentist
        </h2>
        <p className="mb-8 font-body text-base leading-relaxed text-muted-foreground">
          Honest, affordable care for you and your family, right here in Greenspoint.
        </p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            to="/contact"
            className="inline-block rounded-full bg-primary px-8 py-3.5 font-body font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            Schedule Your Visit
          </Link>
          <p className="font-body text-sm text-muted-foreground">
            Or call <CallLink />
          </p>
        </div>
      </div>
    </section>
  );
}