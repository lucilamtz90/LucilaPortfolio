import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StatusDot } from './StatusDot';
import './PillStatus.css';

interface PillStatusProps {
  /** Set true once it's OK to play the one-time fill + wiggle intro (e.g. after loading finishes). */
  playIntro?: boolean;
}

export function PillStatus({ playIntro = true }: PillStatusProps) {
  const { t } = useTranslation();
  const [animate, setAnimate] = useState(false);
  const hasPlayed = useRef(false);

  useEffect(() => {
    if (playIntro && !hasPlayed.current) {
      hasPlayed.current = true;
      setAnimate(true);
    }
  }, [playIntro]);

  return (
    <div className={`pill-status ${animate ? 'pill-status--intro' : ''}`}>
      <span className="pill-status__label">{t('pillStatus.openToWork')}</span>
      <StatusDot />
    </div>
  );
}
