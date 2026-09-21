import { useEffect, useRef, useState } from 'react';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { createGradientRenderer } from './gradientRenderer';
import type { GradientTheme } from './gradientThemes';
import './GradientBackground.css';

interface GradientRenderer {
  start: () => void;
  stop: () => void;
  setParams: (params: unknown) => void;
  destroy: () => void;
}

interface GradientBackgroundProps {
  /** Whether the background should be visible (dissolved in) right now. */
  active: boolean;
  /** Which of the 3 gradient looks (colors, motion, direction) to render right now. */
  theme: GradientTheme;
}

/** Matches the `params` shape renderGradientFrame (gradientRenderer.ts) reads per frame. */
function themeToShaderParams(theme: GradientTheme) {
  return {
    gradient: { stops: theme.stops },
    morphSpeed: theme.morphSpeed,
    rotationSpeed: theme.rotationSpeedPercent,
    gradientMethod: theme.gradientMethod,
  };
}

/**
 * Full-viewport background behind the whole site. Renders the ported "Moving gradient"
 * WebGPU shader when supported, otherwise falls back to a CSS animated gradient using the
 * same palette. Both are always mounted, stacked: the canvas starts fully transparent and
 * only becomes visually opaque once real frames are being drawn, so the CSS fallback shows
 * through underneath whenever WebGPU is unsupported OR support is merely feature-detected
 * but adapter/device creation actually fails (e.g. hardware acceleration disabled) — that
 * failure is only known asynchronously, so it can't be decided up front.
 */
export function GradientBackground({ active, theme }: GradientBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rendererRef = useRef<GradientRenderer | null>(null);
  const [rendererReady, setRendererReady] = useState(false);
  // The shader is a 76k-vertex mesh redrawn every frame with 4x MSAA — costly enough that
  // it can visibly lag lower-powered phones. Desktop only; mobile always gets the cheap
  // CSS fallback below instead.
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  useEffect(() => {
    if (!canvasRef.current || !isDesktop) return;

    let cancelled = false;
    createGradientRenderer(canvasRef.current).then((renderer) => {
      if (cancelled || !renderer) return;
      rendererRef.current = renderer;
      setRendererReady(true);
    });

    return () => {
      cancelled = true;
      rendererRef.current?.destroy();
      rendererRef.current = null;
      setRendererReady(false);
    };
  }, [isDesktop]);

  useEffect(() => {
    if (!rendererReady) return;
    if (active) {
      rendererRef.current?.start();
    } else {
      rendererRef.current?.stop();
    }
  }, [active, rendererReady]);

  useEffect(() => {
    if (!rendererReady) return;
    rendererRef.current?.setParams(themeToShaderParams(theme));
  }, [theme, rendererReady]);

  // Lets the shader/CSS gradient show through — the site's own background is otherwise
  // opaque (see body { background } in global.css).
  useEffect(() => {
    document.body.classList.toggle('music-background-active', active);
    return () => document.body.classList.remove('music-background-active');
  }, [active]);

  return (
    <div
      className={`gradient-background ${active ? 'gradient-background--active' : ''}`}
      aria-hidden="true"
      style={
        {
          '--gradient-angle': `${theme.cssAngleDeg}deg`,
          '--gradient-color-1': theme.cssColors[0],
          '--gradient-color-2': theme.cssColors[1],
          '--gradient-color-3': theme.cssColors[2],
          '--gradient-drift-duration': `${theme.cssDriftDurationS}s`,
        } as React.CSSProperties
      }
    >
      <div className="gradient-background__css-fallback" />
      {/* Mobile only (see GradientBackground.css) — a tiny, GPU-composited noise tile
          gives the flat CSS gradient some texture/movement without the cost of a real
          animated shader, which is exactly what mobile skips above. */}
      <div className="gradient-background__noise" />
      <canvas ref={canvasRef} className="gradient-background__canvas" />
    </div>
  );
}
