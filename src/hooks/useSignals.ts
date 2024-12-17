import { useState, useEffect, useCallback } from 'react';
import { mockSignals } from '../data/mockSignals';
import type { Signal } from '../types/signal';
import type { TimeFilter } from '../types/token';

export function useSignals(timeFilter: TimeFilter) {
  const [historicalSignals, setHistoricalSignals] = useState<Signal[]>([]);
  const [realtimeSignals, setRealtimeSignals] = useState<Signal[]>([]);
  const [isPaused, setIsPaused] = useState(false);

  // Load historical signals based on time filter
  useEffect(() => {
    const now = Date.now();
    const timeRanges = {
      '30m': 30 * 60 * 1000,
      '1h': 60 * 60 * 1000,
      '6h': 6 * 60 * 60 * 1000,
      '1d': 24 * 60 * 60 * 1000
    };

    const cutoffTime = now - timeRanges[timeFilter];
    const historical = mockSignals.filter(signal => 
      signal.timestamp <= now && signal.timestamp > cutoffTime
    );

    setHistoricalSignals(historical);
  }, [timeFilter]);

  // Handle real-time signals
  useEffect(() => {
    if (isPaused) return;

    const now = Date.now();
    const futureSignals = mockSignals
      .filter(signal => signal.timestamp > now)
      .sort((a, b) => a.timestamp - b.timestamp);

    let currentIndex = 0;

    const interval = setInterval(() => {
      if (currentIndex >= futureSignals.length) {
        clearInterval(interval);
        return;
      }

      const signal = futureSignals[currentIndex];
      if (Date.now() >= signal.timestamp) {
        setRealtimeSignals(prev => [signal, ...prev]);
        currentIndex++;
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isPaused]);

  // Combine historical and real-time signals
  const allSignals = useCallback(() => {
    return [...realtimeSignals, ...historicalSignals].sort((a, b) => b.timestamp - a.timestamp);
  }, [realtimeSignals, historicalSignals]);

  return {
    signals: allSignals(),
    isPaused,
    setIsPaused
  };
}