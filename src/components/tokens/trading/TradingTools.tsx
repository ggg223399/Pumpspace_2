import React, { useState } from 'react';
import { Settings2 } from 'lucide-react';
import { TradingToolsMenu } from './TradingToolsMenu';
import { useTradingTools } from '../../../hooks/useTradingTools';

export function TradingTools() {
  const [showMenu, setShowMenu] = useState(false);
  const { selectedTool } = useTradingTools();

  return (
    <div className="relative flex items-center justify-end space-x-2">
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="p-1 rounded-md hover:bg-surface/80 transition-colors duration-200"
      >
        <Settings2 size={14} className="hover:text-cyan-400 transition-colors duration-200" />
      </button>
      {showMenu && <TradingToolsMenu onClose={() => setShowMenu(false)} />}
      {selectedTool && (
        <img 
          src={`/${selectedTool.id}-icon.png`}
          alt={selectedTool.name}
          className="w-4 h-4 opacity-80"
        />
      )}
    </div>
  );
}