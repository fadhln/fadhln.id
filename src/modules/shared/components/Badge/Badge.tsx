import { type ComponentPropsWithoutRef, forwardRef } from "react";

import cn from "-/modules/shared/utils/cn";

type BadgeProps = ComponentPropsWithoutRef<"span"> & {
  variant?: "neutral" | "success";
};

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = "neutral", ...props }, ref) => (
    <span
      ref={ref}
      className={cn(
        "inline-flex items-center rounded-xs border px-1.5 py-0.5 font-mono text-[10px] leading-none tracking-wider uppercase",
        variant === "success"
          ? "border-success/30 bg-success-subtle text-success-text"
          : "border-border bg-bg-inset text-on-bg-secondary",
        className,
      )}
      {...props}
    />
  ),
);

Badge.displayName = "Badge";

export default Badge;
