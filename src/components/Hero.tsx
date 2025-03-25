
import React, { useEffect, useRef } from 'react';
import HeroBackground from './hero/HeroBackground';
import HeroContent from './hero/HeroContent';
import HeroShowcase from './hero/HeroShowcase';

const Hero: React.FC = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Simple animation on mount
    const title = titleRef.current;
    const subtitle = subtitleRef.current;
    const buttons = buttonsRef.current;
    const image = imageRef.current;
    const stats = statsRef.current;

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
    if (stats) {
      stats.classList.add('fade-in');
      stats.classList.add('stagger-4');
    }

    // Autoplay video on load
    const video = videoRef.current;
    if (video) {
      video.play().catch(e => console.log("Autoplay prevented:", e));
    }
  }, []);

  return (
    <section id="home" className="relative pt-24 pb-20 md:pt-28 md:pb-24 overflow-hidden">
      {/* Video Background */}
      <HeroBackground videoRef={videoRef} />

      <div className="section-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Text Content - Left Side */}
          <HeroContent 
            titleRef={titleRef}
            subtitleRef={subtitleRef}
            buttonsRef={buttonsRef}
            statsRef={statsRef}
          />
          
          {/* Right Side - Website Examples */}
          <div ref={imageRef} className="lg:col-span-5 opacity-0">
            <HeroShowcase className="" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
