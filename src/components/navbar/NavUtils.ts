
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';

interface ScrollToSectionProps {
  sectionId: string;
  e?: React.MouseEvent;
  isHomePage: boolean;
  handleMobileItemClick: () => void;
}

export const useNavigation = () => {
  const navigate = useNavigate();

  const scrollToSection = useCallback(({ sectionId, e, isHomePage, handleMobileItemClick }: ScrollToSectionProps) => {
    if (e) {
      e.preventDefault();
    }
    
    // Si pas sur la page d'accueil, naviguer vers la page d'accueil avec l'id de section
    if (!isHomePage) {
      navigate(`/#${sectionId}`);
      return;
    }
    
    document.documentElement.classList.add('smooth-scroll');
    
    // Toujours mettre à jour l'URL hash, quel que soit le résultat de la recherche de la section
    window.history.replaceState(null, document.title, `#${sectionId}`);
    
    // Après avoir mis à jour l'URL, tenter de défiler vers la section si elle existe
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      console.log(`Scrolling to section '${sectionId}'`);
    } else {
      console.log(`Section with id '${sectionId}' not found in DOM yet (possibly due to lazy loading)`);
    }
    
    setTimeout(() => {
      document.documentElement.classList.remove('smooth-scroll');
    }, 1000);
    
    handleMobileItemClick();
  }, [navigate]);

  const scrollToTop = useCallback((e?: React.MouseEvent, isHomePage?: boolean, handleMobileItemClick?: () => void) => {
    if (e) {
      e.preventDefault();
    }
    
    // Si pas sur la page d'accueil, naviguer vers la page d'accueil
    if (!isHomePage) {
      navigate('/');
      return;
    }
    
    document.documentElement.classList.add('smooth-scroll');
    
    // Mettre à jour l'URL pour utiliser le hash de la section hero
    window.history.replaceState(null, document.title, '#hero-section');
    
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    
    setTimeout(() => {
      document.documentElement.classList.remove('smooth-scroll');
    }, 1000);
    
    if (handleMobileItemClick) {
      handleMobileItemClick();
    }
  }, [navigate]);

  return {
    scrollToSection,
    scrollToTop
  };
};
