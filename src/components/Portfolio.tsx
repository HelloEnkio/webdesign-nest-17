
import React, { useEffect, useRef, useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from './ui/button';
import { ArrowRight, ExternalLink } from 'lucide-react';

interface PortfolioItemProps {
  title: string;
  category: string;
  image: string;
  client?: string;
  delay?: number;
}

const PortfolioItem: React.FC<PortfolioItemProps> = ({ title, category, image, client, delay = 0 }) => {
  const itemRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            itemRef.current?.classList.add('animate-fade-up');
          }, delay);
        }
      },
      { threshold: 0.1 }
    );
    
    if (itemRef.current) {
      observer.observe(itemRef.current);
    }
    
    return () => {
      if (itemRef.current) {
        observer.unobserve(itemRef.current);
      }
    };
  }, [delay]);
  
  return (
    <div ref={itemRef} className="opacity-0 group relative">
      <div className="relative overflow-hidden rounded-2xl mb-4 aspect-[4/3]">
        <div 
          className="h-full w-full bg-cover bg-center transition-all duration-700 group-hover:scale-105"
          style={{ backgroundImage: `url(${image})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/5 to-black/30"></div>
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-sm flex items-center justify-center">
            <Button className="rounded-full bg-white text-black hover:bg-white/90 hover:text-black flex items-center gap-2 shadow-xl">
              Voir le projet <ExternalLink size={14} />
            </Button>
          </div>
        </div>
        
        {client && (
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium">
            {client}
          </div>
        )}
        
        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium">
          {category}
        </div>
      </div>
      <div>
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-sm text-neutral-500 mt-1">
          Création d'interface, identité visuelle, développement
        </p>
      </div>
    </div>
  );
};

const Portfolio: React.FC = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const [activeFilter, setActiveFilter] = useState('Tous');
  
  const filters = ['Tous', 'Web Design', 'E-commerce', 'Branding', 'Marketing'];
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          headerRef.current?.classList.add('animate-fade-up');
        }
      },
      { threshold: 0.1 }
    );
    
    if (headerRef.current) {
      observer.observe(headerRef.current);
    }
    
    return () => {
      if (headerRef.current) {
        observer.unobserve(headerRef.current);
      }
    };
  }, []);
  
  const portfolioItems = [
    {
      title: "Plateforme Immobilière Moderne",
      category: "Web Design",
      client: "Immo+",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2426&q=80"
    },
    {
      title: "E-commerce Mode Haut de Gamme",
      category: "E-commerce",
      client: "Maison Élégance",
      image: "https://images.unsplash.com/photo-1483058712412-4245e9b90334?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
    },
    {
      title: "Application Gestion Immobilière",
      category: "Web Design",
      client: "PropertyTech",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2344&q=80"
    },
    {
      title: "Refonte Corporate Finance",
      category: "Branding",
      client: "FinanceGroup",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
    },
    {
      title: "Campagne Marketing Luxe",
      category: "Marketing",
      client: "Prestige Paris",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
    },
    {
      title: "Plateforme Éducative Interactive",
      category: "Web Design",
      client: "EduTech Future",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
    },
  ];
  
  const filteredItems = activeFilter === 'Tous' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeFilter);
  
  return (
    <section id="portfolio" className="py-28 relative">
      {/* Design elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-l from-blue-50 to-transparent opacity-50 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-r from-indigo-50 to-transparent opacity-50 rounded-full blur-3xl"></div>
      
      <div className="section-container relative z-10">
        <div ref={headerRef} className="text-center mb-16 opacity-0">
          <div className="inline-flex items-center rounded-full mb-4 bg-black/5 px-3 py-1">
            <span className="w-2 h-2 rounded-full bg-indigo-500 mr-2"></span>
            <span className="text-xs font-medium">NOTRE PORTFOLIO</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-5 tracking-tight">
            Découvrez nos <span className="bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">réalisations</span>
          </h2>
          
          <p className="text-neutral-600 max-w-2xl mx-auto mb-12 text-lg">
            Explorez notre sélection de projets qui illustrent notre capacité à créer des solutions 
            web uniques alliant esthétique et performance technique.
          </p>
          
          {/* Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-12 glass-morphism inline-flex py-2 px-3 rounded-full bg-white/50 backdrop-blur-md shadow-sm border border-white/20">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 text-sm rounded-full transition-all duration-300 ${
                  activeFilter === filter 
                    ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-md' 
                    : 'bg-white/70 text-neutral-600 hover:bg-white'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item, index) => (
            <PortfolioItem
              key={index}
              title={item.title}
              category={item.category}
              client={item.client}
              image={item.image}
              delay={index * 100}
            />
          ))}
        </div>
        
        <div className="text-center mt-16">
          <Button variant="outline" size="lg" className="rounded-full border-2 border-neutral-200 hover:border-neutral-300 inline-flex items-center gap-2 text-base px-6 py-6 h-auto">
            Explorer tous nos projets <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
