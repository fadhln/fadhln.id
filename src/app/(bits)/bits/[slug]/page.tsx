import type { Metadata } from "next";

import BitsDetail from "-/modules/bits/detail";
import { getPostInformation } from "-/modules/shared/utils/file";

export async function generateMetadata({ params }: PageProps<"/bits/[slug]">): Promise<Metadata> {
  const { slug } = await params;

  const info = getPostInformation("bits", `${slug}.mdx`);
  if (!info) return {};

  return {
    title: info.title ? `${info.title} • fadhln.id` : `Bits • fadhln.id`,
    description: info.summary,
  };
}

export default BitsDetail;
