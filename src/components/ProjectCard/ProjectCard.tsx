import { Link } from 'react-router-dom';
import { Media } from '../Media/Media';
import './ProjectCard.css';

interface ProjectCardProps {
  number: string;
  company: string;
  year?: string;
  title: string;
  meta?: string;
  type?: string;
  image: string;
  imagePosition?: 'center' | 'top' | 'bottom';
  to?: string;
}

export function ProjectCard({ number, company, year, title, meta, type, image, imagePosition, to }: ProjectCardProps) {
  const content = (
    <>
      <div className="project-card__content">
        <span className="project-card__number">{number}</span>
        <div className="project-card__media">
          <Media src={image} alt={title} objectPosition={imagePosition} interactive={Boolean(to)} />
        </div>
      </div>
      <div className="project-card__details">
        <div className="project-card__date">
          <span>{company}</span>
          {year && (
            <>
              <span>•</span>
              <span>{year}</span>
            </>
          )}
        </div>
        <p className="project-card__title">{title}</p>
        {(meta || type) && (
          <div className="project-card__meta">
            {meta && <span>{meta}</span>}
            {meta && type && <span>•</span>}
            {type && <span>{type}</span>}
          </div>
        )}
      </div>
    </>
  );

  if (!to) {
    return <div className="project-card project-card--static">{content}</div>;
  }

  return (
    <Link to={to} className="project-card">
      {content}
    </Link>
  );
}
