
import { useEffect, useState } from 'react';

export const useScrollSpy = (sectionIds: string[]) => {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      let newActive: string | null = null;
      const offset = window.innerHeight * 0.1; // 10% from top
      
      // Find the topmost visible section
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        
        const rect = el.getBoundingClientRect();
        // Consider a section visible if its top is above the offset threshold
        // and either bottom is below viewport top or it's the first section
        if (rect.top <= offset) {
          newActive = id;
        } else {
          // Break once we find a section below the threshold
          break;
        }
      }
      
      // Only update if we found an active section and it's different from current
      if (newActive && newActive !== activeSection) {
        setActiveSection(newActive);
        // Update URL hash without triggering scroll
        window.history.replaceState(null, document.title, `#${newActive}`);
      }
    };

    // Clear any hash on first paint and scroll to top
    window.history.replaceState(null, document.title, window.location.pathname);
    window.scrollTo(0, 0);

    // Listen to scroll
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Fire once to set initial section
    setTimeout(handleScroll, 100); // Small delay to ensure DOM is ready

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [sectionIds, activeSection]);

  return { activeSection };
};
