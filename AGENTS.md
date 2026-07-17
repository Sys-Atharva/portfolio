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
- **Design System:** Crimson palette (`#DC2626` primary, `#F87171` light). Tailwind `crimson` / `crimson-light` tokens. Background `#0A0A0A`, surface `#141414`, border `#262626`.
- **Animations:** Framer Motion (not Three.js — README is outdated on this)
  - Performance rule: animate ONLY GPU-accelerated props (`transform`, `opacity`, `scale3d`, `border-color`). Never animate `width/height/margin/padding/top/left`. Set `will-change: transform` on moving elements. Target 60fps on mobile.
  - **Shared motion primitives** (in `src/components/`):
    - `SpotlightCard.tsx` — cursor-tracking radial-gradient spotlight via `useMotionValue` + `useSpring` + `useMotionTemplate` driving `--x`/`--y` CSS vars. Props: `variant: "crimson" | "neutral"`. ALSO adds 3D parallax tilt (`perspective: 800`, `preserve-3d`, `rotateX/rotateY` springs capped at ±8deg, inner `translate3d(0,0,20px)` on hover). **Mobile bypass:** `useHasHover()` (imported from `@/lib/useHasHover`) disables pointer math on touch; falls back to `whileTap` scale.
    - `Magnetic.tsx` — magnetic CTA wrapper pulling toward cursor (max `10px`) on `spring(150,15)`, springs back on leave. Props: `as: "button" | "div"`, `max`. Used on Hero CTAs and `InquiryForm` submit.
  - **Reveal patterns:** per-character stagger (`staggerChildren` + `y`/`opacity`/`rotateX`) in `HeroSection` with crimson gradient text; `whileInView` entrance with `viewport={{ once: true, margin: "-80px" }}` on sections; `whileHover` lift+scale on cards.
  - **Hero telemetry SVG:** `HeroTelemetry` inline SVG in `HeroSection.tsx` (12 nodes, 2 dash-flow lines, 4 pulse nodes) at `absolute inset-0 -z-10 opacity-20 pointer-events-none`. Animated via `.telemetry-dash` CSS keyframe (`stroke-dashoffset` only) + `animate-pulse`. Also has scroll-driven speed (`useScroll` → `useTransform` maps `strokeDashoffset`) and scroll-driven rotation (`useTransform` → `rotate 0→5deg`). Zero layout cost.
  - **Tech Marquee:** CSS-only infinite horizontal scroll (`@keyframes marquee`). Grayscale by default, full color + scale on hover. Pause on hover via `animation-play-state: paused`.
  - **Bento Grid:** `PortfolioPreview` uses CSS Grid (`grid-cols-1 md:grid-cols-3`). Featured card spans `md:col-span-2 md:row-span-2`. Hover: scale 1.02 + gradient overlay reveals CTA + tech badges.
  - **Scroll-driven timeline:** `ExperienceTimeline` uses `useScroll({ target })` → `useTransform` for vertical line draw (`stroke-dashoffset`-like via height). Cards stagger fade-up as line reaches them.
  - **Footer watermark:** Low-opacity `ATHARVA` text with `useScroll` → `useTransform` → `x` parallax (max 20px).
  - **Accessibility:** All custom springs use `useReducedMotion()` from `framer-motion` — when reduce is true, spring stiffness/damping → 9999 (instant). Stagger patterns set `staggerChildren: 0`. CSS `@media (prefers-reduced-motion: reduce)` in `index.css` pauses `.telemetry-dash`, `.cyl-link` transitions, and `.animate-marquee`. `Magnetic.tsx` uses `useHasHover()` to skip spring math on touch devices.
  - **Routing:** all internal nav uses React Router `<Link>` (not raw `<a>`); `basename="/portfolio"` in `App.tsx` handles GitHub Pages base path. External links stay `<a target="_blank" rel="noopener noreferrer">`.
- **State:** No Redux/Zustand. `@tanstack/react-query` for server state only (currently unused by any query).
- **shadcn/ui:** Only 4 components kept: `sonner`, `toaster`, `toast`, `tooltip`. Do not add new shadcn components unless explicitly requested. `components.json` is stale.
- **Code style:** No comments in components. Keep files short — prefer deletion over addition.
- **Stale docs:** `INQUIRY_FORM_DOCS.md` references `react-hook-form` and `@hookform/resolvers` which were removed — ignore it.

## Section Order (Index.tsx)

```
FloatingNav → HeroSection → TechMarquee → ValueProps → PortfolioPreview →
ExperienceTimeline → VideoSection → Testimonials → ContactSection → Footer
```

## Firebase

- Initialized in `src/firebase.js` — reads `VITE_FIREBASE_*` env vars at runtime
- Exports `db` (Firestore instance) and analytics (browser-only)
- Gracefully degrades if env vars are missing (logs error, `db` is null)
- CI generates `.env` from GitHub Environment Secrets in deploy workflow

## InquiryForm

- Uses `zod` for validation (schema defined inline in component)
- Writes to Firestore `inquiries` collection, then fires Pabbly webhook (no-cors)
- Webhook URL is hardcoded — update if Pabbly integration changes

## Crimson Bento Redesign (status: COMPLETE)

| Phase | Scope | Status |
|-------|-------|--------|
| 0. Token Migration | CSS vars + Tailwind config → crimson palette, bulk hex replace across 11 files | ✅ Done |
| 1. SpotlightCard | Variants `"emerald"\|"teal"` → `"crimson"\|"neutral"`, gradient rgba updated | ✅ Done |
| 2. Nav Rewrite | Full-width sticky top bar, removed NavDepth, crimson accents | ✅ Done |
| 3. Hero Section | Split layout (typography + portrait), crimson gradient text, char stagger 0.03s | ✅ Done |
| 4. Tech Marquee | CSS-only infinite scroll, grayscale → color on hover | ✅ Done |
| 5. Value Props | 2×2 grid replacing AboutSection, SpotlightCard wrappers, stagger fade-up | ✅ Done |
| 6. Bento Grid | CSS Grid with featured card span-2, hover scale + gradient overlay | ✅ Done |
| 7. Timeline | Vertical timeline with scroll-driven line draw, stagger cards | ✅ Done |
| 8. Video Section | Aspect-video placeholder, pulsing crimson play button | ✅ Done |
| 9. Testimonials | 3-column grid, whileHover lift + crimson shadow | ✅ Done |
| 10. Contact | CTA card with crimson accents, links to /inquiry | ✅ Done |
| 11. Footer | "ATHARVA" watermark with scroll parallax | ✅ Done |
| 12. Compose | Index.tsx assembled, nav anchors fixed | ✅ Done |
| 13. Cleanup | Deleted AboutSection, DualCoreSection, NavDepth | ✅ Done |
| 14. Color Audit | Projects, InquiryFormDemo, NotFound, InquiryForm all crimson | ✅ Done |

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
