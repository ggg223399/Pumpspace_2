import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { useI18n } from '../i18n/i18n';

interface Trade {
  id: string;
  token: string;
  price: string;
  invested: string;
  sold: string;
  holders: string;
  direction: 'up' | 'down';
}

const trades: Trade[] = [
  {
    id: '1',
    token: 'MEPDUDA',
    price: '$200.12K',
    invested: '$2.3K',
    sold: '$2.3K',
    holders: '1080',
    direction: 'up',
  },
  // Add more mock data as needed
];

export function TradeTable() {
  const { t } = useI18n();

  return (
    <div className="bg-[#0D1117] text-white">
      <table className="w-full">
        <thead>
          <tr className="text-gray-400 text-sm border-b border-gray-800">
            <th className="text-left p-4">{t('table.headers.token')}</th>
            <th className="text-right p-4">{t('table.headers.sm_amt')}</th>
            <th className="text-right p-4">{t('table.headers.avg_buy')}</th>
            <th className="text-right p-4">{t('table.headers.invested')}</th>
            <th className="text-right p-4">{t('table.headers.sold')}</th>
            <th className="text-right p-4">{t('table.headers.holders')}</th>
            <th className="text-right p-4">{t('table.headers.trade')}</th>
          </tr>
        </thead>
        <tbody>
          {trades.map((trade) => (
            <tr key={trade.id} className="border-b border-gray-800 hover:bg-[#1A1F26]">
              <td className="p-4">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gray-700 rounded-full"></div>
                  <div>
                    <div className="font-medium">{trade.token}</div>
                    <div className="text-xs text-gray-400">7 {t('table.watchlist')}</div>
                  </div>
                </div>
              </td>
              <td className="text-right p-4">
                <div className="flex items-center justify-end space-x-1">
                  <span>12</span>
                  {trade.direction === 'up' ? (
                    <ArrowUp className="text-green-400" size={16} />
                  ) : (
                    <ArrowDown className="text-red-400" size={16} />
                  )}
                </div>
              </td>
              <td className="text-right p-4">{trade.price}</td>
              <td className="text-right p-4 text-cyan-400">{trade.invested}</td>
              <td className="text-right p-4 text-red-400">{trade.sold}</td>
              <td className="text-right p-4">{trade.holders}</td>
              <td className="text-right p-4">
                <button className="bg-[#1A1F26] px-4 py-1.5 rounded-lg">
                  {t('table.buy')}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}