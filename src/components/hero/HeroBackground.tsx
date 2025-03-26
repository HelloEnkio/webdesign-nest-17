
import React, { useState, useEffect } from 'react';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { ChevronLeft, ChevronRight, Monitor, Code, Layout } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeroBackgroundProps {
  videoRef: React.RefObject<HTMLVideoElement>;
  videoLoaded?: boolean;
}

const siteExamples = [
  {
    id: 1,
    title: "Site E-commerce Premium",
    image: "/lovable-uploads/a6fea02c-8261-4943-9e4f-7dff55408579.png",
    description: "Boutique en ligne avec expérience client optimisée",
    icon: <Monitor className="h-4 w-4 text-teal-300" />
  },
  {
    id: 2,
    title: "Application Web SaaS",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    description: "Interfaces utilisateur dynamiques et réactives",
    icon: <Code className="h-4 w-4 text-cyan-300" />
  },
  {
    id: 3,
    title: "Portfolio Créatif",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
    description: "Mise en valeur de projets artistiques",
    icon: <Layout className="h-4 w-4 text-blue-300" />
  }
];

const HeroBackground: React.FC<HeroBackgroundProps> = ({ videoRef, videoLoaded = false }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    // Start carousel rotation with a delay to prioritize core content
    const interval = setTimeout(() => {
      setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % siteExamples.length);
      }, 5000);
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Static background gradient - shown immediately */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-blue-950 to-teal-950"></div>
      
      {/* Video background - only requested after critical content is loaded */}
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        className={`absolute w-full h-full object-cover transition-opacity duration-500 ${videoLoaded ? 'opacity-20' : 'opacity-0'}`}
        style={{ filter: 'brightness(0.3) saturate(1.2)' }}
      />
      
      {/* Subtle patterns - loaded with CSS to improve performance */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiPjwvcmVjdD4KPC9zdmc+')] opacity-20"></div>
    </>
  );
};

export default HeroBackground;
