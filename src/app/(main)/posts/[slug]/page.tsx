import type { Metadata } from "next";

import PostDetail from "-/modules/posts/detail";
import { getPostInformation, getSlugs } from "-/modules/shared/utils/file";

export function generateStaticParams() {
  return getSlugs("posts").map((slug) => ({ slug }));
}

type PostPageProps = PageProps<"/posts/[slug]">;

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostInformation("posts", `${slug}.mdx`);

  return {
    title: post?.title ? `${post.title} • fadhln.id` : `Posts • fadhln.id`,
    description: post?.summary,
  };
}

export default PostDetail;
