import React from 'react';
import { RescuePost } from '../../types/rescue';
import { useLanguage } from '../../context/LanguageContext';
import { MapPin, Phone, Building } from 'lucide-react';
import { translateAddress, translateShelterName } from '../../utils/addressTranslator';

interface RescueCardProps {
  post: RescuePost;
  onViewDetail?: (postId: string) => void;
  onSupport?: (post: RescuePost) => void;
}

export const RescueCard: React.FC<RescueCardProps> = ({ post, onViewDetail, onSupport }) => {
  const { t, language } = useLanguage();

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'FOOD': return { label: t('rescue.catFood'), bg: 'bg-amber-50 dark:bg-amber-950/60', text: 'text-amber-800 dark:text-amber-300' };
      case 'WATER': return { label: t('rescue.catWater'), bg: 'bg-blue-50 dark:bg-blue-950/60', text: 'text-blue-800 dark:text-blue-300' };
      case 'SUPPLIES': return { label: t('rescue.catSupplies'), bg: 'bg-stone-100 dark:bg-stone-800', text: 'text-stone-800 dark:text-stone-200' };
      case 'MEDICINE': return { label: t('rescue.catMedicine'), bg: 'bg-rose-50 dark:bg-rose-950/60', text: 'text-rose-800 dark:text-rose-300' };
      case 'MEDICAL_SUPPLIES': return { label: t('rescue.catMedicalSupplies'), bg: 'bg-indigo-50 dark:bg-indigo-950/60', text: 'text-indigo-800 dark:text-indigo-300' };
      case 'PET_CARE': return { label: t('rescue.catFoster'), bg: 'bg-purple-50 dark:bg-purple-950/60', text: 'text-purple-800 dark:text-purple-300' };
      case 'SHELTER_SUPPORT': return { label: t('rescue.catShelter'), bg: 'bg-emerald-50 dark:bg-emerald-950/60', text: 'text-emerald-800 dark:text-emerald-300' };
      default: return { label: t('rescue.catOther'), bg: 'bg-stone-50 dark:bg-stone-800', text: 'text-stone-700 dark:text-stone-300' };
    }
  };

  const cat = getCategoryLabel(post.category);

  return (
    <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200/90 dark:border-stone-800 shadow-xs hover:shadow-md hover:border-[#d46b28]/50 transition-all flex flex-col overflow-hidden text-left group h-full">
      
      {/* Image Thumbnail & Priority Badge */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-stone-100 dark:bg-stone-800">
        <img
          src={post.images[0] || 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=600&auto=format&fit=crop'}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer"
          loading="lazy"
          onClick={() => onViewDetail && onViewDetail(post.id)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

        {/* Priority Badge */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5">
          {post.priority === 'URGENT' && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wide bg-rose-600 text-white shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
              {t('rescue.priorityUrgent')}
            </span>
          )}
          {post.priority === 'HIGH' && (
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-600 text-white">
              {t('rescue.priorityHigh')}
            </span>
          )}
          {post.priority === 'MEDIUM' && (
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-stone-800/80 backdrop-blur-sm text-stone-200">
              {t('rescue.priorityMedium')}
            </span>
          )}
        </div>

        {/* Category Pill */}
        <div className="absolute top-3 right-3">
          <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${cat.bg} ${cat.text} shadow-xs backdrop-blur-sm border border-stone-200/40 dark:border-stone-700`}>
            {cat.label}
          </span>
        </div>

        {/* Location & Date at bottom of photo */}
        <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-stone-200 text-xs font-normal">
          <span className="truncate max-w-[170px] flex items-center gap-1">
            <MapPin className="w-3 h-3 text-stone-300 shrink-0" />
            <span className="truncate">{translateAddress(post.supportLocation, language)}</span>
          </span>
          <span className="text-[11px] text-stone-300 shrink-0">{t('rescue.deadline')} {post.requiredDate}</span>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3.5">
        
        <div className="space-y-3">
          {/* Post Title & Description */}
          <div>
            <h3 
              onClick={() => onViewDetail && onViewDetail(post.id)}
              className="font-bold text-[#2b2523] dark:text-stone-100 text-sm leading-snug line-clamp-2 hover:text-[#d46b28] dark:group-hover:text-amber-400 cursor-pointer transition font-display"
            >
              {post.title}
            </h3>

            <p className="text-xs text-[#665851] dark:text-stone-300 line-clamp-2 leading-relaxed font-normal mt-1">
              {post.description}
            </p>
          </div>

          {/* Quantity Needs Box */}
          <div className="p-2.5 bg-[#fde2cd]/60 dark:bg-amber-950/40 rounded-xl border border-[#f0ceb2]/70 dark:border-amber-900/40 flex items-center justify-between">
            <div className="min-w-0 pr-2">
              <span className="text-[10px] font-bold text-[#9c3810] dark:text-amber-300 uppercase block tracking-wider leading-none">
                {t('rescue.needed')}
              </span>
              <span className="text-xs font-bold text-[#2b2523] dark:text-stone-100 truncate block mt-1">{post.quantityNeeded}</span>
            </div>
            <div className="text-right shrink-0">
              <span className="text-[10px] text-[#78665e] dark:text-stone-400 block leading-none">{t('rescue.fulfilled')}</span>
              <span className="text-xs font-bold text-[#d46b28] dark:text-amber-400 block mt-1">{post.supportsCount} {t('rescue.supportsCount')}</span>
            </div>
          </div>

          {/* DEDICATED SHELTER / RESCUE STATION & HOTLINE & ADDRESS CARD */}
          <div className="p-3 bg-[#faf4ee] dark:bg-stone-950 rounded-xl border border-[#efe2d3] dark:border-stone-800 space-y-1.5 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-[#78665e] dark:text-stone-400 uppercase block tracking-wider">
                {t('rescue.shelterStation')}
              </span>
              <span className="px-1.5 py-0.2 rounded bg-[#fde2cd] dark:bg-amber-950/70 text-[#9c3810] dark:text-amber-300 text-[9px] font-bold">
                {t('common.noProfiteering')}
              </span>
            </div>

            <div className="font-bold text-[#2b2523] dark:text-stone-100 text-xs flex items-center gap-1.5">
              <Building className="w-3.5 h-3.5 text-[#d46b28] shrink-0" />
              <span className="truncate">{translateShelterName(post.shelterName, language) || (language === 'vi' ? 'Trạm Cứu Hộ Động Vật Liên Kết' : 'Partner Animal Shelter')}</span>
            </div>

            <div className="space-y-1 pt-1 border-t border-[#efe2d3] dark:border-stone-800 text-[11px] text-[#665851] dark:text-stone-400">
              <div className="flex items-center justify-between">
                <span className="text-[#78665e] dark:text-stone-400">Hotline:</span>
                <a 
                  href={`tel:${post.shelterHotline || post.contactPhone}`}
                  onClick={(e) => e.stopPropagation()}
                  className="font-bold text-[#d46b28] dark:text-amber-400 hover:underline flex items-center gap-1"
                >
                  <Phone className="w-3 h-3 text-[#d46b28] dark:text-amber-400" />
                  <span>{post.shelterHotline || post.contactPhone}</span>
                </a>
              </div>

              <div className="flex items-start gap-1 text-[#78665e] dark:text-stone-400">
                <MapPin className="w-3 h-3 text-[#d46b28] dark:text-amber-400 shrink-0 mt-0.5" />
                <span className="truncate text-[#5c4d46] dark:text-stone-300" title={translateAddress(post.shelterAddress || post.supportLocation, language)}>
                  {translateAddress(post.shelterAddress || post.supportLocation, language)}
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Poster Info & Footer CTA */}
        <div className="pt-3 border-t border-[#efe2d3] dark:border-stone-800 flex items-center justify-between gap-2 mt-auto">
          <div className="flex items-center gap-2 min-w-0 flex-1 pr-1">
            <img
              src={post.creatorUserAvatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100'}
              alt={post.creatorUserName}
              className="w-6 h-6 rounded-full object-cover shrink-0"
            />
            <span 
              className="text-xs font-semibold text-[#2b2523] dark:text-stone-200 truncate block"
              title={post.creatorUserName}
            >
              {post.creatorUserName}
            </span>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={() => onViewDetail && onViewDetail(post.id)}
              className="px-3 py-1.5 rounded-xl bg-[#faf4ee] dark:bg-stone-800 hover:bg-[#fde2cd] dark:hover:bg-stone-700 text-[#2b2523] dark:text-stone-200 text-xs font-bold transition shadow-2xs border border-[#efe2d3] dark:border-stone-700 cursor-pointer"
            >
              {t('common.viewDetail')}
            </button>
            <button
              type="button"
              onClick={() => onSupport ? onSupport(post) : onViewDetail && onViewDetail(post.id)}
              className="px-3 py-1.5 rounded-xl bg-[#d46b28] hover:bg-[#ba591a] text-white text-xs font-bold transition shadow-xs cursor-pointer"
            >
              {t('rescue.supportPostBtn')}
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
