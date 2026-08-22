import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { NavigationBar } from '../components/NavigationBar/NavigationBar';
import './NotFound.css';

export function NotFound() {
  const { t } = useTranslation();

  return (
    <div className="not-found container">
      <NavigationBar />
      <div className="not-found__content">
        <h1 className="case-heading">{t('notFound.title')}</h1>
        <p className="case-body">{t('notFound.body')}</p>
        <Link to="/" className="btn-pill btn-pill--solid">
          {t('notFound.cta')}
        </Link>
      </div>
    </div>
  );
}
