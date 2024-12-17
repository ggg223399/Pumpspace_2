import React from 'react';
import { formatTimeAgo } from '../../utils/time';
import type { Signal } from '../../types/signal';

interface SignalListProps {
  signals: Signal[];
}

export function SignalList({ signals }: SignalListProps) {
  return (
    <div className="flex-1 overflow-y-auto space-y-1 p-2">
      {signals.map((signal) => (
        <div
          key={signal.id}
          className="p-3 rounded-lg bg-surface/30 hover:bg-surface/50
                   border border-transparent hover:border-cyan-500/20
                   transition-all duration-200 group"
        >
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center space-x-2">
              <span className={signal.type === 'buy' ? 'text-green-400' : 'text-red-400'}>
                {signal.type === 'buy' ? 'Bought' : 'Sold'} {signal.amount}
              </span>
              <span className="text-gray-400">w</span>
              <span className="text-gray-200">{signal.price}</span>
            </div>
            <span className="text-xs text-gray-500">
              {formatTimeAgo(signal.timestamp)}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">with {signal.priceUsd}</span>
            <span className="text-gray-300">{signal.token}</span>
          </div>

          {/* Hover Effect Border */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100
                       pointer-events-none transition-opacity duration-200">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r
                         from-transparent via-cyan-500/50 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r
                         from-transparent via-cyan-500/50 to-transparent" />
          </div>
        </div>
      ))}
    </div>
  );
}