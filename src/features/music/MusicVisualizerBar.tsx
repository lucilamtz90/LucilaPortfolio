import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useMusic } from './MusicContext';
import './MusicVisualizerBar.css';

function formatDuration(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.floor(totalSeconds % 60);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

/**
 * Full-width control bar pinned to the true top of the viewport (above CaseSheet's
 * z-index) while the Music feature is on — song name, duration and a play/pause button.
 */
export function MusicVisualizerBar() {
  const { t } = useTranslation();
  const { isOn, isPlaying, togglePlayPause, track, unavailable } = useMusic();

  // Reserves space at the top of the page so content isn't hidden under the fixed bar.
  useEffect(() => {
    document.body.classList.toggle('music-bar-active', isOn);
    return () => document.body.classList.remove('music-bar-active');
  }, [isOn]);

  return (
    <div className={`music-bar-clip ${isOn ? 'music-bar-clip--visible' : ''}`} aria-hidden={!isOn}>
      <div className={`music-bar ${isOn ? 'music-bar--visible' : ''}`}>
        <button
          type="button"
          className="music-bar__play-pause"
          onClick={togglePlayPause}
          aria-label={isPlaying ? t('a11y.pause') : t('a11y.play')}
          tabIndex={isOn ? 0 : -1}
        >
          {isPlaying ? (
            <svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor" aria-hidden="true">
              <rect x="3" y="2" width="3.5" height="12" />
              <rect x="9.5" y="2" width="3.5" height="12" />
            </svg>
          ) : (
            <svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor" aria-hidden="true">
              <path d="M3.5 2.2v11.6a.8.8 0 0 0 1.22.68l9.3-5.8a.8.8 0 0 0 0-1.36l-9.3-5.8A.8.8 0 0 0 3.5 2.2Z" />
            </svg>
          )}
        </button>
        <div className="music-bar__marquee">
          <span className="music-bar__title">
            {track ? track.title : unavailable ? t('music.unavailable') : t('music.loading')}
          </span>
        </div>
        {track && <span className="music-bar__duration">{formatDuration(track.durationSeconds)}</span>}
      </div>
    </div>
  );
}
