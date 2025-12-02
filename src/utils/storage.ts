import { ExportConfig } from '../types';

const STORAGE_KEY = 'dataExport_lastConfig';

export function saveLastExportConfig(config: ExportConfig): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  } catch (error) {
    console.error('Failed to save export config to localStorage:', error);
  }
}

export function loadLastExportConfig(): ExportConfig | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored) as ExportConfig;
    }
  } catch (error) {
    console.error('Failed to load export config from localStorage:', error);
  }
  return null;
}

export function clearLastExportConfig(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear export config from localStorage:', error);
  }
}

