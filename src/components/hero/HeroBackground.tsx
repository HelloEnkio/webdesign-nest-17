
import React, { useState, useEffect } from 'react';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { ChevronLeft, ChevronRight, Monitor, Code, Layout } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeroBackgroundProps {
  videoRef: React.RefObject<HTMLVideoElement>;
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

const HeroBackground: React.FC<HeroBackgroundProps> = ({ videoRef }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % siteExamples.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute w-full h-full object-cover"
        style={{ filter: 'brightness(0.3) saturate(1.2)' }}
      >
        <source src="https://cdn.pixabay.com/video/2022/06/21/121470-724697516_large.mp4" type="video/mp4" />
      </video>
      
      {/* Gradient overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-blue-950/85 to-teal-950/80"></div>
      
      {/* Additional subtle patterns for depth */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiPjwvcmVjdD4KPC9zdmc+')] opacity-20"></div>
      
      {/* Floating carousel in the corner */}
      <div className="absolute bottom-10 right-10 w-64 h-36 rounded-xl overflow-hidden shadow-2xl">
        <Carousel className="w-full h-full" setApi={() => {}}>
          <CarouselContent className="h-full">
            {siteExamples.map((example, index) => (
              <CarouselItem key={example.id} className="h-full">
                <div className={`relative w-full h-full transition-opacity duration-500 ${index === activeIndex ? 'opacity-100' : 'opacity-0'}`}>
                  <img 
                    src={example.image} 
                    alt={example.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-2 flex items-center space-x-2">
                    <div className="bg-black/30 backdrop-blur-sm rounded-md p-1">
                      {example.icon}
                    </div>
                    <div>
                      <p className="text-xs font-medium text-white truncate">{example.title}</p>
                      <p className="text-xs text-white/70 truncate">{example.description}</p>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          
          <div className="absolute top-2 right-2 flex space-x-1">
            <Button 
              size="sm" 
              variant="outline" 
              className="h-6 w-6 p-0 bg-black/20 border-white/10 hover:bg-black/40 backdrop-blur-sm"
              onClick={() => setActiveIndex((prev) => (prev - 1 + siteExamples.length) % siteExamples.length)}
            >
              <ChevronLeft className="h-3 w-3 text-white" />
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              className="h-6 w-6 p-0 bg-black/20 border-white/10 hover:bg-black/40 backdrop-blur-sm"
              onClick={() => setActiveIndex((prev) => (prev + 1) % siteExamples.length)}
            >
              <ChevronRight className="h-3 w-3 text-white" />
            </Button>
          </div>
        </Carousel>
      </div>
    </div>
  );
};

export default HeroBackground;
