import type { ComponentType, ReactNode } from "react";

import cn from "-/modules/shared/utils/cn";
import {
  CheckCircledIcon,
  CrossCircledIcon,
  ExclamationTriangleIcon,
  InfoCircledIcon,
} from "@radix-ui/react-icons";

type CalloutVariant = "info" | "warning" | "error" | "success" | "neutral";

type CalloutProps = {
  variant?: CalloutVariant;
  withIcon?: boolean | ComponentType<{ className?: string }>;
  title?: ReactNode;
  children: ReactNode;
  className?: string;
};

const typeStyles = {
  info: {
    container: "border-info/30 bg-info-subtle text-info-text",
    icon: <InfoCircledIcon />,
  },
  warning: {
    container: "border-warning/30 bg-warning-subtle text-warning-text",
    icon: <ExclamationTriangleIcon />,
  },
  error: {
    container: "border-error/30 bg-error-subtle text-error-text",
    icon: <CrossCircledIcon />,
  },
  success: {
    container: "border-success/30 bg-success-subtle text-success-text",
    icon: <CheckCircledIcon />,
  },
  neutral: {
    container: "border-border bg-bg-secondary text-on-bg-secondary",
    icon: <InfoCircledIcon />,
  },
} as const;

function Callout({ variant = "neutral", withIcon, title, children, className }: CalloutProps) {
  const styles = typeStyles[variant];
  const Icon = typeof withIcon === "function" ? withIcon : null;

  const icon = Icon ? <Icon className="size-5 shrink-0" /> : withIcon ? styles.icon : null;

  return (
    <div
      role="alert"
      className={cn(
        "flex gap-3 rounded-xs border px-4 py-3 text-base",
        styles.container,
        className,
      )}
    >
      {icon}
      <div className="flex flex-col gap-1">
        {title && <p className="leading-none font-semibold">{title}</p>}
        <div>{children}</div>
      </div>
    </div>
  );
}

export default Callout;
