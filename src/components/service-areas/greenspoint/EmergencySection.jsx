import React from 'react';
import CallLink from './CallLink';

export default function EmergencySection() {
  return (
    <section className="bg-background py-12 md:py-16">
      <div className="mx-auto max-w-5xl px-4">
        <div className="rounded-2xl border border-secondary/30 bg-secondary/5 p-6 md:p-10">
          <h2 className="mb-4 font-heading text-2xl text-foreground md:text-3xl">
            Something Hurts? Call Us.
          </h2>
          <p className="mb-6 max-w-3xl font-body text-base leading-relaxed text-muted-foreground">
            Toothaches, swelling, a broken tooth, or a crown or filling that came out do not wait for
            a good time. We set aside time each day for emergencies and will do our best to see you as
            soon as possible. If you have swelling that is spreading or trouble breathing or
            swallowing, go to the nearest emergency room.
          </p>
          <CallLink variant="button" />
        </div>
      </div>
    </section>
  );
}