import { Media } from '../Media/Media';
import type { FreelanceMedia } from '../../data/types';
import './MediaVerticalCarousel.css';

/** Stagger step between each item's scroll-reveal (see --media-reveal-delay in Media.css). */
const REVEAL_STAGGER_MS = 80;
/** A springy overshoot easing (easeOutBack) — see --media-reveal-easing in Media.css. */
const REVEAL_EASING = 'cubic-bezier(0.34, 1.56, 0.64, 1)';
/** How much of an item must already be visible before it reveals — higher than useInView's
 * own 0.15 default so the next asset stays hidden until the user scrolls further to it,
 * instead of fading in as soon as it barely peeks into the viewport. */
const REVEAL_THRESHOLD = 0.5;

export function MediaVerticalCarousel({ items }: { items: FreelanceMedia[] }) {
  return (
    <div className="media-vertical-carousel">
      {items.map((item, index) => (
        <div
          key={item.src}
          className="media-vertical-carousel__item"
          style={
            {
              aspectRatio: item.aspectRatio,
              '--media-reveal-delay': `${index * REVEAL_STAGGER_MS}ms`,
              '--media-reveal-easing': REVEAL_EASING,
            } as React.CSSProperties
          }
        >
          <Media src={item.src} revealThreshold={REVEAL_THRESHOLD} />
        </div>
      ))}
    </div>
  );
}
