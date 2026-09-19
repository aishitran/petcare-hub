import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { useLanguage } from '../../context/LanguageContext';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Pet } from '../../types/pet';
import { translateAddress } from '../../utils/addressTranslator';
import { translateBreed } from '../../utils/petTranslator';
import { translateDynamicText } from '../../utils/dataTranslator';
import { 
  CheckSquare, 
  CheckCircle2, 
  XCircle, 
  Eye, 
  ShieldCheck, 
  Clock, 
  AlertTriangle,
  User,
  MapPin,
  X
} from 'lucide-react';

interface AdminPetApprovalsPageProps {
  navigate: (path: string) => void;
}

export const AdminPetApprovalsPage: React.FC<AdminPetApprovalsPageProps> = ({ navigate }) => {
  const { pets, updatePetModerationStatus } = useData();
  const { language, t } = useLanguage();
  const isEn = language === 'en';

  const [inspectPet, setInspectPet] = useState<Pet | null>(null);

  const pendingPets = pets.filter(p => p.moderationStatus === 'PENDING_APPROVAL');

  const handleApprove = (petId: string) => {
    updatePetModerationStatus(petId, 'APPROVED');
    setInspectPet(null);
  };

  const handleReject = (petId: string) => {
    updatePetModerationStatus(petId, 'REJECTED');
    setInspectPet(null);
  };

  return (
    <div className="space-y-6 text-left text-stone-100">
      
      {/* Header */}
      <div className="border-b border-stone-800 pb-4">
        <h1 className="text-2xl font-black text-white font-display">
          {isEn ? 'Pet Listing Moderation & Verification' : 'Kiểm duyệt Tin đăng Thú cưng'}
        </h1>
        <p className="text-xs text-stone-400 mt-0.5">
          {isEn 
            ? 'Review photos, health background, vaccination history, and adoption requirements before public platform release.' 
            : 'Rà soát hình ảnh, thông tin sức khỏe, sổ tiêm chủng và điều kiện nhận nuôi trước khi xuất bản lên nền tảng.'}
        </p>
      </div>

      {/* Pending Moderation Queue */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
          <h2 className="text-sm font-bold uppercase tracking-wider text-amber-300">
            {isEn ? `Pending Verification Queue (${pendingPets.length})` : `Tin đăng đang chờ duyệt (${pendingPets.length})`}
          </h2>
        </div>

        {pendingPets.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pendingPets.map(pet => (
              <div 
                key={pet.id}
                className="bg-stone-900 rounded-3xl border border-stone-800 p-5 shadow-lg space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="relative h-44 rounded-2xl overflow-hidden bg-stone-950">
                    <img src={pet.photos[0]} alt={pet.name} className="w-full h-full object-cover" />
                    <div className="absolute top-2 left-2">
                      <StatusBadge status={pet.moderationStatus} />
                    </div>
                  </div>

                  <div>
                    <h3 className="font-bold text-white text-base">
                      {pet.name} ({translateBreed(pet.breed, language)})
                    </h3>
                    <p className="text-xs text-stone-400 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-stone-500" />
                      <span>{translateAddress(pet.location, language)}</span>
                      <span>•</span>
                      <span>{isEn ? 'Poster:' : 'Người đăng:'} <b className="text-stone-300">{pet.creatorUserName}</b></span>
                    </p>
                  </div>

                  {/* Health summary */}
                  <div className="p-3 bg-stone-950 rounded-2xl border border-stone-800 text-xs space-y-1 text-stone-300">
                    <div className="flex justify-between">
                      <span>{isEn ? 'Neutered / Spayed:' : 'Triệt sản:'}</span>
                      <b className={pet.health.isSterilized ? 'text-teal-400' : 'text-amber-400'}>
                        {pet.health.isSterilized ? (isEn ? 'Spayed' : 'Đã triệt sản') : (isEn ? 'No' : 'Chưa')}
                      </b>
                    </div>
                    <div className="flex justify-between">
                      <span>{isEn ? 'Vaccinated:' : 'Tiêm phòng:'}</span>
                      <b className={pet.health.isVaccinated ? 'text-teal-400' : 'text-amber-400'}>
                        {pet.health.isVaccinated ? (isEn ? 'Vaccinated' : 'Đã tiêm') : (isEn ? 'No' : 'Chưa')}
                      </b>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-stone-800">
                  <button
                    onClick={() => setInspectPet(pet)}
                    className="flex-1 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-bold transition flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>{isEn ? 'Inspect' : 'Xem xét kỹ'}</span>
                  </button>

                  <button
                    onClick={() => handleApprove(pet.id)}
                    className="flex-1 py-2 rounded-xl bg-teal-700 hover:bg-teal-600 text-white text-xs font-bold transition flex items-center justify-center gap-1 shadow-md cursor-pointer"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{isEn ? 'Approve' : 'Duyệt tin'}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-stone-900/50 p-12 rounded-3xl border border-stone-800 text-center text-xs text-stone-500">
            {isEn ? 'Great! No pet listings currently pending in moderation queue.' : 'Tuyệt vời! Không có tin đăng thú cưng nào đang tồn đọng trong hàng đợi duyệt.'}
          </div>
        )}
      </div>

      {/* INSPECT MODAL */}
      {inspectPet && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in text-left">
          <div className="bg-stone-900 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 space-y-5 border border-stone-800 text-stone-100 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-stone-800">
              <h3 className="font-bold text-white text-base">
                {isEn ? `Detailed Listing Review: ${inspectPet.name}` : `Kiểm duyệt chi tiết tin đăng: ${inspectPet.name}`}
              </h3>
              <button onClick={() => setInspectPet(null)} className="text-stone-400 hover:text-white cursor-pointer p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="flex gap-2 overflow-x-auto pb-2">
                {inspectPet.photos.map((url, idx) => (
                  <img key={idx} src={url} alt="" className="w-32 h-24 object-cover rounded-xl border border-stone-700" />
                ))}
              </div>

              <div className="p-4 bg-stone-950 rounded-2xl border border-stone-800 space-y-2">
                <span className="font-bold text-teal-300 uppercase block">{isEn ? 'Listing Description:' : 'Mô tả bài đăng:'}</span>
                <p className="text-stone-300 leading-relaxed">{translateDynamicText(inspectPet.description, language)}</p>
              </div>

              <div className="grid grid-cols-2 gap-3 p-4 bg-stone-950 rounded-2xl border border-stone-800">
                <div><span className="text-stone-500">{isEn ? 'Poster:' : 'Người đăng:'}</span> <b className="text-white">{inspectPet.creatorUserName}</b></div>
                <div><span className="text-stone-500">{isEn ? 'Location:' : 'Khu vực:'}</span> <b className="text-white">{translateAddress(inspectPet.location, language)}</b></div>
                <div><span className="text-stone-500">{isEn ? 'Adoption Fee:' : 'Phí nhận nuôi:'}</span> <b className="text-teal-300">{inspectPet.adoptionFee ? `${inspectPet.adoptionFee.toLocaleString('vi-VN')} VNĐ` : (isEn ? 'Free (0 VND)' : 'Miễn phí')}</b></div>
                <div><span className="text-stone-500">{isEn ? 'Weight:' : 'Cân nặng:'}</span> <b className="text-white">{inspectPet.weightKg || 8} kg</b></div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-stone-800">
              <button
                onClick={() => handleReject(inspectPet.id)}
                className="px-4 py-2 rounded-xl bg-rose-900/50 hover:bg-rose-800 text-rose-200 text-xs font-bold cursor-pointer"
              >
                {isEn ? 'Reject Listing' : 'Từ chối tin này'}
              </button>
              <button
                onClick={() => handleApprove(inspectPet.id)}
                className="px-5 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold flex items-center gap-1 cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{isEn ? 'Approve for Publishing' : 'Phê duyệt xuất bản'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

