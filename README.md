# edgarasneverdauskas.com

Personal portfolio for Edgaras Neverdauskas — Product Engineer.

Built with Next.js (App Router, static export), React, TypeScript and Tailwind CSS. Deployed to GitHub Pages via GitHub Actions.

## Development

```bash
npm install
npm run dev
```

## Production build (static export to /out)

```bash
npm run build
```

## Checks

```bash
npm run lint
npm run typecheck
npm run test:e2e   # Playwright smoke tests against the built /out directory
```

## Deployment

Pushing to `main` triggers `.github/workflows/deploy-pages.yml`, which builds the static
export and deploys it to GitHub Pages. The custom domain is configured via `public/CNAME`.

## Content

All page content lives in a single typed source of truth: [`src/lib/content.ts`](src/lib/content.ts).
