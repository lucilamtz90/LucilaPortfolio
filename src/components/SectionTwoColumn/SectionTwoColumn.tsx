import { renderParagraphs } from '../../utils/renderParagraphs';
import './SectionTwoColumn.css';

export function SectionTwoColumn({ heading, body }: { heading: string; body: string }) {
  return (
    <div className="section-two-col">
      <p className="section-two-col__heading case-heading">{heading}</p>
      <div className="section-two-col__body case-body">{renderParagraphs(body)}</div>
    </div>
  );
}
