import { getFrontmatter } from "next-mdx-remote-client/utils";

import fs from "node:fs";
import path from "node:path";

import type { PostFrontmatter } from "../types/file";

export const markdownRegex = /\.mdx?$/;

export function getMarkdownFiles(...paths: string[]) {
  return fs
    .readdirSync(path.join(process.cwd(), "src", "contents", ...paths))
    .filter((filePath: string) => markdownRegex.test(filePath));
}

export function getSlugs(...paths: string[]) {
  return getMarkdownFiles(...paths).map((filename) => filename.replace(markdownRegex, ""));
}

export async function getSource(...paths: string[]) {
  const sourcePath = path.join(process.cwd(), "src", "contents", ...paths);
  if (!fs.existsSync(sourcePath)) return;
  return await fs.promises.readFile(sourcePath, "utf8");
}

export function getSourceSync(...paths: string[]): string | undefined {
  const sourcePath = path.join(process.cwd(), "src", "contents", ...paths);
  if (!fs.existsSync(sourcePath)) return;
  return fs.readFileSync(sourcePath, "utf8");
}

export function getMarkdownExtension(fileName: `${string}.md` | `${string}.mdx`): "md" | "mdx" {
  const match = fileName.match(/\.mdx?$/);

  return match?.[0].substring(1) as "md" | "mdx";
}

export async function getMarkdownFromSlug(
  directory: string,
  slug: string,
): Promise<
  | {
      source: string;
      format: "md" | "mdx";
    }
  | undefined
> {
  if (!/-mdx?$/.test(slug)) return;

  // replace the last dash with dot in the slug for filename
  const filename = slug.replace(/-(?=[^-]*$)/, ".") as `${string}.md` | `${string}.mdx`;

  if (!fs.existsSync(path.join(process.cwd(), "src", "contents", directory, filename))) return;

  const source = await getSource("contents", directory, filename);
  if (!source) return;

  return {
    source,
    format: getMarkdownExtension(filename),
  };
}

export const getPostInformation = (...paths: string[]): PostFrontmatter | undefined => {
  const filename = paths.at(-1);
  const source = getSourceSync(...paths);

  if (!source || !filename) return;

  const frontmatter = getFrontmatter<PostFrontmatter>(source).frontmatter;

  const post: PostFrontmatter = {
    ...frontmatter,
    // replace the last dot with dash in the filename for slug
    slug: filename.replace(/\.mdx?$/, ""),
  };

  return post;
};

const GITHUB_URL = "https://github.com/fadhln/fadhln.id";

export function githubFilePath(...paths: string[]) {
  return `${GITHUB_URL}/blob/main/${path.join("src", "contents", ...paths)}`;
}
