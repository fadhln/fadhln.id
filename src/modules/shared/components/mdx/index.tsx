import type { ComponentPropsWithoutRef } from "react";

import type { MDXComponents } from "next-mdx-remote-client";

import cn from "../../utils/cn";
import { callout } from "../Callout";
import CustomAnchor from "./CustomAnchor";

export const components: MDXComponents = {
  // Custom Components
  a: CustomAnchor,
  callout,

  // Custom Styling Only
  code: ({ className, ...props }: ComponentPropsWithoutRef<"code">) => (
    <code
      className={cn(className, "font-mono font-semibold before:content-['`'] after:content-['`']")}
      {...props}
    />
  ),
  h3: ({ className, ...props }: ComponentPropsWithoutRef<"h3">) => (
    <h3 className={cn(className, "text-on-bg pt-2 text-xl font-semibold")} {...props} />
  ),
  li: ({ className, ...props }: ComponentPropsWithoutRef<"li">) => (
    <li className={cn(className, "ml-4 list-disc")} {...props} />
  ),
  p: ({ className, ...props }: ComponentPropsWithoutRef<"p">) => (
    <p className={cn(className, "pt-2 leading-normal")} {...props} />
  ),
};
