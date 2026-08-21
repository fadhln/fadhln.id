import { type ComponentProps, type ReactNode, forwardRef } from "react";

import cn from "-/modules/shared/utils/cn";
import { Button as BaseButton } from "@base-ui/react/button";

const BTN_VARIANTS = {
  variant: {
    primary: "bg-primary text-on-primary hover:bg-primary-hover",
    secondary: "border-border border bg-bg-secondary text-on-bg hover:bg-bg-elevated",
    ghost: "text-on-bg hover:bg-bg/50 bg-transparent",
  },
  size: {
    sm: "h-7 px-3 text-xs",
    md: "h-8 px-4 text-sm",
    lg: "h-10 px-6 text-base",
  },
} as const;

export type ButtonProps = ComponentProps<typeof BaseButton> & {
  variant?: keyof typeof BTN_VARIANTS.variant;
  size?: keyof typeof BTN_VARIANTS.size;
  icon?: ReactNode;
  iconPosition?: "start" | "end";
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      icon,
      iconPosition = "start",
      className,
      type,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <BaseButton
        ref={ref}
        type={type ?? "button"}
        className={cn(
          "inline-flex cursor-pointer items-center justify-center gap-2 rounded-xs font-medium transition-colors",
          "disabled:pointer-events-none disabled:opacity-50",
          BTN_VARIANTS.variant[variant],
          BTN_VARIANTS.size[size],
          className,
        )}
        {...props}
      >
        {icon && iconPosition === "start" && (
          <span className="-ml-1 flex shrink-0 items-center">{icon}</span>
        )}
        {children}
        {icon && iconPosition === "end" && (
          <span className="-mr-1 flex shrink-0 items-center">{icon}</span>
        )}
      </BaseButton>
    );
  },
);

export default Button;
