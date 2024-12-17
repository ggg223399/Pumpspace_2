import { useState, useCallback } from 'react';
import { mockSmartMoney } from '../data/mockSmartMoney';
import type { SmartMoneyWallet } from '../types/smartMoney';

export function useSmartMoney() {
  const [wallets, setWallets] = useState<SmartMoneyWallet[]>(mockSmartMoney);

  const toggleStar = useCallback((address: string) => {
    setWallets(current =>
      current.map(wallet =>
        wallet.address === address
          ? { ...wallet, starred: !wallet.starred }
          : wallet
      )
    );
  }, []);

  return { wallets, toggleStar };
}