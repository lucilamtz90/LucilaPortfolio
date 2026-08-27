import { useInView } from '../../hooks/useInView';
import sparkle from '../../assets/icons/sparkle.svg';
import './ToolCredit.css';

export function ToolCredit({ lead, url }: { lead: string; url: string }) {
  const { ref, isInView } = useInView<HTMLDivElement>();

  return (
    <div className="tool-credit" ref={ref}>
      <img src={sparkle} alt="" className={`tool-credit__icon ${isInView ? 'tool-credit__icon--flip' : ''}`} />
      <p className="tool-credit__text">{lead}</p>
      <div className="tool-credit__embed">
        <iframe src={url} title={lead} loading="lazy" />
      </div>
    </div>
  );
}
