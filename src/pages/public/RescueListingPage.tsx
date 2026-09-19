import React, { useState, useMemo } from 'react';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { RescueCard } from '../../components/user/RescueCard';
import { RescueCenterCard } from '../../components/rescue/RescueCenterCard';
import { RescueCenterDetailModal } from '../../components/rescue/RescueCenterDetailModal';
import { FoodFundDonationSection } from '../../components/common/FoodFundDonationSection';
import { EmergencyRescueBanner } from '../../components/rescue/EmergencyRescueBanner';
import { EmergencyShelterModal } from '../../components/rescue/EmergencyShelterModal';
import { ReportStreetRescueModal } from '../../components/rescue/ReportStreetRescueModal';
import { mockEmergencyShelters } from '../../data/mockEmergencyShelters';
import { EmergencyShelter, RescueCenterType, RescueCenterStatus, SupportedAnimal } from '../../types/shelter';
import { RescuePost } from '../../types/rescue';
import { translateCity, translateDistrict } from '../../utils/addressTranslator';
import { 
  Search, 
  Send, 
  CheckCircle2, 
  Building2, 
  Flame, 
  Filter, 
  SlidersHorizontal,
  X,
  Phone,
  MapPin,
  HeartHandshake
} from 'lucide-react';

interface RescueListingPageProps {
  navigate: (path: string) => void;
}

