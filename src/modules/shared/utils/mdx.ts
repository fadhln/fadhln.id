/** biome-ignore-all lint/complexity/useLiteralKeys: Used for `containerProperties` */
import recmaMdxImportReact from "recma-mdx-import-react";
import rehypePreLanguage from "rehype-pre-language";
import rehypeSlug from "rehype-slug";
import remarkFlexibleContainers, {
  type FlexibleContainerOptions,
} from "remark-flexible-containers";
import remarkFlexibleToc from "remark-flexible-toc";
import remarkGfm from "remark-gfm";
import type { PluggableList } from "unified";

import { toTitleCase } from "./etc";

// Remark plugins: transform Markdown AST (syntax-level transforms)
const remarkPlugins: PluggableList = [
  remarkGfm, // GitHub Flavored Markdown support
  remarkFlexibleToc, // Auto-generated table of contents from headings
  [
    remarkFlexibleContainers,
    {
      title: () => null,
      containerTagName: "callout",
      containerProperties: (type, title) => {
        return {
          ["data-variant"]: type?.toLowerCase(),
          ["data-title"]: title ?? toTitleCase(type),
        };
      },
    } as FlexibleContainerOptions,
  ],
];

// Rehype plugins: transform HTML AST (HTML-level transforms)
const rehypePlugins: PluggableList = [
  rehypeSlug, // Add id attributes to headings for anchor links
  rehypePreLanguage, // Add data-language to <pre> elements for language labels
];

// Recma plugins: transform compiled JS output (JS-level transforms)
const recmaPlugins: PluggableList = [
  recmaMdxImportReact, // Ensure React is imported for JSX support
];

export const plugins = {
  remarkPlugins,
  rehypePlugins,
  recmaPlugins,
};
