import { useCallback } from 'react';
import type { Token } from '../types/token';
import type { SortDirection } from '../types/sort';
import { useTokenStats } from './useTokenStats';
import { useWebSocketSignals } from './useWebSocketSignals';

export function useTokenSort() {
  const { signals } = useWebSocketSignals();

  const sortTokens = useCallback((
    tokens: Token[], 
    sortKey: string | null,
    sortDirection: SortDirection,
    pinnedTokens: Set<string>
  ) => {
    const pinnedList = tokens.filter(token => pinnedTokens.has(token.id));
    const unpinnedList = tokens.filter(token => !pinnedTokens.has(token.id));

    const sortList = (tokenList: Token[]) => {
      if (!sortKey || !sortDirection) return tokenList;

      return [...tokenList].sort((a, b) => {
        const statsA = useTokenStats(a, signals);
        const statsB = useTokenStats(b, signals);

        let aValue: number;
        let bValue: number;

        switch (sortKey) {
          case 'amount':
            aValue = a.smartMoney.length;
            bValue = b.smartMoney.length;
            break;
          case 'avgBuyMC':
            aValue = statsA.avgBuyMC;
            bValue = statsB.avgBuyMC;
            break;
          case 'holders':
            aValue = parseInt(a.holders, 10);
            bValue = parseInt(b.holders, 10);
            break;
          default:
            return 0;
        }

        return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
      });
    };

    return [...sortList(pinnedList), ...sortList(unpinnedList)];
  }, [signals]);

  return { sortTokens };
}