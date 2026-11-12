import React from 'react';
import { Link } from 'react-router-dom';
import { DollarSign, Globe, Heart } from 'lucide-react';

const LINK_CLASS =
  'rounded font-semibold text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2';

export default function WhyNeighborsSection() {
  return (
    <section className="bg-background py-12 md:py-16">
      <div className="mx-auto max-w-5xl px-4">
        <h2 className="mb-8 font-heading text-2xl text-foreground md:text-3xl">
          Why Neighbors Choose Us
        </h2>
        <div className="grid gap-5 md:grid-cols-3 md:gap-6">
          <article className="rounded-2xl border border-border bg-card p-6">
            <DollarSign className="mb-4 h-6 w-6 text-primary" aria-hidden="true" />
            <h3 className="mb-2 font-heading text-lg text-foreground">Affordable</h3>
            <p className="mb-3 font-body text-sm leading-relaxed text-muted-foreground">
              New patients pay $99 for a comprehensive exam, full X-rays and a professional cleaning.{' '}
              <Link to="/services/specials/" className={LINK_CLASS}>
                See our specials
              </Link>
            </p>
            <p className="font-body text-sm leading-relaxed text-muted-foreground">
              We accept most insurance plans, so call to confirm yours. We also offer payment plans.{' '}
              <Link to="/financing/" className={LINK_CLASS}>
                Financing options
              </Link>
            </p>
          </article>

          <article className="rounded-2xl border border-border bg-card p-6">
            <Globe className="mb-4 h-6 w-6 text-primary" aria-hidden="true" />
            <h3 className="mb-2 font-heading text-lg text-foreground">Bilingual</h3>
            <p className="font-body text-sm leading-relaxed text-muted-foreground">
              Our team speaks English and Spanish.
            </p>
          </article>

          <article className="rounded-2xl border border-border bg-card p-6">
            <Heart className="mb-4 h-6 w-6 text-primary" aria-hidden="true" />
            <h3 className="mb-2 font-heading text-lg text-foreground">Judgment free</h3>
            <p className="font-body text-sm leading-relaxed text-muted-foreground">
              Away from the dentist for years? We will start where you are.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}