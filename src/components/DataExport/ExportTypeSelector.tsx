import { ExportType } from '../../types';
import './ExportTypeSelector.css';

interface ExportTypeSelectorProps {
  selectedType: ExportType;
  onTypeChange: (type: ExportType) => void;
}

export default function ExportTypeSelector({ selectedType, onTypeChange }: ExportTypeSelectorProps) {
  return (
    <div className="export-type-selector">
      <h3 className="section-title">Export Type</h3>
      <div className="radio-group">
        <label className="radio-option">
          <input
            type="radio"
            name="exportType"
            value="daily"
            checked={selectedType === 'daily'}
            onChange={() => onTypeChange('daily')}
          />
          <span>Daily aggregation</span>
        </label>
        <label className="radio-option">
          <input
            type="radio"
            name="exportType"
            value="weekly"
            checked={selectedType === 'weekly'}
            onChange={() => onTypeChange('weekly')}
          />
          <span>Weekly aggregation</span>
        </label>
        <label className="radio-option">
          <input
            type="radio"
            name="exportType"
            value="monthly"
            checked={selectedType === 'monthly'}
            onChange={() => onTypeChange('monthly')}
          />
          <span>Monthly aggregation</span>
        </label>
      </div>
    </div>
  );
}

