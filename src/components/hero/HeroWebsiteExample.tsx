
import React from 'react';
import { ExternalLink, Laptop, Monitor } from 'lucide-react';
import { CarouselItem } from '@/components/ui/carousel';
import AnimatedCard from '@/components/ui/AnimatedCard';

export interface WebsiteExample {
  id: number;
  title: string;
  description: string;
  image: string;
  icon: React.ReactNode;
  tags: string[];
}

interface HeroWebsiteExampleProps {
  example: WebsiteExample;
}

const HeroWebsiteExample: React.FC<HeroWebsiteExampleProps> = ({ example }) => {
  return (
    <CarouselItem key={example.id}>
      <AnimatedCard className="p-0 overflow-hidden border-0 shadow-xl bg-black/40 backdrop-blur-md">
        <div className="relative group">
          <img 
            src={example.image} 
            alt={example.title}
            className="w-full h-44 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent opacity-90"></div>
          <div className="absolute bottom-0 left-0 right-0 p-4 transform transition-transform group-hover:translate-y-0">
            <div className="flex items-center gap-2 mb-2">
              <div className="bg-white/20 backdrop-blur-sm p-1 rounded-md">
                {example.icon}
              </div>
              <h3 className="text-white font-semibold text-lg">{example.title}</h3>
            </div>
            <p className="text-gray-100 text-sm mb-3">{example.description}</p>
            <div className="flex gap-2 flex-wrap">
              {example.tags.map((tag, index) => (
                <span 
                  key={index} 
                  className="text-xs py-1 px-2 bg-teal-900/70 backdrop-blur-sm rounded-full text-teal-100 font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </AnimatedCard>
    </CarouselItem>
  );
};

export const getWebsiteExamples = (): WebsiteExample[] => {
  return [
    {
      id: 1,
      title: "E-commerce Premium",
      description: "Boutique en ligne moderne avec paiement intégré",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
      icon: <Monitor size={16} className="text-teal-400" />,
      tags: ["Shopify", "React", "TailwindCSS"]
    },
    {
      id: 2,
      title: "Portfolio Créatif",
      description: "Mise en valeur de projets artistiques",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
      icon: <Laptop size={16} className="text-blue-400" />,
      tags: ["NextJS", "Motion", "Darkmode"]
    },
    {
      id: 3,
      title: "Application SaaS",
      description: "Dashboard interactif avec analyses en temps réel",
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=800&q=80",
      icon: <ExternalLink size={16} className="text-cyan-400" />,
      tags: ["Vue", "GraphQL", "Typescript"]
    }
  ];
};

export default HeroWebsiteExample;
