import React, { useState } from 'react';
import { Radio, ChevronDown, Search, Users, ArrowUpDown } from 'lucide-react';
import { useI18n } from '../../i18n/i18n';
import { mockSignals } from '../../data/mockSignals';
import { formatTimeAgo } from '../../utils/time';

interface SignalsProps {
  isCollapsed: boolean;
  onCollapse: () => void;
}

export function Signals({ isCollapsed, onCollapse }: SignalsProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState(1);
  const { t } = useI18n();

  const filteredSignals = mockSignals.filter(signal =>
    signal.token.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`flex flex-col bg-background transition-all duration-300 ease-in-out
                   ${isCollapsed ? 'h-[52px]' : 'h-full'}`}>
      {/* Header */}
      <button
        onClick={onCollapse}
        className="w-full p-4 flex items-center justify-between
                 hover:bg-surface/50 transition-colors duration-200
                 border-t border-b border-gray-800 group"
      >
        <div className="flex items-center space-x-2">
          <Radio size={16} className="text-cyan-400" />
          <span className="font-medium text-white">Signals</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-xs text-cyan-400">•</span>
          <span className="text-xs text-gray-400">
            {/* TODO */}
            Last updates: 50s ago
          </span>
          <ChevronDown 
            size={16} 
            className={`text-gray-400 transition-transform duration-200
                     ${isCollapsed ? 'rotate-180' : ''}`}
          />
        </div>
      </button>

      {/* Collapsible Content */}
      <div className={`flex-1 flex flex-col overflow-hidden transition-all duration-300
                    ${isCollapsed ? 'h-0' : ''}`}>
        {/* Search */}
        <div className="p-4">
          <div className="relative">
            <Search 
              size={14} 
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" 
            />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by token address"
              className="w-full pl-9 pr-3 py-2 rounded-lg bg-surface/50 
                       text-white placeholder-gray-400 text-sm
                       border border-gray-700/50 focus:border-cyan-500/30
                       focus:outline-none focus:ring-1 focus:ring-cyan-500/30"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="px-4 pb-4 flex space-x-2">
          <button 
            onClick={() => setSelectedFilter(1)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg
                     bg-surface/50 text-gray-400 border border-gray-700/50
                     hover:bg-surface/80 transition-all duration-200
                     ${selectedFilter === 1 ? 'border-cyan-500/30' : ''}`}
          >
            <Users size={14} />
            <span className="text-sm">1</span>
          </button>
          <button 
            onClick={() => setSelectedFilter(2)}
            className={`flex-1 flex items-center justify-center space-x-2 px-4 py-2 rounded-lg
                     bg-surface/50 text-gray-400 border border-gray-700/50
                     hover:bg-surface/80 transition-all duration-200
                     ${selectedFilter === 2 ? 'border-cyan-500/30' : ''}`}
          >
            <ArrowUpDown size={14} />
            <span className="text-sm">Buy & Sell</span>
          </button>
        </div>

        {/* Signal List */}
        <div className="flex-1 overflow-y-auto px-4 space-y-2 pb-4">
          {filteredSignals.map((signal) => (
            <div 
              key={signal.id}
              className="group relative p-3 rounded-lg bg-surface/30 hover:bg-surface/50
                       border border-transparent hover:border-cyan-500/20
                       transition-all duration-200"
            >
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center space-x-1 text-sm">
                  <span className="text-gray-200">{signal.token}</span>
                  <span className="text-gray-500">{formatTimeAgo(signal.timestamp)}</span>
                  <span className="text-gray-400">⎋</span>
                </div>
              </div>
              <div className="text-sm">
                <span className={signal.type === 'buy' ? 'text-green-400' : 'text-red-400'}>
                  {signal.type === 'buy' ? 'Bought' : 'Sold'} {signal.amount}
                </span>
                {' '}
                <span className="text-gray-400">⟒ ⍙⟒</span>
                {' '}
                <span className="text-gray-300">{signal.price}</span>
                {' '}
                <span className="text-gray-400">with</span>
                {' '}
                <span className="text-gray-300">{signal.priceUsd}</span>
              </div>

              {/* Hover Effect Border */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100
                           pointer-events-none transition-opacity duration-200">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r
                             from-transparent via-cyan-500/50 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r
                             from-transparent via-cyan-500/50 to-transparent" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}