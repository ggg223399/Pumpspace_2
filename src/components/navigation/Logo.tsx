import React from 'react';
import { Zap } from 'lucide-react';

export function Logo() {
  return (
    <div className="flex items-center space-x-2">
      <Zap size={24} className="text-cyan-400" />
      <h1 className="text-xl font-bold">Pump Space</h1>
    </div>
  );
}