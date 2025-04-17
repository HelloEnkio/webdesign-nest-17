
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
    // Consolidated hash handling logic with polling for lazy-loaded sections
    if (window.location.hash) {
      const targetId = window.location.hash.substring(1);
      
      // Always update URL hash first, without condition
      window.history.replaceState(null, document.title, `#${targetId}`);
      
      // Function to attempt scrolling with retry logic
      const attemptScroll = (attemptsLeft = 10, delay = 100) => {
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
          
          return; // Success, exit the retry loop
        }
        
        if (attemptsLeft > 0) {
          console.log(`Target #${targetId} not found yet, retrying... (${attemptsLeft} attempts left)`);
          // Schedule another attempt after delay
          setTimeout(() => attemptScroll(attemptsLeft - 1, delay), delay);
        } else {
          console.log(`Failed to find #${targetId} after multiple attempts`);
        }
      };
      
      // Start the polling process to find and scroll to the target
      attemptScroll();
    }
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
