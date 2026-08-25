import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useInView } from '../../hooks/useInView';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import './Media.css';

interface MediaProps {
  src: string;
  alt?: string;
  className?: string;
  /** Where to anchor the crop when the media is taller/wider than its frame. Defaults to centered. */
  objectPosition?: 'center' | 'top' | 'bottom';
  /** Desktop-only hover treatment (grayscale until hover, hover-to-play once, "Open" pill) — used for Home's linked project cards. */
  interactive?: boolean;
}

const VIDEO_EXTENSIONS = /\.(mp4|webm|mov)($|\?)/i;

/** Shared media wrapper: lazy-loaded image or video, reveals on scroll. */
export function Media({
  src,
  alt = '',
  className = '',
  objectPosition = 'center',
  interactive = false,
}: MediaProps) {
  const { t } = useTranslation();
  const { ref, isInView } = useInView<HTMLElement>();
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const isVideo = VIDEO_EXTENSIONS.test(src);
  const style = { objectPosition };

  const isInteractive = interactive && isDesktop;
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const hasEndedRef = useRef(false);

  useEffect(() => {
    if (!isInteractive || !isVideo) return;
    const video = videoRef.current;
    if (!video || hasEndedRef.current) return;

    if (isHovered) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [isHovered, isInteractive, isVideo]);

  return (
    <figure
      ref={ref}
      className={`media-container ${isInView ? 'media-container--visible' : ''} ${
        isInteractive ? 'media-container--interactive' : ''
      } ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isVideo ? (
        <video
          ref={videoRef}
          src={src}
          autoPlay={!isInteractive}
          loop={!isInteractive}
          muted
          playsInline
          onEnded={() => {
            hasEndedRef.current = true;
          }}
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
      {isInteractive && <span className="media-container__pill">{t('media.open')}</span>}
    </figure>
  );
}
