import { useState, useCallback } from 'react';
import type { Token } from '../types/token';
import type { FilterState, FilterRange } from '../types/filter';

export function useFilters() {
  const [filters, setFilters] = useState<Record<string, FilterState>>({});
  const [tempFilters, setTempFilters] = useState<Record<string, FilterState>>({});

  const setPresetFilter = useCallback((key: string, value: number) => {
    setTempFilters(current => {
      // Special case: value -1 means reset
      if (value === -1) {
        const updated = { ...current };
        delete updated[key];
        return updated;
      }
      
      const existingFilter = current[key];
      
      // If clicking the same preset, remove it
      if (existingFilter?.type === 'preset' && existingFilter.preset === value) {
        const updated = { ...current };
        delete updated[key];
        return updated;
      }

      // Set new preset filter
      return {
        ...current,
        [key]: { type: 'preset', preset: value }
      };
    });
  }, []);

  const setCustomFilter = useCallback((key: string, min: number, max: number) => {
    setTempFilters(current => ({
      ...current,
      [key]: { type: 'custom', min, max }
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
        const value = getTokenValue(token, key);
        if (value === null) return true;
        
        const range = getFilterRange(filter);
        return value >= range.min && (range.max === Infinity || value <= range.max);
      });
    });
  }, [filters]);

  const getFilterRange = useCallback((filter: FilterState): FilterRange => {
    if (filter.type === 'preset') {
      return { min: filter.preset!, max: Infinity };
    }
    return { min: filter.min!, max: filter.max! };
  }, []);

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
    isFilterActive: (key: string) => key in filters,
    isPresetActive,
    isPresetPending,
    hasPendingChanges
  };
}

function getTokenValue(token: Token, key: string): number | null {
  switch (key) {
    case 'amount':
      return token.amount;
    case 'price':
      return parseFloat(token.price.replace(/[^0-9.]/g, ''));
    case 'holders':
      return parseInt(token.holders, 10);
    default:
      return null;
  }
}