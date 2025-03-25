
import React, { useEffect, useRef } from 'react';
import AnimatedCard from './ui/AnimatedCard';
import { Code, Layout, Palette, Smartphone, Globe, ArrowRight } from 'lucide-react';

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay?: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description, delay = 0 }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            cardRef.current?.classList.add('animate-fade-up');
          }, delay);
        }
      },
      { threshold: 0.1 }
    );
    
    if (cardRef.current) {
      observer.observe(cardRef.current);
    }
    
    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, [delay]);
  
  return (
    <div ref={cardRef} className="opacity-0">
      <AnimatedCard className="h-full card-hover border border-neutral-100/80">
        <div className="p-1">
          <div className="mb-5 inline-flex items-center justify-center w-12 h-12 rounded-lg bg-neutral-100">
            {icon}
          </div>
          <h3 className="text-xl font-semibold mb-3">{title}</h3>
          <p className="text-neutral-600 mb-4">{description}</p>
          <a href="#" className="inline-flex items-center text-sm font-medium text-black hover:underline">
            En savoir plus <ArrowRight size={16} className="ml-1" />
          </a>
        </div>
      </AnimatedCard>
    </div>
  );
};

const Services: React.FC = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  
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
  
  return (
    <section id="services" className="py-20 bg-neutral-50">
      <div className="section-container">
        <div ref={headerRef} className="text-center mb-16 opacity-0">
          <p className="text-sm font-medium text-neutral-500 tracking-wider mb-3">NOS SERVICES</p>
          <h2 className="text-3xl md:text-4xl font-semibold mb-5">
            Solutions Web <span className="text-gradient">Complètes</span>
          </h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            Notre agence offre une gamme complète de services pour créer et optimiser votre présence sur le web, de la conception à la mise en ligne.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ServiceCard 
            icon={<Layout className="text-black" size={24} />}
            title="Web Design"
            description="Création d'interfaces élégantes et intuitives qui reflètent l'identité de votre marque et captivent vos visiteurs."
            delay={0}
          />
          
          <ServiceCard 
            icon={<Code className="text-black" size={24} />}
            title="Développement Web"
            description="Développement de sites performants et évolutifs en utilisant les technologies les plus modernes et adaptées à vos besoins."
            delay={100}
          />
          
          <ServiceCard 
            icon={<Smartphone className="text-black" size={24} />}
            title="Site Responsive"
            description="Création de sites qui offrent une expérience optimale sur tous les appareils: ordinateurs, tablettes et smartphones."
            delay={200}
          />
          
          <ServiceCard 
            icon={<Palette className="text-black" size={24} />}
            title="Identité Visuelle"
            description="Conception d'identités visuelles cohérentes qui renforcent la reconnaissance de votre marque sur tous les supports."
            delay={300}
          />
          
          <ServiceCard 
            icon={<Globe className="text-black" size={24} />}
            title="SEO & Marketing"
            description="Optimisation de votre présence en ligne pour améliorer votre visibilité sur les moteurs de recherche."
            delay={400}
          />
          
          <ServiceCard 
            icon={<Code className="text-black" size={24} />}
            title="E-commerce"
            description="Développement de boutiques en ligne performantes et sécurisées pour vendre vos produits ou services."
            delay={500}
          />
        </div>
      </div>
    </section>
  );
};

export default Services;
