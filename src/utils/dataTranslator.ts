import { Language } from '../context/LanguageContext';
import { Pet } from '../types/pet';
import { RescuePost } from '../types/rescue';
import { translateAddress, translateCity, translateDistrict, translateShelterName } from './addressTranslator';
import { translateBreed, translateColor, translatePersonalityTag, translateAgeDisplay } from './petTranslator';

// Known Pet Story / Description translations
const PET_DESCRIPTIONS: Record<string, string> = {
  // Milo (pet-1)
  'Gia đình chuyển sang căn hộ không cho phép nuôi chó lớn nên mong muốn tìm chủ mới yêu thương. Bé Milo rất ngoan, quấn người, đã huấn luyện đi vệ sinh đúng chỗ và biết nghe các lệnh cơ bản: ngồi, bắt tay, nằm yên. Bé ăn uống rất dễ, thích chơi bóng và đi dạo buổi sáng. Cần tìm chủ nhân có thời gian dắt bé đi dạo và không xích nhốt liên tục.':
    'Due to moving into an apartment that restricts medium/large dogs, our family is seeking a loving forever home for Milo. He is gentle, affectionate, fully house-trained, and responds to basic commands (sit, paw, stay). Milo has an easy diet, loves fetch and morning strolls. Seeking an owner with time for daily walks and committed to indoor cage-free living.',
  
  // Luna (pet-2)
  'Bé Luna được giải cứu khi bị kẹt trong khe tường lúc 2 tháng tuổi. Hiện tại bé đã 8 tháng, lông xám mượt, mắt hổ phách tuyệt đẹp. Tính cách điềm đạm, thích nằm cạnh chủ khi làm việc, thích được gãi cằm. Bé đã triệt sản, tiêm đủ 2 mũi vaccine và biết dùng khay cát 100%. Rất mong tìm được ba mẹ có nhà rào chắn ban công an toàn.':
    'Luna was rescued from a narrow wall crevice when she was 2 months old. Now 8 months, she has silky smoke grey fur and mesmerizing amber eyes. She is calm, loves curling up next to you while you work, and adores chin scratches. Spayed, double vaccinated, and 100% litter trained. Seeking an adopter with safe balcony netting.',

  // Đậu Đậu (pet-3)
  'Bé Đậu Đậu được trạm cứu hộ tiếp nhận sau một vụ va quẹt xe nhẹ ở Bình Dương. Bé đã được phẫu thuật cố định xương bánh chè thành công, hiện chạy nhảy hoàn toàn bình thường. Đậu Đậu cực kỳ lanh lợi, thông minh và thích trẻ nhỏ. Đã tiêm ngừa dại và tẩy giun định kỳ. Rất mong bé tìm được một mái ấm ấm áp không bao giờ bỏ rơi bé nữa.':
    'Dau Dau was taken in by our rescue shelter after a minor street collision in Binh Duong. His patella surgery was completely successful and he now runs happily with zero limp. Extremely smart, alert, and great with kids. Vaccinated for rabies and dewormed. Seeking a warm family who will never abandon him.',

  // Bông (pet-4)
  'Bé Bông là mèo Ba Tư lai trắng muốt, mắt hai màu (1 xanh 1 vàng). Do chủ cũ xuất ngoại đột xuất không thể mang theo nên gửi trạm tìm ba mẹ mới. Bông rất hiền, thích được chải lông mỗi ngày và ăn hạt Royal Canin. Đã triệt sản và có sổ theo dõi sức khỏe đầy đủ. Cần người có kinh nghiệm chăm sóc mèo lông dài.':
    'Bong is a pure white Persian mix with odd-eyes (one blue, one golden). Rehoming because previous owner relocated abroad. Very gentle, loves daily brushing, and enjoys quality kibble. Spayed with a complete veterinary passport. Seeking an adopter experienced with longhair cat grooming.',

  // Cà Phê (pet-5)
  'Cà Phê là chú chó Poodle lai nâu socola được chuộc từ một lò mổ thương mại. Bé từng rất nhút nhát nhưng sau 3 tháng phục hồi tâm lý tại trạm, Cà Phê đã mở lòng, hay quấn chân tình nguyện viên và thích được ôm. Bé cần một gia đình kiên nhẫn, yêu thương nhẹ nhàng để giúp bé hoàn toàn vượt qua nỗi sợ hãi quá khứ.':
    'Ca Phe is a chocolate brown Poodle mix rescued from a commercial meat facility. Initially terrified, after 3 months of behavioral rehabilitation he has blossomed into a clingy, affectionate pup who loves hugs. He needs a patient, gentle family to continue rebuilding his trust.',

  // Mochi (pet-6)
  'Mochi là bé mèo tam thể may mắn được cứu trong đêm mưa bão. Bé có hoa văn tam thể sắc nét, tính tình hoạt bát, thích bắt bướm và leo cây cào móng. Ăn khỏe, đã tiêm đủ vaccine và tẩy giun. Rất thích hợp cho gia đình trẻ có không gian vui chơi ấm cúng.':
    'Mochi is a calico kitten rescued on a stormy night. She has striking markings, an energetic personality, and loves swatting toys and climbing scratching posts. Healthy appetite, fully vaccinated and dewormed. Ideal for an active family looking for a joyful companion.',

  // Sữa (pet-7)
  'Sữa là bé chó cỏ trắng tinh khôi được giải cứu từ bãi rác ngoại ô. Bé rất thông minh, trung thành và biết bảo vệ nhà. Rất thích ăn cơm trộn thịt nạc hoặc hạt dinh dưỡng. Đã hoàn tất tiêm phòng dại và triệt sản.':
    'Sua is a pure white native pup rescued from a suburban landfill. Super loyal, quick-witted, and a great watchdog. Enjoys balanced meals and kibble. Fully rabies-vaccinated and neutered.'
};

