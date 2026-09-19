import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { useLanguage } from '../../context/LanguageContext';
import { Pet, PetSpecies, PetGender, PetAgeGroup, PetSize } from '../../types/pet';
import { 
  Heart, 
  Sparkles, 
  ShieldCheck, 
  Upload, 
  Image as ImageIcon, 
  CheckCircle2, 
  ArrowLeft, 
  AlertCircle,
  Plus,
  Trash2,
  ListChecks,
  Check
} from 'lucide-react';

interface CreatePetPostPageProps {
  navigate: (path: string) => void;
}

const SAMPLE_PHOTO_CHOICES = [
  'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=800',
  'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800',
  'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?w=800',
  'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=800',
  'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=800',
  'https://images.unsplash.com/photo-1561037404-61cd46aa615b?w=800'
];

const PRESET_ADOPTION_CRITERIA_VI = [
  'Cam kết tuyệt đối KHÔNG TRỤC LỢI, không bán lại, không nuôi nhân giống kinh doanh',
  'Không xích nhốt liên tục, có không gian vận động thoáng mát',
  'Có rào chắn an toàn / Đã lắp lưới ban công, cửa sổ (cho mèo)',
  'Chỗ ở ổn định, chủ nhà/chung cư cho phép nuôi thú cưng',
  'Tất cả thành viên trong gia đình/bạn cùng phòng đồng thuận nhận nuôi',
  'Tài chính ổn định, sẵn sàng chi trả khám chữa bệnh & tiêm phòng định kỳ',
  'Cam kết tiêm phòng định kỳ và triệt sản đúng tuổi',
  'Đồng ý cập nhật hình ảnh/video tình trạng bé định kỳ (1-3 tháng đầu)',
  'Sẵn sàng cho người đăng/trạm cứu hộ ghé thăm bé hoặc trao đổi trước khi nhận',
  'Cam kết không thả rông ngoài đường mà không có dây dắt',
  'Nếu không thể tiếp tục nuôi, phải liên hệ lại với người đăng (không được bán/bỏ rơi)'
];

const PRESET_ADOPTION_CRITERIA_EN = [
  'Pledge STRICTLY NO PROFITEERING, no commercial reselling or breeding',
  'No continuous caging or tethering; airy and spacious living environment',
  'Safe balcony netting / cat-proof window screens installed (for cats)',
  'Stable living condition; pet-friendly house or apartment rental',
  'Consent and agreement from all household family members/roommates',
  'Stable finances; prepared for veterinary care & vaccinations',
  'Commitment to periodic vaccinations and timely neutering',
  'Agree to submit periodic photo/video check-ins (1-3 initial months)',
  'Welcome home visit or online interview by the fosterer prior to handover',
  'Never let roam unleashed in public streets',
  'If unable to continue fostering, must return pet to fosterer (strictly no abandonment)'
];

