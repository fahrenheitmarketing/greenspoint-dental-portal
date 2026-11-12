import React from 'react';
import { Link } from 'react-router-dom';
import CallLink from './CallLink';

const LINK_CLASS =
  'rounded font-semibold text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2';

export default function GreenspointFaq() {
  return (
    <section className="bg-muted/40 py-12 md:py-16">
      <div className="mx-auto max-w-3xl px-4">
        <h2 className="mb-8 font-heading text-2xl text-foreground md:text-3xl">
          Questions from Greenspoint patients
        </h2>

        <div className="space-y-7">
          <div>
            <h3 className="mb-2 font-heading text-lg text-foreground">Where is your office?</h3>
            <p className="font-body text-sm leading-relaxed text-muted-foreground">
              We are at 12523 Greenspoint Drive, Houston, TX 77060, at the corner of Greens Road and
              Greenspoint Drive.
            </p>
          </div>

          <div>
            <h3 className="mb-2 font-heading text-lg text-foreground">
              It has been years since I saw a dentist. Will you judge me?
            </h3>
            <p className="font-body text-sm leading-relaxed text-muted-foreground">
              No. We start where you are and explain your options in plain language. Many of our
              patients have been away for a long time.{' '}
              <Link to="/blog/" className={LINK_CLASS}>
                Read: Is It Too Late to Go Back to the Dentist?
              </Link>
            </p>
          </div>

          <div>
            <h3 className="mb-2 font-heading text-lg text-foreground">Do you speak Spanish?</h3>
            <p className="font-body text-sm leading-relaxed text-muted-foreground">
              Yes. Our team speaks English and Spanish.
            </p>
          </div>

          <div>
            <h3 className="mb-2 font-heading text-lg text-foreground">
              Can I be seen the same day if I am in pain?
            </h3>
            <p className="font-body text-sm leading-relaxed text-muted-foreground">
              Call <CallLink /> and we will do our best to see you the same day. We set aside time
              each day for emergencies.
            </p>
          </div>

          <div>
            <h3 className="mb-2 font-heading text-lg text-foreground">Do you take my insurance?</h3>
            <p className="font-body text-sm leading-relaxed text-muted-foreground">
              We accept most plans. Please call <CallLink /> to confirm yours. If you do not have
              insurance, ask us about payment plans and financing.{' '}
              <Link to="/financing/" className={LINK_CLASS}>
                Financing
              </Link>
            </p>
          </div>

          <div>
            <h3 className="mb-2 font-heading text-lg text-foreground">Can my kids come too?</h3>
            <p className="font-body text-sm leading-relaxed text-muted-foreground">
              Yes. We care for the whole family. Contact our office and we will help you plan the
              first visit.{' '}
              <Link to="/blog/" className={LINK_CLASS}>
                Read: Common Myths About Kids' Dental Care
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}