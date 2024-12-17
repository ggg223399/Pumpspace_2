import React, { useState, useCallback } from 'react';
import { I18nContext, Language, getNestedValue } from './i18n';
import en from './translations/en.json';
import zh from './translations/zh.json';

const translations = { en, zh };

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const t = useCallback((key: string) => {
    return getNestedValue(translations[language], key);
  }, [language]);

  return (
    <I18nContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </I18nContext.Provider>
  );
}