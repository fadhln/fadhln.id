import Link from "next/link";

import { getPostDate, getPosts } from "-/modules/posts/utils";
import { Button } from "-/modules/shared/components/Button";
import Text from "-/modules/shared/components/Text";
import { ArrowRightIcon } from "@radix-ui/react-icons";

function PostsSection() {
  const posts = getPosts().slice(0, 3);

  if (posts.length === 0) return null;

  return (
    <section className="mt-16" aria-labelledby="posts-title">
      <div className="mb-6 flex items-end justify-between gap-4">
        <h2 id="posts-title" className="text-2xl font-semibold tracking-tight">
          Posts
        </h2>
        <Button
          variant="secondary"
          size="sm"
          render={<Link href="/posts" />}
          nativeButton={false}
          icon={<ArrowRightIcon />}
          iconPosition="end"
        >
          View all
        </Button>
      </div>
      <div className="flex flex-col">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/posts/${post.slug}`}
            className="group border-border hover:bg-bg-secondary flex items-baseline justify-between gap-4 border-b py-4 transition-colors first:border-t"
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
        ))}
      </div>
    </section>
  );
}

export default PostsSection;
