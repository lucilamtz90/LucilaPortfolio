import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import { LINKEDIN_URL } from '../../config/links';
import { LanguageToggle } from '../LanguageToggle/LanguageToggle';
import { PillStatus } from '../PillStatus/PillStatus';
import './NavigationBar.css';

interface NavigationBarProps {
  playPillIntro?: boolean;
}

export function NavigationBar({ playPillIntro = true }: NavigationBarProps) {
  const { t } = useTranslation();

  return (
    <nav className="nav-bar">
      <div className="nav-bar__row">
        <div className="nav-bar__brand">
          <Link to="/" className="nav-bar__logo">
            <img src={logo} alt="Lucila Martínez" />
          </Link>
          <LanguageToggle className="nav-bar__mobile-toggle" />
        </div>
        <div className="nav-bar__links">
          <Link to="/#hero" className="text-link">
            {t('nav.aboutMe')}
          </Link>
          <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="text-link">
            {t('nav.linkedin')}
          </a>
        </div>
        <div className="nav-bar__status">
          <PillStatus playIntro={playPillIntro} />
        </div>
      </div>
    </nav>
  );
}
