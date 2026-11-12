import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function NeighborhoodCard({ area }) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/40 md:p-7">
      <h3 className="mb-1 font-heading text-xl text-foreground">{area.name}</h3>
      <p className="mb-3 font-body text-sm font-semibold text-primary">{area.driveTime}</p>
      <p className="mb-5 font-body text-sm leading-relaxed text-muted-foreground">{area.line}</p>
      <Link
        to={area.path}
        className="mt-auto inline-flex items-center gap-1.5 rounded font-body text-sm font-semibold text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        {area.linkLabel}
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </Link>
    </article>
  );
}