import { useMemo } from 'react';
import type { Signal } from '../types/signal';
import type { Token } from '../types/token';
import { formatMC } from '../utils/marketCap';

export function useTokenMC(token: Token, signals: Signal[]) {
  return useMemo(() => {
    // Get all signals for this token
    const tokenSignals = signals.filter(s => s.tokenAddress === token.address);

    if (tokenSignals.length === 0) {
      return {
        avgBuyMC: '0',
        formattedAvgBuyMC: '$0'
      };
    }

    // Calculate total market cap from buy signals only
    const buySignals = tokenSignals.filter(s => s.type === 'buy');
    const totalMC = buySignals.reduce((sum, signal) => {
      return sum + (parseFloat(signal.marketCap));
    }, 0);

    // Calculate average market cap from buys
    const avgMC = buySignals.length > 0 ? totalMC / buySignals.length : 0;
    
    return {
      avgBuyMC: avgMC.toString(),
      formattedAvgBuyMC: formatMC(avgMC)
    };
  }, [token.address, signals]);
}