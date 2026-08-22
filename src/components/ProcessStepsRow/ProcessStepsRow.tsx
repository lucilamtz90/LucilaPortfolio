import { renderParagraphs } from '../../utils/renderParagraphs';
import './ProcessStepsRow.css';

interface StepColumn {
  heading: string;
  body: string;
  body2?: string;
}

export function ProcessStepsRow({ left, right }: { left: StepColumn; right: StepColumn }) {
  return (
    <div className="process-steps-row">
      {[left, right].map((col, index) => (
        <div className="process-steps-row__col" key={index}>
          <p className="case-heading">{col.heading}</p>
          <div className="case-body">
            {renderParagraphs(col.body)}
            {col.body2 && renderParagraphs(col.body2)}
          </div>
        </div>
      ))}
    </div>
  );
}
