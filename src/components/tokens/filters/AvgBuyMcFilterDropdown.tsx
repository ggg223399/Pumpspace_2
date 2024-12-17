import React, { useState } from 'react';
import { useClickOutside } from '../../../hooks/useClickOutside';

interface AvgBuyMcFilterDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (min: number, max: number) => void;
}

export function AvgBuyMcFilterDropdown({ isOpen, onClose, onApply }: AvgBuyMcFilterDropdownProps) {
  const [minValue, setMinValue] = useState<string>('');
  const [maxValue, setMaxValue] = useState<string>('');
  const ref = useClickOutside<HTMLDivElement>(onClose);

  const presets = [
    { label: '> 50k', value: 50000 },
    { label: '> 100k', value: 100000 },
    { label: '> 500k', value: 500000 }
  ];

  const handleReset = () => {
    setMinValue('');
    setMaxValue('');
  };

  const handleApply = () => {
    onApply(
      minValue ? parseFloat(minValue) : 0,
      maxValue ? parseFloat(maxValue) : Infinity
    );
    onClose();
  };

  const handlePresetClick = (value: number) => {
    setMinValue(value.toString());
    setMaxValue('');
    onApply(value, Infinity);
    onClose();
  };

  if (!isOpen) return null;

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
            className="w-full px-3 py-1.5 text-sm text-left rounded-md
                     text-gray-300 hover:bg-cyan-500/10 hover:text-cyan-400
                     transition-colors duration-200"
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
            onChange={(e) => setMinValue(e.target.value)}
            placeholder="0"
            className="w-16 px-2 py-1 text-sm bg-background text-white
                     border border-gray-700 rounded-md focus:border-cyan-500/50
                     focus:outline-none"
          />
          <span className="text-gray-400">to</span>
          <input
            type="number"
            value={maxValue}
            onChange={(e) => setMaxValue(e.target.value)}
            placeholder="∞"
            className="w-16 px-2 py-1 text-sm bg-background text-white
                     border border-gray-700 rounded-md focus:border-cyan-500/50
                     focus:outline-none"
          />
          <span className="text-xs text-gray-400">K</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between p-2 border-t border-gray-700">
        <button
          onClick={handleReset}
          className="px-3 py-1 text-sm text-gray-400 hover:text-white
                   transition-colors duration-200"
        >
          Reset
        </button>
        <button
          onClick={handleApply}
          className="px-3 py-1 text-sm bg-cyan-500/20 text-cyan-400
                   rounded-md hover:bg-cyan-500/30
                   transition-colors duration-200"
        >
          Apply
        </button>
      </div>
    </div>
  );
}