import { FoodFundCampaign } from '../types/donation';

export const mockFoodFundCampaigns: FoodFundCampaign[] = [
  {
    id: 'FFC-2026-HCM',
    title: 'Chiến Dịch Tiếp Sức 3.000kg Hạt — Mùa Mưa Bão 2026',
    subtitle: 'Hỗ trợ lương thực khẩn cấp cho 180 bé chó mèo cơ nhỡ',
    description: 'Chung tay cùng Trạm Cứu Hộ Động Vật Sài Gòn Time bổ sung nguồn hạt dinh dưỡng, thức ăn ướt và sữa thú y cho hơn 180 bé động vật bị bỏ rơi và tàn tật trong mùa mưa ngập tại TP.HCM.',
    categoryTag: 'Mùa Mưa Bão 2026 • TP.HCM',
    
    organizerName: 'Trạm Cứu Hộ Động Vật Sài Gòn Time',
    organizerType: 'SHELTER',
    organizerRepresentative: 'Chị Nguyễn Phương Thảo (Trưởng Ban Điều Hành Trạm)',
    organizerPhone: '0908 123 789',
    organizerAddress: 'Ấp 3, Xã Bình Hưng, Huyện Bình Chánh, TP.HCM',
    verifiedShelter: true,
    bankAccount: {
      bankName: 'Ngân hàng Quân Đội (MB Bank)',
      accountNumber: '0908123789',
      accountHolder: 'TRAM CUU HO SAI GON TIME',
      branch: 'Chi nhánh Nam Sài Gòn',
      qrPayload: 'MB-0908123789-SAIGONTIME'
    },

    targetAmount: 60000000,
    currentAmount: 47250000,
    targetKg: 3000,
    currentKg: 2362.5,
    beneficiarySummary: '180 bé chó mèo tại Trạm Sài Gòn Time & 4 trạm vệ tinh',
    beneficiarySheltersCount: 5,
    totalDonorsCount: 318,
    startDate: '2026-09-01',
    endDate: '2026-10-15',
    status: 'ACTIVE',
    disclaimerNote: 'PetCare Hub chỉ đóng vai trò nền tảng công nghệ kết nối trung gian phi lợi nhuận. Khoản tài trợ được chuyển khoản trực tiếp 100% đến tài khoản ngân hàng của Trạm Cứu Hộ Sài Gòn Time. Trạm chịu trách nhiệm pháp lý và nghĩa vụ minh bạch sao kê thu chi cho chiến dịch này.',
    recentDonations: [
      {
        id: 'FD-101',
        campaignId: 'FFC-2026-HCM',
        donorName: 'Nguyễn Thảo Ly',
        donorAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100',
        amount: 500000,
        foodPackageName: 'Bao 10kg hạt dinh dưỡng cao cấp',
        kgEquivalent: 25,
        message: 'Chúc các bé ở trạm luôn no bụng, khỏe mạnh và sớm tìm được ba mẹ yêu thương!',
        createdAt: '15 phút trước'
      },
      {
        id: 'FD-102',
        campaignId: 'FFC-2026-HCM',
        donorName: 'Trần Minh Hoàng',
        donorAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100',
        amount: 300000,
        foodPackageName: 'Gói 6kg hạt + 12 lon pate',
        kgEquivalent: 15,
        message: 'Gửi chút tình yêu thương đến trạm cứu hộ mèo lang thang Bình Thạnh.',
        createdAt: '1 giờ trước'
      },
      {
        id: 'FD-103',
        campaignId: 'FFC-2026-HCM',
        donorName: 'Một người bạn ẩn danh',
        amount: 1000000,
        foodPackageName: 'Gói Đại sứ Tiếp sức 50kg hạt',
        kgEquivalent: 50,
        message: 'Thương các con nhiều. Chúc Trạm Sài Gòn Time luôn vững vàng!',
        createdAt: '3 giờ trước',
        isAnonymous: true
      },
      {
        id: 'FD-104',
        campaignId: 'FFC-2026-HCM',
        donorName: 'Lê Hoàng Yến',
        donorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100',
        amount: 200000,
        foodPackageName: 'Gói 4kg hạt mèo con & cún con',
        kgEquivalent: 10,
        message: 'Một chút đóng góp nhỏ hy vọng các bé luôn có bữa ăn đầy đủ.',
        createdAt: '5 giờ trước'
      },
      {
        id: 'FD-105',
        campaignId: 'FFC-2026-HCM',
        donorName: 'Vũ Đức Long',
        donorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
        amount: 500000,
        foodPackageName: 'Bao 10kg hạt dinh dưỡng cao cấp',
        kgEquivalent: 25,
        message: 'Cố lên các tình nguyện viên trạm cứu hộ nhé!',
        createdAt: '8 giờ trước'
      }
    ]
  },
  {
    id: 'FFC-2026-HN',
    title: 'Hạt Ấm Đầy Bát — Tiếp Tế 1.500kg Hạt Cho Mèo Bỏ Rơi Hà Nội',
    subtitle: 'Chương trình lương thực mùa thu đông cho 95 bé mèo lang thang',
    description: 'Chương trình do Nhóm Cứu Hộ & Nhà Tạm Lánh Mèo Hà Nội phát động nhằm dự trữ thức ăn hạt khô chất lượng cao và pate bổ sung men tiêu hóa cho các bé mèo sơ sinh và mèo già cơ nhỡ.',
    categoryTag: 'Tiếp Tế Thu Đông • Hà Nội',
    
    organizerName: 'Nhóm Cứu Hộ & Nhà Tạm Lánh Mèo Hà Nội',
    organizerType: 'VOLUNTEER_GROUP',
    organizerRepresentative: 'Anh Vũ Đức Anh (Đại diện Nhóm Tình Nguyện)',
    organizerPhone: '0987 654 321',
    organizerAddress: 'Ngõ 298 Ngọc Hồi, Huyện Thanh Trì, Hà Nội',
    verifiedShelter: true,
    bankAccount: {
      bankName: 'Ngân hàng Ngoại Thương Việt Nam (Vietcombank)',
      accountNumber: '0011008899999',
      accountHolder: 'VU DUC ANH - TRAM MEO HN',
      branch: 'Chi nhánh Hoàn Kiếm, Hà Nội',
      qrPayload: 'VCB-0011008899999-TRAMMEOHN'
    },

    targetAmount: 30000000,
    currentAmount: 21600000,
    targetKg: 1500,
    currentKg: 1080,
    beneficiarySummary: '95 bé mèo tại Nhà Tạm Lánh Thanh Trì & Hoàng Mai',
    beneficiarySheltersCount: 2,
    totalDonorsCount: 142,
    startDate: '2026-09-05',
    endDate: '2026-10-25',
    status: 'ACTIVE',
    disclaimerNote: 'PetCare Hub là cổng thông tin trung gian phi lợi nhuận. Khoản quyên góp chuyển thẳng vào tài khoản của Nhóm Cứu Hộ Mèo Hà Nội. Nhóm chịu trách nhiệm trực tiếp về tiếp nhận và báo cáo nhật ký sử dụng quỹ.',
    recentDonations: [
      {
        id: 'FD-201',
        campaignId: 'FFC-2026-HN',
        donorName: 'Đặng Mai Lan',
        donorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100',
        amount: 300000,
        foodPackageName: 'Gói Hạt Tiêu Chuẩn Cho Mèo',
        kgEquivalent: 15,
        message: 'Gửi các bé mèo Hà Nội mau ăn chóng lớn và tìm được mái ấm ấm áp!',
        createdAt: '40 phút trước'
      },
      {
        id: 'FD-202',
        campaignId: 'FFC-2026-HN',
        donorName: 'Phạm Minh Tuấn',
        amount: 500000,
        foodPackageName: 'Bao Hạt Cho Mèo Con',
        kgEquivalent: 25,
        message: 'Ủng hộ nhóm cứu hộ mèo nhiệt huyết!',
        createdAt: '2 giờ trước'
      }
    ]
  },
  {
    id: 'FFC-2026-DNG',
    title: 'Bữa Ăn Phục Hồi — Tiếp Sức Hạt & Pate Cho Thú Cưng Sau Phẫu Thuật',
    subtitle: 'Chế độ dinh dưỡng đặc biệt cho 60 bé chó mèo chấn thương',
    description: 'Chương trình chuyên biệt do Hội Cứu Trợ Động Vật Đà Nẵng điều phối, gây quỹ mua thực phẩm y tế (Recovery kibble & pate) giúp các ca chó mèo bị tai nạn giao thông sớm hồi phục.',
    categoryTag: 'Dinh Dưỡng Phục Hồi • Đà Nẵng',
    
    organizerName: 'Hội Cứu Trợ Động Vật Đà Nẵng',
    organizerType: 'COMMUNITY_CAMPAIGN',
    organizerRepresentative: 'Bác sĩ Thú y Lê Minh Tuấn (Điều phối Y tế)',
    organizerPhone: '0935 444 888',
    organizerAddress: 'K234 Lê Duẩn, Quận Hải Châu, TP. Đà Nẵng',
    verifiedShelter: true,
    bankAccount: {
      bankName: 'Ngân hàng Đầu tư và Phát triển Việt Nam (BIDV)',
      accountNumber: '5611000234567',
      accountHolder: 'HOI CUU TRO DONG VAT DA NANG',
      branch: 'Chi nhánh Hải Châu, Đà Nẵng',
      qrPayload: 'BIDV-5611000234567-CUUTRODANANG'
    },

    targetAmount: 25000000,
    currentAmount: 14750000,
    targetKg: 1250,
    currentKg: 737.5,
    beneficiarySummary: '60 ca thú cưng đang điều trị hậu phẫu & chỉnh hình xương',
    beneficiarySheltersCount: 3,
    totalDonorsCount: 96,
    startDate: '2026-09-10',
    endDate: '2026-10-30',
    status: 'ACTIVE',
    disclaimerNote: 'PetCare Hub không can thiệp dòng tiền hay giữ quỹ. Quý nhà hảo tâm chuyển khoản trực tiếp đến Hội Cứu Trợ Động Vật Đà Nẵng. Mọi thắc mắc về sử dụng quỹ vui lòng liên hệ hotline đại diện trạm.',
    recentDonations: [
      {
        id: 'FD-301',
        campaignId: 'FFC-2026-DNG',
        donorName: 'Huỳnh Khánh Vy',
        donorAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100',
        amount: 500000,
        foodPackageName: 'Gói Pate Dưỡng Bệnh & Kháng Viêm',
        kgEquivalent: 25,
        message: 'Mong các con nhanh lành vết thương và có cuộc sống bình an!',
        createdAt: '1 giờ trước'
      }
    ]
  }
];

export const mockFoodFundCampaign = mockFoodFundCampaigns[0];
