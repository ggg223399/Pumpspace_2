import React, { useState } from 'react';
import { Diamond, Pause, Search, X } from 'lucide-react';
import { useI18n } from '../../i18n/i18n';
import type { TimeFilter } from '../../types/token';

interface TokenListControlsProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  activeTimeFilter: TimeFilter;
  onTimeFilterChange: (filter: TimeFilter) => void;
}

export function TokenListControls({
  searchTerm,
  onSearchChange,
  activeTimeFilter,
  onTimeFilterChange
}: TokenListControlsProps) {
  const { t } = useI18n();
  const [isPaused, setIsPaused] = useState(false);
  const [showPause, setShowPause] = useState(false);

  const timeFilters: TimeFilter[] = ['30m', '1h', '6h', '1d'];

  return (
    <div className="bg-surface border-b border-gray-800">
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center space-x-2 relative">
          <Diamond size={16} className="text-cyan-400" />
          <span className="text-white font-medium">
            {t('filters.chad_bags')}
          </span>
          <div 
            className={`absolute left-full ml-2 transition-all duration-300 transform
                     ${showPause ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'}`}
          >
            <button
              onClick={() => setIsPaused(!isPaused)}
              className={`flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg
                       bg-surface/80 backdrop-blur-sm
                       border border-gray-700/50 
                       ${isPaused 
                         ? 'text-red-400 hover:border-red-500/30' 
                         : 'text-gray-400 hover:border-cyan-500/30'}
                       transition-all duration-200`}
            >
              <Pause size={14} className="transition-transform duration-200 hover:scale-110" />
              <span className="text-xs font-medium">{t('filters.pause')}</span>
            </button>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {/* Search Box */}
          <div className="relative group">
            <Search 
              size={16} 
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-cyan-400 transition-colors" 
            />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={t('filters.search_placeholder')}
              className="w-64 pl-9 pr-8 py-1.5 rounded-lg
                       bg-surface/50 text-white placeholder-gray-400
                       border border-gray-700/50 
                       hover:border-cyan-500/30 hover:bg-surface/80
                       focus:border-cyan-500/50 focus:outline-none
                       focus:ring-1 focus:ring-cyan-500/30
                       transition-all duration-200"
            />
            {searchTerm && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-1/2 -translate-y-1/2
                         text-gray-400 hover:text-cyan-400
                         transition-colors duration-200"
              >
                <X size={14} className="hover:scale-110 transition-transform duration-200" />
              </button>
            )}
          </div>

          {/* Time Filters */}
          <div className="flex space-x-2">
            {timeFilters.map((filter) => (
              <button
                key={filter}
                onClick={() => onTimeFilterChange(filter)}
                className={`px-3 py-1.5 rounded-lg transition-all duration-200
                         ${activeTimeFilter === filter 
                           ? 'bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30' 
                           : 'bg-surface/50 text-gray-300 hover:bg-surface/80 hover:text-white'}`}
              >
                {t(`filters.time_filters.${filter}`)}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}