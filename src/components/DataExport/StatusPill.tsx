import './StatusPill.css';

export type StatusType = 'in-progress' | 'pending' | 'failed' | 'completed';

interface StatusPillProps {
  status: StatusType;
  label: string;
}

export default function StatusPill({ status, label }: StatusPillProps) {
  return (
    <span className={`status-pill status-pill--${status}`}>
      {label}
    </span>
  );
}

