import { useEffect, useRef, useState } from 'react';
import { useInView } from '../../hooks/useInView';
import './CaseVideoPlayer.css';

interface CaseVideoPlayerProps {
  src: string;
}

const SEEK_STEP_SECONDS = 5;

/**
 * Opt-in case-media video player: loops forever, muted, starts playing once it
 * scrolls into view, with a minimal play/pause control and a seekable progress
 * line (drag, click, or arrow keys — no volume/fullscreen). Used only where a case
 * section explicitly asks for it (heroImage `player: true`) — everywhere else case
 * videos keep the default autoplay/loop `Media` treatment.
 */
export function CaseVideoPlayer({ src }: CaseVideoPlayerProps) {
  const { ref: containerRef, isInView } = useInView<HTMLDivElement>();
  const videoRef = useRef<HTMLVideoElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onTimeUpdate = () => {
      if (video.duration) setProgress(video.currentTime / video.duration);
    };
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);

    video.addEventListener('timeupdate', onTimeUpdate);
    video.addEventListener('play', onPlay);
    video.addEventListener('pause', onPause);
    return () => {
      video.removeEventListener('timeupdate', onTimeUpdate);
      video.removeEventListener('play', onPlay);
      video.removeEventListener('pause', onPause);
    };
  }, []);

  useEffect(() => {
    if (isInView) videoRef.current?.play().catch(() => {});
  }, [isInView]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) video.play();
    else video.pause();
  };

  const seekToClientX = (clientX: number) => {
    const track = trackRef.current;
    const video = videoRef.current;
    if (!track || !video || !video.duration) return;
    const rect = track.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
    video.currentTime = ratio * video.duration;
    setProgress(ratio);
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    draggingRef.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    seekToClientX(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    seekToClientX(e.clientX);
  };

  const stopDragging = () => {
    draggingRef.current = false;
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const video = videoRef.current;
    if (!video || !video.duration) return;
    if (e.key === 'ArrowRight') {
      video.currentTime = Math.min(video.duration, video.currentTime + SEEK_STEP_SECONDS);
    } else if (e.key === 'ArrowLeft') {
      video.currentTime = Math.max(0, video.currentTime - SEEK_STEP_SECONDS);
    }
  };

  return (
    <div className="case-video-player" ref={containerRef}>
      <video ref={videoRef} src={src} loop muted playsInline className="case-video-player__video" />

      <div className="case-video-player__controls">
        <button
          type="button"
          className="case-video-player__play-btn"
          onClick={togglePlay}
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? (
            <svg viewBox="0 0 16 16" width="12" height="12" aria-hidden="true">
              <rect x="3" y="2" width="3.2" height="12" rx="1" fill="currentColor" />
              <rect x="9.8" y="2" width="3.2" height="12" rx="1" fill="currentColor" />
            </svg>
          ) : (
            <svg viewBox="0 0 16 16" width="12" height="12" aria-hidden="true">
              <path d="M4 2.3v11.4l10-5.7-10-5.7z" fill="currentColor" />
            </svg>
          )}
        </button>

        <div
          ref={trackRef}
          className="case-video-player__progress-hit"
          role="slider"
          tabIndex={0}
          aria-label="Video progress"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(progress * 100)}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={stopDragging}
          onPointerCancel={stopDragging}
          onKeyDown={handleKeyDown}
        >
          <div className="case-video-player__progress-track">
            <div className="case-video-player__progress-fill" style={{ transform: `scaleX(${progress})` }} />
          </div>
        </div>
      </div>
    </div>
  );
}
