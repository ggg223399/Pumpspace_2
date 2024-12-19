import React from 'react';
import { TokenListControls } from './TokenListControls';
import { TokenListHeader } from './TokenListHeader';
import { TokenListContent } from './TokenListContent';
import { useFilters } from '../../hooks/useFilters';
import { useSort } from '../../hooks/useSort';
import { usePinnedTokens } from '../../hooks/usePinnedTokens';
import { useTokenList } from '../../hooks/useTokenList';
import { useWebSocketSignals } from '../../hooks/useWebSocketSignals';
import { useSearch } from '../../hooks/useSearch';
import { useTimeFilter } from '../../hooks/useTimeFilter';

export function TokenList() {
  const { signals } = useWebSocketSignals();
  const { tokens, movingTokenId, newSignalToken } = useTokenList(signals);
  const { searchTerm, setSearchTerm, filteredTokens } = useSearch(tokens);
  const { activeTimeFilter, setActiveTimeFilter, timeFilteredTokens } = useTimeFilter(filteredTokens);
  const filters = useFilters();
  const { sortKey, sortDirection, handleSort, getSortedTokens } = useSort();
  const { pinnedTokens, togglePin } = usePinnedTokens();
  
  const filterResults = filters.filterTokens(timeFilteredTokens);
  const sortedTokens = getSortedTokens(filterResults, pinnedTokens);

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