import React from 'react';
import { useData } from '../../context/DataContext';
import { useLanguage } from '../../context/LanguageContext';

export const Footer: React.FC<{ navigate: (path: string) => void }> = ({ navigate }) => {
  const { publicStats } = useData();
  const { language, t } = useLanguage();

  return (
    <footer className="bg-[#fce2cd] dark:bg-[#181411] text-[#2b2523] dark:text-stone-200 border-t border-[#f0ceb2] dark:border-stone-800 text-left pt-14 pb-10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Col (2 cols on lg) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => navigate('/')}>
              <img src={`${import.meta.env.BASE_URL}logo.png`} alt="PetCare Hub" className="w-9 h-9 rounded-full object-cover shadow-2xs ring-2 ring-[#d46b28]/30" />
              <span className="text-xl font-black tracking-tight text-[#2b2523] dark:text-stone-100 font-display">
                PetCare <span className="text-[#d46b28] font-bold">Hub</span>
              </span>
            </div>
            
            <p className="text-xs text-[#665851] dark:text-stone-400 leading-relaxed max-w-sm">
              {t('footer.desc')}
            </p>

            <div className="p-3.5 bg-white/80 dark:bg-stone-900/80 backdrop-blur-xs rounded-2xl border border-[#eed4bf] dark:border-stone-800 flex items-center gap-2.5 text-xs text-[#4a3e39] dark:text-stone-300 font-medium shadow-2xs">
              <span className="w-2.5 h-2.5 rounded-full bg-[#d46b28] shrink-0"></span>
              <span>
                {language === 'en' ? (
                  <>Connected <b className="text-[#d46b28] font-bold">{publicStats.adoptedPets.toLocaleString()}</b> pets with loving forever homes.</>
                ) : (
                  <>Đã kết nối <b className="text-[#d46b28] font-bold">{publicStats.adoptedPets.toLocaleString()}</b> bé thú cưng về với mái ấm mới an toàn.</>
                )}
              </span>
            </div>
          </div>

          {/* Col 1: Discovery */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#2b2523] dark:text-stone-100">
              {t('footer.navHeader')}
            </h4>
            <ul className="space-y-2 text-xs text-[#5c4d46] dark:text-stone-300">
              <li>
                <button type="button" onClick={() => navigate('/pets')} className="text-left w-full block hover:text-[#d46b28] dark:hover:text-amber-400 transition cursor-pointer leading-normal">
                  {t('nav.pets')}
                </button>
              </li>
              <li>
                <button type="button" onClick={() => navigate('/rescue')} className="text-left w-full block hover:text-[#d46b28] dark:hover:text-amber-400 transition cursor-pointer leading-normal">
                  {t('nav.rescue')}
                </button>
              </li>
              <li>
                <button type="button" onClick={() => navigate('/#guide')} className="text-left w-full block hover:text-[#d46b28] dark:hover:text-amber-400 transition cursor-pointer leading-normal">
                  {t('nav.guide')}
                </button>
              </li>
              <li>
                <button type="button" onClick={() => navigate('/my-pets/create')} className="text-left w-full block hover:text-[#d46b28] dark:hover:text-amber-400 transition cursor-pointer leading-normal">
                  {t('nav.createPet')}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 2: Support & Rescue */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#2b2523] dark:text-stone-100">
              {t('footer.supportHeader')}
            </h4>
            <ul className="space-y-2 text-xs text-[#5c4d46] dark:text-stone-300">
              <li>
                <button type="button" onClick={() => navigate('/rescue')} className="text-left w-full block hover:text-[#d46b28] dark:hover:text-amber-400 transition cursor-pointer leading-normal">
                  {t('footer.shelterDirectory')}
                </button>
              </li>
              <li>
                <button type="button" onClick={() => navigate('/rescue')} className="text-left w-full block hover:text-[#d46b28] dark:hover:text-amber-400 transition cursor-pointer leading-normal">
                  {t('footer.foodFund')}
                </button>
              </li>
              <li>
                <button type="button" onClick={() => navigate('/identity')} className="text-left w-full block hover:text-[#d46b28] dark:hover:text-amber-400 transition cursor-pointer leading-normal">
                  {t('nav.identity')}
                </button>
              </li>
              <li>
                <button type="button" onClick={() => navigate('/reports')} className="text-left w-full block hover:text-[#d46b28] dark:hover:text-amber-400 transition cursor-pointer leading-normal">
                  {t('nav.reports')}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Community & Welfare */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#2b2523] dark:text-stone-100">
              {t('footer.communityHeader')}
            </h4>
            <ul className="space-y-2.5 text-xs text-[#5c4d46] dark:text-stone-300">
              <li>
                <button type="button" onClick={() => navigate('/commitments')} className="text-left w-full block hover:text-[#d46b28] dark:hover:text-amber-400 transition cursor-pointer leading-normal">
                  {t('footer.nonProfitPledge')}
                </button>
              </li>
              <li>
                <button type="button" onClick={() => navigate('/check-ins')} className="text-left w-full block hover:text-[#d46b28] dark:hover:text-amber-400 transition cursor-pointer leading-normal">
                  {t('nav.checkIns')}
                </button>
              </li>
              <li>
                <button type="button" onClick={() => navigate('/')} className="text-left w-full block hover:text-[#d46b28] dark:hover:text-amber-400 transition cursor-pointer leading-normal">
                  {t('footer.antiMeat')}
                </button>
              </li>
              <li>
                <button type="button" onClick={() => navigate('/terms')} className="text-left w-full block hover:text-[#d46b28] dark:hover:text-amber-400 transition cursor-pointer leading-normal">
                  {t('footer.terms')}
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#eed4bf] dark:border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#665851] dark:text-stone-400">
          <div>
            © {new Date().getFullYear()} PetCare Hub. {t('footer.rights')}
          </div>
          <div className="flex items-center gap-6">
            <span>{language === 'en' ? 'English (EN)' : 'Tiếng Việt (VI)'}</span>
            <span className="font-semibold text-[#d46b28]">100% Non-Profit Animal Welfare</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
