import { useEffect, useRef, useState } from 'react';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import './CustomCursor.css';

const IDLE_DELAY_MS = 150;
// How much of the remaining gap to the real pointer the dot closes per frame —
// lower = more lag/glide before it catches up (houseofyellow.nl-style chase).
const FOLLOW_SMOOTHING = 0.15;

/**
 * Site-wide custom cursor: a solid dot while the pointer is moving, dissolving into a
 * blinking text-caret once it settles. Desktop (fine pointer + hover) only. Leaves the
 * hand cursor on Home's interactive media cards untouched — see Media.css.
 *
 * The dot doesn't snap straight to the pointer: it chases the real position each
 * animation frame (lerp), which is what gives it that trailing, slightly magnetic feel.
 */
export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

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
    let rafId: number;
    let targetX = -100;
    let targetY = -100;
    let currentX = -100;
    let currentY = -100;
    let hasPosition = false;

    const setMoving = (moving: boolean) => {
      cursor.classList.toggle('custom-cursor--moving', moving);
      cursor.classList.toggle('custom-cursor--idle', !moving);
    };

    const tick = () => {
      if (prefersReducedMotion) {
        currentX = targetX;
        currentY = targetY;
      } else {
        currentX += (targetX - currentX) * FOLLOW_SMOOTHING;
        currentY += (targetY - currentY) * FOLLOW_SMOOTHING;
      }
      cursor.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    const handleMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!hasPosition) {
        // Snap on the very first move instead of gliding in from off-screen.
        currentX = targetX;
        currentY = targetY;
        hasPosition = true;
      }
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
      cancelAnimationFrame(rafId);
    };
  }, [enabled, prefersReducedMotion]);

  if (!enabled) return null;

  return (
    <div ref={cursorRef} className="custom-cursor custom-cursor--idle custom-cursor--hidden" aria-hidden="true">
      <span className="custom-cursor__circle" />
      <span className="custom-cursor__caret" />
    </div>
  );
}
