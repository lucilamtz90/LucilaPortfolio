# Design System

Source of truth: Figma file `Lucila Martínez` (`KPk6SGqtOYBgRzxUTT0H2a`), pages "Desktop Library Local" and "Mobile". All values below were pulled directly from that file via the Figma MCP server and mirrored into `src/styles/tokens.css`. Keep this file in sync whenever a token changes in Figma.

## Colors

| Token | Hex | Figma name | Usage |
|---|---|---|---|
| `--color-text-primary` | `#22221A` | Text/Primary | Headings, body copy |
| `--color-text-secondary` | `#676E6F` | Text/Secondary | Meta text, labels, dates |
| `--color-accent-primary` | `#94CF13` | Accent/Primary | Status dot, live/glow accents |
| `--color-surface-accent` | `#F0F5E5` | Surface/Accent | Pill Status background |
| `--color-border` | `#2A2D2D` | Border | Borders, active pill fill, solid buttons |
| `--color-surface` | `#FFFEFC` | Surface | Card/media backgrounds, inactive pill |
| `--color-background` | `#F8F7F7` | Background | Page background |

## Typography

Two font families, both loaded via Google Fonts in `index.html`:

- **Gabarito** — display, headings, body copy (weights: 400 Regular, 500 Medium, 600 SemiBold)
- **SUSE Mono** — labels, badges, overline, pills (weights: 300 Light, 400 Regular, 500 Medium)

All Gabarito styles use `letter-spacing: -0.3px`. SUSE Mono styles use `letter-spacing: 0`.

| Style | Family / weight | Desktop | Mobile |
|---|---|---|---|
| Display | Gabarito SemiBold | 50px | 48px |
| Heading | Gabarito SemiBold | 28px | 28px |
| Subheading | Gabarito Regular | 32px | 28–30px |
| Body | Gabarito Regular | 18px | 16px |
| Link | Gabarito SemiBold, underline | 22px | 22px |
| Heading Card | Gabarito Medium | 28px | 28px |
| Label | SUSE Mono Regular | 16px | 16px |
| Badge | SUSE Mono Medium | 16px | 16px |
| Overline | SUSE Mono Light | 14px | 14px |
| Caption (italic) | SUSE Mono Italic | 16px | 16px |

## Spacing scale

Defined as `--space-*` tokens in `src/styles/tokens.css`, matching the gaps/padding actually used across Home and Case frames in Figma:

`4 · 8 · 12 · 16 · 18 · 24 · 32 · 48 · 64 · 72 · 100` px

## Breakpoints

| Name | Figma reference width | CSS activation | Notes |
|---|---|---|---|
| Mobile | 440px | base (mobile-first) | Figma default |
| Tablet | 780px | `min-width: 780px` | No dedicated Figma frame — built to desktop standards, scaled down |
| Desktop | 1512px | `min-width: 1024px` | Figma default width, but the desktop *layout* activates at 1024px — see below |

Implemented as `min-width` media queries (mobile-first). Below 440px and above 1512px, layout degrades gracefully via fluid widths and a centered max-width container rather than fixed breakpoints.

**Why the desktop layout activates at 1024px instead of 1512px:** real desktop/laptop browsers rarely report a CSS viewport width of exactly 1512px — a 13" MacBook Air's default scaled resolution is ~1440px, and browser windows are frequently narrower than the full screen. Gating the row-layout/desktop styles on `min-width: 1512px` meant most real "desktop" users still saw the tablet-stacked layout. 1512px remains the width the design is pixel-accurate at (`.container`'s `max-width` is 1384px, i.e. 1512 − 2×64px padding); the desktop layout is fluid from 1024px up to and beyond 1512px.

## Radius & motion

- Pills/buttons: `border-radius: 999px` (`--radius-pill`)
- Media hover zoom: `scale(1.05)`, `0.6s`, `cubic-bezier(.16,1,.3,1)`
- Scroll-reveal fade: `translateY(24px) → 0`, opacity `0 → 1`, `0.5s ease-out`
- Status dot glow: `2.2s` ease-in-out pulse on `box-shadow` + `opacity`
- All animations are disabled/shortened under `prefers-reduced-motion: reduce`

## Components (`src/components/`)

Each component is a `ComponentName.tsx` + co-located `ComponentName.css` pair, styled with plain CSS custom properties (no Tailwind, no CSS-in-JS). Shared typography for Case content sections lives in `src/styles/case-content.css` (`.case-heading`, `.case-body`, `.case-media`) rather than being repeated per component.

| Component | Figma source |
|---|---|
| `NavigationBar` | Navigation Bar (Home Desktop/Mobile) |
| `PillStatus` / `StatusDot` | Pill Status / Travel Status |
| `Hero` | Hero |
| `ButtonPills` | Button Pills (tab control) |
| `ProjectCard` / `ProjectsGrid` | Project Card, Projects Grid |
| `Media` | shared media/figure wrapper used everywhere an image appears |
| `Footer` | Footer (desktop + mobile via CSS, one component) |
| `TripPageHeader` | Trip Page Header (Case pages) |
| `SectionTwoColumn`, `ProcessStep`, `ProcessStepsRow`, `HeroImage`, `ImpactResults`, `ImpactResultsExperiments`, `ExtendedNarrative`, `ToolCredit`, `Reflection` | Case Content section types |
| `ContactFab` | Expandable FAB (built from `.btn-pill` primitives) |
| `VoiceNoteRecorder` | Behind `features.voiceNote` flag — out of scope for V1 |
| `LoadingScreen` | Initial preloader |
| `LanguageToggle` | Manual EN/ES override |

## Feature flags (`src/config/features.ts`)

Functionality explicitly marked `[OUT of scope for V1]` in the brief is built but flagged off, not omitted:

- `voiceNote` — WhatsApp-style recorder inside the Contact FAB
- `aiCaseDistinctLayout` — differentiated visual layout for AI-side project cards
- `videoOverlay` — microphone icon overlay on Case pages
