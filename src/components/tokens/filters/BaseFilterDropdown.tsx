import React, { useState, useEffect } from 'react';
import { useClickOutside } from '../../../hooks/useClickOutside';
import type { FilterPreset, FilterState } from '../../../types/filter';

interface BaseFilterDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  onPresetFilter: (value: number) => void;
  onCustomFilter: (min: number, max: number) => void;
  onApply: () => void;
  onReset: () => void;
  presets: FilterPreset[];
  suffix?: string;
  currentFilter?: FilterState;
  isPresetActive: (value: number) => boolean;
  isPresetPending: (value: number) => boolean;
  hasPendingChanges?: boolean;
}

export function BaseFilterDropdown({ 
  isOpen, 
  onClose, 
  onPresetFilter,
  onCustomFilter,
  onApply,
  onReset,
  presets,
  suffix,
  currentFilter,
  isPresetActive,
  isPresetPending,
  hasPendingChanges
}: BaseFilterDropdownProps) {
  const [minValue, setMinValue] = useState<string>('');
  const [maxValue, setMaxValue] = useState<string>('');
  const [hasCustomRange, setHasCustomRange] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const ref = useClickOutside<HTMLDivElement>(onClose);

  // Sync with current filter
  useEffect(() => {
    if (!currentFilter) {
      setMinValue('');
      setMaxValue('');
      setHasCustomRange(false);
      return;
    }

    if (currentFilter.type === 'custom') {
      setMinValue(currentFilter.min?.toString() || '');
      setMaxValue(currentFilter.max === Infinity ? '' : currentFilter.max?.toString() || '');
      setHasCustomRange(true);
    }
  }, [currentFilter]);

  const handlePresetClick = (value: number) => {
    setIsResetting(false);
    onPresetFilter(value);
  };

  const handleCustomRangeChange = (min: string, max: string) => {
    setIsResetting(false);
    setHasCustomRange(true);
    setMinValue(min);
    setMaxValue(max);
    
    if (min || max) {
      onCustomFilter(
        min ? parseFloat(min) : 0,
        max ? parseFloat(max) : Infinity
      );
    }
  };

  const handleApply = () => {
    onApply();
    if (isResetting) {
      onReset();
    }
    onClose();
  };

  const handleReset = () => {
    setMinValue('');
    setMaxValue('');
    setHasCustomRange(false);
    setIsResetting(true);
    // Mark for reset but don't actually reset until Apply is clicked
    onPresetFilter(-1); // Use an invalid value to clear current selection
  };

  if (!isOpen) return null;

  const shouldEnableApply = hasPendingChanges || isResetting;

  return (
    <div 
      ref={ref}
      className="absolute right-0 top-full mt-2 w-48 z-50 bg-surface
                 border border-gray-700 rounded-lg shadow-lg animate-in fade-in"
    >
      {/* Preset Filters */}
      <div className="p-2 space-y-1">
        {presets.map((preset) => (
          <button
            key={preset.value}
            onClick={() => handlePresetClick(preset.value)}
            className={`w-full px-3 py-1.5 text-sm text-left rounded-md
                     transition-colors duration-200
                     ${isPresetActive(preset.value)
                       ? 'bg-cyan-500/20 text-cyan-400' 
                       : isPresetPending(preset.value)
                         ? 'bg-cyan-500/10 text-cyan-400'
                         : 'text-gray-300 hover:bg-cyan-500/10 hover:text-cyan-400'}`}
          >
            {preset.label}
          </button>
        ))}
      </div>

      {/* Custom Range */}
      <div className="p-2 border-t border-gray-700">
        <div className="flex items-center space-x-2">
          <input
            type="number"
            value={minValue}
            onChange={(e) => handleCustomRangeChange(e.target.value, maxValue)}
            placeholder="0"
            className={`w-16 px-2 py-1 text-sm bg-background text-white
                     border border-gray-700 rounded-md focus:border-cyan-500/50
                     focus:outline-none ${hasCustomRange ? 'border-cyan-500/30' : ''}`}
          />
          <span className="text-gray-400">to</span>
          <input
            type="number"
            value={maxValue}
            onChange={(e) => handleCustomRangeChange(minValue, e.target.value)}
            placeholder="∞"
            className={`w-16 px-2 py-1 text-sm bg-background text-white
                     border border-gray-700 rounded-md focus:border-cyan-500/50
                     focus:outline-none ${hasCustomRange ? 'border-cyan-500/30' : ''}`}
          />
          {suffix && <span className="text-xs text-gray-400">{suffix}</span>}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between p-2 border-t border-gray-700">
        <button
          onClick={handleReset}
          className={`px-3 py-1 text-sm transition-colors duration-200
                   ${isResetting ? 'text-cyan-400' : 'text-gray-400 hover:text-white'}`}
        >
          Reset
        </button>
        <button
          onClick={handleApply}
          disabled={!shouldEnableApply}
          className={`px-3 py-1 text-sm rounded-md transition-colors duration-200
                   ${shouldEnableApply
                     ? 'bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30'
                     : 'bg-gray-500/20 text-gray-400 cursor-not-allowed'}`}
        >
          Apply
        </button>
      </div>
    </div>
  );
}