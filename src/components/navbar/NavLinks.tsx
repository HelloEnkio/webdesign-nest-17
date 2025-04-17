
import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';

interface NavLinksProps {
  isScrolled: boolean;
  onScrollToSection: (sectionId: string, e: React.MouseEvent) => void;
}

const NavLinks: React.FC<NavLinksProps> = ({ isScrolled, onScrollToSection }) => {
  return (
    <div className="hidden md:flex items-center space-x-1">
      <a 
        href="#hero-section" 
        onClick={(e) => onScrollToSection("hero-section", e)}
        className={cn(
          "navbar-item",
          !isScrolled ? "text-neutral-200 hover:text-white after:bg-white" : "text-neutral-600 hover:text-black after:bg-indigo-600"
        )}
      >
        Accueil
      </a>
      <a 
        href="#services-section" 
        onClick={(e) => onScrollToSection("services-section", e)}
        className={cn(
          "navbar-item",
          !isScrolled ? "text-neutral-200 hover:text-white after:bg-white" : "text-neutral-600 hover:text-black after:bg-indigo-600"
        )}
      >
        Services
      </a>
      <a 
        href="#portfolio-section" 
        onClick={(e) => onScrollToSection("portfolio-section", e)}
        className={cn(
          "navbar-item",
          !isScrolled ? "text-neutral-200 hover:text-white after:bg-white" : "text-neutral-600 hover:text-black after:bg-indigo-600"
        )}
      >
        Solutions
      </a>
      <a 
        href="#process-section" 
        onClick={(e) => onScrollToSection("process-section", e)}
        className={cn(
          "navbar-item",
          !isScrolled ? "text-neutral-200 hover:text-white after:bg-white" : "text-neutral-600 hover:text-black after:bg-indigo-600"
        )}
      >
        Processus
      </a>
      
      <Button 
        size="sm" 
        className="ml-4 rounded-full px-5 bg-gradient-to-r from-indigo-600 to-blue-600 border-0"
        onClick={(e) => onScrollToSection("contact-section", e)}
      >
        Démarrer un projet
      </Button>
    </div>
  );
};

export default NavLinks;
