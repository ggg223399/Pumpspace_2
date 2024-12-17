import { create } from 'zustand';

interface TradingTool {
  id: string;
  name: string;
  icon: string;
}

interface TradingToolsStore {
  selectedTool: TradingTool | null;
  setSelectedTool: (tool: TradingTool) => void;
}

export const useTradingTools = create<TradingToolsStore>((set) => ({
  selectedTool: { id: 'gmgn', name: 'GMGN', icon: '🌱' }, // Default tool
  setSelectedTool: (tool) => set({ selectedTool: tool }),
}));