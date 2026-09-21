import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { GRADIENT_THEMES, pickRandomGradientTheme } from './gradientThemes';
import type { GradientTheme } from './gradientThemes';
import { useYouTubePlayer } from './useYouTubePlayer';
import type { Track } from './useYouTubePlayer';

interface MusicContextValue {
  isOn: boolean;
  toggle: () => void;
  isPlaying: boolean;
  togglePlayPause: () => void;
  track: Track | null;
  unavailable: boolean;
  /** Which of the 3 gradient looks is active — re-shuffled every time the toggle turns on. */
  gradientTheme: GradientTheme;
}

const MusicContext = createContext<MusicContextValue | null>(null);

/**
 * Provided once at the app root (above the router) so playback and the "Listening today"
 * state survive navigating into a case-study sheet — Home never unmounts across that route,
 * but the toggle/bar live above it in the tree either way.
 */
export function MusicProvider({ children }: { children: ReactNode }) {
  const [isOn, setIsOn] = useState(false);
  const [gradientTheme, setGradientTheme] = useState<GradientTheme>(GRADIENT_THEMES[0]);
  const { isPlaying, track, unavailable, playRandom, togglePlayPause, stop } = useYouTubePlayer();

  const toggle = useCallback(() => {
    setIsOn((current) => !current);
  }, []);

  useEffect(() => {
    if (isOn) {
      setGradientTheme(pickRandomGradientTheme());
      playRandom();
    } else {
      stop();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOn]);

  const value = useMemo<MusicContextValue>(
    () => ({ isOn, toggle, isPlaying, togglePlayPause, track, unavailable, gradientTheme }),
    [isOn, toggle, isPlaying, togglePlayPause, track, unavailable, gradientTheme],
  );

  return <MusicContext.Provider value={value}>{children}</MusicContext.Provider>;
}

export function useMusic(): MusicContextValue {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error('useMusic must be used within a MusicProvider');
  }
  return context;
}
