
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

    const callback: IntersectionObserverCallback = (entries) => {
      // Sélectionner uniquement les sections intersecting
      const intersecting = entries.filter(e => e.isIntersecting);
      if (intersecting.length === 0) return;

      // Calculer la distance de chaque section au centre du viewport
      const centerY = window.innerHeight / 2;
      const closest = intersecting
        .map(e => {
          const rect = e.boundingClientRect;
          const mid = rect.top + rect.height / 2;
          return { id: e.target.id, distance: Math.abs(mid - centerY) };
        })
        .sort((a, b) => a.distance - b.distance)[0];  // la plus proche du centre

      // Mettre à jour l'état et le hash une fois la première fois que l'utilisateur scroll
      setActiveSection(closest.id);
      if (hasScrolled) {
        window.history.replaceState(null, document.title, `#${closest.id}`);
      }
    };

    const observer = new IntersectionObserver(callback, {
      root: null,
      rootMargin: '0px',
      threshold: 0.5
    });

    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sectionIds, hasScrolled]);

  return { activeSection };
};

