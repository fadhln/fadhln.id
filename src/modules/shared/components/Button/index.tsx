import { type ComponentProps, forwardRef } from "react";

import cn from "-/modules/shared/utils/cn";
import { Button as BaseButton } from "@base-ui/react/button";

type ButtonProps = ComponentProps<typeof BaseButton> & {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", className, type, ...props }, ref) => {
    return (
      <BaseButton
        ref={ref}
        type={type ?? "button"}
        className={cn(
          // base styles
          "inline-flex items-center justify-center rounded-xs font-medium transition-colors",
          "focus-visible:outline-ring focus-visible:outline-2 focus-visible:outline-offset-2",
          "disabled:pointer-events-none disabled:opacity-50",
          // variants
          variant === "primary" &&
            "bg-primary-active text-on-bg-inverse hover:bg-primary-active/90",
          variant === "secondary" && "border-border bg-bg text-on-bg hover:bg-bg/80",
          variant === "ghost" && "text-on-bg hover:bg-bg/50 bg-transparent",
          // sizes
          size === "sm" && "h-6 px-3 text-sm",
          size === "md" && "h-8 px-4 text-sm",
          size === "lg" && "h-10 px-6 text-base",
          className,
        )}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";

export default Button;
