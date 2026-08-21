import type { AnchorHTMLAttributes } from "react";

import { compileMDX } from "next-mdx-remote/rsc";
import Link from "next/link";

import Timeline from "-/contents/components/Timeline";
import { getMDXContent } from "-/lib/mdx";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import path from "node:path";

import { Button } from "../shared/components/Button";
import Callout from "../shared/components/Callout";
import { PageLayout } from "../shared/components/Layout";
import Text from "../shared/components/Text";
import { githubFilePathGen } from "../shared/utils/github";
import styles from "./index.module.css";

const filePath = path.join("src", "contents", "now.mdx");

const { content, frontmatter } = getMDXContent(path.join(process.cwd(), filePath));

const githubUrl = githubFilePathGen(filePath);

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
      <div className="shadow-border-t mt-8 flex justify-between pt-4">
        <div className="flex flex-col gap-2 text-xs">
          <Text>Found any mistakes or typos?</Text>
          <div>
            <Button
              variant="secondary"
              size="sm"
              icon={<GitHubLogoIcon />}
              render={<a href={githubUrl} target="_blank" rel="noopener noreferrer" />}
              nativeButton={false}
            >
              Edit on GitHub
            </Button>
          </div>
        </div>
        <div className="text-on-bg-secondary flex flex-col items-end text-xs">
          <Text>Created at: {frontmatter.created_at}</Text>
          <Text>Last edited at: {frontmatter.updated_at}</Text>
        </div>
      </div>
    </PageLayout>
  );
}

export default Now;
