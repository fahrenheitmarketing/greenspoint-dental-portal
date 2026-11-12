import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ArrowRight } from 'lucide-react';

export default function HomeOfficeCard() {
  return (
    <section className="bg-background py-12 md:py-16">
      <div className="mx-auto max-w-5xl px-4">
        <article className="rounded-3xl border-2 border-primary/25 bg-primary/5 p-8 md:p-12">
          <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
            <MapPin className="h-4 w-4" aria-hidden="true" />
            Our home office
          </p>
          <h2 className="mb-3 font-heading text-2xl text-foreground md:text-3xl">
            Greenspoint (77060): Our Home Office
          </h2>
          <p className="mb-6 max-w-2xl font-body text-base leading-relaxed text-muted-foreground md:text-lg">
            Our office is right in Greenspoint, with free, easy parking at the door.
          </p>
          <Link
            to="/service-areas/greenspoint/"
            className="inline-flex items-center gap-1.5 rounded font-semibold text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            See our Greenspoint office
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </article>
      </div>
    </section>
  );
}