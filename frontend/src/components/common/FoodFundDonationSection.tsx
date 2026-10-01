import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { useLanguage } from '../../context/LanguageContext';
import { mockEmergencyShelters } from '../../data/mockEmergencyShelters';
import { EmergencyShelter, ShelterSupplyCategory, ShelterSupplyItem } from '../../types/shelter';
import { FoodDonationModal } from './FoodDonationModal';
import { translateAddress, translateCity, translateShelterName } from '../../utils/addressTranslator';
import { 
  Heart, 
  ChevronRight, 
  ChevronDown, 
  MapPin, 
  Phone, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle, 
  Package, 
  Truck, 
  Clock, 
  Sparkles,
  ExternalLink,
  Building2
} from 'lucide-react';

interface FoodFundDonationSectionProps {
  onViewAllRescue?: () => void;
}

export const FoodFundDonationSection: React.FC<FoodFundDonationSectionProps> = ({ onViewAllRescue }) => {
  const { t, language } = useLanguage();
  const isEn = language === 'en';

  const [selectedShelterId, setSelectedShelterId] = useState<string>(mockEmergencyShelters[0].id);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [isPledgeModalOpen, setIsPledgeModalOpen] = useState(false);
  const [selectedItemForPledge, setSelectedItemForPledge] = useState<ShelterSupplyItem | null>(null);

  const activeShelter = mockEmergencyShelters.find(s => s.id === selectedShelterId) || mockEmergencyShelters[0];
  const categories = activeShelter.neededSupplies || [];

  const displayName = isEn ? (activeShelter.nameEn || translateShelterName(activeShelter.name, 'en')) : activeShelter.name;
  const displayAddress = translateAddress(activeShelter.address, language);

  const getCategoryStyles = (category: string) => {
    switch (category) {
      case 'FOOD':
        return {
          icon: '🍲',
          badgeColor: 'bg-amber-100 dark:bg-amber-950/60 text-[#9c3810] dark:text-amber-300 border-amber-200 dark:border-amber-800',
          bg: 'bg-[#fff8f0] dark:bg-[#251710]/80 hover:bg-[#fff2e2] dark:hover:bg-[#301c13] border-[#fcd9bd] dark:border-[#522915]',
          textColor: 'text-[#9c3810] dark:text-amber-400',
          accent: 'from-[#d46b28] to-[#ea580c]'
        };
      case 'MEDICAL':
        return {
          icon: '🩹',
          badgeColor: 'bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 border-rose-200 dark:border-rose-800',
          bg: 'bg-[#fff1f2] dark:bg-[#281117]/80 hover:bg-[#ffe4e6] dark:hover:bg-[#34151e] border-[#fecdd3] dark:border-[#5c1c2b]',
          textColor: 'text-rose-800 dark:text-rose-300',
          accent: 'from-rose-600 to-rose-700'
        };
      case 'HYGIENE':
        return {
          icon: '🧴',
          badgeColor: 'bg-sky-100 dark:bg-sky-950/60 text-sky-800 dark:text-sky-300 border-sky-200 dark:border-sky-800',
          bg: 'bg-[#f0f9ff] dark:bg-[#0c1f30]/80 hover:bg-[#e0f2fe] dark:hover:bg-[#112940] border-[#bae6fd] dark:border-[#1e4468]',
          textColor: 'text-sky-800 dark:text-sky-300',
          accent: 'from-sky-600 to-sky-700'
        };
      case 'OTHER':
      default:
        return {
          icon: '🛏️',
          badgeColor: 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
          bg: 'bg-[#f0fdf4] dark:bg-[#0d2417]/80 hover:bg-[#dcfce7] dark:hover:bg-[#133220] border-[#bbf7d0] dark:border-[#1f5638]',
          textColor: 'text-emerald-800 dark:text-emerald-300',
          accent: 'from-emerald-600 to-emerald-700'
        };
    }
  };

  const handleOpenPledge = (item?: ShelterSupplyItem) => {
    setSelectedItemForPledge(item || null);
    setIsPledgeModalOpen(true);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200/90 dark:border-stone-800 shadow-sm overflow-hidden text-left transition-colors">
        
        {/* 1. TOP HEADER & SHELTER SELECTOR */}
        <div className="p-6 sm:p-8 bg-[#faf4ee] dark:bg-stone-950 border-b border-[#efe2d3] dark:border-stone-800 space-y-6">
          
          {/* Main Title Matching User Image */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1.5 max-w-3xl">
              <div className="flex items-center gap-2.5">
                <span className="text-2xl animate-pulse">❤️</span>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-black font-display text-[#2b2523] dark:text-stone-100 tracking-tight">
                  {isEn ? 'Shelter Needs & Supplies in Demand' : 'Những nhu cầu đang cần hỗ trợ'}
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-[#665851] dark:text-stone-300 leading-relaxed font-normal">
                {isEn 
                  ? 'List of essential supplies, food (with estimated kg) and medical items currently needed. Please contact the shelter directly or pledge below.' 
                  : 'Danh sách các nhóm nhu yếu phẩm và vật tư y tế mà trạm đang cần. Vui lòng liên hệ trực tiếp với trạm để quyên góp.'}
              </p>
            </div>

            {/* Quick Action Button */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => handleOpenPledge()}
                className="px-5 py-3 rounded-2xl bg-[#d46b28] hover:bg-[#ba591a] text-white font-bold text-xs shadow-xs transition flex items-center gap-2 cursor-pointer"
              >
                <Package className="w-4 h-4" />
                <span>{isEn ? 'Pledge Supplies to Shelter' : 'Đăng ký gửi nhu yếu phẩm'}</span>
              </button>
            </div>
          </div>

          {/* SHELTER SELECTOR TABS */}
          <div className="space-y-2 pt-2 border-t border-[#efe2d3] dark:border-stone-800">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-[#78665e] dark:text-stone-400 uppercase tracking-wider block">
                {isEn ? 'Select a Shelter to View Specific Needs:' : 'Chọn trạm cứu hộ để xem nhu cầu cụ thể:'}
              </span>
              <span className="text-[11px] text-[#d46b28] font-bold">
                {activeShelter.city}
              </span>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {mockEmergencyShelters.map(shelter => {
                const isSelected = shelter.id === selectedShelterId;
                const shelterDisplayName = isEn ? (shelter.nameEn || shelter.name) : shelter.name;
                return (
                  <button
                    key={shelter.id}
                    type="button"
                    onClick={() => setSelectedShelterId(shelter.id)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap flex items-center gap-2 shrink-0 cursor-pointer ${
                      isSelected
                        ? 'bg-[#d46b28] text-white shadow-xs'
                        : 'bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-[#fde2cd] dark:hover:bg-stone-700 border border-stone-200 dark:border-stone-700'
                    }`}
                  >
                    <Building2 className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-[#d46b28]'}`} />
                    <span className="truncate max-w-[200px]">{shelterDisplayName}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Shelter Mini Contact Strip */}
          <div className="p-3.5 rounded-2xl bg-white dark:bg-stone-900 border border-[#efe2d3] dark:border-stone-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-[#faf4ee] dark:bg-stone-800 border border-[#efe2d3] dark:border-stone-700 overflow-hidden shrink-0 flex items-center justify-center">
                {activeShelter.avatarUrl ? (
                  <img src={activeShelter.avatarUrl} alt="" className="w-full h-full object-cover" />
                ) : (
                  <Building2 className="w-5 h-5 text-[#d46b28]" />
                )}
              </div>
              <div className="min-w-0">
                <h4 className="font-bold text-stone-900 dark:text-stone-100 truncate">{displayName}</h4>
                <p className="text-[11px] text-stone-600 dark:text-stone-300 flex items-center gap-1.5 truncate mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-[#d46b28] shrink-0" />
                  <span className="truncate">{displayAddress}</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
              <a
                href={`tel:${activeShelter.phone.replace(/\s+/g, '')}`}
                className="px-3.5 py-1.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 dark:hover:bg-rose-900/40 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Hotline: <b>{activeShelter.phone}</b></span>
              </a>

              {activeShelter.googleMapsUrl && (
                <a
                  href={activeShelter.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 font-bold text-xs transition flex items-center gap-1"
                >
                  <span>{isEn ? 'Map' : 'Bản đồ'}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>

        </div>

        {/* 2. THE 4 NEED CATEGORY CARDS (MATCHING REFERENCE IMAGE) */}
        <div className="p-6 sm:p-8 space-y-4">
          <div className="space-y-3">
            {categories.map(cat => {
              const styles = getCategoryStyles(cat.category);
              const isExpanded = expandedCategory === cat.category;
              const catTitle = isEn ? cat.titleEn : cat.title;
              const catSummary = isEn ? cat.summaryEn : cat.summary;

              return (
                <div 
                  key={cat.category}
                  className={`rounded-2xl border transition-all duration-200 overflow-hidden ${styles.bg}`}
                >
                  {/* Category Main Row (Clickable) */}
                  <div
                    onClick={() => setExpandedCategory(isExpanded ? null : cat.category)}
                    className="p-4 sm:p-5 flex items-center justify-between gap-4 cursor-pointer select-none group"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      {/* Icon */}
                      <div className="w-11 h-11 rounded-2xl bg-white dark:bg-stone-900 shadow-2xs border border-stone-200/60 dark:border-stone-700 flex items-center justify-center text-xl shrink-0 group-hover:scale-105 transition-transform">
                        {styles.icon}
                      </div>

                      {/* Info & Summary */}
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm sm:text-base font-bold text-stone-900 dark:text-stone-100 group-hover:text-[#d46b28] transition">
                            {catTitle}
                          </h3>
                          <span className="text-xs font-semibold text-stone-500 dark:text-stone-400">
                            ({cat.itemCount} {isEn ? 'items' : 'nhu cầu'})
                          </span>
                        </div>

                        <p className="text-xs text-stone-600 dark:text-stone-300 mt-0.5 line-clamp-1 leading-relaxed font-normal">
                          {catSummary}
                        </p>
                      </div>
                    </div>

                    {/* Arrow / Chevron */}
                    <div className="shrink-0 flex items-center gap-2">
                      <span className="hidden sm:inline text-[11px] font-bold text-stone-500 dark:text-stone-400 group-hover:text-stone-900 dark:group-hover:text-stone-100">
                        {isExpanded ? (isEn ? 'Collapse' : 'Thu gọn') : (isEn ? 'View Items' : 'Xem chi tiết')}
                      </span>
                      <div className="w-8 h-8 rounded-xl bg-white/80 dark:bg-stone-900/80 border border-stone-200/80 dark:border-stone-700 flex items-center justify-center text-stone-500 dark:text-stone-300 group-hover:text-stone-900 dark:group-hover:text-white transition shadow-2xs">
                        {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                      </div>
                    </div>
                  </div>

                  {/* Expanded Items List */}
                  {isExpanded && (
                    <div className="p-4 sm:p-5 pt-0 space-y-2.5 border-t border-black/5 dark:border-white/5 animate-in fade-in duration-150">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 pt-3">
                        {cat.items.map(item => {
                          const itemName = isEn ? item.nameEn : item.name;
                          const itemQty = isEn ? item.quantityNeededEn : item.quantityNeeded;
                          const itemRcv = isEn ? item.quantityReceivedEn : item.quantityReceived;
                          const itemNotes = isEn ? item.notesEn : item.notes;

                          return (
                            <div
                              key={item.id}
                              className="p-3.5 rounded-xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-700/80 space-y-2 shadow-2xs text-left"
                            >
                              <div className="flex items-start justify-between gap-2">
                                <div>
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <h4 className="font-bold text-stone-900 dark:text-stone-100 text-xs">
                                      {itemName}
                                    </h4>
                                    {item.urgent && (
                                      <span className="px-2 py-0.2 rounded-full bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 text-[10px] font-bold border border-rose-200 dark:border-rose-800">
                                        {isEn ? 'Urgent' : 'Cần gấp'}
                                      </span>
                                    )}
                                  </div>

                                  {itemNotes && (
                                    <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5 leading-snug">
                                      {itemNotes}
                                    </p>
                                  )}
                                </div>
                              </div>

                              <div className="flex items-center justify-between pt-1 border-t border-stone-100 dark:border-stone-800 text-xs">
                                <div className="space-y-0.5">
                                  <div className="font-bold text-[#d46b28] dark:text-amber-400">
                                    {isEn ? 'Need:' : 'Cần:'} {itemQty}
                                  </div>
                                  {itemRcv && (
                                    <div className="text-[10px] text-emerald-700 dark:text-emerald-400 font-medium">
                                      {isEn ? `Received: ${itemRcv}` : `Đã nhận: ${itemRcv}`}
                                    </div>
                                  )}
                                </div>

                                <button
                                  type="button"
                                  onClick={() => handleOpenPledge(item)}
                                  className="px-3 py-1.5 rounded-lg bg-[#d46b28] hover:bg-[#ba591a] text-white font-bold text-[11px] shadow-2xs transition cursor-pointer"
                                >
                                  {isEn ? 'Pledge This' : 'Gửi tặng món này'}
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                </div>
              );
            })}
          </div>

          {/* 3. TRANSPARENCY & DIRECT DELIVERY INSTRUCTIONS */}
          <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-900/40 text-amber-950 dark:text-amber-200 text-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-amber-200/90 dark:bg-amber-900/60 text-amber-900 dark:text-amber-200 flex items-center justify-center shrink-0 mt-0.5 font-bold">
                <Truck className="w-4 h-4" />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-stone-900 dark:text-stone-100 text-xs uppercase tracking-wide">
                  {isEn ? 'Direct Delivery / Shipping to Shelter' : 'Phương thức gửi nhu yếu phẩm đến trạm'}
                </h4>
                <p className="text-stone-700 dark:text-stone-300 leading-relaxed text-[11.5px]">
                  {isEn 
                    ? `You can ship supplies directly via Grab/Viettel Post/Shopee to the shelter address or drop off in person during operating hours. Every kg of kibble and supply item is accounted for with 100% transparency.` 
                    : `Bạn có thể đặt ship thức ăn/vật tư tận nơi qua Grab/Viettel Post/Shopee hoặc trực tiếp mang đến trạm theo địa chỉ bên trên. Mọi phần quà đều được bàn giao công khai và minh bạch 100%.`}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => handleOpenPledge()}
              className="px-5 py-2.5 rounded-xl bg-[#d46b28] hover:bg-[#ba591a] text-white font-bold text-xs shadow-xs transition shrink-0 cursor-pointer"
            >
              {isEn ? 'Pledge Supplies Now →' : 'Đăng ký gửi quà cho trạm →'}
            </button>
          </div>

        </div>

      </div>

      {/* Supply & Food Pledge Modal */}
      <FoodDonationModal
        isOpen={isPledgeModalOpen}
        onClose={() => setIsPledgeModalOpen(false)}
        shelter={activeShelter}
        defaultItem={selectedItemForPledge}
      />
    </section>
  );
};

