import React from 'react';
import HeroSection from '../components/home/HeroSection';
import ValuesSection from '../components/home/ValuesSection';
import ServicesOverview from '../components/home/ServicesOverview';
import SpecialsSection from '../components/home/SpecialsSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import FinancingBanner from '../components/home/FinancingBanner';

export default function Home() {
  return (
    <div>
      <HeroSection />
      <ValuesSection />
      <ServicesOverview />
      <SpecialsSection />
      <TestimonialsSection />
      <FinancingBanner />
    </div>
  );
}