
"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PortfolioCarouselProps } from './types';

export const ModernCarousel: React.FC<PortfolioCarouselProps> = ({
  slides,
  currentIndex,
  setCurrentIndex
}) => {
  const [direction, setDirection] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const handleNext = () => {
    if (isAnimating) return;
    setDirection(1);
    const nextIndex = (currentIndex + 1) % slides.length;
    setCurrentIndex(nextIndex);
  };

  const handlePrevious = () => {
    if (isAnimating) return;
    setDirection(-1);
    const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
    setCurrentIndex(prevIndex);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating) {
        setDirection(1);
        const nextIndex = (currentIndex + 1) % slides.length;
        setCurrentIndex(nextIndex);
      }
    }, 10000); // Auto advance every 10 seconds

    return () => clearInterval(interval);
  }, [currentIndex, setCurrentIndex, slides.length, isAnimating]);

  const variants = {
    enter: (direction: number) => {
      return {
        x: direction > 0 ? 1000 : -1000,
        opacity: 0,
        scale: 0.95,
      };
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => {
      return {
        zIndex: 0,
        x: direction < 0 ? 1000 : -1000,
        opacity: 0,
        scale: 0.95,
      };
    }
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { delay: 0.5, duration: 0.5 } }
  };

  return (
    <div className="relative rounded-2xl overflow-hidden mx-auto max-w-4xl shadow-xl bg-gradient-to-br from-white/10 to-white/30 backdrop-blur-sm border border-white/20 transform transition-all duration-500 hover:shadow-indigo-200/20">
      {/* Main Content */}
      <div className="relative w-full aspect-[16/9] overflow-hidden">
        <AnimatePresence initial={false} custom={direction} onExitComplete={() => setIsAnimating(false)}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.4 },
              scale: { duration: 0.4 }
            }}
            className="absolute w-full h-full"
            onAnimationStart={() => setIsAnimating(true)}
          >
            <div className="relative h-full w-full">
              {/* Background Image */}
              <img
                src={slides[currentIndex].src}
                alt={slides[currentIndex].title}
                className="w-full h-full object-cover object-center"
              />
              
              {/* Overlay with text content */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-8 text-white"
                variants={overlayVariants}
                initial="hidden"
                animate="visible"
              >
                <div className="max-w-xl">
                  <span className="inline-block px-3 py-1 text-xs font-semibold bg-indigo-600/90 rounded-full mb-2">
                    {slides[currentIndex].category}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-bold mb-2">{slides[currentIndex].title}</h3>
                  <p className="text-sm md:text-base text-white/80">{slides[currentIndex].description}</p>
                </div>
              </motion.div>

              {/* Optional Landing Page Content */}
              {slides[currentIndex].landingPageContent && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="absolute inset-0 bg-white overflow-auto"
                >
                  {slides[currentIndex].landingPageContent}
                </motion.div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation arrows */}
        <button
          className="absolute top-1/2 left-4 -translate-y-1/2 z-10 h-10 w-10 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/30 transition-all duration-200"
          onClick={handlePrevious}
          aria-label="Previous slide"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          className="absolute top-1/2 right-4 -translate-y-1/2 z-10 h-10 w-10 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/30 transition-all duration-200"
          onClick={handleNext}
          aria-label="Next slide"
        >
          <ChevronRight size={20} />
        </button>
      </div>
      
      {/* Indicators */}
      <div className="flex justify-center gap-2 p-4">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (isAnimating) return;
              setDirection(index > currentIndex ? 1 : -1);
              setCurrentIndex(index);
            }}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              currentIndex === index 
                ? 'bg-indigo-600 w-6' 
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ModernCarousel;
