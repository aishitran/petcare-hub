import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';

export const DemoRoleBar: React.FC = () => {
  const { role, currentUser, switchRole } = useAuth();
  const { language } = useLanguage();

  return (
    <div className="w-full bg-[#1c1917] text-stone-300 text-xs px-3 sm:px-4 py-1.5 sm:py-2 border-b border-stone-800/80 flex items-center justify-between gap-2 shrink-0 select-none overflow-x-auto scrollbar-none">
      <div className="flex items-center gap-2 shrink-0">
        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-stone-800/80 border border-stone-700/60 text-[10px] sm:text-[11px] font-medium text-stone-300">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="tracking-wide">Demo Persona</span>
        </div>
        <span className="hidden md:inline text-stone-400 text-[11px]">
          {language === 'vi' ? 'Vai trò hiện tại:' : 'Current Role:'} <strong className="text-stone-100 font-semibold">{role === 'GUEST' ? (language === 'vi' ? 'Khách (Guest)' : 'Guest') : role === 'ADMIN' ? (language === 'vi' ? 'Quản trị viên (Admin)' : 'Administrator (Admin)') : `${currentUser?.name} (User)`}</strong>
        </span>
      </div>

      <div className="flex items-center gap-1.5 shrink-0">
        <button
          onClick={() => switchRole('GUEST')}
          className={`px-2.5 sm:px-3 py-1 rounded-lg text-[10px] sm:text-[11px] font-medium transition whitespace-nowrap shrink-0 ${
            role === 'GUEST'
              ? 'bg-stone-100 text-stone-900 font-bold shadow-xs'
              : 'bg-stone-800/60 hover:bg-stone-800 text-stone-400 hover:text-stone-200'
          }`}
        >
          {language === 'vi' ? 'Khách' : 'Guest'}
        </button>

        <button
          onClick={() => switchRole('USER', 'user-1')}
          className={`px-2.5 sm:px-3 py-1 rounded-lg text-[10px] sm:text-[11px] font-medium transition whitespace-nowrap shrink-0 cursor-pointer ${
            role === 'USER' && currentUser?.id === 'user-1'
              ? 'bg-[#d46b28] text-white font-bold shadow-xs'
              : 'bg-stone-800/60 hover:bg-stone-800 text-stone-400 hover:text-stone-200'
          }`}
        >
          User: Minh
        </button>

        <button
          onClick={() => switchRole('USER', 'user-2')}
          className={`px-2.5 sm:px-3 py-1 rounded-lg text-[10px] sm:text-[11px] font-medium transition whitespace-nowrap shrink-0 cursor-pointer ${
            role === 'USER' && currentUser?.id === 'user-2'
              ? 'bg-[#d46b28] text-white font-bold shadow-xs'
              : 'bg-stone-800/60 hover:bg-stone-800 text-stone-400 hover:text-stone-200'
          }`}
        >
          User: Thảo
        </button>

        <button
          onClick={() => switchRole('ADMIN')}
          className={`px-2.5 sm:px-3 py-1 rounded-lg text-[10px] sm:text-[11px] font-medium transition whitespace-nowrap shrink-0 cursor-pointer ${
            role === 'ADMIN'
              ? 'bg-[#ba591a] text-white font-bold shadow-xs'
              : 'bg-stone-800/60 hover:bg-stone-800 text-stone-400 hover:text-stone-200'
          }`}
        >
          Admin
        </button>
      </div>
    </div>
  );
};
