import { useState, useCallback } from 'react';

export function usePinnedTokens() {
  const [pinnedTokens, setPinnedTokens] = useState<Set<string>>(new Set());

  const togglePin = useCallback((id: string) => {
    setPinnedTokens(current => {
      const newPinned = new Set(current);
      if (newPinned.has(id)) {
        newPinned.delete(id);
      } else {
        newPinned.add(id);
      }
      return newPinned;
    });
  }, []);

  return {
    pinnedTokens,
    togglePin
  };
}