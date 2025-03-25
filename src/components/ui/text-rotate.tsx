
"use client"

import {
  forwardRef,
  useImperativeHandle,
  useMemo
} from "react"
import { motion } from "framer-motion"

import { cn } from "@/lib/utils"
import { useTextRotate } from "@/hooks/use-text-rotate"
import { useTypingEffect } from "@/hooks/use-typing-effect"
import { StandardTextAnimation } from "./standard-text-animation"
import { TypingTextAnimation } from "./typing-text-animation"

interface TextRotateProps {
  texts: string[]
  rotationInterval?: number
  initial?: any
  animate?: any
  exit?: any
  animatePresenceMode?: "sync" | "popLayout" | "wait" | undefined
  animatePresenceInitial?: boolean
  staggerDuration?: number
  staggerFrom?: "first" | "last" | "center" | number | "random"
  transition?: any
  loop?: boolean 
  auto?: boolean 
  splitBy?: "words" | "characters" | "lines" | string
  onNext?: (index: number) => void
  mainClassName?: string
  splitLevelClassName?: string
  elementLevelClassName?: string
  typingMode?: boolean
  typingSpeed?: number
  deletingSpeed?: number
  pauseBeforeDelete?: number
  showCursor?: boolean
}

export interface TextRotateRef {
  next: () => void
  previous: () => void
  jumpTo: (index: number) => void
  reset: () => void
  setRotationSpeed: (speed: number) => void
}

const TextRotate = forwardRef<TextRotateRef, TextRotateProps>(
  (
    {
      texts,
      transition = { type: "spring", damping: 30, stiffness: 400, duration: 0.4 },
      initial = { y: "80%", opacity: 0 },
      animate = { y: 0, opacity: 1 },
      exit = { y: "-80%", opacity: 0 },
      animatePresenceMode = "sync",
      animatePresenceInitial = false,
      rotationInterval = 4000,
      staggerDuration = 0.02,
      staggerFrom = "first",
      loop = true,
      auto = true,
      splitBy = "characters",
      onNext,
      mainClassName,
      splitLevelClassName,
      elementLevelClassName,
      typingMode = false,
      typingSpeed = 50,
      deletingSpeed = 30,
      pauseBeforeDelete = 1500,
      showCursor = true,
      ...props
    },
    ref
  ) => {
    const { 
      currentTextIndex, 
      next, 
      previous, 
      jumpTo, 
      reset,
      setRotationSpeed 
    } = useTextRotate({
      texts,
      rotationInterval: !typingMode ? rotationInterval : 100000, // Very long interval when in typing mode
      loop,
      auto: !typingMode && auto, // Disable auto when in typing mode
      onNext
    });

    // Expose navigation functions via ref
    useImperativeHandle(ref, () => ({
      next,
      previous,
      jumpTo,
      reset,
      setRotationSpeed
    }), [next, previous, jumpTo, reset, setRotationSpeed]);

    // Handle typing effect if enabled
    const { displayText, isDeleting } = useTypingEffect({
      enabled: typingMode,
      currentWord: texts[currentTextIndex],
      typingSpeed,
      deletingSpeed,
      pauseBeforeDelete,
      onComplete: next
    });

    // Prepare the text elements for rendering
    const elements = useMemo(() => {
      if (typingMode) {
        return Array.from(displayText || "");
      } else {
        const currentText = texts[currentTextIndex];
        
        if (splitBy === "characters") {
          return Array.from(currentText);
        } else if (splitBy === "words") {
          return currentText.split(" ");
        } else if (splitBy === "lines") {
          return currentText.split("\n");
        } else {
          return currentText.split(splitBy);
        }
      }
    }, [texts, currentTextIndex, splitBy, typingMode, displayText]);

    return (
      <div className="flex flex-col">
        <motion.span
          className={cn("flex flex-wrap whitespace-pre-wrap", mainClassName)}
          {...props}
          layout
          transition={transition}
        >
          <span className="sr-only">{typingMode ? displayText : texts[currentTextIndex]}</span>

          {!typingMode ? (
            <StandardTextAnimation 
              elements={elements}
              currentTextIndex={currentTextIndex}
              initial={initial}
              animate={animate}
              exit={exit}
              transition={transition}
              animatePresenceMode={animatePresenceMode}
              animatePresenceInitial={animatePresenceInitial}
              staggerFrom={staggerFrom}
              staggerDuration={staggerDuration}
              splitBy={splitBy}
              elementLevelClassName={elementLevelClassName}
            />
          ) : (
            <TypingTextAnimation
              elements={elements}
              showCursor={showCursor}
              isDeleting={isDeleting}
              elementLevelClassName={elementLevelClassName}
            />
          )}
        </motion.span>
      </div>
    );
  }
);

TextRotate.displayName = "TextRotate";

export { TextRotate };
