// Address and Location Translator Utility for PetCare Hub
// Translates Vietnamese addresses, districts, cities, and shelter names to English when language is 'en'.

export const CITY_TRANSLATIONS: Record<string, { vi: string; en: string }> = {
  'TP. Hồ Chí Minh': { vi: 'TP. Hồ Chí Minh', en: 'Ho Chi Minh City' },
  'Hồ Chí Minh': { vi: 'TP. Hồ Chí Minh', en: 'Ho Chi Minh City' },
  'TP.HCM': { vi: 'TP. Hồ Chí Minh', en: 'Ho Chi Minh City' },
  'Hà Nội': { vi: 'Hà Nội', en: 'Hanoi' },
  'Đà Nẵng': { vi: 'Đà Nẵng', en: 'Da Nang' },
  'Cần Thơ': { vi: 'Cần Thơ', en: 'Can Tho' },
  'Hải Phòng': { vi: 'Hải Phòng', en: 'Hai Phong' },
  'Bình Dương': { vi: 'Bình Dương', en: 'Binh Duong' },
  'Đồng Nai': { vi: 'Đồng Nai', en: 'Dong Nai' },
  'ALL': { vi: 'Tất cả khu vực', en: 'All Regions' },
};

export const DISTRICT_TRANSLATIONS: Record<string, { vi: string; en: string }> = {
  'Quận 1': { vi: 'Quận 1', en: 'District 1' },
  'Quận 2': { vi: 'Quận 2', en: 'District 2' },
  'Quận 3': { vi: 'Quận 3', en: 'District 3' },
  'Quận 4': { vi: 'Quận 4', en: 'District 4' },
  'Quận 5': { vi: 'Quận 5', en: 'District 5' },
  'Quận 6': { vi: 'Quận 6', en: 'District 6' },
  'Quận 7': { vi: 'Quận 7', en: 'District 7' },
  'Quận 8': { vi: 'Quận 8', en: 'District 8' },
  'Quận 9': { vi: 'Quận 9', en: 'District 9' },
  'Quận 10': { vi: 'Quận 10', en: 'District 10' },
  'Quận 11': { vi: 'Quận 11', en: 'District 11' },
  'Quận 12': { vi: 'Quận 12', en: 'District 12' },
  'Quận Bình Thạnh': { vi: 'Quận Bình Thạnh', en: 'Binh Thanh District' },
  'Quận Tân Bình': { vi: 'Quận Tân Bình', en: 'Tan Binh District' },
  'Quận Phú Nhuận': { vi: 'Quận Phú Nhuận', en: 'Phu Nhuan District' },
  'Quận Gò Vấp': { vi: 'Quận Gò Vấp', en: 'Go Vap District' },
  'Quận Tân Phú': { vi: 'Quận Tân Phú', en: 'Tan Phu District' },
  'Quận Bình Tân': { vi: 'Quận Bình Tân', en: 'Binh Tan District' },
  'TP. Thủ Đức': { vi: 'TP. Thủ Đức', en: 'Thu Duc City' },
  'Huyện Nhà Bè': { vi: 'Huyện Nhà Bè', en: 'Nha Be District' },
  'Huyện Hóc Môn': { vi: 'Huyện Hóc Môn', en: 'Hoc Mon District' },
  'Huyện Củ Chi': { vi: 'Huyện Củ Chi', en: 'Cu Chi District' },
  'Huyện Bình Chánh': { vi: 'Huyện Bình Chánh', en: 'Binh Chanh District' },
  'Quận Đống Đa': { vi: 'Quận Đống Đa', en: 'Dong Da District' },
  'Quận Tây Hồ': { vi: 'Quận Tây Hồ', en: 'Tay Ho District' },
  'Quận Cầu Giấy': { vi: 'Quận Cầu Giấy', en: 'Cau Giay District' },
  'Quận Hoàn Kiếm': { vi: 'Quận Hoàn Kiếm', en: 'Hoan Kiem District' },
  'Quận Ba Đình': { vi: 'Quận Ba Đình', en: 'Ba Dinh District' },
  'Quận Hai Bà Trưng': { vi: 'Quận Hai Bà Trưng', en: 'Hai Ba Trung District' },
  'Quận Thanh Xuân': { vi: 'Quận Thanh Xuân', en: 'Thanh Xuan District' },
  'Quận Hoàng Mai': { vi: 'Quận Hoàng Mai', en: 'Hoang Mai District' },
  'Quận Hải Châu': { vi: 'Quận Hải Châu', en: 'Hai Chau District' },
  'Quận Thanh Khê': { vi: 'Quận Thanh Khê', en: 'Thanh Khe District' },
  'Quận Sơn Trà': { vi: 'Quận Sơn Trà', en: 'Son Tra District' },
  'Quận Ngũ Hành Sơn': { vi: 'Quận Ngũ Hành Sơn', en: 'Ngu Hanh Son District' },
  'Quận Ninh Kiều': { vi: 'Quận Ninh Kiều', en: 'Ninh Kieu District' },
  'Quận Cái Răng': { vi: 'Quận Cái Răng', en: 'Cai Rang District' },
  'Quận Bình Thủy': { vi: 'Quận Bình Thủy', en: 'Binh Thuy District' },
};

