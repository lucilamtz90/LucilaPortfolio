import { useTranslation } from 'react-i18next';
import logo from '../../assets/logo.svg';
import './LoadingScreen.css';

export function LoadingScreen({ visible }: { visible: boolean }) {
  const { t } = useTranslation();

  return (
    <div className={`loading-screen ${visible ? '' : 'loading-screen--hidden'}`} aria-hidden={!visible}>
      <img src={logo} alt="" className="loading-screen__logo" />
      <span className="loading-screen__label">{t('loading.label')}</span>
    </div>
  );
}
