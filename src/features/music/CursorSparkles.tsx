import { useEffect } from 'react';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import type { SparkleShape } from './gradientThemes';
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
const SIZES = ['1rem', '0.75rem', '0.5rem'];
const ANIMATIONS = ['cursor-sparkle-fall-1', 'cursor-sparkle-fall-2', 'cursor-sparkle-fall-3'];

const SHAPE_SVG: Record<SparkleShape, string> = {
  sparkle:
    '<svg viewBox="0 0 24 24" fill="currentColor" width="100%" height="100%"><path d="M12 0c0 6.5 5.5 12 12 12-6.5 0-12 5.5-12 12 0-6.5-5.5-12-12-12 6.5 0 12-5.5 12-12Z"/></svg>',
  heart:
    '<svg viewBox="0 0 24 24" fill="currentColor" width="100%" height="100%"><path d="M12 21s-6.72-4.35-9.3-8.28C1.1 10.5 1.6 7.4 4.2 5.9c2.1-1.2 4.6-.6 5.9 1.2L12 9l1.9-1.9c1.3-1.8 3.8-2.4 5.9-1.2 2.6 1.5 3.1 4.6 1.5 6.82C18.7 16.65 12 21 12 21Z"/></svg>',
  // Waning crescent: a large disc with a smaller, offset disc subtracted from it.
  moon:
    '<svg viewBox="0 0 24 24" fill="currentColor" width="100%" height="100%"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z"/></svg>',
};

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
  /** Sparkle colors, as "r g b" space-separated strings — picked to contrast against the
   * current gradient theme's own palette. */
  colors: [string, string];
  /** Which glyph the trail draws — varies per gradient theme. */
  shape: SparkleShape;
}

/**
 * Leaves a trail of small sparkles (plus a faint glow) behind the cursor while the Music
 * feature is on, colored/shaped to match the active gradient theme. Fine-pointer desktops
 * only — same gating as CustomCursor — and skipped entirely under prefers-reduced-motion.
 */
export function CursorSparkles({ active, colors, shape }: CursorSparklesProps) {
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (!active || prefersReducedMotion) return;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    const shapeSvg = SHAPE_SVG[shape];
    let starCount = 0;
    let lastStarTimestamp = Date.now();
    let lastStarPosition: Point = { x: 0, y: 0 };
    let lastMousePosition: Point = { x: 0, y: 0 };
    const liveNodes = new Set<HTMLElement>();

    const createStar = (position: Point) => {
      const wrapper = document.createElement('div');
      const color = selectRandom(colors);
      const size = selectRandom(SIZES);

      wrapper.className = 'cursor-sparkle-star';
      wrapper.style.left = `${position.x}px`;
      wrapper.style.top = `${position.y}px`;
      wrapper.style.fontSize = size;
      wrapper.style.color = `rgb(${color})`;
      wrapper.style.textShadow = `0 0 1.5rem rgb(${color} / 0.5)`;
      wrapper.style.animationName = ANIMATIONS[starCount++ % ANIMATIONS.length];
      wrapper.style.animationDuration = `${STAR_ANIMATION_DURATION_MS}ms`;
      wrapper.innerHTML = shapeSvg;

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
      glow.style.background = `rgb(${colors[0]} / 0.6)`;

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
  }, [active, prefersReducedMotion, colors, shape]);

  return null;
}
