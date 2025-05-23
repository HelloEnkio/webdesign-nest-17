
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

  // Nous supprimons tout effet qui traite du défilement basé sur le hash ici
  // Cette logique doit être uniquement dans Index.tsx

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
