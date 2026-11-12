import React from 'react';
import { HOURS, MAP_EMBED_URL } from './areasData';

export default function FindUsSection() {
  return (
    <section className="bg-muted/40 py-12 md:py-16">
      <div className="mx-auto max-w-5xl px-4">
        <h2 className="mb-8 font-heading text-2xl text-foreground md:text-3xl">Find Us</h2>
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="h-72 overflow-hidden rounded-2xl border border-border bg-background lg:h-auto lg:min-h-80">
            <iframe
              title="Map showing Greenspoint Dental at 12523 Greenspoint Drive, Houston, TX 77060"
              src={MAP_EMBED_URL}
              className="h-full w-full"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>

          <div>
            <h3 className="mb-2 font-heading text-lg text-foreground">Our Address</h3>
            <address className="mb-6 font-body text-base not-italic leading-relaxed text-muted-foreground">
              Greenspoint Dental<br />
              12523 Greenspoint Drive<br />
              Houston, TX 77060
            </address>

            <h3 className="mb-3 font-heading text-lg text-foreground">Office Hours</h3>
            <table className="w-full border-collapse text-left font-body text-sm">
              <caption className="sr-only">Greenspoint Dental office hours by day</caption>
              <tbody>
                {HOURS.map((row) => (
                  <tr key={row.days} className="border-b border-border last:border-0">
                    <th scope="row" className="py-2.5 pr-4 font-semibold text-foreground">
                      {row.days}
                    </th>
                    <td className="py-2.5 text-muted-foreground">{row.hours}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <p className="mt-5 font-body text-sm leading-relaxed text-muted-foreground">
              Morning visits are easiest to book. If something hurts, call us and we will do our best
              to see you the same day.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}