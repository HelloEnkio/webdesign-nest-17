
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
  showSpeedControl?: boolean
  minSpeed?: number
  maxSpeed?: number
  speedControlClassName?: string
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
      showSpeedControl = false,
      minSpeed = 1000,
      maxSpeed = 8000,
      speedControlClassName,
      typingMode = false,
      typingSpeed = 50,
      deletingSpeed = 30,
      pauseBeforeDelete = 1500,
      showCursor = true,
      ...props
    },
    ref
  ) => {
    const [currentSpeed, setCurrentSpeed] = useState(rotationInterval);
    const [displayText, setDisplayText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);
    const [isDone, setIsDone] = useState(false);
    
    const { 
      currentTextIndex, 
      next, 
      previous, 
      jumpTo, 
      reset,
      setRotationSpeed 
    } = useTextRotate({
      texts,
      rotationInterval: !typingMode ? currentSpeed : 100000, // Very long interval when in typing mode
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
      setRotationSpeed: (speed: number) => {
        setCurrentSpeed(speed);
        setRotationSpeed(speed);
      }
    }), [next, previous, jumpTo, reset, setRotationSpeed]);

    // Handle typing effect
    useEffect(() => {
      if (!typingMode) return;

      const currentWord = texts[currentTextIndex];
      
      const typeText = () => {
        if (isDeleting) {
          // Deleting mode
          if (displayText.length > 0) {
            const newText = displayText.slice(0, -1);
            setDisplayText(newText);
            
            setTimeout(typeText, deletingSpeed);
          } else {
            setIsDeleting(false);
            setIsDone(true);
            setTimeout(() => {
              next();
              setIsDone(false);
            }, 100);
          }
        } else {
          // Typing mode
          if (displayText.length < currentWord.length) {
            const newText = currentWord.slice(0, displayText.length + 1);
            setDisplayText(newText);
            
            setTimeout(typeText, typingSpeed);
          } else {
            // Done typing, pause before delete
            setTimeout(() => {
              setIsDeleting(true);
              typeText();
            }, pauseBeforeDelete);
          }
        }
      };
      
      // Reset when word changes
      if (!isDeleting && !isDone && displayText.length === 0) {
        typeText();
      }
      
      // Cleanup
      return () => {};
    }, [
      typingMode, 
      displayText, 
      currentTextIndex, 
      isDeleting, 
      isDone, 
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
                  className={cn("inline-block w-0.5 h-5 bg-teal-300 ml-0.5", {
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
