import React from 'react';
import { SignalsHeader } from './SignalsHeader';
import { SignalsSearch } from './SignalsSearch';
import { SignalsFilters } from './SignalsFilters';
import { SignalsList } from './SignalsList';
import { useSignalFilters } from '../../hooks/useSignalFilters';
import { useWebSocketSignals } from '../../hooks/useWebSocketSignals';

interface SignalsProps {
  isCollapsed: boolean;
  onCollapse: () => void;
}

export function Signals({ isCollapsed, onCollapse }: SignalsProps) {
  const {
    selectedSmartMoneyIds,
    setSelectedSmartMoneyIds,
    selectedTradeType,
    setSelectedTradeType,
    searchTerm,
    setSearchTerm,
    filterSignals
  } = useSignalFilters();

  const { signals, isPaused, setIsPaused } = useWebSocketSignals();
  const filteredSignals = filterSignals(signals);

  return (
    <div className={`flex flex-col bg-background transition-all duration-300 ease-in-out
                   ${isCollapsed ? 'h-[52px]' : 'h-full'}`}>
      <SignalsHeader 
        lastUpdate={signals[0]?.timestamp || Date.now()}
        isCollapsed={isCollapsed}
        onCollapse={onCollapse}
        isPaused={isPaused}
        onPauseChange={setIsPaused}
      />
      
      <div className={`flex-1 flex flex-col overflow-hidden transition-all duration-300
                    ${isCollapsed ? 'h-0' : ''}`}>
        <SignalsSearch value={searchTerm} onChange={setSearchTerm} />
        <SignalsFilters
          selectedSmartMoneyIds={selectedSmartMoneyIds}
          onSmartMoneyChange={setSelectedSmartMoneyIds}
          selectedTradeType={selectedTradeType}
          onTradeTypeChange={setSelectedTradeType}
        />
        <SignalsList signals={filteredSignals} />
      </div>
    </div>
  );
}