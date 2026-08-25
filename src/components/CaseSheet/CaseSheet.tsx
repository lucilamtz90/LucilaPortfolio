import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
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
    </div>
  );
}
