import { useEffect, useState, type FormEvent, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { CASE_GATE_PASSWORD, CASE_GATE_SESSION_KEY } from '../../config/caseGate';
import { CONTACT_EMAIL } from '../../config/links';
import './CasePasswordGate.css';

function readUnlocked() {
  return window.sessionStorage.getItem(CASE_GATE_SESSION_KEY) === '1';
}

/** Toggled on <body> while locked so the sheet's fixed circular close button (which
 * lives outside this component's DOM subtree — see CaseCloseButton.css) can hide
 * itself instead of overlapping the panel on short viewports. */
const BODY_LOCKED_CLASS = 'case-gate-locked';

interface CasePasswordGateProps {
  children: ReactNode;
}

/** Gates case content behind a shared, per-session password — a Medium-style speed bump, not real security. */
export function CasePasswordGate({ children }: CasePasswordGateProps) {
  const { t } = useTranslation();
  const [unlocked, setUnlocked] = useState(readUnlocked);
  const [value, setValue] = useState('');
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    if (unlocked) {
      window.sessionStorage.setItem(CASE_GATE_SESSION_KEY, '1');
    }
  }, [unlocked]);

  useEffect(() => {
    document.body.classList.toggle(BODY_LOCKED_CLASS, !unlocked);
    return () => document.body.classList.remove(BODY_LOCKED_CLASS);
  }, [unlocked]);

  if (unlocked) {
    return <>{children}</>;
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (value.trim() === CASE_GATE_PASSWORD) {
      setUnlocked(true);
      setShowError(false);
    } else {
      setShowError(true);
    }
  }

  return (
    <div className="case-gate">
      <div className="case-gate__preview-wrap">
        <div className="case-gate__preview" aria-hidden="true" inert>
          {children}
        </div>
        <div className="case-gate__fade" />
      </div>

      <div className="case-gate__panel">
        <p className="panel-title">{t('caseGate.prompt')}</p>
        <form className="case-gate__form" onSubmit={handleSubmit}>
          <input
            type="password"
            className="case-gate__input"
            placeholder={t('caseGate.placeholder')}
            value={value}
            onChange={(event) => {
              setValue(event.target.value);
              setShowError(false);
            }}
            autoComplete="off"
          />
          <button type="submit" className="btn-pill btn-pill--solid case-gate__submit">
            {t('caseGate.submit')}
          </button>
        </form>
        {showError && <p className="case-gate__error">{t('caseGate.error')}</p>}
        <a href={`mailto:${CONTACT_EMAIL}`} className="case-gate__help">
          {t('caseGate.helpQuestion')}
          <br />
          {t('caseGate.helpAction')}
        </a>
      </div>
    </div>
  );
}
