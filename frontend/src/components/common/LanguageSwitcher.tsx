import React from 'react';
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
  const { theme, setTheme } = useTheme();

  if (variant === 'mobile') {
    return (
      <div className={`p-3 rounded-2xl bg-[#f2eae1] dark:bg-stone-800/90 border border-[#e5d8cb] dark:border-stone-700 ${className}`}>
        {/* Theme Toggle (Sáng / Tối) */}
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-[#3d302a] dark:text-stone-200">
            Giao diện
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
              <span>Sáng</span>
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
              <span>Tối</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Desktop: Clean Single Theme Toggle (Sáng / Tối)
  return (
    <div className={`flex items-center gap-1 shrink-0 select-none ${className}`}>
      <div className="flex items-center p-0.5 bg-[#eddcd0] dark:bg-stone-800 rounded-xl border border-[#e0cfc1] dark:border-stone-700 shadow-2xs">
        <button
          type="button"
          onClick={() => setTheme('light')}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            theme === 'light'
              ? 'bg-white dark:bg-stone-700 text-amber-700 dark:text-amber-300 shadow-xs'
              : 'text-[#665851] dark:text-stone-400 hover:text-[#2b2523] dark:hover:text-stone-200'
          }`}
          title="Giao diện Sáng"
        >
          <Sun className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
          <span>Sáng</span>
        </button>
        <button
          type="button"
          onClick={() => setTheme('dark')}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            theme === 'dark'
              ? 'bg-stone-900 text-indigo-300 shadow-xs'
              : 'text-[#665851] dark:text-stone-400 hover:text-[#2b2523] dark:hover:text-stone-200'
          }`}
          title="Giao diện Tối"
        >
          <Moon className="w-3.5 h-3.5 text-indigo-400" />
          <span>Tối</span>
        </button>
      </div>
    </div>
  );
};

