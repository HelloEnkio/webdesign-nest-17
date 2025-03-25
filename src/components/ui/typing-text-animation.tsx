
"use client"

import { TextRotateCharacter } from "./text-rotate-character";
import { TypingCursor } from "./typing-cursor";

interface TypingTextAnimationProps {
  elements: string[];
  showCursor: boolean;
  isDeleting: boolean;
  elementLevelClassName?: string;
}

export function TypingTextAnimation({
  elements,
  showCursor,
  isDeleting,
  elementLevelClassName,
}: TypingTextAnimationProps) {
  return (
    <div className="flex items-center">
      {elements.map((char, index) => (
        <TextRotateCharacter
          key={index}
          char={char}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.1 }}
          className={elementLevelClassName}
        />
      ))}
      {showCursor && <TypingCursor isDeleting={isDeleting} />}
    </div>
  );
}
