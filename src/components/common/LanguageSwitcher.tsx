import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';

interface LanguageSwitcherProps {
  className?: string;
  variant?: 'pill' | 'compact' | 'mobile' | 'dropdown' | 'stacked';
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ 
  className = '',
  variant = 'pill' 
}) => {
  const { language, setLanguage } = useLanguage();
  const { theme, setTheme } = useTheme();

  const isEn = language === 'en';

  if (variant === 'mobile') {
    return (
      <div className={`space-y-2 p-3 rounded-2xl bg-[#f2eae1] dark:bg-stone-800/90 border border-[#e5d8cb] dark:border-stone-700 ${className}`}>
        {/* Row 1: Language (VI / EN) */}
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-[#3d302a] dark:text-stone-200">
            {isEn ? 'Language' : 'Ngôn ngữ'}
          </span>
          <div className="flex items-center p-0.5 bg-white dark:bg-stone-900 rounded-xl shadow-2xs border border-[#e5d8cb] dark:border-stone-700">
            <button
              type="button"
              onClick={() => setLanguage('vi')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                language === 'vi'
                  ? 'bg-[#d46b28] text-white shadow-xs'
                  : 'text-[#665851] dark:text-stone-400 hover:text-[#2b2523] dark:hover:text-stone-200'
              }`}
            >
              VI
            </button>
            <button
              type="button"
              onClick={() => setLanguage('en')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                language === 'en'
                  ? 'bg-[#d46b28] text-white shadow-xs'
                  : 'text-[#665851] dark:text-stone-400 hover:text-[#2b2523] dark:hover:text-stone-200'
              }`}
            >
              EN
            </button>
          </div>
        </div>

        {/* Row 2: Theme (Sáng / Tối) directly underneath */}
        <div className="flex items-center justify-between pt-2 border-t border-[#e2d5c7] dark:border-stone-700">
          <span className="text-xs font-bold text-[#3d302a] dark:text-stone-200">
            {isEn ? 'Theme' : 'Giao diện'}
          </span>
          <div className="flex items-center p-0.5 bg-white dark:bg-stone-900 rounded-xl shadow-2xs border border-[#e5d8cb] dark:border-stone-700">
            <button
              type="button"
              onClick={() => setTheme('light')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                theme === 'light'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'text-[#665851] dark:text-stone-400 hover:text-[#2b2523] dark:hover:text-stone-200'
              }`}
            >
              <Sun className="w-3.5 h-3.5" />
              <span>{isEn ? 'Light' : 'Sáng'}</span>
            </button>
            <button
              type="button"
              onClick={() => setTheme('dark')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                theme === 'dark'
                  ? 'bg-stone-800 text-indigo-300 shadow-xs'
                  : 'text-[#665851] dark:text-stone-400 hover:text-[#2b2523] dark:hover:text-stone-200'
              }`}
            >
              <Moon className="w-3.5 h-3.5 text-indigo-400" />
              <span>{isEn ? 'Dark' : 'Tối'}</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Desktop: Two distinct separate controls stacked vertically (VI/EN on top, Sáng/Tối right below)
  return (
    <div className={`flex flex-col items-center gap-1 shrink-0 select-none ${className}`}>
      {/* 1. Language Toggle: VI / EN (Zero flags) */}
      <div className="flex items-center p-0.5 bg-[#eddcd0] dark:bg-stone-800 rounded-lg border border-[#e0cfc1] dark:border-stone-700 shadow-2xs">
        <button
          type="button"
          onClick={() => setLanguage('vi')}
          className={`px-2.5 py-0.5 rounded-md text-[11px] font-bold transition-all cursor-pointer ${
            language === 'vi'
              ? 'bg-[#d46b28] text-white shadow-xs'
              : 'text-[#665851] dark:text-stone-400 hover:text-[#2b2523] dark:hover:text-stone-200'
          }`}
          title="Tiếng Việt (VI)"
        >
          VI
        </button>
        <button
          type="button"
          onClick={() => setLanguage('en')}
          className={`px-2.5 py-0.5 rounded-md text-[11px] font-bold transition-all cursor-pointer ${
            language === 'en'
              ? 'bg-[#d46b28] text-white shadow-xs'
              : 'text-[#665851] dark:text-stone-400 hover:text-[#2b2523] dark:hover:text-stone-200'
          }`}
          title="English (EN)"
        >
          EN
        </button>
      </div>

      {/* 2. Theme Toggle: Sáng / Tối (Directly below Language) */}
      <div className="flex items-center p-0.5 bg-[#eddcd0] dark:bg-stone-800 rounded-lg border border-[#e0cfc1] dark:border-stone-700 shadow-2xs">
        <button
          type="button"
          onClick={() => setTheme('light')}
          className={`flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold transition-all cursor-pointer ${
            theme === 'light'
              ? 'bg-white dark:bg-stone-700 text-amber-700 dark:text-amber-300 shadow-xs'
              : 'text-[#665851] dark:text-stone-400 hover:text-[#2b2523] dark:hover:text-stone-200'
          }`}
          title={isEn ? 'Light Theme' : 'Giao diện Sáng'}
        >
          <Sun className="w-3 h-3 text-amber-600 dark:text-amber-400" />
          <span>{isEn ? 'Light' : 'Sáng'}</span>
        </button>
        <button
          type="button"
          onClick={() => setTheme('dark')}
          className={`flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold transition-all cursor-pointer ${
            theme === 'dark'
              ? 'bg-stone-900 text-indigo-300 shadow-xs'
              : 'text-[#665851] dark:text-stone-400 hover:text-[#2b2523] dark:hover:text-stone-200'
          }`}
          title={isEn ? 'Dark Theme' : 'Giao diện Tối'}
        >
          <Moon className="w-3 h-3 text-indigo-400" />
          <span>{isEn ? 'Dark' : 'Tối'}</span>
        </button>
      </div>
    </div>
  );
};

