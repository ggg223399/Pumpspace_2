import React, { useState } from 'react';
import { Check, Search } from 'lucide-react';
import { useTradingTools } from '../../hooks/useTradingTools';

interface TradingToolsMenuProps {
  onClose: () => void;
}

interface TradingTool {
  id: string;
  name: string;
  icon: string;
}

const tradingTools: TradingTool[] = [
  { id: 'gmgn', name: 'GMGN', icon: '🌱' },
  { id: 'photon', name: 'Photon', icon: '🔷' },
  { id: 'bullx', name: 'Bullx', icon: '🎯' },
  { id: 'banana-gun', name: 'Banana Gun', icon: '🍌' },
  { id: 'maestro', name: 'Maestro', icon: '🎭' },
  { id: 'sol-trading-bot', name: 'SOL Trading Bot', icon: '🤖' },
  { id: 'pepe-boost', name: 'PEPE Boost', icon: '🐸' },
];

export function TradingToolsMenu({ onClose }: TradingToolsMenuProps) {
  const { selectedTool, tempSelectedTool, setSelectedTool, setTempSelectedTool, currentSelection } = useTradingTools();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTools = tradingTools.filter(tool =>
    tool.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleToolClick = (tool: TradingTool) => {
    setTempSelectedTool(tool);
  };

  const handleApply = () => {
    if (tempSelectedTool) {
      setSelectedTool(tempSelectedTool);
      onClose();
    }
  };

  return (
    <div className="absolute right-0 top-full mt-2 w-64 z-[100]">
      <div className="relative bg-[#0D1117] border border-gray-700 rounded-lg 
                    shadow-lg shadow-black/20">
        {/* Search Box */}
        <div className="p-3 border-b border-gray-700">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search tools..."
              className="w-full pl-9 pr-3 py-1.5 rounded-lg
                       bg-surface text-white placeholder-gray-400
                       border border-gray-700 focus:border-cyan-500
                       focus:outline-none focus:ring-1 focus:ring-cyan-500
                       text-sm transition-all duration-200"
            />
          </div>
        </div>

        {/* Tools List */}
        <div className="max-h-[280px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
          {filteredTools.map((tool) => (
            <button
              key={tool.id}
              onClick={() => handleToolClick(tool)}
              className={`w-full flex items-center space-x-3 px-3 py-2.5
                       transition-all duration-200 group
                       ${currentSelection?.id === tool.id
                         ? 'bg-cyan-500/10 text-cyan-400' 
                         : 'hover:bg-surface text-gray-300'}`}
            >
              <span className="text-lg flex-shrink-0">{tool.icon}</span>
              <span className="flex-1 text-left">{tool.name}</span>
              {currentSelection?.id === tool.id && (
                <Check size={16} className="text-cyan-400 flex-shrink-0" />
              )}
            </button>
          ))}
        </div>
        
        {/* Apply Button */}
        <div className="border-t border-gray-700 p-3 flex justify-end">
          <button
            onClick={handleApply}
            className={`px-6 py-1.5 rounded-lg text-sm
                     transition-all duration-200
                     ${tempSelectedTool && tempSelectedTool.id !== selectedTool.id
                       ? 'bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30'
                       : 'bg-gray-700/20 text-gray-400 cursor-not-allowed'}`}
            disabled={!tempSelectedTool || tempSelectedTool.id === selectedTool.id}
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}