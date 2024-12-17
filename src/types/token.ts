export type TimeFilter = '30m' | '1h' | '6h' | '1d';

export interface Token {
  id: string;
  name: string;
  address: string;
  smartMoney: string[];
  decimal: number;
  tokenSupply: number;
  price: string;
  invested: string;
  sold: string;
  holders: string;
  timestamp: number;
}

export interface TokenTransaction {
  price: number;
  amount: number;
  timestamp: number;
}