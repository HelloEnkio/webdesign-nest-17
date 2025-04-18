
import React, { lazy, Suspense, useEffect, useState } from 'react';
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
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  
  // Définir les sections pour le scroll spy
  const sectionIds = [
    'hero-section',
    'services-section',
    'portfolio-section',
    'process-section',
    'contact-section'
  ];
  
  // Utiliser le hook avec options améliorées
  const { activeSection } = useScrollSpy({ 
    sectionIds: sectionIds,
    updateHash: false,
    disableInitialDetection: true // Désactiver la détection initiale pour éviter le défilement indésirable
  });

  useEffect(() => {
    // Forcer le défilement vers le haut lors du chargement initial
    if (isInitialLoad) {
      // Forcer le défilement vers le haut, quelle que soit la situation
      window.scrollTo(0, 0);
      
      // Si c'est le chargement initial et qu'il y a un hash, le traiter après avoir forcé le défilement vers le haut
      if (window.location.hash) {
        setTimeout(() => {
          const element = document.querySelector(window.location.hash);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 300); // Augmenter le délai pour s'assurer que le défilement vers le haut a eu lieu
      } else {
        // Si pas de hash, s'assurer que l'URL ne contient pas de fragment
        if (window.location.href.includes('#')) {
          window.history.replaceState(null, document.title, window.location.pathname + window.location.search);
        }
      }
      
      setIsInitialLoad(false);
    }
  }, [isInitialLoad]);
  
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
