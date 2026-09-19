import React, { useState, useMemo } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { mockEmergencyShelters } from '../../data/mockEmergencyShelters';
import { EmergencyShelter } from '../../types/shelter';
import { translateCity, translateDistrict, translateShelterName, translateAddress } from '../../utils/addressTranslator';
import { 
  Phone, 
  MapPin, 
  Clock, 
  Search, 
  ShieldCheck, 
  AlertCircle, 
  Navigation, 
  Building2, 
  HeartHandshake, 
  X,
  ExternalLink,
  ChevronRight,
  Info
} from 'lucide-react';

interface EmergencyShelterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReportStreetIncident?: () => void;
}

export const EmergencyShelterModal: React.FC<EmergencyShelterModalProps> = ({
  isOpen,
  onClose,
  onReportStreetIncident
}) => {
  const { language, t } = useLanguage();
  const [selectedCity, setSelectedCity] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [only247, setOnly247] = useState(false);
  const [activeTab, setActiveTab] = useState<'DIRECTORY' | 'GUIDE'>('DIRECTORY');

  const cities = useMemo(() => {
    const set = new Set(mockEmergencyShelters.map(s => s.city));
    return ['ALL', ...Array.from(set)];
  }, []);

  const filteredShelters = useMemo(() => {
    return mockEmergencyShelters.filter(shelter => {
      if (selectedCity !== 'ALL' && shelter.city !== selectedCity) return false;
      if (only247 && !shelter.is24_7) return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = shelter.name.toLowerCase().includes(q);
        const matchDistrict = shelter.district.toLowerCase().includes(q);
        const matchAddress = shelter.address.toLowerCase().includes(q);
        const matchServices = shelter.services.some(s => s.toLowerCase().includes(q));
        if (!matchName && !matchDistrict && !matchAddress && !matchServices) return false;
      }

      return true;
    });
  }, [selectedCity, searchQuery, only247]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-black/75 backdrop-blur-md animate-fade-in text-left overflow-y-auto">
      <div className="bg-stone-900 border border-stone-700/80 text-white rounded-3xl max-w-4xl w-full max-h-[86vh] my-auto flex flex-col shadow-2xl overflow-hidden">
        
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-stone-800 bg-gradient-to-r from-[#3a150b] via-[#2c1209] to-[#1e0a04] flex items-start justify-between gap-4 shrink-0">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 text-[11px] font-bold tracking-wide uppercase border border-rose-500/30">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
              {t('emergency.modalTag')}
            </div>
            <h2 className="text-xl sm:text-2xl font-black font-display text-white">
              {t('emergency.modalTitle')}
            </h2>
            <p className="text-xs sm:text-sm text-stone-300">
              {t('emergency.modalSubtitle')}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl bg-stone-800/80 hover:bg-stone-700 text-stone-300 hover:text-white transition cursor-pointer"
            aria-label={t('common.close')}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs inside Modal */}
        <div className="flex border-b border-stone-800 bg-stone-950 px-6 pt-2 gap-4 text-xs font-bold shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab('DIRECTORY')}
            className={`pb-3 border-b-2 transition cursor-pointer ${
              activeTab === 'DIRECTORY'
                ? 'border-[#d46b28] text-amber-400'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            {t('emergency.tabDirectory')} ({filteredShelters.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('GUIDE')}
            className={`pb-3 border-b-2 transition cursor-pointer ${
              activeTab === 'GUIDE'
                ? 'border-[#d46b28] text-amber-400'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            {t('emergency.tabGuide')}
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-6">
          
          {activeTab === 'DIRECTORY' ? (
            <>
              {/* Filter controls */}
              <div className="space-y-3">
                {/* City Filter Pills */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-semibold text-stone-400 mr-1">{t('emergency.filterRegion')}</span>
                  {cities.map(city => (
                    <button
                      type="button"
                      key={city}
                      onClick={() => setSelectedCity(city)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-medium transition cursor-pointer ${
                        selectedCity === city
                          ? 'bg-[#d46b28] text-white font-bold shadow-xs'
                          : 'bg-stone-800 text-stone-300 hover:bg-stone-700 hover:text-white'
                      }`}
                    >
                      {city === 'ALL' ? t('emergency.filterAllRegions') : translateCity(city, language)}
                    </button>
                  ))}
                </div>

                {/* Search & 24/7 Filter */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                  <div className="sm:col-span-8 relative">
                    <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder={t('emergency.searchPlaceholder')}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-stone-800/90 border border-stone-700 text-xs text-white placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#d46b28]"
                    />
                  </div>

                  <div className="sm:col-span-4 flex items-center">
                    <label className="flex items-center gap-2 cursor-pointer select-none bg-stone-800/80 px-3.5 py-2.5 rounded-xl border border-stone-700 w-full">
                      <input
                        type="checkbox"
                        checked={only247}
                        onChange={(e) => setOnly247(e.target.checked)}
                        className="rounded border-stone-600 text-[#d46b28] focus:ring-[#d46b28] bg-stone-700"
                      />
                      <span className="text-xs font-medium text-stone-200">{t('emergency.only247')}</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Shelter Cards List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {filteredShelters.map((shelter) => (
                  <div
                    key={shelter.id}
                    className="bg-stone-800/90 border border-stone-700/80 rounded-2xl p-5 sm:p-6 flex flex-col justify-between hover:border-orange-500/50 transition shadow-sm space-y-5"
                  >
                    <div className="space-y-4">
                      {/* Top Badges */}
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-1.5">
                          <span className="px-2.5 py-1 rounded-lg bg-stone-700 text-[10px] font-bold text-stone-200 uppercase tracking-wide">
                            {translateCity(shelter.city, language)}
                          </span>
                          <span className="text-xs text-stone-400 font-medium">• {translateDistrict(shelter.district, language)}</span>
                        </div>

                        <div className="flex items-center gap-1.5">
                          {shelter.is24_7 && (
                            <span className="px-2.5 py-1 rounded-lg bg-rose-950 text-rose-300 border border-rose-800/80 text-[10px] font-bold">
                              24/7
                            </span>
                          )}
                          <span className="px-2.5 py-1 rounded-lg bg-stone-900 text-stone-400 border border-stone-700 text-[10px] font-medium">
                            {t('emergency.nonProfitBadge')}
                          </span>
                        </div>
                      </div>

                      {/* Shelter Title */}
                      <div className="space-y-1">
                        <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-orange-300 leading-snug">
                          {translateShelterName(shelter.name, language)}
                        </h3>
                        <p className="text-xs text-stone-400 flex items-center gap-1.5 pt-0.5">
                          <Clock className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                          <span>{language === 'en' ? (shelter.operatingHoursEn || shelter.operatingHours) : shelter.operatingHours}</span>
                        </p>
                      </div>

                      {/* Address */}
                      <div className="p-3 rounded-xl bg-stone-950/70 border border-stone-800 space-y-1">
                        <div className="text-[10px] uppercase font-bold text-stone-400 flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                          <span>{t('emergency.addressLabel')}</span>
                        </div>
                        <p className="text-xs text-stone-200 font-medium leading-relaxed pl-5">
                          {translateAddress(shelter.address, language)}
                        </p>
                      </div>

                      {/* Instructions for Finder */}
                      <div className="text-xs text-stone-300 leading-relaxed bg-amber-950/20 p-3 rounded-xl border border-amber-900/40 space-y-1">
                        <strong className="text-amber-300 block font-bold">{t('emergency.finderNote')}</strong>
                        <p className="text-stone-300 text-[11px] leading-relaxed">
                          {language === 'en' ? (shelter.instructionsForFinderEn || shelter.instructionsForFinder) : shelter.instructionsForFinder}
                        </p>
                      </div>

                      {/* Services Chips */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {((language === 'en' && shelter.servicesEn && shelter.servicesEn.length > 0) ? shelter.servicesEn : shelter.services).map((svc, idx) => (
                          <span
                            key={idx}
                            className="px-2.5 py-1 rounded-lg bg-stone-900 text-[10px] text-stone-300 border border-stone-800"
                          >
                            {svc}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="pt-3 border-t border-stone-700/80 flex items-center gap-2.5">
                      <a
                        href={`tel:${shelter.hotline.replace(/\s+/g, '')}`}
                        className="flex-1 py-2.5 px-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition shadow-xs"
                      >
                        <Phone className="w-4 h-4" />
                        <span>{t('emergency.callShelter')}: {shelter.hotline}</span>
                      </a>

                      {shelter.googleMapsUrl && (
                        <a
                          href={shelter.googleMapsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="py-2.5 px-3 rounded-xl bg-stone-700 hover:bg-stone-600 text-stone-200 hover:text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition"
                          title={t('emergency.getDirections')}
                        >
                          <Navigation className="w-3.5 h-3.5 text-orange-400" />
                          <span className="hidden sm:inline">{t('emergency.getDirections')}</span>
                        </a>
                      )}
                    </div>

                  </div>
                ))}
              </div>

              {filteredShelters.length === 0 && (
                <div className="p-10 text-center bg-stone-800/40 rounded-2xl border border-stone-700 space-y-2">
                  <p className="text-sm text-stone-400 font-medium">{t('emergency.noSheltersFound')}</p>
                  <button
                    type="button"
                    onClick={() => { setSelectedCity('ALL'); setSearchQuery(''); setOnly247(false); }}
                    className="text-xs text-orange-400 font-bold hover:underline cursor-pointer"
                  >
                    {t('emergency.resetFilter')}
                  </button>
                </div>
              )}
            </>
          ) : (
            /* Emergency Street Rescue Guide Tab */
            <div className="space-y-6 text-stone-300 text-xs sm:text-sm leading-relaxed">
              <div className="p-4 rounded-2xl bg-rose-950/40 border border-rose-800/50 text-rose-200 space-y-2">
                <div className="font-bold text-base flex items-center gap-2 text-rose-300">
                  <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
                  {t('emergency.guideGoldenRules')}
                </div>
                <p className="text-xs leading-relaxed text-rose-100">
                  {t('emergency.guideSubtitle')}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                <div className="p-4 rounded-2xl bg-stone-800/90 border border-stone-700 space-y-2">
                  <div className="text-amber-400 font-bold text-sm flex items-center gap-2">
                    {t('emergency.step1Title')}
                  </div>
                  <p className="text-xs text-stone-300">
                    {t('emergency.step1Desc')}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-stone-800/90 border border-stone-700 space-y-2">
                  <div className="text-amber-400 font-bold text-sm flex items-center gap-2">
                    {t('emergency.step2Title')}
                  </div>
                  <p className="text-xs text-stone-300">
                    {t('emergency.step2Desc')}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-stone-800/90 border border-stone-700 space-y-2">
                  <div className="text-amber-400 font-bold text-sm flex items-center gap-2">
                    {t('emergency.step3Title')}
                  </div>
                  <p className="text-xs text-stone-300">
                    {t('emergency.step3Desc')}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-stone-800/90 border border-stone-700 space-y-2">
                  <div className="text-amber-400 font-bold text-sm flex items-center gap-2">
                    {t('emergency.step4Title')}
                  </div>
                  <p className="text-xs text-stone-300">
                    {t('emergency.step4Desc')}
                  </p>
                </div>

              </div>

              {onReportStreetIncident && (
                <div className="p-4 rounded-2xl bg-stone-800 border border-stone-700 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <h4 className="font-bold text-white text-sm">{t('emergency.onSceneQ')}</h4>
                    <p className="text-xs text-stone-400">{t('emergency.onSceneSub')}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onReportStreetIncident();
                    }}
                    className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs whitespace-nowrap shadow-sm cursor-pointer"
                  >
                    {t('emergency.onSceneBtn')}
                  </button>
                </div>
              )}

            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-stone-950 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0 text-xs text-stone-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-orange-400 shrink-0" />
            <span>{t('emergency.nonProfitFooter')}</span>
          </div>
          
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold cursor-pointer"
          >
            {t('emergency.closeDirectory')}
          </button>
        </div>

      </div>
    </div>
  );
};
