import { useEffect, useRef, useState } from 'react';
import './CaseVideoPlayer.css';

interface CaseVideoPlayerProps {
  src: string;
}

/**
 * Opt-in case-media video player: loops forever, muted, with a minimal play/pause
 * control and a progress line (no seeking, no volume/fullscreen). Used only where a
 * case section explicitly asks for it (heroImage `player: true`) — everywhere else
 * case videos keep the default autoplay/loop `Media` treatment.
 */
export function CaseVideoPlayer({ src }: CaseVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onTimeUpdate = () => {
      if (video.duration) setProgress(video.currentTime / video.duration);
    };
    video.addEventListener('timeupdate', onTimeUpdate);
    return () => video.removeEventListener('timeupdate', onTimeUpdate);
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div className="case-video-player">
      <video ref={videoRef} src={src} autoPlay loop muted playsInline className="case-video-player__video" />

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

        <div className="case-video-player__progress-track">
          <div className="case-video-player__progress-fill" style={{ transform: `scaleX(${progress})` }} />
        </div>
      </div>
    </div>
  );
}
