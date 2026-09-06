import type { ComponentPropsWithoutRef } from "react";

import type { MDXComponents } from "next-mdx-remote-client";

import cn from "../../utils/cn";
import { callout } from "../Callout";
import CustomAnchor from "./CustomAnchor";
import Pre from "./Pre";

export const components: MDXComponents = {
  // Custom Components
  a: CustomAnchor,
  callout,

  // Custom Styling Only
  code: ({ className, ...props }: ComponentPropsWithoutRef<"code">) => (
    <code
      className={cn(
        className,
        className
          ? "font-mono"
          : "bg-code-bg text-on-bg rounded-xs px-1 py-0.5 font-mono text-[0.9em]",
      )}
      {...props}
    />
  ),
  pre: Pre,
  h2: ({ className, ...props }: ComponentPropsWithoutRef<"h2">) => (
    <h2
      className={cn(className, "text-on-bg mt-10 text-2xl font-semibold tracking-tight")}
      {...props}
    />
  ),
  h3: ({ className, ...props }: ComponentPropsWithoutRef<"h3">) => (
    <h3
      className={cn(className, "text-on-bg mt-8 text-xl font-semibold tracking-tight")}
      {...props}
    />
  ),
  h4: ({ className, ...props }: ComponentPropsWithoutRef<"h4">) => (
    <h4 className={cn(className, "text-on-bg mt-6 text-lg font-semibold")} {...props} />
  ),
  li: ({ className, ...props }: ComponentPropsWithoutRef<"li">) => (
    <li className={cn(className, "pl-1")} {...props} />
  ),
  ol: ({ className, ...props }: ComponentPropsWithoutRef<"ol">) => (
    <ol className={cn(className, "my-4 list-decimal space-y-1 pl-5")} {...props} />
  ),
  p: ({ className, ...props }: ComponentPropsWithoutRef<"p">) => (
    <p className={cn(className, "pt-2 leading-normal")} {...props} />
  ),
  ul: ({ className, ...props }: ComponentPropsWithoutRef<"ul">) => (
    <ul className={cn(className, "my-4 list-disc space-y-1 pl-5")} {...props} />
  ),
  blockquote: ({ className, ...props }: ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote
      className={cn(className, "border-primary text-on-bg-secondary my-6 border-l-2 pl-4 italic")}
      {...props}
    />
  ),
  hr: ({ className, ...props }: ComponentPropsWithoutRef<"hr">) => (
    <hr className={cn(className, "border-border my-8")} {...props} />
  ),
};
