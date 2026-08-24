import { useEffect, useRef } from 'react';
import { LOGO_PATHS, LOGO_VIEWBOX } from './logoPaths';
import './LogoDraw.css';

const STAGGER_MS = 90;
const SPEED = 0.55; // viewBox units per ms — controls how fast each stroke draws
const MIN_DURATION = 260;
const MAX_DURATION = 820;
const FILL_DURATION = 450;

interface LogoDrawProps {
  play: boolean;
  onTotalDuration?: (ms: number) => void;
}

/**
 * Renders the wordmark as inline SVG and animates each letter's stroke
 * in — left to right — using each path's real getTotalLength(), then fades
 * the fill in once every stroke has finished.
 */
export function LogoDraw({ play, onTotalDuration }: LogoDrawProps) {
  const pathRefs = useRef<(SVGPathElement | null)[]>([]);
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!play) return;
    const paths = pathRefs.current;
    const count = paths.length;
    let maxFinish = 0;

    paths.forEach((path, i) => {
      if (!path) return;
      const length = path.getTotalLength();
      const duration = Math.min(MAX_DURATION, Math.max(MIN_DURATION, length / SPEED));
      const sequencePosition = count - 1 - i; // paths are authored right-to-left
      const delay = sequencePosition * STAGGER_MS;

      path.style.strokeDasharray = `${length}`;
      path.style.strokeDashoffset = `${length}`;
      maxFinish = Math.max(maxFinish, delay + duration);

      requestAnimationFrame(() => {
        path.style.transition = `stroke-dashoffset ${duration}ms cubic-bezier(0.65, 0, 0.35, 1) ${delay}ms`;
        path.style.strokeDashoffset = '0';
      });
    });

    const fillDelay = maxFinish + 120;
    const svg = svgRef.current;
    const fillTimeout = window.setTimeout(() => {
      svg?.classList.add('logo-draw--filled');
    }, fillDelay);

    onTotalDuration?.(fillDelay + FILL_DURATION);

    return () => window.clearTimeout(fillTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [play]);

  return (
    <svg
      ref={svgRef}
      className="logo-draw"
      viewBox={LOGO_VIEWBOX}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Lucila Martínez"
    >
      {LOGO_PATHS.map((d, i) => (
        <path
          key={i}
          ref={(el) => {
            pathRefs.current[i] = el;
          }}
          d={d}
          className="logo-draw__path"
        />
      ))}
    </svg>
  );
}
