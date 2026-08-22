import './StatusDot.css';

export function StatusDot({ className = '' }: { className?: string }) {
  return <span className={`status-dot ${className}`} aria-hidden="true" />;
}
