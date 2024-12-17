import { useState, useEffect } from 'react';
import { mockTokens } from '../data/mockTokens';
import type { Token } from '../types/token';
import type { Signal } from '../types/signal';

export function useTokenList(signals: Signal[]) {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [movingTokenId, setMovingTokenId] = useState<string | null>(null);
  const [newSignalToken, setNewSignalToken] = useState<string | null>(null);

  // Initialize tokens based on historical signals
  useEffect(() => {
    const uniqueTokenAddresses = new Set(signals.map(s => s.tokenAddress));
    const relevantTokens = mockTokens.filter(token => 
      uniqueTokenAddresses.has(token.address)
    );

    // Update smart money counts based on signals
    const updatedTokens = relevantTokens.map(token => {
      const tokenSignals = signals.filter(s => s.tokenAddress === token.address);
      const smartMoneyAddresses = new Set<string>();

      tokenSignals.forEach(signal => {
        if (signal.type === 'buy') {
          smartMoneyAddresses.add(signal.smartMoneyAddress);
        } else if (signal.type === 'sell') {
          smartMoneyAddresses.delete(signal.smartMoneyAddress);
        }
      });

      return {
        ...token,
        smartMoney: Array.from(smartMoneyAddresses)
      };
    });

    setTokens(updatedTokens);
  }, []);

  // Handle real-time updates
  useEffect(() => {
    if (signals.length === 0) return;
    
    const latestSignal = signals[0];
    setTokens(current => {
      const tokenIndex = current.findIndex(t => t.address === latestSignal.tokenAddress);
      
      // If token doesn't exist yet, add it
      if (tokenIndex === -1) {
        const newToken = mockTokens.find(t => t.address === latestSignal.tokenAddress);
        if (!newToken) return current;

        const token = {
          ...newToken,
          smartMoney: latestSignal.type === 'buy' ? [latestSignal.smartMoneyAddress] : []
        };

        setNewSignalToken(token.id);
        setTimeout(() => setNewSignalToken(null), 600);

        return [token, ...current];
      }

      // Update existing token
      const token = current[tokenIndex];
      const prevSmCount = token.smartMoney.length;
      const updatedToken = { ...token };

      if (latestSignal.type === 'buy') {
        if (!updatedToken.smartMoney.includes(latestSignal.smartMoneyAddress)) {
          updatedToken.smartMoney = [...updatedToken.smartMoney, latestSignal.smartMoneyAddress];
        }
      } else {
        updatedToken.smartMoney = updatedToken.smartMoney.filter(
          sm => sm !== latestSignal.smartMoneyAddress
        );
      }

      // Only move token if SM count increased
      if (updatedToken.smartMoney.length > prevSmCount) {
        setMovingTokenId(token.id);
        setTimeout(() => setMovingTokenId(null), 500);

        const withoutCurrent = current.filter((_, i) => i !== tokenIndex);
        return [updatedToken, ...withoutCurrent];
      }

      const updated = [...current];
      updated[tokenIndex] = updatedToken;
      return updated;
    });
  }, [signals]);

  return {
    tokens,
    movingTokenId,
    newSignalToken
  };
}