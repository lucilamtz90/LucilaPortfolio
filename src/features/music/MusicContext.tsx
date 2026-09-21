import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { useYouTubePlayer } from './useYouTubePlayer';
import type { Track } from './useYouTubePlayer';

interface MusicContextValue {
  isOn: boolean;
  toggle: () => void;
  isPlaying: boolean;
  togglePlayPause: () => void;
  track: Track | null;
  unavailable: boolean;
}

const MusicContext = createContext<MusicContextValue | null>(null);

/**
 * Provided once at the app root (above the router) so playback and the "Listening today"
 * state survive navigating into a case-study sheet — Home never unmounts across that route,
 * but the toggle/bar live above it in the tree either way.
 */
export function MusicProvider({ children }: { children: ReactNode }) {
  const [isOn, setIsOn] = useState(false);
  const { isPlaying, track, unavailable, playRandom, togglePlayPause, stop } = useYouTubePlayer();

  const toggle = useCallback(() => {
    setIsOn((current) => !current);
  }, []);

  useEffect(() => {
    if (isOn) {
      playRandom();
    } else {
      stop();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOn]);

  const value = useMemo<MusicContextValue>(
    () => ({ isOn, toggle, isPlaying, togglePlayPause, track, unavailable }),
    [isOn, toggle, isPlaying, togglePlayPause, track, unavailable],
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
