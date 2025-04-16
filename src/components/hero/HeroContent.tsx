import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';
import HeroStats from './HeroStats';
import HeroClientLogos from './HeroClientLogos';
import { TypingAnimation } from '@/components/ui/typing-animation';
import { motion } from 'framer-motion';

interface HeroContentProps {
  titleRef: React.RefObject<HTMLHeadingElement>;
  subtitleRef: React.RefObject<HTMLParagraphElement>;
  buttonsRef: React.RefObject<HTMLDivElement>;
  statsRef: React.RefObject<HTMLDivElement>;
}

const HeroContent: React.FC<HeroContentProps> = ({ titleRef, subtitleRef, buttonsRef, statsRef }) => {
  const rotatingWords = [
    "originalité",
    "professionnalisme",
    "élégance",
    "créativité",
    "innovation",
    "expertise",
    "des outils IA",
    "efficacité",
    "style",
    "sérénité"
  ];

  const scrollToServices = (e: React.MouseEvent) => {
    e.preventDefault();
    const servicesSection = document.getElementById('services-section');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="lg:col-span-7 space-y-8 md:space-y-10 relative">
      <div className="space-y-4">
        <h1 ref={titleRef} className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight md:leading-tight lg:leading-tight opacity-0 tracking-tight text-white drop-shadow-md">
          <motion.span className="block mb-2">Créez votre</motion.span>
          <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-cyan-300 drop-shadow-xl">
            <motion.span className="block">
              présence digitale
            </motion.span>
          </span>
          <motion.span className="block mt-2">
            avec{" "}
            <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-cyan-300 drop-shadow-xl" style={{ minHeight: "1.4em", verticalAlign: "middle" }}>
              <TypingAnimation 
                texts={rotatingWords}
                typingSpeed={100}
                deletingSpeed={60}
                pauseBeforeDelete={2000}
                showCursor={true}
                className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-cyan-300"
              />
            </span>
          </motion.span>
        </h1>
      </div>
      
      <p ref={subtitleRef} className="text-xl md:text-2xl text-gray-100 max-w-xl opacity-0 drop-shadow-md leading-relaxed">
        Nous concevons des expériences web sur mesure qui combinent 
        <span className="font-medium text-white"> esthétique contemporaine</span> et 
        <span className="font-medium text-white"> performance technique</span> pour donner vie à votre vision.
      </p>
      
      <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-5 opacity-0">
        <Button 
          size="lg" 
          className="group relative overflow-hidden rounded-full shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 transition-all duration-500"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-teal-400 to-emerald-500 opacity-100"></span>
          <span className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
          <span className="absolute inset-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.4)_0%,transparent_70%)]"></span>
          <span className="relative z-10 flex items-center font-medium py-4 px-8 text-white">
            <Sparkles className="w-5 h-5 mr-3 animate-pulse" />
            <span>Discuter de votre projet</span>
            <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-2 transition-transform duration-300" />
          </span>
        </Button>
        
        <Button 
          variant="outline" 
          size="lg" 
          className="portfolio-button group relative overflow-hidden rounded-full transition-all duration-300 border-2 border-white/70 hover:border-white/90 backdrop-blur-sm py-4 px-6"
          onClick={scrollToServices}
        >
          <span className="absolute inset-0 bg-gradient-to-r from-purple-500/80 via-indigo-500/80 to-cyan-500/80 opacity-0 group-hover:opacity-90 transition-opacity duration-500"></span>
          <span className="absolute inset-0 overflow-hidden">
            <span className="particle-1 absolute w-2 h-2 rounded-full bg-white/80 opacity-0 group-hover:opacity-80"></span>
            <span className="particle-2 absolute w-1.5 h-1.5 rounded-full bg-cyan-300/90 opacity-0 group-hover:opacity-90"></span>
            <span className="particle-3 absolute w-1 h-1 rounded-full bg-purple-300/80 opacity-0 group-hover:opacity-80"></span>
          </span>
          <span className="absolute inset-0 bg-white/80 transition-opacity duration-300 group-hover:opacity-0"></span>
          <span className="absolute inset-0 bg-gradient-to-tr from-white/5 to-white/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          <span className="absolute -inset-0.5 rounded-full opacity-0 group-hover:opacity-100 blur-md bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 group-hover:blur transition-all duration-500"></span>
          <span className="relative z-10 font-medium text-black group-hover:text-white flex items-center justify-center transition-colors duration-300">
            Voir nos services
          </span>
        </Button>
      </div>
      
      <div ref={statsRef}>
        <HeroStats />
      </div>
      
      <HeroClientLogos />
    </div>
  );
};

export default HeroContent;
