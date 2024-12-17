import React from 'react';
import type { SignalFilter } from '../../types/signal';

interface SignalFiltersProps {
  filters: SignalFilter[];
  activeFilter: number;
  onFilterChange: (id: number) => void;
}

export function SignalFilters({ filters, activeFilter, onFilterChange }: SignalFiltersProps) {
  return (
    <div className="flex space-x-2 p-4">
      {filters.map((filter) => (
        <button
          key={filter.id}
          onClick={() => onFilterChange(filter.id)}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg
                     transition-all duration-200 text-sm
                     ${activeFilter === filter.id 
                       ? 'bg-cyan-500/20 text-cyan-400' 
                       : 'bg-surface/50 text-gray-400 hover:bg-surface/80'}`}
        >
          <span>{filter.icon}</span>
          <span>{filter.name}</span>
          <span className="text-xs ml-1">1</span>
        </button>
      ))}
    </div>
  );
}