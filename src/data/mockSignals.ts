import type { Signal } from '../types/signal';
import { mockSmartMoney } from './mockSmartMoney';
import { mockTokens } from './mockTokens';

// Helper function to get a random token from mockTokens
const getRandomToken = () => {
  return mockTokens[Math.floor(Math.random() * mockTokens.length)];
};

// Helper function to get a random smart money wallet
const getRandomSmartMoney = () => {
  return mockSmartMoney[Math.floor(Math.random() * mockSmartMoney.length)];
};

// Helper function to generate future timestamps
const getFutureTimestamp = (index: number) => {
  // Start from current time and add future intervals
  // Each signal will be 5 seconds apart in the future
  return Date.now() + (index + 1) * 5000;
};

// Generate historical signals (past 30m)
const historicalSignals: Signal[] = Array.from({ length: 20 }, (_, index) => {
  const token = mockTokens[index % mockTokens.length]; // Only use first 5 tokens for historical data
  const smartMoney = mockSmartMoney[index % mockSmartMoney.length];
  const type = Math.random() > 0.5 ? 'buy' : 'sell';
  const tokenAmount = (Math.floor(Math.random() * 20) + 5) * 1000000;
  const solAmount = (Math.random() * 4 + 1).toFixed(2);
  const price = (Math.random() * 0.00005 + 0.00001).toFixed(8);
  const marketCap = Math.floor(Math.random() * 50000 + 10000);

  return {
    id: `historical-${index + 1}`,
    type,
    token: token.name,
    tokenAddress: token.address,
    tokenAmount: tokenAmount.toString(),
    solAmount,
    price,
    marketCap: marketCap.toString(),
    priceUsd: (parseFloat(solAmount) * 24).toFixed(2),
    timestamp: Date.now() - (30 * 60 * 1000) + (index * 60 * 1000), // Spread over last 30m
    txHash: Array.from({ length: 87 }, () => Math.random().toString(36)[2]).join(''),
    smartMoneyAddress: smartMoney.address,
    smartMoneyName: smartMoney.name || formatAddress(smartMoney.address)
  };
});

// Generate future signals
const futureSignals: Signal[] = Array.from({ length: 30 }, (_, index) => {
  const token = mockTokens[Math.floor(Math.random() * mockTokens.length)];
  const smartMoney = mockSmartMoney[Math.floor(Math.random() * mockSmartMoney.length)];
  const type = Math.random() > 0.5 ? 'buy' : 'sell';
  const tokenAmount = (Math.floor(Math.random() * 20) + 5) * 1000000;
  const solAmount = (Math.random() * 4 + 1).toFixed(2);
  const price = (Math.random() * 0.00005 + 0.00001).toFixed(8);
  const marketCap = Math.floor(Math.random() * 50000 + 10000);

  return {
    id: `future-${index + 1}`,
    type,
    token: token.name,
    tokenAddress: token.address,
    tokenAmount: tokenAmount.toString(),
    solAmount,
    price,
    marketCap: marketCap.toString(),
    priceUsd: (parseFloat(solAmount) * 24).toFixed(2),
    timestamp: getFutureTimestamp(index),
    txHash: Array.from({ length: 87 }, () => Math.random().toString(36)[2]).join(''),
    smartMoneyAddress: smartMoney.address,
    smartMoneyName: smartMoney.name || formatAddress(smartMoney.address)
  };
});

// Combine historical and future signals
export const mockSignals: Signal[] = [...historicalSignals, ...futureSignals];

function formatAddress(address: string): string {
  if (!address) return '';
  if (address.length <= 8) return address;
  return `${address.slice(0, 4)}...${address.slice(-4)}`;
}