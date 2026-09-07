import { ImageResponse } from "next/og";

import OgCard from "-/modules/shared/components/OgCard";

export const alt = "fadhln.id — personal site of Muhammad Fadhlan";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <OgCard title="Muhammad Fadhlan" subtitle="Software Engineer from Indonesia" />,
    size,
  );
}
