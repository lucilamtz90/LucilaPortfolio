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
  | {
      type: 'toolCredit';
      lead: string;
      url: string;
      /** Opt-in plain-link mode: renders `url` as an inline underlined link reading this text, instead of the
       * default icon + embedded iframe demo. Use for links that can't be embedded (e.g. social posts). */
      linkText?: string;
    }
  | { type: 'reflection'; heading: string; body: string };

export type ProjectType = 'B2B' | 'B2C';

/** Fields TripPageHeader needs — shared by both standard case studies (CaseData) and Freelance cases. */
export interface CaseHeaderData {
  headerCompany: string;
  headerYear: string;
  headerTitle: string;
  headerStatus: string;
  headerMeta: string;
  headerRole: string;
  /** Overrides the translated "at"/"en" word joining role and company — pass a raw string (e.g. a single
   * space) when the pair reads as one continuous phrase instead of "role at company" (e.g. "Freelance Designer"). */
  headerRoleConnector?: string;
  /** Category tags shown as pills under the title (e.g. "Photo & Video", "Branding") — omit or leave empty to hide the row. */
  headerSignals?: string[];
  /** Where the header's "open external" icon links to. Defaults to the case's own page URL. */
  externalUrl?: string;
  /** Image/video shared via the header's share action. */
  heroMedia: string;
}

export interface CaseData extends CaseHeaderData {
  slug: string;
  cardNumber: string;
  cardCompany: string;
  cardYear: string;
  cardTitle: string;
  cardMeta: string;
  cardType: ProjectType;
  /** Crop anchor for heroMedia in the home grid card, when its aspect ratio doesn't match the frame. Defaults to centered. */
  heroMediaPosition?: 'center' | 'top' | 'bottom';

  sections: CaseSection[];
}

/** One heading + body block in a Freelance case's fixed left column — same shape as the extendedNarrative section. */
export interface FreelanceNarrative {
  heading: string;
  body: string;
}

/** One image/video in a Freelance case's scrolling right column. */
export interface FreelanceMedia {
  src: string;
  /** e.g. "396 / 551" — sets the item's height, since media assets vary in height here (unlike the site's other fixed-frame media). */
  aspectRatio: string;
}

/** A Freelance case: same header + overlay as a standard case study, but its body is a fixed narrative column
 * beside a vertically scrolling media column instead of a linear section stack — see FreelanceCaseContent. */
export interface FreelanceCase extends CaseHeaderData {
  slug: string;
  cardNumber: string;
  /** Pre-joined date-line text (e.g. "Branding design • 2026"), same convention as AiCase.dateLine. */
  dateLine: string;
  cardTitle: string;
  /** Short one-line project summary shown under the title on the Home card. */
  description: string;
  heroMediaPosition?: 'center' | 'top' | 'bottom';

  narratives: FreelanceNarrative[];
  credit: {
    lead: string;
    url: string;
    /** Plain-link mode (see ToolCredit's `linkText` prop) — omit to embed `url` in an iframe instead. */
    linkText?: string;
    /** Overrides the embed frame's default 4/3 ratio — e.g. "9 / 16" for a portrait embed like an Instagram Reel. */
    aspectRatio?: string;
    /** Drops the icon and lead text (see ToolCredit's `mediaOnly` prop) — for a social video embedded
     * directly from its own URL, which already carries its own caption/attribution chrome. */
    mediaOnly?: boolean;
  };
  media: FreelanceMedia[];
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
