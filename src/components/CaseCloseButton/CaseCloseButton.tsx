import { useEffect, useState, type RefObject } from 'react';
import { useTranslation } from 'react-i18next';
import './CaseCloseButton.css';

interface CaseCloseButtonProps {
  onClose: () => void;
  scrollContainerRef: RefObject<HTMLElement | null>;
}

const SCROLL_IDLE_DELAY_MS = 200;

/** Floating close button pinned to the bottom of the case sheet — hides while the
 * user is actively scrolling (either direction) and reappears once scrolling pauses. */
export function CaseCloseButton({ onClose, scrollContainerRef }: CaseCloseButtonProps) {
  const { t } = useTranslation();
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    let idleTimer: number | undefined;

    const handleScroll = () => {
      setHidden(true);
      window.clearTimeout(idleTimer);
      idleTimer = window.setTimeout(() => setHidden(false), SCROLL_IDLE_DELAY_MS);
    };

    scrollContainer.addEventListener('scroll', handleScroll);
    return () => {
      scrollContainer.removeEventListener('scroll', handleScroll);
      window.clearTimeout(idleTimer);
    };
  }, [scrollContainerRef]);

  return (
    <button
      type="button"
      className={`case-close-btn ${hidden ? 'case-close-btn--hidden' : ''}`}
      onClick={onClose}
      aria-label={t('caseHeader.close')}
    >
      <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
        <path d="M1 1L15 15M15 1L1 15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    </button>
  );
}
