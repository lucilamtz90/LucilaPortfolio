import { ExtendedNarrative } from './ExtendedNarrative/ExtendedNarrative';
import { HeroImage } from './HeroImage/HeroImage';
import { ImpactResults } from './ImpactResults/ImpactResults';
import { ImpactResultsExperiments } from './ImpactResults/ImpactResultsExperiments';
import { ProcessStep } from './ProcessStep/ProcessStep';
import { ProcessStepsRow } from './ProcessStepsRow/ProcessStepsRow';
import { Reflection } from './Reflection/Reflection';
import { SectionTwoColumn } from './SectionTwoColumn/SectionTwoColumn';
import { ToolCredit } from './ToolCredit/ToolCredit';
import type { CaseSection } from '../data/types';

export function CaseSectionRenderer({ section }: { section: CaseSection }) {
  switch (section.type) {
    case 'sectionTwoColumn':
      return <SectionTwoColumn heading={section.heading} body={section.body} />;
    case 'processStep':
      return <ProcessStep heading={section.heading} body={section.body} body2={section.body2} image={section.image} />;
    case 'processStepsRow':
      return <ProcessStepsRow left={section.left} right={section.right} />;
    case 'heroImage':
      return <HeroImage image={section.image} player={section.player} />;
    case 'impactResults':
      return <ImpactResults heading={section.heading} stats={section.stats} />;
    case 'impactResultsExperiments':
      return (
        <ImpactResultsExperiments heading={section.heading} experiments={section.experiments} summary={section.summary} />
      );
    case 'extendedNarrative':
      return <ExtendedNarrative heading={section.heading} body={section.body} />;
    case 'toolCredit':
      return <ToolCredit lead={section.lead} url={section.url} />;
    case 'reflection':
      return <Reflection heading={section.heading} body={section.body} />;
    default:
      return null;
  }
}
