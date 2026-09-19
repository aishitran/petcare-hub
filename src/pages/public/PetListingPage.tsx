import React, { useState, useMemo } from 'react';
import { useData } from '../../context/DataContext';
import { useLanguage } from '../../context/LanguageContext';
import { PetCard } from '../../components/user/PetCard';
import { AdoptionWizardModal } from '../../components/user/AdoptionWizardModal';
import { Pet } from '../../types/pet';
import { 
  Search, 
  SlidersHorizontal, 
  X
} from 'lucide-react';
import { translateCity } from '../../utils/addressTranslator';

interface PetListingPageProps {
  navigate: (path: string) => void;
}

export const PetListingPage: React.FC<PetListingPageProps> = ({ navigate }) => {
  const { pets } = useData();
  const { t, language } = useLanguage();
  const [selectedPetForAdoption, setSelectedPetForAdoption] = useState<Pet | null>(null);

  // Filters State
  const [searchQuery, setSearchQuery] = useState('');
  const [speciesFilter, setSpeciesFilter] = useState<string>('ALL');
  const [genderFilter, setGenderFilter] = useState<string>('ALL');
  const [ageGroupFilter, setAgeGroupFilter] = useState<string>('ALL');
  const [sizeFilter, setSizeFilter] = useState<string>('ALL');
  const [locationFilter, setLocationFilter] = useState<string>('ALL');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [sterilizedOnly, setSterilizedOnly] = useState(false);
  const [vaccinatedOnly, setVaccinatedOnly] = useState(false);
  const [specialNeedsOnly, setSpecialNeedsOnly] = useState(false);
  
  // Sort State
  const [sortBy, setSortBy] = useState<'NEWEST' | 'OLDEST' | 'NAME'>('NEWEST');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Filtered & Sorted Pets
  const filteredPets = useMemo(() => {
    return pets.filter(pet => {
      // Must be approved by admin to appear publicly
      if (pet.moderationStatus !== 'APPROVED') return false;

      // Keyword search (name, breed, description)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = pet.name.toLowerCase().includes(q);
        const matchesBreed = pet.breed.toLowerCase().includes(q);
        const matchesDesc = (pet.description || '').toLowerCase().includes(q);
        const matchesLocation = pet.location.toLowerCase().includes(q);
        if (!matchesName && !matchesBreed && !matchesDesc && !matchesLocation) return false;
      }

      // Species filter
      if (speciesFilter !== 'ALL' && pet.species !== speciesFilter) return false;

      // Gender filter
      if (genderFilter !== 'ALL' && pet.gender !== genderFilter) return false;

      // Age group filter
      if (ageGroupFilter !== 'ALL' && pet.ageGroup !== ageGroupFilter) return false;

      // Size filter
      if (sizeFilter !== 'ALL' && pet.size !== sizeFilter) return false;

      // Location filter (province substring)
      if (locationFilter !== 'ALL') {
        if (!pet.location.toLowerCase().includes(locationFilter.toLowerCase())) return false;
      }

      // Status filter
      if (statusFilter !== 'ALL' && pet.status !== statusFilter) return false;

      // Health criteria
      if (sterilizedOnly && !pet.health.isSterilized) return false;
      if (vaccinatedOnly && !pet.health.isVaccinated) return false;
      if (specialNeedsOnly && !pet.health.hasSpecialNeeds) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'NEWEST') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      if (sortBy === 'OLDEST') return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      if (sortBy === 'NAME') return a.name.localeCompare(b.name);
      return 0;
    });
  }, [
    pets, 
    searchQuery, 
    speciesFilter, 
    genderFilter, 
    ageGroupFilter, 
    sizeFilter, 
    locationFilter, 
    statusFilter, 
    sterilizedOnly, 
    vaccinatedOnly, 
    specialNeedsOnly, 
    sortBy
  ]);

  const resetFilters = () => {
    setSearchQuery('');
    setSpeciesFilter('ALL');
    setGenderFilter('ALL');
    setAgeGroupFilter('ALL');
    setSizeFilter('ALL');
    setLocationFilter('ALL');
    setStatusFilter('ALL');
    setSterilizedOnly(false);
    setVaccinatedOnly(false);
    setSpecialNeedsOnly(false);
    setSortBy('NEWEST');
  };

  const isFiltered = searchQuery !== '' || 
    speciesFilter !== 'ALL' || 
    genderFilter !== 'ALL' || 
    ageGroupFilter !== 'ALL' || 
    sizeFilter !== 'ALL' || 
    locationFilter !== 'ALL' || 
    statusFilter !== 'ALL' || 
    sterilizedOnly || 
    vaccinatedOnly || 
    specialNeedsOnly;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-left">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-stone-200 dark:border-stone-800 pb-6">
        <div>
          <div className="text-amber-800 dark:text-amber-400 text-[11px] font-bold uppercase tracking-wider mb-1">
            {t('pets.pageTag')}
          </div>
          <h1 className="text-3xl font-black text-stone-900 dark:text-stone-100 font-display">
            {t('pets.pageTitle')}
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 mt-1">
            {t('pets.pageDesc')}
          </p>
        </div>

        {/* Search Bar on Header */}
        <div className="flex items-center gap-3">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('pets.searchPlaceholder')}
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 text-xs focus:ring-2 focus:ring-[#d46b28] focus:outline-none shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <button
            onClick={() => setMobileFilterOpen(true)}
            className="lg:hidden p-2.5 rounded-2xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 flex items-center gap-2 text-xs font-bold border border-stone-200 dark:border-stone-700"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>{t('common.filter')}</span>
          </button>
        </div>
      </div>

      {/* 5-STEP COMMUNITY ADOPTION PROCESS BANNER */}
      <div className="bg-gradient-to-br from-amber-50/90 via-orange-50/40 to-stone-50/80 dark:from-stone-900 dark:via-stone-900 dark:to-stone-950 rounded-3xl border border-amber-200/80 dark:border-stone-800 p-5 sm:p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-amber-200/60 dark:border-stone-800 pb-3.5">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#d46b28] animate-pulse" />
              <h2 className="text-base sm:text-lg font-black text-stone-900 dark:text-stone-100 font-display">
                {t('pets.processCardTitle')}
              </h2>
            </div>
            <p className="text-xs text-stone-600 dark:text-stone-400">
              {t('pets.processCardSub')}
            </p>
          </div>
        </div>

        {/* 5 Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {[
            { step: '01', title: t('pets.step1'), desc: t('pets.step1Sub') },
            { step: '02', title: t('pets.step2'), desc: t('pets.step2Sub') },
            { step: '03', title: t('pets.step3'), desc: t('pets.step3Sub') },
            { step: '04', title: t('pets.step4'), desc: t('pets.step4Sub') },
            { step: '05', title: t('pets.step5'), desc: t('pets.step5Sub') },
          ].map((item) => (
            <div 
              key={item.step}
              className="bg-white/95 dark:bg-stone-900/95 rounded-2xl p-3.5 border border-amber-100 dark:border-stone-800 shadow-2xs space-y-1.5 hover:border-amber-300 dark:hover:border-amber-600/50 transition"
            >
              <div className="flex items-center gap-2">
                <span className="text-xs font-black text-[#d46b28] dark:text-amber-400 bg-amber-100/80 dark:bg-amber-950/60 px-2 py-0.5 rounded-md">
                  {item.step}
                </span>
                <h4 className="font-bold text-xs text-stone-900 dark:text-stone-100 line-clamp-1">
                  {item.title}
                </h4>
              </div>
              <p className="text-[11px] text-stone-600 dark:text-stone-400 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Main Grid: Filters Sidebar + Results Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* DESKTOP FILTER SIDEBAR */}
        <aside className="hidden lg:block lg:col-span-3 bg-white dark:bg-stone-900 p-5 rounded-3xl border border-stone-200/80 dark:border-stone-800 shadow-sm space-y-6 sticky top-24">
          
          <div className="flex items-center justify-between pb-3 border-b border-stone-100 dark:border-stone-800">
            <h3 className="font-bold text-stone-900 dark:text-stone-100 text-sm">{t('common.filter')}</h3>
            {isFiltered && (
              <button
                onClick={resetFilters}
                className="text-[11px] font-bold text-stone-500 hover:text-stone-900 dark:hover:text-stone-200 transition cursor-pointer"
              >
                {t('pets.resetFilters')}
              </button>
            )}
          </div>

          {/* Species */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-stone-800 dark:text-stone-200 block">{t('pets.filterSpecies')}</label>
            <div className="grid grid-cols-3 gap-1.5">
              {[
                { id: 'ALL', label: t('common.all') },
                { id: 'DOG', label: t('common.dog') },
                { id: 'CAT', label: t('common.cat') }
              ].map(opt => (
                <button
                  key={opt.id}
                  onClick={() => setSpeciesFilter(opt.id)}
                  className={`py-1.5 px-2 rounded-xl text-xs font-bold transition text-center cursor-pointer ${
                    speciesFilter === opt.id
                      ? 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 shadow-sm'
                      : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Gender */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-stone-800 dark:text-stone-200 block">{t('pets.filterGender')}</label>
            <div className="grid grid-cols-3 gap-1.5">
              {[
                { id: 'ALL', label: t('common.all') },
                { id: 'MALE', label: t('common.male') },
                { id: 'FEMALE', label: t('common.female') }
              ].map(opt => (
                <button
                  key={opt.id}
                  onClick={() => setGenderFilter(opt.id)}
                  className={`py-1.5 px-2 rounded-xl text-xs font-bold transition text-center cursor-pointer ${
                    genderFilter === opt.id
                      ? 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 shadow-sm'
                      : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Age Group */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-stone-800 dark:text-stone-200 block">{t('pets.filterAge')}</label>
            <select
              value={ageGroupFilter}
              onChange={(e) => setAgeGroupFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-xs font-medium focus:ring-2 focus:ring-[#d46b28] focus:outline-none"
            >
              <option value="ALL">{t('common.all')} ({t('pets.filterAge')})</option>
              <option value="PUPPY_KITTEN">{language === 'vi' ? 'Bé sơ sinh / Nhỏ (< 6 tháng)' : 'Baby / Kitten / Puppy (< 6 mos)'}</option>
              <option value="YOUNG">{language === 'vi' ? 'Trẻ (6 tháng - 2 năm)' : 'Young (6 mos - 2 yrs)'}</option>
              <option value="ADULT">{language === 'vi' ? 'Trưởng thành (2 - 7 năm)' : 'Adult (2 - 7 yrs)'}</option>
              <option value="SENIOR">{language === 'vi' ? 'Lớn tuổi (> 7 năm)' : 'Senior (> 7 yrs)'}</option>
            </select>
          </div>

          {/* Location */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-stone-800 dark:text-stone-200 block">{t('pets.filterLocation')}</label>
            <select
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-xs font-medium focus:ring-2 focus:ring-[#d46b28] focus:outline-none"
            >
              <option value="ALL">{t('rescue.locationAll')}</option>
              <option value="Hồ Chí Minh">{translateCity('TP. Hồ Chí Minh', language)}</option>
              <option value="Hà Nội">{translateCity('Hà Nội', language)}</option>
              <option value="Đà Nẵng">{translateCity('Đà Nẵng', language)}</option>
              <option value="Bình Dương">{translateCity('Bình Dương', language)}</option>
              <option value="Đồng Nai">{translateCity('Đồng Nai', language)}</option>
              <option value="Cần Thơ">{translateCity('Cần Thơ', language)}</option>
            </select>
          </div>

          {/* Health conditions Checkboxes */}
          <div className="space-y-2 pt-2 border-t border-stone-100 dark:border-stone-800">
            <label className="text-xs font-bold text-stone-800 dark:text-stone-200 block">{t('pets.healthStatus')}</label>
            
            <label className="flex items-center gap-2 cursor-pointer text-xs text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white">
              <input
                type="checkbox"
                checked={sterilizedOnly}
                onChange={(e) => setSterilizedOnly(e.target.checked)}
                className="w-4 h-4 rounded text-[#d46b28] focus:ring-[#d46b28] border-stone-300"
              />
              <span>{t('pets.sterilizedOnly')}</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer text-xs text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white">
              <input
                type="checkbox"
                checked={vaccinatedOnly}
                onChange={(e) => setVaccinatedOnly(e.target.checked)}
                className="w-4 h-4 rounded text-[#d46b28] focus:ring-[#d46b28] border-stone-300"
              />
              <span>{t('pets.vaccinatedOnly')}</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer text-xs text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white">
              <input
                type="checkbox"
                checked={specialNeedsOnly}
                onChange={(e) => setSpecialNeedsOnly(e.target.checked)}
                className="w-4 h-4 rounded text-[#d46b28] focus:ring-[#d46b28] border-stone-300"
              />
              <span>{t('pets.specialNeedsOnly')}</span>
            </label>
          </div>

        </aside>

        {/* RESULTS SECTION */}
        <div className="lg:col-span-9 space-y-6">
          
          {/* Active stats & sorting bar */}
          <div className="bg-white dark:bg-stone-900 p-4 rounded-2xl border border-stone-200/80 dark:border-stone-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="text-xs text-stone-600 dark:text-stone-400">
              {language === 'vi' ? 'Hiển thị' : 'Showing'} <span className="font-bold text-stone-900 dark:text-stone-100">{filteredPets.length}</span> {t('pets.resultsCount')}
              {isFiltered && <span className="text-emerald-700 dark:text-emerald-400 font-semibold ml-1">({language === 'vi' ? 'đã áp dụng lọc' : 'filtered'})</span>}
            </div>

            <div className="flex items-center gap-2 self-end sm:self-auto">
              <span className="text-xs text-stone-500 dark:text-stone-400 font-medium">{language === 'vi' ? 'Sắp xếp:' : 'Sort by:'}</span>
              <select
                value={sortBy}
                onChange={(e: any) => setSortBy(e.target.value)}
                className="px-3 py-1.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-xs font-bold text-stone-800 dark:text-stone-200 focus:ring-2 focus:ring-[#d46b28] focus:outline-none"
              >
                <option value="NEWEST">{t('pets.sortNewest')}</option>
                <option value="OLDEST">{t('pets.sortOldest')}</option>
                <option value="NAME">{t('pets.sortName')}</option>
              </select>
            </div>
          </div>

          {/* Pets Grid */}
          {filteredPets.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPets.map(pet => (
                <PetCard
                  key={pet.id}
                  pet={pet}
                  onViewDetail={(id) => navigate(`/pets/${id}`)}
                  onApplyAdopt={(p) => setSelectedPetForAdoption(p)}
                />
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="bg-white dark:bg-stone-900 p-12 rounded-3xl border border-dashed border-stone-300 dark:border-stone-800 text-center space-y-4">
              <div className="space-y-1 max-w-sm mx-auto">
                <h3 className="font-bold text-stone-900 dark:text-stone-100 text-base">{t('pets.noPetsFound')}</h3>
                <p className="text-xs text-stone-500 dark:text-stone-400">
                  {language === 'vi' 
                    ? 'Hãy thử điều chỉnh lại bộ lọc loài, khu vực hoặc tìm kiếm với từ khóa tổng quát hơn.' 
                    : 'Try adjusting species, location filters or search with general keywords.'}
                </p>
              </div>
              <button
                onClick={resetFilters}
                className="px-5 py-2.5 rounded-xl bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-xs font-bold hover:bg-black transition cursor-pointer"
              >
                {t('pets.resetFilters')}
              </button>
            </div>
          )}

        </div>

      </div>

      {/* ADOPTION WIZARD MODAL */}
      {selectedPetForAdoption && (
        <AdoptionWizardModal
          pet={selectedPetForAdoption}
          isOpen={true}
          onClose={() => setSelectedPetForAdoption(null)}
          onSuccessNavigate={(appId) => {
            setSelectedPetForAdoption(null);
            navigate('/applications');
          }}
        />
      )}

      {/* MOBILE FILTER DRAWER */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-stone-900 w-full max-w-lg max-h-[85vh] rounded-t-3xl sm:rounded-3xl p-6 overflow-y-auto space-y-6 text-left border border-stone-200 dark:border-stone-800">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200 dark:border-stone-800">
              <h3 className="font-bold text-stone-900 dark:text-stone-100 text-base">{t('common.filter')}</h3>
              <button onClick={() => setMobileFilterOpen(false)} className="p-1.5 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile filters content */}
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-stone-800 dark:text-stone-200 block mb-1">{t('pets.filterSpecies')}</label>
                <div className="grid grid-cols-3 gap-2">
                  {['ALL', 'DOG', 'CAT'].map(s => (
                    <button
                      key={s}
                      onClick={() => setSpeciesFilter(s)}
                      className={`py-2 rounded-xl text-xs font-bold cursor-pointer ${
                        speciesFilter === s ? 'bg-[#d46b28] text-white' : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300'
                      }`}
                    >
                      {s === 'ALL' ? t('common.all') : s === 'DOG' ? t('common.dog') : t('common.cat')}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-stone-800 dark:text-stone-200 block mb-1">{t('pets.filterLocation')}</label>
                <select
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-xs"
                >
                  <option value="ALL">{t('rescue.locationAll')}</option>
                  <option value="Hồ Chí Minh">{translateCity('TP. Hồ Chí Minh', language)}</option>
                  <option value="Hà Nội">{translateCity('Hà Nội', language)}</option>
                  <option value="Đà Nẵng">{translateCity('Đà Nẵng', language)}</option>
                </select>
              </div>
            </div>

            <div className="pt-4 border-t border-stone-200 dark:border-stone-800 flex gap-2">
              <button
                onClick={resetFilters}
                className="flex-1 py-3 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 font-bold text-xs cursor-pointer"
              >
                {t('common.reset')}
              </button>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="flex-1 py-3 rounded-xl bg-[#d46b28] text-white font-bold text-xs cursor-pointer"
              >
                {t('common.continue')}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
