import { useEffect } from 'react';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import './CursorSparkles.css';

interface Point {
  x: number;
  y: number;
}

const STAR_ANIMATION_DURATION_MS = 1500;
const MIN_TIME_BETWEEN_STARS_MS = 250;
const MIN_DISTANCE_BETWEEN_STARS_PX = 75;
const GLOW_DURATION_MS = 75;
const MAX_GLOW_POINT_SPACING_PX = 10;
// Plain space-separated RGB.
const COLORS = ['117 99 143', '214 191 214'];
const SIZES = ['1rem', '0.75rem', '0.5rem'];
const ANIMATIONS = ['cursor-sparkle-fall-1', 'cursor-sparkle-fall-2', 'cursor-sparkle-fall-3'];

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
 * Leaves a trail of small sparkles (plus a faint glow) behind the cursor while the Music
 * feature is on, colored to match its gradient background. Fine-pointer desktops only —
 * same gating as CustomCursor — and skipped entirely under prefers-reduced-motion.
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
      wrapper.style.textShadow = `0 0 1.5rem rgb(${color} / 0.5)`;
      wrapper.style.animationName = ANIMATIONS[starCount++ % ANIMATIONS.length];
      wrapper.style.animationDuration = `${STAR_ANIMATION_DURATION_MS}ms`;
      wrapper.innerHTML = STAR_SVG;

      document.body.appendChild(wrapper);
      liveNodes.add(wrapper);

      window.setTimeout(() => {
        wrapper.remove();
        liveNodes.delete(wrapper);
      }, STAR_ANIMATION_DURATION_MS);
    };

    const createGlowPoint = (position: Point) => {
      const glow = document.createElement('div');
      glow.className = 'cursor-sparkle-glow-point';
      glow.style.left = `${position.x}px`;
      glow.style.top = `${position.y}px`;

      document.body.appendChild(glow);
      liveNodes.add(glow);

      window.setTimeout(() => {
        glow.remove();
        liveNodes.delete(glow);
      }, GLOW_DURATION_MS);
    };

    const createGlow = (last: Point, current: Point) => {
      const distance = calcDistance(last, current);
      const quantity = Math.max(Math.floor(distance / MAX_GLOW_POINT_SPACING_PX), 1);
      const dx = (current.x - last.x) / quantity;
      const dy = (current.y - last.y) / quantity;

      for (let index = 0; index < quantity; index += 1) {
        createGlowPoint({ x: last.x + dx * index, y: last.y + dy * index });
      }
    };

    const handleMove = (event: MouseEvent) => {
      const mousePosition = { x: event.clientX, y: event.clientY };

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
      window.removeEventListener('mousemove', handleMove);
      document.body.removeEventListener('mouseleave', handleLeave);
      liveNodes.forEach((node) => node.remove());
      liveNodes.clear();
    };
  }, [active, prefersReducedMotion]);

  return null;
}
