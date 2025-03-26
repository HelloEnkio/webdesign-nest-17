
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
    "élégance",
    "créativité",
    "professionnalisme",
    "efficacité",
    "innovation",
    "expertise",
    "originalité",
    "perfection"
  ];

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
            <span className="inline-flex text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-cyan-300 drop-shadow-xl">
              <TypingAnimation 
                texts={rotatingWords}
                typingSpeed={100}
                deletingSpeed={60}
                pauseBeforeDelete={2000}
                showCursor={true}
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
          {/* Gradient background with animation */}
          <span className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-teal-400 to-emerald-500 opacity-100"></span>
          <span className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
          
          {/* Subtle light effect */}
          <span className="absolute inset-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.4)_0%,transparent_70%)]"></span>
          
          {/* Content */}
          <span className="relative z-10 flex items-center font-medium py-4 px-8 text-white">
            <Sparkles className="w-5 h-5 mr-3 animate-pulse" />
            <span>Discuter de votre projet</span>
            <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-2 transition-transform duration-300" />
          </span>
        </Button>
        
        <Button 
          variant="outline" 
          size="lg" 
          className="group relative overflow-hidden rounded-full transition-all duration-300 border-2 border-teal-400/30 hover:border-teal-400/60 backdrop-blur-sm py-4 px-6"
        >
          {/* Subtle background effect */}
          <span className="absolute inset-0 bg-white/5 group-hover:bg-teal-900/20 transition-colors duration-300"></span>
          
          {/* Light effect on hover */}
          <span className="absolute inset-0 w-full h-full bg-[radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.1)_0%,transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
          
          {/* Border glow effect */}
          <span className="absolute -inset-0.5 rounded-full opacity-0 group-hover:opacity-100 blur-md bg-gradient-to-r from-teal-400/30 to-cyan-400/30 group-hover:blur transition-all duration-500"></span>
          
          {/* Content */}
          <span className="relative z-10 font-medium text-white flex items-center justify-center">
            Voir notre portfolio
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
