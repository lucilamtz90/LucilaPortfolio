import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import chevronLeft from '../../assets/icons/chevron-left.svg';
import microphoneIcon from '../../assets/icons/microphone.svg';
import shareIcon from '../../assets/icons/share.svg';
import { StatusDot } from '../PillStatus/StatusDot';
import { features } from '../../config/features';
import type { CaseData } from '../../data/types';
import './TripPageHeader.css';

interface TripPageHeaderProps {
  caseData: CaseData;
  onShare: () => void;
}

export function TripPageHeader({ caseData, onShare }: TripPageHeaderProps) {
  const { t } = useTranslation();

  return (
    <header className="trip-header">
      <Link to="/" className="trip-header__handle">
        <img src={chevronLeft} alt="" className="trip-header__chevron" />
        <span className="trip-header__handle-text">
          {caseData.headerCompany} • {caseData.headerYear}
        </span>
      </Link>

      <div className="trip-header__main">
        <div className="trip-header__info">
          <h1 className="trip-header__title">{caseData.headerTitle}</h1>
          <div className="trip-header__status">
            <span>{caseData.headerStatus}</span>
            <StatusDot />
          </div>
          <div className="trip-header__meta">
            <span>{caseData.headerMeta}</span>
            <span>•</span>
            <span>{caseData.headerRole}</span>
          </div>
        </div>

        <div className="trip-header__actions">
          <button type="button" className="trip-header__icon-btn" onClick={onShare} aria-label={t('caseHeader.share')}>
            <img src={shareIcon} alt="" />
          </button>
          <button
            type="button"
            className="trip-header__icon-btn"
            aria-label="Record video"
            disabled={!features.videoOverlay}
          >
            <img src={microphoneIcon} alt="" />
          </button>

        </div>
      </div>
    </header>
  );
}
