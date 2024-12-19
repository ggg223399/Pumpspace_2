export function formatMC(mc: number): string {
  if (mc >= 1000000) {
    return `$${(mc / 1000000).toFixed(2)}M`;
  } else if (mc >= 1000) {
    return `$${(mc / 1000).toFixed(2)}K`;
  }
  return `$${mc.toFixed(2)}`;
}

export function calculateTokenMC(price: string, tokenSupply: number): number {
  return parseFloat(price) * tokenSupply;
}