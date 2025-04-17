
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const useNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    
    // Check initial scroll position
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle hash on page load - ensure we scroll to the right section
  useEffect(() => {
    if (isHomePage && location.hash) {
      // Small delay to ensure the DOM is fully loaded
      setTimeout(() => {
        const targetElement = document.getElementById(location.hash.substring(1));
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }, [isHomePage, location.hash]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleMobileItemClick = () => {
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  };

  return {
    isScrolled,
    isMobileMenuOpen,
    isHomePage,
    toggleMobileMenu,
    handleMobileItemClick
  };
};
