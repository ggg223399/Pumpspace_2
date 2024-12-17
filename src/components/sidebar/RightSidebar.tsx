import React, { useState } from 'react';
import { SmartMoney } from './SmartMoney';
import { Signals } from '../signals/Signals';

export function RightSidebar() {
  const [isSignalsCollapsed, setIsSignalsCollapsed] = useState(false);

  return (
    <div className="h-full flex flex-col border-l border-gray-800 bg-background overflow-hidden">
      <SmartMoney />
      <div className="flex-1 min-h-0">
        <Signals 
          isCollapsed={isSignalsCollapsed}
          onCollapse={() => setIsSignalsCollapsed(!isSignalsCollapsed)}
        />
      </div>
    </div>
  );
}