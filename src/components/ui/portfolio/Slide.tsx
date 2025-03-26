
import React, { useRef, useEffect } from 'react';
import { SlideProps } from './types';

export const Slide: React.FC<SlideProps> = ({ slide, index, current, handleSlideClick }) => {
  const slideRef = useRef<HTMLLIElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const xRef = useRef(0);
  const yRef = useRef(0);
  const animationRef = useRef<number>();
  const scrollTimerRef = useRef<NodeJS.Timeout | null>(null);
  const scrollingRef = useRef(false);

  useEffect(() => {
    const animate = () => {
      if (!slideRef.current) return;

      const x = xRef.current;
      const y = yRef.current;

      slideRef.current.style.setProperty("--x", `${x}px`);
      slideRef.current.style.setProperty("--y", `${y}px`);

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  // Auto scroll effect when this slide is current
  useEffect(() => {
    if (current === index && slide.autoScroll && frameRef.current && contentRef.current) {
      const startAutoScroll = () => {
        if (scrollingRef.current) return;
        
        scrollingRef.current = true;
        const frame = frameRef.current;
        const content = contentRef.current;
        
        if (!frame || !content) return;
        
        const contentHeight = content.scrollHeight;
        const frameHeight = frame.clientHeight;
        const scrollDistance = contentHeight - frameHeight;
        
        if (scrollDistance <= 0) return;
        
        let start = 0;
        const duration = 8000; // 8 seconds to scroll through
        
        const animateScroll = (timestamp: number) => {
          if (!start) start = timestamp;
          const elapsed = timestamp - start;
          const progress = Math.min(elapsed / duration, 1);
          
          if (frame) {
            frame.scrollTop = progress * scrollDistance;
          }
          
          if (progress < 1) {
            requestAnimationFrame(animateScroll);
          } else {
            // Reset after reaching bottom
            setTimeout(() => {
              if (frame) {
                frame.scrollTo({ top: 0, behavior: 'smooth' });
                setTimeout(() => {
                  scrollingRef.current = false;
                  // Start again after a delay
                  scrollTimerRef.current = setTimeout(startAutoScroll, 3000);
                }, 1000);
              }
            }, 2000);
          }
        };
        
        requestAnimationFrame(animateScroll);
      };
      
      // Start auto-scrolling after a delay
      scrollTimerRef.current = setTimeout(startAutoScroll, 2000);
      
      return () => {
        if (scrollTimerRef.current) {
          clearTimeout(scrollTimerRef.current);
        }
        scrollingRef.current = false;
      };
    }
  }, [current, index, slide.autoScroll]);

  const handleMouseMove = (event: React.MouseEvent) => {
    const el = slideRef.current;
    if (!el) return;

    const r = el.getBoundingClientRect();
    xRef.current = event.clientX - (r.left + Math.floor(r.width / 2));
    yRef.current = event.clientY - (r.top + Math.floor(r.height / 2));
  };

  const handleMouseLeave = () => {
    xRef.current = 0;
    yRef.current = 0;
  };

  const imageLoaded = (event: React.SyntheticEvent<HTMLImageElement>) => {
    event.currentTarget.style.opacity = "1";
  };

  const { src, title, category, description, landingPageContent } = slide;

  return (
    <div className="[perspective:1200px] [transform-style:preserve-3d]">
      <li
        ref={slideRef}
        className="flex flex-1 flex-col items-center justify-center relative text-center text-white opacity-100 transition-all duration-300 ease-in-out w-[70vmin] h-[70vmin] mx-[4vmin] z-10"
        onClick={() => handleSlideClick(index)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform:
            current !== index
              ? "scale(0.98) rotateX(8deg)"
              : "scale(1) rotateX(0deg)",
          transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
          transformOrigin: "bottom",
        }}
      >
        <div
          className="absolute top-0 left-0 w-full h-full bg-[#1D1F2F] rounded-[1%] overflow-hidden transition-all duration-150 ease-out"
          style={{
            transform:
              current === index
                ? "translate3d(calc(var(--x) / 30), calc(var(--y) / 30), 0)"
                : "none",
          }}
        >
          {/* Website content frame */}
          <div 
            ref={frameRef}
            className="absolute inset-0 flex flex-col rounded-[1%] overflow-auto hide-scrollbar"
          >
            {landingPageContent ? (
              <div ref={contentRef} className="w-full h-full">
                {landingPageContent}
              </div>
            ) : (
              <img
                className="flex-1 w-full h-full object-cover opacity-100 transition-opacity duration-600 ease-in-out"
                style={{
                  opacity: current === index ? 1 : 0.5,
                }}
                alt={title}
                src={src}
                onLoad={imageLoaded}
                loading="eager"
                decoding="sync"
              />
            )}
          </div>
          
          {current === index && (
            <div className="absolute inset-0 bg-black/30 transition-all duration-1000" />
          )}
        </div>

        <article
          className={`relative p-[4vmin] transition-opacity duration-1000 ease-in-out ${
            current === index ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        >
          <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-black">
            {category}
          </div>
          
          <h2 className="text-lg md:text-2xl lg:text-4xl font-semibold relative">
            {title}
          </h2>
          
          {description && (
            <p className="text-white/90 mt-2 text-sm md:text-base max-w-md mx-auto">
              {description}
            </p>
          )}
        </article>
      </li>
    </div>
  );
};

export default Slide;
