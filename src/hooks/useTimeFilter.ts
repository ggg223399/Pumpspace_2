import { useState, useEffect } from 'react';
import type { Token } from '../types/token';

type TimeFilter = '30m' | '1h' | '6h' | '1d';

export function useTimeFilter(tokens: Token[]) {
  const [activeTimeFilter, setActiveTimeFilter] = useState<TimeFilter>('1h');
  const [timeFilteredTokens, setTimeFilteredTokens] = useState(tokens);

  useEffect(() => {
    // Here you would typically make an API call with the time filter
    // For now, we'll just pass through the tokens
    setTimeFilteredTokens(tokens);
  }, [activeTimeFilter, tokens]);

  return { timeFilteredTokens, activeTimeFilter, setActiveTimeFilter };
}