import React from 'react';
import { BaseFilterDropdown } from './BaseFilterDropdown';
import { filterConfigs } from '../../../config/filterConfigs';
import type { FilterState } from '../../../types/filter';

interface FilterDropdownProps {
  type: string;
  isOpen: boolean;
  onClose: () => void;
  onPresetFilter: (value: number) => void;
  onCustomFilter: (min: number, max: number) => void;
  onApply: () => void;
  onReset: () => void;
  currentFilter?: FilterState;
  isPresetActive: (value: number) => boolean;
  isPresetPending: (value: number) => boolean;
  hasPendingChanges?: boolean;
}

export function FilterDropdown({ 
  type, 
  isOpen, 
  onClose, 
  onPresetFilter,
  onCustomFilter,
  onApply,
  onReset,
  currentFilter,
  isPresetActive,
  isPresetPending,
  hasPendingChanges
}: FilterDropdownProps) {
  const config = filterConfigs[type];
  
  if (!config) return null;

  return (
    <BaseFilterDropdown
      isOpen={isOpen}
      onClose={onClose}
      onPresetFilter={onPresetFilter}
      onCustomFilter={onCustomFilter}
      onApply={onApply}
      onReset={onReset}
      presets={config.presets}
      suffix={config.suffix}
      currentFilter={currentFilter}
      isPresetActive={isPresetActive}
      isPresetPending={isPresetPending}
      hasPendingChanges={hasPendingChanges}
    />
  );
}