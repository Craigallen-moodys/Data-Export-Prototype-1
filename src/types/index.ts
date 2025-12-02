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

export interface ExportConfig {
  exportType: ExportType;
  selectedColumns: string[];
}

