import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { StatusBadge } from '../../components/common/StatusBadge';
import { AdoptionWizardModal } from '../../components/user/AdoptionWizardModal';
import { ReportModal } from '../../components/common/ReportModal';
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
  UserCheck,
  MessageSquare,
  ShieldAlert,
  Flag
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
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [reportTargetType, setReportTargetType] = useState<'PET_POST' | 'USER'>('PET_POST');
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

  const handleOpenDirectChat = () => {
    window.dispatchEvent(
      new CustomEvent('open-direct-chat', {
        detail: {
          targetUserId: pet.creatorUserId,
          targetUserName: pet.creatorUserName,
          targetUserAvatar: pet.creatorUserAvatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100',
          targetUserRole: isEn ? 'Fosterer / Post Owner' : 'Người đăng tin & Fosterer',
          targetPetName: pet.name,
          targetPetAvatar: pet.photos[0],
          targetPetBreed: pet.breed
        }
      })
    );
  };

  const openReportForPet = () => {
    setReportTargetType('PET_POST');
    setIsReportModalOpen(true);
  };

  const openReportForUser = () => {
    setReportTargetType('USER');
    setIsReportModalOpen(true);
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
              className="w-full h-full object-cover transition duration-300"
            />
            
            <div className="absolute top-3.5 left-3.5">
              <StatusBadge status={pet.status} />
            </div>

            {/* Rescue / Verified badge */}
            <div className="absolute bottom-3.5 left-3.5 flex items-center gap-2">
              <span className="px-3 py-1 rounded-xl bg-black/60 backdrop-blur-md text-white text-[11px] font-bold flex items-center gap-1 border border-white/20">
                <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
                <span>{isEn ? 'Verified Medical Records' : 'Đã kiểm tra sổ khám y tế'}</span>
              </span>
            </div>
          </div>

          {/* Thumbnail Strip */}
          {pet.photos.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {pet.photos.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-20 h-20 rounded-2xl overflow-hidden shrink-0 border-2 transition cursor-pointer ${
                    activeImageIndex === idx
                      ? 'border-[#d46b28] scale-105 shadow-sm'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Quick Pet Bio & Specs Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 bg-white dark:bg-stone-900 rounded-2xl border border-stone-200/80 dark:border-stone-800 shadow-2xs text-center space-y-0.5">
              <span className="text-[10px] text-stone-500 dark:text-stone-400 uppercase font-bold tracking-wider">{t('pets.specBreed', 'Giống loài')}</span>
              <p className="text-xs font-bold text-stone-900 dark:text-stone-100 truncate">{translatedBreed}</p>
            </div>
            
            <div className="p-3.5 bg-white dark:bg-stone-900 rounded-2xl border border-stone-200/80 dark:border-stone-800 shadow-2xs text-center space-y-0.5">
              <span className="text-[10px] text-stone-500 dark:text-stone-400 uppercase font-bold tracking-wider">{t('pets.specAge', 'Độ tuổi')}</span>
              <p className="text-xs font-bold text-stone-900 dark:text-stone-100">{translatedAge}</p>
            </div>

            <div className="p-3.5 bg-white dark:bg-stone-900 rounded-2xl border border-stone-200/80 dark:border-stone-800 shadow-2xs text-center space-y-0.5">
              <span className="text-[10px] text-stone-500 dark:text-stone-400 uppercase font-bold tracking-wider">{t('pets.specGender', 'Giới tính')}</span>
              <p className="text-xs font-bold text-stone-900 dark:text-stone-100">
                {pet.gender === 'MALE' ? t('common.male') : t('common.female')}
              </p>
            </div>

            <div className="p-3.5 bg-white dark:bg-stone-900 rounded-2xl border border-stone-200/80 dark:border-stone-800 shadow-2xs text-center space-y-0.5">
              <span className="text-[10px] text-stone-500 dark:text-stone-400 uppercase font-bold tracking-wider">{t('pets.specSize', 'Kích cỡ')}</span>
              <p className="text-xs font-bold text-stone-900 dark:text-stone-100">
                {pet.size === 'SMALL' 
                  ? (isEn ? 'Small (<5kg)' : 'Nhỏ (<5kg)') 
                  : pet.size === 'LARGE' 
                  ? (isEn ? 'Large (>15kg)' : 'Lớn (>15kg)') 
                  : (isEn ? 'Medium (5-15kg)' : 'Vừa (5-15kg)')}
              </p>
            </div>
          </div>

          {/* Detailed Story & Personality Section */}
          <div className="bg-white dark:bg-stone-900 p-6 rounded-3xl border border-stone-200/80 dark:border-stone-800 shadow-2xs space-y-4">
            <h3 className="font-bold text-stone-900 dark:text-stone-100 text-base flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#d46b28] dark:text-amber-400" />
              <span>{isEn ? `About ${pet.name} & Rescue Story` : `Câu chuyện & Đặc điểm của ${pet.name}`}</span>
            </h3>

            <div className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed space-y-3 whitespace-pre-line">
              {translatedDesc}
            </div>

            {/* Rehoming Reason if provided */}
            {pet.rehomingReason && (
              <div className="p-4 bg-amber-50/80 dark:bg-amber-950/40 rounded-2xl border border-amber-200/70 dark:border-amber-900/50 text-xs text-amber-950 dark:text-amber-200 space-y-1">
                <span className="font-bold flex items-center gap-1.5 text-[#9c3810] dark:text-amber-400">
                  <Info className="w-3.5 h-3.5" />
                  <span>{isEn ? 'Reason for Rehoming / Rescue Context:' : 'Hoàn cảnh cứu hộ & Lý do tìm chủ mới:'}</span>
                </span>
                <p className="text-stone-700 dark:text-stone-300 leading-relaxed">
                  {translateDynamicText(pet.rehomingReason, language)}
                </p>
              </div>
            )}
          </div>

          {/* Health & Medical Background */}
          <div className="bg-white dark:bg-stone-900 p-6 rounded-3xl border border-stone-200/80 dark:border-stone-800 shadow-2xs space-y-4">
            <h3 className="font-bold text-stone-900 dark:text-stone-100 text-base flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
              <span>{t('pets.healthSection', 'Tình trạng Sức khỏe & Y tế')}</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-stone-50 dark:bg-stone-800 text-xs">
                <span className={`w-2 h-2 rounded-full shrink-0 ${pet.health.isSterilized ? 'bg-emerald-600' : 'bg-amber-500'}`}></span>
                <span className="font-semibold text-stone-800 dark:text-stone-200">
                  {pet.health.isSterilized 
                    ? (isEn ? 'Neutered / Spayed' : 'Đã triệt sản') 
                    : (isEn ? 'Not Yet Neutered' : 'Chưa triệt sản')}
                </span>
              </div>

              <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-stone-50 dark:bg-stone-800 text-xs">
                <span className={`w-2 h-2 rounded-full shrink-0 ${pet.health.isVaccinated ? 'bg-emerald-600' : 'bg-amber-500'}`}></span>
                <span className="font-semibold text-stone-800 dark:text-stone-200">
                  {pet.health.isVaccinated 
                    ? (isEn ? 'Vaccinated (Core)' : 'Đã tiêm phòng đầy đủ') 
                    : (isEn ? 'Pending Vaccines' : 'Chưa tiêm phòng')}
                </span>
              </div>

              <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-stone-50 dark:bg-stone-800 text-xs">
                <span className={`w-2 h-2 rounded-full shrink-0 ${pet.health.isRabiesVaccinated ? 'bg-emerald-600' : 'bg-amber-500'}`}></span>
                <span className="font-semibold text-stone-800 dark:text-stone-200">
                  {pet.health.isRabiesVaccinated 
                    ? (isEn ? 'Rabies Vaccinated' : 'Đã tiêm phòng dại') 
                    : (isEn ? 'Rabies Vaccine Pending' : 'Chưa tiêm phòng dại')}
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

        {/* RIGHT COLUMN: Action Card & Poster Info (Layout Fixed: No overlapping sticky) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Header & Primary Apply Card */}
          <div className="bg-white dark:bg-stone-900 p-6 rounded-3xl border border-stone-200/80 dark:border-stone-800 shadow-2xs space-y-5">
            
            <div className="space-y-2 border-b border-stone-100 dark:border-stone-800 pb-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-stone-600 dark:text-stone-400">
                <span>{pet.species === 'DOG' ? t('common.dog') : pet.species === 'CAT' ? t('common.cat') : t('common.other')}</span>
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

            {/* Primary Action Buttons */}
            <div className="pt-3 border-t border-stone-100 dark:border-stone-800 space-y-2.5">
              {isOwner ? (
                <div className="p-3 bg-stone-100 dark:bg-stone-800 rounded-2xl text-center text-xs font-bold text-stone-700 dark:text-stone-300">
                  {isEn ? 'You posted this pet profile' : 'Đây là tin thú cưng do bạn đăng tải'}
                </div>
              ) : canApply ? (
                <div className="space-y-2">
                  <button
                    onClick={() => setIsAdoptionModalOpen(true)}
                    className="w-full py-3.5 rounded-2xl bg-[#d46b28] hover:bg-[#ba591a] text-white text-xs font-bold tracking-wide shadow-sm transition cursor-pointer"
                  >
                    {isEn ? `Apply to Adopt ${pet.name}` : `Nộp đơn nhận nuôi bé ${pet.name}`}
                  </button>

                  <button
                    onClick={handleOpenDirectChat}
                    className="w-full py-3 rounded-2xl bg-[#fde2cd] dark:bg-amber-950/70 hover:bg-[#fcd4b4] text-[#9c3810] dark:text-amber-300 text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>{isEn ? `Message ${pet.creatorUserName}` : `Nhắn tin cho người đăng (${pet.creatorUserName})`}</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="p-3 bg-stone-100 dark:bg-stone-800 rounded-2xl text-center text-xs font-bold text-stone-500 dark:text-stone-400">
                    {isEn ? 'This pet is already adopted or applications are paused' : 'Thú cưng này hiện đã có chủ mới hoặc tạm ngưng nhận đơn'}
                  </div>

                  <button
                    onClick={handleOpenDirectChat}
                    className="w-full py-2.5 rounded-2xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 text-stone-700 dark:text-stone-200 text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>{isEn ? 'Ask Poster a Question' : 'Nhắn tin hỏi thông tin người đăng'}</span>
                  </button>
                </div>
              )}

              <div className="pt-2 flex items-center justify-between text-[11px] text-stone-400">
                <button
                  onClick={openReportForPet}
                  className="hover:text-rose-600 dark:hover:text-rose-400 transition cursor-pointer flex items-center gap-1"
                >
                  <ShieldAlert className="w-3.5 h-3.5" />
                  <span>{isEn ? 'Report this pet listing' : 'Báo cáo tin đăng'}</span>
                </button>

                <button
                  onClick={openReportForUser}
                  className="hover:text-rose-600 dark:hover:text-rose-400 transition cursor-pointer flex items-center gap-1"
                >
                  <Flag className="w-3.5 h-3.5" />
                  <span>{isEn ? 'Report user account' : 'Báo cáo tài khoản'}</span>
                </button>
              </div>
            </div>

          </div>

          {/* Poster Profile Card */}
          <div className="bg-white dark:bg-stone-900 p-5 rounded-3xl border border-stone-200/80 dark:border-stone-800 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-stone-500 dark:text-stone-400 uppercase block tracking-wider">
                {isEn ? 'Poster Profile' : 'Thông tin người đăng tin'}
              </span>
              
              <button
                onClick={openReportForUser}
                className="text-[11px] font-semibold text-stone-400 hover:text-rose-500 transition cursor-pointer flex items-center gap-1"
              >
                <ShieldAlert className="w-3 h-3" />
                <span>{isEn ? 'Report Account' : 'Báo cáo'}</span>
              </button>
            </div>

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

            <button
              onClick={handleOpenDirectChat}
              className="w-full py-2.5 rounded-2xl bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer shadow-xs hover:bg-black dark:hover:bg-white"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>{isEn ? 'Direct Chat' : 'Gửi tin nhắn trực tiếp'}</span>
            </button>
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

      {/* REPORT MODAL */}
      {isReportModalOpen && (
        <ReportModal
          isOpen={isReportModalOpen}
          onClose={() => setIsReportModalOpen(false)}
          targetType={reportTargetType}
          targetId={reportTargetType === 'PET_POST' ? pet.id : pet.creatorUserId}
          targetTitle={reportTargetType === 'PET_POST' ? `Tin đăng bé ${pet.name} (${pet.breed})` : `Tài khoản ${pet.creatorUserName}`}
          targetUserName={pet.creatorUserName}
        />
      )}

    </div>
  );
};
