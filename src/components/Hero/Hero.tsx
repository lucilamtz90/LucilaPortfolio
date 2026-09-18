import { useLayoutEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { PillStatus } from '../PillStatus/PillStatus';
import { useMediaQuery } from '../../hooks/useMediaQuery';
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

  const titleRef = useRef<HTMLHeadingElement>(null);
  const [minHeight, setMinHeight] = useState<number>();
  // Below 1024px the reserve-the-tallest-phrase approach itself becomes the problem: the
  // narrower column makes the longest phrase ("Adoption and Engagement Designer") wrap to 3
  // lines while most others fit in 1–2, so reserving that max leaves a big empty gap under
  // every shorter phrase. Desktop's gap between phrases' line counts is small enough that a
  // fixed reservation reads as intentional spacing rather than a gap, so it stays there —
  // below 1024px, don't reserve at all and let the bio genuinely shift with the title's
  // real height as it types.
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  useLayoutEffect(() => {
    const liveEl = titleRef.current;
    if (!liveEl || !isDesktop) {
      // Crossing back below 1024px (e.g. resizing down from desktop) must drop any
      // previously-measured desktop value — otherwise mobile would inherit a stale
      // reservation instead of reflowing naturally.
      setMinHeight(undefined);
      return;
    }

    // How many lines each phrase wraps to varies with viewport width (e.g. a phrase that
    // fits on one line at 1440px can take three at 1024px), so a fixed CSS min-height
    // either wastes space at wide widths or under-reserves at narrow ones. Measuring the
    // tallest phrase at the CURRENT width instead reserves exactly what's needed, so the
    // bio below never jumps as the typewriter cycles through phrases of very different
    // lengths — and never leaves an oversized gap either.
    const measure = () => {
      // liveEl's OWN width isn't the available column width — .hero uses
      // align-items:flex-start, so the title hugs whatever partial text is
      // currently typed instead of stretching. Its parent section does span
      // the full column, which is the width phrases will actually wrap against
      // once fully typed.
      const availableWidth = liveEl.parentElement?.getBoundingClientRect().width ?? liveEl.getBoundingClientRect().width;
      const clone = liveEl.cloneNode(true) as HTMLElement;
      clone.style.position = 'absolute';
      clone.style.visibility = 'hidden';
      clone.style.pointerEvents = 'none';
      clone.style.minHeight = '0';
      clone.style.width = `${availableWidth}px`;
      document.body.appendChild(clone);

      const target = clone.querySelector('[aria-hidden]');
      let max = 0;
      for (const phrase of titles) {
        if (target) target.textContent = phrase;
        max = Math.max(max, clone.getBoundingClientRect().height);
      }
      document.body.removeChild(clone);
      setMinHeight(max);
    };

    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [titles, isDesktop]);

  return (
    <section id="hero" className="hero">
      <div className="hero__mobile-status">
        <PillStatus playIntro={playPillIntro} />
      </div>
      <h1 className="hero__title" ref={titleRef} style={minHeight ? { minHeight } : undefined}>
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
