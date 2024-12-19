import React, { useState } from 'react';

interface FilterRangeProps {
  suffix?: string;
  onChange: (min: number, max: number) => void;
}

export function FilterRange({ suffix, onChange }: FilterRangeProps) {
  const [minValue, setMinValue] = useState('');
  const [maxValue, setMaxValue] = useState('');

  const handleChange = (min: string, max: string) => {
    setMinValue(min);
    setMaxValue(max);
    onChange(
      min ? parseFloat(min) : 0,
      max ? parseFloat(max) : Infinity
    );
  };

  return (
    <div className="p-2 border-t border-gray-700">
      <div className="flex items-center space-x-2">
        <input
          type="number"
          value={minValue}
          onChange={(e) => handleChange(e.target.value, maxValue)}
          placeholder="0"
          className="w-16 px-2 py-1 text-sm bg-background text-white
                   border border-gray-700 rounded-md focus:border-cyan-500/50
                   focus:outline-none"
        />
        <span className="text-gray-400">to</span>
        <input
          type="number"
          value={maxValue}
          onChange={(e) => handleChange(minValue, e.target.value)}
          placeholder="∞"
          className="w-16 px-2 py-1 text-sm bg-background text-white
                   border border-gray-700 rounded-md focus:border-cyan-500/50
                   focus:outline-none"
        />
        {suffix && <span className="text-xs text-gray-400">{suffix}</span>}
      </div>
    </div>
  );
}