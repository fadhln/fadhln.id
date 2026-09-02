# fadhln.id

Personal site of Muhammad Fadhlan. Next.js App Router, Tailwind v4, MDX via next-mdx-remote-client, pnpm.

## Before you write code

- Read `DESIGN.md` before any UI or styling work. It defines the token system, typography, and component rules.
- This project uses the `-/*` path alias for `./src/*`.
- Use `@radix-ui/react-icons` only. Do not add another icon library.
- Use pnpm. Do not use npm or yarn.

## Commands

- `pnpm dev` — dev server
- `pnpm build` — production build
- `pnpm check` — Biome lint + Prettier check (run before you finish)
- Content lives in `src/contents/`. Bits are `src/contents/bits/*.mdx`.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