// Known Medical Condition translations
const MEDICAL_CONDITION_TRANSLATIONS: Record<string, string> = {
  'EXCELLENT': 'Excellent health',
  'GOOD': 'Good health',
  'RECOVERING': 'Recovering well',
  'SPECIAL_CARE': 'Requires special care',
  'Đã hoàn toàn khỏe mạnh sau điều trị viêm da. Ăn uống tốt, lanh lợi.': 'Fully recovered after dermatological care. Eating well, vibrant and energetic.',
  'Khỏe mạnh, mượt lông, sạch sẽ, đã tẩy giun và tiêm phòng 2 mũi.': 'Healthy, silky coat, clean, dewormed and completed 2 vaccine doses.',
  'Chân sau hồi phục 100% sau phẫu thuật, chạy nhảy linh hoạt, không còn đau nhức.': 'Hind leg 100% healed after surgery, runs and jumps flexibly with zero pain.',
  'Sức khỏe tốt, mắt và tai sạch sẽ, đã vệ sinh răng miệng định kỳ.': 'Good health, clean eyes and ears, dental check-up completed.',
  'Đã phục hồi thể lực, tinh thần ổn định, kiểm tra máu không có ký sinh trùng.': 'Physical stamina restored, emotionally stable, blood test negative for blood parasites.',
  'Ăn uống tốt, linh hoạt, đã sổ giun và tiêm 1 mũi vaccine 4 bệnh cho mèo.': 'Great appetite, agile, dewormed and received 1st dose of 4-way feline vaccine.'
};

// Known Personality habits & interests translations
const HABITS_INTERESTS_TRANSLATIONS: Record<string, string> = {
  'Thích chạy nhảy buổi sáng, biết đi vệ sinh đúng khay cát/bãi cỏ.': 'Loves morning runs, completely house-trained on grass and pad.',
  'Thích chơi bóng tennis và được gãi bụng.': 'Loves chasing tennis balls and getting belly rubs.',
  'Thích nằm cạnh cửa sổ ngắm chim, thích cào móng đúng trụ cào.': 'Loves window-watching birds and always uses scratching posts.',
  'Thích ăn pate cá ngừ và được chải lông lưng.': 'Loves tuna wet food and gentle back brushing.',
  'Thích chạy vòng quanh sân, chơi trò nhặt đồ và làm nũng.': 'Loves running in yards, playing fetch, and cuddling.',
  'Thích gặm xương đồ chơi cao su và ăn phô mai thưởng.': 'Loves chewing rubber toys and cheese training treats.',
  'Tính cách điềm tĩnh, ít kêu, thích ngủ trên đệm êm.': 'Calm temperament, rarely meows, loves napping on plush beds.',
  'Thích cần câu mèo lông vũ và nằm phơi nắng sáng.': 'Loves feather teaser wands and morning sunbathing.'
};

