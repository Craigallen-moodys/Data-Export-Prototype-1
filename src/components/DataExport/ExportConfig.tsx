import { useState } from 'react';
import { ExportType, AggregatedRecord } from '../../types';
import { mockData, availableColumns } from '../../data/mockData';
import { aggregateDaily } from '../../utils/aggregation';
import { generateCSV, downloadCSV } from '../../utils/csvExport';
import ExportTypeSelector from './ExportTypeSelector';
import ColumnSelector from './ColumnSelector';
import ExportButton from './ExportButton';
import './ExportConfig.css';

export default function ExportConfig() {
  const [exportType, setExportType] = useState<ExportType>('daily');
  const [selectedColumns, setSelectedColumns] = useState<string[]>(['date', 'totalAmount', 'transactionCount']);
  
  // Initialize preview data
  const getInitialPreview = (): AggregatedRecord[] => {
    return aggregateDaily(mockData);
  };
  
  const [previewData, setPreviewData] = useState<AggregatedRecord[]>(getInitialPreview);

  const handleTypeChange = (type: ExportType) => {
    setExportType(type);
    updatePreview(type, selectedColumns);
  };

  const handleColumnToggle = (columnKey: string) => {
    const newSelected = selectedColumns.includes(columnKey)
      ? selectedColumns.filter(col => col !== columnKey)
      : [...selectedColumns, columnKey];
    
    setSelectedColumns(newSelected);
    updatePreview(exportType, newSelected);
  };

  const updatePreview = (type: ExportType, columns: string[]) => {
    let aggregated: AggregatedRecord[];
    
    if (type === 'daily') {
      aggregated = aggregateDaily(mockData);
    } else {
      // For now, only daily is implemented
      aggregated = aggregateDaily(mockData);
    }
    
    setPreviewData(aggregated);
  };

  const handleExport = () => {
    if (selectedColumns.length === 0) {
      alert('Please select at least one column to export.');
      return;
    }

    let aggregated: AggregatedRecord[];
    
    if (exportType === 'daily') {
      aggregated = aggregateDaily(mockData);
    } else {
      aggregated = aggregateDaily(mockData);
    }

    const csvContent = generateCSV(aggregated, selectedColumns);
    const filename = `export_${exportType}_${new Date().toISOString().split('T')[0]}.csv`;
    downloadCSV(csvContent, filename);
  };


  return (
    <div className="export-config">
      <h1 className="page-title">Data Export</h1>
      
      <div className="config-sections">
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

      {previewData.length > 0 && (
        <div className="preview-section">
          <h3 className="section-title">Preview ({previewData.length} rows)</h3>
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
        </div>
      )}

      <div className="export-actions">
        <ExportButton
          onClick={handleExport}
          disabled={selectedColumns.length === 0}
        />
      </div>
    </div>
  );
}

