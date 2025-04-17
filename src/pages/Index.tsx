
import React, { useEffect, lazy, Suspense } from 'react';
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
  useEffect(() => {
    // Cette fonction gère uniquement le défilement initial après chargement
    const handleInitialScroll = () => {
      if (window.location.hash) {
        const targetId = window.location.hash.substring(1);
        
        // Toujours mettre à jour l'URL hash immédiatement
        window.history.replaceState(null, document.title, `#${targetId}`);
        
        // Fonction pour tenter le défilement avec tentatives multiples
        const attemptScroll = (attemptsLeft = 20, delay = 100) => {
          const targetElement = document.getElementById(targetId);
          
          if (targetElement) {
            console.log(`Found target element #${targetId}, scrolling to it`);
            
            document.documentElement.classList.add('smooth-scroll');
            targetElement.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
            
            setTimeout(() => {
              document.documentElement.classList.remove('smooth-scroll');
            }, 1000);
            
            return; // Succès, sortir de la boucle de tentatives
          }
          
          if (attemptsLeft > 0) {
            console.log(`Target #${targetId} not found yet, retrying... (${attemptsLeft} attempts left)`);
            // Planifier une autre tentative après le délai
            setTimeout(() => attemptScroll(attemptsLeft - 1, delay), delay);
          } else {
            console.log(`Failed to find #${targetId} after multiple attempts`);
          }
        };
        
        // Démarrer le processus de polling pour trouver et défiler vers la cible
        attemptScroll();
      }
    };
    
    // Attendre un court instant pour que tout le DOM essentiel soit chargé
    setTimeout(handleInitialScroll, 100);
    
    // Pas de dépendances dans useEffect pour garantir qu'il ne s'exécute qu'une fois
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
