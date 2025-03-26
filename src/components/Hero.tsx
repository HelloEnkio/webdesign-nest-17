
import React, { useEffect, useRef, useState } from 'react';
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
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    // Show content immediately, don't wait for video
    const title = titleRef.current;
    const subtitle = subtitleRef.current;
    const buttons = buttonsRef.current;
    const image = imageRef.current;
    const stats = statsRef.current;

    if (title) {
      title.style.opacity = '1';
      title.classList.add('fade-in');
    }
    if (subtitle) {
      subtitle.style.opacity = '1';
      subtitle.classList.add('fade-in');
      subtitle.classList.add('stagger-1');
    }
    if (buttons) {
      buttons.style.opacity = '1';
      buttons.classList.add('fade-in');
      buttons.classList.add('stagger-2');
    }
    if (image) {
      image.style.opacity = '1';
      image.classList.add('fade-in');
      image.classList.add('stagger-3');
    }
    if (stats) {
      stats.style.opacity = '1';
      stats.classList.add('fade-in');
      stats.classList.add('stagger-4');
    }

    // Setup video with proper loading strategy
    const video = videoRef.current;
    if (video) {
      // Only load video when user has had time to see the initial content
      setTimeout(() => {
        video.addEventListener('loadeddata', () => setVideoLoaded(true));
        video.preload = 'auto';
        video.src = 'https://cdn.pixabay.com/video/2022/06/21/121470-724697516_large.mp4';
        video.load();
        
        // Try to play but don't worry if it fails due to autoplay restrictions
        video.play().catch(e => console.log("Autoplay prevented:", e));
      }, 1000);
    }
  }, []);

  return (
    <section id="home" className="relative pt-24 pb-20 md:pt-28 md:pb-24 overflow-hidden">
      {/* Background with or without video */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0" aria-hidden="true">
        {/* Fallback gradient background (shows immediately) */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-blue-950 to-teal-950"></div>
        
        {/* Video loads later */}
        <HeroBackground videoRef={videoRef} videoLoaded={videoLoaded} />
      </div>

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
