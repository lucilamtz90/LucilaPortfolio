export type CaseSection =
  | { type: 'sectionTwoColumn'; heading: string; body: string }
  | { type: 'processStep'; heading: string; body: string; body2?: string; image?: string }
  | {
      type: 'processStepsRow';
      left: { heading: string; body: string; body2?: string };
      right: { heading: string; body: string; body2?: string };
    }
  | { type: 'heroImage'; image: string }
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

  sections: CaseSection[];
}
