export function calculateMarketCap(price: number, tokenSupply: number): number {
  return price * tokenSupply;
}

export function calculateAvgBuyMC(transactions: TokenTransaction[], tokenSupply: number): number {
  if (transactions.length === 0) return 0;

  const totalMC = transactions.reduce((sum, tx) => {
    return sum + (tx.price * tokenSupply);
  }, 0);

  return totalMC / transactions.length;
}

export function formatMC(mc: number): string {
  if (mc >= 1000000) {
    return `$${(mc / 1000000).toFixed(2)}M`;
  } else if (mc >= 1000) {
    return `$${(mc / 1000).toFixed(2)}K`;
  }
  return `$${mc.toFixed(2)}`;
}