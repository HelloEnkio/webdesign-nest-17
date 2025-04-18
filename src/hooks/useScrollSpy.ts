
import { useEffect, useState } from 'react';

interface UseScrollSpyOptions {
  sectionIds?: string[];
  offset?: number;
  updateUrlHash?: boolean;
}

/**
 * Hook pour observer quelle section est actuellement visible dans la viewport
 * et mettre à jour l'URL hash en conséquence
 */
export const useScrollSpy = ({
  sectionIds = [],
  offset = 0,
  updateUrlHash = true
}: UseScrollSpyOptions = {}) => {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    const sections = sectionIds
      .map(id => document.getElementById(id))
      .filter(el => el !== null) as HTMLElement[];
    
    if (sections.length === 0) return;

    const callback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const currentSection = entry.target.id;
          setActiveSection(currentSection);
          
          if (updateUrlHash) {
            window.history.replaceState(
              null,
              document.title,
              window.location.pathname + window.location.search + `#${currentSection}`
            );
          }
        }
      });
    };

    const observer = new IntersectionObserver(callback, {
      root: null,
      // On ne veut déclencher que si 60% de la section est visible au centre
      threshold: [0.6],
      // On retire 90% du bas pour ne prendre en compte que la partie haute
      rootMargin: "0px 0px -90% 0px"
    });

    const initDelay = 1500; // 1.5s
    setTimeout(() => {
      sections.forEach(el => observer.observe(el));
    }, initDelay);

    return () => {
      sections.forEach(el => observer.unobserve(el));
    };
  }, [sectionIds, offset, updateUrlHash]);

  return { activeSection };
};
