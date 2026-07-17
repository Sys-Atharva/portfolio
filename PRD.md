# 📄 PRD: "Crimson Bento" Awwwards-Grade Portfolio Redesign

**Project:** Atharva Purvat Portfolio (`sys-atharva.github.io/portfolio/`)  
**Version:** 4.0 (Final Synthesis)  
**Status:** Approved for Execution  
**Inspiration:** `incredibles.dev` + Awwwards-winning kinetic design patterns  
**Tooling:** `shadcn/ui` (Base UI), `21st-dev-magic` (Animation primitives), `framer-motion`  

---

## 1. Executive Summary
This document outlines the complete redesign of the portfolio into a premium, Awwwards-grade engineering showcase. It merges a bold new "Crimson Bento" aesthetic with strict, low-end-device-friendly performance constraints. The plan replaces legacy components with a cohesive narrative flow (Hero → Marquee → Value Props → Bento Portfolio → Timeline → Contact) while enforcing WCAG accessibility and GPU-accelerated motion.

---

## 2. Core Principles & Constraints (Non-Negotiable)
1. **GPU Acceleration Only:** Animate *only* `transform` and `opacity`. Never animate `width`, `height`, `margin`, `padding`, or `box-shadow` (use border-color or pseudo-element opacity fades for glows).
2. **Accessibility First:** Every custom spring and stagger animation **must** respect `useReducedMotion()` from `framer-motion`. Fallback must be instant (`stiffness: 9999, damping: 9999`) or static.
3. **Touch-Safe:** All cursor-tracking or hover-dependent animations **must** be guarded by `useHasHover()` to prevent wasted CPU cycles and "ghost dragging" on mobile devices.
4. **No Scroll-Jacking:** Native scroll behavior must remain uninterrupted. No scroll-linked rotations that fight user momentum.
5. **Library Consistency:** Use `framer-motion` (not `motion/react`) for all hooks and components.

---

## 3. Design System & Token Updates (Phase 0)
*Before writing new components, update the foundation to support the new premium Crimson aesthetic.*

### 3.1 Color Palette Replacement
Update `tailwind.config.ts` and `src/index.css`. Replace all Emerald/Teal references with the new Crimson palette.

| Old Token | New Token | Usage Count |
| :--- | :--- | :--- |
| `#10B981` (Emerald) | `#DC2626` (Crimson) | ~30 refs |
| `#06B6D4` (Teal) | `#F87171` (Crimson Light) | ~12 refs |
| `rgba(16,185,129,...)` | `rgba(220,38,38,...)` | 3 refs |
| `rgba(6,182,212,...)` | `rgba(248,113,113,...)` | 3 refs |
| `#0B0F19` (Background) | `#0A0A0A` (Deep Black) | 5 refs |
| `#090D16` (Surface) | `#141414` (Dark Surface) | 2 refs |
| `#1E293B` (Border) | `#262626` (Subtle Border) | 2 refs |

### 3.2 Global CSS Additions (`src/index.css`)
```css
/* Optional Awwwards touch: Subtle noise overlay */
body::before {
  content: "";
  position: fixed;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.03'/%3E%3C/svg%3E");
  pointer-events: none;
  z-index: 9999;
}

/* Mandatory Accessibility Guards */
@media (prefers-reduced-motion: reduce) {
  .telemetry-dash { animation-play-state: paused; }
  .cyl-link__inner { transition: none; }
  .cyl-link:hover .cyl-link__inner { transform: none; }
  /* Add guards for any new animate-pulse/ping classes */
}