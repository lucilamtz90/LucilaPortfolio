import sparkle from '../../assets/icons/sparkle.svg';
import './ToolCredit.css';

export function ToolCredit({ lead, url }: { lead: string; url: string }) {
  return (
    <div className="tool-credit">
      <img src={sparkle} alt="" className="tool-credit__icon" />
      <p className="tool-credit__text">
        {lead}
        <br />
        <a href={url} target="_blank" rel="noopener noreferrer">
          {url}
        </a>
      </p>
    </div>
  );
}
