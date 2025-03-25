
import { useCallback, useEffect, useState } from "react";

interface UseTextRotateProps {
  texts: string[];
  rotationInterval?: number;
  loop?: boolean;
  auto?: boolean;
  onNext?: (index: number) => void;
}

export function useTextRotate({
  texts,
  rotationInterval = 4000,
  loop = true,
  auto = true,
  onNext,
}: UseTextRotateProps) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Helper function to handle index changes and trigger callback
  const handleIndexChange = useCallback((newIndex: number) => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setCurrentTextIndex(newIndex);
    onNext?.(newIndex);
    
    // Reset the animation state after transition completes
    setTimeout(() => {
      setIsAnimating(false);
    }, 400); // Match this with your animation duration
  }, [onNext, isAnimating]);

  const next = useCallback(() => {
    if (isAnimating) return;
    
    const nextIndex = currentTextIndex === texts.length - 1
      ? (loop ? 0 : currentTextIndex)
      : currentTextIndex + 1;
    
    if (nextIndex !== currentTextIndex) {
      handleIndexChange(nextIndex);
    }
  }, [currentTextIndex, texts.length, loop, handleIndexChange, isAnimating]);

  const previous = useCallback(() => {
    if (isAnimating) return;
    
    const prevIndex = currentTextIndex === 0
      ? (loop ? texts.length - 1 : currentTextIndex)
      : currentTextIndex - 1;
    
    if (prevIndex !== currentTextIndex) {
      handleIndexChange(prevIndex);
    }
  }, [currentTextIndex, texts.length, loop, handleIndexChange, isAnimating]);

  const jumpTo = useCallback((index: number) => {
    if (isAnimating) return;
    
    const validIndex = Math.max(0, Math.min(index, texts.length - 1));
    if (validIndex !== currentTextIndex) {
      handleIndexChange(validIndex);
    }
  }, [texts.length, currentTextIndex, handleIndexChange, isAnimating]);

  const reset = useCallback(() => {
    if (isAnimating) return;
    
    if (currentTextIndex !== 0) {
      handleIndexChange(0);
    }
  }, [currentTextIndex, handleIndexChange, isAnimating]);

  useEffect(() => {
    if (!auto) return;
    
    const intervalId = setInterval(() => {
      if (!isAnimating) {
        next();
      }
    }, rotationInterval);
    
    return () => clearInterval(intervalId);
  }, [next, rotationInterval, auto, isAnimating]);

  return {
    currentTextIndex,
    isAnimating,
    next,
    previous,
    jumpTo,
    reset
  };
}