// Known Adoption Conditions translations
const CONDITION_TRANSLATIONS: Record<string, string> = {
  'Không xích nhốt liên tục': 'No continuous tethering / caging',
  'Không xích nhốt liên tục, có không gian vận động thoáng mát': 'No continuous tethering/caging, airy living space',
  'Có sự đồng thuận của mọi thành viên gia đình': 'Consent from all household members',
  'Tất cả thành viên trong gia đình/bạn cùng phòng đồng thuận nhận nuôi': 'All household/roommate members agree to adoption',
  'Cập nhật tình hình bé định kỳ tháng đầu': 'Periodic check-in photo/video updates during initial months',
  'Đồng ý cập nhật hình ảnh/video tình trạng bé định kỳ (1-3 tháng đầu)': 'Agree to periodic photo/video check-ins (months 1-3)',
  'Tài chính ổn định, sẵn sàng chi trả khám chữa bệnh & tiêm phòng định kỳ': 'Stable budget for routine veterinary visits & vaccinations',
  'Nhà có lưới ban công / rào chắn an toàn cho mèo': 'Safe balcony netting / cat-proof fencing installed',
  'Cam kết triệt sản đúng độ tuổi (nếu bé chưa triệt sản)': 'Commit to neutering at appropriate age (if not yet neutered)',
  'Không thả rông ngoài đường không có dây dắt': 'Never let roam unleashed in public streets',
  'Cam kết nuôi dưỡng trọn đời, không bỏ rơi hay bán lại': 'Lifelong commitment; strictly zero abandonment or commercial reselling',
  'Môi trường sống sạch sẽ, thoáng mát': 'Clean, well-ventilated indoor environment',
  'Có rào chắn ban công an toàn': 'Safe balcony netting / window safety screens'
};

// Known Application Reasons & Data
const APP_REASONS_TRANSLATIONS: Record<string, string> = {
  'Gia đình yêu thương thú cưng và muốn đón bé về chăm sóc như thành viên ruột thịt.':
    'Our family loves animals and wants to welcome this little friend as an official family member.',
  'Muốn có một người bạn đồng hành trung thành, nhà có sân rộng rất thích hợp cho bé chạy nhảy.':
    'Looking for a loyal companion; we have a spacious fenced yard perfect for active playtime.',
  'Tôi đã có kinh nghiệm nuôi mèo 3 năm, căn hộ có lưới an toàn và muốn đón bé Luna về làm bạn cùng bé mèo hiện tại.':
    'Experienced cat parent for 3 years; apartment is fully cat-proofed with balcony netting and I want Luna to be a companion for my current cat.',
  'Tôi sống một mình và có nhiều thời gian rảnh buổi tối, mong muốn nhận nuôi để cùng chia sẻ cuộc sống.':
    'Living independently with ample free evening hours; looking to adopt a companion to share daily life with.',
  'Gia đình tôi vừa chuyển về nhà riêng có vườn nhỏ, muốn đón một bé chó về chăm sóc và bầu bạn cùng các con.':
    'Our family recently moved into a house with a small yard; we want to adopt a rescued pup to befriend our children.'
};

// Known Rescue Post Titles & Descriptions
const RESCUE_POST_TRANSLATIONS: Record<string, { title: string; desc: string; needed: string }> = {
  'rescue-1': {
    title: 'Urgent: Need 30kg dog food and pneumonia medical fee support for 12 puppies in Binh Thanh',
    desc: 'Shelter took in 12 newborn puppies abandoned in styrofoam boxes during heavy rain. 4 puppies suffer from acute pneumonia requiring IV antibiotics and oxygen therapy. Feed and medical funds are depleted.',
    needed: '30kg Puppy Food + 3,500,000 VND medical fees'
  },
  'rescue-2': {
    title: 'Emergency: Seeking temporary foster for mother tabby cat and 4 newborns in District 7',
    desc: 'Spotted mother cat giving birth under a construction truck in dusty, dangerous conditions. Need volunteer foster for 3-4 weeks to provide a clean, safe nursery.',
    needed: '1 month foster home + 10 KMR kitten milk cans'
  },
  'rescue-3': {
    title: 'Call for orthopedic surgery support for pup injured in road accident in Cau Giay',
    desc: 'Pup hit by motorcycle with fractured left femur, currently in emergency care at Hanoi Vet Hospital. Surgery and post-op care estimated at 4,200,000 VND.',
    needed: '4,200,000 VND surgery fees'
  },
  'rescue-4': {
    title: 'Emergency food supply for 45 dogs and cats at Son Tra Rescue Station',
    desc: 'Following prolonged monsoon storms, food inventory was water damaged. Urgent dry food and wet food needed to sustain daily meals.',
    needed: '100kg dog/cat food + 50 canned wet food'
  }
};

