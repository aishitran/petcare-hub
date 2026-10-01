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

            <p className="text-xs sm:text-sm text-amber-100/90 leading-relaxed font-normal">
              {t('emergency.bannerDesc')}
            </p>

            {/* Direct City Hotline Chips */}
            <div className="space-y-1.5 pt-1">
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-amber-200 uppercase tracking-wider">
                <Phone className="w-3.5 h-3.5 text-amber-300" />
                <span>{t('emergency.hotlineTag')} (24/7):</span>
              </div>
              
              <div className="flex flex-wrap items-center gap-2">
                <a
                  href="tel:0938521115"
                  className="px-3 py-1.5 rounded-xl bg-black/30 hover:bg-black/45 border border-white/20 hover:border-amber-300 text-white text-xs font-semibold flex items-center gap-1.5 transition backdrop-blur-xs shadow-xs"
                >
                  <MapPin className="w-3.5 h-3.5 text-amber-300" />
                  <span>{language === 'en' ? 'HCMC' : 'TP.HCM'}: <strong className="text-amber-200">0938 521 115</strong></span>
                </a>

                <a
                  href="tel:0983611043"
                  className="px-3 py-1.5 rounded-xl bg-black/30 hover:bg-black/45 border border-white/20 hover:border-amber-300 text-white text-xs font-semibold flex items-center gap-1.5 transition backdrop-blur-xs shadow-xs"
                >
                  <MapPin className="w-3.5 h-3.5 text-amber-300" />
                  <span>{language === 'en' ? 'Hanoi' : 'Hà Nội'}: <strong className="text-amber-200">0983 611 043</strong></span>
                </a>

                <a
                  href="tel:0935888999"
                  className="px-3 py-1.5 rounded-xl bg-black/30 hover:bg-black/45 border border-white/20 hover:border-amber-300 text-white text-xs font-semibold flex items-center gap-1.5 transition backdrop-blur-xs shadow-xs"
                >
                  <MapPin className="w-3.5 h-3.5 text-amber-300" />
                  <span>{language === 'en' ? 'Da Nang' : 'Đà Nẵng'}: <strong className="text-amber-200">0935 888 999</strong></span>
                </a>

                <a
                  href="tel:0949111222"
                  className="px-3 py-1.5 rounded-xl bg-black/30 hover:bg-black/45 border border-white/20 hover:border-amber-300 text-white text-xs font-semibold flex items-center gap-1.5 transition backdrop-blur-xs shadow-xs"
                >
                  <MapPin className="w-3.5 h-3.5 text-amber-300" />
                  <span>{language === 'en' ? 'Can Tho' : 'Cần Thơ'}: <strong className="text-amber-200">0949 111 222</strong></span>
                </a>
              </div>
            </div>
          </div>

          {/* Right: Action Buttons */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 w-full lg:w-auto shrink-0">
            <button
              type="button"
              onClick={onOpenDirectory}
              className="px-6 py-3.5 rounded-2xl bg-white hover:bg-amber-50 text-[#8f3209] font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition group cursor-pointer"
            >
              <Phone className="w-4 h-4 text-[#d46b28]" />
              <span>{t('emergency.lookupBtn')}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition text-[#d46b28]" />
            </button>

            <button
              type="button"
              onClick={onReportStreetRescue}
              className="px-6 py-3.5 rounded-2xl bg-rose-600/90 hover:bg-rose-600 border border-rose-400/40 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition cursor-pointer"
            >
              <AlertCircle className="w-4 h-4 text-amber-200" />
              <span>{t('emergency.reportSosBtn')}</span>
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
