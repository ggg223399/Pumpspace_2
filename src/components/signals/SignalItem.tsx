import React from 'react';
import { useLastUpdate } from '../../hooks/useLastUpdate';
import { useToast } from '../../hooks/useToast';
import type { Signal } from '../../types/signal';

interface SignalItemProps {
  signal: Signal;
}

export function SignalItem({ signal }: SignalItemProps) {
  const { showToast } = useToast();
  const displayTime = useLastUpdate(signal.timestamp);

  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(signal.tokenAddress);
      showToast('Token address copied to clipboard', { type: 'success' });
    } catch (err) {
      showToast('Failed to copy address', { type: 'error' });
    }
  };

  const formatAmount = (amount: string) => {
    const num = parseInt(amount, 10);
    return `${(num / 1000000).toFixed(1)}M`;
  };

  return (
    <div className="group relative p-3 rounded-lg bg-surface/30 hover:bg-surface/50
                   border border-transparent hover:border-cyan-500/20
                   transition-all duration-200">
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center space-x-1 text-sm">
          <span className="text-gray-200">{signal.smartMoneyName}</span>
          <span className="text-gray-500">{displayTime}</span>
        </div>
      </div>
      <div className="text-sm">
        <span className={signal.type === 'buy' ? 'text-green-400' : 'text-red-400'}>
          {signal.type === 'buy' ? 'Bought' : 'Sold'}
        </span>
        {' '}
        <button
          onClick={handleCopyAddress}
          className="text-gray-200 hover:text-cyan-400 transition-colors duration-200"
        >
          {formatAmount(signal.tokenAmount)} {signal.token}
        </button>
        {' '}
        <span className="text-gray-400">(${signal.price} M:${signal.marketCap})</span>
        {' '}
        <span className="text-gray-400">with</span>
        {' '}
        <span className="text-gray-200">{signal.solAmount} SOL</span>
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
  );
}