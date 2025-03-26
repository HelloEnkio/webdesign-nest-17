
import React, { useEffect, lazy, Suspense } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import { Toaster } from '@/components/ui/toaster';

// Lazy-load non-critical components
const Services = lazy(() => import('@/components/Services'));
const Portfolio = lazy(() => import('@/components/Portfolio'));
const Process = lazy(() => import('@/components/Process'));
const Contact = lazy(() => import('@/components/Contact'));
const Footer = lazy(() => import('@/components/Footer'));

// Minimal loading indicator for lazy-loaded sections
const SectionLoader = () => <div className="w-full py-20"></div>;

const Index: React.FC = () => {
  useEffect(() => {
    // Configuration de base du comportement de défilement
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'auto'; // Laisse le navigateur gérer la restauration
    }

    // Gestionnaire simple pour les liens d'ancrage internes
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      
      if (!anchor) return;
      
      const href = anchor.getAttribute('href');
      
      if (href && href.startsWith('#')) {
        e.preventDefault();
        
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    };
    
    document.addEventListener('click', handleAnchorClick);
    
    return () => {
      document.removeEventListener('click', handleAnchorClick);
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
