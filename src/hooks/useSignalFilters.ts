import { useState, useCallback } from 'react';
import { mockSmartMoney } from '../data/mockSmartMoney';
import type { Signal } from '../types/signal';

export function useSignalFilters() {
  const [selectedSmartMoneyIds, setSelectedSmartMoneyIds] = useState<string[]>([]);
  const [selectedTradeType, setSelectedTradeType] = useState<'all' | 'buy' | 'sell'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filterSignals = useCallback((signals: Signal[]) => {
    return signals.filter(signal => {
      // Filter by search term
      if (searchTerm && !signal.tokenAddress.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }

      // Filter by trade type
      if (selectedTradeType !== 'all' && signal.type !== selectedTradeType) {
        return false;
      }

      // Filter by smart money
      if (selectedSmartMoneyIds.length > 0) {
        return selectedSmartMoneyIds.includes(signal.smartMoneyAddress);
      }

      return true;
    });
  }, [selectedSmartMoneyIds, selectedTradeType, searchTerm]);

  return {
    selectedSmartMoneyIds,
    setSelectedSmartMoneyIds,
    selectedTradeType,
    setSelectedTradeType,
    searchTerm,
    setSearchTerm,
    filterSignals
  };
}