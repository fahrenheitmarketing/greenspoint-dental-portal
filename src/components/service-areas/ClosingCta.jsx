import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function ClosingCta() {
  return (
    <section className="bg-primary/5 py-14 md:py-16">
      <div className="mx-auto max-w-3xl px-4 text-center">
        <h2 className="mb-4 font-heading text-2xl text-foreground md:text-3xl">
          Dental Care Close to Home
        </h2>
        <p className="mb-8 font-body text-base leading-relaxed text-muted-foreground">
          Our office is a short drive from these neighborhoods, and our team is ready to help you and
          your family with honest, affordable care.
        </p>
        <Link to="/contact">
          <Button
            size="lg"
            className="rounded-full bg-primary px-8 font-semibold text-primary-foreground hover:bg-primary/90"
          >
            Schedule Your Visit
          </Button>
        </Link>
      </div>
    </section>
  );
}