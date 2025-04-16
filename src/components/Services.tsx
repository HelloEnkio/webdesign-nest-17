import React, { useEffect, useRef, useState } from 'react';
import { Code, Layout, Palette, Smartphone, Globe, ArrowRight, Box, Zap, Database, X, ChevronRight, Brain } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { motion, AnimatePresence } from "framer-motion";

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  bgColor: string;
  delay?: number;
  detailContent?: React.ReactNode;
  onShowDetails: () => void;
}

interface ServiceDetailsProps {
  title: string;
  icon: React.ReactNode;
  bgColor: string;
  children: React.ReactNode;
}

const ServiceDetails: React.FC<ServiceDetailsProps> = ({ title, icon, bgColor, children }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className={`w-16 h-16 rounded-xl ${bgColor} flex items-center justify-center transition-transform duration-300`}>
          {icon}
        </div>
        <h2 className="text-2xl font-bold">{title}</h2>
      </div>
      
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
};

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description, bgColor, delay = 0, onShowDetails }) => {
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
          <button
            onClick={onShowDetails}
            className="inline-flex items-center text-sm font-medium text-black group/button relative overflow-hidden"
          >
            <span className="transition-all duration-300 group-hover/button:translate-x-1">En savoir plus</span>
            <span className="relative ml-1 transition-all duration-300 group-hover/button:translate-x-1">
              <ArrowRight size={16} className="transition-transform" />
            </span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 transition-all duration-300 group-hover/button:w-full"></span>
          </button>
        </CardContent>
      </Card>
    </div>
  );
};

