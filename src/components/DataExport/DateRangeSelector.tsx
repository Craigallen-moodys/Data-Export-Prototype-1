import { DateRange } from '../../types';
import './DateRangeSelector.css';

interface DateRangeSelectorProps {
  dateRange: DateRange;
  onDateRangeChange: (dateRange: DateRange) => void;
  minDate?: string;
  maxDate?: string;
}

export default function DateRangeSelector({ 
  dateRange, 
  onDateRangeChange,
  minDate,
  maxDate 
}: DateRangeSelectorProps) {
  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newStartDate = e.target.value;
    if (newStartDate <= dateRange.endDate) {
      onDateRangeChange({
        ...dateRange,
        startDate: newStartDate,
      });
    }
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEndDate = e.target.value;
    if (newEndDate >= dateRange.startDate) {
      onDateRangeChange({
        ...dateRange,
        endDate: newEndDate,
      });
    }
  };

  return (
    <div className="date-range-selector">
      <h3 className="section-title">Date Range</h3>
      <div className="date-range-inputs">
        <div className="date-input-group">
          <label htmlFor="start-date" className="date-label">Start Date</label>
          <input
            id="start-date"
            type="date"
            value={dateRange.startDate}
            onChange={handleStartDateChange}
            min={minDate}
            max={dateRange.endDate || maxDate}
            className="date-input"
          />
        </div>
        <div className="date-separator">to</div>
        <div className="date-input-group">
          <label htmlFor="end-date" className="date-label">End Date</label>
          <input
            id="end-date"
            type="date"
            value={dateRange.endDate}
            onChange={handleEndDateChange}
            min={dateRange.startDate || minDate}
            max={maxDate}
            className="date-input"
          />
        </div>
      </div>
    </div>
  );
}

