
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
    
    // Always update URL hash, regardless of whether the section is found
    // This ensures the hash is updated even when the target section is being lazy-loaded
    if (sectionId) {
      window.history.replaceState(null, document.title, `#${sectionId}`);
    } else {
      window.history.replaceState(null, document.title, window.location.pathname);
    }
    
    // After updating the URL, attempt to scroll to the section if it exists
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
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
    
    // If not on home page, navigate to home page
    if (!isHomePage) {
      navigate('/');
      return;
    }
    
    document.documentElement.classList.add('smooth-scroll');
    
    // Always update the URL to remove the hash, regardless of scroll success
    window.history.replaceState(null, document.title, window.location.pathname);
    
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
