
import { useEffect, useState } from 'react';

interface UseScrollSpyOptions {
  sectionIds: string[];
  threshold?: number;
  rootMargin?: string;
  observerDelay?: number;
}

export const useScrollSpy = ({ 
  sectionIds = [], 
  threshold = 0, 
  rootMargin = "0px 0px -50% 0px",
  observerDelay = 800
}: UseScrollSpyOptions) => {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    // Flag to prevent hash updates until the user has scrolled
    const handleFirstScroll = () => {
      setHasScrolled(true);
      window.removeEventListener('scroll', handleFirstScroll);
    };
    
    window.addEventListener('scroll', handleFirstScroll);
    
    return () => {
      window.removeEventListener('scroll', handleFirstScroll);
    };
  }, []);

  useEffect(() => {
    if (!sectionIds.length || typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      return;
    }

    // Don't set active section from URL hash on initial load
    // (We let Index.tsx clear the hash instead)

    const elements = sectionIds
      .map(id => document.getElementById(id))
      .filter(element => element !== null) as HTMLElement[];

    if (elements.length === 0) {
      console.log('No section elements found to observe');
      return;
    }

    // Simplified callback that only updates when a section is intersecting
    const callback: IntersectionObserverCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
          
          // Only update URL hash after user has scrolled
          if (hasScrolled) {
            window.history.replaceState(
              null, 
              document.title, 
              `#${entry.target.id}`
            );
          }
        }
      });
    };

    // Reference to the timeout for cleanup
    let observerInitTimeout: ReturnType<typeof setTimeout>;
    
    // Reference to the observer for cleanup
    let observer: IntersectionObserver;
    
    // Delay the creation of the observer
    observerInitTimeout = setTimeout(() => {
      observer = new IntersectionObserver(callback, {
        root: null, // viewport
        rootMargin,
        threshold
      });

      // Start observing all section elements
      elements.forEach(element => {
        observer.observe(element);
      });
    }, observerDelay);

    return () => {
      clearTimeout(observerInitTimeout);
      if (observer) {
        observer.disconnect();
      }
    };
  }, [sectionIds, threshold, rootMargin, hasScrolled, observerDelay]);

  return { activeSection };
};
