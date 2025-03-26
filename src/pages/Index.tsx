
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
    // Force scroll to top on component mount with high priority
    window.scrollTo(0, 0);
    
    // Use a second scroll to top with a slight delay to ensure it works even after all content is loaded
    const timer = setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'auto'
      });
    }, 50);
    
    // Handle smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const href = this.getAttribute('href');
        if (!href) return;
        
        const target = document.querySelector(href);
        if (!target) return;
        
        window.scrollTo({
          top: (target as HTMLElement).offsetTop - 80, // Accounting for navbar height
          behavior: 'smooth'
        });
      });
    });
    
    // Preload non-critical resources with lowest priority after core content is visible
    setTimeout(() => {
      // Preconnect to external origins
      const preconnect = document.createElement('link');
      preconnect.rel = 'preconnect';
      preconnect.href = 'https://cdn.pixabay.com';
      document.head.appendChild(preconnect);
      
      // Only start preloading the background video after critical content is rendered
      const videoPreload = new Request('https://cdn.pixabay.com/video/2022/06/21/121470-724697516_large.mp4');
      fetch(videoPreload).catch(() => {});
      
      // Preload non-critical images with lowest priority
      ['https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80',
       'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
       'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=800&q=80'
      ].forEach(src => {
        const img = new Image();
        img.setAttribute('loading', 'lazy');
        img.src = src;
      });
    }, 500); // Delay loading non-critical resources until after core content is displayed
    
    return () => {
      clearTimeout(timer);
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.removeEventListener('click', function() {});
      });
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
