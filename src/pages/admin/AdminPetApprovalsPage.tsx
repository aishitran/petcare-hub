import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { useLanguage } from '../../context/LanguageContext';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Pet } from '../../types/pet';
import { translateAddress } from '../../utils/addressTranslator';
import { translateBreed, translateAgeDisplay, translatePersonalityTag } from '../../utils/petTranslator';
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
  X,
  Sparkles,
  Info,
  Check,
  Phone
} from 'lucide-react';

interface AdminPetApprovalsPageProps {
  navigate: (path: string) => void;
}

export const AdminPetApprovalsPage: React.FC<AdminPetApprovalsPageProps> = ({ navigate }) => {
  const { pets, updatePetModerationStatus } = useData();
  const { language, t } = useLanguage();
  const isEn = language === 'en';

  const [inspectPet, setInspectPet] = useState<Pet | null>(null);
  const [rejectingPet, setRejectingPet] = useState<Pet | null>(null);
  const [rejectionReason, setRejectionReason] = useState<string>('');
  const [selectedPresetReason, setSelectedPresetReason] = useState<string>('');

  const pendingPets = pets.filter(p => p.moderationStatus === 'PENDING_APPROVAL');

  const presetReasons = isEn ? [
    'Photos are blurry or not of the real pet',
    'Missing mandatory vaccination / medical proof',
    'Adoption fee exceeds welfare community guidelines',
    'Commercial breeding or reselling suspected',
    'Incomplete or misleading description / address'
  ] : [
    'Hình ảnh mờ, không rõ ràng hoặc lấy từ trên mạng',
    'Thiếu thông tin sổ khám / minh chứng tiêm chủng bắt buộc',
    'Mức vía / phí nhận nuôi vượt quá khung quy định phúc lợi',
    'Nghi vấn buôn bán thương mại hoặc nhân giống kinh doanh',
    'Mô tả không đầy đủ hoặc địa chỉ không chính xác'
  ];

  const handleApprove = (petId: string) => {
    updatePetModerationStatus(petId, 'APPROVED');
    setInspectPet(null);
  };

  const handleOpenRejectModal = (pet: Pet) => {
    setRejectingPet(pet);
    setSelectedPresetReason(presetReasons[0]);
    setRejectionReason('');
  };

  const handleConfirmReject = () => {
    if (!rejectingPet) return;
    const finalReason = rejectionReason.trim() || selectedPresetReason;
    updatePetModerationStatus(rejectingPet.id, 'REJECTED');
    setRejectingPet(null);
    setInspectPet(null);
    setRejectionReason('');
  };

  return (
    <div className="space-y-6 text-left text-stone-100">
      
      {/* Header */}
      <div className="border-b border-stone-800 pb-4 text-center sm:text-left">
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
                    <span>{isEn ? 'Inspect' : 'Xem chi tiết'}</span>
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

      {/* DETAILED INSPECTION MODAL (Matches PetDetailPage rich UI) */}
      {inspectPet && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-sm animate-fade-in text-left">
          <div className="bg-stone-900 rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto p-6 space-y-6 border border-stone-800 text-stone-100 shadow-2xl">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-stone-800">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
                  <CheckSquare className="w-5 h-5" />
                </span>
                <div>
                  <h3 className="font-bold text-white text-base">
                    {isEn ? `Detailed Listing Moderation: ${inspectPet.name}` : `Kiểm duyệt chi tiết tin đăng: Bé ${inspectPet.name}`}
                  </h3>
                  <p className="text-[11px] text-stone-400">
                    {isEn ? 'Review all applicant-facing details exactly as they appear on the site' : 'Xem toàn bộ thông tin chuẩn như giao diện hiển thị cho người dùng'}
                  </p>
                </div>
              </div>
              <button onClick={() => setInspectPet(null)} className="text-stone-400 hover:text-white cursor-pointer p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Photo Gallery Grid */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-stone-400 uppercase tracking-wider block">
                {isEn ? `Uploaded Photos (${inspectPet.photos.length})` : `Hình ảnh đã tải lên (${inspectPet.photos.length} ảnh)`}
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {inspectPet.photos.map((url, idx) => (
                  <div key={idx} className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-stone-700 bg-stone-950">
                    <img src={url} alt={`Photo ${idx + 1}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>

            {/* Specs & Basic Information */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 bg-stone-950 rounded-2xl border border-stone-800 text-center space-y-0.5">
                <span className="text-[10px] text-stone-400 uppercase font-bold">{t('pets.specBreed', 'Giống loài')}</span>
                <p className="text-xs font-bold text-white truncate">{translateBreed(inspectPet.breed, language)}</p>
              </div>
              <div className="p-3 bg-stone-950 rounded-2xl border border-stone-800 text-center space-y-0.5">
                <span className="text-[10px] text-stone-400 uppercase font-bold">{t('pets.specAge', 'Độ tuổi')}</span>
                <p className="text-xs font-bold text-white">{translateAgeDisplay(inspectPet.ageDisplay || inspectPet.age, language)}</p>
              </div>
              <div className="p-3 bg-stone-950 rounded-2xl border border-stone-800 text-center space-y-0.5">
                <span className="text-[10px] text-stone-400 uppercase font-bold">{t('pets.specGender', 'Giới tính')}</span>
                <p className="text-xs font-bold text-white">{inspectPet.gender === 'MALE' ? t('common.male') : t('common.female')}</p>
              </div>
              <div className="p-3 bg-stone-950 rounded-2xl border border-stone-800 text-center space-y-0.5">
                <span className="text-[10px] text-stone-400 uppercase font-bold">{isEn ? 'Adoption Fee' : 'Phí nhận nuôi'}</span>
                <p className="text-xs font-bold text-teal-400">
                  {inspectPet.adoptionFee ? `${inspectPet.adoptionFee.toLocaleString('vi-VN')} đ` : (isEn ? 'Free' : 'Miễn phí')}
                </p>
              </div>
            </div>

            {/* Description & Story */}
            <div className="p-4 bg-stone-950 rounded-2xl border border-stone-800 space-y-2 text-xs">
              <span className="font-bold text-amber-400 uppercase block">{isEn ? 'Story & Personality Description:' : 'Câu chuyện & Lời tâm sự của người đăng:'}</span>
              <p className="text-stone-300 leading-relaxed whitespace-pre-line">{translateDynamicText(inspectPet.description, language)}</p>
            </div>

            {/* Rehoming Reason */}
            {inspectPet.rehomingReason && (
              <div className="p-3.5 bg-amber-950/40 rounded-2xl border border-amber-900/50 text-xs text-amber-200 space-y-1">
                <span className="font-bold flex items-center gap-1.5 text-amber-400">
                  <Info className="w-3.5 h-3.5" />
                  <span>{isEn ? 'Rehoming Reason:' : 'Lý do tìm chủ mới:'}</span>
                </span>
                <p className="text-stone-300">{translateDynamicText(inspectPet.rehomingReason, language)}</p>
              </div>
            )}

            {/* Health Checklist */}
            <div className="space-y-2 text-xs">
              <span className="font-bold text-teal-400 uppercase block">{t('pets.healthSection', 'Tình trạng Sức khỏe & Y tế')}</span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 bg-stone-950 rounded-xl border border-stone-800">
                  <span className="text-stone-400 block text-[10px]">{isEn ? 'Sterilized:' : 'Triệt sản:'}</span>
                  <b className={inspectPet.health.isSterilized ? 'text-emerald-400' : 'text-amber-400'}>
                    {inspectPet.health.isSterilized ? '✓ Đã triệt sản' : '✕ Chưa'}
                  </b>
                </div>
                <div className="p-3 bg-stone-950 rounded-xl border border-stone-800">
                  <span className="text-stone-400 block text-[10px]">{isEn ? 'Core Vaccine:' : 'Tiêm phòng:'}</span>
                  <b className={inspectPet.health.isVaccinated ? 'text-emerald-400' : 'text-amber-400'}>
                    {inspectPet.health.isVaccinated ? '✓ Đã tiêm đầy đủ' : '✕ Chưa'}
                  </b>
                </div>
                <div className="p-3 bg-stone-950 rounded-xl border border-stone-800">
                  <span className="text-stone-400 block text-[10px]">{isEn ? 'Rabies Vaccine:' : 'Tiêm dại:'}</span>
                  <b className={inspectPet.health.isRabiesVaccinated ? 'text-emerald-400' : 'text-amber-400'}>
                    {inspectPet.health.isRabiesVaccinated ? '✓ Đã tiêm dại' : '✕ Chưa'}
                  </b>
                </div>
                <div className="p-3 bg-stone-950 rounded-xl border border-stone-800">
                  <span className="text-stone-400 block text-[10px]">{isEn ? 'Dewormed:' : 'Tẩy giun:'}</span>
                  <b className={inspectPet.health.isDewormed ? 'text-emerald-400' : 'text-stone-400'}>
                    {inspectPet.health.isDewormed ? '✓ Định kỳ' : '✕ Chưa'}
                  </b>
                </div>
              </div>
            </div>

            {/* Poster Info */}
            <div className="p-4 bg-stone-950 rounded-2xl border border-stone-800 flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                <img
                  src={inspectPet.creatorUserAvatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100'}
                  alt=""
                  className="w-10 h-10 rounded-xl object-cover ring-1 ring-stone-700"
                />
                <div>
                  <span className="font-bold text-white block">{inspectPet.creatorUserName}</span>
                  <span className="text-stone-400 text-[11px]">{translateAddress(inspectPet.location, language)}</span>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-emerald-950 border border-emerald-800 text-emerald-400 text-[10px] font-bold">
                {isEn ? 'Verified Poster' : 'Chủ tài khoản xác minh'}
              </span>
            </div>

            {/* Bottom Actions */}
            <div className="flex justify-end gap-3 pt-3 border-t border-stone-800">
              <button
                onClick={() => handleOpenRejectModal(inspectPet)}
                className="px-5 py-2.5 rounded-xl bg-rose-900/60 hover:bg-rose-800 text-rose-200 text-xs font-bold cursor-pointer transition flex items-center gap-1.5"
              >
                <XCircle className="w-4 h-4" />
                <span>{isEn ? 'Decline Listing...' : 'Từ chối tin này...'}</span>
              </button>

              <button
                onClick={() => handleApprove(inspectPet.id)}
                className="px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-lg transition"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{isEn ? 'Approve for Publishing' : 'Phê duyệt xuất bản'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DECLINE / REJECTION REASON MODAL */}
      {rejectingPet && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fade-in text-left">
          <div className="bg-stone-900 rounded-3xl max-w-lg w-full p-6 space-y-5 border border-stone-800 text-stone-100 shadow-2xl">
            
            <div className="flex items-center justify-between pb-3 border-b border-stone-800">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-xl bg-rose-500/20 text-rose-400">
                  <AlertTriangle className="w-5 h-5" />
                </span>
                <h3 className="font-bold text-white text-base">
                  {isEn ? `Decline Listing: ${rejectingPet.name}` : `Lý do từ chối bài đăng: ${rejectingPet.name}`}
                </h3>
              </div>
              <button onClick={() => setRejectingPet(null)} className="text-stone-400 hover:text-white cursor-pointer p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-stone-400 leading-relaxed">
              {isEn 
                ? 'Please specify the exact reason for declining so the pet poster can adjust and resubmit compliant information.' 
                : 'Vui lòng chọn hoặc nhập lý do từ chối cụ thể để gửi thông báo hướng dẫn người đăng chỉnh sửa hợp lệ.'}
            </p>

            {/* Preset reasons */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-stone-300 block">
                {isEn ? 'Quick Preset Reason:' : 'Chọn lý do có sẵn:'}
              </label>
              <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
                {presetReasons.map((preset, idx) => (
                  <label 
                    key={idx}
                    className={`flex items-start gap-2.5 p-2.5 rounded-xl border text-xs cursor-pointer transition ${
                      selectedPresetReason === preset
                        ? 'bg-rose-950/40 border-rose-800 text-rose-200'
                        : 'bg-stone-950 border-stone-800 text-stone-300 hover:bg-stone-800'
                    }`}
                  >
                    <input
                      type="radio"
                      name="presetDeclineReason"
                      value={preset}
                      checked={selectedPresetReason === preset}
                      onChange={() => setSelectedPresetReason(preset)}
                      className="mt-0.5 text-rose-600 focus:ring-rose-500"
                    />
                    <span className="leading-snug">{preset}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Custom Notes */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-stone-300 block">
                {isEn ? 'Custom Details / Specific Instructions for Poster:' : 'Ghi chú chi tiết thêm cho người đăng (tùy chọn):'}
              </label>
              <textarea
                rows={3}
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                placeholder={isEn ? 'E.g., Please upload a photo of the vaccination booklet showing rabies stamp...' : 'Ví dụ: Vui lòng chụp rõ trang sổ khám có dấu mộc tiêm phòng dại gần nhất...'}
                className="w-full px-3.5 py-2.5 rounded-2xl bg-stone-950 border border-stone-800 text-xs text-stone-200 focus:ring-2 focus:ring-rose-500 placeholder-stone-500"
              />
            </div>

            {/* Modal Actions */}
            <div className="flex justify-end gap-2 pt-3 border-t border-stone-800">
              <button
                onClick={() => setRejectingPet(null)}
                className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-bold cursor-pointer transition"
              >
                {isEn ? 'Cancel' : 'Hủy bỏ'}
              </button>

              <button
                onClick={handleConfirmReject}
                className="px-5 py-2 rounded-xl bg-rose-700 hover:bg-rose-600 text-white text-xs font-bold cursor-pointer transition shadow-md"
              >
                {isEn ? 'Confirm Decline' : 'Xác nhận từ chối'}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
