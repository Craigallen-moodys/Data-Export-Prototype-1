import { AggregatedRecord } from '../types';

export function generateCSV(data: AggregatedRecord[], selectedColumns: string[]): string {
  if (data.length === 0) {
    return '';
  }

  // Filter columns to only include selected ones
  const columns = selectedColumns.filter(col => {
    // Check if column exists in the first record
    return data[0].hasOwnProperty(col);
  });

  if (columns.length === 0) {
    return '';
  }

  // Generate header row
  const headers = columns.map(col => escapeCSVValue(col));
  const headerRow = headers.join(',');

  // Generate data rows
  const rows = data.map(record => {
    return columns.map(col => {
      const value = record[col];
      return escapeCSVValue(String(value));
    }).join(',');
  });

  // Combine header and rows
  return [headerRow, ...rows].join('\n');
}

function escapeCSVValue(value: string): string {
  // If value contains comma, quote, or newline, wrap in quotes and escape quotes
  if (value.includes(',') || value.includes('"') || value.includes('\n')) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

export function downloadCSV(csvContent: string, filename: string = 'export.csv'): void {
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  URL.revokeObjectURL(url);
}

