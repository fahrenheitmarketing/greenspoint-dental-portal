import React from 'react';
import { Link } from 'react-router-dom';
import { NEIGHBORHOODS } from './../areasData';

const LINK_CLASS =
  'rounded font-semibold text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2';

export default function NearbyAreas() {
  return (
    <section className="bg-background py-12 md:py-16">
      <div className="mx-auto max-w-5xl px-4">
        <h2 className="mb-3 font-heading text-2xl text-foreground md:text-3xl">
          Also Serving Neighbors Nearby
        </h2>
        <p className="mb-8 max-w-2xl font-body text-base leading-relaxed text-muted-foreground">
          Our office is in Greenspoint, and many of our patients come from these nearby
          neighborhoods.
        </p>

        <ul className="grid gap-4 sm:grid-cols-2">
          {NEIGHBORHOODS.map((area) => (
            <li key={area.path} className="rounded-2xl border border-border bg-card p-5">
              <Link to={area.path} className={`font-body text-base ${LINK_CLASS}`}>
                {area.linkLabel}
              </Link>
              <p className="mt-1.5 font-body text-sm text-muted-foreground">{area.driveTime}</p>
            </li>
          ))}
        </ul>

        <p className="mt-6 font-body text-sm">
          <Link to="/service-areas/" className={LINK_CLASS}>
            See all areas we serve
          </Link>
        </p>
      </div>
    </section>
  );
}