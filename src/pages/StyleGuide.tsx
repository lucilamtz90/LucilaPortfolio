import { useState } from 'react';
import { MusicToggle } from '../features/music/MusicToggle';
import { PillStatus } from '../components/PillStatus/PillStatus';
import { StatusDot } from '../components/PillStatus/StatusDot';
import { SignalPill } from '../components/SignalPill/SignalPill';
import { ToolCredit } from '../components/ToolCredit/ToolCredit';
import { NavigationBar } from '../components/NavigationBar/NavigationBar';
import { Hero } from '../components/Hero/Hero';
import { Footer } from '../components/Footer/Footer';
import { ProjectCard } from '../components/ProjectCard/ProjectCard';
import placeholder from '../assets/images/project-placeholder.jpg';
import { GRADIENT_THEMES } from '../features/music/gradientThemes';
import './StyleGuide.css';

/** Reads a CSS custom property's live computed value, so the labels here can never drift
 * out of sync with tokens.css — if a token's value changes, this page reflects it on load. */
function useCssVar(name: string): string {
  const [value] = useState(() => getComputedStyle(document.documentElement).getPropertyValue(name).trim());
  return value;
}

function ColorSwatch({ token, label }: { token: string; label?: string }) {
  const value = useCssVar(token);
  return (
    <div className="style-guide__swatch">
      <span className="style-guide__swatch-color" style={{ background: `var(${token})` }} />
      <div className="style-guide__swatch-meta">
        <code>{token}</code>
        {label && <span className="style-guide__swatch-label">{label}</span>}
        <span className="style-guide__swatch-value">{value}</span>
      </div>
    </div>
  );
}

function TypeSample({ token, sample }: { token: string; sample: string }) {
  const value = useCssVar(token);
  return (
    <div className="style-guide__type-row">
      <p className="style-guide__type-sample" style={{ fontSize: `var(${token})` }}>
        {sample}
      </p>
      <div className="style-guide__type-meta">
        <code>{token}</code>
        <span>{value}</span>
      </div>
    </div>
  );
}

function SpaceBar({ token }: { token: string }) {
  const value = useCssVar(token);
  return (
    <div className="style-guide__space-row">
      <code>{token}</code>
      <span className="style-guide__space-bar" style={{ width: `var(${token})` }} />
      <span className="style-guide__space-value">{value}</span>
    </div>
  );
}

const COLOR_TOKENS: { token: string; label: string }[] = [
  { token: '--color-text-primary', label: 'Text primary' },
  { token: '--color-text-secondary', label: 'Text secondary' },
  { token: '--color-accent-primary', label: 'Accent primary' },
  { token: '--color-surface-accent', label: 'Surface accent' },
  { token: '--color-border', label: 'Border / solid fill' },
  { token: '--color-surface', label: 'Surface' },
  { token: '--color-background', label: 'Background' },
  { token: '--color-button-primary-hover', label: 'Button primary hover' },
  { token: '--color-button-secondary-hover', label: 'Button secondary hover' },
];

const TYPE_TOKENS: { token: string; sample: string }[] = [
  { token: '--text-display', sample: 'Display' },
  { token: '--text-display-sm', sample: 'Display small' },
  { token: '--text-heading', sample: 'Heading' },
  { token: '--text-heading-sm', sample: 'Heading small' },
  { token: '--text-subheading', sample: 'Subheading' },
  { token: '--text-body', sample: 'Body text' },
  { token: '--text-link', sample: 'Link text' },
  { token: '--text-label', sample: 'Label text' },
  { token: '--text-badge', sample: 'Badge text' },
  { token: '--text-overline', sample: 'Overline text' },
  { token: '--text-caption-tooling', sample: 'Caption tooling' },
];

const SPACE_TOKENS = [
  '--space-3xs',
  '--space-2xs',
  '--space-xs',
  '--space-sm',
  '--space-md',
  '--space-lg',
  '--space-xl',
  '--space-2xl',
  '--space-3xl',
  '--space-4xl',
  '--space-5xl',
];

