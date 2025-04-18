
import { useEffect, useState } from 'react';

export const useScrollSpy = (sectionIds: string[]) => {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const onFirst = () => {
      setHasScrolled(true);
      window.removeEventListener('scroll', onFirst);
    };
    window.addEventListener('scroll', onFirst, { once: true });
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;

    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.intersectionRatio >= 0.5) {
          setActiveSection(entry.target.id);
          if (hasScrolled) {
            window.history.replaceState(null, document.title, `#${entry.target.id}`);
          }
        }
      });
    }, options);

    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sectionIds, hasScrolled]);

  return { activeSection };
};

