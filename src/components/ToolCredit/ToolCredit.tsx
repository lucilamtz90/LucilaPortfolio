import { useInView } from '../../hooks/useInView';
import sparkle from '../../assets/icons/sparkle.svg';
import './ToolCredit.css';

interface ToolCreditProps {
  lead: string;
  url: string;
  linkText?: string;
  /** Overrides the embed frame's default 4/3 ratio — e.g. "9 / 16" for a portrait embed like an Instagram Reel. */
  aspectRatio?: string;
  /** Drops the icon and lead text, leaving just the embedded frame — for a social media video embedded
   * directly from its own URL, which already carries its own caption/attribution chrome. */
  mediaOnly?: boolean;
}

export function ToolCredit({ lead, url, linkText, aspectRatio, mediaOnly = false }: ToolCreditProps) {
  const { ref, isInView } = useInView<HTMLDivElement>();

  if (mediaOnly) {
    return (
      <div className="tool-credit tool-credit--media-only">
        <div className="tool-credit__embed" style={aspectRatio ? { aspectRatio } : undefined}>
          <iframe src={url} title={lead} loading="lazy" />
        </div>
      </div>
    );
  }

  if (linkText) {
    return (
      <div className="tool-credit tool-credit--link">
        <p className="tool-credit__text">{lead}</p>
        <a className="tool-credit__link" href={url} target="_blank" rel="noopener noreferrer">
          {linkText}
        </a>
      </div>
    );
  }

  return (
    <div className="tool-credit" ref={ref}>
      <img src={sparkle} alt="" className={`tool-credit__icon ${isInView ? 'tool-credit__icon--flip' : ''}`} />
      <p className="tool-credit__text">{lead}</p>
      <div className="tool-credit__embed" style={aspectRatio ? { aspectRatio } : undefined}>
        <iframe src={url} title={lead} loading="lazy" />
      </div>
    </div>
  );
}
