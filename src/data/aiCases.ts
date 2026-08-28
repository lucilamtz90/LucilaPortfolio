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

export const aiCases: AiCase[] = [];
