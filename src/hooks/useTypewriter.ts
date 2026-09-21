import { useEffect, useState } from 'react';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

interface UseTypewriterOptions {
  /** Total time (ms) to type out each phrase — per-character delay scales with its length. */
  typeDurationMs?: number;
  /** How long (ms) the fully-typed phrase stays on screen before it starts deleting. */
  pauseMs?: number;
  /** Total time (ms) to delete each phrase before typing the next one. */
  deleteDurationMs?: number;
  /** Skips the animation entirely and shows the first phrase statically — same behavior
   * as prefers-reduced-motion. Used to turn the effect off on mobile. */
  disabled?: boolean;
}

const DEFAULT_TYPE_DURATION_MS = 4000;
const DEFAULT_PAUSE_MS = 2000;
const DEFAULT_DELETE_DURATION_MS = 1200;

/** Cycles through `phrases`, typing and deleting one character at a time, looping forever.
 * Renders the first phrase statically (no animation) when the user prefers reduced motion. */
export function useTypewriter(phrases: string[], options: UseTypewriterOptions = {}) {
  const {
    typeDurationMs = DEFAULT_TYPE_DURATION_MS,
    pauseMs = DEFAULT_PAUSE_MS,
    deleteDurationMs = DEFAULT_DELETE_DURATION_MS,
    disabled = false,
  } = options;
  const prefersReducedMotion = usePrefersReducedMotion();
  const skipAnimation = prefersReducedMotion || disabled;
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [text, setText] = useState('');

  useEffect(() => {
    if (skipAnimation) {
      setText(phrases[0] ?? '');
      return;
    }
    if (phrases.length === 0) return;

    let cancelled = false;
    const timeouts: number[] = [];
    const schedule = (fn: () => void, delay: number) => {
      timeouts.push(
        window.setTimeout(() => {
          if (!cancelled) fn();
        }, delay),
      );
    };

    const phrase = phrases[phraseIndex % phrases.length];
    const charTypeDelay = typeDurationMs / Math.max(phrase.length, 1);
    const charDeleteDelay = deleteDurationMs / Math.max(phrase.length, 1);

    let typed = 0;
    const typeStep = () => {
      typed += 1;
      setText(phrase.slice(0, typed));
      if (typed < phrase.length) {
        schedule(typeStep, charTypeDelay);
      } else {
        schedule(deleteStep, pauseMs);
      }
    };

    let remaining = phrase.length;
    const deleteStep = () => {
      remaining -= 1;
      setText(phrase.slice(0, Math.max(remaining, 0)));
      if (remaining > 0) {
        schedule(deleteStep, charDeleteDelay);
      } else {
        setPhraseIndex((prev) => (prev + 1) % phrases.length);
      }
    };

    schedule(typeStep, charTypeDelay);

    return () => {
      cancelled = true;
      timeouts.forEach((id) => window.clearTimeout(id));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phraseIndex, phrases, skipAnimation]);

  return { text, isAnimating: !skipAnimation };
}
