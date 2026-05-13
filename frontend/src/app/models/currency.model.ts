export interface Currency {
  symbol: string;
  name: string;
  symbol_native: string;
  decimal_digits: number;
  code: string;
}

export interface ConversionResult {
  from: string;
  to: string;
  rate: number;
  amount: number;
  result: number;
  date?: string;
}

export interface ConversionRecord {
  id: string;
  from: string;
  to: string;
  amount: number;
  result: number;
  rate: number;
  date: string;
  timestamp: string;
  isHistorical: boolean;
}
