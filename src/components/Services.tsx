
import React, { useEffect, useRef, useState } from 'react';
import { Code, Layout, Palette, Smartphone, Globe, ArrowRight, Box, Zap, Database, X, ChevronRight } from 'lucide-react';
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
}

// Composant de détails pour la modal
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
  
  // Contenu détaillé pour chaque service
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
    
    // Ajouter des contenus détaillés pour les autres services ici
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
                    Optimisation mobile
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="h-4 w-4 text-amber-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg>
                    Structured data (schema.org)
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="h-4 w-4 text-amber-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg>
                    Sitemaps XML et fichier robots.txt
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <Button className="mt-8 bg-gradient-to-r from-amber-600 to-amber-500">
          Obtenir un audit gratuit
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </ServiceDetails>
    ),
    
    "E-commerce": (
      <ServiceDetails 
        title="E-commerce"
        icon={<Box className="text-white" size={32} />}
        bgColor="bg-gradient-to-r from-emerald-500 to-emerald-600"
      >
        <p className="text-gray-600">Nous développons des boutiques en ligne performantes et sécurisées, optimisées pour convertir les visiteurs en clients fidèles.</p>
        
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="col-span-1 md:col-span-2 bg-emerald-50 p-5 rounded-lg">
            <h3 className="text-lg font-medium text-emerald-600 mb-3">Solutions e-commerce complètes</h3>
            
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="bg-white w-12 h-12 rounded-lg flex items-center justify-center shadow-sm">
                  <svg className="h-6 w-6 text-emerald-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                </div>
                <div>
                  <h4 className="font-medium">Catalogues produits</h4>
                  <p className="text-sm text-gray-600">Présentation attractive de vos produits avec filtres avancés et recherche intuitive.</p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <div className="bg-white w-12 h-12 rounded-lg flex items-center justify-center shadow-sm">
                  <svg className="h-6 w-6 text-emerald-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>
                </div>
                <div>
                  <h4 className="font-medium">Paiements sécurisés</h4>
                  <p className="text-sm text-gray-600">Intégration de multiples méthodes de paiement avec cryptage SSL pour une sécurité maximale.</p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <div className="bg-white w-12 h-12 rounded-lg flex items-center justify-center shadow-sm">
                  <svg className="h-6 w-6 text-emerald-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
                </div>
                <div>
                  <h4 className="font-medium">Gestion des commandes</h4>
                  <p className="text-sm text-gray-600">Interface administrateur intuitive pour gérer les commandes, le stock et les retours.</p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <div className="bg-white w-12 h-12 rounded-lg flex items-center justify-center shadow-sm">
                  <svg className="h-6 w-6 text-emerald-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                </div>
                <div>
                  <h4 className="font-medium">Expédition et livraison</h4>
                  <p className="text-sm text-gray-600">Configuration flexible des zones de livraison et intégration avec les services de transport.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-emerald-50 p-5 rounded-lg">
            <h3 className="text-lg font-medium text-emerald-600 mb-3">Plateformes</h3>
            <div className="space-y-3">
              <div className="bg-white p-3 rounded-lg shadow-sm flex items-center gap-3">
                <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="24" height="24" fill="#7EB643"/>
                  <path d="M12 4L8 8H10V15C10 15.55 10.45 16 11 16H13C13.55 16 14 15.55 14 15V8H16L12 4Z" fill="white"/>
                  <path d="M20 16H18V9C18 8.45 17.55 8 17 8H15C14.45 8 14 8.45 14 9V16H12L16 20L20 16Z" fill="white"/>
                </svg>
                <span className="font-medium">WooCommerce</span>
              </div>
              
              <div className="bg-white p-3 rounded-lg shadow-sm flex items-center gap-3">
                <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="24" height="24" fill="#95BF47"/>
                  <path d="M17.6569 8.96293C17.6418 8.89772 17.5963 8.84489 17.5356 8.82012L15.6236 8.22793C15.6236 8.22793 14.3522 7.72329 14.2917 7.69852C14.2614 7.68614 14.2311 7.67376 14.1932 7.66138C14.1175 7.63661 14.0342 7.61184 13.9434 7.59947C13.5183 7.5219 13.0477 7.60804 12.6226 7.84573C12.0914 8.13578 11.7118 8.69274 11.6211 9.34966C11.5304 9.93139 11.6741 10.5255 12.0003 10.9559C12.0609 11.0458 12.1365 11.1233 12.2198 11.2009C12.0154 11.2009 11.811 11.2133 11.6514 11.2133C10.7277 11.2133 9.94231 11.6314 9.41661 12.3007C8.84277 13.0323 8.70911 14.0173 9.00404 14.921C9.32412 15.9431 10.2932 16.7123 11.4532 16.9229C11.5911 16.9477 11.7345 16.96 11.8778 16.96H11.8931C12.2653 16.96 12.6226 16.8825 12.9347 16.7533C12.9271 16.79 12.9195 16.8392 12.9044 16.8883C12.8135 17.2692 12.7832 17.7737 12.7907 18.1793C12.8059 18.8363 12.9044 19.2048 13.0326 19.4401C13.1309 19.612 13.2444 19.7042 13.3806 19.7288H13.4109C13.5997 19.7288 13.7052 19.5674 13.7733 19.4649C13.9358 19.2295 13.9812 18.8238 13.9888 18.4182C13.9964 17.9508 13.9661 17.5328 13.9737 17.1272C13.9812 16.7224 14.0493 16.36 14.0493 16.3232C14.0493 16.3108 14.0493 16.2985 14.0493 16.2862C14.5522 16.1201 15.0097 15.8109 15.3748 15.3681C15.8096 14.8267 16.081 14.1329 16.1491 13.3884C16.1868 13.0323 16.1793 12.6761 16.1188 12.3323C16.5136 12.2179 16.8636 12.0319 17.1454 11.7718C17.5629 11.3791 17.8523 10.8591 17.9507 10.2773C18.049 9.7111 17.9431 9.1049 17.6569 8.96293ZM13.2444 9.77006C13.2444 9.77006 13.3655 9.81051 13.5486 9.89665C13.6697 9.95185 13.8075 10.0317 13.953 10.1178C14.0493 10.1793 14.1554 10.2408 14.2614 10.3147C14.3825 10.4068 14.5037 10.4929 14.6249 10.6051C14.6627 10.6419 14.7081 10.691 14.7536 10.7402C14.9291 10.9189 15.0957 11.1357 15.2409 11.3711C15.3066 11.4818 15.3672 11.5925 15.4201 11.7096C15.4655 11.8203 15.511 11.9249 15.5413 12.0472C15.5565 12.1088 15.5716 12.1703 15.5792 12.2318C15.6018 12.3426 15.6094 12.4595 15.6094 12.5825C15.6094 12.9264 15.5413 13.2702 15.4201 13.5917C15.2863 13.9502 15.0881 14.2941 14.8384 14.5911C14.5816 14.8881 14.2765 15.136 13.9434 15.31C13.6166 15.4779 13.2671 15.5886 12.91 15.627C12.7454 15.6454 12.5809 15.6516 12.4163 15.6393C12.3179 15.627 12.2196 15.627 12.1212 15.6085C12.0457 15.5947 11.9701 15.5763 11.8896 15.5578C11.812 15.5394 11.7345 15.5148 11.6589 15.4902C11.4683 15.4287 11.2776 15.348 11.0946 15.2497C10.9128 15.1513 10.731 15.0407 10.5665 14.9055C10.3985 14.7704 10.2365 14.6229 10.0976 14.4504C9.95865 14.2941 9.84347 14.1144 9.74677 13.9348C9.65007 13.7428 9.578 13.5508 9.52433 13.3465C9.4631 13.1483 9.42696 12.9387 9.41661 12.7277C9.40619 12.5087 9.42696 12.2976 9.46844 12.0787C9.49955 11.9126 9.55322 11.7464 9.61451 11.5987C9.66818 11.4572 9.73724 11.3157 9.81959 11.1803C9.89175 11.0512 9.97825 10.922 10.0647 10.8189C10.1556 10.7033 10.2592 10.6051 10.3629 10.5132C10.4688 10.4191 10.5853 10.3331 10.7065 10.2593C10.8276 10.1854 10.9564 10.124 11.0871 10.0749C11.2179 10.0257 11.3514 9.9889 11.485 9.95888C11.6135 9.93139 11.7421 9.91677 11.8708 9.91677C12.1439 9.91677 12.4134 9.96174 12.6755 10.0533C12.941 10.1487 13.1946 10.2838 13.4298 10.4561C13.6649 10.6359 13.8723 10.8468 14.0494 11.0826C14.0798 11.1233 14.1101 11.164 14.1403 11.207C14.1403 11.207 14.1327 11.1764 14.1252 11.1172C14.1177 11.0581 14.1026 10.9743 14.0875 10.8776C14.0723 10.8001 14.0572 10.7103 14.0342 10.6204C14.0116 10.5306 13.9813 10.4407 13.9509 10.3453C13.9206 10.2531 13.8827 10.1487 13.8372 10.0472C13.7918 9.9458 13.7387 9.84436 13.6858 9.74292C13.6254 9.63634 13.5579 9.53489 13.4827 9.43859C13.412 9.34229 13.334 9.24598 13.2444 9.15997C13.1612 9.06881 13.0704 8.97765 12.9709 8.89649C12.8711 8.81533 12.7651 8.7489 12.6528 8.67774C12.5405 8.61215 12.4293 8.55181 12.308 8.49661C12.1868 8.44141 12.0609 8.39659 11.9303 8.36397C11.8045 8.32621 11.6742 8.29845 11.5456 8.28607C11.4144 8.27369 11.2832 8.2737 11.1538 8.28607C11.0231 8.29845 10.8969 8.32321 10.7663 8.35159C10.6421 8.37997 10.5179 8.42479 10.3937 8.47484C10.2742 8.53005 10.1606 8.59049 10.047 8.66166C9.93334 8.73282 9.83044 8.81398 9.7331 8.90514C9.64192 8.9963 9.55074 9.09261 9.47196 9.19405C9.39317 9.29549 9.31995 9.40207 9.25236 9.51378C9.18489 9.63064 9.12758 9.74749 9.0849 9.86949C9.03674 9.9915 9.00534 10.1196 8.98012 10.2485H8.98007C8.88287 10.7649 8.92922 11.2905 9.10651 11.7804C9.2838 12.2702 9.58369 12.7031 9.97308 13.0369C10.3625 13.3708 10.8285 13.5931 11.3315 13.678C11.8345 13.7628 12.3522 13.7071 12.8273 13.5165C13.3024 13.3259 13.7171 13.0084 14.0266 12.5981C14.336 12.1879 14.5268 11.6998 14.5781 11.188C14.6294 10.6761 14.5391 10.1596 14.3193 9.69241C14.0995 9.22522 13.7591 8.82887 13.3336 8.54953C13.3336 8.54953 13.3336 8.56191 13.3336 8.57429C13.3336 8.59393 13.3336 8.6012 13.3336 8.62084C13.3261 8.64561 13.3185 8.68281 13.311 8.72001C13.3035 8.76235 13.2959 8.79955 13.2883 8.84189C13.2809 8.8791 13.2734 8.91631 13.2658 8.95864C13.2513 9.0227 13.2358 9.1014 13.2278 9.17771C13.2201 9.25887 13.2124 9.3499 13.2124 9.44106C13.2146 9.54758 13.2244 9.65382 13.2444 9.77006Z" fill="white"/>
                </svg>
                <span className="font-medium">Shopify</span>
              </div>
              
              <div className="bg-white p-3 rounded-lg shadow-sm flex items-center gap-3">
                <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="24" height="24" fill="#6567A5"/>
                  <path d="M20 12.5L19.5 19.5H4.5L4 12.5H20Z" fill="white"/>
                  <path d="M19.5 9.5L19 5H14.5L14 9.5H19.5Z" fill="white"/>
                  <path d="M10 9.5L10.5 5H5L4.5 9.5H10Z" fill="white"/>
                  <path d="M14 9.5L14.5 5H10.5L10 9.5H14Z" fill="white"/>
                </svg>
                <span className="font-medium">PrestaShop</span>
              </div>
              
              <div className="bg-white p-3 rounded-lg shadow-sm flex items-center gap-3">
                <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="24" height="24" fill="#FF7A59"/>
                  <path d="M19 12C19 15.866 15.866 19 12 19C8.13401 19 5 15.866 5 12C5 8.13401 8.13401 5 12 5C15.866 5 19 8.13401 19 12Z" fill="white"/>
                  <path d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z" fill="#FF7A59"/>
                </svg>
                <span className="font-medium">Magento</span>
              </div>
            </div>
          </div>
        </div>
        
        <Button className="mt-8 bg-gradient-to-r from-emerald-600 to-emerald-500">
          Démarrer mon projet e-commerce
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </ServiceDetails>
    )
  };
  
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
            onShowDetails={() => handleShowDetails("Design UI/UX")}
          />
          
          <ServiceCard 
            icon={<Code className="text-purple-600" size={28} />}
            title="Développement Web"
            description="Développement de sites et applications performants avec les technologies modernes (React, Vue, Node.js) pour une expérience utilisateur optimale."
            bgColor="bg-gradient-to-r from-purple-500 to-purple-600"
            delay={100}
            onShowDetails={() => handleShowDetails("Développement Web")}
          />
          
          <ServiceCard 
            icon={<Smartphone className="text-blue-600" size={28} />}
            title="Site Responsive"
            description="Conception adaptative garantissant une expérience fluide et cohérente sur tous les appareils, de l'ordinateur au smartphone."
            bgColor="bg-gradient-to-r from-blue-500 to-blue-600"
            delay={200}
            onShowDetails={() => handleShowDetails("Site Responsive")}
          />
          
          <ServiceCard 
            icon={<Palette className="text-pink-600" size={28} />}
            title="Identité Visuelle"
            description="Création d'identités de marque mémorables incluant logos, palettes de couleurs et éléments graphiques pour renforcer votre présence."
            bgColor="bg-gradient-to-r from-pink-500 to-pink-600"
            delay={300}
            onShowDetails={() => handleShowDetails("Identité Visuelle")}
          />
          
          <ServiceCard 
            icon={<Zap className="text-amber-600" size={28} />}
            title="Performance & SEO"
            description="Optimisation de votre présence en ligne pour garantir vitesse de chargement, accessibilité et visibilité sur les moteurs de recherche."
            bgColor="bg-gradient-to-r from-amber-500 to-amber-600"
            delay={400}
            onShowDetails={() => handleShowDetails("Performance & SEO")}
          />
          
          <ServiceCard 
            icon={<Box className="text-emerald-600" size={28} />}
            title="E-commerce"
            description="Développement de boutiques en ligne sécurisées et performantes avec systèmes de paiement et gestion de stocks intégrés."
            bgColor="bg-gradient-to-r from-emerald-500 to-emerald-600"
            delay={500}
            onShowDetails={() => handleShowDetails("E-commerce")}
          />
        </div>
        
        {/* Modal de détails de service */}
        <Dialog open={!!activeService} onOpenChange={handleCloseDetails}>
          <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="sr-only">{activeService}</DialogTitle>
              <DialogDescription className="sr-only">Détails du service</DialogDescription>
            </DialogHeader>
            <AnimatePresence>
              {activeService && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  {serviceDetails[activeService]}
                </motion.div>
              )}
            </AnimatePresence>
          </DialogContent>
        </Dialog>
        
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

