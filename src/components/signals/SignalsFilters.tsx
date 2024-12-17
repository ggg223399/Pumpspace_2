import React, { useState } from 'react';
import { Users, ArrowUpDown } from 'lucide-react';
import { SmartMoneyDropdown } from './filters/SmartMoneyDropdown';
import { TradeTypeFilter } from './filters/TradeTypeFilter';

interface SignalsFiltersProps {
  selectedSmartMoneyIds: string[];
  onSmartMoneyChange: (ids: string[]) => void;
  selectedTradeType: 'all' | 'buy' | 'sell';
  onTradeTypeChange: (type: 'all' | 'buy' | 'sell') => void;
}

export function SignalsFilters({
  selectedSmartMoneyIds,
  onSmartMoneyChange,
  selectedTradeType,
  onTradeTypeChange
}: SignalsFiltersProps) {
  const [showSmDropdown, setShowSmDropdown] = useState(false);
  const [showTradeTypeDropdown, setShowTradeTypeDropdown] = useState(false);

  return (
    <div className="px-4 pb-4 flex space-x-2">
      {/* Smart Money Filter */}
      <div className="relative">
        <button 
          onClick={() => setShowSmDropdown(!showSmDropdown)}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg
                   bg-surface/50 border border-gray-700/50
                   hover:bg-surface/80 transition-all duration-200 group
                   ${selectedSmartMoneyIds.length > 0 ? 'border-cyan-500/30' : ''}`}
        >
          <Users size={14} className={`${
            selectedSmartMoneyIds.length > 0 ? 'text-cyan-400' : 'text-gray-400'
          } group-hover:text-cyan-400 transition-colors`} />
          <span className={`text-sm ${
            selectedSmartMoneyIds.length > 0 ? 'text-cyan-400' : 'text-gray-400'
          } group-hover:text-cyan-400`}>
            {selectedSmartMoneyIds.length || '0'} Selected
          </span>
        </button>
        <SmartMoneyDropdown
          isOpen={showSmDropdown}
          onClose={() => setShowSmDropdown(false)}
          selectedIds={selectedSmartMoneyIds}
          onChange={onSmartMoneyChange}
        />
      </div>

      {/* Trade Type Filter */}
      <div className="relative flex-1">
        <button 
          onClick={() => setShowTradeTypeDropdown(!showTradeTypeDropdown)}
          className={`w-full flex items-center justify-center space-x-2 px-4 py-2 rounded-lg
                   bg-surface/50 border border-gray-700/50
                   hover:bg-surface/80 transition-all duration-200 group
                   ${selectedTradeType !== 'all' ? 'border-cyan-500/30' : ''}`}
        >
          <ArrowUpDown size={14} className={`${
            selectedTradeType !== 'all' ? 'text-cyan-400' : 'text-gray-400'
          } group-hover:text-cyan-400 transition-colors`} />
          <span className={`text-sm ${
            selectedTradeType !== 'all' ? 'text-cyan-400' : 'text-gray-400'
          } group-hover:text-cyan-400`}>
            {selectedTradeType === 'all' ? 'Buy & Sell' : 
             selectedTradeType === 'buy' ? 'Buy Only' : 'Sell Only'}
          </span>
        </button>
        <TradeTypeFilter
          isOpen={showTradeTypeDropdown}
          onClose={() => setShowTradeTypeDropdown(false)}
          selected={selectedTradeType}
          onChange={onTradeTypeChange}
        />
      </div>
    </div>
  );
}