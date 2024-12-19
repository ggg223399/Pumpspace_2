import React from 'react';
import { TokenListItem } from './TokenListItem';
import type { Token } from '../../types/token';
import type { Signal } from '../types/signal';


interface TokenListContentProps {
  tokens: Token[];
  pinnedTokens: Set<string>;
  onPinToggle: (id: string) => void;
  movingTokenId: string | null;
  newSignalToken: string | null;
}

export function TokenListContent({ 
  tokens, 
  pinnedTokens,
  onPinToggle,
  movingTokenId,
  newSignalToken
}: TokenListContentProps) {
  return (
    <div className="flex-1 overflow-y-auto">
      {tokens.map((token) => (
        <div
          key={token.id}
          className={`relative transition-all duration-500 ease-in-out
                   ${token.id === movingTokenId ? 'z-[1]' : ''}`}
          style={{
            animation: token.id === newSignalToken 
              ? 'slide-in-left 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards'
              : token.id === movingTokenId
                ? 'slide-in-left 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards'
                : undefined
          }}
        >
          <TokenListItem
            token={token}
            isPinned={pinnedTokens.has(token.id)}
            onPinToggle={() => onPinToggle(token.id)}
          />
        </div>
      ))}
    </div>
  );
}