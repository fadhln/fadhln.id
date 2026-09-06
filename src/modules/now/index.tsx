import { Suspense } from "react";

import { type EvaluateOptions, evaluate } from "next-mdx-remote-client/rsc";

import { GitHubLogoIcon } from "@radix-ui/react-icons";
import path from "node:path";

import { Button } from "../shared/components/Button";
import { PageLayout } from "../shared/components/Layout";
import Text from "../shared/components/Text";
import ErrorView from "../shared/components/View/ErrorView";
import LoadingView from "../shared/components/View/LoadingView";
import { components } from "../shared/components/mdx";
import type { NowFrontmatter } from "../shared/types/file";
import { formatDate } from "../shared/utils/date";
import { getMarkdownExtension, getSource, githubFilePath } from "../shared/utils/file";
import { plugins } from "../shared/utils/mdx";
import Timeline from "./components/Timeline";

async function Now() {
  const filename = "index.mdx";

  const githubUrl = githubFilePath(path.join("now", filename));

  const source = await getSource("now", filename);
  if (!source) {
    return <ErrorView error="This page is empty." />;
  }

  const format = getMarkdownExtension(filename);

  const options: EvaluateOptions = {
    disableExports: true,
    disableImports: true,
    parseFrontmatter: true,
    mdxOptions: {
      format,
      ...plugins,
    },
  };

  const { content, error, frontmatter } = await evaluate<NowFrontmatter>({
    source,
    options,
    components: {
      Timeline,
      ...components,
    },
  });

  if (error) {
    return <ErrorView error={error} />;
  }

  return (
    <PageLayout
      cover={{
        number: "02",
        title: "Now",
      }}
    >
      <Suspense fallback={<LoadingView />}>
        <div className="text-on-bg-secondary flex flex-col gap-4 text-base tracking-tight">
          {content}
        </div>
      </Suspense>
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
          {frontmatter.created_at && (
            <Text>
              Created at: {formatDate(new Date(frontmatter.created_at), "date-month-year-short")}
            </Text>
          )}
          {frontmatter.updated_at && (
            <Text>
              Last edited at:{" "}
              {formatDate(new Date(frontmatter.updated_at), "date-month-year-short")}
            </Text>
          )}
        </div>
      </div>
    </PageLayout>
  );
}

export default Now;
