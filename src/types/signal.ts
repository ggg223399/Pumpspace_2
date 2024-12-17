export interface Signal {
  id: string;
  type: 'buy' | 'sell';
  token: string;
  tokenAddress: string;
  tokenAmount: string;
  solAmount: string;
  price: string;
  marketCap: string;
  priceUsd: string;
  timestamp: number;
  txHash: string;
  smartMoneyAddress: string;
  smartMoneyName: string;
}

export interface SignalFilter {
  id: number;
  name: string;
  icon: string;
}