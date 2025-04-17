
import { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

export const useNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  console.log('useNavbar hook initialized', { isHomePage, locationHash: location.hash });

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
    console.log('Hash change effect running', { hash: location.hash, isHomePage });
    
    if (isHomePage && location.hash) {
      // Small delay to ensure the DOM is fully loaded
      setTimeout(() => {
        const targetElement = document.getElementById(location.hash.substring(1));
        console.log('Trying to scroll to element', { 
          targetId: location.hash.substring(1), 
          elementFound: !!targetElement 
        });
        
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }, [isHomePage, location.hash]);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  }, [isMobileMenuOpen]);

  const handleMobileItemClick = useCallback(() => {
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  }, [isMobileMenuOpen]);

  return {
    isScrolled,
    isMobileMenuOpen,
    isHomePage,
    toggleMobileMenu,
    handleMobileItemClick
  };
};
