import { useState, useEffect } from 'react';
import type { Token } from '../types/token';

export function useTokens() {
  const [tokens, setTokens] = useState<Token[]>([]);

  useEffect(() => {
    // Setup WebSocket connection
    const ws = new WebSocket('wss://your-api-endpoint');

    ws.onmessage = (event) => {
      const newToken = JSON.parse(event.data);
      setTokens(current => [newToken, ...current.filter(t => t.id !== newToken.id)]);
    };

    return () => ws.close();
  }, []);

  return { tokens };
}