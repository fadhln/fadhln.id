import { Suspense } from "react";

import { MDXRemote, type MDXRemoteOptions } from "next-mdx-remote-client/rsc";

import ErrorView from "-/modules/shared/components/View/ErrorView";
import LoadingView from "-/modules/shared/components/View/LoadingView";
import { components } from "-/modules/shared/components/mdx";
import { getMarkdownExtension, getSource } from "-/modules/shared/utils/file";
import { plugins } from "-/modules/shared/utils/mdx";

import { bitsComponents } from "./components/mdx";

async function BitsDetail({ params }: PageProps<"/bits/[slug]">) {
  const { slug } = await params;

  const filename = `${slug}.mdx` as const;
  const source = await getSource("bits", filename);
  if (!source) {
    return <ErrorView error="This page is empty." />;
  }

  const format = getMarkdownExtension(filename);

  const options: MDXRemoteOptions = {
    disableExports: true,
    disableImports: true,
    parseFrontmatter: true,
    mdxOptions: {
      format,
      ...plugins,
    },
  };

  return (
    <Suspense fallback={<LoadingView />}>
      <MDXRemote
        source={source}
        options={options}
        components={{
          ...components,
          ...bitsComponents,
        }}
      />
    </Suspense>
  );
}

export default BitsDetail;
