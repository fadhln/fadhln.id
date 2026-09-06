import { formatDate } from "-/modules/shared/utils/date";
import { getMarkdownFiles, getPostInformation } from "-/modules/shared/utils/file";

export function getBitDate(value?: string) {
  return value ? formatDate(new Date(value), "date-month-year-short") : "-";
}

export function getBits() {
  return getMarkdownFiles("bits")
    .map((fileName) => getPostInformation("bits", fileName))
    .filter((info) => info !== undefined)
    .sort((a, b) => {
      if (!a.updated_at || !b.updated_at) return 0;
      return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
    });
}
