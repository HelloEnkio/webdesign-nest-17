
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

// Minimal loading indicator for lazy-loaded sections - just a spacer to prevent layout shifts
const SectionLoader = () => <div className="w-full py-20"></div>;

const Index: React.FC = () => {
  useEffect(() => {
    // Explicitement activer la restauration de défilement du navigateur
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'auto';
    }
    
    // On ne gère que les clics sur les liens d'ancrage dans la page
    const handleAnchorClick = (e: Event) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      
      if (!anchor) return;
      
      const href = anchor.getAttribute('href');
      
      if (href && href.startsWith('#')) {
        e.preventDefault();
        
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          // Utiliser scrollIntoView pour une meilleure compatibilité cross-browser
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
          
          // Mettre à jour l'URL sans recharger la page
          window.history.pushState(null, '', href);
        }
      }
    };
    
    // Ajouter l'écouteur d'événements pour les clics
    document.addEventListener('click', handleAnchorClick);
    
    // Ne pas surcharger avec trop de tâches de préchargement
    const timer = setTimeout(() => {
      // Préconnect et préchargement comme avant
      const preconnect = document.createElement('link');
      preconnect.rel = 'preconnect';
      preconnect.href = 'https://cdn.pixabay.com';
      document.head.appendChild(preconnect);
      
      const videoPreload = new Request('https://cdn.pixabay.com/video/2022/06/21/121470-724697516_large.mp4');
      fetch(videoPreload).catch(() => {});
      
      // Précharger les images non critiques
      ['https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80',
       'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
       'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=800&q=80'
      ].forEach(src => {
        const img = new Image();
        img.setAttribute('loading', 'lazy');
        img.src = src;
      });
    }, 500);
    
    // Nettoyage
    return () => {
      document.removeEventListener('click', handleAnchorClick);
      clearTimeout(timer);
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
