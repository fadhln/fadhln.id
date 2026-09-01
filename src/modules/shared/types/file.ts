type BaseFrontmatter = {
  created_at?: string;
  updated_at?: string;
};

export type NowFrontmatter = BaseFrontmatter;
export type PostFrontmatter = BaseFrontmatter & {
  title?: string;
  summary?: string;
  slug: string;
};
