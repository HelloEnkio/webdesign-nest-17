
import React from 'react';

interface PaginationProps {
  slides: any[];
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  slides,
  currentIndex,
  setCurrentIndex,
}) => {
  return (
    <div className="absolute flex justify-center w-full bottom-[-30px] gap-2">
      {slides.map((_, index) => (
        <button
          key={index}
          onClick={() => setCurrentIndex(index)}
          className={`w-3 h-3 rounded-full transition-all duration-300 ${
            currentIndex === index 
              ? 'bg-indigo-600 scale-125' 
              : 'bg-gray-300 hover:bg-gray-400'
          }`}
          aria-label={`Go to slide ${index + 1}`}
        />
      ))}
    </div>
  );
};

export default Pagination;
