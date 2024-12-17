import React, { useState } from 'react';
import { Pin, Copy, Check } from 'lucide-react';
import { formatAddress } from '../../utils/address';
import { useToast } from '../../hooks/useToast';

interface TokenNameSectionProps {
  name: string;
  address: string;
  isPinned: boolean;
  onPinToggle: () => void;
}

export function TokenNameSection({ 
  name, 
  address, 
  isPinned, 
  onPinToggle 
}: TokenNameSectionProps) {
  const [isCopied, setIsCopied] = useState(false);
  const { showToast } = useToast();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(address);
      setIsCopied(true);
      showToast('Address copied to clipboard', { type: 'success' });
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      showToast('Failed to copy address', { type: 'error' });
    }
  };

  return (
    <div className="flex flex-col">
      {/* Token Name Row */}
      <div className="flex items-center space-x-2">
        <span className="font-medium text-white">{name}</span>
        <div className="flex items-center space-x-1">
          {/* Pin Icon */}
          <button
            onClick={onPinToggle}
            className={`p-1 rounded-md transition-all duration-200
                     ${isPinned 
                       ? 'text-cyan-400 bg-cyan-500/20' 
                       : 'text-gray-400 hover:text-cyan-400 hover:bg-cyan-500/20'}`}
            title={isPinned ? 'Unpin token' : 'Pin token'}
          >
            <Pin size={14} className={`transform transition-transform duration-200
                                   ${isPinned ? 'rotate-45 fill-current' : ''}`} />
          </button>
        </div>
      </div>

      {/* Token Address Row */}
      <div className="flex items-center space-x-1">
        <span className="text-xs text-gray-400 font-mono">{formatAddress(address)}</span>
        <button
          onClick={handleCopy}
          className="p-1 rounded-md transition-all duration-200
                   hover:bg-cyan-500/20 group"
          title="Copy address"
        >
          {isCopied ? (
            <Check size={12} className="text-green-400" />
          ) : (
            <Copy 
              size={12} 
              className="text-gray-400 group-hover:text-cyan-400 
                       transition-colors duration-200" 
            />
          )}
        </button>
      </div>
    </div>
  );
}