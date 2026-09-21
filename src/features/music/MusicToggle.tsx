import { useTranslation } from 'react-i18next';
import { useMusic } from './MusicContext';
import './MusicToggle.css';

interface MusicToggleProps {
  className?: string;
}

export function MusicToggle({ className = '' }: MusicToggleProps) {
  const { t } = useTranslation();
  const { isOn, toggle } = useMusic();

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isOn}
      aria-label={t('music.listeningToday')}
      className={`music-toggle ${isOn ? 'music-toggle--on' : ''} ${className}`}
      onClick={toggle}
    >
      <span className="music-toggle__track">
        <span className="music-toggle__option music-toggle__option--off" aria-hidden="true">
          🔇
        </span>
        <span className="music-toggle__option music-toggle__option--on" aria-hidden="true">
          💿
        </span>
      </span>
    </button>
  );
}
