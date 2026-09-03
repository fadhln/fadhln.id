import { type ComponentProps, type ReactNode, forwardRef } from "react";

import cn from "-/modules/shared/utils/cn";
import { Checkbox as BaseCheckbox } from "@base-ui/react/checkbox";
import { CheckIcon, MinusIcon } from "@radix-ui/react-icons";

const CHECKBOX_SIZES = {
  sm: { box: "size-3.5", icon: "size-2.5" },
  md: { box: "size-4", icon: "size-3" },
  lg: { box: "size-5", icon: "size-3.5" },
} as const;

export type CheckboxProps = ComponentProps<typeof BaseCheckbox.Root> & {
  /** Text rendered beside the box; clicking it toggles the checkbox. */
  label?: ReactNode;
  size?: keyof typeof CHECKBOX_SIZES;
};

const Checkbox = forwardRef<HTMLElement, CheckboxProps>(
  ({ label, size = "md", className, indeterminate, children, ...props }, ref) => {
    return (
      // biome-ignore lint/a11y/noLabelWithoutControl: Base UI renders the real <input> inside Root at runtime
      <label className="inline-flex cursor-pointer items-center gap-2 select-none">
        <BaseCheckbox.Root
          ref={ref}
          className={cn(
            "peer flex cursor-pointer items-center justify-center rounded-xs border transition-colors",
            "bg-bg border-border-strong hover:border-border-hover",
            "data-checked:bg-primary data-checked:border-primary",
            "focus-visible:outline-primary focus-visible:outline-2 focus-visible:outline-offset-2",
            "is-[data-disabled]:pointer-events-none disabled:opacity-50",
            CHECKBOX_SIZES[size].box,
            className,
          )}
          {...props}
        >
          <BaseCheckbox.Indicator className="text-on-primary flex items-center justify-center">
            {indeterminate ? (
              <MinusIcon className={CHECKBOX_SIZES[size].icon} />
            ) : (
              <CheckIcon className={CHECKBOX_SIZES[size].icon} />
            )}
          </BaseCheckbox.Indicator>
          {children}
        </BaseCheckbox.Root>
        {label && (
          <span className="text-on-bg text-sm peer-data-[disabled]:opacity-50">{label}</span>
        )}
      </label>
    );
  },
);

export default Checkbox;
