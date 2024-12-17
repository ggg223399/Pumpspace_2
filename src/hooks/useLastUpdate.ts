import { useState, useEffect } from 'react';

export function useLastUpdate(timestamp: number) {
  const [displayTime, setDisplayTime] = useState('');

  useEffect(() => {
    const updateDisplay = () => {
      const seconds = Math.floor((Date.now() - timestamp) / 1000);
      
      if (seconds < 60) {
        setDisplayTime(`${seconds}s ago`);
      } else if (seconds < 3600) {
        const minutes = Math.floor(seconds / 60);
        setDisplayTime(`${minutes}m ago`);
      } else if (seconds < 86400) {
        const hours = Math.floor(seconds / 3600);
        setDisplayTime(`${hours}h ago`);
      } else {
        const days = Math.floor(seconds / 86400);
        setDisplayTime(`${days}d ago`);
      }
    };

    // Update immediately
    updateDisplay();

    // Then update every second
    const interval = setInterval(updateDisplay, 1000);

    return () => clearInterval(interval);
  }, [timestamp]);

  return displayTime;
}