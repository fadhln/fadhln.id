# fadhln.id Design System — AI Agent Reference

Dark mode: `prefers-color-scheme: dark`. No manual toggle. Tailwind CSS v4 + oklch primitives.

## Token Layer

Primitives → Semantic → Tailwind. All semantic tokens are CSS custom properties resolved at `:root`. Tailwind bridge in `globals.css` `@theme inline`.

```
src/styles/tokens/colors.css         # oklch primitives (neutral, brand, accent, success, warning, error, info)
src/styles/semantic/light.css        # :root semantic tokens (light default)
src/styles/semantic/dark.css         # @media (prefers-color-scheme: dark) overrides
src/styles/utilities.css             # @utility shadow-border{-2}{-t|-b|-l|-r}, text-xxs
src/app/globals.css                  # @theme inline bridge, body { bg, color, font }, ::selection
```

## Semantic Tokens

### Background → Tailwind: `bg-{token}`

| Token                  | Light           | Dark            |
| ---------------------- | --------------- | --------------- |
| `--color-bg`           | white           | black           |
| `--color-bg-secondary` | neutral-50      | neutral-950     |
| `--color-bg-elevated`  | white           | neutral-900     |
| `--color-bg-inset`     | neutral-200     | neutral-800     |
| `--color-bg-overlay`   | rgba(0,0,0,0.4) | rgba(0,0,0,0.6) |

### Text → Tailwind: `text-{token}`

| Token                     | Light       | Dark        |
| ------------------------- | ----------- | ----------- |
| `--color-on-bg`           | neutral-950 | neutral-50  |
| `--color-on-bg-secondary` | neutral-600 | neutral-400 |
| `--color-on-bg-muted`     | neutral-400 | neutral-500 |
| `--color-on-bg-inverse`   | white       | black       |

### Primary → Tailwind: `bg-primary`, `text-on-primary`

| Token                    | Light     | Dark      |
| ------------------------ | --------- | --------- |
| `--color-primary`        | brand-600 | brand-500 |
| `--color-on-primary`     | white     | black     |
| `--color-primary-hover`  | brand-500 | brand-400 |
| `--color-primary-active` | brand-700 | brand-300 |

### Borders → Tailwind: `border-{token}`

| Token                   | Light       | Dark        |
| ----------------------- | ----------- | ----------- |
| `--color-border`        | neutral-200 | neutral-800 |
| `--color-border-strong` | neutral-300 | neutral-700 |
| `--color-border-hover`  | neutral-400 | neutral-600 |

### State → Tailwind: `{state}`, `{state}-subtle`, `{state}-text`

Each: `success`, `warning`, `error`, `info`. Pattern: `{color}-{name}` (indicator), `{color}-{name}-subtle` (bg tint), `{color}-{name}-text` (fg). Dark subtle values use oklch(0.22 0.04 {hue}).

### Misc

| Token                    | Light            | Dark                   |
| ------------------------ | ---------------- | ---------------------- |
| `--color-code-bg`        | rgba(0,0,0,0.06) | rgba(255,255,255,0.08) |
| `--color-selection-bg`   | brand-200        | brand-800              |
| `--color-selection-text` | neutral-950      | neutral-50             |

## Primitives

All oklch. Scales: `neutral` (50–950), `brand` (50–950), `accent` (50–900). State colors: `{name}-{100|500|700}` for success/warning/error/info. Absolute: `--color-white: #ffffff`, `--color-black: #0a0a0a`.

## Typography

Families: `--font-sans` = Geist, `--font-mono` = Geist Mono. Set via Next.js `next/font/google` CSS variables.

| Name                | Family     | Size | Weight | Line-height | Letter-spacing | Context          |
| ------------------- | ---------- | ---- | ------ | ----------- | -------------- | ---------------- |
| `display-lg`        | Geist      | 48px | 700    | 1.1         | -0.02em        | Hero             |
| `display-lg-mobile` | Geist      | 32px | 700    | 1.1         | —              | Hero mobile      |
| `headline-md`       | Geist      | 32px | 600    | 1.2         | —              | Section headings |
| `body-lg`           | Geist      | 18px | 400    | 1.6         | —              | Long-form        |
| `body-md`           | Geist      | 16px | 400    | 1.5         | —              | Default body     |
| `label-mono`        | Geist Mono | 13px | 400    | 1.4         | 0.05em         | Metadata         |
| `label-numeric`     | Geist Mono | 14px | 500    | 1.0         | —              | Numbers          |

Case: UPPERCASE for sidebar section headers, commit hashes, metadata labels. Sentence case for nav items, body, headings.

## Icons

Library: `@radix-ui/react-icons` exclusively. Do not use lucide, react-icons, or any other icon library. Import individually: `import { ArrowUpIcon } from "@radix-ui/react-icons"`.

## Spacing

