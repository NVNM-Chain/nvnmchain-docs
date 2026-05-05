# NVNM Chain Docs v2

Documentation site for NVNM Chain, built with the Unmint/Fumadocs stack on Next.js.  
This repo publishes MDX-based docs for users and operators, plus technical chain resources.

## Repository snapshot

- **Purpose:** NVNM Chain documentation and onboarding for users, operators, and validators.
- **Content source:** MDX files under `content/docs`.
- **Current docs sections:**
  - `content/docs/getting-started` (wallet + testnet onboarding)
  - `content/docs/operators` (governator/validator setup and operations)
  - `content/docs/resources` (network details, peers, chain parameters, EVM precompiles)
- **Rendering stack:** Next.js App Router + `fumadocs-core` + `fumadocs-mdx`.
- **UI features:** docs sidebar/header, TOC, prev/next pager, built-in search dialog, dark/light theme, custom MDX components.
- **Deployment target:** Cloudflare Workers via OpenNext (`open-next.config.ts`, `wrangler.jsonc`).

## Tech stack

- Next.js 15
- React 19
- Fumadocs (`fumadocs-core`, `fumadocs-mdx`)
- Tailwind CSS 4
- TypeScript
- Vitest + Testing Library
- OpenNext Cloudflare adapter + Wrangler

## Local development (Fumadocs/Unmint protocol)

### 1) Install dependencies

```bash
pnpm install
```

### 2) Run the docs locally

```bash
pnpm dev
```

Open `http://localhost:3000`.

### 3) Author docs content

- Add/update pages in `content/docs/**/*.mdx`.
- Keep page frontmatter accurate (`title`, `description`, and any section metadata).
- Reuse shared components from `app/components/docs/mdx`.

### 4) Validate before pushing

```bash
pnpm lint
pnpm test
pnpm build
```

## Build and deployment

### Build for standard Next.js runtime

```bash
pnpm build
```

### Build for Cloudflare Worker

```bash
pnpm build:worker
```

### Deploy to Cloudflare

```bash
pnpm deploy
```

### Preview Cloudflare deployment locally

```bash
pnpm preview
```
