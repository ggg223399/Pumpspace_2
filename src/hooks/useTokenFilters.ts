import { useCallback } from 'react';
import type { Token } from '../types/token';
import type { FilterState } from '../types/filter';
import { useTokenStats } from './useTokenStats';
import { useWebSocketSignals } from './useWebSocketSignals';

export function useTokenFilters(filters: Record<string, FilterState>) {
  const { signals } = useWebSocketSignals();

  const filterTokens = useCallback((tokens: Token[]) => {
    return tokens.filter(token => {
      const stats = useTokenStats(token, signals);

      return Object.entries(filters).every(([key, filter]) => {
        let value: number;
        
        switch (key) {
          case 'amount':
            value = token.smartMoney.length;
            break;
          case 'avgBuyMC':
            value = stats.avgBuyMC;
            break;
          case 'holders':
            value = parseInt(token.holders, 10);
            break;
          default:
            return true;
        }

        const range = getFilterRange(filter);
        return value >= range.min && (range.max === Infinity || value <= range.max);
      });
    });
  }, [filters, signals]);

  return { filterTokens };
}

function getFilterRange(filter: FilterState) {
  if (filter.type === 'preset') {
    return { min: filter.preset!, max: Infinity };
  }
  return { min: filter.min!, max: filter.max! };
}