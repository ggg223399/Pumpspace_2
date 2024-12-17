export function formatAddress(address: string): string {
  if (!address) return '';
  if (address.length <= 8) return address;
  
  const start = address.slice(0, 4);
  const end = address.slice(-4);
  return `${start}...${end}`;
}