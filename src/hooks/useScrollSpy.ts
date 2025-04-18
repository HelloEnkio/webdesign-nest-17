
import { useEffect, useState } from "react";

interface UseScrollSpyOptions {
  sectionIds?: string[];
  updateUrlHash?: boolean;
}

export const useScrollSpy = ({
  sectionIds = [],
  updateUrlHash = true,
}: UseScrollSpyOptions = {}) => {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [hasUserScrolled, setHasUserScrolled] = useState(false);

  // Only mark as "scrolled" on real user input
  useEffect(() => {
    const markScrolled = () => {
      setHasUserScrolled(true);
      window.removeEventListener("wheel", markScrolled);
      window.removeEventListener("touchmove", markScrolled);
    };

    window.addEventListener("wheel", markScrolled as any, { once: true, passive: true });
    window.addEventListener("touchmove", markScrolled as any, { once: true, passive: true });

    return () => {
      window.removeEventListener("wheel", markScrolled as any);
      window.removeEventListener("touchmove", markScrolled as any);
    };
  }, []);

  useEffect(() => {
    if (sectionIds.length === 0 || typeof window === "undefined" || !("IntersectionObserver" in window)) {
      return;
    }

    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (!elements.length) return;

    // Only update the hash when the section is at least 50% in view
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.intersectionRatio >= 0.5)
          .sort((a, b) =>
            Math.abs(a.boundingClientRect.top + a.boundingClientRect.height / 2 - window.innerHeight / 2) -
            Math.abs(b.boundingClientRect.top + b.boundingClientRect.height / 2 - window.innerHeight / 2)
          );

        if (visible.length > 0) {
          const current = visible[0].target.id;
          setActiveSection(current);

          if (updateUrlHash && hasUserScrolled) {
            window.history.replaceState(
              null,
              document.title,
              `${window.location.pathname}${window.location.search}#${current}`
            );
          }
        }
      },
      {
        root: null,
        threshold: [0.5],
        rootMargin: "0px 0px -50% 0px",
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sectionIds, hasUserScrolled, updateUrlHash]);

  return { activeSection };
};
