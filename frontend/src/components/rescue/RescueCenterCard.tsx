import React from 'react';
import { EmergencyShelter, SupportedAnimal, RescueCenterType } from '../../types/shelter';
import { useLanguage } from '../../context/LanguageContext';
import { translateAddress, translateShelterName } from '../../utils/addressTranslator';
import { 
  Phone, 
  MapPin, 
  Clock, 
  Navigation, 
  ShieldCheck, 
  Mail, 
  Globe, 
  ExternalLink,
  Building2,
  Heart,
  Stethoscope,
  Users,
  Compass,
  Package
} from 'lucide-react';

interface RescueCenterCardProps {
  center: EmergencyShelter;
  onViewDetail?: (center: EmergencyShelter) => void;
  onPledgeSupplies?: (center: EmergencyShelter) => void;
}

export const RescueCenterCard: React.FC<RescueCenterCardProps> = ({ 
  center, 
  onViewDetail,
  onPledgeSupplies 
}) => {
  const { language } = useLanguage();
  const isEn = language === 'en';

  // Helper for Organization Type Badge
  const getTypeBadge = (type?: RescueCenterType | string) => {
    switch (type) {
      case 'RESCUE_TEAM':
      case 'VOLUNTEER_TEAM':
        return {
          label: isEn ? 'Animal Rescue Team' : 'Cứu hộ động vật',
          icon: Compass,
          bg: 'bg-rose-50 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 border-rose-200 dark:border-rose-800',
          iconColor: 'text-rose-600 dark:text-rose-400'
        };
      case 'VET_CLINIC':
      case 'HOSPITAL_PARTNER':
        return {
          label: isEn ? 'Partner Vet Clinic' : 'Phòng khám hỗ trợ',
          icon: Stethoscope,
          bg: 'bg-teal-50 dark:bg-teal-950/60 text-teal-800 dark:text-teal-300 border-teal-200 dark:border-teal-800',
          iconColor: 'text-teal-600 dark:text-teal-400'
        };
      case 'WELFARE_ORG':
        return {
          label: isEn ? 'Animal Welfare Org' : 'Tổ chức bảo vệ động vật',
          icon: Users,
          bg: 'bg-purple-50 dark:bg-purple-950/60 text-purple-800 dark:text-purple-300 border-purple-200 dark:border-purple-800',
          iconColor: 'text-purple-600 dark:text-purple-400'
        };
      case 'SHELTER':
      default:
        return {
          label: isEn ? 'Rescue Shelter' : 'Trạm cứu trợ',
          icon: Building2,
          bg: 'bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-800',
          iconColor: 'text-amber-600 dark:text-amber-400'
        };
    }
  };

  // Helper for Status Badge
  const getStatusBadge = (status?: string) => {
    switch (status) {
      case 'BUSY':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 border border-amber-300 dark:border-amber-800 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            {isEn ? 'Busy / High Load' : 'Đang bận'}
          </span>
        );
      case 'CLOSED':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 border border-stone-300 dark:border-stone-700 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-stone-400" />
            {isEn ? 'Temporarily Closed' : 'Tạm đóng'}
          </span>
        );
      case 'ACTIVE':
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            {isEn ? 'Active / Open' : 'Đang hoạt động'}
          </span>
        );
    }
  };

  // Helper for Animal Icons
  const getAnimalBadge = (animal: SupportedAnimal | string) => {
    switch (animal) {
      case 'DOG':
        return { emoji: '🐕', name: isEn ? 'Dogs' : 'Chó' };
      case 'CAT':
        return { emoji: '🐈', name: isEn ? 'Cats' : 'Mèo' };
      case 'RABBIT':
        return { emoji: '🐇', name: isEn ? 'Rabbits' : 'Thỏ' };
      case 'BIRD':
        return { emoji: '🐦', name: isEn ? 'Birds' : 'Chim' };
      case 'TURTLE':
        return { emoji: '🐢', name: isEn ? 'Turtles' : 'Rùa' };
      case 'WILDLIFE':
        return { emoji: '🦔', name: isEn ? 'Wildlife' : 'Hoang dã' };
      default:
        return { emoji: '🐾', name: isEn ? 'Other' : 'Khác' };
    }
  };

  const typeInfo = getTypeBadge(center.type || center.shelterType);
  const TypeIcon = typeInfo.icon;
  const displayName = isEn ? (center.nameEn || translateShelterName(center.name, 'en')) : center.name;
  const displayAddress = translateAddress(center.address, language);
  const displayArea = isEn ? (center.supportedAreaEn || center.supportedArea) : center.supportedArea;
  const displayHours = isEn ? (center.operatingHoursEn || center.operatingHours) : center.operatingHours;

  return (
    <div className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200/90 dark:border-stone-800 shadow-xs hover:shadow-md hover:border-[#d46b28]/50 transition-all duration-200 flex flex-col justify-between overflow-hidden group text-left h-full">
      
      {/* Top Banner / Avatar & Badges */}
      <div className="p-5 sm:p-6 space-y-4">
        
        {/* Header: Avatar, Name & Status */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-12 h-12 rounded-2xl bg-[#faf4ee] dark:bg-stone-800 border border-[#efe2d3] dark:border-stone-700 overflow-hidden shrink-0 flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform">
              {center.avatarUrl ? (
                <img 
                  src={center.avatarUrl} 
                  alt={displayName} 
                  className="w-full h-full object-cover" 
                  loading="lazy"
                />
              ) : (
                <Building2 className="w-6 h-6 text-[#d46b28]" />
              )}
            </div>

            <div className="min-w-0">
              <h3 
                onClick={() => onViewDetail && onViewDetail(center)}
                className="font-bold text-[#2b2523] dark:text-stone-100 text-base leading-snug group-hover:text-[#d46b28] dark:group-hover:text-amber-400 cursor-pointer transition font-display truncate"
                title={displayName}
              >
                {displayName}
              </h3>
              
              <div className="flex items-center gap-2 mt-1">
                <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg text-[11px] font-bold border ${typeInfo.bg}`}>
                  <TypeIcon className={`w-3 h-3 ${typeInfo.iconColor}`} />
                  {typeInfo.label}
                </span>
              </div>
            </div>
          </div>

          <div className="shrink-0">
            {getStatusBadge(center.status)}
          </div>
        </div>

        {/* Info Grid: Address, Distinct Phone, Operating Hours, Coverage Area */}
        <div className="space-y-2.5 pt-2 text-xs text-[#5c4d46] dark:text-stone-300">
          
          {/* Distinct Address */}
          <div className="flex items-start gap-2">
            <MapPin className="w-4 h-4 text-[#d46b28] shrink-0 mt-0.5" />
            <span className="leading-snug text-[#2b2523] dark:text-stone-200 font-medium" title={displayAddress}>
              {displayAddress}
            </span>
          </div>

          {/* Distinct Direct Phone Number */}
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#faf4ee] dark:bg-stone-800 border border-[#efe2d3] dark:border-stone-700">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#d46b28] shrink-0" />
              <span className="text-[11px] text-[#78665e] dark:text-stone-400 font-semibold">Hotline:</span>
              <span className="font-bold text-stone-900 dark:text-stone-100 text-sm">{center.phone}</span>
            </div>
            
            {center.is24_7 && (
              <span className="px-2 py-0.5 rounded-md bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 text-[10px] font-bold">
                24/7
              </span>
            )}
          </div>

          {/* Operating Hours */}
          <div className="flex items-center gap-2 text-[11px] text-[#665851] dark:text-stone-400">
            <Clock className="w-3.5 h-3.5 text-stone-400 shrink-0" />
            <span><strong className="text-stone-700 dark:text-stone-300">{isEn ? 'Hours:' : 'Giờ trực:'}</strong> {displayHours}</span>
          </div>

          {/* Coverage Area */}
          {displayArea && (
            <div className="flex items-center gap-2 text-[11px] text-[#665851] dark:text-stone-400">
              <Globe className="w-3.5 h-3.5 text-stone-400 shrink-0" />
              <span className="truncate"><strong className="text-stone-700 dark:text-stone-300">{isEn ? 'Area:' : 'Khu vực:'}</strong> {displayArea}</span>
            </div>
          )}

          {/* Supported Animals Icons */}
          <div className="pt-2 border-t border-[#efe2d3] dark:border-stone-800 flex items-center justify-between">
            <span className="text-[11px] font-bold text-[#78665e] dark:text-stone-400 uppercase tracking-wider">
              {isEn ? 'Supports:' : 'Hỗ trợ:'}
            </span>
            <div className="flex items-center gap-1.5 flex-wrap">
              {center.supportedAnimals.map((animal, idx) => {
                const badge = getAnimalBadge(animal);
                return (
                  <span 
                    key={idx}
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-[#faf4ee] dark:bg-stone-800 border border-[#efe2d3] dark:border-stone-700 text-[11px] font-semibold text-[#5c4d46] dark:text-stone-300"
                    title={badge.name}
                  >
                    <span>{badge.emoji}</span>
                    <span>{badge.name}</span>
                  </span>
                );
              })}
            </div>
          </div>

        </div>

      </div>

      {/* Action Buttons Footer: Call Now, Directions, View Details */}
      <div className="p-4 sm:p-5 bg-[#faf8f5] dark:bg-stone-950 border-t border-[#efe2d3] dark:border-stone-800 flex items-center gap-2 mt-auto">
        
        {/* Call Now (Primary) */}
        <a
          href={`tel:${center.phone.replace(/\s+/g, '')}`}
          className="flex-1 py-2.5 px-3 rounded-xl bg-[#d46b28] hover:bg-[#ba591a] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition cursor-pointer"
        >
          <Phone className="w-3.5 h-3.5" />
          <span>{isEn ? 'Call' : 'Gọi ngay'}</span>
        </a>

        {/* Directions (Google Maps) */}
        {center.googleMapsUrl && (
          <a
            href={center.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="py-2.5 px-3 rounded-xl bg-white dark:bg-stone-800 hover:bg-[#fde2cd] dark:hover:bg-stone-700 border border-[#efe2d3] dark:border-stone-700 text-[#2b2523] dark:text-stone-200 font-bold text-xs flex items-center justify-center gap-1 transition shadow-2xs cursor-pointer"
            title={isEn ? 'Get Directions on Google Maps' : 'Chỉ đường Google Maps'}
          >
            <Navigation className="w-3.5 h-3.5 text-[#d46b28]" />
            <span className="hidden sm:inline">{isEn ? 'Map' : 'Bản đồ'}</span>
          </a>
        )}

        {/* View Details */}
        <button
          type="button"
          onClick={() => onViewDetail && onViewDetail(center)}
          className="py-2.5 px-3 rounded-xl bg-white dark:bg-stone-800 hover:bg-[#fde2cd] dark:hover:bg-stone-700 border border-[#efe2d3] dark:border-stone-700 text-[#2b2523] dark:text-stone-200 font-bold text-xs flex items-center justify-center gap-1 transition shadow-2xs cursor-pointer"
        >
          <span>{isEn ? 'Details' : 'Chi tiết'}</span>
        </button>

      </div>

    </div>
  );
};
