import { cloneElement, forwardRef, isValidElement } from "react";
import type { ElementType, ReactNode } from "react";

import cn from "-/modules/shared/utils/cn";

const TEXT_VARIANTS = {
  title: "text-4xl font-semibold",
  label: "text-xxs font-mono tracking-wider uppercase text-on-bg-secondary",
  body: "leading-relaxed tracking-tight",
  link: "underline underline-offset-1 hover:text-on-bg transition-colors",
} as const;

type TextVariant = keyof typeof TEXT_VARIANTS;

type TextProps = {
  variant?: TextVariant;
  render?: ReactNode | ElementType;
  className?: string;
  children?: ReactNode;
} & Record<string, unknown>;

const DEFAULT_ELEMENT: Record<TextVariant, ElementType> = {
  title: "h1",
  label: "p",
  body: "p",
  link: "a",
};

function TextInner(
  { variant = "body", render, className, children, ...props }: TextProps,
  ref: React.Ref<Element>,
) {
  const mergedClassName = cn(TEXT_VARIANTS[variant], className);

  if (render && isValidElement(render)) {
    const element = render as React.ReactElement<Record<string, unknown>>;
    return cloneElement(element, {
      className: cn(element.props.className as string, mergedClassName),
      ref,
      ...props,
      children,
    });
  }

  const Component =
    (typeof render === "function" ? render : DEFAULT_ELEMENT[variant]) ?? DEFAULT_ELEMENT[variant];

  return (
    <Component ref={ref} className={mergedClassName} {...props}>
      {children}
    </Component>
  );
}

export default forwardRef(TextInner);
export type { TextProps, TextVariant };
