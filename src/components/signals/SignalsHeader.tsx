import React from 'react';
import { Radio, ChevronDown } from 'lucide-react';
import { useLastUpdate } from '../../hooks/useLastUpdate';

interface SignalsHeaderProps {
  lastUpdate: number;
  isCollapsed: boolean;
  onCollapse: () => void;
}

export function SignalsHeader({ lastUpdate, isCollapsed, onCollapse }: SignalsHeaderProps) {
  const displayTime = useLastUpdate(lastUpdate);

  return (
    <button
      onClick={onCollapse}
      className="w-full p-4 flex items-center justify-between
                hover:bg-surface/50 transition-colors duration-200
                border-t border-b border-gray-800 group"
    >
      <div className="flex items-center space-x-2">
        <Radio size={16} className="text-cyan-400" />
        <span className="font-medium text-white">Signals</span>
      </div>
      <div className="flex items-center space-x-2">
        <span className="text-xs text-cyan-400">•</span>
        <span className="text-xs text-gray-400">
          Last updates: {displayTime}
        </span>
        <ChevronDown 
          size={16} 
          className={`text-gray-400 transition-transform duration-200
                   ${isCollapsed ? 'rotate-180' : ''}`}
        />
      </div>
    </button>
  );
}