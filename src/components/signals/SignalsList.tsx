import React from 'react';
import { SignalItem } from './SignalItem';
import type { Signal } from '../../types/signal';

interface SignalsListProps {
  signals: Signal[];
}

export function SignalsList({ signals }: SignalsListProps) {
  // Sort signals by timestamp in descending order (newest first)
  const sortedSignals = [...signals].sort((a, b) => b.timestamp - a.timestamp);

  return (
    <div className="flex-1 overflow-y-auto px-4 space-y-2 pb-4">
      {sortedSignals.map((signal) => (
        <SignalItem key={signal.id} signal={signal} />
      ))}
    </div>
  );
}