import type { MDXComponents } from "next-mdx-remote-client";
import dynamic from "next/dynamic";

export const bitsComponents: MDXComponents = {
  GroupHover: dynamic(() => import("./GroupHover")),
  HoverTriangle: dynamic(() => import("./HoverTriangle")),
  DebounceThrottle: dynamic(() => import("./DebounceThrottle")),
};
