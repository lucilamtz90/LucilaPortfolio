import { useTranslation } from 'react-i18next';
import { LANGUAGE_STORAGE_KEY } from '../i18n';

/** Reads/sets the active language, persisting a manual override for the session. */
export function useLocale() {
  const { i18n } = useTranslation();

  const setLanguage = (lang: 'en' | 'es') => {
    i18n.changeLanguage(lang);
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
  };

  return {
    language: i18n.language as 'en' | 'es',
    setLanguage,
    toggleLanguage: () => setLanguage(i18n.language === 'es' ? 'en' : 'es'),
  };
}
