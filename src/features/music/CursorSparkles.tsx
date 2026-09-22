import { useEffect } from 'react';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import './CursorSparkles.css';

interface Point {
  x: number;
  y: number;
}

// Longer-lived and spawned more densely than before, so the trail reads as a proper
// comet-like tail behind the cursor instead of a few disconnected sparkles.
const STAR_ANIMATION_DURATION_MS = 2200;
const MIN_TIME_BETWEEN_STARS_MS = 150;
const MIN_DISTANCE_BETWEEN_STARS_PX = 45;
const GLOW_DURATION_MS = 75;
const MAX_GLOW_POINT_SPACING_PX = 10;
// A fast flick can cover hundreds of px in one frame — capping the points keeps that from
// dumping dozens of nodes into the DOM at once (which is what made the cursor stutter).
const MAX_GLOW_POINTS_PER_FRAME = 6;
const SIZES = ['1rem', '0.75rem', '0.5rem'];
const ANIMATIONS = ['cursor-sparkle-fall-1', 'cursor-sparkle-fall-2', 'cursor-sparkle-fall-3'];
// Milky-white only, same across every gradient theme.
const COLORS = ['255 255 255', '250 245 235'];

const STAR_SVG =
  '<svg viewBox="0 0 24 24" fill="currentColor" width="100%" height="100%"><path d="M12 0c0 6.5 5.5 12 12 12-6.5 0-12 5.5-12 12 0-6.5-5.5-12-12-12 6.5 0 12-5.5 12-12Z"/></svg>';

function rand(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function selectRandom<T>(items: T[]): T {
  return items[rand(0, items.length - 1)];
}

function calcDistance(a: Point, b: Point): number {
  return Math.hypot(b.x - a.x, b.y - a.y);
}

interface CursorSparklesProps {
  /** Only spawns the sparkle trail while true — the Music feature's "on" state. */
  active: boolean;
}

/**
 * Leaves a trail of small milky-white sparkles (plus a faint glow) behind the cursor while
 * the Music feature is on — same shape and color for every gradient theme. Fine-pointer
 * desktops only — same gating as CustomCursor — and skipped under prefers-reduced-motion.
 */
export function CursorSparkles({ active }: CursorSparklesProps) {
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (!active || prefersReducedMotion) return;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    let starCount = 0;
    let lastStarTimestamp = Date.now();
    let lastStarPosition: Point = { x: 0, y: 0 };
    let lastMousePosition: Point = { x: 0, y: 0 };
    const liveNodes = new Set<HTMLElement>();

    const createStar = (position: Point) => {
      const wrapper = document.createElement('div');
      const color = selectRandom(COLORS);
      const size = selectRandom(SIZES);

      wrapper.className = 'cursor-sparkle-star';
      wrapper.style.left = `${position.x}px`;
      wrapper.style.top = `${position.y}px`;
      wrapper.style.fontSize = size;
      wrapper.style.color = `rgb(${color})`;
      wrapper.style.animationName = ANIMATIONS[starCount++ % ANIMATIONS.length];
      wrapper.style.animationDuration = `${STAR_ANIMATION_DURATION_MS}ms`;
      wrapper.innerHTML = STAR_SVG;

      document.body.appendChild(wrapper);
      liveNodes.add(wrapper);

      wrapper.addEventListener('animationend', () => {
        wrapper.remove();
        liveNodes.delete(wrapper);
      });
    };

    const createGlow = (last: Point, current: Point) => {
      const distance = calcDistance(last, current);
      const quantity = Math.min(
        Math.max(Math.floor(distance / MAX_GLOW_POINT_SPACING_PX), 1),
        MAX_GLOW_POINTS_PER_FRAME,
      );
      const dx = (current.x - last.x) / quantity;
      const dy = (current.y - last.y) / quantity;
      const fragment = document.createDocumentFragment();
      const batch: HTMLElement[] = [];

      for (let index = 0; index < quantity; index += 1) {
        const glow = document.createElement('div');
        glow.className = 'cursor-sparkle-glow-point';
        glow.style.left = `${last.x + dx * index}px`;
        glow.style.top = `${last.y + dy * index}px`;
        fragment.appendChild(glow);
        batch.push(glow);
        liveNodes.add(glow);
      }

      document.body.appendChild(fragment);
      window.setTimeout(() => {
        batch.forEach((glow) => {
          glow.remove();
          liveNodes.delete(glow);
        });
      }, GLOW_DURATION_MS);
    };

    // mousemove can fire several times per frame on high-polling mice; only the latest
    // position per frame matters, so the DOM work is coalesced into one rAF.
    let pendingPosition: Point | null = null;
    let rafId = 0;

    const handleMove = (event: MouseEvent) => {
      pendingPosition = { x: event.clientX, y: event.clientY };
      if (!rafId) rafId = requestAnimationFrame(flush);
    };

    const flush = () => {
      rafId = 0;
      if (!pendingPosition) return;
      const mousePosition = pendingPosition;
      pendingPosition = null;

      if (lastMousePosition.x === 0 && lastMousePosition.y === 0) {
        lastMousePosition = mousePosition;
      }

      const now = Date.now();
      const hasMovedFarEnough = calcDistance(lastStarPosition, mousePosition) >= MIN_DISTANCE_BETWEEN_STARS_PX;
      const hasBeenLongEnough = now - lastStarTimestamp > MIN_TIME_BETWEEN_STARS_MS;

      if (hasMovedFarEnough || hasBeenLongEnough) {
        createStar(mousePosition);
        lastStarTimestamp = now;
        lastStarPosition = mousePosition;
      }

      createGlow(lastMousePosition, mousePosition);
      lastMousePosition = mousePosition;
    };

    const handleLeave = () => {
      lastMousePosition = { x: 0, y: 0 };
    };

    window.addEventListener('mousemove', handleMove);
    document.body.addEventListener('mouseleave', handleLeave);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', handleMove);
      document.body.removeEventListener('mouseleave', handleLeave);
      liveNodes.forEach((node) => node.remove());
      liveNodes.clear();
    };
  }, [active, prefersReducedMotion]);

  return null;
}
