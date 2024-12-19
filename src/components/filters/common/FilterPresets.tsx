import React from 'react';
import type { FilterPreset } from '../../../types/filter';

interface FilterPresetsProps {
  presets: FilterPreset[];
  currentValue: number | null;
  onSelect: (value: number) => void;
}

export function FilterPresets({ presets, currentValue, onSelect }: FilterPresetsProps) {
  return (
    <div className="p-2 space-y-1">
      {presets.map((preset) => (
        <button
          key={preset.value}
          onClick={() => onSelect(preset.value)}
          className={`w-full px-3 py-1.5 text-sm text-left rounded-md
                   transition-colors duration-200
                   ${currentValue === preset.value
                     ? 'bg-cyan-500/20 text-cyan-400' 
                     : 'text-gray-300 hover:bg-cyan-500/10 hover:text-cyan-400'}`}
        >
          {preset.label}
        </button>
      ))}
    </div>
  );
}