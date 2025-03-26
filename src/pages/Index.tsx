
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

// Simple loading component for lazy-loaded sections
const SectionLoader = () => (
  <div className="w-full py-20 flex justify-center">
    <div className="w-12 h-12 rounded-full border-4 border-indigo-600/20 border-t-indigo-600 animate-spin"></div>
  </div>
);

const Index: React.FC = () => {
  useEffect(() => {
    // Preload critical resources as soon as the component mounts
    const preloadCriticalResources = async () => {
      // Preload video using a low priority fetch to avoid blocking other resources
      const videoPreload = new Request('https://cdn.pixabay.com/video/2022/06/21/121470-724697516_large.mp4', {
        priority: 'low'
      });
      
      // Preconnect to external origins to speed up subsequent requests
      const preconnect = document.createElement('link');
      preconnect.rel = 'preconnect';
      preconnect.href = 'https://cdn.pixabay.com';
      document.head.appendChild(preconnect);
      
      // Start loading the video after a short delay to prioritize critical UI
      setTimeout(() => {
        fetch(videoPreload).catch(() => {});
      }, 2000);
      
      // Preload essential images with low priority
      const preloadImages = [
        'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=800&q=80'
      ];
      
      preloadImages.forEach(src => {
        setTimeout(() => {
          const img = new Image();
          // Use the 'loading' attribute instead of 'fetchPriority'
          img.setAttribute('loading', 'lazy');
          img.src = src;
        }, 3000); // Delay even more for non-critical images
      });
    };
    
    preloadCriticalResources();
    
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
    
    return () => {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.removeEventListener('click', function() {});
      });
    };
  }, []);

  // Use intersection observer to lazily load components as they come into view
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Dynamically import the section when it's about to come into view
          const sectionId = entry.target.id;
          if (sectionId === 'services-section') {
            import('@/components/Services');
          } else if (sectionId === 'portfolio-section') {
            import('@/components/Portfolio');
          } else if (sectionId === 'process-section') {
            import('@/components/Process');
          } else if (sectionId === 'contact-section') {
            import('@/components/Contact');
          }
          // Once loaded, stop observing this section
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: '200px' });

    // Add placeholder elements to observe
    const sectionIds = ['services-section', 'portfolio-section', 'process-section', 'contact-section'];
    sectionIds.forEach(id => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => {
      sectionIds.forEach(id => {
        const element = document.getElementById(id);
        if (element) observer.unobserve(element);
      });
    };
  }, []);

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navbar />
      <Hero />
      
      {/* Add placeholder divs for each section to enable intersection observer */}
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
