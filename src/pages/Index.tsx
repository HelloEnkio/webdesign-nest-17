import React, { useLayoutEffect, useEffect, lazy, Suspense } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import { Toaster } from '@/components/ui/toaster';
import { useScrollSpy } from '@/hooks/useScrollSpy';

// Lazy-load non-critical components with lower priority
const Services = lazy(() => import('@/components/Services'));
const Portfolio = lazy(() => import('@/components/Portfolio'));
const Process = lazy(() => import('@/components/Process'));
const Contact = lazy(() => import('@/components/Contact'));
const Footer = lazy(() => import('@/components/Footer'));

// Minimal loading indicator for lazy-loaded sections
const SectionLoader = () => <div className="w-full py-20"></div>;

const Index: React.FC = () => {
  const { activeSection } = useScrollSpy({
    sectionIds: ['hero-section', 'services-section', 'portfolio-section', 'process-section', 'contact-section'],
    threshold: 0.5
  });

  // Nettoyer le hash et forcer le scroll en haut AVANT le paint du navigateur
  useLayoutEffect(() => {
    window.history.replaceState(null, document.title, window.location.pathname);
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const handleFirstScroll = () => {
      window.removeEventListener('scroll', handleFirstScroll);
    };
    
    window.addEventListener('scroll', handleFirstScroll);
    return () => {
      window.removeEventListener('scroll', handleFirstScroll);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navbar />
      <Hero />
      
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
