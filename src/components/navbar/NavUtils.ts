
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
    
    // If not on home page, navigate to home page with the section id
    if (!isHomePage) {
      navigate(`/#${sectionId}`);
      return;
    }
    
    document.documentElement.classList.add('smooth-scroll');
    
    // Always update URL hash, even if section is not found
    if (sectionId) {
      window.history.replaceState(null, document.title, `#${sectionId}`);
    } else {
      window.history.replaceState(null, document.title, window.location.pathname);
    }
    
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
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
    
    // If not on home page, navigate to home page
    if (!isHomePage) {
      navigate('/');
      return;
    }
    
    document.documentElement.classList.add('smooth-scroll');
    
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    
    setTimeout(() => {
      document.documentElement.classList.remove('smooth-scroll');
    }, 1000);
    
    // Always update the URL to remove the hash
    window.history.replaceState(null, document.title, window.location.pathname);
    
    if (handleMobileItemClick) {
      handleMobileItemClick();
    }
  }, [navigate]);

  return {
    scrollToSection,
    scrollToTop
  };
};
