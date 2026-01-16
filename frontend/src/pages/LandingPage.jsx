import React from 'react';
import { LandingNavbar } from '@/components/landing/LandingNavbar';
import { HeroSection } from '@/components/landing/HeroSection';
import { FeaturedJobsSection } from '@/components/landing/FeaturedJobsSection';
import { RolesSection } from '@/components/landing/RolesSection';
import { TestimonialsSection } from '@/components/landing/TestimonialsSection';
import { LandingFooter } from '@/components/landing/LandingFooter';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <LandingNavbar />
      <main>
        <HeroSection />
        <FeaturedJobsSection />
        <RolesSection />
        <TestimonialsSection />
      </main>
      <LandingFooter />
    </div>
  );
};

export default LandingPage;
