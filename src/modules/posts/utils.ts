import type { PostFrontmatter } from "-/modules/shared/types/file";
import { formatDate } from "-/modules/shared/utils/date";
import { getMarkdownFiles, getPostInformation } from "-/modules/shared/utils/file";

export function getPostDate(value?: string) {
  return value ? formatDate(new Date(value), "date-month-year-long") : "-";
}

export function getPosts(): PostFrontmatter[] {
  return getMarkdownFiles("posts")
    .map((fileName) => getPostInformation("posts", fileName))
    .filter((post): post is PostFrontmatter => post !== undefined)
    .sort((a, b) => {
      const aDate = a.updated_at ?? a.created_at ?? "";
      const bDate = b.updated_at ?? b.created_at ?? "";
      return bDate.localeCompare(aDate);
    });
}