export const RescueListingPage: React.FC<RescueListingPageProps> = ({ navigate }) => {
  const { rescuePosts, supportRescuePost } = useData();
  const { role, currentUser } = useAuth();
  const { t, language } = useLanguage();
  const isEn = language === 'en';

  // Primary Tab: 'CENTERS' (Đơn vị & Trạm cứu hộ) vs 'POSTS' (Các ca cần tiếp sức)
  const [activeTab, setActiveTab] = useState<'CENTERS' | 'POSTS'>('CENTERS');

  // Centers Filters
  const [centerSearchQuery, setCenterSearchQuery] = useState('');
  const [centerCityFilter, setCenterCityFilter] = useState('ALL');
  const [centerTypeFilter, setCenterTypeFilter] = useState<string>('ALL');
  const [centerStatusFilter, setCenterStatusFilter] = useState<string>('ALL');
  const [centerAnimalFilter, setCenterAnimalFilter] = useState<string>('ALL');

  // Selected center for detail modal
  const [selectedCenterForDetail, setSelectedCenterForDetail] = useState<EmergencyShelter | null>(null);

  // Posts Filters
  const [postSearchQuery, setPostSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');
  const [priorityFilter, setPriorityFilter] = useState<string>('ALL');
  const [postLocationFilter, setPostLocationFilter] = useState<string>('ALL');

  const [selectedRescueForSupport, setSelectedRescueForSupport] = useState<RescuePost | null>(null);
  const [supportMessage, setSupportMessage] = useState('');
  const [supportSuccess, setSupportSuccess] = useState(false);

  // Emergency rescue modals
  const [shelterModalOpen, setShelterModalOpen] = useState(false);
  const [reportStreetModalOpen, setReportStreetModalOpen] = useState(false);

  // Filtered Rescue Centers
  const filteredCenters = useMemo(() => {
    return mockEmergencyShelters.filter(center => {
      // City filter
      if (centerCityFilter !== 'ALL' && center.city !== centerCityFilter) return false;

      // Type filter
      if (centerTypeFilter !== 'ALL') {
        if (center.type !== centerTypeFilter && center.shelterType !== centerTypeFilter) return false;
      }

      // Status filter
      if (centerStatusFilter !== 'ALL' && center.status !== centerStatusFilter) return false;

      // Animal filter
      if (centerAnimalFilter !== 'ALL') {
        if (!center.supportedAnimals.includes(centerAnimalFilter as SupportedAnimal)) return false;
      }

      // Keyword search
      if (centerSearchQuery.trim()) {
        const q = centerSearchQuery.toLowerCase();
        const matchName = center.name.toLowerCase().includes(q) || (center.nameEn || '').toLowerCase().includes(q);
        const matchDistrict = center.district.toLowerCase().includes(q);
        const matchAddress = center.address.toLowerCase().includes(q);
        const matchPhone = center.phone.includes(q);
        const matchServices = center.services.some(s => s.toLowerCase().includes(q));
        if (!matchName && !matchDistrict && !matchAddress && !matchPhone && !matchServices) return false;
      }

      return true;
    });
  }, [centerCityFilter, centerTypeFilter, centerStatusFilter, centerAnimalFilter, centerSearchQuery]);

  // Filtered Rescue Posts
  const filteredPosts = useMemo(() => {
    return rescuePosts.filter(post => {
      if (post.status !== 'APPROVED') return false;

      if (postSearchQuery.trim()) {
        const q = postSearchQuery.toLowerCase();
        const matchTitle = post.title.toLowerCase().includes(q);
        const matchDesc = post.description.toLowerCase().includes(q);
        const matchLoc = post.supportLocation.toLowerCase().includes(q);
        const matchShelter = (post.shelterName || '').toLowerCase().includes(q);
        if (!matchTitle && !matchDesc && !matchLoc && !matchShelter) return false;
      }

      if (categoryFilter !== 'ALL' && post.category !== categoryFilter) return false;
      if (priorityFilter !== 'ALL' && post.priority !== priorityFilter) return false;
      if (postLocationFilter !== 'ALL' && !post.supportLocation.toLowerCase().includes(postLocationFilter.toLowerCase())) return false;

      return true;
    }).sort((a, b) => {
      const priorityOrder = { URGENT: 4, HIGH: 3, MEDIUM: 2, LOW: 1 };
      const diff = priorityOrder[b.priority] - priorityOrder[a.priority];
      if (diff !== 0) return diff;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [rescuePosts, postSearchQuery, categoryFilter, priorityFilter, postLocationFilter]);

  const handleSupportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRescueForSupport) return;
    supportRescuePost(selectedRescueForSupport.id);
    setSupportSuccess(true);
    setTimeout(() => {
      setSupportSuccess(false);
      setSelectedRescueForSupport(null);
      setSupportMessage('');
    }, 1800);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 text-left">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-stone-200 dark:border-stone-800 pb-6">
        <div>
          <div className="text-[#d46b28] dark:text-amber-400 text-[11px] font-bold uppercase tracking-wider mb-1">
            {t('rescue.tag')}
          </div>
          <h1 className="text-3xl font-black text-[#2b2523] dark:text-stone-100 font-display">
            {t('rescue.title')}
          </h1>
          <p className="text-xs sm:text-sm text-[#665851] dark:text-stone-300 mt-1">
            {t('rescue.desc')}
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={() => setShelterModalOpen(true)}
            className="px-4 py-2.5 rounded-2xl bg-rose-50 dark:bg-rose-950/60 hover:bg-rose-100 dark:hover:bg-rose-900/60 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800 font-bold text-xs shadow-xs transition flex items-center gap-1.5 cursor-pointer"
          >
            <span className="w-2 h-2 rounded-full bg-rose-600 animate-pulse" />
            <span>{isEn ? 'Emergency Hotline 24/7' : 'Tra cứu Hotline 24/7'}</span>
          </button>

          <button
            onClick={() => {
              if (role === 'GUEST') {
                navigate('/login');
              } else {
                navigate('/my-rescue-posts');
              }
            }}
            className="px-5 py-2.5 rounded-2xl bg-[#d46b28] hover:bg-[#ba591a] text-white font-bold text-xs shadow-sm transition cursor-pointer"
          >
            {t('rescue.postRescueBtn')}
          </button>
        </div>
      </div>

      {/* TOP EMERGENCY RESCUE BANNER & 24/7 HOTLINES */}
      <EmergencyRescueBanner
        onOpenDirectory={() => setShelterModalOpen(true)}
        onReportStreetRescue={() => setReportStreetModalOpen(true)}
      />

      {/* FOOD FUND & ESSENTIAL SUPPLIES SECTION */}
      <FoodFundDonationSection />

      {/* MAIN CONTENT TABS SWITCHER: 1. RESCUE CENTERS DIRECTORY | 2. URGENT COMMUNITY POSTS */}
      <div className="space-y-6">
        
        {/* Navigation Tabs */}
        <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-2">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('CENTERS')}
              className={`px-4 py-2.5 rounded-2xl font-bold text-xs sm:text-sm transition flex items-center gap-2 cursor-pointer ${
                activeTab === 'CENTERS'
                  ? 'bg-[#2b2523] dark:bg-stone-100 text-white dark:text-stone-900 shadow-sm'
                  : 'bg-white dark:bg-stone-900 hover:bg-[#fde2cd] dark:hover:bg-stone-800 text-[#5c4d46] dark:text-stone-300 border border-[#efe2d3] dark:border-stone-800'
              }`}
            >
              <Building2 className="w-4 h-4 text-[#d46b28]" />
              <span>{isEn ? 'Rescue & Support Centers' : 'Đơn vị & Trạm Cứu Hộ'}</span>
              <span className={`px-2 py-0.2 rounded-full text-[10px] font-bold ${
                activeTab === 'CENTERS' ? 'bg-[#d46b28] text-white' : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300'
              }`}>
                {filteredCenters.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('POSTS')}
              className={`px-4 py-2.5 rounded-2xl font-bold text-xs sm:text-sm transition flex items-center gap-2 cursor-pointer ${
                activeTab === 'POSTS'
                  ? 'bg-[#2b2523] dark:bg-stone-100 text-white dark:text-stone-900 shadow-sm'
                  : 'bg-white dark:bg-stone-900 hover:bg-[#fde2cd] dark:hover:bg-stone-800 text-[#5c4d46] dark:text-stone-300 border border-[#efe2d3] dark:border-stone-800'
              }`}
            >
              <Flame className="w-4 h-4 text-rose-500" />
              <span>{isEn ? 'Urgent Rescue Cases' : 'Các ca cần tiếp sức & Viện phí'}</span>
              <span className={`px-2 py-0.2 rounded-full text-[10px] font-bold ${
                activeTab === 'POSTS' ? 'bg-rose-600 text-white' : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300'
              }`}>
                {filteredPosts.length}
              </span>
            </button>
          </div>
        </div>

        {/* TAB 1: RESCUE & SUPPORT CENTERS */}
        {activeTab === 'CENTERS' && (
          <div className="space-y-6">
            
            {/* Filter Bar for Centers */}
            <div className="bg-white dark:bg-stone-900 p-4 sm:p-5 rounded-3xl border border-stone-200/90 dark:border-stone-800 shadow-xs space-y-4">
              
              {/* Search input */}
              <div className="relative">
                <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={centerSearchQuery}
                  onChange={(e) => setCenterSearchQuery(e.target.value)}
                  placeholder={isEn ? 'Search center by name, address, district, phone or services...' : 'Tìm theo tên đơn vị, địa chỉ, quận, số điện thoại hoặc dịch vụ...'}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-950 text-stone-900 dark:text-stone-100 text-xs focus:ring-2 focus:ring-[#d46b28] focus:outline-none"
                />
              </div>

              {/* Filters row: City, Type, Status, Supported Animal */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                
                {/* City Filter */}
                <div>
                  <label className="text-[11px] font-bold text-stone-600 dark:text-stone-400 block mb-1">
                    {isEn ? 'City / Province' : 'Tỉnh / Thành phố'}
                  </label>
                  <select
                    value={centerCityFilter}
                    onChange={(e) => setCenterCityFilter(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-xs font-medium focus:ring-2 focus:ring-[#d46b28]"
                  >
                    <option value="ALL">{isEn ? 'All Cities' : 'Tất cả Tỉnh/Thành'}</option>
                    <option value="TP. Hồ Chí Minh">{translateCity('TP. Hồ Chí Minh', language)}</option>
                    <option value="Hà Nội">{translateCity('Hà Nội', language)}</option>
                    <option value="Đà Nẵng">{translateCity('Đà Nẵng', language)}</option>
                    <option value="Cần Thơ">{translateCity('Cần Thơ', language)}</option>
                    <option value="Bình Dương">{translateCity('Bình Dương', language)}</option>
                  </select>
                </div>

                {/* Organization Type Filter */}
                <div>
                  <label className="text-[11px] font-bold text-stone-600 dark:text-stone-400 block mb-1">
                    {isEn ? 'Organization Type' : 'Loại hình đơn vị'}
                  </label>
                  <select
                    value={centerTypeFilter}
                    onChange={(e) => setCenterTypeFilter(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-xs font-medium focus:ring-2 focus:ring-[#d46b28]"
                  >
                    <option value="ALL">{isEn ? 'All Types' : 'Tất cả loại hình'}</option>
                    <option value="SHELTER">{isEn ? 'Rescue Shelter' : 'Trạm cứu trợ'}</option>
                    <option value="RESCUE_TEAM">{isEn ? 'Animal Rescue Team' : 'Cứu hộ động vật'}</option>
                    <option value="VET_CLINIC">{isEn ? 'Partner Vet Clinic' : 'Phòng khám hỗ trợ'}</option>
                    <option value="WELFARE_ORG">{isEn ? 'Animal Welfare Org' : 'Tổ chức bảo vệ động vật'}</option>
                  </select>
                </div>

                {/* Status Filter */}
                <div>
                  <label className="text-[11px] font-bold text-stone-600 dark:text-stone-400 block mb-1">
                    {isEn ? 'Operational Status' : 'Trạng thái hoạt động'}
                  </label>
                  <select
                    value={centerStatusFilter}
                    onChange={(e) => setCenterStatusFilter(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-xs font-medium focus:ring-2 focus:ring-[#d46b28]"
                  >
                    <option value="ALL">{isEn ? 'All Statuses' : 'Tất cả trạng thái'}</option>
                    <option value="ACTIVE">{isEn ? '🟢 Active / Open' : '🟢 Đang hoạt động'}</option>
                    <option value="BUSY">{isEn ? '🟠 Busy / High Load' : '🟠 Đang bận'}</option>
                    <option value="CLOSED">{isEn ? '🔴 Temporarily Closed' : '🔴 Tạm đóng'}</option>
                  </select>
                </div>

                {/* Animal Filter */}
                <div>
                  <label className="text-[11px] font-bold text-stone-600 dark:text-stone-400 block mb-1">
                    {isEn ? 'Supported Animal' : 'Động vật hỗ trợ'}
                  </label>
                  <select
                    value={centerAnimalFilter}
                    onChange={(e) => setCenterAnimalFilter(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-xs font-medium focus:ring-2 focus:ring-[#d46b28]"
                  >
                    <option value="ALL">{isEn ? 'All Animals' : 'Tất cả loài'}</option>
                    <option value="DOG">🐕 {isEn ? 'Dogs' : 'Chó'}</option>
                    <option value="CAT">🐈 {isEn ? 'Cats' : 'Mèo'}</option>
                    <option value="RABBIT">🐇 {isEn ? 'Rabbits' : 'Thỏ'}</option>
                    <option value="BIRD">🐦 {isEn ? 'Birds' : 'Chim'}</option>
                    <option value="TURTLE">🐢 {isEn ? 'Turtles' : 'Rùa'}</option>
                    <option value="WILDLIFE">🦔 {isEn ? 'Wildlife' : 'Động vật hoang dã'}</option>
                  </select>
                </div>

              </div>

            </div>

            {/* Grid of Rescue Centers */}
            {filteredCenters.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCenters.map(center => (
                  <RescueCenterCard
                    key={center.id}
                    center={center}
                    onViewDetail={(c) => setSelectedCenterForDetail(c)}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white dark:bg-stone-900 p-12 rounded-3xl border border-dashed border-stone-300 dark:border-stone-800 text-center space-y-4">
                <div className="space-y-1 max-w-sm mx-auto">
                  <h3 className="font-bold text-stone-900 dark:text-stone-100 text-base">
                    {isEn ? 'No rescue centers found' : 'Không tìm thấy đơn vị cứu hộ phù hợp'}
                  </h3>
                  <p className="text-xs text-stone-500 dark:text-stone-400">
                    {isEn 
                      ? 'Try clearing or changing your city, status, or organization type filters.' 
                      : 'Hãy thử xóa hoặc điều chỉnh bộ lọc Tỉnh/Thành, trạng thái hoặc từ khóa tìm kiếm.'}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setCenterSearchQuery('');
                    setCenterCityFilter('ALL');
                    setCenterTypeFilter('ALL');
                    setCenterStatusFilter('ALL');
                    setCenterAnimalFilter('ALL');
                  }}
                  className="px-5 py-2.5 rounded-xl bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-xs font-bold hover:bg-black transition cursor-pointer"
                >
                  {isEn ? 'Reset Filters' : 'Đặt lại bộ lọc'}
                </button>
              </div>
            )}

          </div>
        )}

        {/* TAB 2: URGENT COMMUNITY POSTS & HOSPITAL BILLS */}
        {activeTab === 'POSTS' && (
          <div className="space-y-6">
            
            {/* Filter Bar for Posts */}
            <div className="bg-white dark:bg-stone-900 p-4 rounded-3xl border border-stone-200/80 dark:border-stone-800 shadow-xs space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                
                <div className="relative">
                  <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={postSearchQuery}
                    onChange={(e) => setPostSearchQuery(e.target.value)}
                    placeholder={t('rescue.searchPlaceholder')}
                    className="w-full pl-9 pr-3 py-2 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-950 text-stone-900 dark:text-stone-100 text-xs focus:ring-2 focus:ring-stone-800 focus:outline-none"
                  />
                </div>

                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="px-3 py-2 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-xs font-medium focus:ring-2 focus:ring-stone-800"
                >
                  <option value="ALL">{t('rescue.categoryAll')}</option>
                  <option value="FOOD">{t('rescue.catFood')}</option>
                  <option value="SHELTER_SUPPORT">{t('rescue.catShelter')}</option>
                  <option value="PET_CARE">{t('rescue.catFoster')}</option>
                  <option value="MEDICINE">{t('rescue.catMedicine')}</option>
                  <option value="SUPPLIES">{t('rescue.catSupplies')}</option>
                </select>

                <select
                  value={priorityFilter}
                  onChange={(e) => setPriorityFilter(e.target.value)}
                  className="px-3 py-2 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-xs font-medium focus:ring-2 focus:ring-stone-800"
                >
                  <option value="ALL">{t('rescue.priorityAll')}</option>
                  <option value="URGENT">{t('rescue.priorityUrgent')}</option>
                  <option value="HIGH">{t('rescue.priorityHigh')}</option>
                  <option value="MEDIUM">{t('rescue.priorityMedium')}</option>
                </select>

                <select
                  value={postLocationFilter}
                  onChange={(e) => setPostLocationFilter(e.target.value)}
                  className="px-3 py-2 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-xs font-medium focus:ring-2 focus:ring-stone-800"
                >
                  <option value="ALL">{t('rescue.locationAll')}</option>
                  <option value="Hồ Chí Minh">{translateCity('TP. Hồ Chí Minh', language)}</option>
                  <option value="Hà Nội">{translateCity('Hà Nội', language)}</option>
                  <option value="Đà Nẵng">{translateCity('Đà Nẵng', language)}</option>
                  <option value="Bình Thạnh">{translateDistrict('Quận Bình Thạnh', language)}</option>
                  <option value="Quận 7">{translateDistrict('Quận 7', language)}</option>
                </select>

              </div>
            </div>

            {/* Grid of Rescue Posts */}
            {filteredPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPosts.map(post => (
                  <RescueCard
                    key={post.id}
                    post={post}
                    onViewDetail={(id) => navigate(`/rescue/${id}`)}
                    onSupport={(p) => setSelectedRescueForSupport(p)}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white dark:bg-stone-900 p-12 rounded-3xl border border-dashed border-stone-300 dark:border-stone-800 text-center space-y-4">
                <div className="space-y-1 max-w-sm mx-auto">
                  <h3 className="font-bold text-stone-900 dark:text-stone-100 text-base">{t('rescue.noRescueFound')}</h3>
                  <p className="text-xs text-stone-500 dark:text-stone-400">
                    {t('rescue.noRescueFoundSub')}
                  </p>
                </div>
              </div>
            )}

          </div>
        )}

      </div>

      {/* RESCUE CENTER DETAIL MODAL */}
      <RescueCenterDetailModal
        center={selectedCenterForDetail}
        isOpen={!!selectedCenterForDetail}
        onClose={() => setSelectedCenterForDetail(null)}
      />

      {/* EMERGENCY SHELTER DIRECTORY MODAL */}
      <EmergencyShelterModal
        isOpen={shelterModalOpen}
        onClose={() => setShelterModalOpen(false)}
        onReportStreetIncident={() => {
          setShelterModalOpen(false);
          setReportStreetModalOpen(true);
        }}
      />

      {/* REPORT STREET RESCUE (SOS) MODAL */}
      <ReportStreetRescueModal
        isOpen={reportStreetModalOpen}
        onClose={() => setReportStreetModalOpen(false)}
        onOpenDirectory={() => {
          setReportStreetModalOpen(false);
          setShelterModalOpen(true);
        }}
        onSuccessNavigate={(id) => {
          setReportStreetModalOpen(false);
          navigate(`/rescue/${id}`);
        }}
      />

      {/* SUPPORT RESCUE CASE MODAL */}
      {selectedRescueForSupport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in text-left">
          <div className="bg-white dark:bg-stone-900 rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-5 border border-stone-200 dark:border-stone-800">
            
            <div className="flex items-center justify-between pb-3 border-b border-stone-100 dark:border-stone-800">
              <h3 className="font-bold text-stone-900 dark:text-stone-100 text-base">{t('rescue.supportPostBtn')}</h3>
              <button onClick={() => setSelectedRescueForSupport(null)} className="text-stone-400 hover:text-stone-700 dark:hover:text-stone-200">✕</button>
            </div>

            {supportSuccess ? (
              <div className="p-6 text-center space-y-3 bg-stone-50 dark:bg-stone-950 rounded-2xl border border-stone-200 dark:border-stone-800">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 dark:text-emerald-400 mx-auto" />
                <h4 className="font-bold text-stone-900 dark:text-stone-100 text-base">{t('rescue.supportRecorded')}</h4>
                <p className="text-xs text-stone-600 dark:text-stone-400">{t('rescue.supportRecordedSub')}</p>
              </div>
            ) : (
              <form onSubmit={handleSupportSubmit} className="space-y-4">
                <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-900/40 text-xs text-amber-950 dark:text-amber-200 space-y-1">
                  <span className="font-bold block">{selectedRescueForSupport.title}</span>
                  <p className="text-stone-600 dark:text-stone-400">{t('rescue.needed')}: <b>{selectedRescueForSupport.quantityNeeded}</b></p>
                  <p className="text-stone-600 dark:text-stone-400">{t('rescue.shelterStation')}: <b>{selectedRescueForSupport.shelterName} ({selectedRescueForSupport.shelterHotline})</b></p>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300">{t('rescue.supportTypeLabel')}</label>
                  <textarea
                    rows={3}
                    required
                    value={supportMessage}
                    onChange={(e) => setSupportMessage(e.target.value)}
                    placeholder={t('rescue.supportMsgPlaceholder')}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-950 text-stone-900 dark:text-stone-100 text-xs focus:ring-2 focus:ring-[#d46b28] focus:outline-none"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-stone-100 dark:border-stone-800">
                  <button
                    type="button"
                    onClick={() => setSelectedRescueForSupport(null)}
                    className="px-4 py-2 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 text-xs font-bold transition"
                  >
                    {t('common.cancel')}
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-[#d46b28] hover:bg-[#ba591a] text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{t('rescue.sendSupportBtn')}</span>
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
};
