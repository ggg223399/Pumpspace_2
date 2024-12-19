import { useState, useCallback } from 'react';
import type { Token } from '../types/token';
import type { FilterState, FilterRange } from '../types/filter';
import { useWebSocketSignals } from './useWebSocketSignals';

export function useFilters() {
  const [filters, setFilters] = useState<Record<string, FilterState>>({});
  const [tempFilters, setTempFilters] = useState<Record<string, FilterState>>({});
  const { signals } = useWebSocketSignals();

  const setPresetFilter = useCallback((key: string, value: number) => {
    // For avgBuyMC, the preset values are already in thousands
    setTempFilters(current => ({
      ...current,
      [key]: { type: 'preset', preset: value }
    }));
  }, []);

  const setCustomFilter = useCallback((key: string, min: number, max: number) => {
    // For avgBuyMC, multiply input values by 1000
    const multiplier = key === 'avgBuyMC' ? 1000 : 1;
    setTempFilters(current => ({
      ...current,
      [key]: { 
        type: 'custom', 
        min: min * multiplier, 
        max: max === Infinity ? Infinity : max * multiplier 
      }
    }));
  }, []);

  const applyFilters = useCallback(() => {
    setFilters(tempFilters);
  }, [tempFilters]);

  const resetFilter = useCallback((key: string) => {
    setTempFilters(current => {
      const updated = { ...current };
      delete updated[key];
      return updated;
    });
    setFilters(current => {
      const updated = { ...current };
      delete updated[key];
      return updated;
    });
  }, []);

  const filterTokens = useCallback((tokens: Token[]) => {
    return tokens.filter(token => {
      return Object.entries(filters).every(([key, filter]) => {
        let value: number;
        
        switch (key) {
          case 'amount':
            value = token.smartMoney.length;
            break;
          case 'avgBuyMC': {
            const tokenSignals = signals.filter(s => s.tokenAddress === token.address && s.type === 'buy');
            if (tokenSignals.length === 0) return false;
            const totalMC = tokenSignals.reduce((sum, signal) => sum + parseFloat(signal.marketCap), 0);
            value = totalMC / tokenSignals.length;
            break;
          }
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

  const isFilterActive = useCallback((key: string) => {
    return key in filters;
  }, [filters]);

  const isPresetActive = useCallback((key: string, value: number) => {
    const filter = filters[key];
    return filter?.type === 'preset' && filter.preset === value;
  }, [filters]);

  const isPresetPending = useCallback((key: string, value: number) => {
    const tempFilter = tempFilters[key];
    return tempFilter?.type === 'preset' && tempFilter.preset === value;
  }, [tempFilters]);

  const hasPendingChanges = useCallback((key: string) => {
    const temp = tempFilters[key];
    const current = filters[key];
    
    if (!temp && !current) return false;
    if (!temp || !current) return true;
    if (temp.type !== current.type) return true;
    
    if (temp.type === 'preset') {
      return temp.preset !== current.preset;
    }
    
    return temp.min !== current.min || temp.max !== current.max;
  }, [filters, tempFilters]);

  return {
    filters,
    tempFilters,
    setPresetFilter,
    setCustomFilter,
    applyFilters,
    resetFilter,
    filterTokens,
    isFilterActive,
    isPresetActive,
    isPresetPending,
    hasPendingChanges
  };
}

function getFilterRange(filter: FilterState): FilterRange {
  if (filter.type === 'preset') {
    return { min: filter.preset!, max: Infinity };
  }
  return { min: filter.min!, max: filter.max! };
}