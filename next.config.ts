import type { NextConfig } from "next";

import createMDX from "@next/mdx";
import { execSync } from "node:child_process";

const gitHash = execSync("git rev-parse --short HEAD").toString().trim();
const gitDate = execSync("git log -1 --format=%cd", { env: { ...process.env, TZ: "UTC" } })
  .toString()
  .trim();

const nextConfig: NextConfig = {
  pageExtensions: ["md", "mdx", "ts", "tsx"],
  reactCompiler: true,
  env: {
    NEXT_PUBLIC_GIT_HASH: gitHash,
    NEXT_PUBLIC_GIT_DATE: gitDate,
  },
};

const withMDX = createMDX({
  extension: /\.(md|mdx)$/,
});

export default withMDX(nextConfig);
