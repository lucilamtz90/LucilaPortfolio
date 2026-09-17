import { ExtendedNarrative } from '../ExtendedNarrative/ExtendedNarrative';
import { ToolCredit } from '../ToolCredit/ToolCredit';
import type { FreelanceCase } from '../../data/types';
import './CaseContentLeft.css';

interface CaseContentLeftProps {
  narratives: FreelanceCase['narratives'];
  credit: FreelanceCase['credit'];
}

export function CaseContentLeft({ narratives, credit }: CaseContentLeftProps) {
  return (
    <div className="case-content-left">
      {narratives.map((narrative) => (
        <ExtendedNarrative key={narrative.heading} heading={narrative.heading} body={narrative.body} />
      ))}
      <ToolCredit
        lead={credit.lead}
        url={credit.url}
        linkText={credit.linkText}
        aspectRatio={credit.aspectRatio}
        mediaOnly={credit.mediaOnly}
      />
    </div>
  );
}
