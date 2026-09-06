import type { Metadata } from "next";

import Posts from "-/modules/posts";

export const metadata: Metadata = {
  title: "Posts • fadhln.id",
};

export default async function PostsPage({ searchParams }: PageProps<"/posts">) {
  const params = await searchParams;
  const tag = typeof params.tag === "string" ? params.tag : undefined;

  return <Posts tag={tag} />;
}
