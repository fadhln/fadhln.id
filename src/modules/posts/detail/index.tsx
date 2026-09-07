import { Suspense } from "react";

import { type EvaluateOptions, evaluate } from "next-mdx-remote-client/rsc";
import { notFound } from "next/navigation";

import { bitsComponents } from "-/modules/bits/detail/components/mdx";
import { Badge } from "-/modules/shared/components/Badge";
import ContentFooter from "-/modules/shared/components/ContentFooter";
import { PageLayout } from "-/modules/shared/components/Layout";
import ErrorView from "-/modules/shared/components/View/ErrorView";
import LoadingView from "-/modules/shared/components/View/LoadingView";
import { components } from "-/modules/shared/components/mdx";
import type { PostFrontmatter } from "-/modules/shared/types/file";
import { formatDate } from "-/modules/shared/utils/date";
import { getMarkdownExtension, getSource, githubFilePath } from "-/modules/shared/utils/file";
import { plugins } from "-/modules/shared/utils/mdx";
import path from "node:path";

async function PostDetail({ params }: PageProps<"/posts/[slug]">) {
  const { slug } = await params;
  const filename = `${slug}.mdx` as const;
  const githubUrl = githubFilePath(path.join("posts", filename));
  const source = await getSource("posts", filename);

  if (!source) {
    notFound();
  }

  const options: EvaluateOptions = {
    disableExports: true,
    disableImports: true,
    parseFrontmatter: true,
    mdxOptions: {
      format: getMarkdownExtension(filename),
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

  if (error) {
    return <ErrorView error={error} />;
  }

  return (
    <div className="flex h-full flex-col">
      <PageLayout
        breadcrumbs={{
          section: "Posts",
          sectionHref: "/posts",
          title: frontmatter.title,
        }}
      >
        <article className="text-on-bg-secondary min-w-0 text-base tracking-tight">
          <header className="mb-8">
            <h1 className="text-on-bg text-4xl font-semibold tracking-tight">
              {frontmatter.title ?? slug}
            </h1>
            {frontmatter.summary && <p className="mt-2 text-lg">{frontmatter.summary}</p>}
          </header>
          {frontmatter.tags && frontmatter.tags.length > 0 && (
            <div className="mb-6 flex flex-wrap gap-2">
              {frontmatter.tags.map((tag) => (
                <Badge key={tag}>{tag}</Badge>
              ))}
            </div>
          )}
          <Suspense fallback={<LoadingView />}>
            <div className="flex min-w-0 flex-col gap-4">{content}</div>
          </Suspense>
        </article>
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
    </div>
  );
}

export default PostDetail;
