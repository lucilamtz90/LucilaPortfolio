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
      experiments: { label: string; image: string; title: string; body: string }[];
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
