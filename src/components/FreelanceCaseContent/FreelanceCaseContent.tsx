import { CaseContentLeft } from '../CaseContentLeft/CaseContentLeft';
import { MediaVerticalCarousel } from '../MediaVerticalCarousel/MediaVerticalCarousel';
import type { FreelanceCase } from '../../data/types';
import './FreelanceCaseContent.css';

export function FreelanceCaseContent({ caseData }: { caseData: FreelanceCase }) {
  return (
    <div className="freelance-case-content">
      <CaseContentLeft narratives={caseData.narratives} credit={caseData.credit} />
      <MediaVerticalCarousel items={caseData.media} />
    </div>
  );
}
