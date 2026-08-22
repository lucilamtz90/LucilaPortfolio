import { useInView } from '../../hooks/useInView';
import './Media.css';

interface MediaProps {
  src: string;
  alt?: string;
  className?: string;
}

/** Shared image wrapper: lazy-loaded, reveals on scroll, subtle zoom on hover. */
export function Media({ src, alt = '', className = '' }: MediaProps) {
  const { ref, isInView } = useInView<HTMLElement>();

  return (
    <figure
      ref={ref}
      className={`media-container ${isInView ? 'media-container--visible' : ''} ${className}`}
    >
      <img src={src} alt={alt} loading="lazy" decoding="async" draggable={false} className="media-container__img" />
    </figure>
  );
}
