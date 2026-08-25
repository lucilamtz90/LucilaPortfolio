import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import externalLinkIcon from '../../assets/icons/external-link.svg';
import microphoneIcon from '../../assets/icons/microphone.svg';
import shareIcon from '../../assets/icons/share.svg';
import { StatusDot } from '../PillStatus/StatusDot';
import { features } from '../../config/features';
import type { CaseData } from '../../data/types';
import './TripPageHeader.css';

interface TripPageHeaderProps {
  caseData: CaseData;
  onShare: () => void;
  onBack: () => void;
}

const SCROLL_THRESHOLD = 4;

export function TripPageHeader({ caseData, onShare, onBack }: TripPageHeaderProps) {
  const { t } = useTranslation();
  const handleRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const scrollContainer = handleRef.current?.closest('.case-sheet__scroll');
    if (!scrollContainer) return;

    const onScroll = () => setScrolled(scrollContainer.scrollTop > SCROLL_THRESHOLD);
    onScroll();
    scrollContainer.addEventListener('scroll', onScroll);
    return () => scrollContainer.removeEventListener('scroll', onScroll);
  }, []);

  const handleOpenExternal = () => {
    window.open(window.location.href, '_blank', 'noopener');
  };

  return (
    <header className="trip-header">
      <div ref={handleRef} className={`trip-header__handle ${scrolled ? 'trip-header__handle--scrolled' : ''}`}>
        <button type="button" className="trip-header__handle-text" onClick={onBack}>
          <strong>{caseData.headerMeta}</strong> {t('caseHeader.metaYearConnector')} {caseData.headerYear}
          <span className="trip-header__handle-dot">•</span>
          {caseData.headerRole} {t('caseHeader.roleCompanyConnector')} <strong>{caseData.headerCompany}</strong>
        </button>

        <div className="trip-header__icons">
          {features.videoOverlay && (
            <button type="button" className="trip-header__icon-btn" aria-label="Record video">
              <img src={microphoneIcon} alt="" />
            </button>
          )}
          <button type="button" className="trip-header__icon-btn" onClick={onShare} aria-label={t('caseHeader.share')}>
            <img src={shareIcon} alt="" />
          </button>
          <button
            type="button"
            className="trip-header__icon-btn"
            onClick={handleOpenExternal}
            aria-label={t('caseHeader.openExternal')}
          >
            <img src={externalLinkIcon} alt="" />
          </button>
        </div>
      </div>

      <div className="trip-header__main">
        <div className="trip-header__info">
          <h1 className="trip-header__title">{caseData.headerTitle}</h1>
          <div className="trip-header__status">
            <span>{caseData.headerStatus}</span>
            <StatusDot />
          </div>
        </div>
      </div>
    </header>
  );
}
