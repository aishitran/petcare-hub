import React, { useState } from 'react';
import { Pet } from '../../types/pet';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { useLanguage } from '../../context/LanguageContext';
import { translateAddress } from '../../utils/addressTranslator';
import { translateBreed } from '../../utils/petTranslator';
import { translateDynamicText } from '../../utils/dataTranslator';
import { X, ArrowRight, ArrowLeft } from 'lucide-react';

interface AdoptionWizardModalProps {
  isOpen: boolean;
  onClose: () => void;
  pet: Pet;
  onSuccessNavigate?: (appId: string) => void;
  onSuccess?: () => void;
}

export const AdoptionWizardModal: React.FC<AdoptionWizardModalProps> = ({
  isOpen,
  onClose,
  pet,
  onSuccessNavigate,
  onSuccess
}) => {
  const { currentUser } = useAuth();
  const { submitApplication } = useData();
  const { language, t } = useLanguage();
  const isEn = language === 'en';

  const [currentStep, setCurrentStep] = useState<number>(1);
  const totalSteps = 6;

  // Step 1: Personal Profile
  const [applicantName, setApplicantName] = useState(currentUser?.name || '');
  const [applicantEmail, setApplicantEmail] = useState(currentUser?.email || '');
  const [applicantPhone, setApplicantPhone] = useState(currentUser?.phone || '');
  const [applicantDob, setApplicantDob] = useState(currentUser?.dob || '1996-08-20');
  const [applicantAge, setApplicantAge] = useState<number>(28);
  const [applicantOccupation, setApplicantOccupation] = useState(currentUser?.occupation || (isEn ? 'Office Professional' : 'Nhân viên văn phòng'));
  const [applicantProvince, setApplicantProvince] = useState(currentUser?.location || 'TP. Hồ Chí Minh');
  const [applicantAddress, setApplicantAddress] = useState(currentUser?.address || 'Quận 7, TP. Hồ Chí Minh');

  // Step 2: Adoption Reason
  const [adoptionReason, setAdoptionReason] = useState(
    isEn 
      ? 'Our family loves animals and wants to welcome this little friend as an official family member.' 
      : 'Gia đình yêu thương thú cưng và muốn đón bé về chăm sóc như thành viên ruột thịt.'
  );
  const [reasonForChoosingPet, setReasonForChoosingPet] = useState(
    isEn 
      ? `Impressed by ${pet.name}'s lovely personality and touching rescue story.` 
      : `Ấn tượng với tính cách dễ thương và hoàn cảnh của bé ${pet.name}.`
  );

  // Step 3: Living Conditions
  const [housingType, setHousingType] = useState<'Nhà riêng' | 'Căn hộ chung cư' | 'Phòng trọ' | 'Khác'>('Nhà riêng');
  const [petsAllowedInBuilding, setPetsAllowedInBuilding] = useState(true);
  const [petLivingAreaDescription, setPetLivingAreaDescription] = useState(
    isEn 
      ? 'Airy living room, small private yard, and secure balcony netting installed.' 
      : 'Phòng khách thoáng mát, có sân nhỏ và đã lắp lưới ban công an toàn.'
  );
  const [householdMembersCount, setHouseholdMembersCount] = useState<number>(3);
  const [hasChildrenInHome, setHasChildrenInHome] = useState(false);
  const [hasPetAllergiesInHome, setHasPetAllergiesInHome] = useState(false);

  // Step 4: Pet Care Experience
  const [hasOwnedPetsBefore, setHasOwnedPetsBefore] = useState(true);
  const [previousPetSpeciesAndDuration, setPreviousPetSpeciesAndDuration] = useState(
    isEn ? 'Previously owned 1 dog for 4 years.' : 'Đã từng nuôi 1 bé chó ta trong 4 năm.'
  );
  const [currentlyHasPets, setCurrentlyHasPets] = useState(false);
  const [currentPetsCount, setCurrentPetsCount] = useState<number>(0);
  const [currentPetsDescription, setCurrentPetsDescription] = useState('');

  // Step 5: Care Capacity
  const [dailyHoursForPet, setDailyHoursForPet] = useState(isEn ? '3 - 4 hours / day' : '3 - 4 giờ / ngày');
  const [primaryCaregiver, setPrimaryCaregiver] = useState(isEn ? 'Self primary caregiver' : 'Bản thân trực tiếp chăm sóc');
  const [estimatedMonthlyBudget, setEstimatedMonthlyBudget] = useState(isEn ? '1,000,000 - 2,000,000 VND' : '1.000.000 - 2.000.000 VNĐ');
  const [medicalCareCapacity, setMedicalCareCapacity] = useState(true);
  const [emergencyVetClinicNamed, setEmergencyVetClinicNamed] = useState(isEn ? 'Nearby PetCare Vet Clinic' : 'Phòng khám Thú y PetCare gần nhà');
  const [travelOrAwayCarePlan, setTravelOrAwayCarePlan] = useState(
    isEn ? 'Leave with trusted relatives or take along when travelling.' : 'Gửi người thân hoặc mang theo nếu đi chơi xa.'
  );

  // Step 6: Commitments
  const [agreedToAccurateInfo, setAgreedToAccurateInfo] = useState(true);
  const [agreedToProperCare, setAgreedToProperCare] = useState(true);
  const [agreedNoSellingOrTrading, setAgreedNoSellingOrTrading] = useState(true);
  const [agreedNoAbandonment, setAgreedNoAbandonment] = useState(true);
  const [agreedToMedicalCare, setAgreedToMedicalCare] = useState(true);
  const [agreedToFollowConditions, setAgreedToFollowConditions] = useState(true);
  const [agreedToPostAdoptionCheckIns, setAgreedToPostAdoptionCheckIns] = useState(true);

  // Result state
  const [submittedResult, setSubmittedResult] = useState<{ appId: string; isBackup: boolean } | null>(null);

  if (!isOpen) return null;

  // Validation before submission
  const canProceed = () => {
    if (currentStep === 1) {
      return applicantName.trim() !== '' && applicantPhone.trim() !== '' && applicantAge >= 18;
    }
    if (currentStep === 2) {
      return adoptionReason.trim() !== '';
    }
    if (currentStep === 3) {
      return petLivingAreaDescription.trim() !== '';
    }
    if (currentStep === 6) {
      return agreedToAccurateInfo && agreedToProperCare && agreedNoSellingOrTrading && 
             agreedNoAbandonment && agreedToMedicalCare && agreedToPostAdoptionCheckIns;
    }
    return true;
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    const result = submitApplication({
      petId: pet.id,
      petName: pet.name,
      petAvatar: pet.avatar || (pet.photos && pet.photos[0]) || 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=400',
      petSpecies: pet.species,
      petBreed: pet.breed,
      posterUserId: pet.creatorUserId,
      posterUserName: pet.creatorUserName,
      applicantId: currentUser.id,
      applicantName,
      applicantEmail,
      applicantPhone,
      applicantDob,
      applicantAge,
      applicantOccupation,
      applicantProvince,
      applicantAddress,
      adoptionReason,
      reasonForChoosingPet,
      housingType,
      petsAllowedInBuilding,
      petLivingAreaDescription,
      householdMembersCount,
      hasChildrenInHome,
      hasPetAllergiesInHome,
      hasOwnedPetsBefore,
      previousPetSpeciesAndDuration,
      currentlyHasPets,
      currentPetsCount,
      currentPetsDescription,
      dailyHoursForPet,
      primaryCaregiver,
      estimatedMonthlyBudget,
      medicalCareCapacity,
      emergencyVetClinicNamed,
      travelOrAwayCarePlan,
      agreedToAccurateInfo,
      agreedToProperCare,
      agreedNoSellingOrTrading,
      agreedNoAbandonment,
      agreedToMedicalCare,
      agreedToFollowConditions,
      agreedToPostAdoptionCheckIns,
    });

    setSubmittedResult({
      appId: result.app.id,
      isBackup: result.isBackup
    });

    if (onSuccess) onSuccess();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-sm animate-fade-in text-left">
      <div className="bg-white dark:bg-stone-900 rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden transition-colors">
        
        {/* Header: Pet Summary */}
        <div className="p-5 sm:p-6 border-b border-stone-100 dark:border-stone-800 flex items-center justify-between gap-4 bg-[#faf4ee] dark:bg-stone-950 shrink-0">
          <div className="flex items-center gap-3.5">
            <img
              src={pet.avatar || (pet.photos && pet.photos[0]) || 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=200'}
              alt={pet.name}
              className="w-12 h-12 rounded-2xl object-cover ring-2 ring-[#d46b28]/30 shadow-2xs shrink-0"
            />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-stone-900 dark:text-stone-100 text-base">{t('wizard.modalTitle')} {pet.name}</h3>
                <span className="text-xs text-[#9c3810] dark:text-amber-300 font-semibold px-2 py-0.5 rounded-md bg-[#fde2cd] dark:bg-amber-950/70">
                  {pet.species === 'DOG' ? t('common.dog') : t('common.cat')} • {translateBreed(pet.breed, language)}
                </span>
              </div>
              <span className="text-xs text-stone-500 dark:text-stone-400">
                {t('pets.poster')}: <b className="text-stone-800 dark:text-stone-200">{pet.creatorUserName}</b> • {translateAddress(pet.location, language)}
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6 text-stone-800 dark:text-stone-200 text-xs">
          
          {submittedResult ? (
            /* SUBMISSION SUCCESS VIEW */
            <div className="py-8 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto text-lg font-bold shadow-xs">
                ✓
              </div>

              <div className="space-y-1 max-w-md mx-auto">
                <h3 className="text-2xl font-black text-stone-900 dark:text-stone-100 font-display">
                  {submittedResult.isBackup ? t('wizard.backupSuccessTitle') : t('wizard.successTitle')}
                </h3>
                <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                  {submittedResult.isBackup 
                    ? (isEn 
                        ? `Pet ${pet.name} currently has an active interview in progress. Your application has been placed in the priority backup queue.` 
                        : `Bé ${pet.name} hiện đang có đơn chính được duyệt phỏng vấn. Hồ sơ của bạn đã được xếp vào hàng đợi ưu tiên tiếp theo.`)
                    : (isEn 
                        ? `Your application has been sent to ${pet.creatorUserName}. They will contact you shortly to schedule an interview.` 
                        : `Hồ sơ của bạn đã được gửi tới ${pet.creatorUserName}. Người đăng tin sẽ sớm liên hệ đặt lịch phỏng vấn và gặp mặt trực tiếp.`)}
                </p>
              </div>

              <div className="p-4 bg-stone-50 dark:bg-stone-800 rounded-2xl border border-stone-200 dark:border-stone-700 max-w-md mx-auto text-xs text-stone-800 dark:text-stone-200 font-medium">
                {t('wizard.appCode')} <b className="font-mono text-[#d46b28] dark:text-amber-400">#{submittedResult.appId}</b>
              </div>

              <div className="pt-4 flex justify-center gap-3">
                <button
                  onClick={() => {
                    onClose();
                    if (onSuccessNavigate) onSuccessNavigate(submittedResult.appId);
                  }}
                  className="px-6 py-3 rounded-2xl bg-[#d46b28] hover:bg-[#ba591a] text-white font-bold text-xs shadow-md transition cursor-pointer"
                >
                  {t('wizard.goToApps')}
                </button>
              </div>
            </div>
          ) : (
            /* MULTI-STEP WIZARD FORM */
            <form onSubmit={handleFinalSubmit} className="space-y-6">
              
              {/* Step Tracker */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-stone-900 dark:text-stone-100 uppercase">
                    {t('common.step')} {currentStep} / {totalSteps}: {
                      currentStep === 1 ? t('wizard.step1Title') :
                      currentStep === 2 ? t('wizard.step2Title') :
                      currentStep === 3 ? t('wizard.step3Title') :
                      currentStep === 4 ? t('wizard.step4Title') :
                      currentStep === 5 ? t('wizard.step5Title') : t('wizard.step6Title')
                    }
                  </span>
                  <span className="font-bold text-stone-400">{Math.round((currentStep / totalSteps) * 100)}%</span>
                </div>
                <div className="w-full bg-stone-100 dark:bg-stone-800 h-1.5 rounded-full overflow-hidden">
                  <div 
                    className="bg-[#d46b28] h-full rounded-full transition-all duration-300"
                    style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                  />
                </div>
              </div>

              {/* STEP 1: Personal Profile */}
              {currentStep === 1 && (
                <div className="space-y-4">
                  <div className="p-3.5 bg-amber-50 dark:bg-amber-950/40 rounded-2xl border border-amber-200 dark:border-amber-900/40 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2.5">
                    <span className="text-sm">🔞</span>
                    <div>
                      <strong className="block font-bold mb-0.5">{t('wizard.step1Sub')}</strong>
                      <span className="text-[11px] text-amber-800 dark:text-amber-300">{t('pets.ageRequirementNotice')}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">{t('wizard.applicantName')}</label>
                      <input
                        type="text"
                        required
                        value={applicantName}
                        onChange={(e) => setApplicantName(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-xs focus:ring-2 focus:ring-[#d46b28] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">{t('wizard.applicantPhone')}</label>
                      <input
                        type="tel"
                        required
                        value={applicantPhone}
                        onChange={(e) => setApplicantPhone(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-xs focus:ring-2 focus:ring-[#d46b28] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">{t('wizard.applicantAge')}</label>
                      <input
                        type="number"
                        required
                        min="1"
                        max="100"
                        value={applicantAge}
                        onChange={(e) => setApplicantAge(parseInt(e.target.value) || 0)}
                        className={`w-full px-3 py-2 rounded-xl border text-xs bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none ${
                          applicantAge < 18 
                            ? 'border-rose-500 bg-rose-50/50 dark:bg-rose-950/40 text-rose-900 dark:text-rose-200 focus:ring-2 focus:ring-rose-500' 
                            : 'border-stone-300 dark:border-stone-700 focus:ring-2 focus:ring-[#d46b28]'
                        }`}
                      />
                      {applicantAge < 18 && (
                        <p className="text-[11px] text-rose-600 dark:text-rose-400 font-bold mt-1">
                          ⚠️ {t('wizard.ageError')}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">{t('wizard.applicantOccupation')}</label>
                      <input
                        type="text"
                        value={applicantOccupation}
                        onChange={(e) => setApplicantOccupation(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-xs focus:ring-2 focus:ring-[#d46b28] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">{t('wizard.applicantProvince')}</label>
                      <input
                        type="text"
                        value={applicantProvince}
                        onChange={(e) => setApplicantProvince(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-xs focus:ring-2 focus:ring-[#d46b28] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">{t('wizard.applicantAddress')}</label>
                    <input
                      type="text"
                      value={applicantAddress}
                      onChange={(e) => setApplicantAddress(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-xs"
                    />
                  </div>
                </div>
              )}

              {/* STEP 2: Motivation */}
              {currentStep === 2 && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">{t('wizard.adoptionReason')}</label>
                    <textarea
                      rows={3}
                      required
                      value={adoptionReason}
                      onChange={(e) => setAdoptionReason(e.target.value)}
                      placeholder={isEn ? 'Describe why you are seeking a companion...' : 'Mô tả lý do bạn tìm kiếm bạn đồng hành...'}
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-xs focus:ring-2 focus:ring-[#d46b28]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">{t('wizard.reasonForChoosingPet')}</label>
                    <textarea
                      rows={3}
                      value={reasonForChoosingPet}
                      onChange={(e) => setReasonForChoosingPet(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-xs focus:ring-2 focus:ring-[#d46b28]"
                    />
                  </div>
                </div>
              )}

              {/* STEP 3: Living Conditions */}
              {currentStep === 3 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">{t('wizard.housingType')}</label>
                      <select
                        value={housingType}
                        onChange={(e: any) => setHousingType(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-xs font-bold"
                      >
                        <option value="Nhà riêng">{t('wizard.housingHouse')}</option>
                        <option value="Căn hộ chung cư">{t('wizard.housingApt')}</option>
                        <option value="Phòng trọ">{t('wizard.housingRoom')}</option>
                        <option value="Khác">{t('wizard.housingOther')}</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">{t('wizard.householdCount')}</label>
                      <input
                        type="number"
                        min="1"
                        value={householdMembersCount}
                        onChange={(e) => setHouseholdMembersCount(parseInt(e.target.value) || 1)}
                        className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">{t('wizard.petLivingAreaDesc')}</label>
                    <textarea
                      rows={3}
                      required
                      value={petLivingAreaDescription}
                      onChange={(e) => setPetLivingAreaDescription(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-xs focus:ring-2 focus:ring-[#d46b28]"
                    />
                  </div>
                </div>
              )}

              {/* STEP 4: Experience */}
              {currentStep === 4 && (
                <div className="space-y-4">
                  <label className="flex items-center gap-2 p-3 bg-stone-50 dark:bg-stone-800 rounded-2xl cursor-pointer text-xs">
                    <input
                      type="checkbox"
                      checked={hasOwnedPetsBefore}
                      onChange={(e) => setHasOwnedPetsBefore(e.target.checked)}
                      className="w-4 h-4 text-[#d46b28] rounded"
                    />
                    <span className="font-bold text-stone-800 dark:text-stone-200">{t('wizard.hasOwnedPets')}</span>
                  </label>

                  {hasOwnedPetsBefore && (
                    <div>
                      <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">{t('wizard.previousPetsInfo')}</label>
                      <input
                        type="text"
                        value={previousPetSpeciesAndDuration}
                        onChange={(e) => setPreviousPetSpeciesAndDuration(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-xs"
                      />
                    </div>
                  )}

                  <label className="flex items-center gap-2 p-3 bg-stone-50 dark:bg-stone-800 rounded-2xl cursor-pointer text-xs">
                    <input
                      type="checkbox"
                      checked={currentlyHasPets}
                      onChange={(e) => setCurrentlyHasPets(e.target.checked)}
                      className="w-4 h-4 text-[#d46b28] rounded"
                    />
                    <span className="font-bold text-stone-800 dark:text-stone-200">{t('wizard.currentlyHasPets')}</span>
                  </label>
                </div>
              )}

              {/* STEP 5: Capacity */}
              {currentStep === 5 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">{t('wizard.dailyHours')}</label>
                      <input
                        type="text"
                        value={dailyHoursForPet}
                        onChange={(e) => setDailyHoursForPet(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">{t('wizard.monthlyBudget')}</label>
                      <input
                        type="text"
                        value={estimatedMonthlyBudget}
                        onChange={(e) => setEstimatedMonthlyBudget(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">{t('wizard.travelPlan')}</label>
                    <input
                      type="text"
                      value={travelOrAwayCarePlan}
                      onChange={(e) => setTravelOrAwayCarePlan(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-xs"
                    />
                  </div>
                </div>
              )}

              {/* STEP 6: Welfare & Anti-Profiteering Commitments */}
              {currentStep === 6 && (
                <div className="space-y-4 text-xs">
                  <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 rounded-2xl border border-emerald-200/80 dark:border-emerald-900/50 text-emerald-950 dark:text-emerald-200 font-medium space-y-3">
                    <div className="flex items-center justify-between border-b border-emerald-200/60 dark:border-emerald-900/40 pb-2">
                      <span className="font-black uppercase text-emerald-900 dark:text-emerald-300 block text-xs">
                        {isEn ? 'Welfare & Anti-Profiteering Pledge (Mandatory):' : 'Cam kết phúc lợi & Không trục lợi (Bắt buộc):'}
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-200 dark:bg-emerald-900/80 text-emerald-950 dark:text-emerald-200 text-[10px] font-bold">
                        {t('common.nonProfit')}
                      </span>
                    </div>

                    <label className="flex items-start gap-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={agreedNoSellingOrTrading}
                        onChange={(e) => setAgreedNoSellingOrTrading(e.target.checked)}
                        className="w-4 h-4 text-emerald-800 rounded shrink-0 mt-0.5"
                      />
                      <span className="leading-snug">
                        <b>{isEn ? '1. NO-PROFITEERING:' : '1. Cam kết KHÔNG TRỤC LỢI:'}</b> {t('wizard.pledgeNoSell')}
                      </span>
                    </label>

                    <label className="flex items-start gap-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={agreedNoAbandonment}
                        onChange={(e) => setAgreedNoAbandonment(e.target.checked)}
                        className="w-4 h-4 text-emerald-800 rounded shrink-0 mt-0.5"
                      />
                      <span className="leading-snug">
                        <b>{isEn ? '2. LIFELONG CARE & NO ABANDONMENT:' : '2. Cam kết KHÔNG BỎ RƠI & KHÔNG THẢ RÔNG:'}</b> {t('wizard.pledgeNoAbandon')}
                      </span>
                    </label>

                    <label className="flex items-start gap-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={agreedToMedicalCare}
                        onChange={(e) => setAgreedToMedicalCare(e.target.checked)}
                        className="w-4 h-4 text-emerald-800 rounded shrink-0 mt-0.5"
                      />
                      <span className="leading-snug">
                        <b>{isEn ? '3. VETERINARY MEDICAL CARE:' : '3. Cam kết CHĂM SÓC Y TẾ:'}</b> {t('wizard.pledgeMedical')}
                      </span>
                    </label>

                    <label className="flex items-start gap-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={agreedToPostAdoptionCheckIns}
                        onChange={(e) => setAgreedToPostAdoptionCheckIns(e.target.checked)}
                        className="w-4 h-4 text-emerald-800 rounded shrink-0 mt-0.5"
                      />
                      <span className="leading-snug">
                        <b>{isEn ? '4. PERIODIC CHECK-IN UPDATES:' : '4. Cam kết MINH BẠCH & HẬU NHẬN NUÔI:'}</b> {t('wizard.pledgeCheckIn')}
                      </span>
                    </label>
                  </div>

                  {/* Review Specific Pet Requirements */}
                  {(pet.requirements?.conditions || pet.adoptionReqs?.conditions) && (
                    <div className="p-3.5 bg-stone-50 dark:bg-stone-800 rounded-2xl border border-stone-200 dark:border-stone-700 space-y-2">
                      <span className="text-[11px] font-bold text-stone-800 dark:text-stone-200 uppercase block">
                        {isEn ? `Specific criteria from ${pet.name}'s caregiver:` : `Yêu cầu riêng từ người đăng tin bé ${pet.name}:`}
                      </span>
                      <ul className="space-y-1 text-[11px] text-stone-600 dark:text-stone-300">
                        {(pet.requirements?.conditions || pet.adoptionReqs?.conditions || []).map((cond, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <span className="text-emerald-700 dark:text-emerald-400 font-bold">✓</span>
                            <span>{translateDynamicText(cond, language)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {/* Wizard Navigation Buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-stone-100 dark:border-stone-800">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={() => setCurrentStep(currentStep - 1)}
                    className="px-4 py-2 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 font-bold text-xs flex items-center gap-1.5 transition cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>{t('common.back')}</span>
                  </button>
                ) : <div />}

                {currentStep < totalSteps ? (
                  <button
                    type="button"
                    disabled={!canProceed()}
                    onClick={() => setCurrentStep(currentStep + 1)}
                    className="px-6 py-2.5 rounded-2xl bg-[#d46b28] hover:bg-[#ba591a] disabled:opacity-40 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition cursor-pointer"
                  >
                    <span>{t('common.continue')}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={!canProceed()}
                    className="px-6 py-2.5 rounded-2xl bg-[#d46b28] hover:bg-[#ba591a] disabled:opacity-40 text-white font-bold text-xs shadow-md transition cursor-pointer"
                  >
                    {t('wizard.submitBtn')}
                  </button>
                )}
              </div>

            </form>
          )}

        </div>

      </div>
    </div>
  );
};