const Services: React.FC = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const [activeService, setActiveService] = useState<string | null>(null);
  
  const handleShowDetails = (serviceTitle: string) => {
    setActiveService(serviceTitle);
  };
  
  const handleCloseDetails = () => {
    setActiveService(null);
  };
  
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
  
  const serviceDetails: Record<string, React.ReactNode> = {
    "Design UI/UX": (
      <ServiceDetails 
        title="Design UI/UX" 
        icon={<Layout className="text-white" size={32} />} 
        bgColor="bg-gradient-to-r from-indigo-500 to-indigo-600"
      >
        <p className="text-gray-600">Notre approche du design UI/UX combine esthétique et fonctionnalité pour créer des interfaces qui captent l'attention tout en étant intuitives.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-indigo-600 mb-2">Recherche utilisateur</h3>
            <p className="text-sm text-gray-600">Nous analysons les besoins et comportements pour des interfaces centrées sur l'utilisateur.</p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-indigo-600 mb-2">Wireframing</h3>
            <p className="text-sm text-gray-600">Création de maquettes fonctionnelles pour visualiser et tester les concepts.</p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-indigo-600 mb-2">Design d'interface</h3>
            <p className="text-sm text-gray-600">Interfaces visuellement attrayantes avec une attention particulière aux détails.</p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-indigo-600 mb-2">Tests d'utilisabilité</h3>
            <p className="text-sm text-gray-600">Validation des interfaces avec de vrais utilisateurs pour garantir une expérience optimale.</p>
          </div>
        </div>
        
        <div className="mt-8">
          <h3 className="text-lg font-medium mb-3">Notre processus de design</h3>
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-indigo-100"></div>
            
            <div className="relative pl-12 pb-8">
              <div className="absolute left-0 w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                <span className="text-indigo-600 font-medium">1</span>
              </div>
              <h4 className="text-md font-medium">Découverte et recherche</h4>
              <p className="text-sm text-gray-600 mt-1">Comprendre vos objectifs et les besoins de vos utilisateurs.</p>
            </div>
            
            <div className="relative pl-12 pb-8">
              <div className="absolute left-0 w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                <span className="text-indigo-600 font-medium">2</span>
              </div>
              <h4 className="text-md font-medium">Wireframing et prototypage</h4>
              <p className="text-sm text-gray-600 mt-1">Création de maquettes interactives pour visualiser les fonctionnalités.</p>
            </div>
            
            <div className="relative pl-12 pb-8">
              <div className="absolute left-0 w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                <span className="text-indigo-600 font-medium">3</span>
              </div>
              <h4 className="text-md font-medium">Design visuel</h4>
              <p className="text-sm text-gray-600 mt-1">Élaboration de l'identité visuelle et des éléments d'interface.</p>
            </div>
            
            <div className="relative pl-12">
              <div className="absolute left-0 w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                <span className="text-indigo-600 font-medium">4</span>
              </div>
              <h4 className="text-md font-medium">Tests et itérations</h4>
              <p className="text-sm text-gray-600 mt-1">Affinage continu basé sur les retours et les tests d'utilisabilité.</p>
            </div>
          </div>
        </div>
        
        <Button className="mt-8 bg-gradient-to-r from-indigo-600 to-indigo-500">
          Demander un devis
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </ServiceDetails>
    ),
    
    "Développement Web": (
      <ServiceDetails 
        title="Développement Web"
        icon={<Code className="text-white" size={32} />}
        bgColor="bg-gradient-to-r from-purple-500 to-purple-600"
      >
        <p className="text-gray-600">Notre équipe de développement crée des applications web performantes et évolutives en utilisant les technologies les plus récentes et les meilleures pratiques du secteur.</p>
        
        <div className="mt-6 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
              <span className="text-purple-600">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/></svg>
              </span>
            </div>
            <div>
              <h3 className="font-medium">Front-end dynamique</h3>
              <p className="text-sm text-gray-600">React, Vue.js, Angular pour des interfaces interactives et réactives.</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
              <span className="text-purple-600">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
              </span>
            </div>
            <div>
              <h3 className="font-medium">Back-end robuste</h3>
              <p className="text-sm text-gray-600">Node.js, Django, Laravel pour des architectures serveur solides.</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
              <span className="text-purple-600">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
              </span>
            </div>
            <div>
              <h3 className="font-medium">API et intégrations</h3>
              <p className="text-sm text-gray-600">Conception d'API RESTful et GraphQL pour des communications fluides.</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
              <span className="text-purple-600">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>
              </span>
            </div>
            <div>
              <h3 className="font-medium">Bases de données optimisées</h3>
              <p className="text-sm text-gray-600">SQL, NoSQL, avec modélisation pour des performances maximales.</p>
            </div>
          </div>
        </div>
        
        <div className="mt-8 bg-gradient-to-r from-purple-50 to-indigo-50 p-5 rounded-lg">
          <h3 className="text-lg font-medium mb-3">Technologies que nous maîtrisons</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-white p-3 rounded shadow-sm text-center">React</div>
            <div className="bg-white p-3 rounded shadow-sm text-center">Vue.js</div>
            <div className="bg-white p-3 rounded shadow-sm text-center">Node.js</div>
            <div className="bg-white p-3 rounded shadow-sm text-center">TypeScript</div>
            <div className="bg-white p-3 rounded shadow-sm text-center">Python</div>
            <div className="bg-white p-3 rounded shadow-sm text-center">Laravel</div>
            <div className="bg-white p-3 rounded shadow-sm text-center">MongoDB</div>
            <div className="bg-white p-3 rounded shadow-sm text-center">PostgreSQL</div>
          </div>
        </div>
        
        <Button className="mt-8 bg-gradient-to-r from-purple-600 to-purple-500">
          Discuter de votre projet
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </ServiceDetails>
    ),
    
    "Site Responsive": (
      <ServiceDetails 
        title="Site Responsive"
        icon={<Smartphone className="text-white" size={32} />}
        bgColor="bg-gradient-to-r from-blue-500 to-blue-600"
      >
        <p className="text-gray-600">Nos sites s'adaptent parfaitement à tous les appareils, offrant une expérience utilisateur optimale sur ordinateurs, tablettes et smartphones.</p>
        
        <div className="grid grid-cols-1 gap-6 mt-6">
          <div className="bg-blue-50 rounded-lg p-5">
            <h3 className="text-lg font-medium text-blue-600 mb-2">Design mobile-first</h3>
            <p className="text-gray-600">Nous concevons d'abord pour les mobiles, puis adaptons pour les écrans plus grands, garantissant une expérience optimale sur tous les appareils.</p>
            <div className="mt-4 flex items-center space-x-2">
              <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
              <span className="text-sm text-gray-600">Navigation simplifiée sur petit écran</span>
            </div>
            <div className="mt-2 flex items-center space-x-2">
              <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
              <span className="text-sm text-gray-600">Éléments interactifs adaptés au toucher</span>
            </div>
            <div className="mt-2 flex items-center space-x-2">
              <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
              <span className="text-sm text-gray-600">Chargement optimisé pour les connexions mobiles</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white shadow-sm rounded-lg p-4 text-center border border-gray-100">
              <div className="mx-auto w-16 h-16 flex items-center justify-center bg-blue-100 rounded-full mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12" y2="18"/></svg>
              </div>
              <h4 className="font-medium">Smartphones</h4>
              <p className="text-sm text-gray-600 mt-2">Interface adaptée aux petits écrans tactiles</p>
            </div>
            
            <div className="bg-white shadow-sm rounded-lg p-4 text-center border border-gray-100">
              <div className="mx-auto w-16 h-16 flex items-center justify-center bg-blue-100 rounded-full mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></svg>
              </div>
              <h4 className="font-medium">Tablettes</h4>
              <p className="text-sm text-gray-600 mt-2">Mise en page équilibrée pour écrans moyens</p>
            </div>
            
            <div className="bg-white shadow-sm rounded-lg p-4 text-center border border-gray-100">
              <div className="mx-auto w-16 h-16 flex items-center justify-center bg-blue-100 rounded-full mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
              </div>
              <h4 className="font-medium">Ordinateurs</h4>
              <p className="text-sm text-gray-600 mt-2">Expérience complète sur grands écrans</p>
            </div>
          </div>
        </div>
        
        <div className="mt-8 bg-gray-50 p-5 rounded-lg">
          <h3 className="text-lg font-medium mb-3">Nos tests de compatibilité</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Chrome, Firefox, Safari, Edge</span>
              <span className="text-sm text-blue-600">100% compatible</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full w-full"></div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">iOS & Android</span>
              <span className="text-sm text-blue-600">100% compatible</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full w-full"></div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Différentes tailles d'écran</span>
              <span className="text-sm text-blue-600">100% adaptatif</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full w-full"></div>
            </div>
          </div>
        </div>
        
        <Button className="mt-8 bg-gradient-to-r from-blue-600 to-blue-500">
          Évaluer mon site actuel
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </ServiceDetails>
    ),
    
    "Identité Visuelle": (
      <ServiceDetails 
        title="Identité Visuelle"
        icon={<Palette className="text-white" size={32} />}
        bgColor="bg-gradient-to-r from-pink-500 to-pink-600"
      >
        <p className="text-gray-600">Nous créons des identités visuelles distinctives et mémorables qui reflètent les valeurs et la personnalité de votre marque.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="bg-pink-50 p-5 rounded-lg">
            <h3 className="text-lg font-medium text-pink-600 mb-2">Création de logo</h3>
            <p className="text-sm text-gray-600">Des logos uniques et intemporels qui capturent l'essence de votre entreprise et se démarquent sur tous les supports.</p>
          </div>
          
          <div className="bg-pink-50 p-5 rounded-lg">
            <h3 className="text-lg font-medium text-pink-600 mb-2">Charte graphique</h3>
            <p className="text-sm text-gray-600">Définition de palettes de couleurs, typographies et éléments visuels cohérents pour tous vos supports de communication.</p>
          </div>
        </div>
        
        <div className="mt-8">
          <h3 className="text-lg font-medium mb-4">Notre processus créatif</h3>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="rounded-full w-8 h-8 bg-pink-100 flex items-center justify-center text-pink-600 font-semibold">1</div>
              <div>
                <h4 className="font-medium">Découverte de la marque</h4>
                <p className="text-sm text-gray-600 mt-1">Nous explorons vos valeurs, votre public cible et votre positionnement sur le marché.</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="rounded-full w-8 h-8 bg-pink-100 flex items-center justify-center text-pink-600 font-semibold">2</div>
              <div>
                <h4 className="font-medium">Recherche et inspiration</h4>
                <p className="text-sm text-gray-600 mt-1">Nous explorons les tendances tout en cherchant à créer quelque chose d'unique pour votre marque.</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="rounded-full w-8 h-8 bg-pink-100 flex items-center justify-center text-pink-600 font-semibold">3</div>
              <div>
                <h4 className="font-medium">Concepts et ébauches</h4>
                <p className="text-sm text-gray-600 mt-1">Développement de plusieurs concepts visuels pour explorer différentes directions créatives.</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="rounded-full w-8 h-8 bg-pink-100 flex items-center justify-center text-pink-600 font-semibold">4</div>
              <div>
                <h4 className="font-medium">Affinage et finalisation</h4>
                <p className="text-sm text-gray-600 mt-1">Perfectionnement du concept choisi et développement de tous les éléments de l'identité visuelle.</p>
              </div>
            </div>
          </div>
        </div>
        
        <Button className="mt-8 bg-gradient-to-r from-pink-600 to-pink-500">
          Créer mon identité de marque
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </ServiceDetails>
    ),
    
    "Performance & SEO": (
      <ServiceDetails 
        title="Performance & SEO"
        icon={<Zap className="text-white" size={32} />}
        bgColor="bg-gradient-to-r from-amber-500 to-amber-600"
      >
        <p className="text-gray-600">Nous optimisons votre présence en ligne pour améliorer la visibilité sur les moteurs de recherche et garantir une expérience utilisateur rapide et fluide.</p>
        
        <div className="mt-6 space-y-6">
          <div className="bg-amber-50 p-5 rounded-lg">
            <h3 className="text-lg font-medium text-amber-600 mb-3">Audit de performance</h3>
            <div className="space-y-4">
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">Vitesse de chargement</span>
                  <span className="text-amber-600 text-sm">Critique</span>
                </div>
                <p className="text-sm text-gray-600">Optimisation des images, minification du code, mise en cache et autres techniques pour accélérer le chargement.</p>
              </div>
              
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">Core Web Vitals</span>
                  <span className="text-amber-600 text-sm">Important</span>
                </div>
                <p className="text-sm text-gray-600">Amélioration des métriques LCP, FID et CLS pour satisfaire aux exigences de Google.</p>
              </div>
              
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">Accessibilité</span>
                  <span className="text-amber-600 text-sm">Essentiel</span>
                </div>
                <p className="text-sm text-gray-600">Conformité aux normes WCAG pour rendre votre site accessible à tous les utilisateurs.</p>
              </div>
            </div>
          </div>
          
          <div className="bg-amber-50 p-5 rounded-lg">
            <h3 className="text-lg font-medium text-amber-600 mb-3">Optimisation SEO</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="font-medium mb-2">SEO On-page</h4>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <svg className="h-4 w-4 text-amber-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg>
                    Optimisation des balises title et meta
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="h-4 w-4 text-amber-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg>
                    Structure des URL et du contenu
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="h-4 w-4 text-amber-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg>
                    Balisage sémantique HTML
                  </li>
                </ul>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="font-medium mb-2">SEO Technique</h4>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <svg className="h-4 w-4 text-amber-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg>
                    Optimisation pour les appareils mobiles
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="h-4 w-4 text-amber-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg>
                    Vitesse de chargement des pages
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="h-4 w-4 text-amber-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg>
                    Sécurité du site (HTTPS)
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <Button className="mt-8 bg-gradient-to-r from-amber-600 to-amber-500">
          Audit SEO gratuit
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </ServiceDetails>
    ),
    
    "Agent & App IA": (
      <ServiceDetails 
        title="Agent & App IA"
        icon={<Brain className="text-white" size={32} />}
        bgColor="bg-gradient-to-r from-green-500 to-emerald-600"
      >
        <p className="text-gray-600">Développez des solutions intelligentes qui transforment vos processus grâce à l'intelligence artificielle adaptative et personnalisable.</p>
        
        <div className="mt-6 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
              <span className="text-green-600">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a9 9 0 0 1 9 9v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 9-9z"/><path d="M8 14v.5"/><path d="M16 14v.5"/><path d="M8 18h.5"/><path d="M16 18h.5"/><path d="M16 10.5V11"/><path d="M16 8v.5"/></svg>
              </span>
            </div>
            <div>
              <h3 className="font-medium">Agents IA Personnalisés</h3>
              <p className="text-sm text-gray-600">Création d'agents intelligents adaptés à vos besoins métiers spécifiques.</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
              <span className="text-green-600">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              </span>
            </div>
            <div>
              <h3 className="font-medium">Applications IA Intégrées</h3>
              <p className="text-sm text-gray-600">Développement d'applications web avec des fonctionnalités IA avancées.</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
              <span className="text-green-600">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22v-7l-2-2v-4H2v4l-2 2v7h16Z"/><path d="M5 12V2l2-1 2 1v10"/><path d="M10 12V2l2-1 2 1v10"/></svg>
              </span>
            </div>
            <div>
              <h3 className="font-medium">Machine Learning sur Mesure</h3>
              <p className="text-sm text-gray-600">Modèles de machine learning adaptés à vos données et objectifs.</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
              <span className="text-green-600">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" x2="22" y1="12" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
              </span>
            </div>
            <div>
              <h3 className="font-medium">Solutions Conversationnelles</h3>
              <p className="text-sm text-gray-600">Chatbots et assistants IA intelligents pour l'interaction client.</p>
            </div>
          </div>
        </div>
        
        <div className="mt-8 bg-gradient-to-r from-green-50 to-emerald-50 p-5 rounded-lg">
          <h3 className="text-lg font-medium mb-3">Technologies IA Utilisées</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-white p-3 rounded shadow-sm text-center">GPT</div>
            <div className="bg-white p-3 rounded shadow-sm text-center">TensorFlow</div>
            <div className="bg-white p-3 rounded shadow-sm text-center">PyTorch</div>
            <div className="bg-white p-3 rounded shadow-sm text-center">LangChain</div>
            <div className="bg-white p-3 rounded shadow-sm text-center">Hugging Face</div>
            <div className="bg-white p-3 rounded shadow-sm text-center">OpenAI</div>
            <div className="bg-white p-3 rounded shadow-sm text-center">Scikit-learn</div>
            <div className="bg-white p-3 rounded shadow-sm text-center">Keras</div>
          </div>
        </div>
        
        <Button className="mt-8 bg-gradient-to-r from-green-600 to-emerald-500">
          Discuter de votre projet IA
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </ServiceDetails>
    )
  };

  return (
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div ref={headerRef} className="text-center mb-16 opacity-0">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Nos Services</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Des solutions digitales complètes pour donner vie à votre vision et accélérer votre croissance.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ServiceCard 
            icon={<Layout className="text-indigo-600" size={28} />}
            title="Design UI/UX"
            description="Création d'interfaces utilisateurs élégantes et intuitives qui offrent une expérience utilisateur exceptionnelle."
            bgColor="bg-gradient-to-r from-indigo-500 to-indigo-600"
            delay={100}
            onShowDetails={() => handleShowDetails("Design UI/UX")}
          />
          
          <ServiceCard 
            icon={<Code className="text-purple-600" size={28} />}
            title="Développement Web"
            description="Développement d'applications web performantes, évolutives et sécurisées avec les dernières technologies."
            bgColor="bg-gradient-to-r from-purple-500 to-purple-600"
            delay={200}
            onShowDetails={() => handleShowDetails("Développement Web")}
          />
          
          <ServiceCard 
            icon={<Smartphone className="text-blue-600" size={28} />}
            title="Site Responsive"
            description="Sites web parfaitement adaptés à tous les appareils, de l'ordinateur de bureau au smartphone."
            bgColor="bg-gradient-to-r from-blue-500 to-blue-600"
            delay={300}
            onShowDetails={() => handleShowDetails("Site Responsive")}
          />
          
          <ServiceCard 
            icon={<Palette className="text-pink-600" size={28} />}
            title="Identité Visuelle"
            description="Création d'identités de marque mémorables qui reflètent les valeurs et la personnalité de votre entreprise."
            bgColor="bg-gradient-to-r from-pink-500 to-pink-600"
            delay={400}
            onShowDetails={() => handleShowDetails("Identité Visuelle")}
          />
          
          <ServiceCard 
            icon={<Zap className="text-amber-600" size={28} />}
            title="Performance & SEO"
            description="Optimisation de votre présence en ligne pour améliorer la visibilité sur les moteurs de recherche."
            bgColor="bg-gradient-to-r from-amber-500 to-amber-600"
            delay={500}
            onShowDetails={() => handleShowDetails("Performance & SEO")}
          />
          
          <ServiceCard 
            icon={<Brain className="text-green-600" size={28} />}
            title="Agent & App IA"
            description="Solutions intelligentes d'IA personnalisées pour optimiser vos processus métiers et interactions."
            bgColor="bg-gradient-to-r from-green-500 to-green-600"
            delay={600}
            onShowDetails={() => handleShowDetails("Agent & App IA")}
          />
        </div>
        
        <Dialog open={!!activeService} onOpenChange={() => handleCloseDetails()}>
          <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="sr-only">{activeService}</DialogTitle>
            </DialogHeader>
            
            {activeService && serviceDetails[activeService]}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default Services;
