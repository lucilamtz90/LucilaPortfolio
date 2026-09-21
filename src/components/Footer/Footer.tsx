import { useTranslation } from 'react-i18next';
import { LINKEDIN_URL, RESUME_URL } from '../../config/links';
import { LanguageToggle } from '../LanguageToggle/LanguageToggle';
import './Footer.css';

interface FooterProps {
  onContactClick: () => void;
}

export function Footer({ onContactClick }: FooterProps) {
  const { t } = useTranslation();

  return (
    <footer className="footer">
      <div className="footer__buttons">
        <button type="button" className="btn-pill btn-pill--small" onClick={onContactClick}>
          {t('nav.contact')}
        </button>
        <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="btn-pill btn-pill--small">
          {t('nav.linkedin')}
        </a>
        <a href={RESUME_URL} target="_blank" rel="noopener noreferrer" className="btn-pill btn-pill--solid btn-pill--small">
          {t('nav.resume')}
        </a>
      </div>
      <p className="footer__credit">{t('footer.credit')}</p>
      <LanguageToggle className="footer__language" />
    </footer>
  );
}
