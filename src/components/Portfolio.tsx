
import React, { useEffect, useRef, useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import Button from './ui/Button';

interface PortfolioItemProps {
  title: string;
  category: string;
  image: string;
  delay?: number;
}

const PortfolioItem: React.FC<PortfolioItemProps> = ({ title, category, image, delay = 0 }) => {
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
    <div ref={itemRef} className="opacity-0 group">
      <div className="relative overflow-hidden rounded-xl mb-4">
        <div 
          className="h-[280px] w-full bg-cover bg-center transition-all duration-700 group-hover:scale-105"
          style={{ backgroundImage: `url(${image})` }}
        >
          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <Button variant="primary" size="md">Voir le projet</Button>
          </div>
        </div>
      </div>
      <div>
        <h3 className="text-lg font-medium">{title}</h3>
        <p className="text-sm text-neutral-500">{category}</p>
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
      title: "Rebrand Site Vitrine",
      category: "Web Design",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2426&q=80"
    },
    {
      title: "Boutique Mode en Ligne",
      category: "E-commerce",
      image: "https://images.unsplash.com/photo-1483058712412-4245e9b90334?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
    },
    {
      title: "Application Immobilière",
      category: "Web Design",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2344&q=80"
    },
    {
      title: "Refonte Site Corporate",
      category: "Branding",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
    },
    {
      title: "Campagne Marketing Digital",
      category: "Marketing",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
    },
    {
      title: "Plateforme Éducative",
      category: "Web Design",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
    },
  ];
  
  const filteredItems = activeFilter === 'Tous' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeFilter);
  
  return (
    <section id="portfolio" className="py-20">
      <div className="section-container">
        <div ref={headerRef} className="text-center mb-16 opacity-0">
          <p className="text-sm font-medium text-neutral-500 tracking-wider mb-3">NOTRE PORTFOLIO</p>
          <h2 className="text-3xl md:text-4xl font-semibold mb-5">
            Découvrez nos <span className="text-gradient">réalisations</span>
          </h2>
          <p className="text-neutral-600 max-w-2xl mx-auto mb-10">
            Explorez notre sélection de projets récents qui illustrent notre expertise 
            et notre capacité à créer des solutions web uniques et performantes.
          </p>
          
          {/* Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 text-sm rounded-full transition-all ${
                  activeFilter === filter 
                    ? 'bg-black text-white' 
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => (
            <PortfolioItem
              key={index}
              title={item.title}
              category={item.category}
              image={item.image}
              delay={index * 100}
            />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            Voir plus de projets
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
