import { useTranslation } from 'react-i18next';
import { StatusDot } from './StatusDot';
import './PillStatus.css';

export function PillStatus() {
  const { t } = useTranslation();

  return (
    <div className="pill-status">
      <span className="pill-status__label">{t('pillStatus.openToWork')}</span>
      <StatusDot />
    </div>
  );
}
