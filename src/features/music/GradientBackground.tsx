import { useEffect, useRef, useState } from 'react';
import { createGradientRenderer } from './gradientRenderer';
import './GradientBackground.css';

interface GradientRenderer {
  start: () => void;
  stop: () => void;
  destroy: () => void;
}

interface GradientBackgroundProps {
  /** Whether the background should be visible (dissolved in) right now. */
  active: boolean;
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
export function GradientBackground({ active }: GradientBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rendererRef = useRef<GradientRenderer | null>(null);
  const [rendererReady, setRendererReady] = useState(false);

  useEffect(() => {
    if (!canvasRef.current) return;

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
    };
  }, []);

  useEffect(() => {
    if (!rendererReady) return;
    if (active) {
      rendererRef.current?.start();
    } else {
      rendererRef.current?.stop();
    }
  }, [active, rendererReady]);

  // Lets the shader/CSS gradient show through — the site's own background is otherwise
  // opaque (see body { background } in global.css).
  useEffect(() => {
    document.body.classList.toggle('music-background-active', active);
    return () => document.body.classList.remove('music-background-active');
  }, [active]);

  return (
    <div className={`gradient-background ${active ? 'gradient-background--active' : ''}`} aria-hidden="true">
      <div className="gradient-background__css-fallback" />
      <canvas ref={canvasRef} className="gradient-background__canvas" />
    </div>
  );
}
