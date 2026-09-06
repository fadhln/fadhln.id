import Link from "next/link";

import { PageLayout } from "-/modules/shared/components/Layout";
import Text from "-/modules/shared/components/Text";
import type { PostFrontmatter } from "-/modules/shared/types/file";
import { formatDate } from "-/modules/shared/utils/date";
import { getMarkdownFiles, getPostInformation } from "-/modules/shared/utils/file";

function getPostDate(value?: string) {
  return value ? formatDate(new Date(value), "date-month-year-long") : "-";
}

function Posts() {
  const posts = getMarkdownFiles("posts")
    .map((fileName) => getPostInformation("posts", fileName))
    .filter((post): post is PostFrontmatter => post !== undefined)
    .sort((a, b) => {
      const aDate = a.updated_at ?? a.created_at ?? "";
      const bDate = b.updated_at ?? b.created_at ?? "";
      return bDate.localeCompare(aDate);
    });

  return (
    <PageLayout
      cover={{
        number: "04",
        title: "Posts",
      }}
    >
      {posts.length ? (
        <div className="flex flex-col">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/posts/${post.slug}`}
              className="group border-border hover:bg-bg-secondary flex items-baseline justify-between gap-4 border-b py-4 transition-colors first:pt-0"
            >
              <div>
                <Text className="group-hover:text-on-bg">{post.title ?? post.slug}</Text>
                {post.summary && (
                  <Text className="text-on-bg-secondary mt-1 text-sm">{post.summary}</Text>
                )}
              </div>
              <Text variant="label" className="shrink-0">
                {getPostDate(post.updated_at ?? post.created_at)}
              </Text>
            </Link>
          ))}
        </div>
      ) : (
        <div className="border-border bg-bg-secondary text-on-bg-secondary border p-6">
          <Text>No posts published yet.</Text>
        </div>
      )}
    </PageLayout>
  );
}

export default Posts;