`--sidebar-width: 16rem`, `--sidebar-width-icon: 0px`. Base-8 scale. Tailwind: `p-8` (2rem), `gap-4` (1rem), etc.

## Shapes

0px radius everywhere. `rounded-xs` maximum. Exception: sidebar live-indicator dot uses `rounded-full`.

## Elevation

No box-shadows for depth. Tonal layering only: `bg-bg` < `bg-bg-secondary` < `bg-bg-elevated` < `bg-bg-inset`. Borders via `shadow-border` utilities (box-shadow-based, layout-neutral).

## Layout

Shell: `<body>` → flex row → `<aside>` (sidebar) + `<div>` (main + footer).

- Sidebar: `bg-bg-elevated`, `border-border`, `shadow-border-r`, `sticky top-0`, `h-svh`, `hidden md:flex`. Animated collapse via Motion SPRING_PANEL, CSS vars `--sidebar-width` / `--sidebar-width-icon`.
- Hero: `bg-primary`, `text-on-primary`, `h-64`. 2-col grid: mono index (left) + title (right).
- Content: `max-w-5xl`, `border-x border-border`, centered with `mx-6`. Background: `diagonalStripes` CSS module (45° repeating gradient, `--color-border` at 75% opacity, 10px×10px).
- Footer: Inverted — light mode uses `bg-on-bg` (dark), dark mode uses `bg-bg-secondary`. Bottom bar: `bg-primary h-2`.

Responsive: `< md` sidebar hidden (`hidden`), hero stacks to 1-col, content full-width.

## Component Tokens

### SideNav (`src/modules/root/components/SideBar/SideNav.tsx`)

- Section label: `text-on-bg-muted`, `text-xs`, `uppercase`, `tracking-widest`
- Item active: `text-on-bg`
- Item inactive: `text-on-bg-secondary`, hover `text-on-bg`
- Indicator: `bg-bg-inset`, animated position/height
- Index number: `text-on-bg-muted`, `font-mono`

### LocalTime (`src/modules/root/components/SideBar/LocalTime.tsx`)

- Bar: `bg-on-bg text-on-bg-inverse`, `shadow-border-b`, `h-12`
- Pulse dot: `bg-primary`, 8px, `rounded-full`

### CommitHash (`src/modules/root/components/SideBar/CommitHash.tsx`)

- Container: `font-mono`, `text-xxs`, `uppercase`, `tracking-wider`, `shadow-border-b`
- Date: `text-on-bg-secondary`

### Button (`src/modules/shared/components/Button/index.tsx`)

Base UI `<Button>`. Variants:

- `primary`: `bg-primary-active text-on-bg-inverse`, hover 90% opacity
- `secondary`: `border-border bg-bg text-on-bg`, hover `bg-bg/80`
- `ghost`: `text-on-bg bg-transparent`, hover `bg-bg/50`
  Sizes: `sm` h-6, `md` h-8, `lg` h-10. All `rounded-xs`.

### Footer (`src/modules/root/components/Footer/index.tsx`)

- Light: `bg-on-bg text-on-bg-inverse`. Dark: `bg-bg-secondary text-on-bg`.
- Dimmed text: `text-on-bg-inverse/50 dark:text-on-bg/50`
- Link hover: `hover:text-on-bg-inverse dark:hover:text-on-bg`
- Divider: light `border-on-bg-secondary`, dark `border-border`

## File Map

```
src/app/globals.css                              # imports, @theme inline, body, ::selection
src/styles/tokens/colors.css                     # @theme oklch primitives
src/styles/semantic/light.css                    # :root semantic tokens
src/styles/semantic/dark.css                     # @media dark overrides
src/styles/utilities.css                         # shadow-border, text-xxs
src/modules/root/components/RootLayout.tsx       # shell: sidebar + main + footer
src/modules/root/components/RootLayout.module.css# diagonalStripes
src/modules/root/components/Footer/index.tsx     # inverted footer
src/modules/root/components/Footer/BackToTop.tsx # scroll-to-top
src/modules/root/components/SideBar/index.tsx    # sidebar shell + collapse
src/modules/root/components/SideBar/LocalTime.tsx# live clock (Asia/Jakarta)
src/modules/root/components/SideBar/CommitHash.tsx# git metadata
src/modules/root/components/SideBar/SideNav.tsx  # numbered nav + animated indicator
src/modules/root/components/SideBar/ToggleTrigger.tsx# chevron toggle
src/modules/root/components/SideBar/contexts/SideBarProvider.tsx # collapse state, CSS vars
src/modules/home/index.tsx                       # hero + intro
src/modules/shared/components/Button/index.tsx   # Base UI Button (3 variants)
src/modules/shared/constants/ease.ts             # Motion spring config
src/modules/shared/hooks/useControlledState.ts   # controlled/uncontrolled state hook
src/modules/shared/utils/cn.ts                   # clsx + tailwind-merge
```
