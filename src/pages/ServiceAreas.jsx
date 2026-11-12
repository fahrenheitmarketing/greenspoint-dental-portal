import React from 'react';
import usePageMeta from '@/hooks/usePageMeta';
import AreasHero from '@/components/service-areas/AreasHero';
import HomeOfficeCard from '@/components/service-areas/HomeOfficeCard';
import NeighborhoodGrid from '@/components/service-areas/NeighborhoodGrid';
import FindUsSection from '@/components/service-areas/FindUsSection';
import WhyNeighborsSection from '@/components/service-areas/WhyNeighborsSection';
import AreasFaq from '@/components/service-areas/AreasFaq';
import ClosingCta from '@/components/service-areas/ClosingCta';

const TITLE = 'Family Dentist Serving North Houston - Greenspoint Dental';
const DESCRIPTION =
  'Family dentist at 12523 Greenspoint Dr, Houston, TX 77060, serving Greenspoint, Imperial Valley, Southbrook, Colonial Hills and Green Ridge North. Bilingual care.';

const SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Dentist',
  name: 'Greenspoint Dental',
  url: 'https://greenspointdental.com',
  image: 'https://media.base44.com/images/public/69e928fd4b865057d3a65de3/ac3a6cc6c_logo.png',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '12523 Greenspoint Drive',
    addressLocality: 'Houston',
    addressRegion: 'TX',
    postalCode: '77060',
    addressCountry: 'US',
  },
  areaServed: [
    'Greenspoint',
    'Imperial Valley',
    'Southbrook',
    'Colonial Hills',
    'Green Ridge North',
  ].map((name) => ({ '@type': 'Place', name })),
  openingHoursSpecification: [
    { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Monday', opens: '08:00', closes: '16:00' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Tuesday', opens: '08:00', closes: '12:00' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Wednesday', opens: '08:00', closes: '17:00' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Thursday', opens: '08:00', closes: '17:00' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Friday', opens: '08:00', closes: '12:00' },
  ],
  knowsLanguage: ['en', 'es'],
};

export default function ServiceAreas() {
  usePageMeta({ title: TITLE, description: DESCRIPTION });

  return (
    <div>
      <AreasHero />
      <HomeOfficeCard />
      <NeighborhoodGrid />
      <FindUsSection />
      <WhyNeighborsSection />
      <AreasFaq />
      <ClosingCta />
      <script type="application/ld+json">{JSON.stringify(SCHEMA)}</script>
    </div>
  );
}