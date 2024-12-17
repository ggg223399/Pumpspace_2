import React, { useState } from 'react';
import { ChevronDown, Star, Pencil, Search, Wallet, Copy, Check } from 'lucide-react';
import { useI18n } from '../../i18n/i18n';
import { useSmartWallets } from '../../hooks/useSmartWallets';

export function SmartWallets() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null);
  const { t } = useI18n();
  const { wallets, toggleStar } = useSmartWallets();

  const filteredWallets = wallets.filter(wallet => 
    wallet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    wallet.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCopy = async (address: string) => {
    try {
      await navigator.clipboard.writeText(address);
      setCopiedAddress(address);
      setTimeout(() => setCopiedAddress(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="flex flex-col bg-background">
      {/* Header */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="w-full p-4 flex items-center justify-between
                   hover:bg-surface/50 transition-colors duration-200
                   border-b border-gray-800 group"
      >
        <div className="flex items-center space-x-2">
          <Wallet 
            size={16} 
            className="text-gray-400 group-hover:text-cyan-400 transition-colors" 
          />
          <span className="font-medium text-white">Smart Money</span>
        </div>
        <ChevronDown 
          size={16} 
          className={`text-gray-400 transition-transform duration-200
                     ${isCollapsed ? '' : 'rotate-180'}`}
        />
      </button>

      {!isCollapsed && (
        <>
          {/* Search Box */}
          <div className="p-4">
            <div className="relative">
              <Search 
                size={14} 
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" 
              />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name or address"
                className="w-full pl-9 pr-3 py-2 rounded-lg
                         bg-surface/50 text-white placeholder-gray-400
                         border border-gray-700/50 focus:border-cyan-500/30
                         focus:outline-none focus:ring-1 focus:ring-cyan-500/30
                         text-sm transition-all duration-200"
              />
            </div>
          </div>

          {/* Wallet List */}
          <div className="flex-1 overflow-hidden">
            {/* Column Headers */}
            <div className="px-6 py-2 grid grid-cols-2 text-xs text-gray-400 border-b border-gray-800">
              <span>Name</span>
              <span className="text-right">Score</span>
            </div>

            {/* Scrollable Wallet List */}
            <div className="overflow-y-auto max-h-[calc(100vh-400px)] scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
              {filteredWallets.map((wallet) => (
                <div 
                  key={wallet.address}
                  className="group relative px-4 py-3 hover:bg-surface/50
                           border-b border-gray-800/50
                           transition-all duration-200"
                >
                  <div className="grid grid-cols-2 items-center">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => toggleStar(wallet.address)}
                        className="p-1 rounded-md transition-colors duration-200
                                 hover:bg-surface/80 group/star"
                      >
                        <Star 
                          size={14} 
                          className={`${
                            wallet.starred 
                              ? 'text-yellow-400 fill-yellow-400' 
                              : 'text-gray-500 group-hover/star:text-yellow-400'
                          } transition-colors duration-200`}
                        />
                      </button>
                      <div className="flex flex-col">
                        <div className="flex items-center space-x-1">
                          <span className="text-sm font-medium text-white">
                            {wallet.name}
                          </span>
                          <Pencil 
                            size={12} 
                            className="opacity-0 group-hover:opacity-100 text-gray-400
                                     hover:text-cyan-400 cursor-pointer transition-all duration-200" 
                          />
                        </div>
                        <div className="flex items-center space-x-1">
                          <span className="text-xs text-gray-500">{wallet.address}</span>
                          <button
                            onClick={() => handleCopy(wallet.address)}
                            className="p-1 rounded-md transition-colors duration-200
                                     hover:bg-surface/80"
                          >
                            {copiedAddress === wallet.address ? (
                              <Check size={12} className="text-green-400" />
                            ) : (
                              <Copy size={12} className="text-gray-500 hover:text-cyan-400" />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className={`text-right text-sm font-medium
                                  ${getScoreColor(wallet.score)}`}>
                      {wallet.score.toFixed(1)}
                    </div>
                  </div>

                  {/* Hover Effect Border */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100
                                pointer-events-none transition-opacity duration-200">
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r
                                  from-transparent via-cyan-500/50 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r
                                  from-transparent via-cyan-500/50 to-transparent" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function getScoreColor(score: number): string {
  if (score >= 6) return 'text-cyan-400';
  if (score >= 4) return 'text-blue-400';
  if (score >= 2) return 'text-purple-400';
  return 'text-gray-400';
}