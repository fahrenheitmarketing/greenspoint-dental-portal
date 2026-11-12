import React from 'react';
import { Link } from 'react-router-dom';

const LINK_CLASS =
  'rounded font-semibold text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2';

const BLOCKS = [
  {
    title: 'Checkups and cleanings',
    text: 'Regular exams and cleanings to keep small problems small.',
    label: 'General dentistry in Greenspoint',
    path: '/services/general/',
  },
  {
    title: 'Fillings, crowns and repairs',
    text: 'Care for cavities, worn teeth and broken teeth.',
    label: 'Restorative dentistry',
    path: '/services/restorative/',
  },
  {
    title: 'Smile care',
    text: 'Whitening and veneers for a smile you feel good about.',
    label: 'Cosmetic dentistry',
    path: '/services/cosmetic/',
  },
  {
    title: 'Braces',
    text: 'Orthodontic care for kids and adults.',
    label: 'Orthodontics',
    path: '/services/orthodontics/',
  },
];

export default function CareBlocks() {
  return (
    <section className="bg-background py-12 md:py-16">
      <div className="mx-auto max-w-5xl px-4">
        <h2 className="mb-8 font-heading text-2xl text-foreground md:text-3xl">
          Dental care for the whole family
        </h2>

        <ul className="grid gap-5 sm:grid-cols-2">
          {BLOCKS.map((block) => (
            <li key={block.title} className="rounded-2xl border border-border bg-card p-6">
              <h3 className="mb-2 font-heading text-lg text-foreground">{block.title}</h3>
              <p className="mb-3 font-body text-sm leading-relaxed text-muted-foreground">
                {block.text}
              </p>
              <Link to={block.path} className={`font-body text-sm ${LINK_CLASS}`}>
                {block.label}
              </Link>
            </li>
          ))}
        </ul>

        <p className="mt-6 font-body text-sm leading-relaxed text-muted-foreground">
          Bringing your children? Contact our office and we will help you plan the first visit.
        </p>
      </div>
    </section>
  );
}