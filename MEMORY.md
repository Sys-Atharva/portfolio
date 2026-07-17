# MEMORY.md — Portfolio Project Data Store

Persistent record of project facts, decisions, and active state. Updated as the project evolves.

## Project Identity

- **Name:** Atharva Purvat Portfolio
- **Type:** Vite + React 18 SPA, personal portfolio website
- **Owner:** Atharva Purvat (Electronics & Telecommunications Eng student, full-stack dev)
- **Deploy URL:** `https://sys-atharva.github.io/portfolio/`
- **Base path:** `/portfolio/` (must match `vite.config.ts` + `<BrowserRouter basename="/portfolio">` in `App.tsx`)

## Design System — "Digital Studio"

- **Base bg:** deep slate `#0B0F19` (also elevated `#090D16`)
- **Primary accent:** Digital Emerald `#10B981`
- **Secondary accent:** Nordic Teal `#06B6D4`
- **Borders:** `slate-800` (`#1E293B`), transition to emerald on hover
- **Typography:** Space Grotesk (display) + Inter (body); `tracking-tight` headers, crisp white text
- **Theme:** dark only, no light mode, no glows/scanlines
- **Tokens:** defined as CSS vars in `src/index.css` (`:root`), incl. `--studio-bg`, `--studio-border`, `--studio-emerald`, `--studio-teal`

## Tech Stack

- Vite 6 + React 18 + TypeScript (strict)
- Tailwind CSS (dark theme)
- Framer Motion — all animations
- Firebase (Firestore `inquiries` collection) + Pabbly webhook
- @tanstack/react-query (installed, unused)
- shadcn/ui: only `sonner`, `toaster`, `toast`, `tooltip` (do not add more)
- Path alias: `@/` → `./src`

## Animation Primitives (src/components/)

- `SpotlightCard.tsx` — cursor-tracking spotlight (`useMotionValue`+`useSpring`+`useMotionTemplate`, `--x`/`--y` vars, `variant: emerald|teal`) + 3D parallax tilt (`perspective:800`, `preserve-3d`, `rotateX/rotateY` springs ±8deg, inner `translate3d(0,0,20px)` on hover). **Mobile bypass:** `useHasHover()` (imported from `@/lib/useHasHover`) disables pointer math on touch; `whileTap` scale fallback. Used in DualCoreSection + PortfolioPreview.
- `Magnetic.tsx` — magnetic CTA (`max` px toward cursor, `spring(150,15)`, springs back on leave). Used on Hero CTAs + InquiryForm submit.
- `NavDepth.tsx` — scroll-driven 3D depth on nav pill (`useScroll` → `useTransform` → `useSpring` for `rotateY ±6°`). Desktop-only via `useHasHover()`. Wraps `<nav>` in `FloatingNav.tsx`.
- `src/lib/useHasHover.ts` — shared `matchMedia('(hover: hover)')` hook, used by `SpotlightCard` + `NavDepth`.
- Nav 3D cylinder roll: pure-CSS `.cyl-link` in `index.css` (two stacked faces, `rotateX -90deg` on hover, GPU `transform` only). Desktop-only in `FloatingNav.tsx`.
- Hero telemetry SVG: `HeroTelemetry` inline SVG in `HeroSection.tsx` (12 nodes, 2 dash-flow lines, 4 pulse nodes) animated via `.telemetry-dash` CSS keyframe (`stroke-dashoffset` only) + `animate-pulse`. Also has scroll-driven speed (`useScroll` → `useTransform` maps `strokeDashoffset`) and scroll-driven rotation (`useTransform` → `rotate 0→5deg`). Zero layout cost.
- Scroll-tilt headings: `DualCoreSection` heading uses `useScroll({ target })` → `useTransform` → `useSpring` for `rotateX ±12°` + `y ±40px` parallax. `perspective:1000` + `preserve-3d` on parent. GPU-only.
- 3D card flip: `PortfolioPreview` cards have CSS 3D flip (`perspective:1200`, `preserve-3d`, `backface-visibility:hidden`). Click "Details" → `rotateY(180deg)` reveals back face (tech stack). Click "Back" → flips back. Pure CSS transition on `transform`, GPU-accelerated.
- Perf rule: GPU-only props (`transform`/`opacity`/`scale3d`/`border-color`), `will-change: transform`, no layout-triggering animation.

## Key Components

