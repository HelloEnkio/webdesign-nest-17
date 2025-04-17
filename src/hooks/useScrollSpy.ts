
import { useEffect, useState } from 'react';

interface UseScrollSpyOptions {
  sectionIds: string[];
  threshold?: number;
  rootMargin?: string;
}

export const useScrollSpy = ({ 
  sectionIds = [], 
  threshold = 0.5, 
  rootMargin = "0px" 
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

    let maxVisibleSection: { id: string; ratio: number } | null = null;

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the section with the highest intersection ratio
        entries.forEach(entry => {
          const sectionId = entry.target.id;
          const intersectionRatio = entry.intersectionRatio;

          if (
            entry.isIntersecting && 
            (!maxVisibleSection || intersectionRatio > maxVisibleSection.ratio)
          ) {
            maxVisibleSection = {
              id: sectionId,
              ratio: intersectionRatio
            };
          }
        });

        // After processing all entries, update active section
        if (maxVisibleSection) {
          setActiveSection(maxVisibleSection.id);
          
          // Only update URL hash after user has scrolled or clicked
          if (hasScrolled) {
            window.history.replaceState(
              null, 
              document.title, 
              maxVisibleSection.id ? `#${maxVisibleSection.id}` : window.location.pathname
            );
          }
          
          // Reset for next observation
          maxVisibleSection = null;
        }
      },
      {
        root: null, // viewport
        rootMargin,
        threshold: [0, 0.25, 0.5, 0.75, 1]
      }
    );

    // Start observing all section elements
    elements.forEach(element => {
      observer.observe(element);
    });

    return () => {
      observer.disconnect();
    };
  }, [sectionIds, threshold, rootMargin, hasScrolled]);

  return { activeSection };
};
