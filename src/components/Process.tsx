
import React, { useEffect, useRef } from 'react';
import { Search, Layout, Code, Rocket } from 'lucide-react';
interface ProcessStepProps {
  number: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  delay?: number;
}
const ProcessStep: React.FC<ProcessStepProps> = ({
  number,
  title,
  description,
  icon,
  color,
  delay = 0
}) => {
  const stepRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          stepRef.current?.classList.add('animate-fade-up');
        }, delay);
      }
    }, {
      threshold: 0.1
    });
    if (stepRef.current) {
      observer.observe(stepRef.current);
    }
    return () => {
      if (stepRef.current) {
        observer.unobserve(stepRef.current);
      }
    };
  }, [delay]);
  return <div ref={stepRef} className="relative flex flex-col items-center opacity-0 transition-all duration-300 hover:-translate-y-2">
      <div className={`flex items-center justify-center w-16 h-16 rounded-2xl ${color} shadow-lg mb-6 text-white`}>
        {icon}
      </div>
      <div className="absolute top-0 -right-[calc(50%+2rem)] w-full h-0.5 bg-gradient-to-r from-indigo-100 via-blue-200 to-transparent hidden lg:block"></div>
      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 mb-4 font-bold text-sm">
        {number}
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-center text-neutral-600 max-w-xs">{description}</p>
    </div>;
};
const Process: React.FC = () => {
  const headerRef = useRef<HTMLDivElement>(null);
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
  return <section id="process" className="py-28 relative">
      {/* Design elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50 to-white z-0"></div>
      <div className="absolute top-20 right-0 w-72 h-72 bg-indigo-50 rounded-full blur-3xl opacity-70"></div>
      <div className="absolute bottom-20 left-0 w-72 h-72 bg-blue-50 rounded-full blur-3xl opacity-70"></div>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neutral-300/50 to-transparent"></div>
      
      <div className="section-container relative z-10">
        <div ref={headerRef} className="text-center mb-20 opacity-0">
          <div className="inline-flex items-center rounded-full mb-4 bg-black/5 px-3 py-1">
            <span className="w-2 h-2 rounded-full bg-indigo-500 mr-2"></span>
            <span className="text-xs font-medium">NOTRE PROCESSUS</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-5 tracking-tight">
            Comment nous <span className="bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">travaillons</span>
          </h2>
          
          <p className="text-neutral-600 max-w-2xl mx-auto text-lg">
            Notre méthodologie de travail est conçue pour garantir des résultats parfaits,
            une communication transparente et une satisfaction client optimale.
          </p>
        </div>
        
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mt-10">
            <ProcessStep number="1" title="Découverte" icon={<Search size={28} />} color="bg-gradient-to-br from-indigo-500 to-indigo-700" description="Analyse de vos besoins, objectifs et la concurrence pour définir la meilleure stratégie digitale." delay={100} />
            
            <ProcessStep number="2" title="Conception" icon={<Layout size={28} />} color="bg-gradient-to-br from-blue-500 to-blue-700" description="Création de maquettes interactives et prototypes pour visualiser l'aspect final de votre site web." delay={200} />
            
            <ProcessStep number="3" title="Développement" icon={<Code size={28} />} color="bg-gradient-to-br from-purple-500 to-purple-700" description="Construction de votre site avec les technologies les plus adaptées et tests rigoureux de qualité." delay={300} />
            
            <ProcessStep number="4" title="Lancement" icon={<Rocket size={28} />} color="bg-gradient-to-br from-pink-500 to-pink-700" description="Mise en ligne de votre site web, formation à l'utilisation et support technique continu." delay={400} />
          </div>
          
          {/* Timeline visualization for desktop */}
          <div className="hidden lg:block absolute top-[7.5rem] left-1/2 -translate-x-1/2 w-3/4 h-0.5 bg-gray-100"></div>
        </div>
        
        {/* Testimonial */}
        
      </div>
    </section>;
};
export default Process;
