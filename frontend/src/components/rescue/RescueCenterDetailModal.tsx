import React, { useState } from 'react';
import { EmergencyShelter, ShelterSupplyItem } from '../../types/shelter';
import { useLanguage } from '../../context/LanguageContext';
import { translateAddress, translateShelterName } from '../../utils/addressTranslator';
import { FoodDonationModal } from '../common/FoodDonationModal';
import { 
  X, 
  Phone, 
  MapPin, 
  Clock, 
  Globe, 
  Mail, 
  ShieldCheck, 
  Navigation, 
  CheckCircle2,
  AlertCircle,
  Building2,
  Package,
  Heart,
  Truck
} from 'lucide-react';

interface RescueCenterDetailModalProps {
  center: EmergencyShelter | null;
  isOpen: boolean;
  onClose: () => void;
}

export const RescueCenterDetailModal: React.FC<RescueCenterDetailModalProps> = ({
  center,
  isOpen,
  onClose
}) => {
  const { language } = useLanguage();
  const isEn = language === 'en';

  const [isPledgeModalOpen, setIsPledgeModalOpen] = useState(false);
  const [selectedSupplyItem, setSelectedSupplyItem] = useState<ShelterSupplyItem | null>(null);

  if (!isOpen || !center) return null;

  const displayName = isEn ? (center.nameEn || translateShelterName(center.name, 'en')) : center.name;
  const displayAddress = translateAddress(center.address, language);
  const displayArea = isEn ? (center.supportedAreaEn || center.supportedArea) : center.supportedArea;
  const displayHours = isEn ? (center.operatingHoursEn || center.operatingHours) : center.operatingHours;
  const displayInstructions = isEn ? (center.instructionsForFinderEn || center.instructionsForFinder) : center.instructionsForFinder;
  const servicesList = (isEn && center.servicesEn && center.servicesEn.length > 0) ? center.servicesEn : center.services;
  const suppliesCategories = center.neededSupplies || [];

  const handleOpenPledge = (item?: ShelterSupplyItem) => {
    setSelectedSupplyItem(item || null);
    setIsPledgeModalOpen(true);
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-sm animate-fade-in text-left">
        <div className="bg-white dark:bg-stone-900 rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-[#efe2d3] dark:border-stone-800 overflow-hidden transition-colors">
          
          {/* Header */}
          <div className="p-5 sm:p-6 bg-[#faf4ee] dark:bg-stone-950 border-b border-[#efe2d3] dark:border-stone-800 flex items-start justify-between gap-4 shrink-0">
            <div className="flex items-center gap-3.5">
              <div className="w-14 h-14 rounded-2xl bg-white dark:bg-stone-900 border border-[#efe2d3] dark:border-stone-700 overflow-hidden shrink-0 shadow-xs flex items-center justify-center">
                {center.avatarUrl ? (
                  <img src={center.avatarUrl} alt={displayName} className="w-full h-full object-cover" />
                ) : (
                  <Building2 className="w-7 h-7 text-[#d46b28]" />
                )}
              </div>
              
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2.5 py-0.5 rounded-md bg-[#fde2cd] dark:bg-amber-950/70 text-[#9c3810] dark:text-amber-300 text-[11px] font-bold">
                    {center.type === 'RESCUE_TEAM' ? (isEn ? 'Animal Rescue Team' : 'Cứu hộ động vật') :
                     center.type === 'VET_CLINIC' ? (isEn ? 'Partner Vet Clinic' : 'Phòng khám hỗ trợ') :
                     center.type === 'WELFARE_ORG' ? (isEn ? 'Animal Welfare Org' : 'Tổ chức bảo vệ động vật') :
                     (isEn ? 'Rescue Shelter' : 'Trạm cứu trợ')}
                  </span>
                  
                  {center.status === 'ACTIVE' && (
                    <span className="px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-[10px] font-bold">
                      {isEn ? '🟢 Active' : '🟢 Đang hoạt động'}
                    </span>
                  )}
                  {center.status === 'BUSY' && (
                    <span className="px-2 py-0.5 rounded-md bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 text-[10px] font-bold">
                      {isEn ? '🟠 Busy' : '🟠 Đang bận'}
                    </span>
                  )}
                  {center.status === 'CLOSED' && (
                    <span className="px-2 py-0.5 rounded-md bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300 text-[10px] font-bold">
                      {isEn ? '🔴 Temporarily Closed' : '🔴 Tạm đóng'}
                    </span>
                  )}
                </div>

                <h2 className="text-lg sm:text-xl font-black text-[#2b2523] dark:text-stone-100 font-display mt-1">
                  {displayName}
                </h2>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl bg-white dark:bg-stone-800 hover:bg-stone-100 dark:hover:bg-stone-700 text-stone-500 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white border border-[#efe2d3] dark:border-stone-700 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Scroll Body */}
          <div className="p-5 sm:p-6 overflow-y-auto space-y-5 text-xs text-[#5c4d46] dark:text-stone-300">
            
            {/* Contact Box: Hotline, Secondary, Email */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-[#fde2cd]/60 to-[#faf4ee] dark:from-stone-850 dark:to-stone-950 border border-[#f0ceb2] dark:border-stone-700 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#9c3810] dark:text-amber-400 tracking-wider block">
                    {isEn ? 'DIRECT EMERGENCY HOTLINE' : 'HOTLINE CỨU HỘ TRỰC TIẾP'}
                  </span>
                  <span className="text-xl font-black text-[#2b2523] dark:text-stone-100 font-display block mt-0.5">
                    {center.phone}
                  </span>
                  {center.secondaryPhone && (
                    <span className="text-xs text-stone-600 dark:text-stone-400 block mt-0.5">
                      {isEn ? 'Alt Phone:' : 'Số phụ:'} <strong>{center.secondaryPhone}</strong>
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={`tel:${center.phone.replace(/\s+/g, '')}`}
                    className="px-5 py-2.5 rounded-xl bg-[#d46b28] hover:bg-[#ba591a] text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition cursor-pointer"
                  >
                    <Phone className="w-4 h-4" />
                    <span>{isEn ? 'Call Now' : 'Gọi hotline'}</span>
                  </a>
                </div>
              </div>

              {center.email && (
                <div className="pt-2 border-t border-[#f0ceb2]/60 dark:border-stone-700 flex items-center gap-2 text-xs">
                  <Mail className="w-3.5 h-3.5 text-[#d46b28] dark:text-amber-400" />
                  <span className="font-semibold">{isEn ? 'Email:' : 'Email liên hệ:'}</span>
                  <a href={`mailto:${center.email}`} className="text-[#d46b28] dark:text-amber-400 hover:underline font-bold">
                    {center.email}
                  </a>
                </div>
              )}
            </div>

            {/* Location & Operating Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 rounded-2xl bg-[#faf8f5] dark:bg-stone-950 border border-[#efe2d3] dark:border-stone-800 space-y-1">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#78665e] dark:text-stone-400 uppercase">
                  <MapPin className="w-3.5 h-3.5 text-[#d46b28] dark:text-amber-400" />
                  <span>{isEn ? 'Exact Address' : 'Địa chỉ tiếp nhận'}</span>
                </div>
                <p className="font-semibold text-[#2b2523] dark:text-stone-100 leading-snug">
                  {displayAddress}
                </p>
                {center.googleMapsUrl && (
                  <a
                    href={center.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-[#d46b28] dark:text-amber-400 hover:underline pt-1"
                  >
                    <Navigation className="w-3 h-3" />
                    <span>{isEn ? 'Open in Google Maps' : 'Xem trên Google Maps'} →</span>
                  </a>
                )}
              </div>

              <div className="p-3.5 rounded-2xl bg-[#faf8f5] dark:bg-stone-950 border border-[#efe2d3] dark:border-stone-800 space-y-1">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#78665e] dark:text-stone-400 uppercase">
                  <Clock className="w-3.5 h-3.5 text-[#d46b28] dark:text-amber-400" />
                  <span>{isEn ? 'Operating Hours' : 'Thời gian trực'}</span>
                </div>
                <p className="font-semibold text-[#2b2523] dark:text-stone-100">
                  {displayHours}
                </p>
                <div className="flex items-center gap-1 text-[11px] text-[#665851] dark:text-stone-400 pt-1">
                  <Globe className="w-3.5 h-3.5 text-stone-400" />
                  <span>{isEn ? 'Area:' : 'Khu vực:'} {displayArea}</span>
                </div>
              </div>
            </div>

            {/* Current Supply & Food Needs Category Cards */}
            {suppliesCategories.length > 0 && (
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-[#2b2523] dark:text-stone-100 text-xs uppercase tracking-wider flex items-center gap-1.5">
                    <Package className="w-4 h-4 text-[#d46b28]" />
                    <span>{isEn ? 'Current Shelter Needs & Supplies' : 'Nhu cầu vật phẩm & thực phẩm đang cần'}</span>
                  </h4>
                  <button
                    type="button"
                    onClick={() => handleOpenPledge()}
                    className="text-[11px] font-bold text-[#d46b28] dark:text-amber-400 hover:underline cursor-pointer"
                  >
                    {isEn ? '+ Pledge Supplies' : '+ Đăng ký gửi tặng'}
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {suppliesCategories.map(cat => (
                    <div 
                      key={cat.category}
                      className="p-3 rounded-xl bg-[#faf4ee] dark:bg-stone-950 border border-[#efe2d3] dark:border-stone-800 space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <div className="font-bold text-stone-900 dark:text-stone-100 text-xs">
                          {isEn ? cat.titleEn : cat.title}
                        </div>
                        <span className="text-[10px] text-stone-500 dark:text-stone-400 font-semibold">
                          {cat.itemCount} {isEn ? 'items' : 'mục'}
                        </span>
                      </div>
                      <p className="text-[11px] text-stone-600 dark:text-stone-400 line-clamp-2">
                        {isEn ? cat.summaryEn : cat.summary}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Services & Capabilities */}
            {servicesList && servicesList.length > 0 && (
              <div className="space-y-2 pt-1">
                <h4 className="font-bold text-[#2b2523] dark:text-stone-100 text-xs uppercase tracking-wider">
                  {isEn ? 'Services & Support Capabilities' : 'Dịch vụ & Năng lực cứu trợ'}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {servicesList.map((service, idx) => (
                    <div key={idx} className="p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800/80 border border-stone-200/80 dark:border-stone-700 flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                      <span className="text-stone-800 dark:text-stone-200 leading-tight font-medium">{service}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Instructions for Finder */}
            {displayInstructions && (
              <div className="p-4 rounded-2xl bg-amber-50/80 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-950 dark:text-amber-200 space-y-1.5">
                <div className="flex items-center gap-2 font-bold text-xs">
                  <AlertCircle className="w-4 h-4 text-amber-700 dark:text-amber-400" />
                  <span>{isEn ? 'Instructions for Finders on the Street' : 'Hướng dẫn cho người phát hiện thú gặp nạn'}</span>
                </div>
                <p className="text-[11px] leading-relaxed text-amber-900 dark:text-amber-300">
                  {displayInstructions}
                </p>
              </div>
            )}

            {/* Non-profit Guarantee */}
            <div className="p-3.5 rounded-2xl bg-[#faf4ee] dark:bg-stone-950 border border-[#efe2d3] dark:border-stone-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span className="text-xs font-bold text-stone-900 dark:text-stone-100">
                  {isEn ? 'Non-Profit & Verified Welfare Partner' : 'Đơn vị xác minh & Cam kết phi lợi nhuận'}
                </span>
              </div>
              <span className="text-[11px] text-[#9c3810] dark:text-amber-300 font-semibold bg-[#fde2cd] dark:bg-amber-950/70 px-2 py-0.5 rounded-md">
                {isEn ? '100% Transparency' : '100% Minh bạch'}
              </span>
            </div>

          </div>

          {/* Footer Actions */}
          <div className="p-4 bg-stone-50 dark:bg-stone-950 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between gap-2 shrink-0">
            <button
              type="button"
              onClick={() => handleOpenPledge()}
              className="px-4 py-2.5 rounded-xl bg-amber-100 dark:bg-amber-950/60 hover:bg-amber-200 dark:hover:bg-amber-900/60 text-[#9c3810] dark:text-amber-300 border border-amber-300 dark:border-amber-800 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
            >
              <Package className="w-4 h-4" />
              <span>{isEn ? 'Pledge Supplies' : 'Gửi nhu yếu phẩm'}</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 text-xs font-bold transition cursor-pointer"
              >
                {isEn ? 'Close' : 'Đóng'}
              </button>

              <a
                href={`tel:${center.phone.replace(/\s+/g, '')}`}
                className="px-5 py-2.5 rounded-xl bg-[#d46b28] hover:bg-[#ba591a] text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition cursor-pointer"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>{isEn ? `Call ${center.phone}` : `Gọi ngay: ${center.phone}`}</span>
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* Embedded Supply Pledge Modal */}
      <FoodDonationModal
        isOpen={isPledgeModalOpen}
        onClose={() => setIsPledgeModalOpen(false)}
        shelter={center}
        defaultItem={selectedSupplyItem}
      />
    </>
  );
};
