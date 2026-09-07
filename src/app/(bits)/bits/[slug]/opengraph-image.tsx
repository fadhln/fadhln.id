import { ImageResponse } from "next/og";

import OgCard from "-/modules/shared/components/OgCard";
import { getPostInformation } from "-/modules/shared/utils/file";

export const alt = "Bit by Muhammad Fadhlan";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const info = getPostInformation("bits", `${slug}.mdx`);

  return new ImageResponse(<OgCard title={info?.title ?? "Bit"} subtitle={info?.summary} />, size);
}

// ponytail: force-static so fs reads prerender at build instead of per-request
export const dynamic = "force-static";
