# Ataraxia Typing Tutor

Calm dark-themed touch-typing lessons and a speed test for the Ataraxia split keyboard. Free and open source.

## Setup

From the repo root:

```bash
cd web
npm install
npm run dev
```

Or from the repo root after `web` deps are installed:

```bash
npm run dev
```

Open **http://127.0.0.1:5173/** (or the URL Vite prints).

> If `npm` is not recognized, open a **new** terminal after installing Node.js so PATH refreshes.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Local development server |
| `npm run build` | Typecheck and build static files into `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run oxlint |

## Deploy (Cloudflare Pages)

1. Build command: `npm run build`
2. Output directory: `dist`
3. Root directory: `web` (if deploying from the monorepo)

SPA routing is covered by `public/_redirects` (`/* → /index.html`).

## Progress

Lesson completion and unlock preference are stored in the browser via `localStorage`.

## Lessons

Curriculum lives in `src/content/curriculum.ts` (120 drills; count is derived at runtime).
