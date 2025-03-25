
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';

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
          <a href="#" className="text-xl font-semibold text-black tracking-tight">
            Studio<span className="font-light">.Web</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-1">
            <a href="#home" className="navbar-item">Accueil</a>
            <a href="#services" className="navbar-item">Services</a>
            <a href="#portfolio" className="navbar-item">Portfolio</a>
            <a href="#process" className="navbar-item">Processus</a>
            <a href="#contact" className="navbar-item">Contact</a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md text-neutral-700 hover:bg-neutral-100 transition-colors"
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
        <div className="px-4 py-3 space-y-2">
          <a href="#home" className="block px-3 py-2 rounded-md text-base font-medium text-neutral-700 hover:bg-neutral-100">Accueil</a>
          <a href="#services" className="block px-3 py-2 rounded-md text-base font-medium text-neutral-700 hover:bg-neutral-100">Services</a>
          <a href="#portfolio" className="block px-3 py-2 rounded-md text-base font-medium text-neutral-700 hover:bg-neutral-100">Portfolio</a>
          <a href="#process" className="block px-3 py-2 rounded-md text-base font-medium text-neutral-700 hover:bg-neutral-100">Processus</a>
          <a href="#contact" className="block px-3 py-2 rounded-md text-base font-medium text-neutral-700 hover:bg-neutral-100">Contact</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
