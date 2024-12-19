import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { useTokenMC } from '../../hooks/useTokenMC';
import { useTokenTransactions } from '../../hooks/useTokenTransactions';
import { useWebSocketSignals } from '../../hooks/useWebSocketSignals';
import { formatPrice } from '../../utils/price';
import type { Token } from '../../types/token';

interface TokenStatsProps {
  token: Token;
  direction: 'up' | 'down' | null;
}

export function TokenStats({ token, direction }: TokenStatsProps) {
  const { signals } = useWebSocketSignals();
  const { formattedAvgBuyMC } = useTokenMC(token, signals);
  const { formattedBuyStats, formattedSellStats } = useTokenTransactions(token, signals);

  return (
    <>
      <div className="flex flex-col items-end">
        <div className="flex items-center space-x-2">
          <span className="text-white">{token.smartMoney.length}</span>
          {direction !== null && (
            <div className={`transition-all duration-200 ${
              direction === 'up' ? 'text-green-400' : 'text-red-400'
            }`}>
              {direction === 'up' ? (
                <ArrowUp size={16} className="fill-current" />
              ) : (
                <ArrowDown size={16} className="fill-current" />
              )}
            </div>
          )}
        </div>
        <div className="text-xs text-gray-400">7 from watchlist</div>
      </div>

      <div className="text-right">
        <div className="text-white">{formattedAvgBuyMC}</div>
        <div className="text-xs text-gray-400">Price: {formatPrice(token.price)}</div>
      </div>

      <div className="text-right">
        <div className="text-cyan-400">{token.invested} SOL</div>
        <div className="text-xs text-gray-400">{formattedBuyStats}</div>
      </div>

      <div className="text-right">
        <div className="text-red-400">{token.sold} SOL</div>
        <div className="text-xs text-gray-400">{formattedSellStats}</div>
      </div>

      <div className="text-right">
        <div className="text-white">{token.holders}</div>
        <div className="text-xs text-gray-400">Holders</div>
      </div>
    </>
  );
}