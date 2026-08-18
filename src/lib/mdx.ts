import matter from "gray-matter";
import fs from "node:fs";

export function getMDXContent(filePath: string) {
  const rawContent = fs.readFileSync(filePath, "utf-8");
  const { data: frontmatter, content } = matter(rawContent);

  return { frontmatter, content };
}