/**
 * Universal text translator for descriptions, stories, notes, and dynamic strings.
 */
export function translateDynamicText(text: string | undefined, language: Language = 'vi'): string {
  if (!text) return '';
  if (language === 'vi') return text;

  // 1. Direct dictionary matches
  if (PET_DESCRIPTIONS[text]) return PET_DESCRIPTIONS[text];
  if (MEDICAL_CONDITION_TRANSLATIONS[text]) return MEDICAL_CONDITION_TRANSLATIONS[text];
  if (HABITS_INTERESTS_TRANSLATIONS[text]) return HABITS_INTERESTS_TRANSLATIONS[text];
  if (CONDITION_TRANSLATIONS[text]) return CONDITION_TRANSLATIONS[text];
  if (APP_REASONS_TRANSLATIONS[text]) return APP_REASONS_TRANSLATIONS[text];

  // 2. Intelligent pattern replacements for recurring phrases
  let res = text;

  // Medical phrases
  res = res.replace(/Tiêm phòng dại định kỳ \d{2}\/\d{2}\/\d{4}/gi, 'Periodic rabies vaccination completed');
  res = res.replace(/Tiêm vắc xin 7 bệnh mũi 2 \d{2}\/\d{2}\/\d{4}/gi, '7-in-1 vaccine dose 2 completed');
  res = res.replace(/Tiêm phòng dại định kỳ/gi, 'Rabies vaccine updated');
  res = res.replace(/Tiêm vắc xin 7 bệnh mũi 2/gi, '7-in-1 vaccine (2nd dose)');
  res = res.replace(/Đã triệt sản và kiểm tra sức khỏe tổng quát/gi, 'Spayed/neutered and general health checked');
  res = res.replace(/Tiêm phòng 4 bệnh mũi 2 ngày \d{2}\/\d{2}\/\d{4}/gi, '4-way vaccine dose 2 completed');
  res = res.replace(/Tiêm phòng 4 bệnh mũi 2/gi, '4-way feline vaccine (2nd dose)');
  res = res.replace(/Triệt sản ngày \d{2}\/\d{2}\/\d{4}/gi, 'Neutered / Spayed');
  res = res.replace(/Đã tiêm phòng bệnh/gi, 'Vaccinated');
  res = res.replace(/Chưa tiêm phòng/gi, 'Not vaccinated');
  res = res.replace(/Đã triệt sản/gi, 'Spayed / Neutered');
  res = res.replace(/Chưa triệt sản/gi, 'Not neutered');
  res = res.replace(/Đã tiêm phòng dại/gi, 'Rabies vaccinated');
  res = res.replace(/Chưa tiêm dại/gi, 'No rabies shot');
  res = res.replace(/Đã tẩy giun định kỳ/gi, 'Dewormed routinely');
  res = res.replace(/Chưa tẩy giun/gi, 'Not dewormed');

  // Housing & Living space
  res = res.replace(/Nhà riêng có sân vườn\/cổng rào/gi, 'Private house with fenced yard/gate');
  res = res.replace(/Căn hộ\/Chung cư cho phép nuôi thú cưng/gi, 'Pet-friendly apartment / condo');
  res = res.replace(/Nhà riêng/gi, 'Private House');
  res = res.replace(/Căn hộ chung cư/gi, 'Apartment / Condominium');
  res = res.replace(/Phòng trọ/gi, 'Rented Room / Studio');
  res = res.replace(/Khác/gi, 'Other');

  // Budgets & Schedules
  res = res.replace(/Bản thân trực tiếp chăm sóc/gi, 'Self primary caregiver');
  res = res.replace(/Người thân trong gia đình cùng chăm/gi, 'Shared with family members');
  res = res.replace(/3 - 4 giờ \/ ngày/gi, '3 - 4 hours / day');
  res = res.replace(/1 - 2 giờ \/ ngày/gi, '1 - 2 hours / day');
  res = res.replace(/> 5 giờ \/ ngày/gi, '> 5 hours / day');
  res = res.replace(/giờ \/ ngày/gi, 'hours / day');
  res = res.replace(/giờ\/ngày/gi, 'hours/day');
  res = res.replace(/VNĐ/gi, 'VND');

  // General vocabulary
  res = res.replace(/Nhân viên văn phòng/gi, 'Office Professional');
  res = res.replace(/Kinh doanh tự do/gi, 'Self-employed / Freelancer');
  res = res.replace(/Sinh viên/gi, 'Student');
  res = res.replace(/Tình nguyện viên/gi, 'Volunteer');
  res = res.replace(/Bác sĩ thú y/gi, 'Veterinarian');
  res = res.replace(/Trưởng trạm cứu hộ/gi, 'Shelter Director');

  return res;
}

