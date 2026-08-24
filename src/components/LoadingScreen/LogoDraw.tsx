import { useEffect, useRef } from 'react';
import { LOGO_PATHS, LOGO_VIEWBOX } from './logoPaths';
import './LogoDraw.css';

const WIPE_DURATION_MS = 2600;

interface LogoDrawProps {
  play: boolean;
  onTotalDuration?: (ms: number) => void;
}

/** Reveals the (already solid) wordmark left to right via a clip-path wipe. */
export function LogoDraw({ play, onTotalDuration }: LogoDrawProps) {
  const wrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!play) return;
    const el = wrapRef.current;
    const raf = requestAnimationFrame(() => {
      el?.classList.add('logo-draw--revealed');
    });

    onTotalDuration?.(WIPE_DURATION_MS);

    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [play]);

  return (
    <div ref={wrapRef} className="logo-draw">
      <svg
        className="logo-draw__svg"
        viewBox={LOGO_VIEWBOX}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Lucila Martínez"
      >
        {LOGO_PATHS.map((d, i) => (
          <path key={i} d={d} className="logo-draw__path" />
        ))}
      </svg>
    </div>
  );
}
