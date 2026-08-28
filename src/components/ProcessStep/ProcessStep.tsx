import { Media } from '../Media/Media';
import { renderParagraphs } from '../../utils/renderParagraphs';
import './ProcessStep.css';

interface ProcessStepProps {
  heading: string;
  body: string;
  body2?: string;
  image?: string;
  /** Overrides the default 321/440 frame — see HeroImage's aspectRatio prop. */
  aspectRatio?: string;
}

export function ProcessStep({ heading, body, body2, image, aspectRatio }: ProcessStepProps) {
  return (
    <div
      className={`process-step ${image ? '' : 'process-step--text-only'} ${aspectRatio ? 'process-step--wide-media' : ''}`}
    >
      <div className="process-step__text">
        <p className="case-heading">{heading}</p>
        <div className="case-body">
          {renderParagraphs(body)}
          {body2 && renderParagraphs(body2)}
        </div>
      </div>
      {image && (
        <div className="process-step__media case-media" style={aspectRatio ? { aspectRatio } : undefined}>
          <Media src={image} alt="" />
        </div>
      )}
    </div>
  );
}
