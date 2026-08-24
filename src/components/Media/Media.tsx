import { useInView } from '../../hooks/useInView';
import './Media.css';

interface MediaProps {
  src: string;
  alt?: string;
  className?: string;
}

const VIDEO_EXTENSIONS = /\.(mp4|webm|mov)($|\?)/i;

/** Shared media wrapper: lazy-loaded image or looping video, reveals on scroll, subtle zoom on hover. */
export function Media({ src, alt = '', className = '' }: MediaProps) {
  const { ref, isInView } = useInView<HTMLElement>();
  const isVideo = VIDEO_EXTENSIONS.test(src);

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
        />
      ) : (
        <img src={src} alt={alt} loading="lazy" decoding="async" draggable={false} className="media-container__img" />
      )}
    </figure>
  );
}
