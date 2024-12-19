import { useState, useCallback } from 'react';
import type { Token } from '../types/token';
import type { SortDirection } from '../types/sort';
import { useWebSocketSignals } from './useWebSocketSignals';

export function useSort() {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);
  const { signals } = useWebSocketSignals();

  const handleSort = useCallback((key: string) => {
    if (sortKey === key) {
      setSortDirection(current => {
        if (current === null) return 'desc';
        if (current === 'desc') return 'asc';
        return null;
      });
    } else {
      setSortKey(key);
      setSortDirection('desc');
    }

    if (sortDirection === 'asc') {
      setSortKey(null);
    }
  }, [sortKey, sortDirection]);

  const getSortedTokens = useCallback((tokens: Token[], pinnedTokens: Set<string>) => {
    const pinnedTokensList = tokens.filter(token => pinnedTokens.has(token.id));
    const unpinnedTokensList = tokens.filter(token => !pinnedTokens.has(token.id));

    const sortTokens = (tokenList: Token[]) => {
      if (!sortKey || !sortDirection) return tokenList;

      return [...tokenList].sort((a, b) => {
        let aValue: number;
        let bValue: number;

        switch (sortKey) {
          case 'amount':
            aValue = a.smartMoney.length;
            bValue = b.smartMoney.length;
            break;
          case 'avgBuyMC': {
            // Get buy signals for token A
            const aSignals = signals.filter(s => s.tokenAddress === a.address && s.type === 'buy');
            const aTotalMC = aSignals.reduce((sum, signal) => sum + parseFloat(signal.marketCap), 0);
            aValue = aSignals.length > 0 ? aTotalMC / aSignals.length : 0;

            // Get buy signals for token B
            const bSignals = signals.filter(s => s.tokenAddress === b.address && s.type === 'buy');
            const bTotalMC = bSignals.reduce((sum, signal) => sum + parseFloat(signal.marketCap), 0);
            bValue = bSignals.length > 0 ? bTotalMC / bSignals.length : 0;
            break;
          }
          case 'holders':
            aValue = parseInt(a.holders, 10);
            bValue = parseInt(b.holders, 10);
            break;
          default:
            return 0;
        }

        if (sortDirection === 'asc') {
          return aValue - bValue;
        }
        return bValue - aValue;
      });
    };

    return [...sortTokens(pinnedTokensList), ...sortTokens(unpinnedTokensList)];
  }, [sortKey, sortDirection, signals]);

  return {
    sortKey,
    sortDirection,
    handleSort,
    getSortedTokens
  };
}