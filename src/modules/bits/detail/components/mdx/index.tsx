import type { MDXComponents } from "next-mdx-remote-client";
import dynamic from "next/dynamic";

export const bitsComponents: MDXComponents = {
  HoverTriangle: dynamic(() => import("./HoverTriangle")),
};
