import { useMemo } from 'react';
import type { Token } from '../types/token';
import type { Signal } from '../types/signal';

export function useTokenDirection(token: Token, signals: Signal[]) {
  return useMemo(() => {
    // Get all signals for this token
    const tokenSignals = signals
      .filter(s => s.tokenAddress === token.address)
      .sort((a, b) => b.timestamp - a.timestamp);

    if (tokenSignals.length === 0) return null;

    // Get the latest signal
    const latestSignal = tokenSignals[0];

      const currentSmCount = token.smartMoney.filter(sm => {
        // 获取该地址的所有交易
        const walletSignals = tokenSignals.filter(s => 
          s.smartMoneyAddress === sm
        );
        
        // 计算总买入量
        const totalBought = walletSignals
          .filter(s => s.type === 'buy')
          .reduce((sum, s) => sum + parseFloat(s.tokenAmount), 0);
        
        // 计算总卖出量
        const totalSold = walletSignals
          .filter(s => s.type === 'sell')
          .reduce((sum, s) => sum + parseFloat(s.tokenAmount), 0);
        
        // 只有当买入量大于卖出量时才计入
        return totalBought > totalSold;
      }).length;
      
      // 计算新的智能货币数量
      let newSmCount = currentSmCount;
      
      if (latestSignal.type === 'buy') {
        // 检查这个地址是否是首次买入
        const previousBuys = tokenSignals.filter(s => 
          s.smartMoneyAddress === latestSignal.smartMoneyAddress && 
          s.type === 'buy' &&
          s.timestamp < latestSignal.timestamp
        );
        
        // 如果是首次买入，增加计数
        if (previousBuys.length === 0) {
          newSmCount = currentSmCount + 1;
        }
      } else if (latestSignal.type === 'sell') {
        // 获取该地址的所有交易
        const walletSignals = tokenSignals.filter(s => 
          s.smartMoneyAddress === latestSignal.smartMoneyAddress
        );
        
        // 计算总买入量
        const totalBought = walletSignals
          .filter(s => s.type === 'buy')
          .reduce((sum, s) => sum + parseFloat(s.tokenAmount), 0);
        
        // 计算总卖出量（包括最新的卖出）
        const totalSold = walletSignals
          .filter(s => s.type === 'sell')
          .reduce((sum, s) => sum + parseFloat(s.tokenAmount), 0);
        
        // 如果完全卖出，减少计数
        if (totalSold >= totalBought) {
          newSmCount = currentSmCount - 1;
        }
      }
  
      // 根据实际持仓变化确定方向
      if (newSmCount > currentSmCount) return 'up';
      if (newSmCount < currentSmCount) return 'down';
      return null;
    }, [token, signals]);
}