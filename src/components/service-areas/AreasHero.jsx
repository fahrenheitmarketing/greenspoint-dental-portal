import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const INTRO =
  'Greenspoint Dental has cared for families in the Greenspoint area since 1997. Our office is at 12523 Greenspoint Drive, ZIP code 77060, at the corner of Greens Road and Greenspoint Drive. Most of our patients live just a few minutes away, in neighborhoods like Imperial Valley, Southbrook, Colonial Hills and Green Ridge North. If it has been a while since your last dental visit, you are welcome here. Our bilingual team speaks English and Spanish, and we keep care honest and affordable, with no judgment and no pressure.';

export default function AreasHero() {
  return (
    <section className="bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-14 md:py-20">
      <div className="mx-auto max-w-5xl px-4">
        <h1 className="mb-6 font-heading text-3xl leading-tight text-foreground md:text-5xl">
          Areas We Serve Around Greenspoint
        </h1>
        <p className="mb-8 max-w-3xl font-body text-base leading-relaxed text-muted-foreground md:text-lg">
          {INTRO}
        </p>
        <Link to="/contact">
          <Button
            size="lg"
            className="rounded-full bg-primary px-8 font-semibold text-primary-foreground hover:bg-primary/90"
          >
            Book Your Appointment
          </Button>
        </Link>
      </div>
    </section>
  );
}