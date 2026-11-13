import React from 'react';
import usePageMeta from '@/hooks/usePageMeta';
import { BUSINESS_NODE, toJsonLdString } from '@/lib/businessSchema';
import AreasHero from '@/components/service-areas/AreasHero';
import HomeOfficeCard from '@/components/service-areas/HomeOfficeCard';
import NeighborhoodGrid from '@/components/service-areas/NeighborhoodGrid';
import FindUsSection from '@/components/service-areas/FindUsSection';
import WhyNeighborsSection from '@/components/service-areas/WhyNeighborsSection';
import AreasFaq from '@/components/service-areas/AreasFaq';
import ClosingCta from '@/components/service-areas/ClosingCta';
import InternalLinkHub from '@/components/seo/InternalLinkHub';

const TITLE = 'Family Dentist Serving North Houston - Greenspoint Dental';
const DESCRIPTION =
  'Family dentist at 12523 Greenspoint Dr, Houston, TX 77060, serving Greenspoint, Imperial Valley, Southbrook, Colonial Hills and Green Ridge North. Bilingual care.';

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
      <InternalLinkHub
        currentPath="/service-areas"
        intro="Each neighborhood page covers drive times, parking and the care patients nearby ask for most. Our service pages explain every treatment in detail."
      />
      <ClosingCta />
      <script type="application/ld+json">
        {toJsonLdString({ '@context': 'https://schema.org', ...BUSINESS_NODE })}
      </script>
    </div>
  );
}