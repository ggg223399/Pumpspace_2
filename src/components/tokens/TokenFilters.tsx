import React from 'react';
import { Search, X } from 'lucide-react';
import { useI18n } from '../../i18n/i18n';

interface TokenFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  activeTimeFilter: string;
  onTimeFilterChange: (filter: string) => void;
}

export function TokenFilters({ 
  searchTerm, 
  onSearchChange,
  activeTimeFilter,
  onTimeFilterChange 
}: TokenFiltersProps) {
  const { t } = useI18n();
  const timeFilters = ['30m', '1h', '6h', '1d'];

  return (
    <div className="flex items-center justify-between p-4 bg-surface border-b border-gray-800">
      <div className="flex items-center space-x-4">
        {/* Search Box */}
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={t('filters.search_placeholder')}
            className="w-64 pl-9 pr-8 py-1.5 rounded-lg bg-background
                     text-white placeholder-gray-400
                     border border-gray-700/50 focus:border-cyan-500/30
                     transition-all duration-200"
          />
          {searchTerm && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2
                       text-gray-400 hover:text-cyan-400
                       transition-colors duration-200"
            >
              <X size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Time Filters */}
      <div className="flex space-x-2">
        {timeFilters.map((filter) => (
          <button
            key={filter}
            onClick={() => onTimeFilterChange(filter)}
            className={`px-3 py-1 rounded-lg transition-all duration-200
                     ${activeTimeFilter === filter 
                       ? 'bg-cyan-500/20 text-cyan-400' 
                       : 'bg-background text-white hover:bg-surface'}`}
          >
            {t(`filters.time_filters.${filter}`)}
          </button>
        ))}
      </div>
    </div>
  );
}