export function StyleGuide() {
  return (
    <div className="style-guide">
      <header className="style-guide__header">
        <p className="style-guide__eyebrow">Internal reference — not linked in nav</p>
        <h1>Design system</h1>
        <p className="style-guide__intro">
          Live tokens and components pulled straight from the site's own CSS/source, so this page can't drift out of
          sync with what's actually shipping.
        </p>
      </header>

      <section className="style-guide__section">
        <h2>Color</h2>
        <div className="style-guide__grid style-guide__grid--colors">
          {COLOR_TOKENS.map((c) => (
            <ColorSwatch key={c.token} token={c.token} label={c.label} />
          ))}
        </div>
      </section>

      <section className="style-guide__section">
        <h2>Gradient themes (Music feature)</h2>
        <p className="style-guide__section-note">One is picked at random each time the toggle turns on.</p>
        <div className="style-guide__grid style-guide__grid--gradients">
          {GRADIENT_THEMES.map((theme) => (
            <div className="style-guide__gradient-card" key={theme.id}>
              <span
                className="style-guide__gradient-swatch"
                style={{
                  background: `linear-gradient(${theme.cssAngleDeg}deg, ${theme.cssColors[0]}, ${theme.cssColors[1]}, ${theme.cssColors[2]})`,
                }}
              />
              <code>{theme.id}</code>
              <span className="style-guide__gradient-hexes">{theme.cssColors.join(' · ')}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="style-guide__section">
        <h2>Typography</h2>
        <p className="style-guide__section-note">
          <code>--font-display</code>: Gabarito &nbsp;·&nbsp; <code>--font-mono</code>: SUSE Mono
        </p>
        <div className="style-guide__type-list">
          {TYPE_TOKENS.map((t) => (
            <TypeSample key={t.token} token={t.token} sample={t.sample} />
          ))}
        </div>
      </section>

      <section className="style-guide__section">
        <h2>Spacing scale</h2>
        <div className="style-guide__space-list">
          {SPACE_TOKENS.map((t) => (
            <SpaceBar key={t} token={t} />
          ))}
        </div>
      </section>

      <section className="style-guide__section">
        <h2>Radius &amp; motion</h2>
        <div className="style-guide__misc">
          <div className="style-guide__misc-item">
            <span className="style-guide__radius-demo" />
            <code>--radius-pill</code>
            <span>999px</span>
          </div>
          <div className="style-guide__misc-item">
            <span className="style-guide__radius-demo style-guide__radius-demo--media" />
            <code>Media card corners</code>
            <span>12px</span>
          </div>
        </div>
        <ul className="style-guide__motion-list">
          <li>
            <code>--duration-fade</code> — 0.5s
          </li>
          <li>
            <code>--duration-media</code> — 0.6s
          </li>
          <li>
            <code>--duration-sheet</code> — 0.5s
          </li>
          <li>
            <code>--ease-media</code> — cubic-bezier(0.16, 1, 0.3, 1)
          </li>
        </ul>
      </section>

      <section className="style-guide__section">
        <h2>Buttons</h2>
        <div className="style-guide__row">
          <button type="button" className="btn-pill">
            Secondary
          </button>
          <button type="button" className="btn-pill btn-pill--solid">
            Primary
          </button>
          <button type="button" className="btn-pill btn-pill--small">
            Secondary small
          </button>
          <button type="button" className="btn-pill btn-pill--solid btn-pill--small">
            Primary small
          </button>
        </div>
      </section>

      <section className="style-guide__section">
        <h2>Project tabs (hover to see the fill)</h2>
        <div className="button-pills" role="tablist">
          <button type="button" role="tab" aria-selected="true" className="button-pills__tab button-pills__tab--active">
            <span className="button-pills__tab-fill" aria-hidden="true" />
            <span className="button-pills__tab-label">Active tab</span>
          </button>
          <button type="button" role="tab" aria-selected="false" className="button-pills__tab">
            <span className="button-pills__tab-fill" aria-hidden="true" />
            <span className="button-pills__tab-label">Inactive tab</span>
          </button>
        </div>
      </section>

      <section className="style-guide__section">
        <h2>Status pill &amp; music toggle</h2>
        <div className="style-guide__row style-guide__row--center">
          <PillStatus />
          <MusicToggle />
        </div>
      </section>

      <section className="style-guide__section">
        <h2>Small atoms</h2>
        <div className="style-guide__row style-guide__row--center">
          <div className="style-guide__atom">
            <StatusDot />
            <code>StatusDot</code>
          </div>
          <div className="style-guide__atom">
            <span className="voice-note__rec-dot" />
            <code>Recording indicator</code>
            <span className="style-guide__atom-note">--color-danger, reuses status-dot-glow</span>
          </div>
          <SignalPill label="US market" />
        </div>
        <div className="style-guide__row" style={{ marginTop: 'var(--space-md)' }}>
          <ToolCredit lead="Built with" url="https://claude.com/claude-code" linkText="Claude Code" />
        </div>
      </section>

      <section className="style-guide__section">
        <h2>Navigation bar</h2>
        <div className="style-guide__frame">
          <NavigationBar />
        </div>
      </section>

      <section className="style-guide__section">
        <h2>Hero</h2>
        <div className="style-guide__frame">
          <Hero playPillIntro={false} />
        </div>
      </section>

      <section className="style-guide__section">
        <h2>Project card</h2>
        <div className="style-guide__frame style-guide__frame--start">
          <ProjectCard
            number="01"
            company="Etsy"
            year="2025"
            title="Case study title"
            meta="Discovery to launch"
            type="B2B"
            description="A short one-line summary of the case study goes here."
            image={placeholder}
          />
        </div>
      </section>

      <section className="style-guide__section">
        <h2>Footer</h2>
        <div className="style-guide__frame">
          <Footer onContactClick={() => {}} />
        </div>
      </section>

      <section className="style-guide__section">
        <h2>Not previewed here</h2>
        <p className="style-guide__section-note">
          Case-study layout components — tightly coupled to each case's own content/props, so a generic preview
          wouldn't be representative. They still draw from the same tokens above.
        </p>
        <p className="style-guide__component-list">
          CaseSheet · CasePasswordGate · CaseCloseButton · CaseVideoPlayer · CaseContentLeft · SectionTwoColumn ·
          ExtendedNarrative · Reflection · ImpactResults · ImpactResultsExperiments · TripPageHeader · ProcessStep ·
          ProcessStepsRow · FreelanceCaseContent · HeroImage · MediaVerticalCarousel · ProjectsGrid · ContactFab ·
          VoiceNoteRecorder (full flow) · LoadingScreen · CustomCursor · CursorSparkles · GradientBackground ·
          MusicVisualizerBar
        </p>
      </section>
    </div>
  );
}
