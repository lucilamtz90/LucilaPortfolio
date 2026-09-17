import './SignalPill.css';

interface SignalPillProps {
  label: string;
}

export function SignalPill({ label }: SignalPillProps) {
  return (
    <span className="signal-pill">
      <span className="signal-pill__label">{label}</span>
    </span>
  );
}
