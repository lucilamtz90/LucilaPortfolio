import { useCallback, useEffect, useRef, useState } from 'react';
import { MUSIC_PLAYLIST_ID } from './youtubePlaylist';

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady?: () => void;
  }
}

let apiPromise: Promise<void> | null = null;

/** Loads the YouTube IFrame API script at most once, however many players ask for it. */
function loadYouTubeIframeApi(): Promise<void> {
  if (apiPromise) return apiPromise;

  apiPromise = new Promise((resolve) => {
    if (window.YT?.Player) {
      resolve();
      return;
    }

    const previousCallback = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      previousCallback?.();
      resolve();
    };

    const script = document.createElement('script');
    script.src = 'https://www.youtube.com/iframe_api';
    document.head.appendChild(script);
  });

  return apiPromise;
}

export interface Track {
  title: string;
  artist: string;
  durationSeconds: number;
}

/** YouTube Music auto-uploads name their channel "<Artist> - Topic" — strip that suffix
 * so the bar shows a plain artist name. */
function cleanArtistName(author: string): string {
  return author.replace(/\s*-\s*Topic$/i, '').trim();
}

export interface YouTubePlayerControls {
  isReady: boolean;
  isPlaying: boolean;
  track: Track | null;
  /** True once every retry has been exhausted without finding a playable track — e.g. the
   * playlist is private/unlisted (unreachable anonymously) or every item blocks embedding. */
  unavailable: boolean;
  /** Loads the player (if needed) and starts a random track from the playlist. */
  playRandom: () => void;
  togglePlayPause: () => void;
  stop: () => void;
}

const MAX_TRACK_ATTEMPTS = 5;
const PLAYLIST_LOAD_TIMEOUT_MS = 8000;

/**
 * Wraps a hidden YouTube IFrame player cued to the Music feature's playlist.
 *
 * The player's host element is created and appended imperatively (never through JSX) and
 * handed to `YT.Player` as a real DOM node. The IFrame API replaces whatever element it's
 * given with its own <iframe>, mutating the DOM outside of React — if that element were a
 * React-rendered child instead, the next time React reconciled that subtree it would find a
 * different node than the one it committed and throw (`insertBefore`/`removeChild` errors),
 * which also broke the visualizer bar's own re-render. Keeping the host node entirely outside
 * React's tree avoids that conflict.
 */
export function useYouTubePlayer(): YouTubePlayerControls {
  const playerRef = useRef<any>(null);
  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [track, setTrack] = useState<Track | null>(null);
  const [unavailable, setUnavailable] = useState(false);
  const pendingPlayRandom = useRef(false);
  const attemptCount = useRef(0);
  const pendingUnmute = useRef(false);

  const readTrackInfo = useCallback(() => {
    const player = playerRef.current;
    if (!player) return;
    const data = player.getVideoData?.();
    const duration = player.getDuration?.();
    if (data?.title && typeof duration === 'number' && duration > 0) {
      setTrack({
        title: data.title,
        artist: data.author ? cleanArtistName(data.author) : '',
        durationSeconds: duration,
      });
      setUnavailable(false);
      attemptCount.current = 0;
    }
  }, []);

  const playRandomTrack = useCallback(() => {
    const player = playerRef.current;
    const playlist: unknown[] = player?.getPlaylist?.() ?? [];
    if (!player || playlist.length === 0) {
      // Player isn't constructed yet, or its playlist metadata hasn't loaded — retry
      // shortly instead of silently dropping the request (this covers turning the
      // toggle on before the IFrame API script has even finished loading, and a playlist
      // that's private/unlisted and never loads at all).
      pendingPlayRandom.current = true;
      return;
    }
    pendingPlayRandom.current = false;
    setUnavailable(false);
    const randomIndex = Math.floor(Math.random() * playlist.length);
    // Browsers reliably allow autoplay when it starts muted, but are inconsistent about
    // unmuted autoplay unless the play() call is tightly bound to a user gesture — which it
    // often isn't here (this can run from a retry timer while the playlist finishes
    // loading). Starting muted and unmuting the instant playback actually begins gets
    // automatic playback working reliably without ever leaving the toggle silently "on".
    player.mute();
    player.playVideoAt(randomIndex);
    pendingUnmute.current = true;
  }, []);

  useEffect(() => {
    let cancelled = false;
    let retryTimer: ReturnType<typeof setInterval> | null = null;
    let unavailableTimer: ReturnType<typeof setTimeout> | null = null;
    const host = document.createElement('div');
    host.style.cssText = 'position:fixed;bottom:0;left:0;width:1px;height:1px;opacity:0;pointer-events:none;overflow:hidden;';
    document.body.appendChild(host);

    loadYouTubeIframeApi().then(() => {
      if (cancelled) return;

      playerRef.current = new window.YT.Player(host, {
        host: 'https://www.youtube.com',
        playerVars: {
          listType: 'playlist',
          list: MUSIC_PLAYLIST_ID,
          controls: 0,
          disablekb: 1,
          modestbranding: 1,
        },
        events: {
          onReady: () => {
            if (cancelled) return;
            setIsReady(true);
            // Keeps playback shuffled for the whole session — once the current track
            // ends, the player auto-advances to a random one instead of the next in
            // playlist order.
            playerRef.current?.setShuffle?.(true);
            if (pendingPlayRandom.current) playRandomTrack();
          },
          onStateChange: (event: { data: number }) => {
            if (cancelled) return;
            const PLAYING = 1;
            const PAUSED = 2;
            setIsPlaying(event.data === PLAYING);
            if (event.data === PLAYING || event.data === PAUSED) readTrackInfo();
            if (event.data === PLAYING && pendingUnmute.current) {
              pendingUnmute.current = false;
              playerRef.current?.unMute?.();
            }
          },
          onError: () => {
            if (cancelled) return;
            // The chosen track can't play (embedding disabled, region-locked, etc.) —
            // try a different random one instead of getting stuck, up to a small cap.
            attemptCount.current += 1;
            if (attemptCount.current >= MAX_TRACK_ATTEMPTS) {
              setUnavailable(true);
              return;
            }
            playRandomTrack();
          },
        },
      });

      // If a play request is pending but the playlist never loads at all (e.g. it's
      // private/unlisted and unreachable anonymously), stop waiting after a while.
      unavailableTimer = setTimeout(() => {
        if (!cancelled && pendingPlayRandom.current) setUnavailable(true);
      }, PLAYLIST_LOAD_TIMEOUT_MS);

      retryTimer = setInterval(() => {
        if (pendingPlayRandom.current) playRandomTrack();
      }, 400);
    });

    return () => {
      cancelled = true;
      if (retryTimer) clearInterval(retryTimer);
      if (unavailableTimer) clearTimeout(unavailableTimer);
      playerRef.current?.destroy?.();
      playerRef.current = null;
      host.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const togglePlayPause = useCallback(() => {
    const player = playerRef.current;
    if (!player) return;
    if (isPlaying) {
      player.pauseVideo();
    } else {
      player.playVideo();
    }
  }, [isPlaying]);

  const stop = useCallback(() => {
    playerRef.current?.stopVideo?.();
    setIsPlaying(false);
    setTrack(null);
    setUnavailable(false);
    attemptCount.current = 0;
    pendingPlayRandom.current = false;
    pendingUnmute.current = false;
  }, []);

  return { isReady, isPlaying, track, unavailable, playRandom: playRandomTrack, togglePlayPause, stop };
}
