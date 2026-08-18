"use client";

import {
  type CSSProperties,
  type HTMLAttributes,
  createContext,
  useCallback,
  useContext,
  useId,
} from "react";

import useControlledState from "-/modules/shared/hooks/useControlledState";
import cn from "-/modules/shared/utils/cn";
import { useReducedMotion } from "motion/react";

type SideBarContextValue = {
  collapsed: boolean;
  layoutId: string;
  reduce: boolean;
  open: boolean;
  setOpen: (open: boolean) => void;
  toggle: () => void;
};

type SideBarProviderStyle = CSSProperties & {
  "--sidebar-width"?: string;
  "--sidebar-width-icon"?: string;
};

type SideBarProviderProps = HTMLAttributes<HTMLDivElement> & {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  style?: SideBarProviderStyle;
};

const SideBarContext = createContext<SideBarContextValue | null>(null);

export function useSideBarContext() {
  const context = useContext(SideBarContext);
  if (!context) {
    throw new Error("useSideBarContext must be used within a SideBarProvider");
  }
  return context;
}

export default function SideBarProvider({
  children,
  open,
  defaultOpen = true,
  onOpenChange,
  className,
  style,
  ...rest
}: SideBarProviderProps) {
  const [isOpen, setOpen] = useControlledState(open, defaultOpen, onOpenChange);
  const reduce = useReducedMotion() ?? false;
  const generatedId = useId();

  const toggle = useCallback(() => setOpen(!isOpen), [isOpen, setOpen]);

  return (
    <SideBarContext.Provider
      value={{
        collapsed: !isOpen,
        layoutId: `${generatedId}-active`,
        reduce,
        open: isOpen,
        setOpen,
        toggle,
      }}
    >
      <div
        {...rest}
        data-state={isOpen ? "expanded" : "collapsed"}
        style={{
          // Set Default CSS variables for sidebar width and icon width
          "--sidebar-width": "16rem",
          "--sidebar-width-icon": "0px",
          ...style,
        }}
        className={cn("flex min-h-svh min-w-0", className)}
      >
        {children}
      </div>
    </SideBarContext.Provider>
  );
}
