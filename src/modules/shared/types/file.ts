type BaseFrontmatter = {
  created_at?: string;
  updated_at?: string;
};

export type NowFrontmatter = BaseFrontmatter;

export type BitVideo = {
  dark: {
    webm: string;
    mp4: string;
  };
  light: {
    webm: string;
    mp4: string;
  };
};

export type BitPlaceholder = {
  dark: string;
  light: string;
};

export type PostFrontmatter = BaseFrontmatter & {
  title?: string;
  summary?: string;
  tags?: string[];
  slug: string;
  video?: BitVideo;
  placeholder?: BitPlaceholder;
};
