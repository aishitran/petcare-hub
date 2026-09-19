import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { StatusBadge } from '../../components/common/StatusBadge';
import { AdoptionWizardModal } from '../../components/user/AdoptionWizardModal';
import { translateAddress } from '../../utils/addressTranslator';
import { translateBreed, translateAgeDisplay, translatePersonalityTag } from '../../utils/petTranslator';
import { translateDynamicText } from '../../utils/dataTranslator';
import { 
  Heart, 
  MapPin, 
  Calendar, 
  ShieldCheck, 
  Sparkles, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  Share2, 
  ArrowLeft, 
  Phone, 
  Check, 
  Award,
  Info,
  UserCheck
} from 'lucide-react';

interface PetDetailPageProps {
  petId: string;
  navigate: (path: string) => void;
}

export const PetDetailPage: React.FC<PetDetailPageProps> = ({ petId, navigate }) => {
  const { getPetById } = useData();
  const { currentUser, isSavedPet, toggleSavePet, role } = useAuth();
  const { language, t } = useLanguage();
  const isEn = language === 'en';

  const petRaw = getPetById(petId);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isAdoptionModalOpen, setIsAdoptionModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!petRaw) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100">
          {isEn ? 'Pet Profile Not Found' : 'Không tìm thấy thông tin thú cưng'}
        </h2>
        <p className="text-xs text-stone-500 dark:text-stone-400">
          {isEn ? 'This pet listing might have been removed or the ID is invalid.' : 'Thú cưng này có thể đã được gỡ hoặc mã ID không tồn tại.'}
        </p>
        <button
          onClick={() => navigate('/pets')}
          className="px-5 py-2.5 rounded-xl bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 font-bold text-xs hover:bg-black transition cursor-pointer"
        >
          {isEn ? 'Back to Pets Listing' : 'Quay lại danh sách'}
        </button>
      </div>
    );
  }

  const pet = petRaw;
  const isSaved = isSavedPet(pet.id);
  const isOwner = currentUser?.id === pet.creatorUserId;
  const canApply = pet.status === 'WAITING' || pet.status === 'UNDER_REVIEW';

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const translatedBreed = translateBreed(pet.breed, language);
  const translatedDesc = translateDynamicText(pet.description, language);
  const translatedAge = translateAgeDisplay(pet.ageDisplay || pet.age, language);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-left">
      
      {/* Back link & Actions */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/pets')}
          className="inline-flex items-center gap-2 text-xs font-bold text-stone-600 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white transition cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{isEn ? 'Back to all pets' : 'Quay lại danh sách thú cưng'}</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShare}
            className="px-3.5 py-2 rounded-xl bg-white dark:bg-stone-850 border border-stone-200 dark:border-stone-700 hover:bg-stone-50 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-200 text-xs font-bold transition flex items-center gap-1.5 shadow-2xs cursor-pointer"
          >
            <span>{copied ? (isEn ? 'Link Copied!' : 'Đã sao chép link') : (isEn ? 'Share' : 'Chia sẻ')}</span>
          </button>

          <button
            onClick={() => toggleSavePet(pet.id)}
            className={`px-3.5 py-2 rounded-xl border text-xs font-bold transition flex items-center gap-1.5 shadow-2xs cursor-pointer ${
              isSaved
                ? 'bg-rose-50 dark:bg-rose-950/60 border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300'
                : 'bg-white dark:bg-stone-850 border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-200 hover:bg-stone-50 dark:hover:bg-stone-800'
            }`}
          >
            <span>{isSaved ? t('pets.saved') : t('pets.savePet')}</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Gallery + Pet Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: Image Gallery & Health Highlights */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Main Large Photo */}
          <div className="relative rounded-3xl overflow-hidden bg-stone-900 shadow-md border border-stone-200 dark:border-stone-800 aspect-[4/3]">
            <img
              src={pet.photos[activeImageIndex] || pet.photos[0]}
              alt={pet.name}
              className="w-full h-full object-cover"
            />
            
            <div className="absolute top-4 left-4">
              <StatusBadge status={pet.status} />
            </div>

            {pet.photos.length > 1 && (
              <div className="absolute bottom-4 right-4 bg-stone-900/80 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-full">
                {activeImageIndex + 1} / {pet.photos.length}
              </div>
            )}
          </div>

          {/* Thumbnails row */}
          {pet.photos.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {pet.photos.map((url, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-20 h-20 rounded-2xl overflow-hidden shrink-0 border-2 transition cursor-pointer ${
                    activeImageIndex === idx ? 'border-stone-900 dark:border-amber-400 ring-2 ring-stone-900/20' : 'border-stone-200 dark:border-stone-700 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={url} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Quick Specifications Grid */}
          <div className="bg-white dark:bg-stone-900 p-5 rounded-3xl border border-stone-200/80 dark:border-stone-800 shadow-2xs grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div className="p-3 bg-stone-50 dark:bg-stone-800 rounded-2xl">
              <span className="text-[10px] font-bold text-stone-500 dark:text-stone-400 uppercase block">{t('pets.filterGender')}</span>
              <span className="text-sm font-black text-stone-900 dark:text-stone-100">{pet.gender === 'MALE' ? t('common.male') : t('common.female')}</span>
            </div>
            <div className="p-3 bg-stone-50 dark:bg-stone-800 rounded-2xl">
              <span className="text-[10px] font-bold text-stone-500 dark:text-stone-400 uppercase block">{t('pets.filterAge')}</span>
              <span className="text-sm font-black text-stone-900 dark:text-stone-100">{translatedAge}</span>
            </div>
            <div className="p-3 bg-stone-50 dark:bg-stone-800 rounded-2xl">
              <span className="text-[10px] font-bold text-stone-500 dark:text-stone-400 uppercase block">{isEn ? 'Weight' : 'Cân nặng'}</span>
              <span className="text-sm font-black text-stone-900 dark:text-stone-100">{pet.weightKg || (pet.health && pet.health.weightKg) || 8} kg</span>
            </div>
            <div className="p-3 bg-stone-50 dark:bg-stone-800 rounded-2xl">
              <span className="text-[10px] font-bold text-stone-500 dark:text-stone-400 uppercase block">{t('pets.filterSize')}</span>
              <span className="text-sm font-black text-stone-900 dark:text-stone-100">
                {pet.size === 'SMALL' 
                  ? (isEn ? 'Small (< 10kg)' : 'Nhỏ (< 10kg)') 
                  : pet.size === 'MEDIUM' 
                  ? (isEn ? 'Medium (10-25kg)' : 'Vừa (10-25kg)') 
                  : (isEn ? 'Large (> 25kg)' : 'Lớn (> 25kg)')}
              </span>
            </div>
          </div>

          {/* Poster's Heartfelt Story / Re-homing Reason */}
          {(pet.rehomingReason || pet.adoptionReqs?.postingReason || pet.requirements?.postingReason) && (
            <div className="bg-gradient-to-br from-[#fde2cd]/80 via-[#f8eade]/60 to-[#faf4ee] dark:from-stone-900 dark:via-stone-900 dark:to-stone-950 p-6 rounded-3xl border border-[#f0ceb2] dark:border-stone-800 shadow-2xs space-y-3">
              <div className="flex items-center justify-between gap-3 border-b border-[#efe2d3] dark:border-stone-800 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-[#d46b28] text-white flex items-center justify-center shrink-0 shadow-xs">
                    <Heart className="w-4 h-4 fill-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-stone-900 dark:text-stone-100 text-sm sm:text-base font-display">
                      {isEn ? `Message & Re-homing Reason from ${pet.creatorUserName}` : `Lời tâm sự & Lý do tìm chủ mới từ ${pet.creatorUserName}`}
                    </h3>
                    <span className="text-[11px] text-[#9c3810] dark:text-amber-400 font-medium">
                      {isEn ? 'Sincere sharing from the current caregiver' : 'Chia sẻ từ người trực tiếp nuôi dưỡng / cứu hộ bé'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="relative pl-3.5 border-l-2 border-[#d46b28] dark:border-amber-400 py-1">
                <p className="text-xs sm:text-sm text-[#2b2523] dark:text-stone-200 leading-relaxed italic font-normal">
                  "{translateDynamicText(pet.rehomingReason || pet.adoptionReqs?.postingReason || pet.requirements?.postingReason || '', language)}"
                </p>
              </div>

              <div className="p-2.5 rounded-xl bg-white/80 dark:bg-stone-950/60 text-[11px] text-[#665851] dark:text-stone-400 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#d46b28] shrink-0" />
                <span>
                  {isEn 
                    ? 'Petcare Hub connects adopters with empathy. Sincere sharing ensures pets transition into loving, prepared families.' 
                    : 'Petcare Hub kết nối dựa trên sự thấu hiểu và tình thương. Lời chia sẻ chân thành giúp bạn nhỏ tìm được đúng gia đình phù hợp nhất.'}
                </span>
              </div>
            </div>
          )}

          {/* Pet Story & History */}
          <div className="bg-white dark:bg-stone-900 p-6 rounded-3xl border border-stone-200/80 dark:border-stone-800 shadow-2xs space-y-4">
            <h3 className="font-bold text-stone-900 dark:text-stone-100 text-base font-display">
              {isEn ? `Story & Background of ${pet.name}` : `Câu chuyện & Hoàn cảnh của ${pet.name}`}
            </h3>
            <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed whitespace-pre-line font-normal">
              {translatedDesc}
            </p>
          </div>

          {/* Health & Medical History */}
          <div className="bg-white dark:bg-stone-900 p-6 rounded-3xl border border-stone-200/80 dark:border-stone-800 shadow-2xs space-y-4">
            <h3 className="font-bold text-stone-900 dark:text-stone-100 text-base font-display">
              {t('pets.medicalHistory')}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-stone-50 dark:bg-stone-800 text-xs">
                <span className={`w-2 h-2 rounded-full shrink-0 ${pet.health.isVaccinated || pet.health.vaccinated ? 'bg-emerald-600' : 'bg-rose-500'}`}></span>
                <span className="font-semibold text-stone-800 dark:text-stone-200">
                  {pet.health.isVaccinated || pet.health.vaccinated 
                    ? (isEn ? 'Vaccinated (Core Diseases)' : 'Đã tiêm phòng bệnh') 
                    : (isEn ? 'Not Yet Vaccinated' : 'Chưa tiêm phòng')}
                </span>
              </div>

              <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-stone-50 dark:bg-stone-800 text-xs">
                <span className={`w-2 h-2 rounded-full shrink-0 ${pet.health.isSterilized || pet.health.neutered ? 'bg-emerald-600' : 'bg-amber-500'}`}></span>
                <span className="font-semibold text-stone-800 dark:text-stone-200">
                  {pet.health.isSterilized || pet.health.neutered 
                    ? (isEn ? 'Spayed / Neutered' : 'Đã triệt sản') 
                    : (isEn ? 'Not Yet Neutered' : 'Chưa triệt sản')}
                </span>
              </div>

              <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-stone-50 dark:bg-stone-800 text-xs">
                <span className={`w-2 h-2 rounded-full shrink-0 ${pet.health.isRabiesVaccinated || pet.health.vaccinated ? 'bg-emerald-600' : 'bg-rose-500'}`}></span>
                <span className="font-semibold text-stone-800 dark:text-stone-200">
                  {pet.health.isRabiesVaccinated || pet.health.vaccinated 
                    ? (isEn ? 'Rabies Shot Completed' : 'Đã tiêm phòng dại') 
                    : (isEn ? 'No Rabies Shot' : 'Chưa tiêm dại')}
                </span>
              </div>

              <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-stone-50 dark:bg-stone-800 text-xs">
                <span className={`w-2 h-2 rounded-full shrink-0 ${pet.health.isDewormed || pet.health.dewormed ? 'bg-emerald-600' : 'bg-stone-400'}`}></span>
                <span className="font-semibold text-stone-800 dark:text-stone-200">
                  {pet.health.isDewormed || pet.health.dewormed 
                    ? (isEn ? 'Dewormed Routinely' : 'Đã tẩy giun định kỳ') 
                    : (isEn ? 'Not Dewormed' : 'Chưa tẩy giun')}
                </span>
              </div>
            </div>

            {(pet.health.medicalNotes || pet.health.conditionDescription) && (
              <div className="p-3.5 bg-stone-50 dark:bg-stone-800 rounded-2xl border border-stone-200/80 dark:border-stone-700 text-xs text-stone-800 dark:text-stone-200 space-y-1">
                <span className="font-bold block text-stone-900 dark:text-stone-100">{isEn ? 'Medical Notes:' : 'Ghi chú y tế:'}</span>
                <p className="text-stone-600 dark:text-stone-400">
                  {translateDynamicText(pet.health.medicalNotes || pet.health.conditionDescription, language)}
                </p>
              </div>
            )}
          </div>

        </div>

        {/* RIGHT COLUMN: Action Card & Poster Info */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Header & Primary Apply Card */}
          <div className="bg-white dark:bg-stone-900 p-6 rounded-3xl border border-stone-200/80 dark:border-stone-800 shadow-2xs space-y-5 sticky top-24">
            
            <div className="space-y-2 border-b border-stone-100 dark:border-stone-800 pb-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-stone-600 dark:text-stone-400">
                <span>{pet.species === 'DOG' ? t('common.dog') : t('common.cat')}</span>
                <span>•</span>
                <span>{translatedBreed}</span>
              </div>
              <h1 className="text-3xl font-black text-stone-900 dark:text-stone-100 font-display">{pet.name}</h1>
              
              <div className="flex items-center gap-1.5 text-xs text-stone-600 dark:text-stone-400 font-medium">
                <MapPin className="w-3.5 h-3.5 text-[#d46b28] dark:text-amber-400" />
                <span>{translateAddress(pet.location, language)}</span>
              </div>
            </div>

            {/* Adoption Fee Box */}
            <div className="p-4 bg-[#faf4ee] dark:bg-stone-950 rounded-2xl border border-[#efe2d3] dark:border-stone-800 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-stone-500 dark:text-stone-400 uppercase block">
                  {isEn ? 'Adoption Fee / Symbolic Pledge:' : 'Phí nhận nuôi / Vía tượng trưng:'}
                </span>
                <span className="text-lg font-black text-stone-900 dark:text-stone-100">
                  {pet.adoptionFee && pet.adoptionFee > 0 
                    ? `${pet.adoptionFee.toLocaleString('vi-VN')} VND` 
                    : (isEn ? 'Free Adoption (0 VND)' : 'Miễn phí nhận nuôi (0 VNĐ)')}
                </span>
              </div>
            </div>

            {/* Personality Tags */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-stone-800 dark:text-stone-200 block">{t('pets.traits')}</span>
              <div className="flex flex-wrap gap-1.5">
                {(pet.personality.traits || pet.personality.tags || []).map(tr => (
                  <span key={tr} className="px-2.5 py-1 rounded-xl bg-[#fde2cd] dark:bg-amber-950/70 text-[#9c3810] dark:text-amber-300 text-xs font-semibold">
                    {translatePersonalityTag(tr, language)}
                  </span>
                ))}
              </div>
            </div>

            {/* Adoption Requirements Checklist */}
            <div className="space-y-2.5 pt-3 border-t border-stone-100 dark:border-stone-800">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-stone-900 dark:text-stone-100 block">{t('pets.adoptionCriteria')}</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300">
                  {((pet.requirements?.conditions || pet.adoptionReqs?.conditions || []).length || 3)} {isEn ? 'criteria' : 'tiêu chí'}
                </span>
              </div>

              <ul className="text-xs text-stone-700 dark:text-stone-300 space-y-2">
                {pet.requirements?.housingType && pet.requirements.housingType !== 'ANY' && (
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <span>
                      {isEn ? 'Housing: ' : 'Môi trường: '}
                      <b>
                        {pet.requirements.housingType === 'HOUSE' 
                          ? (isEn ? 'Private house with fenced yard/gate' : 'Nhà riêng có sân vườn/cổng rào') 
                          : (isEn ? 'Pet-friendly apartment / condo' : 'Căn hộ/Chung cư cho phép nuôi thú cưng')}
                      </b>
                    </span>
                  </li>
                )}
                
                {/* Specific conditions list */}
                {(pet.requirements?.conditions || pet.adoptionReqs?.conditions || [
                  'Không xích nhốt liên tục, có không gian vận động thoáng mát',
                  'Tất cả thành viên trong gia đình/bạn cùng phòng đồng thuận nhận nuôi',
                  'Tài chính ổn định, sẵn sàng chi trả khám chữa bệnh & tiêm phòng định kỳ',
                  'Đồng ý cập nhật hình ảnh/video tình trạng bé định kỳ (1-3 tháng đầu)'
                ]).map((cond, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <span className="leading-snug">{translateDynamicText(cond, language)}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Primary Action Button */}
            <div className="pt-3 border-t border-stone-100 dark:border-stone-800 space-y-2">
              {isOwner ? (
                <div className="p-3 bg-stone-100 dark:bg-stone-800 rounded-2xl text-center text-xs font-bold text-stone-700 dark:text-stone-300">
                  {isEn ? 'You posted this pet profile' : 'Đây là tin thú cưng do bạn đăng tải'}
                </div>
              ) : canApply ? (
                <button
                  onClick={() => setIsAdoptionModalOpen(true)}
                  className="w-full py-3.5 rounded-2xl bg-[#d46b28] hover:bg-[#ba591a] text-white text-xs font-bold tracking-wide shadow-sm transition cursor-pointer"
                >
                  {isEn ? `Apply to Adopt ${pet.name}` : `Nộp đơn nhận nuôi bé ${pet.name}`}
                </button>
              ) : (
                <div className="p-3 bg-stone-100 dark:bg-stone-800 rounded-2xl text-center text-xs font-bold text-stone-500 dark:text-stone-400">
                  {isEn ? 'This pet is already adopted or applications are paused' : 'Thú cưng này hiện đã có chủ mới hoặc tạm ngưng nhận đơn'}
                </div>
              )}

              <button
                onClick={() => navigate(`/reports?targetType=PET&targetId=${pet.id}`)}
                className="w-full py-2 text-center text-[11px] font-semibold text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 transition cursor-pointer"
              >
                {isEn ? 'Report this post for violation' : 'Báo cáo tin đăng có dấu hiệu vi phạm'}
              </button>
            </div>

          </div>

          {/* Poster Profile Card */}
          <div className="bg-white dark:bg-stone-900 p-5 rounded-3xl border border-stone-200/80 dark:border-stone-800 shadow-2xs space-y-4">
            <span className="text-[11px] font-bold text-stone-500 dark:text-stone-400 uppercase block tracking-wider">
              {isEn ? 'Poster Profile' : 'Thông tin người đăng tin'}
            </span>
            <div className="flex items-center gap-3">
              <img
                src={pet.creatorUserAvatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100'}
                alt={pet.creatorUserName}
                className="w-12 h-12 rounded-2xl object-cover ring-1 ring-stone-200 dark:ring-stone-700"
              />
              <div className="min-w-0">
                <h4 className="font-bold text-stone-900 dark:text-stone-100 text-sm truncate">{pet.creatorUserName}</h4>
                <div className="flex items-center gap-1.5 text-[11px] text-stone-600 dark:text-stone-400 font-medium mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  <span>{isEn ? 'Verified Member' : 'Thành viên đã xác minh'}</span>
                </div>
              </div>
            </div>

            <div className="p-3 bg-stone-50 dark:bg-stone-800 rounded-2xl text-xs text-stone-600 dark:text-stone-300 space-y-1">
              <div className="flex justify-between">
                <span className="text-stone-500 dark:text-stone-400">{isEn ? 'Active Area:' : 'Khu vực hoạt động:'}</span>
                <span className="font-bold text-stone-900 dark:text-stone-100">{translateAddress(pet.location, language)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500 dark:text-stone-400">{isEn ? 'Response Time:' : 'Thời gian phản hồi:'}</span>
                <span className="font-bold text-stone-900 dark:text-stone-100">{isEn ? 'Within 24 hours' : 'Trong vòng 24 giờ'}</span>
              </div>
            </div>
          </div>

          {/* Safety Notice */}
          <div className="p-4 bg-stone-900 text-stone-300 rounded-3xl space-y-1.5 text-xs border border-stone-800">
            <div className="text-white font-bold text-xs">
              {isEn ? 'Safety Notice from PetCare Hub' : 'Lưu ý an toàn từ PetCare Hub'}
            </div>
            <p className="text-stone-400 leading-relaxed text-[11px]">
              {isEn 
                ? 'All adoptions require completing the survey form and signing the digital handover commitment. Never transfer advance deposit fees prior to meeting the rescuer in person.' 
                : 'Tất cả các ca nhận nuôi đều cần hoàn thành mẫu khảo sát và ký cam kết bàn giao. Tuyệt đối không chuyển tiền cọc cá nhân trước khi phỏng vấn và gặp mặt trực tiếp.'}
            </p>
          </div>

        </div>

      </div>

      {/* ADOPTION WIZARD MODAL */}
      {isAdoptionModalOpen && (
        <AdoptionWizardModal
          pet={pet}
          isOpen={isAdoptionModalOpen}
          onClose={() => setIsAdoptionModalOpen(false)}
          onSuccessNavigate={(appId) => {
            setIsAdoptionModalOpen(false);
            navigate('/applications');
          }}
        />
      )}

    </div>
  );
};
