import { EmergencyShelter, ShelterSupplyCategory } from '../types/shelter';

export const getShelterSupplyCategories = (shelterId: string, shelterName: string): ShelterSupplyCategory[] => [
  {
    category: 'FOOD',
    title: 'Thực phẩm',
    titleEn: 'Food & Nutrition',
    summary: 'Thức ăn khô cho chó, thức ăn khô cho mèo, thức ăn ướt, sữa cho thú cưng...',
    summaryEn: 'Dry dog food, dry cat food, wet food / canned pate, milk for newborn pets...',
    itemCount: 4,
    items: [
      {
        id: `${shelterId}-food-1`,
        name: 'Thức ăn khô cho chó (Hạt dinh dưỡng Smartheart/Ganador)',
        nameEn: 'Dry Dog Food (Smartheart/Ganador Kibble)',
        category: 'FOOD',
        quantityNeeded: '60 kg',
        quantityNeededEn: '60 kg',
        quantityReceived: '25 kg',
        quantityReceivedEn: '25 kg',
        urgent: true,
        notes: 'Ưu tiên các dòng hạt dinh dưỡng bồi bổ thể lực cho đàn chó phục hồi',
        notesEn: 'Prefer nutritional kibble for recovering rescue dogs'
      },
      {
        id: `${shelterId}-food-2`,
        name: 'Thức ăn khô cho mèo (Hạt Catsrang / Minino)',
        nameEn: 'Dry Cat Food (Catsrang / Minino Kibble)',
        category: 'FOOD',
        quantityNeeded: '40 kg',
        quantityNeededEn: '40 kg',
        quantityReceived: '18 kg',
        quantityReceivedEn: '18 kg',
        urgent: true,
        notes: 'Dành cho đàn 35 bé mèo mồ côi và mèo hậu phẫu',
        notesEn: 'For 35 rescued and post-op shelter cats'
      },
      {
        id: `${shelterId}-food-3`,
        name: 'Pate / Thức ăn ướt phục hồi (Lon 400g / túi)',
        nameEn: 'Wet Food / Recovery Pate (400g cans/pouches)',
        category: 'FOOD',
        quantityNeeded: '50 lon',
        quantityNeededEn: '50 cans',
        quantityReceived: '15 lon',
        quantityReceivedEn: '15 cans',
        notes: 'Trộn thuốc và bổ sung đạm cho các bé ốm, mới phẫu thuật',
        notesEn: 'Used to mix medications and nourish sick/post-op pets'
      },
      {
        id: `${shelterId}-food-4`,
        name: 'Sữa bột dinh dưỡng cho chó mèo con (Bio Milk / KMR)',
        nameEn: 'Pet Powdered Milk for Kittens & Puppies (Bio Milk / KMR)',
        category: 'FOOD',
        quantityNeeded: '12 hộp',
        quantityNeededEn: '12 boxes',
        quantityReceived: '4 hộp',
        quantityReceivedEn: '4 boxes',
        urgent: true,
        notes: 'Nuôi bộ các lứa sơ sinh bị vứt bỏ mất mẹ',
        notesEn: 'For hand-feeding orphaned neonates'
      }
    ]
  },
  {
    category: 'MEDICAL',
    title: 'Vật tư y tế',
    titleEn: 'Medical Supplies',
    summary: 'Thuốc tẩy giun, thuốc kháng sinh, vắc xin, băng gạc, thuốc điều trị ve rận...',
    summaryEn: 'Deworming tablets, antibiotics, vaccines, gauze bandages, flea & tick treatments...',
    itemCount: 5,
    items: [
      {
        id: `${shelterId}-med-1`,
        name: 'Thuốc tẩy giun cho chó mèo (Endogard / Sanpet)',
        nameEn: 'Deworming Tablets (Endogard / Sanpet)',
        category: 'MEDICAL',
        quantityNeeded: '30 viên',
        quantityNeededEn: '30 tablets',
        quantityReceived: '10 viên',
        quantityReceivedEn: '10 tablets',
        urgent: true,
        notes: 'Tẩy giun định kỳ khi tiếp nhận ca mới ngoài đường',
        notesEn: 'Routine deworming upon street intake'
      },
      {
        id: `${shelterId}-med-2`,
        name: 'Thuốc nhỏ gáy trị ve rận, bọ chét (Frontline / Bravecto / Nexgard)',
        nameEn: 'Topical Flea & Tick Treatment (Frontline / Bravecto / Nexgard)',
        category: 'MEDICAL',
        quantityNeeded: '20 tuýp',
        quantityNeededEn: '20 pipettes',
        quantityReceived: '6 tuýp',
        quantityReceivedEn: '6 pipettes',
        urgent: true,
        notes: 'Điều trị ký sinh trùng máu và ve rận cho ca cứu hộ nặng',
        notesEn: 'Treating blood parasites and tick infestations'
      },
      {
        id: `${shelterId}-med-3`,
        name: 'Vắc xin phòng 5-7 bệnh cho chó & 4 bệnh cho mèo',
        nameEn: 'Core Vaccines (5-in-1 / 7-in-1 for dogs, 4-in-1 for cats)',
        category: 'MEDICAL',
        quantityNeeded: '25 liều',
        quantityNeededEn: '25 doses',
        quantityReceived: '8 liều',
        quantityReceivedEn: '8 doses',
        notes: 'Tạo miễn dịch cộng đồng phòng dịch Parvo, Care, Giảm bạch cầu',
        notesEn: 'Preventing shelter disease outbreaks'
      },
      {
        id: `${shelterId}-med-4`,
        name: 'Băng gạc tiệt trùng, bông gòn & gạc mỡ chống dính',
        nameEn: 'Sterile Gauze Bandages, Cotton & Non-stick Pads',
        category: 'MEDICAL',
        quantityNeeded: '40 cuộn',
        quantityNeededEn: '40 rolls',
        quantityReceived: '12 cuộn',
        quantityReceivedEn: '12 rolls',
        notes: 'Băng bó vết thương hở tai nạn giao thông',
        notesEn: 'Wound dressing for traffic accident rescues'
      },
      {
        id: `${shelterId}-med-5`,
        name: 'Dung dịch cồn sát trùng Povidine & Nước muối sinh lý 0.9%',
        nameEn: 'Povidone Iodine Antiseptic & 0.9% Saline Solution',
        category: 'MEDICAL',
        quantityNeeded: '15 chai (500ml)',
        quantityNeededEn: '15 bottles (500ml)',
        quantityReceived: '5 chai',
        quantityReceivedEn: '5 bottles',
        notes: 'Rửa vết thương hằng ngày',
        notesEn: 'Daily wound cleansing'
      }
    ]
  },
  {
    category: 'HYGIENE',
    title: 'Chăm sóc & vệ sinh',
    titleEn: 'Care & Sanitation',
    summary: 'Cát vệ sinh, khăn, sữa tắm, dung dịch sát khuẩn...',
    summaryEn: 'Cat litter, towels, pet shampoo, disinfectant solutions...',
    itemCount: 3,
    items: [
      {
        id: `${shelterId}-hyg-1`,
        name: 'Cát vệ sinh cho mèo (Cát đậu nành / đất sét vón cục)',
        nameEn: 'Cat Litter (Tofu / Clumping Bentonite)',
        category: 'HYGIENE',
        quantityNeeded: '180 kg (36 bao 5kg)',
        quantityNeededEn: '180 kg (36 bags 5kg)',
        quantityReceived: '60 kg',
        quantityReceivedEn: '60 kg',
        urgent: true,
        notes: 'Nhu cầu dùng hàng ngày cho các phòng cách ly mèo',
        notesEn: 'Daily essential for cat quarantine rooms'
      },
      {
        id: `${shelterId}-hyg-2`,
        name: 'Dung dịch sát khuẩn chuồng Cloramin B / Dettol khử mùi',
        nameEn: 'Shelter Disinfectant Cloramin B / Dettol',
        category: 'HYGIENE',
        quantityNeeded: '20 lít',
        quantityNeededEn: '20 liters',
        quantityReceived: '8 lít',
        quantityReceivedEn: '8 liters',
        notes: 'Xịt khử khuẩn phòng ngừa lây nhiễm chéo',
        notesEn: 'Spraying to prevent cross-contamination'
      },
      {
        id: `${shelterId}-hyg-3`,
        name: 'Sữa tắm trị nấm, viêm da & diệt khuẩn cho chó mèo',
        nameEn: 'Medicated Antifungal & Antibacterial Shampoo',
        category: 'HYGIENE',
        quantityNeeded: '10 chai (500ml)',
        quantityNeededEn: '10 bottles (500ml)',
        quantityReceived: '3 chai',
        quantityReceivedEn: '3 bottles',
        notes: 'Tắm trị liệu cho các ca ghẻ demodex, nấm nặng',
        notesEn: 'Therapeutic baths for severe mange and fungal cases'
      }
    ]
  },
  {
    category: 'OTHER',
    title: 'Khác',
    titleEn: 'Others & Equipment',
    summary: 'Chăn, đệm, lồng vận chuyển, đồ chơi...',
    summaryEn: 'Blankets, bedding, pet transport crates, chew toys...',
    itemCount: 2,
    items: [
      {
        id: `${shelterId}-oth-1`,
        name: 'Chăn nỉ, đệm lót giữ ấm & khăn bông cũ sạch',
        nameEn: 'Fleece Blankets, Warm Bedding & Clean Towels',
        category: 'OTHER',
        quantityNeeded: '30 chiếc',
        quantityNeededEn: '30 pcs',
        quantityReceived: '12 chiếc',
        quantityReceivedEn: '12 pcs',
        notes: 'Giữ ấm chuồng cho các ca thú sơ sinh và hậu phẫu',
        notesEn: 'Keeping newborn and post-op rescues warm'
      },
      {
        id: `${shelterId}-oth-2`,
        name: 'Lồng vận chuyển thú cưng inox hoặc nhựa cứng (Size M / L)',
        nameEn: 'Pet Transport Crates (Stainless Steel / Hard Plastic Size M/L)',
        category: 'OTHER',
        quantityNeeded: '5 chiếc',
        quantityNeededEn: '5 pcs',
        quantityReceived: '2 chiếc',
        quantityReceivedEn: '2 pcs',
        notes: 'Dùng cho xe cứu hộ khẩn cấp và đưa đón thú đi khám viện',
        notesEn: 'For emergency rescue vehicles and vet hospital trips'
      }
    ]
  }
];

