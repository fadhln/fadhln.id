import { type ComponentPropsWithoutRef, forwardRef } from "react";

import cn from "-/modules/shared/utils/cn";

const Badge = forwardRef<HTMLSpanElement, ComponentPropsWithoutRef<"span">>(
  ({ className, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(
        "bg-bg-inset text-on-bg-secondary border-border inline-flex items-center rounded-xs border px-1.5 py-0.5 font-mono text-[10px] leading-none tracking-wider uppercase",
        className,
      )}
      {...props}
    />
  ),
);

Badge.displayName = "Badge";

export default Badge;
