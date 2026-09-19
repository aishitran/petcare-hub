import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { 
  Phone, 
  MapPin, 
  AlertCircle, 
  ShieldAlert, 
  Search, 
  ArrowRight,
  Sparkles,
  HeartHandshake
} from 'lucide-react';

interface EmergencyRescueBannerProps {
  onOpenDirectory: () => void;
  onReportStreetRescue: () => void;
}

export const EmergencyRescueBanner: React.FC<EmergencyRescueBannerProps> = ({
  onOpenDirectory,
  onReportStreetRescue
}) => {
  const { t, language } = useLanguage();

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#d46b28] via-[#bf5317] to-[#8f3209] text-white shadow-md border border-amber-300/30 p-6 sm:p-8 lg:p-9 text-left">
        
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          
          {/* Left: Message and Urgency */}
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 text-[11px] font-bold tracking-wider uppercase border border-rose-500/30">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
              {t('emergency.bannerTag')}
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black font-display text-white tracking-tight leading-snug">
              {t('emergency.bannerTitle1')}
              <br />
              <span className="text-amber-300 text-xl sm:text-2xl lg:text-3xl font-bold">
                {t('emergency.bannerTitle2')}
              </span>
            </h2>

            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-normal">
              {t('emergency.bannerDesc')}
            </p>

            {/* Direct City Hotline Chips */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-[11px] font-bold text-stone-400 uppercase mr-1">
                {t('emergency.hotlineTag')}
              </span>
              
              <a
                href="tel:0938521115"
                className="px-2.5 py-1 rounded-lg bg-stone-900/90 border border-stone-700 hover:border-amber-400 text-stone-200 text-xs font-semibold flex items-center gap-1.5 transition"
              >
                <MapPin className="w-3 h-3 text-amber-400" />
                <span>{language === 'en' ? 'HCMC' : 'TP.HCM'}: <strong>0938 521 115</strong></span>
              </a>

              <a
                href="tel:0983611043"
                className="px-2.5 py-1 rounded-lg bg-stone-900/90 border border-stone-700 hover:border-amber-400 text-stone-200 text-xs font-semibold flex items-center gap-1.5 transition"
              >
                <MapPin className="w-3 h-3 text-amber-400" />
                <span>{language === 'en' ? 'Hanoi' : 'Hà Nội'}: <strong>0983 611 043</strong></span>
              </a>

              <a
                href="tel:0935888999"
                className="px-2.5 py-1 rounded-lg bg-stone-900/90 border border-stone-700 hover:border-amber-400 text-stone-200 text-xs font-semibold flex items-center gap-1.5 transition"
              >
                <MapPin className="w-3 h-3 text-amber-400" />
                <span>{language === 'en' ? 'Da Nang' : 'Đà Nẵng'}: <strong>0935 888 999</strong></span>
              </a>

              <a
                href="tel:0949111222"
                className="px-2.5 py-1 rounded-lg bg-stone-900/90 border border-stone-700 hover:border-amber-400 text-stone-200 text-xs font-semibold flex items-center gap-1.5 transition"
              >
                <MapPin className="w-3 h-3 text-amber-400" />
                <span>{language === 'en' ? 'Can Tho' : 'Cần Thơ'}: <strong>0949 111 222</strong></span>
              </a>
            </div>
          </div>

          {/* Right: Action Buttons */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 w-full lg:w-auto shrink-0">
            
            <button
              onClick={onOpenDirectory}
              className="px-6 py-3.5 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition group cursor-pointer"
            >
              <Phone className="w-4 h-4 text-white" />
              <span>{t('emergency.lookupBtn')}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition" />
            </button>

            <button
              onClick={onReportStreetRescue}
              className="px-6 py-3.5 rounded-2xl bg-stone-800/90 hover:bg-stone-700 border border-stone-600 text-stone-100 hover:text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition cursor-pointer"
            >
              <AlertCircle className="w-4 h-4 text-amber-400" />
              <span>{t('emergency.reportSosBtn')}</span>
            </button>

          </div>

        </div>

      </div>
    </section>
  );
};
