import { useEffect, useState, type CSSProperties } from 'react';
import './LoadingScreen.css';

interface LoadingScreenProps {
  visible: boolean;
  images: string[];
  durationMs?: number;
}

/**
 * Full-screen preloader: two columns of the case media images, each stacked
 * in an endless vertical loop, offset by half a cycle from one another.
 * Modeled on thomasmonavon.com's loading state (inspected live via DevTools —
 * a fixed, full-viewport, two-column marquee of project stills with a percent
 * counter), reusing our own Media images rather than a generic spinner.
 */
export function LoadingScreen({ visible, images, durationMs = 1800 }: LoadingScreenProps) {
  const [percent, setPercent] = useState(0);

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

  const track = [...images, ...images];
  const marqueeDuration = `${images.length * 900}ms`;

  return (
    <div className={`loading-screen ${visible ? '' : 'loading-screen--hidden'}`} aria-hidden={!visible}>
      <div
        className="loading-screen__columns"
        style={{ '--marquee-duration': marqueeDuration } as CSSProperties}
      >
        <div className="loading-marquee">
          <div className="loading-marquee__track">
            {track.map((src, i) => (
              <div className="loading-marquee__tile" key={i}>
                <img src={src} alt="" loading="eager" decoding="async" draggable={false} />
              </div>
            ))}
          </div>
        </div>
        <div className="loading-marquee loading-marquee--offset">
          <div className="loading-marquee__track">
            {track.map((src, i) => (
              <div className="loading-marquee__tile" key={i}>
                <img src={src} alt="" loading="eager" decoding="async" draggable={false} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <span className="loading-screen__percent">{String(displayPercent).padStart(2, '0')}%</span>
    </div>
  );
}
