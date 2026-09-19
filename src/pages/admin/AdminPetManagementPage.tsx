import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { useLanguage } from '../../context/LanguageContext';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Pet } from '../../types/pet';
import { translateAddress } from '../../utils/addressTranslator';
import { translateBreed } from '../../utils/petTranslator';
import { 
  Heart, 
  Search, 
  Eye, 
  Trash2, 
  CheckCircle2, 
  PauseCircle, 
  PlayCircle, 
  Clock, 
  MapPin,
  Filter
} from 'lucide-react';

interface AdminPetManagementPageProps {
  navigate: (path: string) => void;
}

export const AdminPetManagementPage: React.FC<AdminPetManagementPageProps> = ({ navigate }) => {
  const { pets, updatePet } = useData();
  const { language, t } = useLanguage();
  const isEn = language === 'en';

  const [searchQuery, setSearchQuery] = useState('');
  const [speciesFilter, setSpeciesFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [moderationFilter, setModerationFilter] = useState('ALL');

  const filteredPets = pets.filter(pet => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = pet.name.toLowerCase().includes(q);
      const matchBreed = pet.breed.toLowerCase().includes(q);
      const matchCreator = pet.creatorUserName.toLowerCase().includes(q);
      if (!matchName && !matchBreed && !matchCreator) return false;
    }

    if (speciesFilter !== 'ALL' && pet.species !== speciesFilter) return false;
    if (statusFilter !== 'ALL' && pet.status !== statusFilter) return false;
    if (moderationFilter !== 'ALL' && pet.moderationStatus !== moderationFilter) return false;

    return true;
  });

  const handleTogglePause = (pet: Pet) => {
    updatePet(pet.id, { status: pet.status === 'PAUSED' ? 'WAITING' : 'PAUSED' });
  };

  return (
    <div className="space-y-6 text-left text-stone-100">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-800 pb-4">
        <div>
          <h1 className="text-2xl font-black text-white font-display">
            {isEn ? 'All Pet Listings Management' : 'Quản lý Toàn bộ Thú cưng'}
          </h1>
          <p className="text-xs text-stone-400 mt-0.5">
            {isEn 
              ? 'Catalog of all pets on platform, moderation approval status, and adoption tracking.' 
              : 'Danh mục tất cả thú cưng đăng trên nền tảng, tình trạng xét duyệt và trạng thái nhận nuôi.'}
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-stone-900 p-4 rounded-2xl border border-stone-800 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="relative">
          <Search className="w-4 h-4 text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder={isEn ? 'Search by pet name, breed, rescuer...' : 'Tìm theo tên, giống, người đăng...'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-3 py-2 bg-stone-950 border border-stone-800 rounded-xl text-xs text-stone-200 focus:ring-2 focus:ring-teal-500 focus:outline-none"
          />
        </div>

        <select
          value={speciesFilter}
          onChange={(e) => setSpeciesFilter(e.target.value)}
          className="px-3 py-2 bg-stone-950 border border-stone-800 rounded-xl text-xs text-stone-300 font-bold"
        >
          <option value="ALL">{isEn ? 'All Species (Dogs & Cats)' : 'Tất cả loài (Chó & Mèo)'}</option>
          <option value="DOG">{isEn ? 'Dogs (Dog)' : 'Chó (Dog)'}</option>
          <option value="CAT">{isEn ? 'Cats (Cat)' : 'Mèo (Cat)'}</option>
        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 bg-stone-950 border border-stone-800 rounded-xl text-xs text-stone-300 font-bold"
        >
          <option value="ALL">{isEn ? 'All Adoption Statuses' : 'Tất cả trạng thái'}</option>
          <option value="WAITING">{isEn ? 'Waiting (WAITING)' : 'Đang tìm chủ (WAITING)'}</option>
          <option value="UNDER_REVIEW">{isEn ? 'Under Review (UNDER_REVIEW)' : 'Đang xét duyệt (UNDER_REVIEW)'}</option>
          <option value="ADOPTED">{isEn ? 'Adopted (ADOPTED)' : 'Đã có chủ (ADOPTED)'}</option>
          <option value="PAUSED">{isEn ? 'Paused (PAUSED)' : 'Tạm ngưng (PAUSED)'}</option>
        </select>

        <select
          value={moderationFilter}
          onChange={(e) => setModerationFilter(e.target.value)}
          className="px-3 py-2 bg-stone-950 border border-stone-800 rounded-xl text-xs text-stone-300 font-bold"
        >
          <option value="ALL">{isEn ? 'All Moderation Statuses' : 'Tất cả kiểm duyệt'}</option>
          <option value="APPROVED">{isEn ? 'Approved (APPROVED)' : 'Đã duyệt (APPROVED)'}</option>
          <option value="PENDING_APPROVAL">{isEn ? 'Pending (PENDING)' : 'Chờ duyệt (PENDING)'}</option>
          <option value="REJECTED">{isEn ? 'Rejected (REJECTED)' : 'Bị từ chối (REJECTED)'}</option>
        </select>
      </div>

      {/* Pets Table */}
      <div className="bg-stone-900 rounded-3xl border border-stone-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-950 text-stone-400 uppercase font-bold text-[11px] border-b border-stone-800">
              <tr>
                <th className="px-5 py-3.5">{isEn ? 'Pet Profile' : 'Thú cưng'}</th>
                <th className="px-4 py-3.5">{isEn ? 'Rescuer / Fosterer' : 'Người đăng'}</th>
                <th className="px-4 py-3.5">{isEn ? 'Location' : 'Khu vực'}</th>
                <th className="px-4 py-3.5">{isEn ? 'Adoption Status' : 'Trạng thái nhận nuôi'}</th>
                <th className="px-4 py-3.5">{isEn ? 'Moderation' : 'Kiểm duyệt'}</th>
                <th className="px-5 py-3.5 text-right">{isEn ? 'Actions' : 'Thao tác'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-800/60">
              {filteredPets.map(pet => (
                <tr key={pet.id} className="hover:bg-stone-800/40 transition">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <img src={pet.photos[0]} alt="" className="w-11 h-11 rounded-xl object-cover ring-1 ring-stone-700" />
                      <div>
                        <div className="font-bold text-white text-xs">{pet.name}</div>
                        <span className="text-[11px] text-stone-400">
                          {pet.species === 'DOG' ? t('common.dog') : t('common.cat')} • {translateBreed(pet.breed, language)}
                        </span>
                      </div>
                    </div>
                  </td>

                  <td className="px-4 py-4 text-stone-300">
                    <div className="font-bold text-white">{pet.creatorUserName}</div>
                    <span className="text-[10px] text-stone-500">ID: {pet.creatorUserId}</span>
                  </td>

                  <td className="px-4 py-4 text-stone-400">
                    {translateAddress(pet.location, language)}
                  </td>

                  <td className="px-4 py-4">
                    <StatusBadge status={pet.status} />
                  </td>

                  <td className="px-4 py-4">
                    <StatusBadge status={pet.moderationStatus} />
                  </td>

                  <td className="px-5 py-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => navigate(`/pets/${pet.id}`)}
                        className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 transition cursor-pointer"
                        title={isEn ? 'View Details' : 'Xem chi tiết'}
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => handleTogglePause(pet)}
                        className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 transition cursor-pointer"
                        title={pet.status === 'PAUSED' ? (isEn ? 'Resume' : 'Mở lại') : (isEn ? 'Pause' : 'Tạm ngưng')}
                      >
                        {pet.status === 'PAUSED' ? <PlayCircle className="w-3.5 h-3.5 text-teal-400" /> : <PauseCircle className="w-3.5 h-3.5 text-amber-400" />}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

