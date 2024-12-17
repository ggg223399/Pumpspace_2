import React from 'react';
import { Filter } from 'lucide-react';

interface FilterIconProps {
  isActive?: boolean;
  onClick: () => void;
}

export function FilterIcon({ isActive, onClick }: FilterIconProps) {
  return (
    <button
      onClick={onClick}
      className={`ml-2 p-1 rounded-md transition-all duration-200 
                 ${isActive 
                   ? 'text-cyan-400 bg-cyan-500/20' 
                   : 'text-gray-400 hover:text-cyan-400 hover:bg-cyan-500/20'}`}
    >
      <Filter size={14} />
    </button>
  );
}