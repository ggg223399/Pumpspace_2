import React from 'react';
import { useClickOutside } from '../../../hooks/common/dom/useClickOutside';
import { FilterPresets } from './FilterPresets';
import { FilterRange } from './FilterRange';
import type { FilterConfig } from '../../../types/filter';

interface FilterDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  config: FilterConfig;
  currentValue: number | null;
  onPresetSelect: (value: number) => void;
  onRangeChange: (min: number, max: number) => void;
  onApply: () => void;
  onReset: () => void;
}

export function FilterDropdown({
  isOpen,
  onClose,
  config,
  currentValue,
  onPresetSelect,
  onRangeChange,
  onApply,
  onReset
}: FilterDropdownProps) {
  const ref = useClickOutside<HTMLDivElement>(onClose);

  if (!isOpen) return null;

  return (
    <div 
      ref={ref}
      className="absolute right-0 top-full mt-2 w-48 z-50 bg-surface
                 border border-gray-700 rounded-lg shadow-lg animate-in fade-in"
    >
      <FilterPresets 
        presets={config.presets}
        currentValue={currentValue}
        onSelect={onPresetSelect}
      />
      
      <FilterRange
        suffix={config.suffix}
        onChange={onRangeChange}
      />

      <div className="flex items-center justify-between p-2 border-t border-gray-700">
        <button
          onClick={onReset}
          className="px-3 py-1 text-sm text-gray-400 hover:text-white
                   transition-colors duration-200"
        >
          Reset
        </button>
        <button
          onClick={onApply}
          className="px-3 py-1 text-sm rounded-md bg-cyan-500/20 
                   text-cyan-400 hover:bg-cyan-500/30
                   transition-colors duration-200"
        >
          Apply
        </button>
      </div>
    </div>
  );
}