import { CaseVideoPlayer } from '../CaseVideoPlayer/CaseVideoPlayer';
import { Media } from '../Media/Media';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import './HeroImage.css';

const VIDEO_EXTENSIONS = /\.(mp4|webm|mov)($|\?)/i;

interface HeroImageProps {
  image: string;
  /** Opt-in custom video player (loop + play/pause + progress bar) instead of the default autoplay/loop media. Desktop only — on mobile these just autoplay/loop like a gif, no tap-to-play or controls. */
  player?: boolean;
}

export function HeroImage({ image, player = false }: HeroImageProps) {
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const useCustomPlayer = player && isDesktop && VIDEO_EXTENSIONS.test(image);

  return (
    <div className="hero-image case-media">
      {useCustomPlayer ? <CaseVideoPlayer src={image} /> : <Media src={image} alt="" />}
    </div>
  );
}
