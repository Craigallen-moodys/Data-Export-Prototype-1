# Data Export Prototype

A React + TypeScript prototype for a data export tool that allows users to customize CSV exports by selecting export types (daily aggregation) and columns.

## Features

- Single-page export configuration interface
- Export type selection (daily aggregation with sum)
- Column selection for CSV customization
- Real-time preview of aggregated data
- CSV download functionality
- UI matching Moody's design system

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to the URL shown in the terminal (typically `http://localhost:5173`)

## Project Structure

- `src/components/Layout/` - Header and Sidebar components
- `src/components/DataExport/` - Export configuration components
- `src/data/mockData.ts` - Mock dataset
- `src/utils/aggregation.ts` - Daily aggregation logic
- `src/utils/csvExport.ts` - CSV generation and download
- `src/types/index.ts` - TypeScript type definitions

## Usage

1. Select an export type (currently supports Daily aggregation)
2. Select the columns you want to include in the CSV
3. Review the preview table
4. Click "Export to CSV" to download the file

## Build

To create a production build:

```bash
npm run build
```

The built files will be in the `dist` directory.

