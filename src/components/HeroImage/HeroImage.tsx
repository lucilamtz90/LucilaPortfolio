import { CaseVideoPlayer } from '../CaseVideoPlayer/CaseVideoPlayer';
import { Media } from '../Media/Media';
import './HeroImage.css';

const VIDEO_EXTENSIONS = /\.(mp4|webm|mov)($|\?)/i;

interface HeroImageProps {
  image: string;
  /** Opt-in custom video player (loop + play/pause + progress bar) instead of the default autoplay/loop media. */
  player?: boolean;
}

export function HeroImage({ image, player = false }: HeroImageProps) {
  const useCustomPlayer = player && VIDEO_EXTENSIONS.test(image);

  return (
    <div className="hero-image case-media">
      {useCustomPlayer ? <CaseVideoPlayer src={image} /> : <Media src={image} alt="" />}
    </div>
  );
}
