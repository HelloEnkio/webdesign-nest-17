
import { useEffect, useState } from 'react';

export const useScrollSpy = (sectionIds: string[]) => {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [hasScrolled, setHasScrolled] = useState(false);

  // Détecter le premier scroll utilisateur
  useEffect(() => {
    const onFirst = () => {
      setHasScrolled(true);
      window.removeEventListener('scroll', onFirst);
    };
    window.addEventListener('scroll', onFirst, { passive: true });
    return () => window.removeEventListener('scroll', onFirst);
  }, []);

  // Observer les sections uniquement après le premier scroll
  useEffect(() => {
    if (!hasScrolled || typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      return;
    }

    // callback qui ne garde que la section la plus proche du centre
    const callback: IntersectionObserverCallback = (entries) => {
      const centerY = window.innerHeight / 2;
      // filtrer les sections intersecting >50%
      const visible = entries
        .filter(e => e.intersectionRatio >= 0.5)
        .map(e => {
          const rect = (e as any).boundingClientRect as DOMRect;
          const mid = rect.top + rect.height / 2;
          return { id: e.target.id, distance: Math.abs(mid - centerY) };
        });

      if (visible.length === 0) return;

      // choisir la section la plus près du centre
      const closest = visible.sort((a, b) => a.distance - b.distance)[0].id;
      if (closest !== activeSection) {
        setActiveSection(closest);
        window.history.replaceState(null, document.title, `#${closest}`);
      }
    };

    const observer = new IntersectionObserver(callback, {
      root: null,
      rootMargin: '0px',
      threshold: [0.5]    // on veut 50% visible
    });

    // start observing
    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sectionIds, hasScrolled, activeSection]);

  return { activeSection };
};

