import React from 'react';
import { useI18n } from '../../i18n/i18n';

type TimeFilter = '30m' | '1h' | '6h' | '1d';

interface TimeFiltersProps {
  active: TimeFilter;
  onChange: (filter: TimeFilter) => void;
}

export function TimeFilters({ active, onChange }: TimeFiltersProps) {
  const { t } = useI18n();
  
  const filters: TimeFilter[] = ['30m', '1h', '6h', '1d'];

  return (
    <div className="flex space-x-2">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => onChange(filter)}
          className={`px-3 py-1.5 rounded-lg transition-all duration-200
                   ${active === filter 
                     ? 'bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30' 
                     : 'bg-surface/50 text-gray-300 hover:bg-surface/80 hover:text-white'}`}
        >
          {t(`filters.time_filters.${filter}`)}
        </button>
      ))}
    </div>
  );
}