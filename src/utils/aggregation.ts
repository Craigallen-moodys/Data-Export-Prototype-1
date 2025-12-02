import { DataRecord, AggregatedRecord } from '../types';

export function aggregateDaily(data: DataRecord[]): AggregatedRecord[] {
  const groupedByDate = new Map<string, DataRecord[]>();

  // Group records by date (YYYY-MM-DD)
  data.forEach(record => {
    const date = new Date(record.date);
    const dateKey = date.toISOString().split('T')[0];
    
    if (!groupedByDate.has(dateKey)) {
      groupedByDate.set(dateKey, []);
    }
    groupedByDate.get(dateKey)!.push(record);
  });

  // Aggregate each day
  const aggregated: AggregatedRecord[] = [];
  
  groupedByDate.forEach((records, dateKey) => {
    const totalAmount = records.reduce((sum, record) => sum + record.amount, 0);
    const transactionCount = records.length;
    
    // Get most common category and region for the day
    const categoryCounts = new Map<string, number>();
    const regionCounts = new Map<string, number>();
    
    records.forEach(record => {
      categoryCounts.set(record.category, (categoryCounts.get(record.category) || 0) + 1);
      regionCounts.set(record.region, (regionCounts.get(record.region) || 0) + 1);
    });
    
    const mostCommonCategory = Array.from(categoryCounts.entries())
      .sort((a, b) => b[1] - a[1])[0][0];
    const mostCommonRegion = Array.from(regionCounts.entries())
      .sort((a, b) => b[1] - a[1])[0][0];

    aggregated.push({
      date: dateKey,
      totalAmount: Math.round(totalAmount * 100) / 100,
      transactionCount,
      category: mostCommonCategory,
      region: mostCommonRegion,
    });
  });

  // Sort by date
  return aggregated.sort((a, b) => a.date.localeCompare(b.date));
}

