import React from 'react';
import NeighborhoodCard from './NeighborhoodCard';
import { NEIGHBORHOODS } from './areasData';

export default function NeighborhoodGrid() {
  return (
    <section className="bg-background py-12 md:py-16">
      <div className="mx-auto max-w-5xl px-4">
        <h2 className="mb-8 font-heading text-2xl text-foreground md:text-3xl">
          Other Neighborhoods We Serve
        </h2>
        <div className="grid gap-5 sm:grid-cols-2 md:gap-6">
          {NEIGHBORHOODS.map((area) => (
            <NeighborhoodCard key={area.name} area={area} />
          ))}
        </div>
      </div>
    </section>
  );
}