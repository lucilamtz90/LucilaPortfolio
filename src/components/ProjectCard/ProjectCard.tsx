import { Link } from 'react-router-dom';
import { Media } from '../Media/Media';
import './ProjectCard.css';

interface ProjectCardProps {
  number: string;
  company?: string;
  year?: string;
  /** Pre-joined date-line text (e.g. "6 weeks • 2025 • Cursor, Claude Code") — overrides the company/year rendering for cards whose date line isn't a company + year pair. */
  dateLine?: string;
  title: string;
  meta?: string;
  type?: string;
  /** Short one-line description shown below the title/meta, in a smaller body style. */
  description?: string;
  image: string;
  imagePosition?: 'center' | 'top' | 'bottom';
  /** Internal case route — renders the card as a react-router Link. */
  to?: string;
  /** External URL — renders the card as an <a target="_blank"> instead. Takes precedence over `to` if both are set. */
  href?: string;
}

export function ProjectCard({
  number,
  company,
  year,
  dateLine,
  title,
  meta,
  type,
  description,
  image,
  imagePosition,
  to,
  href,
}: ProjectCardProps) {
  const isLink = Boolean(to || href);
  const content = (
    <>
      <div className="project-card__content">
        <span className="project-card__number">{number}</span>
        <div className="project-card__media">
          <Media src={image} alt={title} objectPosition={imagePosition} interactive={isLink} />
        </div>
      </div>
      <div className="project-card__details">
        <div className="project-card__date">
          {dateLine ? (
            <span>{dateLine}</span>
          ) : (
            <>
              {company && <span>{company}</span>}
              {company && year && <span>•</span>}
              {year && <span>{year}</span>}
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
        {description && <p className="project-card__description">{description}</p>}
      </div>
    </>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="project-card">
        {content}
      </a>
    );
  }

  if (!to) {
    return <div className="project-card project-card--static">{content}</div>;
  }

  return (
    <Link to={to} className="project-card">
      {content}
    </Link>
  );
}
