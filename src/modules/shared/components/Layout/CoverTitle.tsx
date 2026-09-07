"use client";

import { EASE_OUT } from "-/modules/shared/constants/ease";
import { motion, useReducedMotion } from "motion/react";

type CoverTitleProps = {
  children: string;
  animate?: boolean;
  staggerDelay?: number;
};

function CoverTitle({ children, animate = false, staggerDelay = 0.04 }: CoverTitleProps) {
  const reducedMotion = useReducedMotion() ?? false;

  if (!animate) {
    return <h1 className="font-semibold">{children}</h1>;
  }

  const characters = Array.from(children).reduce<{ character: string; key: string }[]>(
    (items, character) => {
      const occurrence = items.filter((item) => item.character === character).length;
      items.push({ character, key: `${character}-${occurrence}` });
      return items;
    },
    [],
  );

  return (
    <motion.h1
      aria-label={children}
      className="font-semibold"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: reducedMotion ? 0 : staggerDelay } },
      }}
    >
      {characters.map(({ character, key }) => (
        <motion.span
          key={key}
          aria-hidden="true"
          className="inline-block origin-left"
          variants={{
            hidden: {
              opacity: 0,
              x: reducedMotion ? 0 : -16,
              scaleX: reducedMotion ? 1 : 0.94,
            },
            visible: {
              opacity: 1,
              x: 0,
              scaleX: 1,
              transition: { duration: reducedMotion ? 0.01 : 0.45, ease: EASE_OUT },
            },
          }}
        >
          {character === " " ? "\u00a0" : character}
        </motion.span>
      ))}
    </motion.h1>
  );
}

export default CoverTitle;
