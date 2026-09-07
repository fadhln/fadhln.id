import type { MetadataRoute } from "next";

import { getPostInformation, getSlugs } from "-/modules/shared/utils/file";

const SITE_URL = "https://fadhln.id";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/about",
    "/now",
    "/posts",
    "/bits",
    "/contact",
  ].map((route) => ({
    url: `${SITE_URL}${route}`,
  }));

  const contentRoutes: MetadataRoute.Sitemap = ["posts", "bits"].flatMap((directory) =>
    getSlugs(directory).map((slug) => ({
      url: `${SITE_URL}/${directory}/${slug}`,
      lastModified: getPostInformation(directory, `${slug}.mdx`)?.updated_at,
    })),
  );

  return [...staticRoutes, ...contentRoutes];
}
