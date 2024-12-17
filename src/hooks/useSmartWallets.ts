import { useState, useEffect } from 'react';

interface SmartWallet {
  address: string;
  name: string;
  score: number;
  starred: boolean;
}

export function useSmartWallets() {
  const [wallets, setWallets] = useState<SmartWallet[]>([]);

  useEffect(() => {
    // Extended mock data for smart wallets
    const mockWallets: SmartWallet[] = [
      { address: '0x1234...', name: 'James333', score: 6.9, starred: true },
      { address: '0x5678...', name: '财神爷驾到', score: 5.2, starred: false },
      { address: '0x9abc...', name: 'EAHF...MVSR', score: 3.2, starred: false },
      { address: '0xdef0...', name: 'anonymous', score: 1.2, starred: false },
      { address: '0x1111...', name: 'anonymous', score: 0.8, starred: false },
      { address: '0x2222...', name: 'CryptoWhale', score: 7.5, starred: true },
      { address: '0x3333...', name: 'SmartTrader', score: 4.8, starred: false },
      { address: '0x4444...', name: 'DeFiGuru', score: 6.2, starred: true },
      { address: '0x5555...', name: 'TokenMaster', score: 5.7, starred: false },
      { address: '0x6666...', name: 'BlockExplorer', score: 4.1, starred: false },
      { address: '0x7777...', name: 'ChainWizard', score: 3.9, starred: false },
      { address: '0x8888...', name: 'CoinHunter', score: 2.8, starred: false },
      { address: '0x9999...', name: 'TokenSniper', score: 5.9, starred: true },
      { address: '0xaaaa...', name: 'AlphaSeeker', score: 4.5, starred: false },
      { address: '0xbbbb...', name: 'GemFinder', score: 3.6, starred: false }
    ];

    setWallets(mockWallets);
  }, []);

  const toggleStar = (address: string) => {
    setWallets(current =>
      current.map(wallet =>
        wallet.address === address
          ? { ...wallet, starred: !wallet.starred }
          : wallet
      )
    );
  };

  return { wallets, toggleStar };
}