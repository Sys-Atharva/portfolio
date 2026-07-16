# AGENTS.md — Portfolio

## Commands

| Action | Command |
|--------|---------|
| Dev server (port 8080) | `npm run dev` |
| Build (prod) | `npm run build` |
| Build (dev mode) | `npm run build:dev` |
| Lint | `npm run lint` |
| Test (vitest, jsdom) | `npm test` |
| Preview production build | `npm run preview` |

No `typecheck` script exists. Build step (`vite build`) catches TS errors.

## Architecture

- **Vite + React 18 SPA**, deployed to `https://sys-atharva.github.io/portfolio/`
- **Base path:** `/portfolio/` in `vite.config.ts` **and** `<BrowserRouter basename="/portfolio">` in `App.tsx` — both must match
- **Path alias:** `@/` → `./src` (used in all imports)
- **Routing:** 4 routes — `/`, `/projects`, `/inquiry`, `*` (404)
- **Styling:** Tailwind CSS with dark theme only (no light mode). CSS custom properties in `index.css` power the theme.
- **Animations:** Framer Motion (not Three.js — README is outdated on this)
- **State:** No Redux/Zustand. `@tanstack/react-query` for server state only (currently unused by any query).
- **shadcn/ui:** Only 4 components kept: `sonner`, `toaster`, `toast`, `tooltip`. Do not add new shadcn components unless explicitly requested. `components.json` is stale.
- **Code style:** No comments in components. Keep files short — prefer deletion over addition.
- **Stale docs:** `INQUIRY_FORM_DOCS.md` references `react-hook-form` and `@hookform/resolvers` which were removed — ignore it.

## Firebase

- Initialized in `src/firebase.js` — reads `VITE_FIREBASE_*` env vars at runtime
- Exports `db` (Firestore instance) and analytics (browser-only)
- Gracefully degrades if env vars are missing (logs error, `db` is null)
- CI generates `.env` from GitHub Environment Secrets in deploy workflow

## InquiryForm

- Uses `zod` for validation (schema defined inline in component)
- Writes to Firestore `inquiries` collection, then fires Pabbly webhook (no-cors)
- Webhook URL is hardcoded — update if Pabbly integration changes

## Testing

- **Vitest** with jsdom, `@testing-library/jest-dom` matchers available
- Only `src/test/setup.ts` remains (mocks `window.matchMedia`)
- Test files go in `src/` with `*.{test,spec}.{ts,tsx}` pattern
- No Playwright tests or config exist

## CI/CD

- GitHub Actions on push to `main` — builds then deploys to GitHub Pages
- Requires 8 `VITE_FIREBASE_*` secrets configured in the `github-pages` environment
- `npm install` (not `bun install`) in CI