- `HeroSection.tsx` — 3D split-text char reveal (`rotateX`, `staggerChildren: 0.02`), CTAs wrapped in `Magnetic`. `HeroTelemetry` SVG has scroll-driven speed + rotation.
- `AboutSection.tsx` — staggered content reveal, `viewport once + margin -80px`.
- `DualCoreSection.tsx` — skills grid, `SpotlightCard` wrappers, staggered scale/opacity. Heading has scroll-driven 3D tilt (`rotateX ±12°` + `y ±40px`).
- `PortfolioPreview.tsx` — project cards, `SpotlightCard` + 3D card flip (click "Details" → `rotateY(180deg)` reveals tech stack).
- `ContactSection.tsx` — staggered CTA reveal.
- `InquiryForm.tsx` — **Firestore + Zod logic is sacred**: `inquirySchema`, `db.addDoc`, Pabbly webhook must stay intact. Submit button wrapped in `Magnetic`.
- `FloatingNav.tsx` — all internal links are React Router `<Link>` (logo + 4 nav items desktop/mobile); wrapped in `NavDepth` for scroll-driven 3D depth; nav row uses `.cyl-link` 3D cylinder roll on desktop. External links stay raw `<a>`.
- `NavDepth.tsx` — scroll-driven 3D depth wrapper for nav (`useScroll` → `useTransform` → `useSpring` for `rotateY ±6°`). Desktop-only via `useHasHover()`.
- `src/lib/useHasHover.ts` — shared `matchMedia('(hover: hover)')` hook for mobile bypass.

## Active Skills / MCP (global, ~/.config/opencode)

- Skills: frontend-design, ui-ux-pro-max, design-taste-frontend, react-best-practices, gsap-core, motion-framer, convex-create-component, react-native
- MCP servers: playwright (enabled), stitch (remote), shadcn-ui (enabled), 21st-dev-magic (enabled, API key set via `headers.x-api-key` in `opencode.jsonc`)
- Plugin: @dietrichgebert/ponytail (active)

## Motion Implementation Plan (status: COMPLETE)

Phased rollout using global skills (`react-best-practices`, `frontend-design`, `motion-framer`, `ui-ux-pro-max`, `gsap-core`) + MCP (`shadcn-ui`, `21st-dev-magic`, `playwright`):

| Phase | Scope | Status |
|-------|-------|--------|
| 1. Core Nav & Routing | React Router `<Link>` everywhere; `basename="/portfolio"`; external `<a>` kept | ✅ Done (FloatingNav, Footer, App.tsx) |
| 2. Smooth Scroll Reveals | `whileInView` + `viewport once + margin -80px`; per-char stagger in Hero | ✅ Done (About/Skills/Contact/Portfolio/Hero) |
| 3. 2D Micro-FX & Vector Depth | `HeroTelemetry` inline SVG, `.telemetry-dash` CSS keyframe (stroke-dashoffset), `animate-pulse`; CSS-only | ✅ Done (HeroSection, index.css) |
| 4. Immersive 3D Spatial Transforms | `SpotlightCard` 3D tilt (±8deg, mobile bypass `useHasHover`), `.cyl-link` CSS cylinder roll | ✅ Done (SpotlightCard, FloatingNav, index.css) |
| 5. Scroll-Driven 3D Depth | `NavDepth` scroll rotateY on nav, `DualCoreSection` scroll-tilt heading, `HeroTelemetry` scroll-driven speed/rotation, `PortfolioPreview` 3D card flip | ✅ Done (NavDepth, DualCoreSection, HeroSection, PortfolioPreview) |

Final verification: `npm run lint` (0 errors) + `npm run build` (clean). All GPU-accelerated, 60fps target.

## Known Gaps / TODO

- No `prefers-reduced-motion` guard on custom `useSpring` motion (accessibility).
- No vitest test files exist (`src/test/setup.ts` only) — no automated E2E/unit coverage.
- `INQUIRY_FORM_DOCS.md` is stale (refs removed react-hook-form) — ignore.
- Bundle >500kB (no code-splitting yet).
- `ContactSection.tsx`: CTA uses `transition-transform` (was `transition-all` — tightened to avoid layout-prop transitions).

## Conventions

- No comments in components. Keep files short — prefer deletion over addition.
- Lint: `npm run lint` (eslint). Build catches TS errors (`npm run build`).
- CI: GitHub Actions → build + deploy to GitHub Pages on push to `main`. Needs 8 `VITE_FIREBASE_*` secrets.
