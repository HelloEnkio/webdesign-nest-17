
import React from 'react';
import { cn } from '@/lib/utils';
import { useNavbar } from '@/hooks/useNavbar';
import NavbarLogo from './navbar/NavbarLogo';
import NavLinks from './navbar/NavLinks';
import MobileMenu from './navbar/MobileMenu';
import { useNavigation } from './navbar/NavUtils';

interface NavbarProps {
  className?: string;
}

const Navbar: React.FC<NavbarProps> = ({ className }) => {
  const { isScrolled, isMobileMenuOpen, isHomePage, toggleMobileMenu, handleMobileItemClick } = useNavbar();
  const { scrollToSection, scrollToTop } = useNavigation();

  const handleScrollToSection = (sectionId: string, e: React.MouseEvent) => {
    e.preventDefault();
    
    if (sectionId === "") {
      // For home/accueil link, scroll to top
      scrollToTop(e, isHomePage, handleMobileItemClick);
    } else {
      // For other links, scroll to the section
      scrollToSection({
        sectionId,
        e,
        isHomePage,
        handleMobileItemClick
      });
    }
  };

  const handleScrollToTop = (e: React.MouseEvent) => {
    scrollToTop(e, isHomePage, handleMobileItemClick);
  };

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled ? 'py-3 bg-white/90 shadow-sm backdrop-blur-md' : 'py-5 bg-transparent',
        className
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <NavbarLogo isScrolled={isScrolled} onLogoClick={handleScrollToTop} />
          <NavLinks isScrolled={isScrolled} onScrollToSection={handleScrollToSection} />
          <MobileMenu 
            isScrolled={isScrolled} 
            isMobileMenuOpen={isMobileMenuOpen} 
            toggleMobileMenu={toggleMobileMenu} 
            onScrollToSection={handleScrollToSection}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
