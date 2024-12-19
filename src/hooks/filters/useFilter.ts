import { useState, useCallback } from 'react';
import type { FilterState } from '../../types/filter';

export function useFilter(key: string) {
  const [filter, setFilter] = useState<FilterState | null>(null);
  const [tempFilter, setTempFilter] = useState<FilterState | null>(null);

  const setPresetFilter = useCallback((value: number) => {
    setTempFilter({ type: 'preset', value });
  }, []);

  const setRangeFilter = useCallback((min: number, max: number) => {
    setTempFilter({ type: 'range', min, max });
  }, []);

  const applyFilter = useCallback(() => {
    setFilter(tempFilter);
  }, [tempFilter]);

  const resetFilter = useCallback(() => {
    setFilter(null);
    setTempFilter(null);
  }, []);

  const isActive = !!filter;
  const isPending = !!tempFilter && JSON.stringify(tempFilter) !== JSON.stringify(filter);

  return {
    filter,
    tempFilter,
    setPresetFilter,
    setRangeFilter,
    applyFilter,
    resetFilter,
    isActive,
    isPending
  };
}