/**
 * Translates a pet's full dataset when in English mode.
 */
export function translatePetData(pet: Pet, language?: Language): Pet;
export function translatePetData(pet: Pet | null | undefined, language?: Language): Pet | null;
export function translatePetData(pet: Pet | null | undefined, language: Language = 'vi'): Pet | null {
  if (!pet) return null;
  if (language === 'vi') return pet;

  return {
    ...pet,
    breed: translateBreed(pet.breed, 'en'),
    color: translateColor(pet.color, 'en'),
    ageDisplay: translateAgeDisplay(pet.ageDisplay || pet.age, 'en'),
    location: translateAddress(pet.location, 'en'),
    description: translateDynamicText(pet.description, 'en'),
    health: pet.health ? {
      ...pet.health,
      conditionDescription: translateDynamicText(pet.health.conditionDescription, 'en'),
      medicalNotes: translateDynamicText(pet.health.medicalNotes, 'en'),
      medicalHistory: (pet.health.medicalHistory || []).map((m: string) => translateDynamicText(m, 'en'))
    } : pet.health,
    personality: pet.personality ? {
      ...pet.personality,
      tags: (pet.personality.tags || (pet.personality as any).traits || []).map((t: string) => translatePersonalityTag(t, 'en')),
      habits: translateDynamicText(pet.personality.habits, 'en'),
      interests: translateDynamicText(pet.personality.interests, 'en')
    } : pet.personality,
    adoptionReqs: pet.adoptionReqs ? {
      ...pet.adoptionReqs,
      postingReason: translateDynamicText(pet.adoptionReqs.postingReason, 'en'),
      conditions: (pet.adoptionReqs.conditions || []).map((c: string) => translateDynamicText(c, 'en')),
      handoverLocation: translateAddress(pet.adoptionReqs.handoverLocation, 'en')
    } : pet.adoptionReqs,
    requirements: pet.requirements ? {
      ...pet.requirements,
      conditions: (pet.requirements.conditions || []).map((c: string) => translateDynamicText(c, 'en'))
    } : pet.requirements
  };
}

/**
 * Translates rescue post data when in English mode.
 */
export function translateRescuePostData(post: RescuePost, language?: Language): RescuePost;
export function translateRescuePostData(post: RescuePost | null | undefined, language?: Language): RescuePost | null;
export function translateRescuePostData(post: RescuePost | null | undefined, language: Language = 'vi'): RescuePost | null {
  if (!post) return null;
  if (language === 'vi') return post;

  const translation = RESCUE_POST_TRANSLATIONS[post.id];
  return {
    ...post,
    title: translation ? translation.title : post.title,
    description: translation ? translation.desc : translateDynamicText(post.description, 'en'),
    quantityNeeded: translation ? translation.needed : post.quantityNeeded,
    supportLocation: translateAddress(post.supportLocation, 'en'),
    shelterName: translateShelterName(post.shelterName, 'en'),
    shelterAddress: translateAddress(post.shelterAddress, 'en')
  };
}
