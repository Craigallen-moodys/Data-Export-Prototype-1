import './ExportButton.css';

interface ExportButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

export default function ExportButton({ onClick, disabled = false }: ExportButtonProps) {
  return (
    <button
      className="export-button"
      onClick={onClick}
      disabled={disabled}
    >
      Export to CSV
    </button>
  );
}

