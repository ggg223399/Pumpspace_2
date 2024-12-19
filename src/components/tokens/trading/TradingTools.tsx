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
        className={`p-1 rounded-md transition-all duration-200 
                 ${showMenu 
                   ? 'text-cyan-400 bg-cyan-500/20' 
                   : 'text-gray-400 hover:text-cyan-400 hover:bg-cyan-500/20'}`}
      >
        <Settings2 size={14} />
      </button>
      {showMenu && <TradingToolsMenu onClose={() => setShowMenu(false)} />}
      {/* {selectedTool && (
        <img 
          src={`/${selectedTool.id}-icon.png`}
          alt={selectedTool.name}
          className="w-4 h-4 opacity-80 group-hover:opacity-100 transition-opacity"
        />
      )} */}
    </div>
  );
}