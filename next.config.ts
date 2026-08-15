import type { NextConfig } from "next";

import { execSync } from "node:child_process";

const gitHash = execSync("git rev-parse --short HEAD").toString().trim();
const gitDate = execSync("git log -1 --format=%cd", { env: { ...process.env, TZ: "UTC" } })
  .toString()
  .trim();

const nextConfig: NextConfig = {
  reactCompiler: true,
  env: {
    NEXT_PUBLIC_GIT_HASH: gitHash,
    NEXT_PUBLIC_GIT_DATE: gitDate,
  },
};

export default nextConfig;
