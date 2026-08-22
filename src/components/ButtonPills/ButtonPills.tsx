import { useTranslation } from 'react-i18next';
import './ButtonPills.css';

export type ProjectTab = 'professional' | 'ai';

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
        {t('buttonPills.professionalWork')}
      </button>
      <button
        type="button"
        role="tab"
        aria-selected={active === 'ai'}
        className={`button-pills__tab ${active === 'ai' ? 'button-pills__tab--active' : ''}`}
        onClick={() => onChange('ai')}
      >
        {t('buttonPills.aiSideProjects')}
      </button>
    </div>
  );
}
