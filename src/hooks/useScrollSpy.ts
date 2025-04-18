
import { useEffect, useState } from "react";
interface UseScrollSpyOptions { sectionIds?: string[]; }
export const useScrollSpy = ({
  sectionIds = []
}: UseScrollSpyOptions = {}) => {
  const [activeSection, setActiveSection] = useState<string|null>(null);
  const [hasUserScrolled, setHasUserScrolled] = useState(false);
  // mark only on true user scroll
  useEffect(() => {
    const onUser = () => { setHasUserScrolled(true); };
    window.addEventListener("wheel", onUser, { once:true, passive:true });
    window.addEventListener("touchmove", onUser, { once:true, passive:true });
    return () => {
      window.removeEventListener("wheel", onUser);
      window.removeEventListener("touchmove", onUser);
    };
  }, []);
  // observe after first scroll
  useEffect(() => {
    if (!hasUserScrolled || !sectionIds.length) return;
    const els = sectionIds
      .map(id => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);
    if (!els.length) return;
    const obs = new IntersectionObserver(entries => {
      const centerY = window.innerHeight/2;
      const visible = entries
        .filter(e => e.intersectionRatio >= 0.5)
        .map(e => {
          const rect = e.boundingClientRect;
          const mid = rect.top + rect.height/2;
          return { id: e.target.id, dist: Math.abs(mid - centerY) };
        })
        .sort((a,b) => a.dist - b.dist);
      if (visible.length) {
        const sec = visible[0].id;
        setActiveSection(sec);
        window.history.replaceState(
          null,
          document.title,
          `${window.location.pathname}${window.location.search}#${sec}`
        );
      }
    }, { root:null, threshold:[0.5], rootMargin:"0px 0px -50% 0px" });
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, [hasUserScrolled, sectionIds]);
  return { activeSection };
};
