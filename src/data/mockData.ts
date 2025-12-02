import { DataRecord } from '../types';

export const mockData: DataRecord[] = [
  { id: '1', date: '2024-01-15T10:30:00', amount: 1250.50, category: 'Sales', userId: 'user001', description: 'Product A sale', region: 'North' },
  { id: '2', date: '2024-01-15T14:20:00', amount: 890.25, category: 'Sales', userId: 'user002', description: 'Product B sale', region: 'South' },
  { id: '3', date: '2024-01-15T16:45:00', amount: 2100.00, category: 'Sales', userId: 'user001', description: 'Product C sale', region: 'North' },
  { id: '4', date: '2024-01-16T09:15:00', amount: 750.75, category: 'Sales', userId: 'user003', description: 'Product A sale', region: 'East' },
  { id: '5', date: '2024-01-16T11:30:00', amount: 1500.00, category: 'Sales', userId: 'user002', description: 'Product B sale', region: 'South' },
  { id: '6', date: '2024-01-16T15:20:00', amount: 3200.50, category: 'Sales', userId: 'user001', description: 'Product C sale', region: 'North' },
  { id: '7', date: '2024-01-17T08:45:00', amount: 980.00, category: 'Sales', userId: 'user003', description: 'Product A sale', region: 'East' },
  { id: '8', date: '2024-01-17T12:10:00', amount: 1750.25, category: 'Sales', userId: 'user002', description: 'Product B sale', region: 'South' },
  { id: '9', date: '2024-01-17T17:30:00', amount: 2400.00, category: 'Sales', userId: 'user001', description: 'Product C sale', region: 'North' },
  { id: '10', date: '2024-01-18T10:00:00', amount: 1100.50, category: 'Sales', userId: 'user003', description: 'Product A sale', region: 'East' },
  { id: '11', date: '2024-01-18T13:45:00', amount: 1950.75, category: 'Sales', userId: 'user002', description: 'Product B sale', region: 'South' },
  { id: '12', date: '2024-01-18T16:20:00', amount: 2800.00, category: 'Sales', userId: 'user001', description: 'Product C sale', region: 'North' },
  { id: '13', date: '2024-01-19T09:30:00', amount: 850.25, category: 'Sales', userId: 'user003', description: 'Product A sale', region: 'East' },
  { id: '14', date: '2024-01-19T11:15:00', amount: 1650.50, category: 'Sales', userId: 'user002', description: 'Product B sale', region: 'South' },
  { id: '15', date: '2024-01-19T14:50:00', amount: 3100.00, category: 'Sales', userId: 'user001', description: 'Product C sale', region: 'North' },
  { id: '16', date: '2024-01-20T08:20:00', amount: 920.75, category: 'Sales', userId: 'user003', description: 'Product A sale', region: 'East' },
  { id: '17', date: '2024-01-20T12:30:00', amount: 1800.25, category: 'Sales', userId: 'user002', description: 'Product B sale', region: 'South' },
  { id: '18', date: '2024-01-20T15:45:00', amount: 2700.50, category: 'Sales', userId: 'user001', description: 'Product C sale', region: 'North' },
];

export const availableColumns = [
  { key: 'date', label: 'Date' },
  { key: 'totalAmount', label: 'Total Amount' },
  { key: 'transactionCount', label: 'Transaction Count' },
  { key: 'category', label: 'Category' },
  { key: 'region', label: 'Region' },
];

