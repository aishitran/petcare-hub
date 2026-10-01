import React, { createContext, useContext, useState, useEffect } from 'react';
import { vi } from '../locales/vi';
import { en } from '../locales/en';

export type Language = 'vi' | 'en';

type TranslationsType = typeof vi;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (keyPath: string, fallback?: string) => string;
  translations: TranslationsType;
}

const translationsMap: Record<Language, any> = {
  vi,
  en
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('vi');

  const setLanguage = (newLang: Language) => {
    setLanguageState(newLang);
    localStorage.setItem('petcare_hub_lang', newLang);
    document.documentElement.lang = newLang;
  };

  useEffect(() => {
    // Reset stored language if it was en
    localStorage.setItem('petcare_hub_lang', 'vi');
    document.documentElement.lang = 'vi';
  }, []);

  // Deep key resolver (e.g., 'common.save', 'hero.titleMain')
  const t = (keyPath: string, fallback?: string): string => {
    const currentDict = translationsMap[language] || translationsMap.vi;
    const keys = keyPath.split('.');
    
    let result: any = currentDict;
    for (const key of keys) {
      if (result && typeof result === 'object' && key in result) {
        result = result[key];
      } else {
        // Fallback to Vietnamese if key not found in current dictionary
        let viFallback: any = translationsMap.vi;
        for (const k of keys) {
          if (viFallback && typeof viFallback === 'object' && k in viFallback) {
            viFallback = viFallback[k];
          } else {
            viFallback = null;
            break;
          }
        }
        return viFallback || fallback || keyPath;
      }
    }

    if (typeof result === 'string') return result;
    return fallback || keyPath;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, translations: translationsMap[language] }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
