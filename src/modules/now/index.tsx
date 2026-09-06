import { Suspense } from "react";

import { type EvaluateOptions, evaluate } from "next-mdx-remote-client/rsc";

import path from "node:path";

import ContentFooter from "../shared/components/ContentFooter";
import { PageLayout } from "../shared/components/Layout";
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
      <ContentFooter
        githubUrl={githubUrl}
        createdAt={
          frontmatter.created_at
            ? formatDate(new Date(frontmatter.created_at), "date-month-year-short")
            : undefined
        }
        updatedAt={
          frontmatter.updated_at
            ? formatDate(new Date(frontmatter.updated_at), "date-month-year-short")
            : undefined
        }
      />
    </PageLayout>
  );
}

export default Now;
