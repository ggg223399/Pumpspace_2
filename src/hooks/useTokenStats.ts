import { useMemo } from 'react';
import type { Signal } from '../types/signal';
import type { Token } from '../types/token';

export function useTokenStats(token: Token, signals: Signal[]) {
  return useMemo(() => {
    const tokenSignals = signals.filter(s => s.tokenAddress === token.address);
    
    const buySignals = tokenSignals.filter(s => s.type === 'buy');
    const sellSignals = tokenSignals.filter(s => s.type === 'sell');

    const stats = {
      buyCount: buySignals.length,
      sellCount: sellSignals.length,
      totalBuyAmount: buySignals.reduce((sum, s) => sum + parseFloat(s.solAmount), 0),
      totalSellAmount: sellSignals.reduce((sum, s) => sum + parseFloat(s.solAmount), 0),
      avgBuyMC: 0
    };

    if (buySignals.length > 0) {
      const totalMC = buySignals.reduce((sum, s) => sum + parseFloat(s.marketCap), 0);
      stats.avgBuyMC = totalMC / buySignals.length;
    }

    return stats;
  }, [token.address, signals]);
}