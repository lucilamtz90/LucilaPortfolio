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
  /** Widens the media column and hugs the text — see the CaseSection type's doc comment. */
  wideMedia?: boolean;
  /** Drops the media container's own background — see the CaseSection type's doc comment. */
  transparentMedia?: boolean;
}

export function ProcessStep({ heading, body, body2, image, aspectRatio, wideMedia, transparentMedia }: ProcessStepProps) {
  return (
    <div
      className={`process-step ${image ? '' : 'process-step--text-only'} ${wideMedia ? 'process-step--wide-media' : ''}`}
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
          <Media src={image} alt="" className={transparentMedia ? 'media-container--transparent' : ''} />
        </div>
      )}
    </div>
  );
}
