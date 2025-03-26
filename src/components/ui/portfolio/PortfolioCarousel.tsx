
"use client";
import { useId } from "react";
import { PortfolioCarouselProps } from './types';
import Slide from './Slide';
import Pagination from './Pagination';

export function PortfolioCarousel({ 
  slides, 
  currentIndex,
  setCurrentIndex
}: PortfolioCarouselProps) {
  
  const handleSlideClick = (index: number) => {
    if (currentIndex !== index) {
      setCurrentIndex(index);
    }
  };

  const id = useId();

  return (
    <div
      className="relative w-[70vmin] h-[70vmin] mx-auto"
      aria-labelledby={`carousel-heading-${id}`}
    >
      <ul
        className="absolute flex mx-[-4vmin] transition-transform duration-1000 ease-in-out"
        style={{
          transform: `translateX(-${currentIndex * (100 / slides.length)}%)`,
        }}
      >
        {slides.map((slide, index) => (
          <Slide
            key={index}
            slide={slide}
            index={index}
            current={currentIndex}
            handleSlideClick={handleSlideClick}
          />
        ))}
      </ul>
      
      <Pagination 
        slides={slides} 
        currentIndex={currentIndex} 
        setCurrentIndex={setCurrentIndex}
      />
    </div>
  );
}

export default PortfolioCarousel;
