
import React from 'react';
import { cn } from '@/lib/utils';

interface NavbarLogoProps {
  isScrolled: boolean;
  onLogoClick: (e?: React.MouseEvent) => void;
}

const NavbarLogo: React.FC<NavbarLogoProps> = ({ isScrolled, onLogoClick }) => {
  return (
    <div onClick={(e) => onLogoClick(e)} className="flex items-center cursor-pointer">
      <div className="h-9 w-9 mr-3 bg-gradient-to-br from-indigo-600 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-md">S</div>
      <span className={cn(
        "text-xl font-bold tracking-tight bg-gradient-to-r bg-clip-text text-transparent",
        isScrolled ? "from-black to-neutral-500" : "from-white to-gray-300"
      )}>
        Studio<span className="font-light">.Web</span>
      </span>
    </div>
  );
};

export default NavbarLogo;
