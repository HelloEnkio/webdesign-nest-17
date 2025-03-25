
import React, { useEffect, useRef } from 'react';
import { Code, Layout, Palette, Smartphone, Globe, ArrowRight, Box, Zap, Database } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  bgColor: string;
  delay?: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description, bgColor, delay = 0 }) => {
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
      <Card className="overflow-hidden h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-0 group">
        <div className={`h-2 w-full ${bgColor}`}></div>
        <CardContent className="p-6">
          <div className="mb-6 inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gray-100 group-hover:scale-110 transition-transform duration-300">
            {icon}
          </div>
          <h3 className="text-xl font-bold mb-3">{title}</h3>
          <p className="text-neutral-600 mb-4 leading-relaxed">{description}</p>
          <a href="#" className="inline-flex items-center text-sm font-medium text-black hover:text-indigo-600 transition-colors">
            En savoir plus <ArrowRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
          </a>
        </CardContent>
      </Card>
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
    <section id="services" className="py-28 relative">
      {/* Design elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50 to-white z-0"></div>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neutral-300/50 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neutral-300/50 to-transparent"></div>
      
      <div className="section-container relative z-10">
        <div ref={headerRef} className="text-center mb-16 opacity-0">
          <div className="inline-flex items-center rounded-full mb-4 bg-black/5 px-3 py-1">
            <span className="w-2 h-2 rounded-full bg-indigo-500 mr-2"></span>
            <span className="text-xs font-medium">NOS SERVICES</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-5 tracking-tight">
            Solutions Web <span className="bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">Complètes</span>
          </h2>
          
          <p className="text-neutral-600 max-w-2xl mx-auto mb-4 text-lg">
            Notre agence offre une gamme complète de services pour créer et optimiser 
            votre présence numérique avec un haut niveau d'expertise technique.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ServiceCard 
            icon={<Layout className="text-indigo-600" size={28} />}
            title="Design UI/UX"
            description="Création d'interfaces élégantes et intuitives basées sur les dernières tendances et les meilleures pratiques d'expérience utilisateur."
            bgColor="bg-gradient-to-r from-indigo-500 to-indigo-600"
            delay={0}
          />
          
          <ServiceCard 
            icon={<Code className="text-purple-600" size={28} />}
            title="Développement Web"
            description="Développement de sites et applications performants avec les technologies modernes (React, Vue, Node.js) pour une expérience utilisateur optimale."
            bgColor="bg-gradient-to-r from-purple-500 to-purple-600"
            delay={100}
          />
          
          <ServiceCard 
            icon={<Smartphone className="text-blue-600" size={28} />}
            title="Site Responsive"
            description="Conception adaptative garantissant une expérience fluide et cohérente sur tous les appareils, de l'ordinateur au smartphone."
            bgColor="bg-gradient-to-r from-blue-500 to-blue-600"
            delay={200}
          />
          
          <ServiceCard 
            icon={<Palette className="text-pink-600" size={28} />}
            title="Identité Visuelle"
            description="Création d'identités de marque mémorables incluant logos, palettes de couleurs et éléments graphiques pour renforcer votre présence."
            bgColor="bg-gradient-to-r from-pink-500 to-pink-600"
            delay={300}
          />
          
          <ServiceCard 
            icon={<Zap className="text-amber-600" size={28} />}
            title="Performance & SEO"
            description="Optimisation de votre présence en ligne pour garantir vitesse de chargement, accessibilité et visibilité sur les moteurs de recherche."
            bgColor="bg-gradient-to-r from-amber-500 to-amber-600"
            delay={400}
          />
          
          <ServiceCard 
            icon={<Box className="text-emerald-600" size={28} />}
            title="E-commerce"
            description="Développement de boutiques en ligne sécurisées et performantes avec systèmes de paiement et gestion de stocks intégrés."
            bgColor="bg-gradient-to-r from-emerald-500 to-emerald-600"
            delay={500}
          />
        </div>
        
        <div className="mt-20 p-8 md:p-10 rounded-2xl bg-gradient-to-r from-indigo-50 via-purple-50 to-blue-50 border border-white shadow-sm">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
            <div className="flex-1">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">Prêt pour votre <span className="bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">prochain projet</span> ?</h3>
              <p className="text-neutral-600 mb-6">Contactez-nous pour discuter de vos besoins et découvrir comment nous pouvons vous aider à concrétiser votre vision.</p>
              <a href="#contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300">
                Commencer un projet <ArrowRight size={16} />
              </a>
            </div>
            
            <div className="flex-1 grid grid-cols-3 gap-4">
              <div className="p-4 bg-white rounded-xl shadow-sm flex flex-col items-center justify-center gap-2">
                <div className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">24h</div>
                <div className="text-xs text-center text-neutral-500">Temps de réponse garanti</div>
              </div>
              <div className="p-4 bg-white rounded-xl shadow-sm flex flex-col items-center justify-center gap-2">
                <div className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">100%</div>
                <div className="text-xs text-center text-neutral-500">Satisfaction client</div>
              </div>
              <div className="p-4 bg-white rounded-xl shadow-sm flex flex-col items-center justify-center gap-2">
                <div className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">5★</div>
                <div className="text-xs text-center text-neutral-500">Note moyenne clients</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
