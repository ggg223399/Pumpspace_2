import React, { useState } from 'react';
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import { FilterIcon } from './FilterIcon';
import { FilterDropdown } from './filters/FilterDropdown';
import type { SortDirection } from '../../types/sort';
import type { FilterState } from '../../types/filter';

interface SortableHeaderProps {
  label: string;
  sortKey: string;
  currentSort: string | null;
  direction: SortDirection;
  onSort: (key: string) => void;
  showFilter?: boolean;
  onPresetFilter?: (value: number) => void;
  onCustomFilter?: (min: number, max: number) => void;
  onApply?: () => void;
  onReset?: () => void;
  isFilterActive?: boolean;
  currentFilter?: FilterState;
  isPresetActive?: (value: number) => boolean;
  isPresetPending?: (value: number) => boolean;
  hasPendingChanges?: boolean;
  className?: string;
}

export function SortableHeader({ 
  label, 
  sortKey, 
  currentSort, 
  direction, 
  onSort,
  showFilter,
  onPresetFilter,
  onCustomFilter,
  onApply,
  onReset,
  isFilterActive,
  currentFilter,
  isPresetActive,
  isPresetPending,
  hasPendingChanges,
  className = ''
}: SortableHeaderProps) {
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const isActive = currentSort === sortKey;

  const getSortIcon = () => {
    if (!isActive) {
      return <ArrowUpDown size={14} className="transition-all duration-200" />;
    }

    if (direction === 'desc') {
      return <ArrowDown size={14} className="text-cyan-400" />;
    }
    
    if (direction === 'asc') {
      return <ArrowUp size={14} className="text-cyan-400" />;
    }

    return <ArrowUpDown size={14} className="text-cyan-400" />;
  };

  return (
    <div className={`flex items-center justify-end relative ${className}`}>
      <button
        onClick={() => onSort(sortKey)}
        className="relative flex items-center group"
      >
        <span 
          className={`text-sm transition-all duration-300 transform
                   ${isActive && direction 
                     ? 'text-cyan-400 font-medium -translate-x-5' 
                     : 'text-gray-400 group-hover:text-gray-300'
                   } group-hover:-translate-x-5`}
        >
          {label}
        </span>
        <span className={`absolute right-0 text-gray-400 transition-all duration-300
                       ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
        >
          {getSortIcon()}
        </span>
      </button>
      
      {showFilter && onPresetFilter && onCustomFilter && onApply && onReset && (
        <>
          <FilterIcon 
            isActive={isFilterActive || showFilterDropdown} 
            onClick={() => setShowFilterDropdown(!showFilterDropdown)}
          />
          <FilterDropdown
            type={sortKey}
            isOpen={showFilterDropdown}
            onClose={() => setShowFilterDropdown(false)}
            onPresetFilter={onPresetFilter}
            onCustomFilter={onCustomFilter}
            onApply={onApply}
            onReset={onReset}
            currentFilter={currentFilter}
            isPresetActive={isPresetActive || (() => false)}
            isPresetPending={isPresetPending || (() => false)}
            hasPendingChanges={hasPendingChanges}
          />
        </>
      )}
    </div>
  );
}