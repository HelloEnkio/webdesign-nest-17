import React, { useEffect, useRef, useState } from 'react';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { ModernCarousel } from './ui/modern-portfolio-carousel';
import { DemoLandingPage } from './ui/demo-landing-page';

interface SlideData {
  title: string;
  src: string;
  category: string;
  description?: string;
  landingPageContent?: React.ReactNode;
  autoScroll?: boolean;
}

const Portfolio: React.FC = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const portfolioItems: SlideData[] = [{
    title: "Site Vitrine",
    category: "Site Vitrine",
    description: "Présentez votre entreprise avec élégance",
    src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    landingPageContent: <DemoLandingPage />,
    autoScroll: true
  }, {
    title: "E-commerce",
    category: "E-commerce",
    description: "Développez votre boutique en ligne",
    src: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
  }, {
    title: "Site communautaire",
    category: "Site communautaire",
    description: "Créez une plateforme d'échange interactive",
    src: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
  }, {
    title: "Petits business",
    category: "Petits business",
    description: "Solutions adaptées pour TPE/PME",
    src: "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
  }, {
    title: "Apps IA",
    category: "Apps IA",
    description: "Applications intelligentes et innovantes",
    src: "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
  }, {
    title: "Start-ups",
    category: "Start-ups",
    description: "Propulsez votre croissance digitale",
    src: "https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
  }, {
    title: "Associations",
    category: "Associations",
    description: "Donnez de la visibilité à votre cause",
    src: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
  }];

  const categories = portfolioItems.map(item => item.category);
  const uniqueCategories = Array.from(new Set(categories));

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        headerRef.current?.classList.add('animate-fade-up');
      }
    }, {
      threshold: 0.1
    });
    if (headerRef.current) {
      observer.observe(headerRef.current);
    }
    return () => {
      if (headerRef.current) {
        observer.unobserve(headerRef.current);
      }
    };
  }, []);

  const handleCategorySelect = (category: string) => {
    const index = portfolioItems.findIndex(item => item.category === category);
    if (index !== -1) {
      setCurrentIndex(index);
    }
  };

  return <section id="solutions-section" className="py-20 relative">
    <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-l from-blue-50 to-transparent opacity-50 rounded-full blur-3xl"></div>
    <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-r from-indigo-50 to-transparent opacity-50 rounded-full blur-3xl"></div>
    
    <div className="section-container relative z-10">
      <motion.div ref={headerRef} className="text-center mb-8" initial={{
        opacity: 0,
        y: 30
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} transition={{
        duration: 0.8
      }}>
        <div className="inline-flex items-center rounded-full mb-4 bg-black/5 px-3 py-1">
          <span className="w-2 h-2 rounded-full bg-indigo-500 mr-2"></span>
          <span className="text-xs font-medium">NOS SOLUTIONS</span>
        </div>
        
        <h2 className="text-4xl md:text-5xl font-bold mb-5 tracking-tight">
          Découvrez nos <span className="bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">solutions</span>
        </h2>
        
        <p className="text-neutral-600 max-w-2xl mx-auto mb-6 text-lg">
          Explorez notre sélection de solutions web uniques alliant esthétique,
          performance technique et chargement ultra-rapide.
        </p>

        <div className="flex flex-wrap justify-center gap-2 mb-8 glass-morphism inline-flex py-2 px-3 rounded-full bg-white/50 backdrop-blur-md shadow-sm border border-white/20">
          {portfolioItems.map((item, index) => {
            return <motion.button 
              key={item.category} 
              onClick={() => handleCategorySelect(item.category)} 
              className={`px-4 py-2 text-sm rounded-full transition-all duration-300 ${
                portfolioItems[currentIndex].category === item.category 
                ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-md' 
                : 'bg-white/70 text-neutral-600 hover:bg-white'
              }`} 
              initial={{
                opacity: 0,
                y: 10
              }} 
              animate={{
                opacity: 1,
                y: 0
              }} 
              transition={{
                duration: 0.4,
                delay: index * 0.05
              }} 
              whileHover={{
                scale: 1.05
              }} 
              whileTap={{
                scale: 0.95
              }}
            >
              {item.category}
            </motion.button>;
          })}
        </div>
      </motion.div>
      
      <div className="mb-16">
        <ModernCarousel slides={portfolioItems} currentIndex={currentIndex} setCurrentIndex={setCurrentIndex} />
      </div>
      
      <div className="text-center mt-10">
        <motion.div initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.6,
          delay: 0.3
        }}>
          
        </motion.div>
      </div>
    </div>
  </section>;
};

export default Portfolio;
