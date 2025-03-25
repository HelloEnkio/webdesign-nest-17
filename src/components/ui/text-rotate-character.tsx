
"use client"

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TextRotateCharacterProps {
  char: string;
  initial: any;
  animate: any;
  exit: any;
  transition: any;
  className?: string;
}

export function TextRotateCharacter({
  char,
  initial,
  animate,
  exit,
  transition,
  className
}: TextRotateCharacterProps) {
  return (
    <motion.span
      initial={initial}
      animate={animate}
      exit={exit}
      key={char}
      transition={transition}
      className={cn("inline-block", className)}
    >
      {char}
    </motion.span>
  );
}