export const mockEmergencySheltersRaw: EmergencyShelter[] = [
  // 1. TP. HỒ CHÍ MINH - Sài Gòn Time (Trạm cứu trợ)
  {
    id: 'shelter-hcm-01',
    name: 'Trạm Cứu Trợ Động Vật Sài Gòn Time (SGT)',
    nameEn: 'Saigon Time Animal Rescue Shelter (SGT)',
    type: 'SHELTER',
    status: 'ACTIVE',
    city: 'TP. Hồ Chí Minh',
    district: 'Quận Bình Thạnh',
    address: '152/24 Nguyễn Xí, Phường 26, Quận Bình Thạnh, TP. Hồ Chí Minh',
    addressEn: '152/24 Nguyen Xi, Ward 26, Binh Thanh District, Ho Chi Minh City',
    phone: '0938 521 115',
    hotline: '0938 521 115',
    secondaryPhone: '0903 124 567',
    email: 'sgtime.rescue@petcarehub.vn',
    operatingHours: '24/7 (Trực cấp cứu đường phố)',
    operatingHoursEn: '24/7 (Street Emergency Response)',
    is24_7: true,
    supportedArea: 'Bình Thạnh, Gò Vấp, Phú Nhuận & TP.HCM',
    supportedAreaEn: 'Binh Thanh, Go Vap, Phu Nhuan & Greater HCMC',
    supportedAnimals: ['DOG', 'CAT', 'RABBIT'],
    services: [
      'Cấp cứu tai nạn giao thông khẩn cấp',
      'Tiếp nhận chó mèo bị bỏ rơi / bạo hành',
      'Xe cấp cứu điều phối tận nơi',
      'Chăm sóc phục hồi và tìm chủ nuôi'
    ],
    servicesEn: [
      'Emergency traffic accident rescue',
      'Intake for abandoned & abused pets',
      'On-site rescue vehicle dispatch',
      'Rehabilitation and adoption matching'
    ],
    instructionsForFinder: 'Khi thấy thú cưng gặp nạn: Giữ khoảng cách an toàn, chụp ảnh/video gửi định vị qua Zalo hotline để đội điều phối xe đón kịp thời.',
    instructionsForFinderEn: 'When discovering an injured pet: Maintain safe distance, send photo/video and GPS location via Zalo/Hotline for prompt vehicle dispatch.',
    googleMapsUrl: 'https://maps.google.com/?q=152/24+Nguy%E1%BB%85n+X%C3%AD+B%C3%ACnh+Th%E1%BA%A1nh+TP+H%E1%BB%93+Ch%C3%AD+Minh',
    avatarUrl: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=400&auto=format&fit=crop',
    isVerified: true,
    isNonProfit: true,
    shelterType: 'SHELTER'
  },

  // 2. TP. HỒ CHÍ MINH - SAR Sài Gòn (Đội cứu hộ tình nguyện)
  {
    id: 'shelter-hcm-02',
    name: 'Đội Cứu Hộ Động Vật Tình Nguyện SAR Sài Gòn',
    nameEn: 'SAR Saigon Volunteer Animal Rescue Team',
    type: 'RESCUE_TEAM',
    status: 'ACTIVE',
    city: 'TP. Hồ Chí Minh',
    district: 'Quận Tân Bình',
    address: '88/12 Cộng Hòa, Phường 4, Quận Tân Bình, TP. Hồ Chí Minh',
    addressEn: '88/12 Cong Hoa, Ward 4, Tan Binh District, Ho Chi Minh City',
    phone: '0909 345 888',
    hotline: '0909 345 888',
    secondaryPhone: '0908 999 112',
    email: 'sar.saigon.rescue@gmail.com',
    operatingHours: '07:00 - 23:30 (Trực hotline đêm 24/7)',
    operatingHoursEn: '07:00 - 23:30 (24/7 Night Emergency Hotline)',
    is24_7: true,
    supportedArea: 'Tân Bình, Quận 10, Quận 11, Tân Phú & Quận 3',
    supportedAreaEn: 'Tan Binh, District 10, District 11, Tan Phu & District 3',
    supportedAnimals: ['DOG', 'CAT', 'BIRD', 'WILDLIFE'],
    services: [
      'Đội phản ứng nhanh cứu hộ hiện trường',
      'Dụng cụ bắt giữ & lồng chuyên dụng an toàn',
      'Sơ cứu cầm máu & băng bó tại chỗ',
      'Chuyển viện khẩn cấp đến phòng khám thú y liên kết'
    ],
    servicesEn: [
      'Rapid on-site incident response',
      'Safe capture equipment & carriers',
      'Field first aid & wound dressing',
      'Emergency transport to partner vet clinics'
    ],
    instructionsForFinder: 'Không tự ý bắt giữ thú hoang dã hoặc thú bị hoảng loạn cắn. Hãy quan sát từ xa và cung cấp hình ảnh hiện trường qua Zalo hotline.',
    instructionsForFinderEn: 'Do not attempt to catch panicked or aggressive animals alone. Observe from a distance and send scene photos via Zalo hotline.',
    googleMapsUrl: 'https://maps.google.com/?q=88/12+C%E1%BB%99ng+H%C3%B2a+T%C3%A2n+B%C3%ACnh+TP+H%E1%BB%93+Ch%C3%AD+Minh',
    avatarUrl: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=400&auto=format&fit=crop',
    isVerified: true,
    isNonProfit: true,
    shelterType: 'VOLUNTEER_TEAM'
  },

  // 3. TP. HỒ CHÍ MINH - Bệnh Viện & Phòng Khám Thú Y Hỗ Trợ PetCare Q7
  {
    id: 'shelter-hcm-03',
    name: 'Bệnh Viện Thú Y Hỗ Trợ Cấp Cứu PetCare Quận 7',
    nameEn: 'PetCare Q7 Partner Emergency Vet Hospital',
    type: 'VET_CLINIC',
    status: 'ACTIVE',
    city: 'TP. Hồ Chí Minh',
    district: 'Quận 7',
    address: '124A Nguyễn Thị Thập, Phường Tân Hưng, Quận 7, TP. Hồ Chí Minh',
    addressEn: '124A Nguyen Thi Thap, Tan Hung Ward, District 7, Ho Chi Minh City',
    phone: '028 3773 1122',
    hotline: '028 3773 1122',
    secondaryPhone: '0932 777 999',
    email: 'emergency.q7@petcareclinic.vn',
    operatingHours: '24/7 (Phẫu thuật & Cấp cứu lưu viện)',
    operatingHoursEn: '24/7 (Emergency Surgery & In-patient ICU)',
    is24_7: true,
    supportedArea: 'Quận 7, Nhà Bè, Quận 4, Quận 8 & Bình Chánh',
    supportedAreaEn: 'District 7, Nha Be, District 4, District 8 & Binh Chanh',
    supportedAnimals: ['DOG', 'CAT', 'RABBIT', 'TURTLE'],
    services: [
      'Phẫu thuật chấn thương chỉnh hình nối xương',
      'Hồi sức cấp cứu ICU & thở oxy',
      'Xét nghiệm máu sinh hóa, PCR & X-quang kỹ thuật số',
      'Trợ giá viện phí 30-50% cho thú cưng vô chủ từ người đi đường'
    ],
    servicesEn: [
      'Orthopedic fracture & trauma surgery',
      'ICU intensive care & oxygen therapy',
      'Complete blood biochemistry, PCR & digital X-ray',
      '30-50% medical subsidy for stray animals brought by finders'
    ],
    instructionsForFinder: 'Người đi đường đưa thú cưng bị nạn tới được hỗ trợ trợ giá trực tiếp từ quỹ bảo trợ cộng đồng PetCare Hub.',
    instructionsForFinderEn: 'Good Samaritans bringing injured strays receive direct treatment subsidy supported by PetCare Community Fund.',
    googleMapsUrl: 'https://maps.google.com/?q=124A+Nguy%E1%BB%85n+Th%E1%BB%8B+Th%E1%BA%ADp+Qu%E1%BA%ADn+7+TP+H%E1%BB%93+Ch%C3%AD+Minh',
    avatarUrl: 'https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?w=400&auto=format&fit=crop',
    isVerified: true,
    isNonProfit: true,
    shelterType: 'HOSPITAL_PARTNER'
  },

  // 4. TP. HỒ CHÍ MINH - Tổ Chức Bảo Vệ Động Vật Green Paw (TP. Thủ Đức)
  {
    id: 'shelter-hcm-04',
    name: 'Tổ Chức Bảo Vệ Động Vật Green Paw Vietnam',
    nameEn: 'Green Paw Animal Protection & Welfare Vietnam',
    type: 'WELFARE_ORG',
    status: 'BUSY',
    city: 'TP. Hồ Chí Minh',
    district: 'TP. Thủ Đức',
    address: '45 Đường số 8, Phường Linh Xuân, TP. Thủ Đức, TP. Hồ Chí Minh',
    addressEn: '45 Street 8, Linh Xuan Ward, Thu Duc City, Ho Chi Minh City',
    phone: '0918 789 222',
    hotline: '0918 789 222',
    email: 'contact@greenpawvietnam.org',
    operatingHours: '08:00 - 18:30 (T2 - CN)',
    operatingHoursEn: '08:00 - 18:30 (Mon - Sun)',
    is24_7: false,
    supportedArea: 'TP. Thủ Đức, TP. Dĩ An & TP. Biên Hòa',
    supportedAreaEn: 'Thu Duc City, Di An City & Bien Hoa City',
    supportedAnimals: ['DOG', 'CAT', 'WILDLIFE', 'OTHER'],
    services: [
      'Can thiệp pháp lý các vụ ngược đãi động vật',
      'Chiến dịch triệt sản lưu động miễn phí',
      'Tập huấn sơ cứu thú cưng cho cộng đồng',
      'Mái ấm bảo trợ trọn đời cho thú già & khuyết tật'
    ],
    servicesEn: [
      'Legal advocacy for animal abuse prevention',
      'Mobile community spay/neuter outreach',
      'Pet first-aid training for volunteers',
      'Lifelong sanctuary for senior & disabled animals'
    ],
    instructionsForFinder: 'Đối với báo cáo bạo hành hoặc lò mổ trái phép: Vui lòng cung cấp tư liệu bằng chứng hình ảnh/video bảo mật qua email hoặc hotline.',
    instructionsForFinderEn: 'For animal cruelty or illegal slaughterhouse reports: Please submit confidential photo/video evidence via email or hotline.',
    googleMapsUrl: 'https://maps.google.com/?q=45+%C4%90%C6%B0%E1%BB%9Dng+s%E1%BB%91+8+Linh+Xu%C3%A2n+Th%E1%BB%A7+%C4%90%E1%BB%A9c',
    avatarUrl: 'https://images.unsplash.com/photo-1544568100-847a948585b9?w=400&auto=format&fit=crop',
    isVerified: true,
    isNonProfit: true,
    shelterType: 'SHELTER'
  },

  // 5. HÀ NỘI - Trạm Cứu Hộ Chó Mèo Hà Nội (CPAP)
  {
    id: 'shelter-hn-01',
    name: 'Trạm Cứu Hộ Chó Mèo Hà Nội (CPAP)',
    nameEn: 'Hanoi Pet Rescue Center (CPAP)',
    type: 'SHELTER',
    status: 'ACTIVE',
    city: 'Hà Nội',
    district: 'Quận Đống Đa',
    address: '68 Ngõ 198 Xã Đàn, Phường Nam Đồng, Quận Đống Đa, Hà Nội',
    addressEn: '68 Alley 198 Xa Dan, Nam Dong Ward, Dong Da District, Hanoi',
    phone: '0983 611 043',
    hotline: '0983 611 043',
    secondaryPhone: '0945 128 333',
    email: 'hanoipetrescue.cpap@gmail.com',
    operatingHours: '24/7 (Trực tiếp nhận & Cấp cứu)',
    operatingHoursEn: '24/7 (Intake & Emergency Care)',
    is24_7: true,
    supportedArea: 'Đống Đa, Hoàn Kiếm, Ba Đình, Cầu Giấy & Thanh Xuân',
    supportedAreaEn: 'Dong Da, Hoan Kiem, Ba Dinh, Cau Giay & Thanh Xuan',
    supportedAnimals: ['DOG', 'CAT', 'BIRD'],
    services: [
      'Cứu hộ chó mèo bị bỏ rơi trên đường phố',
      'Giải cứu thú cưng từ lò mổ & bẫy trộm',
      'Điều trị truyền nhiễm Parvo / Care / Giảm bạch cầu',
      'Tìm chủ nuôi và phỏng vấn nghiêm ngặt'
    ],
    servicesEn: [
      'Rescue of abandoned street dogs and cats',
      'Intervention from slaughterhouses and theft traps',
      'Infectious disease isolation & treatment (Parvo/FPLV)',
      'Rigorous adoption screening and placement'
    ],
    instructionsForFinder: 'Nếu phát hiện thú bị tai nạn trên đường phố Hà Nội: Chụp ảnh hiện trường, giữ ấm cho bé và gọi ngay hotline để đội trực điều phối ứng cứu.',
    instructionsForFinderEn: 'If spotting an injured pet in Hanoi: Take photos, keep the animal warm, and call hotline immediately for on-duty team coordination.',
    googleMapsUrl: 'https://maps.google.com/?q=198+X%C3%A3+%C4%90%C3%A0n+%C4%90%E1%BB%91ng+%C4%90a+H%C3%A0+N%E1%BB%99i',
    avatarUrl: 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?w=400&auto=format&fit=crop',
    isVerified: true,
    isNonProfit: true,
    shelterType: 'SHELTER'
  },

  // 6. HÀ NỘI - Mái Ấm Sân Nhà Nhiều Chó
  {
    id: 'shelter-hn-02',
    name: 'Trung Tâm Cứu Trợ & Mái Ấm Sân Nhà Nhiều Chó',
    nameEn: 'San Nha Nhieu Cho Animal Sanctuary & Rescue',
    type: 'SHELTER',
    status: 'BUSY',
    city: 'Hà Nội',
    district: 'Quận Tây Hồ',
    address: '32 Ngõ 275 Âu Cơ, Phường Quảng An, Quận Tây Hồ, Hà Nội',
    addressEn: '32 Alley 275 Au Co, Quang An Ward, Tay Ho District, Hanoi',
    phone: '0912 345 678',
    hotline: '0912 345 678',
    email: 'sannhanhieucho.hn@gmail.com',
    operatingHours: '08:00 - 20:30 (Hotline cấp cứu 24/7)',
    operatingHoursEn: '08:00 - 20:30 (24/7 Emergency Dispatch)',
    is24_7: true,
    supportedArea: 'Tây Hồ, Long Biên, Đông Anh & Bắc Từ Liêm',
    supportedAreaEn: 'Tay Ho, Long Bien, Dong Anh & North Tu Liem',
    supportedAnimals: ['DOG', 'CAT', 'RABBIT'],
    services: [
      'Tiếp nhận chó mèo khuyết tật, mù lòa, liệt chi',
      'Vật lý trị liệu & tập xe lăn phục hồi',
      'Nuôi dưỡng bán trú & dài hạn nhân đạo',
      'Tiếp nhận hỗ trợ hạt và tã lót định kỳ'
    ],
    servicesEn: [
      'Sanctuary for disabled, blind & paralyzed pets',
      'Physical rehabilitation and custom pet wheelchair training',
      'Long-term humane shelter care',
      'Accepting kibble, canned food & diaper donations'
    ],
    instructionsForFinder: 'Ưu tiên tiếp nhận các ca chấn thương nặng, liệt chi, khuyết tật do tai nạn giao thông cần chăm sóc y tế đặc biệt.',
    instructionsForFinderEn: 'Priority given to severe trauma, spinal paralysis, and disabled pets requiring specialized rehabilitation.',
    googleMapsUrl: 'https://maps.google.com/?q=275+%C3%82u+C%C6%A1+T%C3%A2y+H%E1%BB%93+H%C3%A0+N%E1%BB%99i',
    avatarUrl: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=400&auto=format&fit=crop',
    isVerified: true,
    isNonProfit: true,
    shelterType: 'SHELTER'
  },

  // 7. ĐÀ NẴNG - Danang Pet Rescue (Đội cứu hộ động vật)
  {
    id: 'shelter-dn-01',
    name: 'Đội Cứu Hộ Động Vật Đà Nẵng (Danang Pet Rescue)',
    nameEn: 'Danang Animal Rescue Team (DPR)',
    type: 'RESCUE_TEAM',
    status: 'ACTIVE',
    city: 'Đà Nẵng',
    district: 'Quận Hải Châu',
    address: '115 Trưng Nữ Vương, Phường Bình Hiên, Quận Hải Châu, TP. Đà Nẵng',
    addressEn: '115 Trung Nu Vuong, Binh Hien Ward, Hai Chau District, Da Nang City',
    phone: '0935 888 999',
    hotline: '0935 888 999',
    email: 'danang.rescue@petcarehub.vn',
    operatingHours: '24/7 (Trực xe cứu hộ toàn TP. Đà Nẵng)',
    operatingHoursEn: '24/7 (City-wide Mobile Rescue Van)',
    is24_7: true,
    supportedArea: 'Hải Châu, Thanh Khê, Sơn Trà, Ngũ Hành Sơn & Cẩm Lệ',
    supportedAreaEn: 'Hai Chau, Thanh Khe, Son Tra, Ngu Hanh Son & Cam Le',
    supportedAnimals: ['DOG', 'CAT', 'TURTLE', 'BIRD'],
    services: [
      'Xe cứu thương di động trang bị túi oxy & cáng sơ cứu',
      'Bắt giữ an toàn động vật gặp nạn tại các khu du lịch / biển',
      'Liên kết mạng lưới phòng khám thú y tại miền Trung',
      'Bảo trợ và tìm kiếm mái ấm nhận nuôi'
    ],
    servicesEn: [
      'Mobile ambulance equipped with oxygen & trauma stretchers',
      'Safe capture in tourist zones and beach areas',
      'Central Vietnam vet clinic partnership network',
      'Foster care and adoption placement'
    ],
    instructionsForFinder: 'Tại Đà Nẵng: Gọi hotline để kết nối tình nguyện viên khu vực gần nhất đến hỗ trợ trong vòng 15-25 phút.',
    instructionsForFinderEn: 'In Da Nang: Call hotline to dispatch the nearest volunteer within 15-25 minutes.',
    googleMapsUrl: 'https://maps.google.com/?q=115+Tr%C6%B0ng+N%E1%BB%AF+V%C6%B0%C6%A1ng+%C4%90%C3%A0+N%E1%BA%B5ng',
    avatarUrl: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&auto=format&fit=crop',
    isVerified: true,
    isNonProfit: true,
    shelterType: 'VOLUNTEER_TEAM'
  },

  // 8. CẦN THƠ - Phòng Khám & Cứu Hộ Động Vật Tây Đô
  {
    id: 'shelter-ct-01',
    name: 'Phòng Khám & Cứu Trợ Động Vật Tây Đô Cần Thơ',
    nameEn: 'Tay Do Animal Rescue & Vet Clinic Can Tho',
    type: 'VET_CLINIC',
    status: 'ACTIVE',
    city: 'Cần Thơ',
    district: 'Quận Ninh Kiều',
    address: '76 Mậu Thân, Phường An Hòa, Quận Ninh Kiều, TP. Cần Thơ',
    addressEn: '76 Mau Than, An Hoa Ward, Ninh Kieu District, Can Tho City',
    phone: '0949 111 222',
    hotline: '0949 111 222',
    secondaryPhone: '0292 389 4455',
    email: 'taydo.vetrescue@gmail.com',
    operatingHours: '07:30 - 21:00 (Hotline cấp cứu 24/7)',
    operatingHoursEn: '07:30 - 21:00 (24/7 Emergency Hotline)',
    is24_7: true,
    supportedArea: 'Ninh Kiều, Cái Răng, Bình Thủy & các tỉnh Tây Nam Bộ',
    supportedAreaEn: 'Ninh Kieu, Cai Rang, Binh Thuy & Mekong Delta Provinces',
    supportedAnimals: ['DOG', 'CAT', 'RABBIT', 'TURTLE'],
    services: [
      'Khám chữa bệnh & cấp cứu đường phố miền Tây',
      'Tiếp nhận thú cưng bị bỏ rơi tại sông nước / chợ đầu mối',
      'Hỗ trợ triệt sản giá phi lợi nhuận cho học sinh, sinh viên',
      'Lưu viện điều trị phục hồi sức khỏe'
    ],
    servicesEn: [
      'Mekong Delta street rescue and clinical care',
      'Intake from floating markets and riverbank abandonments',
      'Non-profit spay/neuter program for students and locals',
      'Post-surgery hospitalization and recovery boarding'
    ],
    instructionsForFinder: 'Người đi đường có thể đưa trực tiếp bé đến địa chỉ trạm hoặc gọi hotline để được hỗ trợ sơ cứu từ xa.',
    instructionsForFinderEn: 'Finders may bring pets directly to the clinic or call hotline for remote first-aid guidance.',
    googleMapsUrl: 'https://maps.google.com/?q=76+M%E1%BA%ADu+Th%C3%A2n+Ninh+Ki%E1%BB%81u+C%E1%BA%A7n+Th%C6%A1',
    avatarUrl: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400&auto=format&fit=crop',
    isVerified: true,
    isNonProfit: true,
    shelterType: 'HOSPITAL_PARTNER'
  },

  // 9. BÌNH DƯƠNG - Trạm Lưu Trú Tạm Thời & Phục Hồi Chó Mèo Bình Dương
  {
    id: 'shelter-bd-01',
    name: 'Trạm Cứu Trợ & Phục Hồi Động Vật Bình Dương',
    nameEn: 'Binh Duong Animal Shelter & Rehabilitation Center',
    type: 'SHELTER',
    status: 'CLOSED',
    city: 'Bình Dương',
    district: 'TP. Thủ Dầu Một',
    address: '210 Đại lộ Bình Dương, Phường Phú Hòa, TP. Thủ Dầu Một, Bình Dương',
    addressEn: '210 Binh Duong Boulevard, Phu Hoa Ward, Thu Dau Mot City, Binh Duong',
    phone: '0274 388 9911',
    hotline: '0274 388 9911',
    email: 'binhduong.shelter@gmail.com',
    operatingHours: 'Tạm ngưng tiếp nhận (Quá tải lưu chuồng)',
    operatingHoursEn: 'Temporarily Closed (Shelter Capacity Reached)',
    is24_7: false,
    supportedArea: 'Thủ Dầu Một, Thuận An, Dĩ An & Bến Cát',
    supportedAreaEn: 'Thu Dau Mot, Thuan An, Di An & Ben Cat',
    supportedAnimals: ['DOG', 'CAT'],
    services: [
      'Chăm sóc nuôi dưỡng thú cưng vô chủ',
      'Điều trị bệnh ngoài da & phục hồi dinh dưỡng',
      'Tập hợp hồ sơ tìm gia đình nhận nuôi'
    ],
    servicesEn: [
      'Humane boarding for stray animals',
      'Dermatology treatments and nutrition recovery',
      'Adoption profiling and home matching'
    ],
    instructionsForFinder: 'Trạm hiện đang trong đợt quá tải lưu chuồng và tạm dừng tiếp nhận ca mới. Vui lòng liên hệ các trạm lân cận tại TP.HCM hoặc Thủ Đức.',
    instructionsForFinderEn: 'Shelter is currently at maximum capacity and temporarily not accepting new intakes. Please contact neighboring centers in HCMC/Thu Duc.',
    googleMapsUrl: 'https://maps.google.com/?q=210+%C4%90%E1%BA%A1i+l%E1%BB%99+B%C3%ACnh+D%C6%B0%C6%A1ng+Th%E1%BB%A7+D%E1%BA%A7u+M%E1%BB%99t',
    avatarUrl: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&auto=format&fit=crop',
    isVerified: true,
    isNonProfit: true,
    shelterType: 'SHELTER'
  }
];

export const mockEmergencyShelters: EmergencyShelter[] = mockEmergencySheltersRaw.map(shelter => ({
  ...shelter,
  neededSupplies: getShelterSupplyCategories(shelter.id, shelter.name)
}));

