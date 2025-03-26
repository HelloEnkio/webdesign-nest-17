
import React, { useEffect, useRef, useState } from 'react';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { PortfolioCarousel } from './ui/portfolio-carousel';

interface SlideData {
  title: string;
  button: string;
  src: string;
  category: string;
  client?: string;
}

const Portfolio: React.FC = () => {
  const headerRef = useRef<HTMLDivElement>(null);
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
  
  const portfolioItems: SlideData[] = [
    {
      title: "Plateforme Immobilière Moderne",
      category: "Web Design",
      client: "Immo+",
      button: "Voir le projet",
      src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2426&q=80"
    },
    {
      title: "E-commerce Mode Haut de Gamme",
      category: "E-commerce",
      client: "Maison Élégance",
      button: "Voir le projet",
      src: "https://images.unsplash.com/photo-1483058712412-4245e9b90334?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
    },
    {
      title: "Application Gestion Immobilière",
      category: "Web Design",
      client: "PropertyTech",
      button: "Voir le projet",
      src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2344&q=80"
    },
    {
      title: "Refonte Corporate Finance",
      category: "Branding",
      client: "FinanceGroup",
      button: "Voir le projet",
      src: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
    },
    {
      title: "Campagne Marketing Luxe",
      category: "Marketing",
      client: "Prestige Paris",
      button: "Voir le projet",
      src: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
    },
    {
      title: "Plateforme Éducative Interactive",
      category: "Web Design",
      client: "EduTech Future",
      button: "Voir le projet",
      src: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
    },
  ];
  
  return (
    <section id="portfolio" className="py-28 relative">
      {/* Design elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-l from-blue-50 to-transparent opacity-50 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-r from-indigo-50 to-transparent opacity-50 rounded-full blur-3xl"></div>
      
      <div className="section-container relative z-10">
        <motion.div 
          ref={headerRef} 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
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
          <div className="flex flex-wrap justify-center gap-2 mb-16 glass-morphism inline-flex py-2 px-3 rounded-full bg-white/50 backdrop-blur-md shadow-sm border border-white/20">
            {filters.map((filter, index) => (
              <motion.button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 text-sm rounded-full transition-all duration-300 ${
                  activeFilter === filter 
                    ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-md' 
                    : 'bg-white/70 text-neutral-600 hover:bg-white'
                }`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {filter}
              </motion.button>
            ))}
          </div>
        </motion.div>
        
        {/* Carousel */}
        <div className="mb-20">
          <PortfolioCarousel slides={portfolioItems} activeFilter={activeFilter} />
        </div>
        
        <div className="text-center mt-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Button variant="outline" size="lg" className="rounded-full border-2 border-neutral-200 hover:border-neutral-300 inline-flex items-center gap-2 text-base px-6 py-6 h-auto">
              Explorer tous nos projets <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
