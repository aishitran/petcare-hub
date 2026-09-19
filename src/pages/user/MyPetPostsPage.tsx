import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { useLanguage } from '../../context/LanguageContext';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Pet, PetStatus } from '../../types/pet';
import { translateAddress } from '../../utils/addressTranslator';
import { translateBreed } from '../../utils/petTranslator';
import { 
  Heart, 
  PlusCircle, 
  Eye, 
  FileText, 
  Edit3, 
  PauseCircle, 
  PlayCircle, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  AlertCircle 
} from 'lucide-react';

interface MyPetPostsPageProps {
  navigate: (path: string) => void;
}

export const MyPetPostsPage: React.FC<MyPetPostsPageProps> = ({ navigate }) => {
  const { currentUser } = useAuth();
  const { pets, updatePet, applications } = useData();
  const { language, t } = useLanguage();
  const isEn = language === 'en';

  const [statusFilter, setStatusFilter] = useState<string>('ALL');

  if (!currentUser) return null;

  const myPets = pets.filter(p => p.creatorUserId === currentUser.id);

  const filteredPets = myPets.filter(pet => {
    if (statusFilter === 'ALL') return true;
    return pet.status === statusFilter;
  });

  const handleTogglePause = (pet: Pet) => {
    const newStatus: PetStatus = pet.status === 'PAUSED' ? 'WAITING' : 'PAUSED';
    updatePet(pet.id, { status: newStatus });
  };

  const handleMarkAdopted = (pet: Pet) => {
    updatePet(pet.id, { status: 'ADOPTED' });
  };

  return (
    <div className="space-y-6 text-left">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-4">
        <div>
          <h1 className="text-2xl font-black text-stone-900 font-display">{isEn ? 'My Pet Listings' : 'Tin thú cưng của tôi'}</h1>
          <p className="text-xs text-stone-500">{isEn ? 'Manage pet profiles you posted for adoption and track rehoming progress.' : 'Quản lý các bé bạn đang đăng tin tìm chủ mới hoặc đã bàn giao thành công.'}</p>
        </div>

        <button
          onClick={() => navigate('/my-pets/create')}
          className="px-4 py-2.5 rounded-2xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs flex items-center gap-2 shadow-md shadow-emerald-950/20 cursor-pointer"
        >
          <PlusCircle className="w-4 h-4" />
          <span>{t('nav.createPet')}</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        {[
          { id: 'ALL', label: isEn ? `All (${myPets.length})` : `Tất cả (${myPets.length})` },
          { id: 'WAITING', label: isEn ? `Seeking Home (${myPets.filter(p => p.status === 'WAITING').length})` : `Đang tìm chủ (${myPets.filter(p => p.status === 'WAITING').length})` },
          { id: 'UNDER_REVIEW', label: isEn ? `Under Review (${myPets.filter(p => p.status === 'UNDER_REVIEW').length})` : `Đang xét duyệt (${myPets.filter(p => p.status === 'UNDER_REVIEW').length})` },
          { id: 'ADOPTED', label: isEn ? `Adopted (${myPets.filter(p => p.status === 'ADOPTED').length})` : `Đã có chủ (${myPets.filter(p => p.status === 'ADOPTED').length})` },
          { id: 'PAUSED', label: isEn ? `Paused (${myPets.filter(p => p.status === 'PAUSED').length})` : `Tạm ngưng (${myPets.filter(p => p.status === 'PAUSED').length})` }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setStatusFilter(tab.id)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
              statusFilter === tab.id
                ? 'bg-[#9c3810] dark:bg-amber-600 text-white shadow-xs'
                : 'bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-[#665851] dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Pet Cards List */}
      {filteredPets.length > 0 ? (
        <div className="space-y-4">
          {filteredPets.map(pet => {
            const petApps = applications.filter(a => a.petId === pet.id);
            const pendingAppsCount = petApps.filter(a => a.status === 'PENDING' || a.status === 'INTERVIEW').length;

            return (
              <div 
                key={pet.id}
                className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200/80 dark:border-stone-800 p-5 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
              >
                
                {/* Left: Thumbnail & Pet Info */}
                <div className="flex items-center gap-4 min-w-0">
                  <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-stone-100 dark:bg-stone-800 shrink-0">
                    <img
                      src={pet.photos[0] || 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=200'}
                      alt={pet.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-bold text-[#2b2523] dark:text-stone-100 text-base">{pet.name}</h3>
                      <StatusBadge status={pet.status} />
                      <StatusBadge status={pet.moderationStatus} />
                    </div>

                    <p className="text-xs text-[#665851] dark:text-stone-400 flex items-center gap-2">
                      <span>{pet.species === 'DOG' ? (isEn ? 'Dog' : 'Chó') : (isEn ? 'Cat' : 'Mèo')} • {translateBreed(pet.breed, language)}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-stone-400" />
                        {translateAddress(pet.location, language)}
                      </span>
                    </p>

                    <div className="text-[11px] text-stone-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{isEn ? 'Posted:' : 'Đăng ngày:'} {new Date(pet.createdAt).toLocaleDateString(isEn ? 'en-US' : 'vi-VN')}</span>
                    </div>
                  </div>
                </div>

                {/* Right: Applications Count & Control Actions */}
                <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 pt-3 md:pt-0 border-stone-100 dark:border-stone-800">
                  
                  {/* Application Count Pill */}
                  <button
                    onClick={() => navigate('/my-pet-applications')}
                    className="px-3.5 py-2 rounded-2xl bg-[#fde2cd]/40 dark:bg-amber-950/40 border border-[#efe2d3] dark:border-amber-900/40 hover:bg-[#fde2cd] text-[#9c3810] dark:text-amber-300 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
                  >
                    <FileText className="w-3.5 h-3.5 text-[#9c3810] dark:text-amber-400" />
                    <span>{isEn ? `${petApps.length} applications` : `${petApps.length} đơn nhận nuôi`}</span>
                    {pendingAppsCount > 0 && (
                      <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                    )}
                  </button>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => navigate(`/pets/${pet.id}`)}
                      title={isEn ? 'View public page' : 'Xem trang công khai'}
                      className="p-2 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-[#2b2523] dark:text-stone-300 text-xs font-bold transition cursor-pointer"
                    >
                      <Eye className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => handleTogglePause(pet)}
                      title={pet.status === 'PAUSED' ? (isEn ? 'Resume listing' : 'Mở lại tin nhận nuôi') : (isEn ? 'Pause applications' : 'Tạm ngưng nhận đơn')}
                      className="p-2 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-[#2b2523] dark:text-stone-300 text-xs font-bold transition cursor-pointer"
                    >
                      {pet.status === 'PAUSED' ? <PlayCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> : <PauseCircle className="w-4 h-4 text-amber-600 dark:text-amber-400" />}
                    </button>

                    {pet.status !== 'ADOPTED' && (
                      <button
                        onClick={() => handleMarkAdopted(pet)}
                        title={isEn ? 'Mark as adopted' : 'Đánh dấu đã hoàn thành nhận nuôi'}
                        className="px-3 py-2 rounded-xl bg-[#9c3810] hover:bg-[#852f0d] dark:bg-amber-600 dark:hover:bg-amber-500 text-white text-xs font-bold transition flex items-center gap-1 cursor-pointer"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-200" />
                        <span>{isEn ? 'Adopted' : 'Đã có chủ'}</span>
                      </button>
                    )}
                  </div>

                </div>

              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white dark:bg-stone-900 p-12 rounded-3xl border border-dashed border-stone-300 dark:border-stone-800 text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-stone-100 dark:bg-stone-800 text-stone-400 flex items-center justify-center mx-auto text-2xl">
            🐾
          </div>
          <div className="space-y-1">
            <h3 className="font-bold text-[#2b2523] dark:text-stone-100 text-base">{isEn ? 'No Pet Listings Found' : 'Chưa có tin thú cưng nào'}</h3>
            <p className="text-xs text-stone-500 dark:text-stone-400">{isEn ? 'You have not posted any pets for adoption or filter returned no matches.' : 'Bạn chưa đăng tin tìm chủ mới cho bạn nhỏ nào hoặc bộ lọc không khớp.'}</p>
          </div>
          <button
            onClick={() => navigate('/my-pets/create')}
            className="px-5 py-2.5 rounded-xl bg-[#9c3810] hover:bg-[#852f0d] dark:bg-amber-600 dark:hover:bg-amber-500 text-white text-xs font-bold transition cursor-pointer"
          >
            {isEn ? 'Post New Pet Now' : 'Đăng tin mới ngay'}
          </button>
        </div>
      )}

    </div>
  );
};
