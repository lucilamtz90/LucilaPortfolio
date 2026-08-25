import { useEffect, useRef, useState } from 'react';
import './CustomCursor.css';

const IDLE_DELAY_MS = 150;

/**
 * Site-wide custom cursor: a solid dot while the pointer is moving, dissolving into a
 * blinking text-caret once it settles. Desktop (fine pointer + hover) only. Leaves the
 * hand cursor on Home's interactive media cards untouched — see Media.css.
 */
export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia('(hover: hover) and (pointer: fine)');
    const update = () => setEnabled(mql.matches);
    update();
    mql.addEventListener('change', update);
    return () => mql.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const cursor = cursorRef.current;
    if (!cursor) return;

    document.documentElement.classList.add('custom-cursor-active');

    let idleTimer: number | undefined;

    const setMoving = (moving: boolean) => {
      cursor.classList.toggle('custom-cursor--moving', moving);
      cursor.classList.toggle('custom-cursor--idle', !moving);
    };

    const handleMove = (e: MouseEvent) => {
      cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      cursor.classList.remove('custom-cursor--hidden');

      const overInteractiveMedia = Boolean((e.target as Element | null)?.closest('.media-container--interactive'));
      cursor.classList.toggle('custom-cursor--suppressed', overInteractiveMedia);

      setMoving(true);
      window.clearTimeout(idleTimer);
      idleTimer = window.setTimeout(() => setMoving(false), IDLE_DELAY_MS);
    };

    const handleLeaveWindow = () => cursor.classList.add('custom-cursor--hidden');

    window.addEventListener('mousemove', handleMove);
    document.documentElement.addEventListener('mouseleave', handleLeaveWindow);

    return () => {
      document.documentElement.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', handleMove);
      document.documentElement.removeEventListener('mouseleave', handleLeaveWindow);
      window.clearTimeout(idleTimer);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div ref={cursorRef} className="custom-cursor custom-cursor--idle custom-cursor--hidden" aria-hidden="true">
      <span className="custom-cursor__circle" />
      <span className="custom-cursor__caret" />
    </div>
  );
}
