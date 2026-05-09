# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

All commands run from `src/`:

```bash
npm run dev       # dev server at http://localhost:3000
npm run build     # SSR build
npm run generate  # static site output (use this for deployment)
npm run preview   # preview the build locally
```

## Architecture

Single-page Nuxt 3 (SSG) site. No backend, no CMS — all content is static.

```
src/
├── assets/css/main.css      CSS custom properties + global primitives (tokens, buttons, animations)
├── components/              One component per page section
│   ├── AppNav.vue           Sticky nav with scroll-glass effect
│   ├── HeroSection.vue      Cinematic gold-beam stage hero
│   ├── EmotionalSection.vue "Imaginez…" narrative section (added vs design prototype)
│   ├── ConcertSection.vue   About The Abrams + image pair
│   ├── ProgramSection.vue   Day timeline (09h15 → 21h00)
│   ├── ExperienceSection.vue 4-card country experience grid
│   ├── GallerySection.vue   Asymmetric 12-col photo grid
│   ├── TicketsSection.vue   Tier card + QR + urgency
│   ├── PartnersSection.vue  6 partners in 3×2 grid
│   ├── AppFooter.vue        Outline wordmark + 4-col footer
│   └── ReservationModal.vue Ticket tier picker with live total
└── pages/index.vue          Assembles all components; owns scroll-reveal IntersectionObserver
```

## Design system

Defined entirely in `assets/css/main.css` — do not use Tailwind utilities for design tokens.

Key CSS variables: `--bg`, `--gold` (`#C8A96B`), `--ivory` (`#E8DDC7`), `--line`, `--f-display` (Bebas Neue), `--f-serif` (Cormorant Garamond), `--f-mono` (JetBrains Mono).

Scroll-reveal: add `data-reveal` to any element — `pages/index.vue` wires the IntersectionObserver on mount and adds class `in` when visible.

## Image placeholders

Image slots use `.placeholder-bg` divs (gold-tinted dark texture). Replace with `<NuxtImg>` when real photos are available.

## Event details

- **Date**: Saturday 17 October 2026
- **Venue**: Espace Artémisia, 5 rue des Archers, 56200 La Gacilly, Bretagne
- **Ticketing**: HelloAsso (CTA present, no live redirect wired yet)
- **Organiser**: Génération West Dance — generationwestdance@gmail.com / +33 6 76 21 13 68
