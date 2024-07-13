"use client";

import { useMemo } from "react";
import { motion, Variants } from "framer-motion";

type FadeTextProps = {
  className?: string;
  direction?: "up" | "down" | "left" | "right";
  framerProps?: Variants;
  text: string;
};

export function FadeText({
  direction = "up",
  className,
  framerProps = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { type: "spring" } },
  },
  text,
}: FadeTextProps) {
  const fadeInOffset = 10; // Distance to move in the fade-in direction
  const fadeOutOffset = -10; // Distance to move in the fade-out direction

  const axis = direction === "up" || direction === "down" ? "y" : "x";

  const FADE_ANIMATION_VARIANTS = useMemo(() => {
    const { hidden, show, ...rest } = framerProps as {
      [name: string]: { [name: string]: number; opacity: number };
    };

    return {
      ...rest,
      hidden: {
        ...(hidden ?? {}),
        opacity: hidden?.opacity ?? 0,
        [axis]: fadeOutOffset, // Set to fadeOutOffset for hidden state
      },
      show: {
        ...(show ?? {}),
        opacity: show?.opacity ?? 1,
        [axis]: 0, // Set to 0 for show state
      },
      exit: {
        ...(hidden ?? {}),
        opacity: hidden?.opacity ?? 0,
        [axis]: fadeInOffset, // Set to fadeInOffset for exit state
      },
    };
  }, [axis, fadeInOffset, fadeOutOffset, framerProps]);

  return (
    <motion.div
      initial="hidden"
      animate="show"
      exit="exit" // Add exit state for motion.div
      viewport={{ once: true }}
      variants={FADE_ANIMATION_VARIANTS}
    >
      <motion.span className={className}>{text}</motion.span>
    </motion.div>
  );
}
