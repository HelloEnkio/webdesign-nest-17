
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Menu, X, ArrowUp } from 'lucide-react';
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

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
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
          {/* Logo */}
          <Link to="/" onClick={scrollToTop} className="flex items-center">
            <div className="h-9 w-9 mr-3 bg-gradient-to-br from-indigo-600 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-md">S</div>
            <span className={cn(
              "text-xl font-bold tracking-tight bg-gradient-to-r bg-clip-text text-transparent",
              isScrolled ? "from-black to-neutral-500" : "from-white to-gray-300"
            )}>
              Studio<span className="font-light">.Web</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <Link to="/#home" onClick={scrollToTop} className={cn(
              "navbar-item",
              !isScrolled ? "text-neutral-200 hover:text-white after:bg-white" : "text-neutral-600 hover:text-black after:bg-indigo-600"
            )}>Accueil</Link>
            <Link to="/#services" className={cn(
              "navbar-item",
              !isScrolled ? "text-neutral-200 hover:text-white after:bg-white" : "text-neutral-600 hover:text-black after:bg-indigo-600"
            )}>Services</Link>
            <Link to="/#portfolio" className={cn(
              "navbar-item",
              !isScrolled ? "text-neutral-200 hover:text-white after:bg-white" : "text-neutral-600 hover:text-black after:bg-indigo-600"
            )}>Portfolio</Link>
            <Link to="/#process" className={cn(
              "navbar-item",
              !isScrolled ? "text-neutral-200 hover:text-white after:bg-white" : "text-neutral-600 hover:text-black after:bg-indigo-600"
            )}>Processus</Link>
            <Link to="/#contact" className={cn(
              "navbar-item",
              !isScrolled ? "text-neutral-200 hover:text-white after:bg-white" : "text-neutral-600 hover:text-black after:bg-indigo-600"
            )}>Contact</Link>
            
            <Button size="sm" className="ml-4 rounded-full px-5 bg-gradient-to-r from-indigo-600 to-blue-600 border-0">
              Démarrer un projet
            </Button>
          </div>

          {/* Mobile Menu Button */}
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

      {/* Mobile Menu */}
      <div
        className={cn(
          'md:hidden absolute left-0 right-0 top-full bg-white shadow-md transition-all duration-300 overflow-hidden',
          isMobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <div className="px-4 py-4 space-y-4">
          <Link to="/#home" onClick={scrollToTop} className="block px-3 py-2 rounded-lg text-base font-medium text-neutral-700 hover:bg-neutral-100">Accueil</Link>
          <Link to="/#services" className="block px-3 py-2 rounded-lg text-base font-medium text-neutral-700 hover:bg-neutral-100">Services</Link>
          <Link to="/#portfolio" className="block px-3 py-2 rounded-lg text-base font-medium text-neutral-700 hover:bg-neutral-100">Portfolio</Link>
          <Link to="/#process" className="block px-3 py-2 rounded-lg text-base font-medium text-neutral-700 hover:bg-neutral-100">Processus</Link>
          <Link to="/#contact" className="block px-3 py-2 rounded-lg text-base font-medium text-neutral-700 hover:bg-neutral-100">Contact</Link>
          
          <div className="pt-2">
            <Button size="sm" className="w-full rounded-lg bg-gradient-to-r from-indigo-600 to-blue-600 border-0">
              Démarrer un projet
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
