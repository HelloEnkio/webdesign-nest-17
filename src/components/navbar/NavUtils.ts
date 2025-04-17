
import { useNavigate } from 'react-router-dom';

interface ScrollToSectionProps {
  sectionId: string;
  e?: React.MouseEvent;
  isHomePage: boolean;
  handleMobileItemClick: () => void;
}

export const useNavigation = () => {
  const navigate = useNavigate();

  const scrollToSection = ({ sectionId, e, isHomePage, handleMobileItemClick }: ScrollToSectionProps) => {
    if (e) {
      e.preventDefault();
    }
    
    // If not on home page, navigate to home page with the section id
    if (!isHomePage) {
      navigate(`/#${sectionId}`);
      return;
    }
    
    document.documentElement.classList.add('smooth-scroll');
    
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      
      window.history.pushState(null, document.title, `#${sectionId}`);
    }
    
    setTimeout(() => {
      document.documentElement.classList.remove('smooth-scroll');
    }, 1000);
    
    handleMobileItemClick();
  };

  const scrollToTop = (e?: React.MouseEvent, isHomePage?: boolean, handleMobileItemClick?: () => void) => {
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
    
    window.history.pushState(null, document.title, window.location.pathname);
    
    if (handleMobileItemClick) {
      handleMobileItemClick();
    }
  };

  return {
    scrollToSection,
    scrollToTop
  };
};
