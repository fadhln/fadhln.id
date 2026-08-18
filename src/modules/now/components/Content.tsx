import type { AnchorHTMLAttributes } from "react";

import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";

import { getMDXContent } from "-/lib/mdx";
import path from "node:path";

import styles from "./Content.module.css";

const { content } = getMDXContent(path.join(process.cwd(), "src", "contents", "now.mdx"));

function CustomAnchor({ href, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) {
  const isExternal = href?.startsWith("http") || href?.startsWith("mailto:");

  if (isExternal) {
    return <a href={href} target="_blank" rel="noopener noreferrer" {...props} />;
  }

  return <Link href={href ?? ""} {...props} />;
}

const overrideComponents = {
  a: CustomAnchor,
};

function Content() {
  return (
    <div className={styles.nowContent}>
      <MDXRemote source={content} components={overrideComponents} />
    </div>
  );
}

export default Content;
