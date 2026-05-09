# Implementation Plan — generationwestdance.fr

## Source Material
- **Design**: `gwd-the-abrams-02-remix/project/The Abrams - Concert Live.html` (fetched from Claude Design)
- **Brief / Tweaks**: `docs/chatgpt-ui-tweak.md` — design requirements to apply on top of the design file
- **Reference stack**: `../danse-et-musique-de-laille.github.io/src` (Nuxt 3 + Tailwind + @nuxt/image)

---

## Step 1 — Nuxt Project Scaffold (`src/`)

Create the `src/` folder with the same stack as the reference project:

```
src/
├── package.json          nuxt 3, @nuxtjs/tailwindcss, @nuxt/icon, @nuxt/image
├── nuxt.config.ts        Google Fonts via head link, modules
├── tailwind.config.js    black/gold palette + safelist
├── tsconfig.json
├── app.vue               root shell (NuxtPage)
├── assets/
│   └── css/
│       └── main.css      CSS custom properties + global primitives from design
├── pages/
│   └── index.vue         assembles all section components
├── components/           one file per section (see Step 3)
└── public/               favicon, uploads/
```

## Step 2 — Global Styles (`assets/css/main.css`)

Port the design's CSS tokens and shared primitives verbatim:
- CSS custom properties (`--bg`, `--gold`, `--ivory`, font stacks, `--pad`, `--maxw`)
- Shared classes: `.wrap`, `.eyebrow`, `.btn`, `.display`, `.rule`, `.stage`, `.spotlights`, `.smoke`, `.floor`
- Animation keyframes: `sweep`, `sway`, `drift`, `cue`, `pulse`

Tailwind used only for utility spacing where it fits; design classes kept as-is.

## Step 3 — Components

| File | Contents |
|---|---|
| `AppNav.vue` | Sticky nav, scroll-glass effect, brand mark, nav links, CTA |
| `HeroSection.vue` | Cinematic gold-beam stage, title, date stamp, meta strip, image slot |
| `EmotionalSection.vue` | **Tweak addition** — "Imaginez…" cinematic storytelling (from brief §2, not in HTML) |
| `ConcertSection.vue` | About / Live Concert — image pair + text + stats strip |
| `ProgramSection.vue` | Timeline: 09h15 accueil → 21h00 concert featured row |
| `ExperienceSection.vue` | 4-card country experience grid |
| `GallerySection.vue` | Asymmetric 12-col grid with 6 image slots |
| `TicketsSection.vue` | Tier card + QR + urgency pulse |
| `PartnersSection.vue` | **Tweak addition** — 6 partners (adds DML Country Laillé, West Rennes, La Gacilly Country vs 4 in HTML) |
| `AppFooter.vue` | Outline wordmark, 4-col grid, foot-bar |
| `ReservationModal.vue` | Tier rows with quantity steppers + live total |

## Step 4 — `pages/index.vue`

Single-page assembly — imports all components in order, passes no data (content is static).

## Step 5 — Tweaks from `chatgpt-ui-tweak.md`

Two meaningful differences between the brief and the rendered HTML:

1. **Emotional Projection Section** (brief §2 — absent from HTML): Add `EmotionalSection.vue` with the "Imaginez…" narrative, slow parallax background, italic serif typography overlay.
2. **Partners** (brief §9 — 6 names vs 4 in HTML): Add DML Country Laillé, West Rennes, La Gacilly Country — adapt grid to `repeat(3,1fr)` × 2 rows or a 6-col layout.

Everything else in the brief is already reflected in the HTML.

## Step 6 — CLAUDE.md

Document:
- Dev commands (`npm run dev`, `npm run generate`, `npm run build`)
- Architecture (single-page Nuxt 3 SSG, component-per-section)
- Design token location (`assets/css/main.css`)

---

## What is NOT in scope

- Real image replacement (image-slot placeholders remain)
- HelloAsso live integration (CTA button kept, no live redirect)
- Backend / Notion / S3 (static site only)
