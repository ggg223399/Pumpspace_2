import React from 'react';
import { Search, X } from 'lucide-react';

interface SignalsSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export function SignalsSearch({ value, onChange }: SignalsSearchProps) {
  return (
    <div className="p-4">
      <div className="relative group">
        <Search 
          size={14} 
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 
                   group-hover:text-cyan-400 transition-colors" 
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search by token address"
          className="w-full pl-9 pr-8 py-2 rounded-lg
                   bg-surface/50 text-white placeholder-gray-400
                   border border-gray-700/50 
                   hover:border-cyan-500/30 hover:bg-surface/80
                   focus:border-cyan-500/50 focus:outline-none
                   focus:ring-1 focus:ring-cyan-500/30
                   text-sm transition-all duration-200"
        />
        {value && (
          <button
            onClick={() => onChange('')}
            className="absolute right-3 top-1/2 -translate-y-1/2
                     text-gray-400 hover:text-cyan-400
                     transition-colors duration-200"
          >
            <X size={14} className="hover:scale-110 transition-transform duration-200" />
          </button>
        )}
      </div>
    </div>
  );
}