import { useTranslation } from 'react-i18next';
import { PillStatus } from '../PillStatus/PillStatus';
import './Hero.css';

interface HeroProps {
  playPillIntro?: boolean;
}

export function Hero({ playPillIntro = true }: HeroProps) {
  const { t } = useTranslation();

  return (
    <section id="hero" className="hero">
      <div className="hero__mobile-status">
        <PillStatus playIntro={playPillIntro} />
      </div>
      <h1 className="hero__title">{t('hero.title')}</h1>
      <p className="hero__bio">
        {t('hero.bio1')}
        <br />
        {t('hero.bio2')}
      </p>
    </section>
  );
}
