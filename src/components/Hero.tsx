
import React, { useEffect, useRef } from 'react';
import Button from './ui/Button';

const Hero: React.FC = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Simple animation on mount
    const title = titleRef.current;
    const subtitle = subtitleRef.current;
    const buttons = buttonsRef.current;
    const image = imageRef.current;

    if (title) title.classList.add('fade-in');
    if (subtitle) {
      subtitle.classList.add('fade-in');
      subtitle.classList.add('stagger-1');
    }
    if (buttons) {
      buttons.classList.add('fade-in');
      buttons.classList.add('stagger-2');
    }
    if (image) {
      image.classList.add('fade-in');
      image.classList.add('stagger-3');
    }
  }, []);

  return (
    <section id="home" className="pt-28 pb-20 md:pt-32 md:pb-24">
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-6 md:space-y-8">
            <div className="space-y-2">
              <p className="text-sm md:text-base font-medium text-neutral-500 tracking-wide">
                AGENCE DE DESIGN WEB
              </p>
              <h1 
                ref={titleRef}
                className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight md:leading-tight lg:leading-tight opacity-0"
              >
                Créez votre<br /> <span className="text-gradient">présence digitale</span><br /> avec élégance
              </h1>
            </div>
            
            <p 
              ref={subtitleRef}
              className="text-lg md:text-xl text-neutral-600 max-w-xl opacity-0"
            >
              Nous concevons des sites web uniques qui captent l'essence de votre marque 
              et offrent une expérience utilisateur exceptionnelle.
            </p>
            
            <div 
              ref={buttonsRef} 
              className="flex flex-col sm:flex-row gap-4 opacity-0"
            >
              <Button size="lg">
                Discuter de votre projet
              </Button>
              <Button variant="secondary" size="lg">
                Voir notre portfolio
              </Button>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-2 pt-4">
              <div className="space-y-1">
                <p className="text-2xl md:text-3xl font-bold">150+</p>
                <p className="text-sm text-neutral-500">Projets livrés</p>
              </div>
              <div className="space-y-1">
                <p className="text-2xl md:text-3xl font-bold">98%</p>
                <p className="text-sm text-neutral-500">Clients satisfaits</p>
              </div>
              <div className="space-y-1">
                <p className="text-2xl md:text-3xl font-bold">10+</p>
                <p className="text-sm text-neutral-500">Ans d'expérience</p>
              </div>
            </div>
          </div>
          
          {/* Hero Image */}
          <div 
            ref={imageRef}
            className="relative opacity-0 h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden rounded-xl"
          >
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY5MTAzODk4Mg&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080')] bg-cover bg-center">
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent"></div>
            </div>
            
            {/* Floating design elements */}
            <div className="absolute bottom-12 left-6 w-40 h-40 bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-lg">
              <div className="w-full h-full border-2 border-dashed border-neutral-300 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="font-semibold">Design</div>
                  <div className="text-xs text-neutral-500">UI/UX & Branding</div>
                </div>
              </div>
            </div>
            
            <div className="absolute top-8 right-6 p-4 rounded-lg bg-white/90 backdrop-blur-sm shadow-lg">
              <div className="grid grid-cols-2 gap-2">
                <div className="h-5 w-5 bg-neutral-900 rounded-full"></div>
                <div className="h-5 w-5 bg-neutral-700 rounded-full"></div>
                <div className="h-5 w-5 bg-neutral-500 rounded-full"></div>
                <div className="h-5 w-5 bg-neutral-300 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
