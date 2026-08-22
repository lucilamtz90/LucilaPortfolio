# Lucila Martínez — Portfolio

Responsive portfolio site built with Vite + React + TypeScript, implemented component-by-component from the [Figma source file](https://www.figma.com/design/KPk6SGqtOYBgRzxUTT0H2a/Lucila-Mart%C3%ADnez), and deployed to GitHub Pages.

See [`DESIGN_SYSTEM.md`](./DESIGN_SYSTEM.md) for colors, typography, spacing, breakpoints, and the component inventory.

## Stack

- Vite + React + TypeScript
- Plain CSS with custom properties (no Tailwind, no CSS-in-JS)
- `react-router-dom` (client-side routing + the standard GitHub Pages SPA redirect trick via `public/404.html`)
- `react-i18next` (EN/ES, auto-detected from the browser, with a manual override toggle)

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build   # tsc -b && vite build
npm run preview # serve the production build locally
```

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the site and publishes it to GitHub Pages via `actions/deploy-pages`. Live at **https://lucilamtz90.github.io/LucilaPortfolio/**.

## Project structure

```
src/
  components/   # one folder per component (Component.tsx + Component.css)
  pages/        # Home, CaseDetail, NotFound
  data/         # case study content (EN/ES) + shared types
  i18n/         # en.json / es.json + i18next setup
  hooks/        # useLocale, useInView, usePrefersReducedMotion, useShare
  config/       # feature flags, external links
  styles/       # design tokens, breakpoints, shared base styles
  assets/       # icons + images downloaded from Figma
```

## Content scope

Four fully-built case studies (Dynamic Units, Etsy Insider Rewards, Checkout Errors, Rappi Card), matching the four Case pages that exist in Figma. A few things called out in the brief as `[OUT of scope for V1]` are built but disabled via `src/config/features.ts` rather than left unwritten — see `DESIGN_SYSTEM.md` for the list.
