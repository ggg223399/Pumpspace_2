import React from 'react';
import { useTradingTools } from '../../hooks/useTradingTools';
import type { Token } from '../../types/token';

interface TokenActionsProps {
  token: Token;
}

export function TokenActions({ token }: TokenActionsProps) {
  const { selectedTool } = useTradingTools();

  const handleBuyClick = () => {
    if (!selectedTool) return;
    
    const baseUrls = {
      gmgn: 'https://gmgn.ai/trade/',
      photon: 'https://photon.trade/',
      bullx: 'https://bullx.trade/',
      'banana-gun': 'https://banana.gun/trade/',
      maestro: 'https://maestro.trade/',
      'sol-trading-bot': 'https://sol-trading-bot.com/',
      'pepe-boost': 'https://pepe-boost.trade/'
    };

    const url = `${baseUrls[selectedTool.id as keyof typeof baseUrls]}${token.address}`;
    window.open(url, '_blank');
  };

  return (
    <div className="text-right">
      <button
        onClick={handleBuyClick}
        className="ml-auto px-4 py-1.5 rounded-lg bg-surface hover:bg-surface/80 
                 text-white border border-gray-700/50 hover:border-cyan-500/30
                 transition-all duration-200 group flex items-center justify-end space-x-2"
      >
        <span>Buy</span>
        {selectedTool && (
          <img 
            src={`/${selectedTool.id}-icon.png`}
            alt={selectedTool.name}
            className="w-4 h-4 opacity-80 group-hover:opacity-100 transition-opacity"
          />
        )}
      </button>
    </div>
  );
}