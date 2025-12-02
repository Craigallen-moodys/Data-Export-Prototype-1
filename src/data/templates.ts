import { ExportTemplate } from '../types';

export const exportTemplates: ExportTemplate[] = [
  {
    id: 'banking-clients',
    name: 'Banking Clients',
    description: 'Optimized for banking client data with daily aggregation and financial metrics',
    exportType: 'daily',
    selectedColumns: ['date', 'totalAmount', 'transactionCount', 'category', 'region'],
    clientType: 'banking',
  },
  {
    id: 'government',
    name: 'Government',
    description: 'Government reporting format with weekly aggregation and compliance fields',
    exportType: 'weekly',
    selectedColumns: ['date', 'totalAmount', 'transactionCount', 'region'],
    clientType: 'government',
  },
  {
    id: 'corporate',
    name: 'Corporate',
    description: 'Standard corporate export with monthly aggregation',
    exportType: 'monthly',
    selectedColumns: ['date', 'totalAmount', 'transactionCount', 'category'],
    clientType: 'corporate',
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Minimal export with date and total amount only',
    exportType: 'daily',
    selectedColumns: ['date', 'totalAmount'],
    clientType: 'custom',
  },
];

