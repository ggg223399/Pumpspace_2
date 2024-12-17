import React from 'react';
import { Search, X } from 'lucide-react';
import { useI18n } from '../../i18n/i18n';

interface SearchBoxProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBox({ value, onChange }: SearchBoxProps) {
  const { t } = useI18n();

  return (
    <div className="relative group">
      <div className="absolute left-3 top-1/2 -translate-y-1/2">
        <Search 
          size={16} 
          className="text-gray-400 group-hover:text-cyan-400 transition-colors duration-200" 
        />
      </div>
      
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={t('filters.search_placeholder')}
        className="w-64 pl-9 pr-8 py-1.5 rounded-lg
                 bg-surface/50 text-white placeholder-gray-400
                 border border-gray-700/50 
                 hover:border-cyan-500/30 hover:bg-surface/80
                 focus:border-cyan-500/50 focus:outline-none
                 focus:ring-1 focus:ring-cyan-500/30
                 transition-all duration-200"
      />
      
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-3 top-1/2 -translate-y-1/2
                   text-gray-400 hover:text-cyan-400
                   transition-colors duration-200"
        >
          <X size={14} className="hover:scale-110 transition-transform duration-200" />
        </button>
      )}
    </div>
  );
}