// Known full addresses mapping
const EXACT_ADDRESS_MAP: Record<string, string> = {
  '152/24 Nguyễn Xí, Phường 26, Quận Bình Thạnh, TP. Hồ Chí Minh': '152/24 Nguyen Xi St, Ward 26, Binh Thanh Dist, Ho Chi Minh City',
  '88/12 Cộng Hòa, Phường 4, Quận Tân Bình, TP. Hồ Chí Minh': '88/12 Cong Hoa St, Ward 4, Tan Binh Dist, Ho Chi Minh City',
  '45 Đường số 8, Phường Linh Xuân, TP. Thủ Đức, TP. Hồ Chí Minh': '45 Street 8, Linh Xuan Ward, Thu Duc City, Ho Chi Minh City',
  '124A Nguyễn Thị Thập, Phường Tân Hưng, Quận 7, TP. Hồ Chí Minh': '124A Nguyen Thi Thap St, Tan Hung Ward, District 7, Ho Chi Minh City',
  '68 Ngõ 198 Xã Đàn, Phường Nam Đồng, Quận Đống Đa, Hà Nội': '68 Alley 198 Xa Dan St, Nam Dong Ward, Dong Da Dist, Hanoi',
  '32 Ngõ 275 Âu Cơ, Phường Quảng An, Quận Tây Hồ, Hà Nội': '32 Alley 275 Au Co St, Quang An Ward, Tay Ho Dist, Hanoi',
  '115 Trưng Nữ Vương, Phường Bình Hiên, Quận Hải Châu, TP. Đà Nẵng': '115 Trung Nu Vuong St, Binh Hien Ward, Hai Chau Dist, Da Nang',
  '76 Mậu Thân, Phường An Hòa, Quận Ninh Kiều, TP. Cần Thơ': '76 Mau Than St, An Hoa Ward, Ninh Kieu Dist, Can Tho',
  'Ấp 3, Xã Phước Kiển, Huyện Nhà Bè, TP.HCM': 'Hamlet 3, Phuoc Kien Commune, Nha Be Dist, Ho Chi Minh City',
  'Số 45/2 Đường Điện Biên Phủ, Phường 15, Quận Bình Thạnh, TP.HCM': '45/2 Dien Bien Phu St, Ward 15, Binh Thanh Dist, Ho Chi Minh City',
  'Khu vực Nhà Bè / Quận 7, TP.HCM': 'Nha Be / District 7, Ho Chi Minh City',
  'Khu vực Phú Mỹ Hưng, Quận 7, TP.HCM': 'Phu My Hung, District 7, Ho Chi Minh City',
  'Quận 7, TP. Hồ Chí Minh': 'District 7, Ho Chi Minh City',
  'Quận Bình Thạnh, TP. Hồ Chí Minh': 'Binh Thanh District, Ho Chi Minh City',
  'TP. Thủ Đức, TP. Hồ Chí Minh': 'Thu Duc City, Ho Chi Minh City',
  'Quận Tân Bình, TP. Hồ Chí Minh': 'Tan Binh District, Ho Chi Minh City',
  'Quận Cầu Giấy, Hà Nội': 'Cau Giay District, Hanoi',
  'Quận Đống Đa, Hà Nội': 'Dong Da District, Hanoi',
  'Quận Tây Hồ, Hà Nội': 'Tay Ho District, Hanoi',
  'Quận Hải Châu, Đà Nẵng': 'Hai Chau District, Da Nang',
  'Quận Ninh Kiều, Cần Thơ': 'Ninh Kieu District, Can Tho',
};

// Known shelter names in English
const SHELTER_NAME_MAP: Record<string, string> = {
  'Trạm Cứu Trợ Động Vật Sài Gòn Time (SGT)': 'Saigon Time Animal Rescue (SGT)',
  'Đội Cứu Hộ Động Vật Tình Nguyện SAR Sài Gòn': 'SAR Saigon Volunteer Animal Rescue Team',
  'Trạm Bảo Trợ Chó Mèo Vườn Hồng': 'Rose Garden Dog & Cat Shelter',
  'Bệnh Viện Thú Y Tiếp Nhận Cấp Cứu PetCare Quận 7': 'PetCare Emergency Veterinary Hospital District 7',
  'Trạm Cứu Hộ Chó Mèo Hà Nội (CPAP)': 'Hanoi Pet Rescue Station (CPAP)',
  'Nhóm Cứu Trợ Động Vật Sân Nhà Nhiều Chó': 'Many Dogs Yard Animal Rescue Group',
  'Đội Cứu Hộ Động Vật Đà Nẵng (Danang Pet Rescue)': 'Danang Pet Rescue Volunteer Team',
  'Trạm Cứu Trợ Động Vật Tây Đô Cần Thơ': 'Tay Do Animal Rescue Station Can Tho',
  'Trạm Cứu Hộ Động Vật Sài Gòn Time (Cơ sở Nhà Bè)': 'Saigon Time Animal Rescue (Nha Be Branch)',
  'Phòng khám Thú Y PetCare & Trạm Lưu Viện Bình Thạnh': 'PetCare Veterinary Clinic & Shelter Binh Thanh',
};

