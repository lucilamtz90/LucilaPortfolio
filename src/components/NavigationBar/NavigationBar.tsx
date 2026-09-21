import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import { features } from '../../config/features';
import { MusicToggle } from '../../features/music/MusicToggle';
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
          <MusicToggle className="nav-bar__mobile-toggle" />
        </div>
        <div className="nav-bar__links">
          {features.aboutMePage && (
            <Link to="/#hero" className="text-link">
              {t('nav.aboutMe')}
            </Link>
          )}
        </div>
        <div className="nav-bar__status">
          <PillStatus playIntro={playPillIntro} className="nav-bar__pill-status" />
          <MusicToggle />
        </div>
      </div>
    </nav>
  );
}
