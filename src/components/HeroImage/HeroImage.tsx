import { Media } from '../Media/Media';
import './HeroImage.css';

export function HeroImage({ image }: { image: string }) {
  return (
    <div className="hero-image case-media">
      <Media src={image} alt="" />
    </div>
  );
}
