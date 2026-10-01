import React from 'react';
import { Pet } from '../../types/pet';
import { StatusBadge } from '../common/StatusBadge';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { Heart, MapPin } from 'lucide-react';
import { translateAddress } from '../../utils/addressTranslator';
import { 
  translateBreed, 
  translateColor, 
  translateAgeDisplay, 
  translatePersonalityTag 
} from '../../utils/petTranslator';

export interface PetCardProps {
  pet: Pet;
  onSelect?: (petId: string) => void;
  onViewDetail?: (petId: string) => void;
  onApplyAdopt?: (pet: Pet) => void;
}

export const PetCard: React.FC<PetCardProps> = ({ 
  pet, 
  onSelect, 
  onViewDetail, 
  onApplyAdopt 
}) => {
  const { isSavedPet, toggleSavePet } = useAuth();
  const { t, language } = useLanguage();
  const isFavorite = isSavedPet(pet.id);

  const handleOpenDetail = () => {
    if (onViewDetail) onViewDetail(pet.id);
    else if (onSelect) onSelect(pet.id);
  };

  const genderLabel = pet.gender === 'MALE' ? t('common.male') : t('common.female');
  const ageLabel = translateAgeDisplay(pet.ageDisplay, language);
  const breedLabel = translateBreed(pet.breed, language);
  const colorLabel = translateColor(pet.color, language);

  return (
    <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200/90 dark:border-stone-800 overflow-hidden shadow-xs hover:shadow-md hover:border-[#d46b28]/50 transition-all duration-200 flex flex-col group text-left h-full">
      
      {/* Pet Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100 dark:bg-stone-800">
        <img
          src={pet.avatar || pet.photos[0] || 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=800'}
          alt={pet.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer"
          loading="lazy"
          onClick={handleOpenDetail}
        />

        {/* Status Badge */}
        <div className="absolute top-3 left-3">
          <StatusBadge status={pet.status} size="sm" />
        </div>

        {/* Favorite Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            toggleSavePet(pet.id);
          }}
          className={`absolute top-3 right-3 w-8 h-8 rounded-full backdrop-blur-md flex items-center justify-center transition ${
            isFavorite
              ? 'bg-rose-600 text-white shadow-xs'
              : 'bg-black/35 hover:bg-black/55 text-white'
          }`}
          title={isFavorite ? t('pets.unsavePet') : t('pets.savePet')}
        >
          <Heart className={`w-3.5 h-3.5 ${isFavorite ? 'fill-white' : ''}`} />
        </button>

        {/* Location Overlay Pill */}
        <div className="absolute bottom-2.5 left-2.5 bg-black/60 backdrop-blur-md text-white text-[11px] font-medium px-2.5 py-1 rounded-lg flex items-center gap-1">
          <MapPin className="w-3 h-3 text-stone-300 shrink-0" />
          <span className="truncate max-w-[180px]">{translateAddress(pet.location, language)}</span>
        </div>
      </div>

      {/* Pet Card Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
        
        <div className="space-y-2">
          {/* Pet Name & Gender/Age */}
          <div className="flex items-center justify-between gap-2">
            <h3 
              onClick={handleOpenDetail}
              className="text-lg font-bold text-[#2b2523] dark:text-stone-100 group-hover:text-[#d46b28] dark:group-hover:text-amber-400 transition cursor-pointer font-display tracking-tight truncate"
            >
              {pet.name}
            </h3>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-lg bg-[#fde2cd] dark:bg-amber-950/70 text-[#9c3810] dark:text-amber-300 shrink-0">
              {genderLabel} • {ageLabel}
            </span>
          </div>

          {/* Breed & Color */}
          <p className="text-xs text-[#665851] dark:text-stone-300 font-normal truncate">
            {breedLabel} • {colorLabel}
          </p>

          {/* Personality Tags */}
          <div className="flex flex-wrap gap-1.5 pt-0.5">
            {(pet.personality.tags || []).slice(0, 3).map((tag, idx) => (
              <span 
                key={idx}
                className="text-[11px] font-medium px-2 py-0.5 rounded-lg bg-[#faf4ee] dark:bg-stone-800 text-[#5c4d46] dark:text-stone-300 border border-[#efe2d3] dark:border-stone-700"
              >
                {translatePersonalityTag(tag, language)}
              </span>
            ))}
          </div>
        </div>

        {/* Footer & CTA Section: Clean multi-line layout to prevent text squishing */}
        <div className="pt-3 border-t border-[#efe2d3] dark:border-stone-800 space-y-2.5 mt-auto">
          {/* Poster info line */}
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5 min-w-0">
              <span className="text-[10px] text-[#78665e] dark:text-stone-400 font-bold uppercase tracking-wider shrink-0">
                {t('pets.poster')}:
              </span>
              <span 
                className="text-xs font-semibold text-[#2b2523] dark:text-stone-200 truncate"
                title={pet.creatorUserName}
              >
                {pet.creatorUserName}
              </span>
            </div>
          </div>

          {/* Action buttons full-width touch-friendly row */}
          <div className="flex items-center gap-2">
            {onApplyAdopt && (pet.status === 'WAITING' || pet.status === 'UNDER_REVIEW') ? (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onApplyAdopt(pet);
                  }}
                  className="flex-1 py-2 px-2 bg-[#fde2cd] dark:bg-amber-950/60 hover:bg-[#fbd5b5] dark:hover:bg-amber-900/60 text-[#9c3810] dark:text-amber-300 rounded-xl text-xs font-bold transition text-center shadow-2xs cursor-pointer truncate"
                >
                  {t('pets.applyAdopt')}
                </button>
                <button
                  type="button"
                  onClick={handleOpenDetail}
                  className="flex-1 py-2 px-2 bg-[#d46b28] hover:bg-[#ba591a] text-white rounded-xl text-xs font-bold transition text-center shadow-xs cursor-pointer truncate"
                >
                  {t('pets.viewDetail')}
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={handleOpenDetail}
                className="w-full py-2 px-3 bg-[#d46b28] hover:bg-[#ba591a] text-white rounded-xl text-xs font-bold transition text-center shadow-xs cursor-pointer"
              >
                {t('pets.viewDetail')}
              </button>
            )}
          </div>
        </div>

      </div>

    </div>
  );
};
