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
  - Performance rule: animate ONLY GPU-accelerated props (`transform`, `opacity`, `scale3d`, `border-color`). Never animate `width/height/margin/padding/top/left`. Set `will-change: transform` on moving elements. Target 60fps on mobile.
  - **Shared motion primitives** (in `src/components/`):
    - `SpotlightCard.tsx` — cursor-tracking radial-gradient spotlight via `useMotionValue` + `useSpring` + `useMotionTemplate` driving `--x`/`--y` CSS vars. Props: `variant: "emerald" | "teal"`. ALSO adds 3D parallax tilt (`perspective: 800`, `preserve-3d`, `rotateX/rotateY` springs capped at ±8deg, inner `translate3d(0,0,20px)` on hover). **Mobile bypass:** `useHasHover()` (imported from `@/lib/useHasHover`) disables pointer math on touch; falls back to `whileTap` scale. Used in `DualCoreSection` (skills) and `PortfolioPreview` (projects).
    - `Magnetic.tsx` — magnetic CTA wrapper pulling toward cursor (max `10px`) on `spring(150,15)`, springs back on leave. Props: `as: "button" | "div"`, `max`. Used on Hero CTAs and `InquiryForm` submit.
    - `NavDepth.tsx` — scroll-driven 3D depth on nav pill (`useScroll` → `useTransform` → `useSpring` for `rotateY ±6°`). Desktop-only via `useHasHover()`. Wraps the `<nav>` in `FloatingNav.tsx`.
  - **Reveal patterns:** per-character stagger (`staggerChildren` + `y`/`opacity`/`rotateX`) in `HeroSection`; `whileInView` entrance with `viewport={{ once: true, margin: "-80px" }}` on About/Skills/Contact; `whileHover` lift+scale on cards.
  - **Nav 3D cylinder roll:** pure-CSS `.cyl-link` (`.cyl-link__inner`/`.cyl-link__face`) in `index.css` — two stacked faces rotate `-90deg` on X-axis on hover (GPU `transform` only, `will-change: transform`). Desktop-only via `md:flex` nav row in `FloatingNav.tsx`.
  - **Hero telemetry SVG:** `HeroTelemetry` inline SVG in `HeroSection.tsx` (12 nodes, 2 dash-flow lines, 4 pulse nodes) at `absolute inset-0 -z-10 opacity-20 pointer-events-none`. Animated via `.telemetry-dash` CSS keyframe (`stroke-dashoffset` only) + `animate-pulse`. Also has scroll-driven speed (`useScroll` → `useTransform` maps `strokeDashoffset`) and scroll-driven rotation (`useTransform` → `rotate 0→5deg`). Zero layout cost.
  - **Scroll-tilt headings:** `DualCoreSection` heading uses `useScroll({ target })` → `useTransform` → `useSpring` for `rotateX ±12°` + `y ±40px` parallax. `perspective:1000` + `preserve-3d` on parent. GPU-only.
  - **3D card flip:** `PortfolioPreview` cards have CSS 3D flip (`perspective:1200`, `preserve-3d`, `backface-visibility:hidden`). Click "Details" → `rotateY(180deg)` reveals back face (tech stack). Click "Back" → flips back. Pure CSS transition on `transform`, GPU-accelerated.
  - **Routing:** all internal nav uses React Router `<Link>` (not raw `<a>`); `basename="/portfolio"` in `App.tsx` handles GitHub Pages base path. External links stay `<a target="_blank" rel="noopener noreferrer">`.
  - No `prefers-reduced-motion` guard exists yet on the custom springs (framer's `whileHover` respects it, custom `useSpring` does not).
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

## Motion Implementation Plan (status: COMPLETE)

Phased rollout using global skills (`react-best-practices`, `frontend-design`, `motion-framer`, `ui-ux-pro-max`, `gsap-core`) + MCP (`shadcn-ui`, `21st-dev-magic`, `playwright`):

| Phase | Scope | Status |
|-------|-------|--------|
| 1. Core Nav & Routing | React Router `<Link>` everywhere; `basename="/portfolio"`; external `<a>` kept | ✅ Done (FloatingNav, Footer, App.tsx) |
| 2. Smooth Scroll Reveals | `whileInView` + `viewport once + margin -80px`; per-char stagger in Hero | ✅ Done (About/Skills/Contact/Portfolio/Hero) |
| 3. 2D Micro-FX & Vector Depth | `HeroTelemetry` inline SVG, `.telemetry-dash` CSS keyframe (stroke-dashoffset), `animate-pulse`; CSS-only (no GSAP needed) | ✅ Done (HeroSection, index.css) |
| 4. Immersive 3D Spatial Transforms | `SpotlightCard` 3D tilt (±8deg, mobile bypass via `useHasHover`), `.cyl-link` CSS cylinder roll | ✅ Done (SpotlightCard, FloatingNav, index.css) |
| 5. Scroll-Driven 3D Depth | `NavDepth` scroll rotateY on nav, `DualCoreSection` scroll-tilt heading, `HeroTelemetry` scroll-driven speed/rotation, `PortfolioPreview` 3D card flip | ✅ Done (NavDepth, DualCoreSection, HeroSection, PortfolioPreview) |

Final verification: `npm run lint` (0 errors) + `npm run build` (clean). All GPU-accelerated, 60fps target.

## Testing

- **Vitest** with jsdom, `@testing-library/jest-dom` matchers available
- Only `src/test/setup.ts` remains (mocks `window.matchMedia`)
- Test files go in `src/` with `*.{test,spec}.{ts,tsx}` pattern
- **Playwright MCP** (`@playwright/mcp`) is configured globally for E2E/navigation checks (run against `npm run dev`)

## CI/CD

- GitHub Actions on push to `main` — builds then deploys to GitHub Pages
- Requires 8 `VITE_FIREBASE_*` secrets configured in the `github-pages` environment
- `npm install` (not `bun install`) in CI
