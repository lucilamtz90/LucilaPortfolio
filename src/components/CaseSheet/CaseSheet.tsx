import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CaseCloseButton } from '../CaseCloseButton/CaseCloseButton';
import { CaseDetail } from '../../pages/CaseDetail';
import './CaseSheet.css';

const CLOSE_DURATION_MS = 500;

type SheetPhase = 'entering' | 'open' | 'closing';

/**
 * Renders the case page as a sheet sliding up over Home (which stays mounted behind
 * it — see App.tsx's HomeLayout). Closing (back arrow, backdrop click, or Escape)
 * slides the sheet back down before actually navigating away.
 */
export function CaseSheet() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const panelRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<SheetPhase>('entering');

  useEffect(() => {
    const raf1 = requestAnimationFrame(() => {
      requestAnimationFrame(() => setPhase('open'));
    });
    return () => cancelAnimationFrame(raf1);
  }, []);

  useEffect(() => {
    if (panelRef.current) panelRef.current.scrollTop = 0;
  }, [slug]);

  useEffect(() => {
    // overflow:hidden alone doesn't reliably lock background scroll on iOS Safari,
    // and restoring it can leave the page with a stale/incorrect scrollable height
    // (a "phantom" gap of extra scroll below the footer) until the page reloads.
    // Pinning the body via position:fixed removes it from the scrollable flow
    // entirely, which iOS respects, and restoring the saved scroll position on
    // cleanup avoids that lingering layout glitch.
    const { body } = document;
    const scrollY = window.scrollY;
    const previous = {
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      right: body.style.right,
      width: body.style.width,
    };

    body.style.position = 'fixed';
    body.style.top = `-${scrollY}px`;
    body.style.left = '0';
    body.style.right = '0';
    body.style.width = '100%';

    return () => {
      body.style.position = previous.position;
      body.style.top = previous.top;
      body.style.left = previous.left;
      body.style.right = previous.right;
      body.style.width = previous.width;
      window.scrollTo(0, scrollY);
    };
  }, []);

  const handleClose = () => {
    setPhase('closing');
    window.setTimeout(() => navigate('/'), CLOSE_DURATION_MS);
  };

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={`case-sheet case-sheet--${phase}`}>
      <div className="case-sheet__overlay" onClick={handleClose} />
      <div className="case-sheet__panel">
        <div className="case-sheet__scroll" ref={panelRef} role="dialog" aria-modal="true">
          <CaseDetail onBack={handleClose} />
        </div>
      </div>
      <CaseCloseButton onClose={handleClose} scrollContainerRef={panelRef} />
    </div>
  );
}
