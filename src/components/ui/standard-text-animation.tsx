
"use client"

import { AnimatePresence, motion } from "framer-motion";
import { TextRotateCharacter } from "./text-rotate-character";
import { cn } from "@/lib/utils";
import { getStaggerDelay } from "@/utils/text-utils";

interface StandardTextAnimationProps {
  elements: string[];
  currentTextIndex: number;
  initial: any;
  animate: any;
  exit: any;
  transition: any;
  animatePresenceMode: "sync" | "popLayout" | "wait" | undefined;
  animatePresenceInitial: boolean;
  staggerFrom: "first" | "last" | "center" | number | "random";
  staggerDuration: number;
  splitBy: "words" | "characters" | "lines" | string;
  elementLevelClassName?: string;
}

export function StandardTextAnimation({
  elements,
  currentTextIndex,
  initial,
  animate,
  exit,
  transition,
  animatePresenceMode,
  animatePresenceInitial,
  staggerFrom,
  staggerDuration,
  splitBy,
  elementLevelClassName,
}: StandardTextAnimationProps) {
  return (
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
  );
}