/**
 * Translates a city name based on active language.
 */
export function translateCity(city: string | undefined, language: 'vi' | 'en'): string {
  if (!city) return '';
  if (language === 'vi') return city;
  return CITY_TRANSLATIONS[city]?.en || city;
}

/**
 * Translates a district name based on active language.
 */
export function translateDistrict(district: string | undefined, language: 'vi' | 'en'): string {
  if (!district) return '';
  if (language === 'vi') return district;
  return DISTRICT_TRANSLATIONS[district]?.en || district;
}

/**
 * Translates a shelter or station name into English if language is 'en'.
 */
export function translateShelterName(name: string | undefined, language: 'vi' | 'en'): string {
  if (!name) return '';
  if (language === 'vi') return name;
  return SHELTER_NAME_MAP[name] || name;
}

/**
 * Translates any general address or location string into English.
 */
export function translateAddress(address: string | undefined, language: 'vi' | 'en'): string {
  if (!address) return '';
  if (language === 'vi') return address;

  // 1. Check exact match in dictionary
  if (EXACT_ADDRESS_MAP[address]) {
    return EXACT_ADDRESS_MAP[address];
  }

  // 2. Perform intelligent pattern replacement
  let res = address;

  // City replacements
  res = res.replace(/TP\.\s*Hồ Chí Minh|TP\.HCM|TPHCM|Hồ Chí Minh/gi, 'Ho Chi Minh City');
  res = res.replace(/Hà Nội/gi, 'Hanoi');
  res = res.replace(/TP\.\s*Đà Nẵng|Đà Nẵng/gi, 'Da Nang');
  res = res.replace(/TP\.\s*Cần Thơ|Cần Thơ/gi, 'Can Tho');
  res = res.replace(/Hải Phòng/gi, 'Hai Phong');

  // District replacements
  res = res.replace(/Quận\s*(\d+)/gi, 'District $1');
  res = res.replace(/Q\.\s*(\d+)/gi, 'District $1');
  res = res.replace(/TP\.\s*Thủ Đức/gi, 'Thu Duc City');
  res = res.replace(/Quận\s*Bình Thạnh/gi, 'Binh Thanh Dist');
  res = res.replace(/Quận\s*Tân Bình/gi, 'Tan Binh Dist');
  res = res.replace(/Quận\s*Phú Nhuận/gi, 'Phu Nhuan Dist');
  res = res.replace(/Quận\s*Gò Vấp/gi, 'Go Vap Dist');
  res = res.replace(/Quận\s*Tân Phú/gi, 'Tan Phu Dist');
  res = res.replace(/Quận\s*Bình Tân/gi, 'Binh Tan Dist');
  res = res.replace(/Quận\s*Đống Đa/gi, 'Dong Da Dist');
  res = res.replace(/Quận\s*Tây Hồ/gi, 'Tay Ho Dist');
  res = res.replace(/Quận\s*Cầu Giấy/gi, 'Cau Giay Dist');
  res = res.replace(/Quận\s*Hoàn Kiếm/gi, 'Hoan Kiem Dist');
  res = res.replace(/Quận\s*Hải Châu/gi, 'Hai Chau Dist');
  res = res.replace(/Quận\s*Thanh Khê/gi, 'Thanh Khe Dist');
  res = res.replace(/Quận\s*Ninh Kiều/gi, 'Ninh Kieu Dist');
  res = res.replace(/Huyện\s*Nhà Bè/gi, 'Nha Be Dist');
  res = res.replace(/Huyện\s*Hóc Môn/gi, 'Hoc Mon Dist');
  res = res.replace(/Huyện\s*Củ Chi/gi, 'Cu Chi Dist');
  res = res.replace(/Huyện\s*Bình Chánh/gi, 'Binh Chanh Dist');

  // Ward and Street replacements
  res = res.replace(/Phường\s*(\d+)/gi, 'Ward $1');
  res = res.replace(/P\.\s*(\d+)/gi, 'Ward $1');
  res = res.replace(/Phường\s*([A-Za-zÀ-ỹ\s0-9]+)/gi, '$1 Ward');
  res = res.replace(/Xã\s*([A-Za-zÀ-ỹ\s0-9]+)/gi, '$1 Commune');
  res = res.replace(/Đường\s*([A-Za-zÀ-ỹ\s0-9]+)/gi, '$1 St');
  res = res.replace(/Ngõ\s*(\d+)/gi, 'Alley $1');
  res = res.replace(/Hẻm\s*([0-9/]+)/gi, 'Alley $1');
  res = res.replace(/Số\s*([0-9/]+)/gi, 'No. $1');
  res = res.replace(/Khu vực\s*/gi, '');

  return res;
}
