import React from 'react';
import { useI18n } from '../../i18n/i18n';
import { SortableHeader } from './SortableHeader';
import { TradingTools } from './trading/TradingTools';
import { useFilters } from '../../hooks/useFilters';
import type { SortDirection } from '../../types/sort';

interface TokenListHeaderProps {
  sortKey: string | null;
  sortDirection: SortDirection;
  onSort: (key: string) => void;
  filters: ReturnType<typeof useFilters>;
}

export function TokenListHeader({
  sortKey,
  sortDirection,
  onSort,
  filters
}: TokenListHeaderProps) {
  const { t } = useI18n();
  const {
    setPresetFilter,
    setCustomFilter,
    applyFilters,
    resetFilter,
    isFilterActive,
    isPresetActive,
    isPresetPending,
    hasPendingChanges,
    filters: activeFilters
  } = filters;

  return (
    <div className="bg-surface border-b border-gray-800 sticky top-0 z-10">
      <div className="px-4 py-2 grid grid-cols-[1.5fr,0.8fr,1fr,1fr,1fr,0.8fr,0.8fr] gap-4 text-sm border-t border-gray-800">
        <div className="text-gray-400">{t('table.headers.token')}</div>
        <SortableHeader
          label={t('table.headers.sm_amt')}
          sortKey="amount"
          currentSort={sortKey}
          direction={sortDirection}
          onSort={onSort}
          showFilter
          onPresetFilter={(value) => setPresetFilter('amount', value)}
          onCustomFilter={(min, max) => setCustomFilter('amount', min, max)}
          onApply={applyFilters}
          onReset={() => resetFilter('amount')}
          isFilterActive={isFilterActive('amount')}
          currentFilter={activeFilters.amount}
          isPresetActive={(value) => isPresetActive('amount', value)}
          isPresetPending={(value) => isPresetPending('amount', value)}
          hasPendingChanges={hasPendingChanges('amount')}
          className="text-right"
        />
        <SortableHeader
          label={t('table.headers.avg_buy')}
          sortKey="avgBuyMC"
          currentSort={sortKey}
          direction={sortDirection}
          onSort={onSort}
          showFilter
          onPresetFilter={(value) => setPresetFilter('avgBuyMC', value)}
          onCustomFilter={(min, max) => setCustomFilter('avgBuyMC', min, max)}
          onApply={applyFilters}
          onReset={() => resetFilter('avgBuyMC')}
          isFilterActive={isFilterActive('avgBuyMC')}
          currentFilter={activeFilters.avgBuyMC}
          isPresetActive={(value) => isPresetActive('avgBuyMC', value)}
          isPresetPending={(value) => isPresetPending('avgBuyMC', value)}
          hasPendingChanges={hasPendingChanges('avgBuyMC')}
          className="text-right"
        />
        <div className="text-right text-gray-400">{t('table.headers.invested')}</div>
        <div className="text-right text-gray-400">{t('table.headers.sold')}</div>
        <SortableHeader
          label={t('table.headers.holders')}
          sortKey="holders"
          currentSort={sortKey}
          direction={sortDirection}
          onSort={onSort}
          showFilter
          onPresetFilter={(value) => setPresetFilter('holders', value)}
          onCustomFilter={(min, max) => setCustomFilter('holders', min, max)}
          onApply={applyFilters}
          onReset={() => resetFilter('holders')}
          isFilterActive={isFilterActive('holders')}
          currentFilter={activeFilters.holders}
          isPresetActive={(value) => isPresetActive('holders', value)}
          isPresetPending={(value) => isPresetPending('holders', value)}
          hasPendingChanges={hasPendingChanges('holders')}
          className="text-right"
        />
        <div className="text-right flex items-center justify-end space-x-2">
          <span className="text-gray-400">{t('table.headers.trade')}</span>
          <TradingTools />
        </div>
      </div>
    </div>
  );
}