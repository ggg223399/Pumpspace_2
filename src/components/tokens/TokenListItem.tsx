import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { TokenNameSection } from './TokenNameSection';
import { TokenStats } from './TokenStats';
import { TokenActions } from './TokenActions';
import { useTokenDirection } from '../../hooks/useTokenDirection';
import { mockSignals } from '../../data/mockSignals';
import type { Token } from '../../types/token';

interface TokenListItemProps {
  token: Token;
  isPinned: boolean;
  onPinToggle: () => void;
}

export function TokenListItem({ token, isPinned, onPinToggle }: TokenListItemProps) {
  const direction = useTokenDirection(token, mockSignals);

  return (
    <div 
      className={`px-4 py-3 grid grid-cols-[1.5fr,0.8fr,1fr,1fr,1fr,0.8fr,0.8fr] gap-4 
                border-b border-gray-800 transition-all duration-500
                ${isPinned ? 'bg-cyan-950/20 hover:bg-cyan-900/30' : 'hover:bg-surface/50'}`}
    >
      <TokenNameSection
        name={token.name}
        address={token.address}
        isPinned={isPinned}
        onPinToggle={onPinToggle}
      />

      <TokenStats
        token={token}
        direction={direction}
      />

      <TokenActions token={token} />
    </div>
  );
}