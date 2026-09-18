import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { PillStatus } from '../PillStatus/PillStatus';
import { useTypewriter } from '../../hooks/useTypewriter';
import './Hero.css';

interface HeroProps {
  playPillIntro?: boolean;
}

export function Hero({ playPillIntro = true }: HeroProps) {
  const { t, i18n } = useTranslation();
  // i18next's returnObjects returns a new array reference on every call, which would
  // restart useTypewriter's effect on every render — memoize on the language instead,
  // so the reference only changes when the phrases actually do.
  // Keyed on language rather than `t`'s own reference (react-i18next's `t` isn't guaranteed
  // stable across renders the way this needs).
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const titles = useMemo(() => t('hero.titles', { returnObjects: true }) as string[], [i18n.language]);
  const { text, isAnimating } = useTypewriter(titles);

  return (
    <section id="hero" className="hero">
      <div className="hero__mobile-status">
        <PillStatus playIntro={playPillIntro} />
      </div>
      <h1 className="hero__title">
        <span className="visually-hidden">{titles.join(', ')}</span>
        <span aria-hidden="true">
          {text}
          {isAnimating && <span className="hero__cursor" />}
        </span>
      </h1>
      <p className="hero__bio">
        {t('hero.bio1')}
        <br />
        {t('hero.bio2')}
      </p>
    </section>
  );
}
