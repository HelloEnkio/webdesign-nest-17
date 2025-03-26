
"use client"

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { CSSProperties } from "react";

interface TypingCursorProps {
  isDeleting?: boolean;
  className?: string;
  style?: CSSProperties;
}

export function TypingCursor({ isDeleting, className, style }: TypingCursorProps) {
  return (
    <motion.span
      className={cn("inline-block w-0.5 h-full bg-teal-300 ml-0.5", {
        "animate-pulse": !isDeleting
      }, className)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      style={style}
    />
  );
}
