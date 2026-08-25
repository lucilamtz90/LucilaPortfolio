import { useInView } from '../../hooks/useInView';
import './Media.css';

interface MediaProps {
  src: string;
  alt?: string;
  className?: string;
  /** Where to anchor the crop when the media is taller/wider than its frame. Defaults to centered. */
  objectPosition?: 'center' | 'top' | 'bottom';
}

const VIDEO_EXTENSIONS = /\.(mp4|webm|mov)($|\?)/i;

/** Shared media wrapper: lazy-loaded image or looping video, reveals on scroll, subtle zoom on hover. */
export function Media({ src, alt = '', className = '', objectPosition = 'center' }: MediaProps) {
  const { ref, isInView } = useInView<HTMLElement>();
  const isVideo = VIDEO_EXTENSIONS.test(src);
  const style = { objectPosition };

  return (
    <figure
      ref={ref}
      className={`media-container ${isInView ? 'media-container--visible' : ''} ${className}`}
    >
      {isVideo ? (
        <video
          src={src}
          autoPlay
          loop
          muted
          playsInline
          className="media-container__img"
          style={style}
        />
      ) : (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          draggable={false}
          className="media-container__img"
          style={style}
        />
      )}
    </figure>
  );
}
