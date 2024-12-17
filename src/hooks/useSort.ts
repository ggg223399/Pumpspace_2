import { useState, useCallback } from 'react';
import type { Token } from '../types/token';
import type { SortDirection } from '../components/tokens/SortableHeader';

export function useSort(initialTokens: Token[]) {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);

  const handleSort = useCallback((key: string) => {
    if (sortKey === key) {
      // Cycle through: null -> desc -> asc -> null
      setSortDirection(current => {
        if (current === null) return 'desc';    // First click: desc
        if (current === 'desc') return 'asc';   // Second click: asc
        return null;                            // Third click: null (reset)
      });
    } else {
      // New column: start with desc
      setSortKey(key);
      setSortDirection('desc');
    }

    // Reset sortKey only when direction becomes null
    if (sortDirection === 'asc') {
      setSortKey(null);
    }
  }, [sortKey, sortDirection]);

  const getSortedTokens = useCallback((tokens: Token[]) => {
    if (!sortKey || !sortDirection) return tokens;

    return [...tokens].sort((a, b) => {
      let aValue = a[sortKey as keyof Token];
      let bValue = b[sortKey as keyof Token];

      // Convert string numbers to actual numbers
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        if (aValue.startsWith('$')) {
          aValue = parseFloat(aValue.replace(/[$,K]/g, ''));
          bValue = parseFloat(bValue.replace(/[$,K]/g, ''));
        } else if (!isNaN(parseFloat(aValue))) {
          aValue = parseFloat(aValue);
          bValue = parseFloat(bValue);
        }
      }

      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }, [sortKey, sortDirection]);

  return {
    sortKey,
    sortDirection,
    handleSort,
    getSortedTokens
  };
}