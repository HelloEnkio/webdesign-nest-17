
import React, { useEffect, useRef } from 'react';

interface ProcessStepProps {
  number: string;
  title: string;
  description: string;
  delay?: number;
}

const ProcessStep: React.FC<ProcessStepProps> = ({ number, title, description, delay = 0 }) => {
  const stepRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            stepRef.current?.classList.add('animate-fade-up');
          }, delay);
        }
      },
      { threshold: 0.1 }
    );
    
    if (stepRef.current) {
      observer.observe(stepRef.current);
    }
    
    return () => {
      if (stepRef.current) {
        observer.unobserve(stepRef.current);
      }
    };
  }, [delay]);
  
  return (
    <div ref={stepRef} className="relative flex flex-col items-center opacity-0">
      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-black text-white text-lg font-semibold mb-4">
        {number}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-center text-neutral-600">{description}</p>
    </div>
  );
};

const Process: React.FC = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const processLineRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observerHeader = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          headerRef.current?.classList.add('animate-fade-up');
        }
      },
      { threshold: 0.1 }
    );
    
    if (headerRef.current) {
      observerHeader.observe(headerRef.current);
    }
    
    const observerLine = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          processLineRef.current?.classList.add('animate-reveal-right');
        }
      },
      { threshold: 0.1 }
    );
    
    if (processLineRef.current) {
      observerLine.observe(processLineRef.current);
    }
    
    return () => {
      if (headerRef.current) {
        observerHeader.unobserve(headerRef.current);
      }
      if (processLineRef.current) {
        observerLine.unobserve(processLineRef.current);
      }
    };
  }, []);
  
  return (
    <section id="process" className="py-20 bg-neutral-50">
      <div className="section-container">
        <div ref={headerRef} className="text-center mb-16 opacity-0">
          <p className="text-sm font-medium text-neutral-500 tracking-wider mb-3">NOTRE PROCESSUS</p>
          <h2 className="text-3xl md:text-4xl font-semibold mb-5">
            Comment nous <span className="text-gradient">travaillons</span>
          </h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            Notre méthodologie de travail est conçue pour garantir des résultats de qualité,
            une communication transparente et une satisfaction client optimale.
          </p>
        </div>
        
        <div className="relative">
          {/* Process line */}
          <div className="absolute top-[60px] left-0 w-full h-1 flex justify-center">
            <div 
              ref={processLineRef} 
              className="h-1 bg-neutral-300 opacity-0" 
              style={{ width: '80%', maxWidth: '900px', transform: 'translateX(-100%)' }}
            ></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mt-10">
            <ProcessStep
              number="1"
              title="Découverte"
              description="Nous analysons vos besoins, objectifs et la concurrence pour définir la meilleure stratégie."
              delay={100}
            />
            
            <ProcessStep
              number="2"
              title="Conception"
              description="Création de maquettes et prototypes pour visualiser l'aspect final de votre site web."
              delay={200}
            />
            
            <ProcessStep
              number="3"
              title="Développement"
              description="Construction de votre site avec les technologies les plus adaptées à votre projet."
              delay={300}
            />
            
            <ProcessStep
              number="4"
              title="Lancement"
              description="Tests rigoureux, optimisations finales et mise en ligne de votre site web."
              delay={400}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
