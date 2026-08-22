import { useEffect, useState, type CSSProperties } from 'react';
import './LoadingScreen.css';

interface LoadingScreenProps {
  visible: boolean;
  images: string[];
  durationMs?: number;
}

function shuffledIndices(length: number): number[] {
  const indices = Array.from({ length }, (_, i) => i);
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }
  return indices;
}

const STEP_MS = 220;

/**
 * Full-screen preloader: a spaced grid of the case media images, each card
 * fading/scaling in one at a time in a randomized order until the grid is
 * complete — reusing our own case images rather than a generic spinner.
 */
export function LoadingScreen({ visible, images, durationMs = 1800 }: LoadingScreenProps) {
  const [percent, setPercent] = useState(0);
  const [order] = useState(() => shuffledIndices(images.length));

  useEffect(() => {
    if (!visible) return;
    let raf: number;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      setPercent(Math.min(99, Math.round((elapsed / durationMs) * 100)));
      if (elapsed < durationMs) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(raf);
  }, [visible, durationMs]);

  const displayPercent = visible ? percent : 100;

  if (images.length === 0) return null;

  return (
    <div className={`loading-screen ${visible ? '' : 'loading-screen--hidden'}`} aria-hidden={!visible}>
      <div className="loading-grid">
        {images.map((src, i) => (
          <div
            className="loading-grid__cell"
            key={i}
            style={{ animationDelay: `${order[i] * STEP_MS}ms` } as CSSProperties}
          >
            <img src={src} alt="" loading="eager" decoding="async" draggable={false} />
          </div>
        ))}
      </div>

      <span className="loading-screen__percent">{String(displayPercent).padStart(2, '0')}%</span>
    </div>
  );
}
