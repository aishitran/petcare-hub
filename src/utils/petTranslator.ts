import { Language } from '../context/LanguageContext';

export const BREED_TRANSLATIONS: Record<string, string> = {
  'Poodle': 'Poodle',
  'Poodle Nâu Đỏ': 'Red Brown Poodle',
  'Poodle Tiny': 'Tiny Poodle',
  'Poodle Toy': 'Toy Poodle',
  'Chó cỏ': 'Local Breed Dog',
  'Chó cỏ / Lai': 'Mixed Breed Dog',
  'Chó cỏ lai': 'Mixed Breed Dog',
  'Chó ta': 'Vietnamese Native Dog',
  'Chó Ta': 'Vietnamese Native Dog',
  'Chó Bắc Hà': 'Bac Ha Dog',
  'Chó Phú Quốc': 'Phu Quoc Ridgeback',
  'Chó H\'Mông cộc đuôi': 'H\'Mong Bobtail Dog',
  'Golden Retriever': 'Golden Retriever',
  'Labrador': 'Labrador Retriever',
  'Corgi': 'Corgi',
  'Husky': 'Husky',
  'Pug': 'Pug',
  'Phốc sóc (Pomeranian)': 'Pomeranian',
  'Phốc sóc': 'Pomeranian',
  'Chihuahua': 'Chihuahua',
  'Shiba Inu': 'Shiba Inu',
  'Mèo Ta': 'Vietnamese Native Cat',
  'Mèo ta': 'Vietnamese Native Cat',
  'Mèo Mướp': 'Tabby Cat',
  'Mèo mướp': 'Tabby Cat',
  'Mèo Tam Thể': 'Calico Cat',
  'Mèo tam thể': 'Calico Cat',
  'Mèo Vàng': 'Ginger / Orange Cat',
  'Mèo vàng': 'Ginger / Orange Cat',
  'Mèo Đen': 'Black Cat',
  'Mèo đen': 'Black Cat',
  'Mèo Anh lông ngắn': 'British Shorthair (BSH)',
  'Mèo Anh lông dài': 'British Longhair (BLH)',
  'Mèo Ba Tư': 'Persian Cat',
  'Mèo Xiêm': 'Siamese Cat',
  'Mèo Ragdoll': 'Ragdoll Cat',
  'Mèo Munchkin': 'Munchkin Cat',
  'Mèo Scottish Fold': 'Scottish Fold Cat'
};

export const COLOR_TRANSLATIONS: Record<string, string> = {
  'Nâu socola': 'Chocolate Brown',
  'Nâu đỏ': 'Reddish Brown',
  'Nâu': 'Brown',
  'Trắng': 'White',
  'Trắng tuyền': 'Pure White',
  'Đen': 'Black',
  'Đen tuyền': 'Solid Black',
  'Vàng': 'Golden / Ginger',
  'Vàng mơ': 'Cream / Apricot',
  'Vàng trắng': 'Yellow & White',
  'Trắng & Vàng': 'White & Orange',
  'Trắng & Đen': 'Black & White',
  'Xám': 'Grey / Smoke',
  'Xám tro': 'Ash Grey',
  'Xám khói': 'Smoke Grey',
  'Xám trắng': 'Grey & White',
  'Tam thể': 'Calico',
  'Nhị thể': 'Bicolor',
  'Vằn vện': 'Brindle',
  'Mướp': 'Tabby',
  'Mướp xám': 'Grey Tabby',
  'Mướp vàng': 'Ginger Tabby'
};

export const PERSONALITY_TAG_TRANSLATIONS: Record<string, string> = {
  'Cực kỳ thông minh': 'Super Intelligent',
  'Quấn chân': 'Affectionate & Clingy',
  'Không rụng lông': 'Hypoallergenic / Low-shed',
  'Ngoan ngoãn': 'Well-behaved',
  'Hiền lành': 'Gentle & Calm',
  'Năng động': 'Energetic & Playful',
  'Thích vận động': 'Active & Outdoorsy',
  'Thân thiện với trẻ em': 'Great with Kids',
  'Thân thiện với mèo': 'Cat-friendly',
  'Thân thiện với chó khác': 'Dog-friendly',
  'Đã tiêm phòng': 'Fully Vaccinated',
  'Đã triệt sản': 'Spayed / Neutered',
  'Đã tẩy giun': 'Dewormed',
  'Thích được ôm': 'Loves Cuddling',
  'Ăn uống dễ': 'Easy Eater',
  'Biết đi vệ sinh khay': 'Litter Trained',
  'Biết nghe lời': 'Obedient',
  'Bảo vệ nhà tốt': 'Good Watchdog',
  'Thích vuốt ve': 'Loves Petting',
  'Điềm tĩnh': 'Calm & Quiet',
  'Rất tình cảm': 'Very Loving',
  'Háo hức': 'Enthusiastic',
  'Tự lập': 'Independent',
  'Trầm tính': 'Quiet & Mellow',
  'Cần người kiên nhẫn': 'Needs Patient Owner',
  'Thích chơi bóng': 'Loves Fetching Balls',
  'Thích dạo phố': 'Loves Walking'
};

export const translateBreed = (breed?: string, lang: Language = 'vi'): string => {
  if (!breed) return '';
  if (lang === 'vi') return breed;
  if (BREED_TRANSLATIONS[breed]) return BREED_TRANSLATIONS[breed];
  
  // Fuzzy replace known keywords
  let res = breed;
  for (const [k, v] of Object.entries(BREED_TRANSLATIONS)) {
    if (res.includes(k)) {
      res = res.replace(k, v);
    }
  }
  return res;
};

export const translateColor = (color?: string, lang: Language = 'vi'): string => {
  if (!color) return '';
  if (lang === 'vi') return color;
  if (COLOR_TRANSLATIONS[color]) return COLOR_TRANSLATIONS[color];
  
  let res = color;
  for (const [k, v] of Object.entries(COLOR_TRANSLATIONS)) {
    if (res.includes(k)) {
      res = res.replace(k, v);
    }
  }
  return res;
};

export const translatePersonalityTag = (tag?: string, lang: Language = 'vi'): string => {
  if (!tag) return '';
  if (lang === 'vi') return tag;
  return PERSONALITY_TAG_TRANSLATIONS[tag] || tag;
};

export const translateAgeDisplay = (ageDisplay?: string, lang: Language = 'vi'): string => {
  if (!ageDisplay) return '';
  if (lang === 'vi') return ageDisplay;
  return ageDisplay
    .replace(/tuổi/g, 'yrs old')
    .replace(/tháng/g, 'months')
    .replace(/năm/g, 'years')
    .replace(/tuần/g, 'weeks')
    .replace(/ngày/g, 'days');
};
