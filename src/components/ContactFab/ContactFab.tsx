import { useTranslation } from 'react-i18next';
import { features } from '../../config/features';
import { CONTACT_EMAIL } from '../../config/links';
import { VoiceNoteRecorder } from '../VoiceNoteRecorder/VoiceNoteRecorder';
import './ContactFab.css';

interface ContactFabProps {
  open: boolean;
  onClose: () => void;
}

/** The expandable panel itself. Opened by the Footer's Contact button — see Footer.tsx. */
export function ContactFab({ open, onClose }: ContactFabProps) {
  const { t } = useTranslation();

  return (
    <>
      {open && <div className="contact-fab__scrim" onClick={onClose} />}

      <div className={`contact-fab-panel ${open ? 'contact-fab-panel--open' : ''}`} role="dialog" aria-modal="true" aria-hidden={!open}>
        <p className="panel-title">{t('contactFab.title')}</p>
        <a href={`mailto:${CONTACT_EMAIL}`} className="contact-fab-panel__email">
          {CONTACT_EMAIL}
        </a>
        {features.voiceNote && <VoiceNoteRecorder />}
        <button type="button" className="contact-fab-panel__close btn-pill" onClick={onClose}>
          {t('contactFab.closeLabel')}
        </button>
      </div>
    </>
  );
}
