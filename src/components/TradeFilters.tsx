import React from 'react';
import { Search } from 'lucide-react';
import { useI18n } from '../i18n/i18n';

export function TradeFilters() {
  const { t } = useI18n();

  return (
    <div className="flex items-center justify-between p-4 bg-[#0D1117] border-b border-gray-800">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <span className="text-blue-400">💎</span>
          <span className="text-white">{t('filters.chad_bags')}</span>
          <button className="bg-[#1A1F26] px-2 py-0.5 text-xs rounded">
            {t('filters.pause')}
          </button>
        </div>
        
        <div className="flex items-center space-x-2">
          <Search size={16} className="text-gray-400" />
          <input
            type="text"
            placeholder={t('filters.search_placeholder')}
            className="bg-[#1A1F26] text-white px-3 py-1.5 rounded-lg w-64"
          />
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="flex space-x-2">
          <button className="px-3 py-1 rounded bg-[#1A1F26] text-white">
            {t('filters.time_filters.30m')}
          </button>
          <button className="px-3 py-1 rounded bg-[#1A1F26] text-cyan-400">
            {t('filters.time_filters.1h')}
          </button>
          <button className="px-3 py-1 rounded bg-[#1A1F26] text-white">
            {t('filters.time_filters.6h')}
          </button>
          <button className="px-3 py-1 rounded bg-[#1A1F26] text-white">
            {t('filters.time_filters.1d')}
          </button>
        </div>
        
        <button className="flex items-center space-x-2 bg-[#1A1F26] px-3 py-1.5 rounded-lg text-white">
          {t('filters.smart_wallets')}
        </button>
      </div>
    </div>
  );
}