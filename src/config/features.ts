/**
 * Feature flags for functionality that exists in the codebase but is
 * explicitly out of scope for V1 per the project brief. Flip to `true`
 * once the feature is ready to ship.
 */
export const features = {
  voiceNote: false,
  aiCaseDistinctLayout: false,
  videoOverlay: false,
} as const;
