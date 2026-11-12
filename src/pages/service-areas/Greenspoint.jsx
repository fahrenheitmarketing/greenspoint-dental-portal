import React from 'react';
import usePageMeta from '@/hooks/usePageMeta';
import GreenspointHero from '@/components/service-areas/greenspoint/GreenspointHero';
import GreenspointFindUs from '@/components/service-areas/greenspoint/GreenspointFindUs';
import CareBlocks from '@/components/service-areas/greenspoint/CareBlocks';
import EmergencySection from '@/components/service-areas/greenspoint/EmergencySection';
import CostSection from '@/components/service-areas/greenspoint/CostSection';
import NearbyAreas from '@/components/service-areas/greenspoint/NearbyAreas';
import GreenspointFaq from '@/components/service-areas/greenspoint/GreenspointFaq';
import GreenspointClosing from '@/components/service-areas/greenspoint/GreenspointClosing';

const TITLE = 'Family Dentist in Greenspoint, TX 77060 - Greenspoint Dental';
const DESCRIPTION =
  'Family and emergency dentist at 12523 Greenspoint Dr, Houston, TX 77060. Bilingual team, judgment-free care and a $99 new patient special.';

const DENTIST_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Dentist',
  name: 'Greenspoint Dental',
  url: 'https://greenspointdental.com/service-areas/greenspoint/',
  image: 'https://media.base44.com/images/public/69e928fd4b865057d3a65de3/ac3a6cc6c_logo.png',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '12523 Greenspoint Drive',
    addressLocality: 'Houston',
    addressRegion: 'TX',
    postalCode: '77060',
    addressCountry: 'US',
  },
  telephone: '+1-281-823-9987',
  openingHoursSpecification: [
    { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Monday', opens: '08:00', closes: '16:00' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Tuesday', opens: '08:00', closes: '12:00' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Wednesday', opens: '08:00', closes: '17:00' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Thursday', opens: '08:00', closes: '17:00' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Friday', opens: '08:00', closes: '12:00' },
  ],
  areaServed: ['Greenspoint', 'Imperial Valley', 'Southbrook', 'Colonial Hills', 'Green Ridge North'].map(
    (name) => ({ '@type': 'Place', name })
  ),
  knowsLanguage: ['English', 'Spanish'],
  sameAs: [
    'https://www.facebook.com/GreensPointDental/',
    'https://www.instagram.com/greenspointdental/',
    'https://x.com/GreensPointDMD',
  ],
};

const BREADCRUMB_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://greenspointdental.com/' },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Service Areas',
      item: 'https://greenspointdental.com/service-areas/',
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'Greenspoint',
      item: 'https://greenspointdental.com/service-areas/greenspoint/',
    },
  ],
};

export default function Greenspoint() {
  usePageMeta({ title: TITLE, description: DESCRIPTION });

  return (
    <div>
      <GreenspointHero />
      <GreenspointFindUs />
      <CareBlocks />
      <EmergencySection />
      <CostSection />
      <NearbyAreas />
      <GreenspointFaq />
      <GreenspointClosing />
      <script type="application/ld+json">{JSON.stringify(DENTIST_SCHEMA)}</script>
      <script type="application/ld+json">{JSON.stringify(BREADCRUMB_SCHEMA)}</script>
    </div>
  );
}