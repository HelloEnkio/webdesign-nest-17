
import React from 'react';
import { cn } from '@/lib/utils';

interface NavbarLogoProps {
  isScrolled: boolean;
  onLogoClick: (e?: React.MouseEvent) => void;
}

const NavbarLogo: React.FC<NavbarLogoProps> = ({ isScrolled, onLogoClick }) => {
  return (
    <div onClick={(e) => onLogoClick(e)} className="flex items-center cursor-pointer">
      <div className="h-9 w-9 mr-3">
        <img 
          src="/lovable-uploads/b656736f-7c66-494c-aaf5-83b0642b676a.png" 
          alt="Studio.Web Logo" 
          className="h-full w-full rounded-lg shadow-md"
        />
      </div>
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
