import { useEffect, useState } from 'react';
import { LogoDraw } from './LogoDraw';
import './LoadingScreen.css';

interface LoadingScreenProps {
  visible: boolean;
}

/**
 * Full-viewport preloader: the wordmark draws itself in stroke-by-stroke
 * (left to right, using each letter's real path length) then fills solid,
 * with a percent counter ticking alongside it.
 */
export function LoadingScreen({ visible }: LoadingScreenProps) {
  const [percent, setPercent] = useState(0);
  const [durationMs, setDurationMs] = useState(2600);

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

  return (
    <div className={`loading-screen ${visible ? '' : 'loading-screen--hidden'}`} aria-hidden={!visible}>
      <LogoDraw play={visible} onTotalDuration={setDurationMs} />
      <span className="loading-screen__percent">{String(displayPercent).padStart(2, '0')}%</span>
    </div>
  );
}
