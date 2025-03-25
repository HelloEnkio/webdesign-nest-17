
import React, { useRef, useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedCardProps {
  className?: string;
  children: React.ReactNode;
  intensity?: number; // Control the intensity of the effect
}

const AnimatedCard: React.FC<AnimatedCardProps> = ({
  className,
  children,
  intensity = 6, // Default intensity value
}) => {
  const [style, setStyle] = useState({
    transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
    boxShadow: '0 10px 30px -10px rgba(0, 0, 0, 0.05)',
    transition: '0.3s ease-out',
  });
  
  const cardRef = useRef<HTMLDivElement>(null);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    
    // Normalized values between -1 and 1
    const rotateX = (mouseY / (rect.height / 2)) * (intensity * -1);
    const rotateY = (mouseX / (rect.width / 2)) * intensity;
    
    setStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1, 1, 1)`,
      boxShadow: `
        ${rotateY * 0.2}px ${rotateX * -0.2}px 10px rgba(0, 0, 0, 0.02),
        0 10px 30px -10px rgba(0, 0, 0, 0.1)
      `,
      transition: '0.05s ease-out',
    });
  };
  
  const handleMouseLeave = () => {
    setStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
      boxShadow: '0 10px 30px -10px rgba(0, 0, 0, 0.05)',
      transition: '0.3s ease-out',
    });
  };
  
  return (
    <div
      ref={cardRef}
      className={cn(
        'rounded-xl p-6 bg-white',
        className
      )}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
};

export default AnimatedCard;