export const CreatePetPostPage: React.FC<CreatePetPostPageProps> = ({ navigate }) => {
  const { currentUser } = useAuth();
  const { createPet } = useData();
  const { language, t } = useLanguage();
  const isEn = language === 'en';

  const PRESET_ADOPTION_CRITERIA = isEn ? PRESET_ADOPTION_CRITERIA_EN : PRESET_ADOPTION_CRITERIA_VI;

  // Form State
  const [name, setName] = useState('');
  const [species, setSpecies] = useState<PetSpecies>('DOG');
  const [breed, setBreed] = useState('');
  const [age, setAge] = useState('');
  const [ageGroup, setAgeGroup] = useState<PetAgeGroup>('YOUNG');
  const [gender, setGender] = useState<PetGender>('MALE');
  const [size, setSize] = useState<PetSize>('MEDIUM');
  const [weightKg, setWeightKg] = useState<number>(8);
  const [description, setDescription] = useState('');
  const [rehomingReason, setRehomingReason] = useState('');
  const [location, setLocation] = useState(isEn ? 'District 7, HCMC' : 'Quận 7, TP.HCM');
  const [adoptionFee, setAdoptionFee] = useState<number>(0);

  // Health
  const [isSterilized, setIsSterilized] = useState(true);
  const [isVaccinated, setIsVaccinated] = useState(true);
  const [isRabiesVaccinated, setIsRabiesVaccinated] = useState(true);
  const [isDewormed, setIsDewormed] = useState(true);
  const [hasSpecialNeeds, setHasSpecialNeeds] = useState(false);
  const [medicalNotes, setMedicalNotes] = useState('');

  // Personality
  const [selectedTraits, setSelectedTraits] = useState<string[]>(
    isEn ? ['Friendly', 'Affectionate', 'House-trained'] : ['Thân thiện', 'Quấn người', 'Biết đi vệ sinh đúng chỗ']
  );
  const [goodWithDogs, setGoodWithDogs] = useState(true);
  const [goodWithCats, setGoodWithCats] = useState(true);
  const [goodWithChildren, setGoodWithChildren] = useState(true);

  // Adoption Requirements & Criteria
  const [housingType, setHousingType] = useState<'HOUSE' | 'APARTMENT' | 'ANY'>('ANY');
  const [requiresCheckIn, setRequiresCheckIn] = useState(true);
  const [requiresFinancial, setRequiresFinancial] = useState(true);
  
  // Preset and Custom Criteria
  const [selectedPresetCriteria, setSelectedPresetCriteria] = useState<string[]>([
    PRESET_ADOPTION_CRITERIA[1],
    PRESET_ADOPTION_CRITERIA[4],
    PRESET_ADOPTION_CRITERIA[5],
    PRESET_ADOPTION_CRITERIA[7]
  ]);
  const [customCriteriaList, setCustomCriteriaList] = useState<string[]>([]);
  const [newCustomInput, setNewCustomInput] = useState<string>('');

  // Photos
  const [photos, setPhotos] = useState<string[]>([SAMPLE_PHOTO_CHOICES[0]]);
  const [submitted, setSubmitted] = useState(false);

  const toggleTrait = (trait: string) => {
    if (selectedTraits.includes(trait)) {
      setSelectedTraits(selectedTraits.filter(t => t !== trait));
    } else {
      setSelectedTraits([...selectedTraits, trait]);
    }
  };

  const togglePresetCriterion = (criterion: string) => {
    if (selectedPresetCriteria.includes(criterion)) {
      setSelectedPresetCriteria(selectedPresetCriteria.filter(c => c !== criterion));
    } else {
      setSelectedPresetCriteria([...selectedPresetCriteria, criterion]);
    }
  };

  const handleAddCustomCriterion = () => {
    const trimmed = newCustomInput.trim();
    if (!trimmed) return;
    if (customCriteriaList.includes(trimmed) || selectedPresetCriteria.includes(trimmed)) {
      setNewCustomInput('');
      return;
    }
    setCustomCriteriaList([...customCriteriaList, trimmed]);
    setNewCustomInput('');
  };

  const handleRemoveCustomCriterion = (item: string) => {
    setCustomCriteriaList(customCriteriaList.filter(c => c !== item));
  };

  const handleAddPhoto = (url: string) => {
    if (url && !photos.includes(url)) {
      setPhotos([...photos, url]);
    }
  };

  const handleRemovePhoto = (url: string) => {
    if (photos.length > 1) {
      setPhotos(photos.filter(p => p !== url));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    const allConditions = [...selectedPresetCriteria, ...customCriteriaList];

    createPet({
      name,
      species,
      breed: breed || (species === 'DOG' ? (isEn ? 'Mixed Breed Dog' : 'Chó ta lai') : (isEn ? 'Domestic Shorthair Cat' : 'Mèo ta')),
      age: age || (isEn ? '1 year old' : '1 tuổi'),
      ageGroup,
      gender,
      size,
      weightKg: Number(weightKg) || 5,
      description,
      rehomingReason,
      location,
      adoptionFee: Number(adoptionFee) || 0,
      photos,
      status: 'WAITING',
      health: {
        isSterilized,
        isVaccinated,
        isRabiesVaccinated,
        isDewormed,
        hasSpecialNeeds,
        medicalNotes
      },
      personality: {
        traits: selectedTraits,
        goodWithDogs,
        goodWithCats,
        goodWithChildren
      },
      requirements: {
        housingType,
        financialStability: requiresFinancial,
        requiresPostAdoptionCheckIn: requiresCheckIn,
        conditions: allConditions,
        adoptionFee: Number(adoptionFee) || 0,
        postingReason: rehomingReason
      },
      adoptionReqs: {
        purpose: 'REHOMING',
        postingReason: rehomingReason,
        housingType,
        financialStability: requiresFinancial,
        requiresPostAdoptionCheckIn: requiresCheckIn,
        conditions: allConditions,
        adoptionFee: Number(adoptionFee) || 0
      }
    });

    setSubmitted(true);
    setTimeout(() => {
      navigate('/my-pets');
    }, 2000);
  };

  if (submitted) {
    return (
      <div className="bg-white p-12 rounded-3xl border border-[#efe2d3] text-center space-y-4 shadow-sm">
        <CheckCircle2 className="w-16 h-16 text-[#d46b28] mx-auto animate-bounce" />
        <h2 className="text-2xl font-black text-stone-900 font-display">{isEn ? 'Pet Profile Published Successfully!' : 'Đăng tin thành công!'}</h2>
        <p className="text-xs text-stone-600 max-w-md mx-auto">
          {isEn
            ? `Listing for ${name} with your custom adoption criteria has been submitted for platform review.`
            : `Tin đăng cho bé ${name} kèm các tiêu chí nhận nuôi đã được gửi lên hệ thống và chuyển tới Admin kiểm duyệt.`}
        </p>
      </div>
    );
  }

  const allActiveConditionsCount = selectedPresetCriteria.length + customCriteriaList.length;

  return (
    <div className="space-y-6 text-left">
      
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-stone-200 pb-4">
        <button
          onClick={() => navigate('/my-pets')}
          className="p-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-600 transition cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div>
          <h1 className="text-2xl font-black text-stone-900 font-display">{isEn ? 'Find a New Loving Home for a Pet' : 'Đăng tin tìm chủ mới cho thú cưng'}</h1>
          <p className="text-xs text-stone-500">{isEn ? 'Provide comprehensive information and set clear adoption criteria to find the best match.' : 'Cung cấp đầy đủ thông tin và thiết lập tiêu chí nhận nuôi rõ ràng để chọn đúng gia đình cho bé.'}</p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-8 bg-white p-6 sm:p-8 rounded-3xl border border-stone-200/80 shadow-sm">
        
        {/* Section 1: Basic Information */}
        <div className="space-y-4">
          <h3 className="font-bold text-stone-900 text-base flex items-center gap-2 border-b border-stone-100 pb-2">
            <Sparkles className="w-4 h-4 text-emerald-800" />
            <span>{isEn ? '1. Basic Information' : '1. Thông tin cơ bản'}</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1">{isEn ? 'Pet Name *' : 'Tên thú cưng *'}</label>
              <input
                type="text"
                required
                placeholder={isEn ? 'E.g. Milo, Luna, Daisy...' : 'Ví dụ: Milo, Bông, Lu...'}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-emerald-700"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1">{isEn ? 'Species *' : 'Loài *'}</label>
              <select
                value={species}
                onChange={(e: any) => setSpecies(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-stone-300 bg-stone-50 text-xs font-bold"
              >
                <option value="DOG">🐶 {isEn ? 'Dog' : 'Chó'}</option>
                <option value="CAT">🐱 {isEn ? 'Cat' : 'Mèo'}</option>
                <option value="OTHER">🐾 {isEn ? 'Other' : 'Khác'}</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1">{isEn ? 'Breed *' : 'Giống loài *'}</label>
              <input
                type="text"
                required
                placeholder={isEn ? 'E.g. Corgi mix, Domestic Shorthair...' : 'Ví dụ: Corgi lai, Mèo mướp ta...'}
                value={breed}
                onChange={(e) => setBreed(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-emerald-700"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1">{isEn ? 'Display Age *' : 'Độ tuổi hiển thị *'}</label>
              <input
                type="text"
                required
                placeholder={isEn ? 'E.g. 8 months, 2 years...' : 'Ví dụ: 8 tháng, 2 tuổi...'}
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1">{isEn ? 'Age Group *' : 'Nhóm tuổi *'}</label>
              <select
                value={ageGroup}
                onChange={(e: any) => setAgeGroup(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-stone-300 bg-stone-50 text-xs"
              >
                <option value="PUPPY_KITTEN">{isEn ? 'Puppy / Kitten (< 6 mos)' : 'Sơ sinh (< 6 tháng)'}</option>
                <option value="YOUNG">{isEn ? 'Young (6 mos - 2 yrs)' : 'Trẻ (6 tháng - 2 tuổi)'}</option>
                <option value="ADULT">{isEn ? 'Adult (2 - 7 yrs)' : 'Trưởng thành (2 - 7 tuổi)'}</option>
                <option value="SENIOR">{isEn ? 'Senior (> 7 yrs)' : 'Lớn tuổi (> 7 tuổi)'}</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1">{isEn ? 'Gender *' : 'Giới tính *'}</label>
              <select
                value={gender}
                onChange={(e: any) => setGender(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-stone-300 bg-stone-50 text-xs"
              >
                <option value="MALE">{isEn ? 'Male' : 'Đực (Male)'}</option>
                <option value="FEMALE">{isEn ? 'Female' : 'Cái (Female)'}</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1">{isEn ? 'Weight (kg) *' : 'Cân nặng (kg) *'}</label>
              <input
                type="number"
                step="0.1"
                required
                value={weightKg}
                onChange={(e) => setWeightKg(parseFloat(e.target.value))}
                className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-stone-700 block mb-1">{isEn ? 'Handover Region / City *' : 'Khu vực bàn giao (Khái quát) *'}</label>
            <input
              type="text"
              required
              placeholder={isEn ? 'E.g. District 7, Ho Chi Minh City or Cau Giay, Hanoi' : 'Ví dụ: Quận 7, TP.HCM hoặc Cầu Giấy, Hà Nội'}
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-stone-700 block mb-1">{isEn ? 'Story & Background *' : 'Hoàn cảnh & Câu chuyện của bé *'}</label>
            <textarea
              rows={3}
              required
              placeholder={isEn ? 'Describe personality, dietary habits, daily habits...' : 'Mô tả tính nết, thói quen ăn uống, sinh hoạt hằng ngày của bé...'}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-[#d46b28] focus:outline-none"
            />
          </div>

          {/* Lời tâm sự / Lý do tìm chủ mới từ người đăng */}
          <div className="p-4 rounded-2xl bg-[#faf4ee] dark:bg-stone-850 border border-[#efe2d3] dark:border-stone-700 space-y-3">
            <div>
              <label className="text-xs font-bold text-[#2b2523] dark:text-stone-100 block mb-0.5">
                💬 {isEn ? "Poster's Story & Reason for Re-homing *" : 'Lời tâm sự & Lý do tìm chủ mới từ bạn *'}
              </label>
              <p className="text-[11px] text-[#665851] dark:text-stone-400 leading-snug">
                {isEn 
                  ? 'Share your personal situation and why you cannot continue fostering (e.g., relocation, apartment pet policy, rescued from streets, family emergency...). Sincere sharing helps adopters understand and cherish the pet.' 
                  : 'Chia sẻ chân thành hoàn cảnh của bạn vì sao không thể tiếp tục nuôi bé (ví dụ: chuyển chỗ ở xa, chung cư/nhà trọ cấm pet, cứu hộ bé từ đường phố đã chữa lành, biến cố gia đình...). Lời tâm sự này sẽ giúp người nhận nuôi đồng cảm và thấu hiểu hơn.'}
              </p>
            </div>

            {/* Quick Reason Suggestions / Chips */}
            <div className="flex flex-wrap gap-1.5">
              {(isEn ? [
                '🏢 Moving to non-pet apartment',
                '✈️ Long-term relocation / work',
                '🚑 Rescued from street, fully recovered',
                '⏳ Not enough daily care time',
                '🏡 Pet needs larger open yard',
                '👶 Family circumstances changed'
              ] : [
                '🏢 Chung cư / Nhà trọ cấm nuôi pet',
                '✈️ Chuyển công tác xa / Chuyển nhà',
                '🚑 Cứu hộ từ đường phố đã hồi phục',
                '⏳ Không đủ thời gian chăm sóc chu đáo',
                '🏡 Bé cần không gian sân vườn rộng hơn',
                '👶 Hoàn cảnh gia đình có thay đổi'
              ]).map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => {
                    if (!rehomingReason.includes(tag)) {
                      setRehomingReason(prev => prev ? `${prev}. ${tag}` : tag);
                    }
                  }}
                  className="px-2.5 py-1 rounded-xl bg-white dark:bg-stone-800 hover:bg-[#fde2cd] dark:hover:bg-stone-700 text-[#2b2523] dark:text-stone-200 border border-stone-200 dark:border-stone-700 text-[11px] font-medium transition cursor-pointer"
                >
                  + {tag}
                </button>
              ))}
            </div>

            <textarea
              rows={3}
              required
              placeholder={isEn 
                ? 'E.g. Due to an upcoming relocation for work and apartment pet restrictions, my family cannot continue taking care of the pet. We hope to find a loving, responsible adopter...' 
                : 'Ví dụ: Do gia đình chuẩn bị chuyển công tác xa và chỗ ở mới không cho phép nuôi thú cưng, mình rất mong tìm được một gia đình thật sự yêu thương và có trách nhiệm đón bé về chăm sóc...'}
              value={rehomingReason}
              onChange={(e) => setRehomingReason(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-[#2b2523] dark:text-stone-100 text-xs focus:ring-2 focus:ring-[#d46b28] focus:outline-none"
            />
          </div>
        </div>

        {/* Section 2: Health & Medical */}
        <div className="space-y-4 pt-4 border-t border-stone-100">
          <h3 className="font-bold text-stone-900 text-base flex items-center gap-2 border-b border-stone-100 pb-2">
            <ShieldCheck className="w-4 h-4 text-emerald-800" />
            <span>{isEn ? '2. Health & Veterinary Record' : '2. Hồ sơ sức khỏe & Y tế'}</span>
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <label className="flex items-center gap-2 p-3 bg-stone-50 rounded-2xl cursor-pointer text-xs">
              <input
                type="checkbox"
                checked={isSterilized}
                onChange={(e) => setIsSterilized(e.target.checked)}
                className="w-4 h-4 text-emerald-800 rounded"
              />
              <span className="font-semibold text-stone-800">{isEn ? 'Spayed / Neutered' : 'Đã triệt sản'}</span>
            </label>

            <label className="flex items-center gap-2 p-3 bg-stone-50 rounded-2xl cursor-pointer text-xs">
              <input
                type="checkbox"
                checked={isVaccinated}
                onChange={(e) => setIsVaccinated(e.target.checked)}
                className="w-4 h-4 text-emerald-800 rounded"
              />
              <span className="font-semibold text-stone-800">{isEn ? 'Vaccinated' : 'Đã tiêm phòng bệnh'}</span>
            </label>

            <label className="flex items-center gap-2 p-3 bg-stone-50 rounded-2xl cursor-pointer text-xs">
              <input
                type="checkbox"
                checked={isRabiesVaccinated}
                onChange={(e) => setIsRabiesVaccinated(e.target.checked)}
                className="w-4 h-4 text-emerald-800 rounded"
              />
              <span className="font-semibold text-stone-800">{isEn ? 'Rabies Vaccinated' : 'Đã tiêm phòng dại'}</span>
            </label>

            <label className="flex items-center gap-2 p-3 bg-stone-50 rounded-2xl cursor-pointer text-xs">
              <input
                type="checkbox"
                checked={isDewormed}
                onChange={(e) => setIsDewormed(e.target.checked)}
                className="w-4 h-4 text-emerald-800 rounded"
              />
              <span className="font-semibold text-stone-800">{isEn ? 'Dewormed' : 'Đã tẩy giun định kỳ'}</span>
            </label>
          </div>

          <div>
            <label className="text-xs font-bold text-stone-700 block mb-1">{isEn ? 'Medical Notes / History (If any)' : 'Ghi chú y tế / Tiền sử bệnh (nếu có)'}</label>
            <input
              type="text"
              placeholder={isEn ? 'E.g. Fully recovered skin allergy, currently eats sensitive kibble...' : 'Ví dụ: Bé từng bị viêm da đã khỏi hẳn, đang dùng hạt cho mèo nhạy cảm...'}
              value={medicalNotes}
              onChange={(e) => setMedicalNotes(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs"
            />
          </div>
        </div>

        {/* Section 3: Personality & Compatibility */}
        <div className="space-y-4 pt-4 border-t border-stone-100">
          <h3 className="font-bold text-stone-900 text-base flex items-center gap-2 border-b border-stone-100 pb-2">
            <Heart className="w-4 h-4 text-emerald-800" />
            <span>{isEn ? '3. Personality & Compatibility' : '3. Tính cách & Mức độ tương thích'}</span>
          </h3>

          <div>
            <label className="text-xs font-bold text-stone-700 block mb-2">{isEn ? 'Select suitable personality traits:' : 'Chọn các đặc điểm tính cách phù hợp:'}</label>
            <div className="flex flex-wrap gap-2">
              {(isEn ? [
                'Friendly', 'Affectionate', 'Gentle', 'Energetic', 
                'House-trained', 'Obedient', 'Playful', 
                'Calm', 'Watchdog', 'Cuddly'
              ] : [
                'Thân thiện', 'Quấn người', 'Hiền lành', 'Năng động', 
                'Biết đi vệ sinh đúng chỗ', 'Biết nghe lời', 'Thích đùa nghịch', 
                'Trầm tính', 'Canh nhà giỏi', 'Thích ôm ấp'
              ]).map(trait => {
                const isSelected = selectedTraits.includes(trait);
                return (
                  <button
                    key={trait}
                    type="button"
                    onClick={() => toggleTrait(trait)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                      isSelected ? 'bg-emerald-800 text-white shadow-sm' : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                    }`}
                  >
                    {isSelected ? '✓ ' : '+ '} {trait}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Section 4: Photo Selection */}
        <div className="space-y-4 pt-4 border-t border-stone-100">
          <h3 className="font-bold text-stone-900 text-base flex items-center gap-2 border-b border-stone-100 pb-2">
            <ImageIcon className="w-4 h-4 text-emerald-800" />
            <span>{isEn ? '4. Pet Photos' : '4. Hình ảnh thú cưng'}</span>
          </h3>

          <div className="space-y-2">
            <label className="text-xs font-bold text-stone-700 block">{isEn ? 'Selected Photos:' : 'Hình ảnh đã chọn:'}</label>
            <div className="flex flex-wrap gap-3">
              {photos.map((p, idx) => (
                <div key={idx} className="relative w-24 h-24 rounded-2xl overflow-hidden border border-stone-200 group">
                  <img src={p} alt="" className="w-full h-full object-cover" />
                  {photos.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemovePhoto(p)}
                      className="absolute top-1 right-1 w-5 h-5 bg-black/70 text-white rounded-full text-xs flex items-center justify-center hover:bg-rose-600 cursor-pointer"
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold text-stone-700 block">{isEn ? 'Pick from sample library:' : 'Chọn nhanh từ thư viện ảnh mẫu:'}</span>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {SAMPLE_PHOTO_CHOICES.map((url, idx) => (
                <img
                  key={idx}
                  src={url}
                  alt=""
                  onClick={() => handleAddPhoto(url)}
                  className="w-16 h-16 rounded-xl object-cover border border-stone-200 cursor-pointer hover:scale-105 transition"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Section 5: Adoption Requirements & Custom Criteria */}
        <div className="space-y-5 pt-4 border-t border-stone-100">
          <div className="flex items-center justify-between border-b border-stone-100 pb-2">
            <h3 className="font-bold text-stone-900 text-base flex items-center gap-2">
              <ListChecks className="w-4 h-4 text-emerald-800" />
              <span>{isEn ? '5. Adoption Criteria & Requirements' : '5. Thiết lập Tiêu chí & Điều kiện nhận nuôi'}</span>
            </h3>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900">
              {isEn ? `Selected: ${allActiveConditionsCount} criteria` : `Đã chọn: ${allActiveConditionsCount} tiêu chí`}
            </span>
          </div>

          {/* 5.1 PRESET CRITERIA */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-stone-800 block">
                {isEn ? 'a. Standard Adoption Criteria (Click to toggle):' : 'a. Danh sách tiêu chí có sẵn (Bấm để chọn / bỏ chọn):'}
              </label>
              <div className="flex gap-2 text-[11px]">
                <button
                  type="button"
                  onClick={() => setSelectedPresetCriteria([...PRESET_ADOPTION_CRITERIA])}
                  className="text-emerald-800 font-bold hover:underline cursor-pointer"
                >
                  {isEn ? 'Select All' : 'Chọn tất cả'}
                </button>
                <span className="text-stone-300">•</span>
                <button
                  type="button"
                  onClick={() => setSelectedPresetCriteria([])}
                  className="text-stone-500 font-semibold hover:underline cursor-pointer"
                >
                  {isEn ? 'Clear All' : 'Bỏ chọn tất cả'}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {PRESET_ADOPTION_CRITERIA.map((criterion, idx) => {
                const isSelected = selectedPresetCriteria.includes(criterion);
                return (
                  <div
                    key={idx}
                    onClick={() => togglePresetCriterion(criterion)}
                    className={`p-3 rounded-2xl border cursor-pointer transition flex items-start gap-2.5 text-xs ${
                      isSelected
                        ? 'border-emerald-700 bg-emerald-50/60 shadow-2xs'
                        : 'border-stone-200 bg-stone-50/40 hover:bg-stone-100/70 text-stone-700'
                    }`}
                  >
                    <div className={`w-4 h-4 rounded-md mt-0.5 flex items-center justify-center shrink-0 transition ${
                      isSelected ? 'bg-emerald-800 text-white' : 'border border-stone-300 bg-white'
                    }`}>
                      {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                    <span className={`leading-snug ${isSelected ? 'font-bold text-stone-900' : 'font-normal text-stone-700'}`}>
                      {criterion}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 5.2 CUSTOM CRITERIA INPUT */}
          <div className="space-y-3 p-4 bg-stone-50 rounded-2xl border border-stone-200/80">
            <div className="space-y-1">
              <label className="text-xs font-bold text-stone-900 block">
                {isEn ? 'b. Add your own custom requirements (optional):' : 'b. Thêm tiêu chí nhận nuôi riêng của bạn (nếu có):'}
              </label>
              <p className="text-[11px] text-stone-500">
                {isEn ? 'Enter specific household needs (E.g. No caged birds/hamsters, owner working from home preferred...)' : 'Nhập các điều kiện đặc thù cho bé (Ví dụ: Nhà không nuôi chim/chuột, ưu tiên gia đình có người ở nhà thường xuyên...)'}
              </p>
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={newCustomInput}
                onChange={(e) => setNewCustomInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddCustomCriterion();
                  }
                }}
                placeholder={isEn ? 'Enter custom condition and click Add...' : 'Nhập tiêu chí tùy chỉnh mới rồi bấm Thêm...'}
                className="flex-1 px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs bg-white focus:ring-2 focus:ring-emerald-700"
              />
              <button
                type="button"
                onClick={handleAddCustomCriterion}
                disabled={!newCustomInput.trim()}
                className="px-4 py-2.5 rounded-xl bg-stone-900 hover:bg-black disabled:opacity-40 text-white text-xs font-bold transition flex items-center gap-1.5 shrink-0 shadow-xs cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>{isEn ? 'Add Criteria' : 'Thêm tiêu chí'}</span>
              </button>
            </div>

            {/* List of Custom Added Criteria */}
            {customCriteriaList.length > 0 && (
              <div className="space-y-2 pt-2 border-t border-stone-200/60">
                <span className="text-[11px] font-bold text-stone-700 block uppercase tracking-wider">
                  {isEn ? `Custom Criteria Added (${customCriteriaList.length}):` : `Tiêu chí bạn đã tự thêm (${customCriteriaList.length}):`}
                </span>
                <div className="space-y-1.5">
                  {customCriteriaList.map((crit, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 bg-white rounded-xl border border-amber-300/80 text-xs flex items-center justify-between gap-2 shadow-2xs"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="px-1.5 py-0.5 rounded bg-amber-100 text-amber-900 text-[10px] font-bold shrink-0">
                          {isEn ? 'Custom' : 'Tự thêm'}
                        </span>
                        <span className="font-semibold text-stone-900 truncate">{crit}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveCustomCriterion(crit)}
                        className="p-1 rounded-lg text-stone-400 hover:text-rose-600 hover:bg-rose-50 transition shrink-0 cursor-pointer"
                        title={isEn ? 'Delete this criterion' : 'Xóa tiêu chí này'}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 5.3 ENVIRONMENT & ADOPTION FEE */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1">{isEn ? 'Symbolic Care / Adoption Fee (VND)' : 'Phí nhận nuôi / Vía tượng trưng (VNĐ)'}</label>
              <input
                type="number"
                step="50000"
                value={adoptionFee}
                onChange={(e) => setAdoptionFee(parseInt(e.target.value) || 0)}
                placeholder="0 (Free of charge)"
                className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs"
              />
              <span className="text-[10px] text-stone-500">{isEn ? 'Leave 0 for completely free non-profit rehoming.' : 'Để 0 nếu bạn tặng bé miễn phí không thu bất kỳ khoản phí nào.'}</span>
            </div>

            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1">{isEn ? 'Living Space Requirement' : 'Yêu cầu môi trường sống'}</label>
              <select
                value={housingType}
                onChange={(e: any) => setHousingType(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-stone-300 bg-stone-50 text-xs"
              >
                <option value="ANY">{isEn ? 'Any Housing (Private House or Apartment)' : 'Mọi loại hình (Nhà riêng hoặc Chung cư)'}</option>
                <option value="HOUSE">{isEn ? 'Private House with Yard/Fence' : 'Ưu tiên nhà riêng có sân vườn/rào chắn'}</option>
                <option value="APARTMENT">{isEn ? 'Pet-Friendly Apartment' : 'Chung cư cho phép nuôi thú cưng'}</option>
              </select>
            </div>
          </div>

        </div>

        {/* Submit Button */}
        <div className="pt-4 border-t border-stone-100 flex justify-end gap-3">
          <button
            type="button"
            onClick={() => navigate('/my-pets')}
            className="px-5 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold cursor-pointer"
          >
            {t('common.cancel')}
          </button>
          <button
            type="submit"
            className="px-6 py-3 rounded-2xl bg-[#d46b28] hover:bg-[#ba591a] text-white text-xs font-black tracking-wide shadow-md flex items-center gap-2 cursor-pointer transition"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{isEn ? `Publish Pet Listing (${allActiveConditionsCount} criteria)` : `Đăng tin tìm chủ mới (${allActiveConditionsCount} tiêu chí)`}</span>
          </button>
        </div>

      </form>

    </div>
  );
};
