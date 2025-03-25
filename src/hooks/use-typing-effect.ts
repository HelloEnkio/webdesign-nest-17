
import { useEffect, useState, useRef } from "react";

interface UseTypingEffectProps {
  enabled: boolean;
  currentWord: string;
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseBeforeDelete?: number;
  onComplete?: () => void;
}

export function useTypingEffect({
  enabled,
  currentWord,
  typingSpeed = 50,
  deletingSpeed = 30,
  pauseBeforeDelete = 1500,
  onComplete,
}: UseTypingEffectProps) {
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPausing, setIsPausing] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();

  // Reset the animation when the current word changes
  useEffect(() => {
    if (enabled) {
      setDisplayText("");
      setIsDeleting(false);
      setIsPausing(false);
    }
  }, [currentWord, enabled]);

  // Handle typing effect
  useEffect(() => {
    if (!enabled) return;
    
    const typeNextChar = () => {
      if (isDeleting) {
        // Deleting mode
        if (displayText.length > 0) {
          setDisplayText(prev => prev.slice(0, -1));
        } else {
          setIsDeleting(false);
          onComplete?.(); // Move to the next word when deletion is complete
        }
      } else if (isPausing) {
        // We're pausing before deletion
        timeoutRef.current = setTimeout(() => {
          setIsPausing(false);
          setIsDeleting(true);
        }, pauseBeforeDelete);
      } else {
        // Typing mode
        if (displayText.length < currentWord.length) {
          setDisplayText(prev => currentWord.slice(0, prev.length + 1));
        } else if (displayText.length === currentWord.length) {
          setIsPausing(true);
        }
      }
    };
    
    // Set up typing/deleting animation interval
    const intervalSpeed = isDeleting ? deletingSpeed : 
                         isPausing ? pauseBeforeDelete : typingSpeed;
    
    timeoutRef.current = setTimeout(typeNextChar, intervalSpeed);
    
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [
    enabled, 
    displayText, 
    currentWord, 
    isDeleting, 
    isPausing,
    typingSpeed, 
    deletingSpeed, 
    pauseBeforeDelete, 
    onComplete
  ]);

  return {
    displayText,
    isDeleting,
    isPausing
  };
}
