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
import { getStaggerDelay, prepareTextElements } from "@/utils/text-utils"
import { TextRotateCharacter } from "./text-rotate-character"
import { Slider } from "./slider"

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
      ...props
    },
    ref
  ) => {
    const [currentSpeed, setCurrentSpeed] = useState(rotationInterval);
    
    const { 
      currentTextIndex, 
      next, 
      previous, 
      jumpTo, 
      reset,
      setRotationSpeed 
    } = useTextRotate({
      texts,
      rotationInterval: currentSpeed,
      loop,
      auto,
      onNext
    });

    // Handle speed slider changes
    const handleSpeedChange = (value: number[]) => {
      const newSpeed = value[0];
      setCurrentSpeed(newSpeed);
      setRotationSpeed(newSpeed);
    };

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

    // Prepare the text elements for rendering
    const elements = useMemo(() => {
      const currentText = texts[currentTextIndex];
      return prepareTextElements(currentText, splitBy);
    }, [texts, currentTextIndex, splitBy]);

    return (
      <div className="flex flex-col">
        <motion.span
          className={cn("flex flex-wrap whitespace-pre-wrap", mainClassName)}
          {...props}
          layout
          transition={transition}
        >
          <span className="sr-only">{texts[currentTextIndex]}</span>

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
              {elements.map((wordObj, wordIndex, array) => {
                const previousCharsCount = array
                  .slice(0, wordIndex)
                  .reduce((sum, word) => sum + word.characters.length, 0);
                
                const totalChars = array.reduce(
                  (sum, word) => sum + word.characters.length, 0
                );

                return (
                  <span
                    key={wordIndex}
                    className={cn("inline-flex", splitLevelClassName)}
                  >
                    {wordObj.characters.map((char, charIndex) => (
                      <TextRotateCharacter
                        key={charIndex}
                        char={char}
                        initial={initial}
                        animate={animate}
                        exit={exit}
                        transition={{
                          ...transition,
                          delay: getStaggerDelay(
                            previousCharsCount + charIndex,
                            totalChars,
                            staggerFrom,
                            staggerDuration
                          ),
                        }}
                        className={elementLevelClassName}
                      />
                    ))}
                    {wordObj.needsSpace && (
                      <span className="whitespace-pre"> </span>
                    )}
                  </span>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </motion.span>
        
      </div>
    );
  }
);

TextRotate.displayName = "TextRotate";

export { TextRotate };
