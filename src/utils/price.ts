export function formatPrice(price: string): string {
  const [integerPart, decimalPart] = price.split('.');
  if (!decimalPart) return price;

  // Find the first non-zero digit in the decimal part
  const firstNonZeroIndex = decimalPart.search(/[1-9]/);
  if (firstNonZeroIndex === -1) return price; // No non-zero digit found

  // Construct the formatted price
  return `0.{${firstNonZeroIndex+1}}${decimalPart[firstNonZeroIndex]}`;
}