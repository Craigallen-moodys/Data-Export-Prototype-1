import { useState, useEffect } from 'react';
import { ExportType, AggregatedRecord, ExportTemplate, DateRange } from '../../types';
import { mockData, availableColumns } from '../../data/mockData';
import { exportTemplates } from '../../data/templates';
import { aggregateDaily } from '../../utils/aggregation';
import { generateCSV, downloadCSV } from '../../utils/csvExport';
import { saveLastExportConfig, loadLastExportConfig } from '../../utils/storage';
import TemplateSelector from './TemplateSelector';
import DateRangeSelector from './DateRangeSelector';
import ExportTypeSelector from './ExportTypeSelector';
import ColumnSelector from './ColumnSelector';
import ExportButton from './ExportButton';
import './ExportConfig.css';

// Calculate min and max dates from mock data
const getDateRangeFromData = (): { minDate: string; maxDate: string } => {
  const dates = mockData.map(record => new Date(record.date));
  const minDate = new Date(Math.min(...dates.map(d => d.getTime())));
  const maxDate = new Date(Math.max(...dates.map(d => d.getTime())));
  
  return {
    minDate: minDate.toISOString().split('T')[0],
    maxDate: maxDate.toISOString().split('T')[0],
  };
};

export default function ExportConfig() {
  const { minDate, maxDate } = getDateRangeFromData();

  // Load saved configuration or use defaults
  const getInitialConfig = () => {
    const saved = loadLastExportConfig();
    if (saved && saved.dateRange) {
      return {
        exportType: saved.exportType,
        selectedColumns: saved.selectedColumns,
        templateId: saved.templateId || null,
        dateRange: saved.dateRange,
      };
    }
    return {
      exportType: 'daily' as ExportType,
      selectedColumns: ['date', 'totalAmount', 'transactionCount'],
      templateId: null as string | null,
      dateRange: { startDate: minDate, endDate: maxDate } as DateRange,
    };
  };

  const initialConfig = getInitialConfig();
  const [exportType, setExportType] = useState<ExportType>(initialConfig.exportType);
  const [selectedColumns, setSelectedColumns] = useState<string[]>(initialConfig.selectedColumns);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(initialConfig.templateId);
  const [dateRange, setDateRange] = useState<DateRange>(initialConfig.dateRange);
  const [usingSavedConfig, setUsingSavedConfig] = useState<boolean>(!!loadLastExportConfig());
  
  // Initialize preview data
  const getInitialPreview = (): AggregatedRecord[] => {
    return aggregateDaily(mockData, dateRange);
  };
  
  const [previewData, setPreviewData] = useState<AggregatedRecord[]>(getInitialPreview);

  // Update preview when config changes
  useEffect(() => {
    updatePreview(exportType, selectedColumns, dateRange);
  }, [exportType, selectedColumns, dateRange]);

  const handleTemplateSelect = (template: ExportTemplate | null) => {
    if (template) {
      setExportType(template.exportType);
      setSelectedColumns(template.selectedColumns);
      setSelectedTemplateId(template.id);
      setUsingSavedConfig(false);
    } else {
      setSelectedTemplateId(null);
    }
  };

  const handleTypeChange = (type: ExportType) => {
    setExportType(type);
    setSelectedTemplateId(null); // Clear template when manually changing type
    setUsingSavedConfig(false);
  };

  const handleColumnToggle = (columnKey: string) => {
    const newSelected = selectedColumns.includes(columnKey)
      ? selectedColumns.filter(col => col !== columnKey)
      : [...selectedColumns, columnKey];
    
    setSelectedColumns(newSelected);
    setSelectedTemplateId(null); // Clear template when manually changing columns
    setUsingSavedConfig(false);
  };

  const handleDateRangeChange = (newDateRange: DateRange) => {
    setDateRange(newDateRange);
    setUsingSavedConfig(false);
  };

  const updatePreview = (type: ExportType, columns: string[], range: DateRange) => {
    let aggregated: AggregatedRecord[];
    
    if (type === 'daily') {
      aggregated = aggregateDaily(mockData, range);
    } else {
      // For now, only daily is implemented
      aggregated = aggregateDaily(mockData, range);
    }
    
    setPreviewData(aggregated);
  };

  const handleExport = () => {
    if (selectedColumns.length === 0) {
      alert('Please select at least one column to export.');
      return;
    }

    if (!dateRange.startDate || !dateRange.endDate) {
      alert('Please select a valid date range.');
      return;
    }

    let aggregated: AggregatedRecord[];

    if (exportType === 'daily') {
      aggregated = aggregateDaily(mockData, dateRange);
    } else {
      aggregated = aggregateDaily(mockData, dateRange);
    }

    if (aggregated.length === 0) {
      alert('No data found for the selected date range.');
      return;
    }

    const csvContent = generateCSV(aggregated, selectedColumns);
    const filename = `export_${exportType}_${dateRange.startDate}_to_${dateRange.endDate}.csv`;
    downloadCSV(csvContent, filename);

    // Save the current configuration
    saveLastExportConfig({
      exportType,
      selectedColumns,
      templateId: selectedTemplateId || undefined,
      dateRange,
    });
  };


  return (
    <div className="export-config">
      <h1 className="page-title">Data Export</h1>
      
      {usingSavedConfig && (
        <div className="saved-config-notice">
          <span className="notice-icon">ℹ️</span>
          <span>Your last export configuration has been loaded.</span>
        </div>
      )}

      <div className="config-sections">
        <TemplateSelector
          templates={exportTemplates}
          selectedTemplateId={selectedTemplateId}
          onTemplateSelect={handleTemplateSelect}
        />
        
        <DateRangeSelector
          dateRange={dateRange}
          onDateRangeChange={handleDateRangeChange}
          minDate={minDate}
          maxDate={maxDate}
        />
        
        <ExportTypeSelector
          selectedType={exportType}
          onTypeChange={handleTypeChange}
        />
        
        <ColumnSelector
          columns={availableColumns}
          selectedColumns={selectedColumns}
          onColumnToggle={handleColumnToggle}
        />
      </div>

      <div className="preview-section">
        <h3 className="section-title">Preview {previewData.length > 0 ? `(${previewData.length} rows)` : ''}</h3>
        {previewData.length > 0 ? (
          <div className="preview-table-container">
            <table className="preview-table">
              <thead>
                <tr>
                  {selectedColumns.map(col => (
                    <th key={col}>{availableColumns.find(c => c.key === col)?.label || col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {previewData.slice(0, 10).map((row, idx) => (
                  <tr key={idx}>
                    {selectedColumns.map(col => (
                      <td key={col}>{String(row[col] || '')}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            {previewData.length > 10 && (
              <div className="preview-note">Showing first 10 of {previewData.length} rows</div>
            )}
          </div>
        ) : (
          <div className="preview-empty">
            <p>No data found for the selected date range ({dateRange.startDate} to {dateRange.endDate}).</p>
            <p className="preview-empty-hint">Try adjusting the date range to see data.</p>
          </div>
        )}
      </div>

      <div className="export-actions">
        <ExportButton
          onClick={handleExport}
          disabled={selectedColumns.length === 0}
        />
      </div>
    </div>
  );
}

