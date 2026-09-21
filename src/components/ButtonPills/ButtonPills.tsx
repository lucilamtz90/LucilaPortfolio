import { useTranslation } from 'react-i18next';
import './ButtonPills.css';

export type ProjectTab = 'professional' | 'ai' | 'freelance';

interface ButtonPillsProps {
  active: ProjectTab;
  onChange: (tab: ProjectTab) => void;
}

export function ButtonPills({ active, onChange }: ButtonPillsProps) {
  const { t } = useTranslation();

  return (
    <div className="button-pills" role="tablist">
      <button
        type="button"
        role="tab"
        aria-selected={active === 'professional'}
        className={`button-pills__tab ${active === 'professional' ? 'button-pills__tab--active' : ''}`}
        onClick={() => onChange('professional')}
      >
        <span className="button-pills__tab-fill" aria-hidden="true" />
        <span className="button-pills__tab-label">{t('buttonPills.professionalWork')}</span>
      </button>
      <button
        type="button"
        role="tab"
        aria-selected={active === 'ai'}
        className={`button-pills__tab ${active === 'ai' ? 'button-pills__tab--active' : ''}`}
        onClick={() => onChange('ai')}
      >
        <span className="button-pills__tab-fill" aria-hidden="true" />
        <span className="button-pills__tab-label">{t('buttonPills.aiSideProjects')}</span>
      </button>
      <button
        type="button"
        role="tab"
        aria-selected={active === 'freelance'}
        className={`button-pills__tab ${active === 'freelance' ? 'button-pills__tab--active' : ''}`}
        onClick={() => onChange('freelance')}
      >
        <span className="button-pills__tab-fill" aria-hidden="true" />
        <span className="button-pills__tab-label">{t('buttonPills.freelanceWork')}</span>
      </button>
    </div>
  );
}
