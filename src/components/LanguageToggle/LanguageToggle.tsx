import { useLocale } from '../../hooks/useLocale';
import './LanguageToggle.css';

export function LanguageToggle() {
  const { language, setLanguage } = useLocale();

  return (
    <div className="language-toggle" role="group" aria-label="Language">
      <button
        type="button"
        className={`language-toggle__option ${language === 'en' ? 'language-toggle__option--active' : ''}`}
        onClick={() => setLanguage('en')}
        aria-pressed={language === 'en'}
      >
        EN
      </button>
      <span className="language-toggle__divider">/</span>
      <button
        type="button"
        className={`language-toggle__option ${language === 'es' ? 'language-toggle__option--active' : ''}`}
        onClick={() => setLanguage('es')}
        aria-pressed={language === 'es'}
      >
        ES
      </button>
    </div>
  );
}
