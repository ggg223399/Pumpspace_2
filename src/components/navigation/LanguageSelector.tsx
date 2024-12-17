import React, { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown } from 'lucide-react';
import { useI18n } from '../../i18n/i18n';
import type { Language } from '../../i18n/i18n';

interface LanguageOption {
  code: Language;
  label: string;
}

const languages: LanguageOption[] = [
  { code: 'en', label: 'English' },
  { code: 'zh', label: '简体中文' },
];

export function LanguageSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { language, setLanguage } = useI18n();
  
  const selectedLang = languages.find(lang => lang.code === language) || languages[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-2 py-1.5 rounded-lg 
                   bg-surface/50 hover:bg-surface/80 transition-all duration-200
                   border border-gray-700/50 hover:border-cyan-500/30
                   group"
      >
        <Globe size={18} className="text-gray-400 group-hover:text-cyan-400 transition-colors" />
        <span className="text-sm text-gray-200">{selectedLang.label}</span>
        <ChevronDown 
          size={16} 
          className={`text-gray-400 transition-transform duration-200 
                     ${isOpen ? 'rotate-180' : 'rotate-0'}`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 w-36 z-50">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
          
          <div className="relative bg-surface border border-gray-700/50 rounded-lg 
                          backdrop-blur-sm shadow-lg shadow-cyan-500/10
                          animate-in fade-in slide-in-from-top-2 duration-200">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  setLanguage(lang.code);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center space-x-2 px-3 py-2 text-sm
                           transition-colors duration-200 hover:bg-cyan-500/10
                           ${selectedLang.code === lang.code ? 'text-cyan-400' : 'text-gray-200'}
                           ${selectedLang.code === lang.code ? 'bg-cyan-500/5' : ''}
                           first:rounded-t-lg last:rounded-b-lg`}
              >
                <span>{lang.label}</span>
                {selectedLang.code === lang.code && (
                  <div className="ml-auto h-1.5 w-1.5 rounded-full bg-cyan-400" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}