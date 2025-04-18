
import React, { lazy, Suspense, useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import { Toaster } from '@/components/ui/toaster';

// Lazy-load non-critical components with lower priority
const Services = lazy(() => import('@/components/Services'));
const Portfolio = lazy(() => import('@/components/Portfolio'));
const Process = lazy(() => import('@/components/Process'));
const Contact = lazy(() => import('@/components/Contact'));
const Footer = lazy(() => import('@/components/Footer'));

// Minimal loading indicator for lazy-loaded sections
const SectionLoader = () => <div className="w-full py-20"></div>;

const Index: React.FC = () => {
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    // Handle hash navigation on initial load only
    if (isInitialLoad) {
      if (window.location.hash) {
        // If there's a hash, scroll to that element after a short delay
        setTimeout(() => {
          const element = document.querySelector(window.location.hash);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      } else {
        // If there's no hash and it's the initial load, scroll to top
        window.scrollTo(0, 0);
      }
      setIsInitialLoad(false);
    }
  }, [isInitialLoad]);

  // Add section IDs for the useScrollSpy hook to track
  useEffect(() => {
    // Get all section IDs for scroll spy
    const sectionIds = [
      'hero-section',
      'services-section',
      'portfolio-section',
      'process-section',
      'contact-section'
    ];

    // This is just to ensure the component knows about the section IDs
    // The actual scroll spy logic is in useScrollSpy.ts
    return () => {
      // Cleanup if needed
    };
  }, []);
  
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navbar />
      <div id="hero-section">
        <Hero />
      </div>
      
      <div id="services-section">
        <Suspense fallback={<SectionLoader />}>
          <Services />
        </Suspense>
      </div>
      
      <div id="portfolio-section">
        <Suspense fallback={<SectionLoader />}>
          <Portfolio />
        </Suspense>
      </div>
      
      <div id="process-section">
        <Suspense fallback={<SectionLoader />}>
          <Process />
        </Suspense>
      </div>
      
      <div id="contact-section">
        <Suspense fallback={<SectionLoader />}>
          <Contact />
        </Suspense>
      </div>
      
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
      
      <Toaster />
    </div>
  );
};

export default Index;
