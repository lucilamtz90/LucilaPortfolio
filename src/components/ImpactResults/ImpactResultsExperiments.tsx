import { Media } from '../Media/Media';
import './ImpactResultsExperiments.css';

interface Experiment {
  label: string;
  image: string;
  title: string;
  body: string;
  /** Overrides the default 1/1 frame — see HeroImage's aspectRatio prop. */
  aspectRatio?: string;
}

interface ImpactResultsExperimentsProps {
  heading: string;
  experiments: Experiment[];
  summary: string;
}

export function ImpactResultsExperiments({ heading, experiments, summary }: ImpactResultsExperimentsProps) {
  return (
    <div className="impact-experiments">
      <p className="case-heading">{heading}</p>
      <div className="impact-experiments__row">
        {experiments.map((experiment) => (
          <div className="impact-experiments__col" key={experiment.label}>
            <span className="impact-experiments__label">{experiment.label}</span>
            <div
              className="impact-experiments__media case-media"
              style={experiment.aspectRatio ? { aspectRatio: experiment.aspectRatio } : undefined}
            >
              <Media src={experiment.image} alt="" />
            </div>
            <p className="impact-experiments__title">{experiment.title}</p>
            <p className="case-body">{experiment.body}</p>
          </div>
        ))}
      </div>
      <p className="impact-experiments__summary">{summary}</p>
    </div>
  );
}
