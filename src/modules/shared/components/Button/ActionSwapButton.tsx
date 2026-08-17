"use client";

import type { PropsWithChildren, ReactNode } from "react";

import { AnimatePresence, type HTMLMotionProps, motion, useReducedMotion } from "motion/react";

import { EASE_OUT, SPRING_SWAP } from "../../constants/ease";
import cn from "../../utils/cn";
import Button, { type ButtonProps } from "./Button";

const ROLL_TRANSITION = SPRING_SWAP;
const ROLL_BLUR = "blur(3px)";
const ROLL_EXIT_TRANSITION = { duration: 0.14, ease: EASE_OUT } as const;

export type ActionSwapItem<T = string> = {
  id: T;
  label: ReactNode;
  icon?: ReactNode;
  ariaLabel?: string;
};

type ActionSwapIconProps = {
  value: string;
  className?: string;
};

type ActionSwapTextProps = {
  value: string;
  className?: string;
};

type ActionSwapButtonProps = Omit<
  HTMLMotionProps<"button"> & ButtonProps,
  "children" | "onChange"
> & {
  items: ActionSwapItem[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string, item: ActionSwapItem) => void;
};

function ActionSwapIcon({ value, children, className }: PropsWithChildren<ActionSwapIconProps>) {
  const reduce = useReducedMotion();

  return (
    <span
      className={cn("relative inline-grid shrink-0 place-items-center overflow-hidden", className)}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={`roll-${value}`}
          aria-hidden
          initial={reduce ? false : "initial"}
          animate={reduce ? { opacity: 1, filter: "blur(0px)", scale: 1, y: 0 } : "animate"}
          exit={reduce ? undefined : "exit"}
          className="col-start-1 row-start-1 inline-flex items-center justify-center will-change-[opacity,filter,transform]"
          variants={{
            initial: { opacity: 0, y: 12, filter: ROLL_BLUR },
            animate: {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              transition: ROLL_TRANSITION,
            },
            exit: {
              opacity: 0,
              y: -12,
              filter: ROLL_BLUR,
              transition: ROLL_EXIT_TRANSITION,
            },
          }}
        >
          {children}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

function ActionSwapText({ value, children, className }: PropsWithChildren<ActionSwapTextProps>) {
  const reduce = useReducedMotion();

  return (
    <span
      className={cn(
        "relative my-[-0.08em] inline-block max-w-full py-[0.08em] align-bottom whitespace-nowrap",
        className,
      )}
      style={{
        clipPath: "inset(0 -999px)",
        WebkitClipPath: "inset(0 -999px)",
      }}
    >
      <span aria-hidden className="invisible inline-block whitespace-nowrap">
        {children}
      </span>
      <AnimatePresence initial={false}>
        <motion.span
          key={`roll-${value}`}
          variants={{
            initial: { opacity: 0, y: "90%", filter: ROLL_BLUR },
            animate: {
              opacity: 1,
              y: "0%",
              filter: "blur(0px)",
              transition: ROLL_TRANSITION,
            },
            exit: {
              opacity: 0,
              y: "-90%",
              filter: ROLL_BLUR,
              transition: ROLL_EXIT_TRANSITION,
            },
          }}
          initial={reduce ? false : "initial"}
          animate={reduce ? { opacity: 1, filter: "blur(0px)", scale: 1, y: 0 } : "animate"}
          exit={reduce ? undefined : "exit"}
          className="absolute top-[0.08em] left-0 inline-block max-w-full truncate will-change-[opacity,filter,transform]"
        >
          {children}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

function ActionSwapButton({
  items,
  value,
  defaultValue,
  onValueChange,
  variant = "primary",
  size = "md",
  className,
  ...rest
}: ActionSwapButtonProps) {
  const currentValue = value;
  const activeIndex = Math.max(
    0,
    items.findIndex((item) => item.id === currentValue),
  );
  const activeItem = items[activeIndex] ?? items[0];
  const hasIcon = items.some((item) => item.icon);

  if (!activeItem) return null;

  return (
    <Button
      variant={variant}
      size={size}
      icon={
        hasIcon ? (
          <ActionSwapIcon value={activeItem.id}>{activeItem.icon ?? null}</ActionSwapIcon>
        ) : null
      }
      {...rest}
    >
      <ActionSwapText value={activeItem.id}>{activeItem.label}</ActionSwapText>
    </Button>
  );
}

export default ActionSwapButton;
