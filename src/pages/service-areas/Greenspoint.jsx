import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CheckCircle, MapPin } from 'lucide-react';
import usePageMeta from '@/hooks/usePageMeta';

const TITLE = 'Dentist in Greenspoint, Houston TX - Greenspoint Dental';
const DESCRIPTION =
  'Greenspoint Dental is at 12523 Greenspoint Drive, Houston, TX 77060, at the corner of Greens Road and Greenspoint Drive. Free parking. Bilingual care.';

const SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Dentist',
  name: 'Greenspoint Dental',
  url: 'https://greenspointdental.com/service-areas/greenspoint/',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '12523 Greenspoint Drive',
    addressLocality: 'Houston',
    addressRegion: 'TX',
    postalCode: '77060',
    addressCountry: 'US',
  },
  knowsLanguage: ['en', 'es'],
};

const CARE_LINKS = [
  { label: 'General dentistry', path: '/services/general' },
  { label: 'Cosmetic dentistry', path: '/services/cosmetic' },
  { label: 'Restorative dentistry', path: '/services/restorative' },
  { label: 'Orthodontics', path: '/services/orthodontics' },
  { label: 'New patient specials', path: '/services/specials/' },
  { label: 'Financing and payment plans', path: '/financing/' },
];

const LINK_CLASS =
  'rounded font-semibold text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2';

export default function Greenspoint() {
  usePageMeta({ title: TITLE, description: DESCRIPTION });

  return (
    <div>
      <section className="bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-14 md:py-20">
        <div className="mx-auto max-w-5xl px-4">
          <Link to="/service-areas" className={`text-sm ${LINK_CLASS}`}>
            All service areas
          </Link>
          <h1 className="mb-6 mt-4 font-heading text-3xl leading-tight text-foreground md:text-5xl">
            Dentist in Greenspoint, Houston TX
          </h1>
          <p className="max-w-3xl font-body text-base leading-relaxed text-muted-foreground md:text-lg">
            Greenspoint Dental has cared for families in this area since 1997. Our office sits on
            Greenspoint Drive, between Greens Road and the Beltway, with free parking at the door.
          </p>
        </div>
      </section>

      <section className="bg-background py-12 md:py-16">
        <div className="mx-auto grid max-w-5xl gap-8 px-4 lg:grid-cols-2">
          <div>
            <h2 className="mb-4 font-heading text-2xl text-foreground md:text-3xl">
              Where to Find Our Office
            </h2>
            <p className="mb-4 flex items-start gap-2 font-body leading-relaxed text-muted-foreground">
              <MapPin className="mt-1 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
              <span>
                12523 Greenspoint Drive, at the corner of Greens Road and Greenspoint Drive, behind
                the McDonalds. Plenty of free parking.
              </span>
            </p>
            <address className="mb-6 font-body leading-relaxed not-italic text-muted-foreground">
              Greenspoint Dental<br />
              12523 Greenspoint Drive<br />
              Houston, TX 77060
            </address>
            <h2 className="mb-3 font-heading text-2xl text-foreground md:text-3xl">Care We Offer</h2>
            <ul className="space-y-2">
              {CARE_LINKS.map((item) => (
                <li key={item.label} className="flex items-start gap-2 font-body text-sm">
                  <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                  <Link to={item.path} className={LINK_CLASS}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="h-72 overflow-hidden rounded-2xl border border-border bg-muted/40 lg:h-auto lg:min-h-80">
            <iframe
              title="Map showing Greenspoint Dental at 12523 Greenspoint Drive, Houston, TX 77060"
              src="https://www.google.com/maps?q=12523+Greenspoint+Drive,+Houston,+TX+77060&output=embed"
              className="h-full w-full"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      <section className="bg-primary/5 py-14 md:py-16">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="mb-4 font-heading text-2xl text-foreground md:text-3xl">
            Dental Care Close to Home
          </h2>
          <p className="mb-8 font-body leading-relaxed text-muted-foreground">
            New patients pay $99 for a comprehensive exam, full X-rays and a professional cleaning.
            Our team speaks English and Spanish.
          </p>
          <Link to="/contact">
            <Button
              size="lg"
              className="rounded-full bg-primary px-8 font-semibold text-primary-foreground hover:bg-primary/90"
            >
              Book Your Appointment
            </Button>
          </Link>
          <p className="mt-6 font-body text-sm">
            <Link to="/service-areas/" className={LINK_CLASS}>
              See all the neighborhoods we serve
            </Link>
          </p>
        </div>
      </section>

      <script type="application/ld+json">{JSON.stringify(SCHEMA)}</script>
    </div>
  );
}