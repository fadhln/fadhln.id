import Link from "next/link";

import { getPostDate, getPosts } from "-/modules/posts/utils";
import { PageLayout } from "-/modules/shared/components/Layout";
import Stagger, { StaggerItem } from "-/modules/shared/components/Stagger";
import Text from "-/modules/shared/components/Text";

function Posts({ tag }: { tag?: string }) {
  const posts = getPosts();
  const tags = [...new Set(posts.flatMap((post) => post.tags ?? []))].sort();
  const activeTag = tag && tags.includes(tag) ? tag : undefined;
  const filteredPosts = activeTag ? posts.filter((post) => post.tags?.includes(activeTag)) : posts;

  return (
    <PageLayout
      cover={{
        number: "04",
        title: "Posts",
        animateTitle: true,
        titleStaggerDelay: 0.06,
      }}
    >
      <Stagger inView staggerDelay={0.08} className="flex flex-col gap-4">
        {tags.length > 0 && (
          <StaggerItem>
            <nav aria-label="Filter posts by tag" className="flex flex-wrap gap-2">
              <Link
                href="/posts"
                className={`rounded-xs border px-3 py-1 text-xs transition-colors ${
                  !activeTag
                    ? "border-primary bg-primary text-on-primary"
                    : "border-border bg-bg-secondary text-on-bg-secondary hover:border-border-hover"
                }`}
              >
                All
              </Link>
              {tags.map((postTag) => (
                <Link
                  key={postTag}
                  href={`/posts?tag=${encodeURIComponent(postTag)}`}
                  className={`rounded-xs border px-3 py-1 text-xs transition-colors ${
                    activeTag === postTag
                      ? "border-primary bg-primary text-on-primary"
                      : "border-border bg-bg-secondary text-on-bg-secondary hover:border-border-hover"
                  }`}
                >
                  {postTag}
                </Link>
              ))}
            </nav>
          </StaggerItem>
        )}
        {filteredPosts.length ? (
          <StaggerItem>
            <Stagger key={activeTag ?? "all"} inView staggerDelay={0.08} className="flex flex-col">
              {filteredPosts.map((post) => (
                <StaggerItem key={post.slug}>
                  <Link
                    href={`/posts/${post.slug}`}
                    className="group border-border hover:bg-bg-secondary flex flex-col gap-2 border-b py-4 transition-colors first:border-t sm:flex-row sm:items-baseline sm:justify-between sm:gap-4"
                  >
                    <div>
                      <Text className="group-hover:text-on-bg">{post.title ?? post.slug}</Text>
                      {post.summary && (
                        <Text className="text-on-bg-secondary mt-1 text-sm">{post.summary}</Text>
                      )}
                    </div>
                    <Text variant="label" className="shrink-0 text-xs">
                      {getPostDate(post.updated_at ?? post.created_at)}
                    </Text>
                  </Link>
                </StaggerItem>
              ))}
            </Stagger>
          </StaggerItem>
        ) : (
          <StaggerItem>
            <div className="border-border bg-bg-secondary text-on-bg-secondary border p-6">
              <Text>
                {activeTag ? `No posts found for “${activeTag}”.` : "No posts published yet."}
              </Text>
            </div>
          </StaggerItem>
        )}
      </Stagger>
    </PageLayout>
  );
}

export default Posts;
