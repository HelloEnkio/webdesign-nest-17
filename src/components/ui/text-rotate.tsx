
"use client"

import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState
} from "react"
import {
  AnimatePresence,
  AnimatePresenceProps,
  motion,
  Transition,
} from "framer-motion"

import { cn } from "@/lib/utils"
import { useTextRotate } from "@/hooks/use-text-rotate"
import { getStaggerDelay } from "@/utils/text-utils"
import { TextRotateCharacter } from "./text-rotate-character"

interface TextRotateProps {
  texts: string[]
  rotationInterval?: number
  initial?: any
  animate?: any
  exit?: any
  animatePresenceMode?: AnimatePresenceProps["mode"]
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
    const [displayText, setDisplayText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);
    const [isDone, setIsDone] = useState(false);
    const [pauseTyping, setPauseTyping] = useState(false);
    
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

    // Reset the animation when the current word changes
    useEffect(() => {
      if (typingMode) {
        setDisplayText("");
        setIsDeleting(false);
        setIsDone(false);
        setPauseTyping(false);
      }
    }, [currentTextIndex, typingMode]);

    // Handle typing effect
    useEffect(() => {
      if (!typingMode) return;
      
      const currentWord = texts[currentTextIndex];
      
      const typeNextChar = () => {
        if (isDeleting) {
          // Deleting mode
          if (displayText.length > 0) {
            setDisplayText(prev => prev.slice(0, -1));
          } else {
            setIsDeleting(false);
            next(); // Move to the next word when deletion is complete
          }
        } else if (pauseTyping) {
          // We're pausing before deletion
          setTimeout(() => {
            setPauseTyping(false);
            setIsDeleting(true);
          }, pauseBeforeDelete);
        } else {
          // Typing mode
          if (displayText.length < currentWord.length) {
            setDisplayText(prev => currentWord.slice(0, prev.length + 1));
          } else if (displayText.length === currentWord.length) {
            setPauseTyping(true);
          }
        }
      };
      
      // Set up typing/deleting animation interval
      const intervalSpeed = isDeleting ? deletingSpeed : 
                           pauseTyping ? pauseBeforeDelete : typingSpeed;
      
      const typingInterval = setTimeout(typeNextChar, intervalSpeed);
      
      return () => clearTimeout(typingInterval);
    }, [
      typingMode, 
      displayText, 
      currentTextIndex, 
      isDeleting, 
      pauseTyping,
      texts, 
      typingSpeed, 
      deletingSpeed, 
      pauseBeforeDelete, 
      next
    ]);

    // Prepare the text elements for rendering
    const elements = useMemo(() => {
      if (typingMode) {
        return Array.from(displayText);
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
            <AnimatePresence
              mode={animatePresenceMode}
              initial={animatePresenceInitial}
            >
              <motion.div
                key={currentTextIndex}
                className={cn(
                  "flex flex-wrap",
                  splitBy === "lines" && "flex-col w-full"
                )}
                layout
                aria-hidden="true"
              >
                {elements.map((char, index, array) => (
                  <TextRotateCharacter
                    key={index}
                    char={char}
                    initial={initial}
                    animate={animate}
                    exit={exit}
                    transition={{
                      ...transition,
                      delay: getStaggerDelay(
                        index,
                        array.length,
                        staggerFrom,
                        staggerDuration
                      ),
                    }}
                    className={elementLevelClassName}
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          ) : (
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
              {showCursor && (
                <motion.span
                  className={cn("inline-block w-0.5 h-6 bg-teal-300 ml-0.5", {
                    "animate-pulse": !isDeleting
                  })}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                />
              )}
            </div>
          )}
        </motion.span>
      </div>
    );
  }
);

TextRotate.displayName = "TextRotate";

export { TextRotate };
