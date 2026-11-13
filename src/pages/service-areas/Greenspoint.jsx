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
import { BUSINESS_NODE, toJsonLdString } from '@/lib/businessSchema';
import InternalLinkHub from '@/components/seo/InternalLinkHub';

const TITLE = 'Family Dentist in Greenspoint, TX 77060 - Greenspoint Dental';
const DESCRIPTION =
  'Family and emergency dentist at 12523 Greenspoint Dr, Houston, TX 77060. Bilingual team, judgment-free care and a $99 new patient special.';

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
      <InternalLinkHub
        currentPath="/service-areas/greenspoint/"
        areaName="Greenspoint"
        title="Dental Services at Our Greenspoint Office"
        intro="Everything from routine cleanings to full smile restoration happens under one roof on Greenspoint Drive. Here is where to start."
        showAreas={false}
      />
      <GreenspointClosing />
      <script type="application/ld+json">
        {toJsonLdString({ '@context': 'https://schema.org', ...BUSINESS_NODE })}
      </script>
      <script type="application/ld+json">{toJsonLdString(BREADCRUMB_SCHEMA)}</script>
    </div>
  );
}