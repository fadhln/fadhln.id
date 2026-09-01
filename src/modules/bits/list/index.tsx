import Link from "next/link";

import { PageLayout } from "-/modules/shared/components/Layout";
import Text from "-/modules/shared/components/Text";
import type { PostFrontmatter } from "-/modules/shared/types/file";
import { formatDate } from "-/modules/shared/utils/date";
import { getMarkdownFiles, getPostInformation } from "-/modules/shared/utils/file";

function getDateStr(info: PostFrontmatter) {
  if (!info.updated_at || !info.created_at) {
    return "-";
  }

  const date = new Date(info.updated_at ?? info.created_at);
  return formatDate(date, "date-month-year-short");
}

function BitsList() {
  const bitPosts = getMarkdownFiles("bits")
    .map((fileName) => getPostInformation("bits", fileName))
    .filter((info) => info !== undefined)
    .sort((a, b) => {
      if (!a.updated_at || !b.updated_at) return 0;
      return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
    });

  return (
    <PageLayout
      cover={{
        number: "03",
        title: "Bits",
      }}
    >
      <div className="flex flex-col gap-6">
        {bitPosts.map((bit) => (
          <Link
            key={bit.slug}
            href={`/bits/${bit.slug}`}
            className="group flex items-baseline justify-between gap-4"
          >
            <Text variant="body" className="group-hover:text-on-bg transition-colors">
              {bit.title}
            </Text>
            <Text variant="label">{getDateStr(bit)}</Text>
          </Link>
        ))}
      </div>
    </PageLayout>
  );
}

export default BitsList;
