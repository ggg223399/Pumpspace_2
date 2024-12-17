import { useMemo } from 'react';
import type { Signal } from '../types/signal';
import type { Token } from '../types/token';

interface TransactionStats {
  totalSol: number;
  txCount: number;
}

export function useTokenTransactions(token: Token, signals: Signal[]) {
  return useMemo(() => {
    // Get all transactions for this token
    const tokenSignals = signals.filter(s => s.tokenAddress === token.address);

    // Calculate buy stats
    const buyStats = tokenSignals
      .filter(s => s.type === 'buy')
      .reduce<TransactionStats>(
        (acc, signal) => ({
          totalSol: acc.totalSol + parseFloat(signal.solAmount),
          txCount: acc.txCount + 1
        }),
        { totalSol: 0, txCount: 0 }
      );

    // Calculate sell stats
    const sellStats = tokenSignals
      .filter(s => s.type === 'sell')
      .reduce<TransactionStats>(
        (acc, signal) => ({
          totalSol: acc.totalSol + parseFloat(signal.solAmount),
          txCount: acc.txCount + 1
        }),
        { totalSol: 0, txCount: 0 }
      );

    return {
      buyStats,
      sellStats,
      formattedBuyStats: `${buyStats.totalSol.toFixed(1)} SOL/${buyStats.txCount} txns`,
      formattedSellStats: `${sellStats.totalSol.toFixed(1)} SOL/${sellStats.txCount} txns`
    };
  }, [token, signals]);
}