
import { useEffect, useState } from 'react';

export const useScrollSpy = (sectionIds: string[]) => {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      let newActive: string | null = null;
      const offset = window.innerHeight * 0.1; // 10% from top
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top;
        if (top <= offset) {
          newActive = id;
        } else {
          break;
        }
      }
      if (newActive && newActive !== activeSection) {
        setActiveSection(newActive);
        window.history.replaceState(null, document.title, `#${newActive}`);
      }
    };

    // Clear any hash on first paint
    window.history.replaceState(null, document.title, window.location.pathname);
    window.scrollTo(0, 0);

    // Listen to scroll
    window.addEventListener('scroll', handleScroll, { passive: true });
    // Fire once to set initial section
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [sectionIds, activeSection]);

  return { activeSection };
};
