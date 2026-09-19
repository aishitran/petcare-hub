import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { Heart, User, Mail, Lock, Phone, ArrowRight, ShieldCheck } from 'lucide-react';

interface RegisterPageProps {
  navigate: (path: string) => void;
}

export const RegisterPage: React.FC<RegisterPageProps> = ({ navigate }) => {
  const { switchRole } = useAuth();
  const { language, t } = useLanguage();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate user creation and log in
    switchRole('USER', 'user-1');
    navigate('/dashboard');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 text-left">
      <div className="max-w-md w-full bg-white rounded-3xl border border-stone-200/80 shadow-xl p-8 space-y-6">
        
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-white shadow-md p-1 border border-stone-200 mx-auto flex items-center justify-center">
            <img src="/logo.png" alt="PetCare Hub" className="w-full h-full object-contain rounded-xl" />
          </div>
          <h1 className="text-2xl font-black text-stone-900 font-display">{t('auth.registerTitle')}</h1>
          <p className="text-xs text-stone-500">{t('auth.registerSubtitle')}</p>
        </div>

        {/* Value Proposition */}
        <div className="p-3.5 bg-[#fde2cd]/60 rounded-2xl border border-[#f0ceb2] flex items-center gap-3 text-xs text-stone-800">
          <ShieldCheck className="w-5 h-5 text-[#d46b28] shrink-0" />
          <span>{language === 'en' ? 'A unified account to post pet profiles, manage adoption surveys, and monitor rescue cases.' : 'Tài khoản duy nhất giúp bạn vừa đăng tin tìm chủ vừa nộp đơn nhận nuôi mọi bé cưng.'}</span>
        </div>

        {/* Register Form */}
        <form onSubmit={handleRegister} className="space-y-3.5">
          
          <div className="space-y-1">
            <label className="text-xs font-bold text-stone-700 block">{t('auth.fullName')} *</label>
            <div className="relative">
              <User className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                placeholder={t('auth.fullNamePlaceholder')}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-[#d46b28] focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-stone-700 block">{t('auth.email')} *</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                placeholder={t('auth.emailPlaceholder')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-[#d46b28] focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-stone-700 block">{t('auth.phone')} *</label>
            <div className="relative">
              <Phone className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="tel"
                required
                placeholder={t('auth.phonePlaceholder')}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-[#d46b28] focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-stone-700 block">{t('auth.password')} *</label>
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

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[#d46b28] hover:bg-[#ba591a] text-white font-bold text-xs tracking-wide shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{t('auth.registerBtn')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </form>

        <div className="text-center pt-2 border-t border-stone-100">
          <p className="text-xs text-stone-600">
            {t('auth.hasAccount')}{' '}
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="font-bold text-[#d46b28] hover:underline cursor-pointer"
            >
              {t('auth.loginNow')}
            </button>
          </p>
        </div>

      </div>
    </div>
  );
};
