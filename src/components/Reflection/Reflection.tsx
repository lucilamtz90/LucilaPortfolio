import { renderParagraphs } from '../../utils/renderParagraphs';
import './Reflection.css';

export function Reflection({ heading, body }: { heading: string; body: string }) {
  return (
    <div className="reflection">
      <p className="case-heading">{heading}</p>
      <div className="case-body">{renderParagraphs(body)}</div>
    </div>
  );
}
