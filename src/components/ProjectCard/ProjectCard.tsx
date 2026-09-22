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
  /** Turns one occurrence of this substring within `description` into a link to `creditUrl`
   * (e.g. crediting a collaborator by name) — ignored unless both are set. */
  creditName?: string;
  creditUrl?: string;
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
  creditName,
  creditUrl,
  image,
  imagePosition,
  to,
  href,
}: ProjectCardProps) {
  const isLink = Boolean(to || href);

  const creditIndex = creditName && creditUrl ? description?.indexOf(creditName) : undefined;
  const descriptionNode =
    description && creditName && creditUrl && creditIndex !== undefined && creditIndex !== -1 ? (
      <>
        {description.slice(0, creditIndex)}
        <a href={creditUrl} target="_blank" rel="noopener noreferrer" className="project-card__credit-link">
          {creditName}
        </a>
        {description.slice(creditIndex + creditName.length)}
      </>
    ) : (
      description
    );
  const content = (
    <>
      <div className="project-card__content">
        <span className="project-card__number">{number}</span>
        <div
          className="project-card__media"
          // Sits above .project-card__stretched-link (see ProjectCard.css) so hover
          // actually reaches it — which means clicks land here too, instead of falling
          // through to the stretched link underneath. Re-open the same href manually so
          // clicking the thumbnail still works like the rest of the card.
          onClick={href ? () => window.open(href, '_blank', 'noopener,noreferrer') : undefined}
        >
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
        {description && <p className="project-card__description">{descriptionNode}</p>}
      </div>
    </>
  );

  if (href) {
    // Not a wrapping <a> — the description can contain its own link (the creditUrl one below),
    // and nesting an <a> inside an <a> is invalid HTML. Instead, a "stretched link" overlay
    // covers the whole card for the main href, positioned under any real link inside the
    // content (see .project-card__credit-link's z-index) so that one stays independently
    // clickable.
    return (
      <div className="project-card project-card--external">
        {content}
        <a href={href} target="_blank" rel="noopener noreferrer" className="project-card__stretched-link" aria-label={title} />
      </div>
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
