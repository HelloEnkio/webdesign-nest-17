
"use client"

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface TypingCursorProps {
  isDeleting?: boolean;
  className?: string;
}

export function TypingCursor({ isDeleting, className }: TypingCursorProps) {
  return (
    <motion.span
      className={cn("inline-block w-0.5 h-[1.5em] bg-teal-300 ml-0.5", {
        "animate-pulse": !isDeleting
      }, className)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
    />
  );
}
