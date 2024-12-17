import { useMemo } from 'react';
import type { Signal } from '../types/signal';
import type { Token, TokenTransaction } from '../types/token';
import { calculateAvgBuyMC, formatMC } from '../utils/marketCap';

export function useTokenMC(token: Token, signals: Signal[]) {
  return useMemo(() => {
    // Get all buy transactions for this token
    const buyTransactions: TokenTransaction[] = signals
      .filter(s => s.tokenAddress === token.address && s.type === 'buy')
      .map(s => ({
        price: parseFloat(s.price),
        amount: parseFloat(s.tokenAmount),
        timestamp: s.timestamp
      }));

    // Calculate average buy MC
    const avgBuyMC = calculateAvgBuyMC(buyTransactions, token.tokenSupply);
    
    return {
      avgBuyMC,
      formattedAvgBuyMC: formatMC(avgBuyMC)
    };
  }, [token, signals]);
}