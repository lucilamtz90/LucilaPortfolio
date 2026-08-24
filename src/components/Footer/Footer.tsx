import { useTranslation } from 'react-i18next';
import { RESUME_URL } from '../../config/links';
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
        <button type="button" className="btn-pill" onClick={onContactClick}>
          {t('nav.contact')}
        </button>
        <a href={RESUME_URL} target="_blank" rel="noopener noreferrer" className="btn-pill btn-pill--solid">
          {t('nav.resume')}
        </a>
      </div>
      <p className="footer__credit">{t('footer.credit')}</p>
      <LanguageToggle className="footer__language" />
    </footer>
  );
}
