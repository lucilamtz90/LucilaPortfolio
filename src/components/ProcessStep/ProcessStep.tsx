import { Media } from '../Media/Media';
import { renderParagraphs } from '../../utils/renderParagraphs';
import './ProcessStep.css';

interface ProcessStepProps {
  heading: string;
  body: string;
  body2?: string;
  image?: string;
}

export function ProcessStep({ heading, body, body2, image }: ProcessStepProps) {
  return (
    <div className={`process-step ${image ? '' : 'process-step--text-only'}`}>
      <div className="process-step__text">
        <p className="case-heading">{heading}</p>
        <div className="case-body">
          {renderParagraphs(body)}
          {body2 && renderParagraphs(body2)}
        </div>
      </div>
      {image && (
        <div className="process-step__media case-media">
          <Media src={image} alt="" />
        </div>
      )}
    </div>
  );
}
