import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import { features } from '../../config/features';
import { MusicToggle } from '../../features/music/MusicToggle';
import './NavigationBar.css';

export function NavigationBar() {
  const { t } = useTranslation();

  return (
    <nav className="nav-bar">
      <div className="nav-bar__row">
        <div className="nav-bar__brand">
          <Link to="/" className="nav-bar__logo">
            <img src={logo} alt="Lucila Martínez" />
          </Link>
        </div>
        <div className="nav-bar__links">
          {features.aboutMePage && (
            <Link to="/#hero" className="text-link">
              {t('nav.aboutMe')}
            </Link>
          )}
        </div>
        <div className="nav-bar__status">
          <MusicToggle />
        </div>
      </div>
    </nav>
  );
}
