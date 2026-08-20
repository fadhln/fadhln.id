import type { AnchorHTMLAttributes } from "react";

import { compileMDX } from "next-mdx-remote/rsc";
import Link from "next/link";

import Timeline from "-/contents/components/Timeline";
import { getMDXContent } from "-/lib/mdx";
import path from "node:path";

import Callout from "../shared/components/Callout";
import { PageLayout } from "../shared/components/Layout";
import Text from "../shared/components/Text";
import styles from "./index.module.css";

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
  Timeline,
};

async function Now() {
  const { content: mdxContent } = await compileMDX({
    source: content,
    components: overrideComponents,
    options: { blockJS: false },
  });

  return (
    <PageLayout
      cover={{
        number: "02",
        title: "Now",
      }}
    >
      <Callout withIcon title="About" variant="neutral">
        <Text>
          This is a <span className="font-medium">now page</span>, a log of what I'm currently
          doing, learning, or thinking about. Learn more about now pages{" "}
          <Text
            variant="link"
            href="https://nownownow.com/about"
            target="_blank"
            rel="noopener noreferrer"
          >
            here
          </Text>
          .
        </Text>
      </Callout>
      <article className={styles.nowContent}>{mdxContent}</article>
    </PageLayout>
  );
}

export default Now;
