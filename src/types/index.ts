export interface DataRecord {
  id: string;
  date: string;
  amount: number;
  category: string;
  userId: string;
  description: string;
  region: string;
}

export interface AggregatedRecord {
  date: string;
  totalAmount: number;
  transactionCount: number;
  [key: string]: string | number;
}

export type ExportType = 'daily' | 'weekly' | 'monthly';

export interface DateRange {
  startDate: string; // YYYY-MM-DD format
  endDate: string;   // YYYY-MM-DD format
}

export interface ExportConfig {
  exportType: ExportType;
  selectedColumns: string[];
  templateId?: string;
  dateRange?: DateRange;
}

export interface ExportTemplate {
  id: string;
  name: string;
  description: string;
  exportType: ExportType;
  selectedColumns: string[];
  clientType: 'banking' | 'government' | 'corporate' | 'custom';
}

