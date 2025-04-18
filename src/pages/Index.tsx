
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
  
  // Utiliser le hook avec options améliorées - désactiver totalement la détection initiale
  const { activeSection } = useScrollSpy({ 
    sectionIds: sectionIds,
    updateHash: false,
    disableInitialDetection: true // Désactiver complètement la détection initiale
  });

  // Effet pour gérer le défilement au chargement initial
  useEffect(() => {
    if (isInitialLoad) {
      // Forcer immédiatement le scroll tout en haut de la page
      window.scrollTo(0, 0);
      
      // Vider tout hash dans l'URL pour éviter tout défilement automatique
      if (window.location.hash) {
        window.history.replaceState(null, document.title, window.location.pathname + window.location.search);
      }
      
      // N'activer le traitement du hash qu'après avoir garantit que le défilement est en haut
      setTimeout(() => {
        setIsInitialLoad(false);
      }, 500);
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
