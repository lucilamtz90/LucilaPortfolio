import { renderParagraphs } from '../../utils/renderParagraphs';
import './ExtendedNarrative.css';

export function ExtendedNarrative({ heading, body }: { heading: string; body: string }) {
  return (
    <div className="extended-narrative">
      <p className="case-heading">{heading}</p>
      <div className="case-body">{renderParagraphs(body)}</div>
    </div>
  );
}
