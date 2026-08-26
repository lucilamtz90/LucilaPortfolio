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
  /** Desktop-only hover treatment (hover-to-play once, "Open" pill) — used for Home's linked project cards. */
  interactive?: boolean;
}

const VIDEO_EXTENSIONS = /\.(mp4|webm|mov)($|\?)/i;

/** Cursor offset (px) so the pill floats just past the pointer instead of under it. */
const PILL_OFFSET = 16;
/** Clearance (px) kept between the pill and the container edge so it never clips. */
const PILL_EDGE_MARGIN = 4;

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
  const [pillPos, setPillPos] = useState({ x: 0, y: 0 });
  const videoRef = useRef<HTMLVideoElement>(null);
  const pillRef = useRef<HTMLSpanElement>(null);
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

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isInteractive || !isVideo) return;
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting), { threshold: 0.25 });
    observer.observe(node);
    return () => observer.disconnect();
  }, [isInteractive, isVideo, ref]);

  useEffect(() => {
    // Plain autoplay isn't reliable once several videos exist on one page (e.g. the
    // four Home cards) — mobile browsers can drop some of the simultaneous initial
    // play() calls as a one-off race, and the passive autoplay attribute never
    // retries. Pausing off-screen videos and (re)playing on-screen ones as visibility
    // changes both frees up decode capacity and gives every video repeated chances to
    // actually start.
    if (isInteractive || !isVideo) return;
    const video = videoRef.current;
    if (!video) return;

    if (isVisible) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [isVisible, isInteractive, isVideo]);

  const updatePillPosition = (e: React.MouseEvent<HTMLElement>) => {
    if (!isInteractive) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pillWidth = pillRef.current?.offsetWidth ?? 0;
    const pillHeight = pillRef.current?.offsetHeight ?? 0;
    const x = Math.min(e.clientX - rect.left + PILL_OFFSET, rect.width - pillWidth - PILL_EDGE_MARGIN);
    const y = Math.min(e.clientY - rect.top + PILL_OFFSET, rect.height - pillHeight - PILL_EDGE_MARGIN);
    setPillPos({ x, y });
  };

  return (
    <figure
      ref={ref}
      className={`media-container ${isInView ? 'media-container--visible' : ''} ${
        isInteractive ? 'media-container--interactive' : ''
      } ${className}`}
      onMouseEnter={(e) => {
        setIsHovered(true);
        updatePillPosition(e);
      }}
      onMouseMove={updatePillPosition}
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
      {isInteractive && (
        <span
          ref={pillRef}
          className="media-container__pill"
          style={{ transform: `translate(${pillPos.x}px, ${pillPos.y}px)` }}
        >
          {t('media.open')}
        </span>
      )}
    </figure>
  );
}
