
"use client";

import { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";

interface TypingAnimationProps {
  texts: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseBeforeDelete?: number;
  showCursor?: boolean;
  className?: string;
}

export function TypingAnimation({
  texts,
  typingSpeed = 100,
  deletingSpeed = 60,
  pauseBeforeDelete = 2000,
  showCursor = true,
  className,
}: TypingAnimationProps) {
  const [currentText, setCurrentText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const typeText = () => {
      const currentWord = texts[currentIndex];

      if (!isDeleting) {
        if (currentText.length < currentWord.length) {
          // Still typing
          timeoutRef.current = setTimeout(() => {
            setCurrentText(currentWord.slice(0, currentText.length + 1));
          }, typingSpeed);
        } else {
          // Finished typing, wait before deleting
          timeoutRef.current = setTimeout(() => {
            setIsDeleting(true);
          }, pauseBeforeDelete);
        }
      } else {
        if (currentText.length > 0) {
          // Deleting
          timeoutRef.current = setTimeout(() => {
            setCurrentText(currentText.slice(0, currentText.length - 1));
          }, deletingSpeed);
        } else {
          // Move to next word
          setIsDeleting(false);
          setCurrentIndex((prev) => (prev + 1) % texts.length);
        }
      }
    };

    timeoutRef.current = setTimeout(typeText, 50);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [currentText, currentIndex, isDeleting, texts, typingSpeed, deletingSpeed, pauseBeforeDelete]);

  return (
    <span className={cn("inline-flex items-center", className)}>
      {currentText}
      {showCursor && (
        <span 
          className={cn(
            "inline-block w-0.5 h-9 bg-teal-300 ml-0.5",
            isDeleting ? "opacity-50" : "animate-pulse"
          )}
        />
      )}
    </span>
  );
}
