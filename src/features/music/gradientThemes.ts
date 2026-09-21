export type SparkleShape = 'sparkle' | 'heart' | 'moon';

export interface GradientTheme {
  id: string;
  /** WebGPU shader gradient stops (0–1 floats), passed straight into renderGradientFrame's
   * `params.gradient.stops`. */
  stops: { position: number; color: { r: number; g: number; b: number; a: number } }[];
  /** Slower/faster morph (WGSL `u.morphSpeed`) and rotation (`u.rotationSpeed`, 0–100%) —
   * kept distinct per theme so each reads as having its own pace, not just its own colors. */
  morphSpeed: number;
  rotationSpeedPercent: number;
  /** 0 = Height, 1 = Noise, 2 = Facing — see gradientRenderer.ts's objectGradientCoordinate.
   * Using a different one per theme changes how color flows across the shape, not just when. */
  gradientMethod: 0 | 1 | 2;
  /** CSS fallback (non-WebGPU browsers, and always on mobile — see GradientBackground.tsx). */
  cssColors: [string, string, string];
  cssAngleDeg: number;
  cssDriftDurationS: number;
  /** Cursor sparkle trail colors ("r g b", space-separated) and glyph shape — chosen to
   * contrast against this theme's own palette rather than reuse its hues. */
  sparkleColors: [string, string];
  sparkleShape: SparkleShape;
}

export const GRADIENT_THEMES: GradientTheme[] = [
  {
    id: 'lavender',
    stops: [
      { position: 0, color: { r: 0.4588235294117647, g: 0.38823529411764707, b: 0.5607843137254902, a: 1 } },
      { position: 0.5, color: { r: 0.6588235294117647, g: 0.5098039215686274, b: 0.6784313725490196, a: 1 } },
      { position: 1, color: { r: 0.8392156862745098, g: 0.7490196078431373, b: 0.8392156862745098, a: 1 } },
    ],
    morphSpeed: 3.74,
    rotationSpeedPercent: 12,
    gradientMethod: 0,
    cssColors: ['#75638f', '#a882ad', '#d6bfd6'],
    cssAngleDeg: 120,
    cssDriftDurationS: 18,
    sparkleColors: ['237 105 150', '100 130 250'],
    sparkleShape: 'sparkle',
  },
  {
    id: 'teal',
    stops: [
      { position: 0, color: { r: 0.14509803921568626, g: 0.34901960784313724, b: 0.33725490196078434, a: 1 } },
      { position: 0.5, color: { r: 0.5098039215686274, g: 0.5686274509803921, b: 0.5411764705882353, a: 1 } },
      { position: 1, color: { r: 0.6784313725490196, g: 0.47058823529411764, b: 0.5019607843137255, a: 1 } },
    ],
    morphSpeed: 1.4,
    rotationSpeedPercent: 5,
    gradientMethod: 1,
    cssColors: ['#255956', '#82918a', '#ad7880'],
    cssAngleDeg: 200,
    cssDriftDurationS: 30,
    sparkleColors: ['240 200 120', '224 110 130'],
    sparkleShape: 'heart',
  },
  {
    id: 'ember',
    stops: [
      { position: 0, color: { r: 0.6196078431372549, g: 0.07058823529411765, b: 0.14901960784313725, a: 1 } },
      { position: 0.5, color: { r: 0.8980392156862745, g: 0.4392156862745098, b: 0.3686274509803921, a: 1 } },
      { position: 1, color: { r: 0.9490196078431372, g: 0.6980392156862745, b: 0.3686274509803921, a: 1 } },
    ],
    morphSpeed: 2.0,
    rotationSpeedPercent: 7,
    gradientMethod: 2,
    cssColors: ['#9e1226', '#e5705e', '#f2b25e'],
    cssAngleDeg: 40,
    cssDriftDurationS: 24,
    sparkleColors: ['150 200 230', '90 70 140'],
    sparkleShape: 'moon',
  },
];

export function pickRandomGradientTheme(): GradientTheme {
  return GRADIENT_THEMES[Math.floor(Math.random() * GRADIENT_THEMES.length)];
}
