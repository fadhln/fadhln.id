import { Suspense } from "react";

import { type EvaluateOptions, evaluate } from "next-mdx-remote-client/rsc";

import ErrorView from "-/modules/shared/components/View/ErrorView";
import LoadingView from "-/modules/shared/components/View/LoadingView";
import { components } from "-/modules/shared/components/mdx";
import type { PostFrontmatter } from "-/modules/shared/types/file";
import { getMarkdownExtension, getSource } from "-/modules/shared/utils/file";
import { plugins } from "-/modules/shared/utils/mdx";

import BreadcrumbNav from "./components/BreadcrumbNav";
import { bitsComponents } from "./components/mdx";

async function BitsDetail({ params }: PageProps<"/bits/[slug]">) {
  const { slug } = await params;

  const filename = `${slug}.mdx` as const;
  const source = await getSource("bits", filename);
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

  const { content, error, frontmatter } = await evaluate<PostFrontmatter>({
    source,
    options,
    components: {
      ...components,
      ...bitsComponents,
    },
  });

  return (
    <div className="flex h-full flex-col">
      <BreadcrumbNav title={frontmatter.title} />
      <div className="flex-1">
        {error ? (
          <ErrorView error={error} />
        ) : (
          <Suspense fallback={<LoadingView />}>{content}</Suspense>
        )}
      </div>
    </div>
  );
}

export default BitsDetail;
