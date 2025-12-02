import './ColumnSelector.css';

interface Column {
  key: string;
  label: string;
}

interface ColumnSelectorProps {
  columns: Column[];
  selectedColumns: string[];
  onColumnToggle: (columnKey: string) => void;
}

export default function ColumnSelector({ columns, selectedColumns, onColumnToggle }: ColumnSelectorProps) {
  return (
    <div className="column-selector">
      <h3 className="section-title">Select Columns</h3>
      <div className="checkbox-group">
        {columns.map(column => (
          <label key={column.key} className="checkbox-option">
            <input
              type="checkbox"
              checked={selectedColumns.includes(column.key)}
              onChange={() => onColumnToggle(column.key)}
            />
            <span>{column.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

