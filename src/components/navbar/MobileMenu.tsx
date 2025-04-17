
import React from 'react';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';
import { Button } from '../ui/button';

interface MobileMenuProps {
  isScrolled: boolean;
  isMobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
  onScrollToSection: (sectionId: string, e: React.MouseEvent) => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ 
  isScrolled, 
  isMobileMenuOpen, 
  toggleMobileMenu,
  onScrollToSection
}) => {
  return (
    <>
      <button
        className={cn(
          "md:hidden p-2 rounded-md transition-colors",
          isScrolled ? "text-neutral-700 hover:bg-neutral-100" : "text-white hover:bg-white/10"
        )}
        onClick={toggleMobileMenu}
      >
        {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      <div
        className={cn(
          'md:hidden absolute left-0 right-0 top-full bg-white shadow-md transition-all duration-300 overflow-hidden',
          isMobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <div className="px-4 py-4 space-y-4">
          <a 
            href="#" 
            onClick={(e) => onScrollToSection("", e)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-neutral-700 hover:bg-neutral-100"
          >
            Accueil
          </a>
          <a 
            href="#services-section" 
            onClick={(e) => onScrollToSection("services-section", e)} 
            className="block px-3 py-2 rounded-lg text-base font-medium text-neutral-700 hover:bg-neutral-100"
          >
            Services
          </a>
          <a 
            href="#portfolio-section" 
            onClick={(e) => onScrollToSection("portfolio-section", e)} 
            className="block px-3 py-2 rounded-lg text-base font-medium text-neutral-700 hover:bg-neutral-100"
          >
            Solutions
          </a>
          <a 
            href="#process-section" 
            onClick={(e) => onScrollToSection("process-section", e)} 
            className="block px-3 py-2 rounded-lg text-base font-medium text-neutral-700 hover:bg-neutral-100"
          >
            Processus
          </a>
          
          <div className="pt-2">
            <Button 
              size="sm" 
              className="w-full rounded-lg bg-gradient-to-r from-indigo-600 to-blue-600 border-0"
              onClick={(e) => onScrollToSection("contact-section", e)}
            >
              Démarrer un projet
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;
