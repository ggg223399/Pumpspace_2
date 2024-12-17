import React from 'react';

interface TokenPulseProps {
  type: 'buy' | 'sell';
  children: React.ReactNode;
}

export function TokenPulse({ type, children }: TokenPulseProps) {
  const baseColor = type === 'buy' ? 'rgb(34 197 94)' : 'rgb(239 68 68)';
  const glowColor = type === 'buy' ? 'rgb(134 239 172)' : 'rgb(252 165 165)';
  
  return (
    <div className="relative">
      {/* Background pulse effect */}
      <div
        className="absolute inset-0 animate-cyber-pulse"
        style={{
          background: `linear-gradient(90deg, 
            ${baseColor}00 0%, 
            ${baseColor}20 50%, 
            ${baseColor}00 100%
          )`,
          boxShadow: `0 0 20px ${baseColor}30`,
        }}
      />
      
      {/* Scanning line effect */}
      <div
        className="absolute inset-0 animate-cyber-scan"
        style={{
          background: `linear-gradient(90deg,
            transparent 0%,
            ${glowColor}20 45%,
            ${glowColor}40 50%,
            ${glowColor}20 55%,
            transparent 100%
          )`,
          backgroundSize: '200% 100%',
        }}
      />

      {/* Border glow effects */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          border: `1px solid ${baseColor}40`,
          boxShadow: `inset 0 0 15px ${baseColor}20`,
        }}
      >
        {/* Top and bottom borders */}
        <div
          className="absolute inset-x-0 top-0 h-px animate-cyber-glow"
          style={{
            background: `linear-gradient(90deg, 
              transparent 0%,
              ${glowColor} 50%,
              transparent 100%
            )`,
          }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-px animate-cyber-glow"
          style={{
            background: `linear-gradient(90deg, 
              transparent 0%,
              ${glowColor} 50%,
              transparent 100%
            )`,
          }}
        />
      </div>

      {children}
    </div>
  );
}