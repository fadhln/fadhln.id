"use client";

import { type ComponentProps, forwardRef } from "react";

import cn from "-/modules/shared/utils/cn";
import { Popover as BasePopover } from "@base-ui/react/popover";

export const PopoverRoot = BasePopover.Root;
export const PopoverTrigger = BasePopover.Trigger;
export const PopoverPortal = BasePopover.Portal;
export const PopoverClose = BasePopover.Close;
export const PopoverTitle = BasePopover.Title;
export const PopoverDescription = BasePopover.Description;

export type PopoverPositionerProps = ComponentProps<typeof BasePopover.Positioner>;

export const PopoverPositioner = forwardRef<HTMLDivElement, PopoverPositionerProps>(
  ({ className, sideOffset = 8, ...props }, ref) => {
    return (
      <BasePopover.Positioner
        ref={ref}
        sideOffset={sideOffset}
        className={cn("z-50 outline-none", className)}
        {...props}
      />
    );
  },
);

export type PopoverPopupProps = ComponentProps<typeof BasePopover.Popup>;

export const PopoverPopup = forwardRef<HTMLDivElement, PopoverPopupProps>(
  ({ className, ...props }, ref) => {
    return (
      <BasePopover.Popup
        ref={ref}
        className={cn(
          "bg-bg-elevated border-border text-on-bg w-72 max-w-[calc(100vw-2rem)] rounded-xs border p-3.5",
          "origin-[var(--transform-origin)] transition-[opacity,transform] duration-150 ease-out",
          "data-[starting-style]:scale-95 data-[starting-style]:opacity-0",
          "data-[ending-style]:scale-95 data-[ending-style]:opacity-0",
          className,
        )}
        {...props}
      />
    );
  },
);

export type PopoverArrowProps = ComponentProps<typeof BasePopover.Arrow>;

export const PopoverArrow = forwardRef<HTMLDivElement, PopoverArrowProps>(
  ({ className, ...props }, ref) => {
    return (
      <BasePopover.Arrow
        ref={ref}
        className={cn(
          "data-[side=bottom]:top-[-8px] data-[side=left]:right-[-13px] data-[side=right]:left-[-13px] data-[side=top]:bottom-[-8px]",
          className,
        )}
        {...props}
      >
        <svg
          aria-hidden="true"
          width="20"
          height="10"
          viewBox="0 0 20 10"
          className="fill-bg-elevated stroke-border block"
        >
          <path d="M 0 10 L 10 0 L 20 10" />
        </svg>
      </BasePopover.Arrow>
    );
  },
);

export const Popover = Object.assign(PopoverRoot, {
  Root: PopoverRoot,
  Trigger: PopoverTrigger,
  Portal: PopoverPortal,
  Positioner: PopoverPositioner,
  Popup: PopoverPopup,
  Arrow: PopoverArrow,
  Title: PopoverTitle,
  Description: PopoverDescription,
  Close: PopoverClose,
});

export default Popover;
