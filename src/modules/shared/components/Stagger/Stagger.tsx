"use client";

import { type ReactNode, forwardRef } from "react";

import { EASE_OUT } from "-/modules/shared/constants/ease";
import cn from "-/modules/shared/utils/cn";
import { type HTMLMotionProps, type Variants, motion, useReducedMotion } from "motion/react";

export type StaggerProps = HTMLMotionProps<"div"> & {
  children?: ReactNode;
  staggerDelay?: number;
  delayChildren?: number;
  inView?: boolean;
};

export type StaggerItemProps = HTMLMotionProps<"div"> & {
  children?: ReactNode;
  xOffset?: number;
  yOffset?: number;
  inView?: boolean;
};

const defaultContainerVariants = (
  staggerDelay: number,
  delayChildren: number,
  reduced: boolean,
): Variants => ({
  hidden: { opacity: reduced ? 1 : 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: reduced ? 0 : staggerDelay,
      delayChildren: reduced ? 0 : delayChildren,
    },
  },
});

const defaultItemVariants = (xOffset: number, yOffset: number, reduced: boolean): Variants => ({
  hidden: {
    opacity: 0,
    x: reduced ? 0 : xOffset,
    y: reduced ? 0 : yOffset,
  },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      duration: reduced ? 0.01 : 0.45,
      ease: EASE_OUT,
    },
  },
});

const DEFAULT_VIEWPORT = { once: true, margin: "-40px" } as const;

export const Stagger = forwardRef<HTMLDivElement, StaggerProps>(
  (
    {
      children,
      className,
      staggerDelay = 0.08,
      delayChildren = 0.04,
      variants,
      initial = "hidden",
      animate,
      whileInView,
      viewport = DEFAULT_VIEWPORT,
      inView = false,
      ...props
    },
    ref,
  ) => {
    const shouldReduceMotion = useReducedMotion() ?? false;
    const computedVariants =
      variants ?? defaultContainerVariants(staggerDelay, delayChildren, shouldReduceMotion);

    return (
      <motion.div
        ref={ref}
        className={cn(className)}
        initial={initial}
        animate={!inView ? (animate ?? "visible") : undefined}
        whileInView={inView ? (whileInView ?? "visible") : undefined}
        viewport={inView ? viewport : undefined}
        variants={computedVariants}
        {...props}
      >
        {children}
      </motion.div>
    );
  },
);

Stagger.displayName = "Stagger";

export const StaggerItem = forwardRef<HTMLDivElement, StaggerItemProps>(
  (
    {
      children,
      className,
      xOffset = -16,
      yOffset = 0,
      variants,
      initial,
      whileInView,
      viewport = DEFAULT_VIEWPORT,
      inView = false,
      ...props
    },
    ref,
  ) => {
    const shouldReduceMotion = useReducedMotion() ?? false;
    const computedVariants = variants ?? defaultItemVariants(xOffset, yOffset, shouldReduceMotion);

    return (
      <motion.div
        ref={ref}
        className={cn(className)}
        initial={inView ? (initial ?? "hidden") : undefined}
        whileInView={inView ? (whileInView ?? "visible") : undefined}
        viewport={inView ? viewport : undefined}
        variants={computedVariants}
        {...props}
      >
        {children}
      </motion.div>
    );
  },
);

StaggerItem.displayName = "StaggerItem";

export default Object.assign(Stagger, {
  Item: StaggerItem,
});
