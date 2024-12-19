import type { FilterConfig } from '../../types/filter';

export const filterConfigs: Record<string, FilterConfig> = {
  amount: {
    presets: [
      { label: '> 10', value: 10 },
      { label: '> 20', value: 20 },
      { label: '> 50', value: 50 }
    ]
  },
  avgBuyMC: {
    presets: [
      { label: '> 50k', value: 50000 },
      { label: '> 100k', value: 100000 },
      { label: '> 500k', value: 500000 }
    ],
    suffix: 'K'
  },
  holders: {
    presets: [
      { label: '> 100', value: 100 },
      { label: '> 500', value: 500 },
      { label: '> 1000', value: 1000 }
    ]
  }
};