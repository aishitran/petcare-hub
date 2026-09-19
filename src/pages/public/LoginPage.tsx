import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { Heart, Lock, Mail, ArrowRight, UserCheck, Shield, Sparkles } from 'lucide-react';

interface LoginPageProps {
  navigate: (path: string) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ navigate }) => {
  const { switchRole, loginAs } = useAuth();
  const { language, t } = useLanguage();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleFormLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    const success = loginAs(email);
    if (success) {
      navigate('/dashboard');
    } else {
      // Default to user-1 if email doesn't match mock
      switchRole('USER', 'user-1');
      navigate('/dashboard');
    }
  };

  const handleQuickLogin = (role: 'USER' | 'ADMIN', userId: string) => {
    switchRole(role, userId);
    if (role === 'ADMIN') {
      navigate('/admin');
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 text-left">
      <div className="max-w-md w-full bg-white rounded-3xl border border-stone-200/80 shadow-xl p-8 space-y-6">
        
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-white shadow-md p-1 border border-stone-200 mx-auto flex items-center justify-center">
            <img src={`${import.meta.env.BASE_URL}logo.png`} alt="PetCare Hub" className="w-full h-full object-contain rounded-xl" />
          </div>
          <h1 className="text-2xl font-black text-stone-900 font-display">{t('auth.loginTitle')}</h1>
          <p className="text-xs text-stone-500">{t('auth.loginSubtitle')}</p>
        </div>

        {/* Demo Fast Switch Options */}
        <div className="p-4 bg-[#fde2cd]/60 rounded-2xl border border-[#f0ceb2] space-y-2">
          <span className="text-[10px] font-black text-[#9c3810] uppercase tracking-wider block">
            ⚡ {language === 'en' ? 'Quick 1-Click Demo Logins:' : 'Trải nghiệm Demo nhanh (1-Click Login):'}
          </span>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleQuickLogin('USER', 'user-1')}
              className="p-2.5 bg-white rounded-xl border border-[#efe2d3] text-left hover:border-[#d46b28] transition cursor-pointer"
            >
              <span className="text-xs font-bold text-stone-900 block">Đặng Quang Minh</span>
              <span className="text-[10px] text-[#d46b28] font-semibold">{language === 'en' ? 'Fosterer / Adopter' : 'User (Có hồ sơ đầy đủ)'}</span>
            </button>
            <button
              type="button"
              onClick={() => handleQuickLogin('USER', 'user-2')}
              className="p-2.5 bg-white rounded-xl border border-[#efe2d3] text-left hover:border-[#d46b28] transition cursor-pointer"
            >
              <span className="text-xs font-bold text-stone-900 block">Lê Thu Thảo</span>
              <span className="text-[10px] text-[#d46b28] font-semibold">{language === 'en' ? 'Shelter Manager' : 'User (Người nhận nuôi)'}</span>
            </button>
            <button
              type="button"
              onClick={() => handleQuickLogin('ADMIN', 'admin-1')}
              className="col-span-2 p-2.5 bg-[#2b2523] text-white rounded-xl text-left hover:bg-[#3d332f] transition flex items-center justify-between cursor-pointer"
            >
              <div>
                <span className="text-xs font-bold block">Trần Hoàng ({language === 'en' ? 'Administrator' : 'Quản trị viên'})</span>
                <span className="text-[10px] text-amber-400 font-semibold">{language === 'en' ? 'Admin Full Access' : 'Admin Full Permissions'}</span>
              </div>
              <Shield className="w-4 h-4 text-amber-400" />
            </button>
          </div>
        </div>

        {/* Standard Form */}
        <form onSubmit={handleFormLogin} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-stone-700 block">{t('auth.email')}</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                placeholder={t('auth.emailPlaceholder')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-[#d46b28] focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold text-stone-700 block">{t('auth.password')}</label>
              <a href="#forgot" className="text-[11px] font-semibold text-[#d46b28] hover:underline">{t('auth.forgotPassword')}</a>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                placeholder={t('auth.passwordPlaceholder')}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-[#d46b28] focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-[#d46b28] hover:bg-[#ba591a] text-white font-bold text-xs tracking-wide shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>{t('auth.loginBtn')}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center pt-2 border-t border-stone-100">
          <p className="text-xs text-stone-600">
            {t('auth.noAccount')}{' '}
            <button
              type="button"
              onClick={() => navigate('/register')}
              className="font-bold text-[#d46b28] hover:underline cursor-pointer"
            >
              {t('auth.registerNow')}
            </button>
          </p>
        </div>

      </div>
    </div>
  );
};
