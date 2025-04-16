import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';

interface NavbarProps {
  className?: string;
}

const Navbar: React.FC<NavbarProps> = ({ className }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleMobileItemClick = () => {
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  };

  const scrollToTop = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
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
    
    handleMobileItemClick();
  };

  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    
    document.documentElement.classList.add('smooth-scroll');
    
    const contactSection = document.getElementById('contact-section');
    if (contactSection) {
      contactSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      
      window.history.pushState(null, document.title, '#contact-section');
    }
    
    setTimeout(() => {
      document.documentElement.classList.remove('smooth-scroll');
    }, 1000);
    
    handleMobileItemClick();
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
          <div onClick={scrollToTop} className="flex items-center cursor-pointer">
            <div className="h-9 w-9 mr-3 bg-gradient-to-br from-indigo-600 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-md">S</div>
            <span className={cn(
              "text-xl font-bold tracking-tight bg-gradient-to-r bg-clip-text text-transparent",
              isScrolled ? "from-black to-neutral-500" : "from-white to-gray-300"
            )}>
              Studio<span className="font-light">.Web</span>
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-1">
            <a 
              href="#" 
              onClick={(e) => {
                e.preventDefault();
                scrollToTop();
              }}
              className={cn(
                "navbar-item",
                !isScrolled ? "text-neutral-200 hover:text-white after:bg-white" : "text-neutral-600 hover:text-black after:bg-indigo-600"
              )}
            >
              Accueil
            </a>
            <a 
              href="#services-section" 
              className={cn(
                "navbar-item",
                !isScrolled ? "text-neutral-200 hover:text-white after:bg-white" : "text-neutral-600 hover:text-black after:bg-indigo-600"
              )}
            >
              Services
            </a>
            <a 
              href="#solutions-section" 
              className={cn(
                "navbar-item",
                !isScrolled ? "text-neutral-200 hover:text-white after:bg-white" : "text-neutral-600 hover:text-black after:bg-indigo-600"
              )}
            >
              Solutions
            </a>
            <a 
              href="#process-section" 
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
              onClick={scrollToContact}
            >
              Démarrer un projet
            </Button>
          </div>

          <button
            className={cn(
              "md:hidden p-2 rounded-md transition-colors",
              isScrolled ? "text-neutral-700 hover:bg-neutral-100" : "text-white hover:bg-white/10"
            )}
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <div
        className={cn(
          'md:hidden absolute left-0 right-0 top-full bg-white shadow-md transition-all duration-300 overflow-hidden',
          isMobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <div className="px-4 py-4 space-y-4">
          <a 
            href="#" 
            onClick={(e) => {
              e.preventDefault();
              scrollToTop();
            }}
            className="block px-3 py-2 rounded-lg text-base font-medium text-neutral-700 hover:bg-neutral-100"
          >
            Accueil
          </a>
          <a href="#services-section" onClick={handleMobileItemClick} className="block px-3 py-2 rounded-lg text-base font-medium text-neutral-700 hover:bg-neutral-100">Services</a>
          <a href="#solutions-section" onClick={handleMobileItemClick} className="block px-3 py-2 rounded-lg text-base font-medium text-neutral-700 hover:bg-neutral-100">Solutions</a>
          <a href="#process-section" onClick={handleMobileItemClick} className="block px-3 py-2 rounded-lg text-base font-medium text-neutral-700 hover:bg-neutral-100">Processus</a>
          
          <div className="pt-2">
            <Button 
              size="sm" 
              className="w-full rounded-lg bg-gradient-to-r from-indigo-600 to-blue-600 border-0"
              onClick={scrollToContact}
            >
              Démarrer un projet
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
