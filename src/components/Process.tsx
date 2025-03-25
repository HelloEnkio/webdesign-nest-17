
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

const ProcessStep: React.FC<ProcessStepProps> = ({ number, title, description, icon, color, delay = 0 }) => {
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
    <div ref={stepRef} className="relative flex flex-col items-center opacity-0 transition-all duration-300 hover:-translate-y-2">
      <div className={`flex items-center justify-center w-16 h-16 rounded-2xl ${color} shadow-lg mb-6 text-white`}>
        {icon}
      </div>
      <div className="absolute top-0 -right-[calc(50%+2rem)] w-full h-0.5 bg-gradient-to-r from-indigo-100 via-blue-200 to-transparent hidden lg:block"></div>
      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 mb-4 font-bold text-sm">
        {number}
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-center text-neutral-600 max-w-xs">{description}</p>
    </div>
  );
};

const Process: React.FC = () => {
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
    <section id="process" className="py-28 relative">
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
            Notre méthodologie de travail est conçue pour garantir des résultats exceptionnels,
            une communication transparente et une satisfaction client optimale.
          </p>
        </div>
        
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mt-10">
            <ProcessStep
              number="1"
              title="Découverte"
              icon={<Search size={28} />}
              color="bg-gradient-to-br from-indigo-500 to-indigo-700"
              description="Nous analysons vos besoins, objectifs et la concurrence pour définir la meilleure stratégie digitale."
              delay={100}
            />
            
            <ProcessStep
              number="2"
              title="Conception"
              icon={<Layout size={28} />}
              color="bg-gradient-to-br from-blue-500 to-blue-700"
              description="Création de maquettes interactives et prototypes pour visualiser l'aspect final de votre site web."
              delay={200}
            />
            
            <ProcessStep
              number="3"
              title="Développement"
              icon={<Code size={28} />}
              color="bg-gradient-to-br from-purple-500 to-purple-700"
              description="Construction de votre site avec les technologies les plus adaptées et tests rigoureux de qualité."
              delay={300}
            />
            
            <ProcessStep
              number="4"
              title="Lancement"
              icon={<Rocket size={28} />}
              color="bg-gradient-to-br from-pink-500 to-pink-700"
              description="Mise en ligne de votre site web, formation à l'utilisation et support technique continu."
              delay={400}
            />
          </div>
          
          {/* Timeline visualization for desktop */}
          <div className="hidden lg:block absolute top-[7.5rem] left-1/2 -translate-x-1/2 w-3/4 h-0.5 bg-gray-100"></div>
        </div>
        
        {/* Testimonial */}
        <div className="mt-24 max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8 md:p-10 border border-gray-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-indigo-100 to-transparent rounded-bl-full"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-blue-100 to-transparent rounded-tr-full"></div>
          
          <div className="relative z-10">
            <div className="flex justify-center mb-6">
              <div className="inline-flex h-12 w-auto">
                <svg viewBox="0 0 40 30" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-auto">
                  <path d="M0 29.9992V19.9995C0 14.4996 1.39999 9.69966 4.19998 5.5998C6.99997 1.49994 10.9 0 15.8999 1.09993L18 6.39978C14.2 7.09976 11.5 8.99969 9.9 12.0996C8.3 15.1995 7.59999 19.0994 7.79999 23.7993H14.5V29.9992H0Z" fill="#4F46E5"/>
                  <path d="M22 29.9992V19.9995C22 14.4996 23.4 9.69966 26.2 5.5998C29 1.49994 32.9 0 37.9 1.09993L40 6.39978C36.2 7.09976 33.5 8.99969 31.9 12.0996C30.3 15.1995 29.6 19.0994 29.8 23.7993H36.5V29.9992H22Z" fill="#4F46E5"/>
                </svg>
              </div>
            </div>
            
            <p className="text-xl md:text-2xl text-center text-neutral-700 font-medium mb-8 italic">
              "L'équipe de Studio.Web a transformé notre vision en une réalité numérique exceptionnelle. 
              Leur expertise technique et leur sensibilité créative ont dépassé toutes nos attentes."
            </p>
            
            <div className="flex items-center justify-center">
              <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
                <img 
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80" 
                  alt="Portrait client" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="font-semibold">Sophie Martins</div>
                <div className="text-sm text-neutral-500">Directrice Marketing, FinTech SA</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
