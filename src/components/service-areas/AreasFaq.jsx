import React from 'react';
import { Link } from 'react-router-dom';

const LINK_CLASS =
  'rounded font-semibold text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2';

export default function AreasFaq() {
  return (
    <section className="bg-muted/40 py-12 md:py-16">
      <div className="mx-auto max-w-3xl px-4">
        <h2 className="mb-8 font-heading text-2xl text-foreground md:text-3xl">
          Questions We Hear Often
        </h2>
        <div className="space-y-4">
          <article className="rounded-2xl border border-border bg-card p-6">
            <h3 className="mb-2 font-heading text-lg text-foreground">
              Which neighborhoods do you serve?
            </h3>
            <p className="font-body text-sm leading-relaxed text-muted-foreground">
              Our home office is in{' '}
              <Link to="/service-areas/greenspoint/" className={LINK_CLASS}>
                Greenspoint
              </Link>
              , ZIP 77060. We also welcome patients from{' '}
              <Link to="/service-areas/imperial-valley/" className={LINK_CLASS}>
                Imperial Valley
              </Link>
              ,{' '}
              <Link to="/service-areas/southbrook/" className={LINK_CLASS}>
                Southbrook
              </Link>
              ,{' '}
              <Link to="/service-areas/colonial-hills/" className={LINK_CLASS}>
                Colonial Hills
              </Link>{' '}
              and{' '}
              <Link to="/service-areas/green-ridge-north/" className={LINK_CLASS}>
                Green Ridge North
              </Link>
              .
            </p>
          </article>

          <article className="rounded-2xl border border-border bg-card p-6">
            <h3 className="mb-2 font-heading text-lg text-foreground">Do you speak Spanish?</h3>
            <p className="font-body text-sm leading-relaxed text-muted-foreground">
              Yes, our team speaks English and Spanish.
            </p>
          </article>

          <article className="rounded-2xl border border-border bg-card p-6">
            <h3 className="mb-2 font-heading text-lg text-foreground">Is parking easy?</h3>
            <p className="font-body text-sm leading-relaxed text-muted-foreground">
              Yes, parking is free and right at the office.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}