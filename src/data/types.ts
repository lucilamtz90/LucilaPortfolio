export type CaseSection =
  | { type: 'sectionTwoColumn'; heading: string; body: string }
  | {
      type: 'processStep';
      heading: string;
      body: string;
      body2?: string;
      image?: string;
      /** Overrides the default 321/440 frame — see heroImage's aspectRatio. */
      aspectRatio?: string;
      /** Widens the media column (and hugs the text to a comfortable reading width) for landscape media that needs more room than the default frame — opt in explicitly, since a custom aspectRatio alone doesn't mean the media should be bigger (e.g. a square diagram just needs the frame reshaped, not enlarged). */
      wideMedia?: boolean;
      /** Drops the media container's own background so a transparent-PNG asset (e.g. a diagram with no baked-in background) blends straight into the page instead of sitting in a var(--color-surface) box. */
      transparentMedia?: boolean;
    }
  | {
      type: 'processStepsRow';
      left: { heading: string; body: string; body2?: string };
      right: { heading: string; body: string; body2?: string };
    }
  | {
      type: 'heroImage';
      image: string;
      /** Opt-in custom video player (loop + play/pause + progress bar) instead of the default autoplay/loop media. Video only. */
      player?: boolean;
      /** Overrides the default 952/440 frame — use the source asset's own ratio (e.g. "2400 / 877") for images much wider or narrower than that, so object-fit:cover never crops them. */
      aspectRatio?: string;
    }
  | { type: 'impactResults'; heading: string; stats: { label: string; value: string | string[] }[] }
  | {
      type: 'impactResultsExperiments';
      heading: string;
      experiments: {
        label: string;
        image: string;
        title: string;
        body: string;
        /** Overrides the default 1/1 frame — see heroImage's aspectRatio. */
        aspectRatio?: string;
      }[];
      summary: string;
    }
  | { type: 'extendedNarrative'; heading: string; body: string }
  | { type: 'toolCredit'; lead: string; url: string }
  | { type: 'reflection'; heading: string; body: string };

export type ProjectType = 'B2B' | 'B2C';

export interface CaseData {
  slug: string;
  cardNumber: string;
  cardCompany: string;
  cardYear: string;
  cardTitle: string;
  cardMeta: string;
  cardType: ProjectType;
  heroMedia: string;
  /** Crop anchor for heroMedia in the home grid card, when its aspect ratio doesn't match the frame. Defaults to centered. */
  heroMediaPosition?: 'center' | 'top' | 'bottom';

  headerCompany: string;
  headerYear: string;
  headerTitle: string;
  headerStatus: string;
  headerMeta: string;
  headerRole: string;
  /** Where the header's "open external" icon links to. Defaults to the case's own page URL. */
  externalUrl?: string;

  sections: CaseSection[];
}

export interface AiCase {
  number: string;
  title: string;
  /** Pre-joined duration • year • tooling text, e.g. "6 weeks • 2025 • Cursor, Claude Code". */
  dateLine: string;
  /** Short one-line project summary shown under the title. */
  description: string;
  /** External URL — opens in a new tab, these don't have an internal case sheet. */
  url: string;
  /** Captured screenshot or short clip of the live interface. */
  image: string;
}
