import { useEffect, useRef, useState } from 'react';
import './VoiceNoteRecorder.css';

const MAX_DURATION_SECONDS = 50;

type RecorderStatus = 'idle' | 'recording' | 'recorded' | 'sent';

/**
 * WhatsApp-style voice note recorder for the Contact FAB.
 * Feature-flagged off for V1 (see src/config/features.ts) — the send action
 * is a local stub; wiring it to a Drive-backed spreadsheet needs a backend
 * (e.g. a Google Apps Script Web App) that hasn't been provisioned yet.
 */
export function VoiceNoteRecorder() {
  const [status, setStatus] = useState<RecorderStatus>('idle');
  const [seconds, setSeconds] = useState(0);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
      if (audioUrl) URL.revokeObjectURL(audioUrl);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const recorder = new MediaRecorder(stream);
    chunksRef.current = [];

    recorder.ondataavailable = (event) => chunksRef.current.push(event.data);
    recorder.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
      setAudioUrl(URL.createObjectURL(blob));
      stream.getTracks().forEach((track) => track.stop());
    };

    recorder.start();
    mediaRecorderRef.current = recorder;
    setStatus('recording');
    setSeconds(0);

    intervalRef.current = window.setInterval(() => {
      setSeconds((prev) => {
        if (prev + 1 >= MAX_DURATION_SECONDS) {
          stopRecording();
          return MAX_DURATION_SECONDS;
        }
        return prev + 1;
      });
    }, 1000);
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    if (intervalRef.current) window.clearInterval(intervalRef.current);
    setStatus('recorded');
  };

  const discard = () => {
    if (audioUrl) URL.revokeObjectURL(audioUrl);
    setAudioUrl(null);
    setSeconds(0);
    setStatus('idle');
  };

  const send = () => {
    // TODO: POST the recording to a Drive-backed endpoint (e.g. Google Apps
    // Script Web App writing to a "Voice Note" spreadsheet) once provisioned.
    setStatus('sent');
  };

  if (status === 'sent') {
    return <p className="voice-note__confirmation">✓ Sent</p>;
  }

  return (
    <div className="voice-note">
      <p className="voice-note__hint">Leave me a voice note, include your contact and name, please</p>

      {status === 'idle' && (
        <button type="button" className="btn-pill" onClick={startRecording}>
          Record
        </button>
      )}

      {status === 'recording' && (
        <div className="voice-note__active">
          <span className="voice-note__rec-dot" />
          <span>{seconds}s</span>
          <button type="button" className="btn-pill" onClick={stopRecording}>
            Stop
          </button>
        </div>
      )}

      {status === 'recorded' && audioUrl && (
        <div className="voice-note__active">
          <audio src={audioUrl} controls className="voice-note__player" />
          <button type="button" className="btn-pill" onClick={discard}>
            Delete
          </button>
          <button type="button" className="btn-pill btn-pill--solid" onClick={send}>
            Send
          </button>
        </div>
      )}
    </div>
  );
}
