import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';
import HeroStats from './HeroStats';
import HeroClientLogos from './HeroClientLogos';
import { TextRotate, TextRotateRef } from '@/components/ui/text-rotate';
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
  
  const textRotateRef = useRef<TextRotateRef>(null);

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
            <TextRotate 
              ref={textRotateRef}
              texts={rotatingWords}
              rotationInterval={5000}
              staggerDuration={0.02}
              transition={{ 
                type: "spring", 
                damping: 30,
                stiffness: 400,
                duration: 0.4
              }}
              animatePresenceMode="sync"
              mainClassName="inline-flex overflow-hidden text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-cyan-300 drop-shadow-xl"
              elementLevelClassName="text-transparent bg-clip-text inline-block"
              initial={{ y: "80%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "-80%", opacity: 0 }}
            />
          </motion.span>
        </h1>
      </div>
      
      <p ref={subtitleRef} className="text-xl md:text-2xl text-gray-100 max-w-xl opacity-0 drop-shadow-md leading-relaxed">
        Nous concevons des expériences web sur mesure qui combinent 
        <span className="font-medium text-white"> esthétique contemporaine</span> et 
        <span className="font-medium text-white"> performance technique</span> pour donner vie à votre vision.
      </p>
      
      <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-4 opacity-0">
        <Button size="lg" className="rounded-full group relative overflow-hidden bg-gradient-to-br from-teal-400 via-teal-500 to-cyan-600 hover:shadow-xl hover:shadow-teal-500/30 transition-all duration-300 border-0 text-lg font-medium py-7 px-8">
          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-cyan-400 to-teal-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform group-hover:translate-y-0"></span>
          <span className="absolute inset-0 w-full h-full flex items-center justify-center bg-[radial-gradient(circle_at_50%_120%,rgba(120,255,215,0.2)_10%,transparent_80%)]"></span>
          <span className="relative z-10 flex items-center">
            <Sparkles className="w-5 h-5 mr-2" />
            Discuter de votre projet 
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </span>
        </Button>
        
        <Button variant="outline" size="lg" className="rounded-full border-2 border-teal-300/70 text-white hover:border-teal-300 hover:bg-teal-900/30 backdrop-blur-sm transition-all duration-300 text-lg font-medium py-7 px-8 hover:shadow-lg hover:shadow-teal-900/20">
          <span className="relative z-10 flex items-center">
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
