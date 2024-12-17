import React, { useState } from 'react';
import { TokenListControls } from './TokenListControls';
import { TokenListHeader } from './TokenListHeader';
import { TokenListContent } from './TokenListContent';
import { useFilters } from '../../hooks/useFilters';
import { useSort } from '../../hooks/useSort';
import { usePinnedTokens } from '../../hooks/usePinnedTokens';
import { useTokenList } from '../../hooks/useTokenList';
import { useWebSocketSignals } from '../../hooks/useWebSocketSignals';
import type { TimeFilter } from '../../types/token';

export function TokenList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTimeFilter, setActiveTimeFilter] = useState<TimeFilter>('1h');
  const { signals } = useWebSocketSignals();
  const { tokens, movingTokenId, newSignalToken } = useTokenList(signals);
  const filters = useFilters();
  const { sortKey, sortDirection, handleSort, getSortedTokens } = useSort();
  const { pinnedTokens, togglePin } = usePinnedTokens();
  
  // Filter tokens by search term
  const searchFiltered = tokens.filter(token => 
    token.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    token.address.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const filteredTokens = filters.filterTokens(searchFiltered);
  const sortedTokens = getSortedTokens(filteredTokens);

  return (
    <div className="flex-1 flex flex-col bg-background overflow-hidden">
      <TokenListControls
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        activeTimeFilter={activeTimeFilter}
        onTimeFilterChange={setActiveTimeFilter}
      />
      <TokenListHeader
        sortKey={sortKey}
        sortDirection={sortDirection}
        onSort={handleSort}
        filters={filters}
      />
      <TokenListContent 
        tokens={sortedTokens}
        pinnedTokens={pinnedTokens}
        onPinToggle={togglePin}
        movingTokenId={movingTokenId}
        newSignalToken={newSignalToken}
      />
    </div>
  );
}