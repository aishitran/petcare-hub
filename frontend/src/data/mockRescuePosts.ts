import { RescuePost } from '../types/rescue';

export const mockRescuePosts: RescuePost[] = [
  {
    id: 'rescue-1',
    creatorUserId: 'user-1',
    creatorUserName: 'Đặng Quang Minh',
    creatorUserAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80',
    creatorUserPhone: '0988 345 678',
    
    // Shelter / Station Info
    shelterName: 'Trạm Cứu Hộ Động Vật Sài Gòn Time (Cơ sở Nhà Bè)',
    shelterHotline: '0908 123 789',
    shelterAddress: 'Ấp 3, Xã Phước Kiển, Huyện Nhà Bè, TP.HCM',
    isNonProfitCommitment: true,

    title: 'Cần hỗ trợ 30kg hạt và thức ăn dinh dưỡng cho bầy 8 chú chó con cứu hộ tại Nhà Bè',
    category: 'FOOD',
    priority: 'URGENT',
    status: 'APPROVED',
    description: 'Đội cứu hộ tình nguyện vừa tiếp nhận bầy 8 bé cún con bị bỏ rơi ven sông tại Nhà Bè. Hiện các bé đang rất cần thức ăn hạt chuyên dụng cho cún con (Royal Canin / Smartheart Puppy) và sữa dinh dưỡng để hồi phục sức đề kháng.',
    quantityNeeded: '30kg hạt Puppy + 10 hộp sữa bột',
    quantityFulfilled: '15kg hạt',
    images: [
      'https://images.unsplash.com/photo-1595433707802-6b2626ef1c91?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=800&auto=format&fit=crop&q=80'
    ],
    requiredDate: '15/09/2026',
    supportLocation: 'Khu vực Nhà Bè / Quận 7, TP.HCM',
    contactPerson: 'Đặng Quang Minh (Tình nguyện viên trực trạm)',
    contactPhone: '0988 345 678',
    notes: 'Có thể mang đến trực tiếp trạm tại Nhà Bè hoặc gửi bưu điện/giao hàng hỏa tốc.',
    supportsCount: 12,
    createdAt: '01/09/2026',
    updatedAt: '03/09/2026'
  },
  {
    id: 'rescue-2',
    creatorUserId: 'user-3',
    creatorUserName: 'Trần Văn Nam',
    creatorUserAvatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=200&auto=format&fit=crop&q=80',
    creatorUserPhone: '0933 111 222',
    
    // Shelter / Station Info
    shelterName: 'Phòng khám Thú Y PetCare & Trạm Lưu Viện Bình Thạnh',
    shelterHotline: '0933 111 222',
    shelterAddress: 'Số 45/2 Đường Điện Biên Phủ, Phường 15, Quận Bình Thạnh, TP.HCM',
    isNonProfitCommitment: true,

    title: 'Hỗ trợ viện phí phẫu thuật nối xương chân cho bé mèo tam thể bị tai nạn',
    category: 'MEDICINE',
    priority: 'HIGH',
    status: 'APPROVED',
    description: 'Bé mèo tam thể khoảng 5 tháng tuổi được phát hiện bị tai nạn gãy chân sau tại đường Điện Biên Phủ. Hiện đang nằm điều trị tại phòng khám PetCare Bình Thạnh, cần hỗ trợ chi phí chụp X-quang và phẫu thuật kết hợp xương.',
    quantityNeeded: '3.500.000 VNĐ (Viện phí phẫu thuật)',
    quantityFulfilled: '2.000.000 VNĐ',
    images: [
      'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?w=800&auto=format&fit=crop&q=80'
    ],
    requiredDate: '12/09/2026',
    supportLocation: 'Bình Thạnh, TP.HCM',
    contactPerson: 'Trần Văn Nam (Điều phối viên ca cấp cứu)',
    contactPhone: '0933 111 222',
    notes: 'Hóa đơn viện phí và phiếu thu phòng khám được công khai 100% minh bạch.',
    supportsCount: 18,
    createdAt: '03/09/2026',
    updatedAt: '04/09/2026'
  },
  {
    id: 'rescue-3',
    creatorUserId: 'user-2',
    creatorUserName: 'Lê Thu Thảo',
    creatorUserAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80',
    creatorUserPhone: '0912 345 999',
    
    // Shelter / Station Info
    shelterName: 'Nhà Nuôi Tạm & Cứu Hộ Mèo Yêu Thương (Foster House Q3)',
    shelterHotline: '0912 345 999',
    shelterAddress: '280/12 Đường Cách Mạng Tháng 8, Phường 10, Quận 3, TP.HCM',
    isNonProfitCommitment: true,

    title: 'Tìm chỗ ở tạm (foster) 2 tuần cho 3 bé mèo con đang điều trị nấm',
    category: 'PET_CARE',
    priority: 'MEDIUM',
    status: 'APPROVED',
    description: 'Cần tìm bạn tình nguyện viên nhận foster tạm thời 3 bé mèo con đã biết ăn hạt và đi vệ sinh khay cát trong vòng 14 ngày để cách ly và bôi thuốc nấm.',
    quantityNeeded: '1 bạn Foster có kinh nghiệm',
    images: [
      'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800&auto=format&fit=crop&q=80'
    ],
    requiredDate: '20/09/2026',
    supportLocation: 'Quận 1 / Quận 3, TP.HCM',
    contactPerson: 'Lê Thu Thảo (Trưởng nhóm Foster)',
    contactPhone: '0912 345 999',
    notes: 'Trạm sẽ cung cấp đầy đủ chuồng, hạt, cát vệ sinh và thuốc trị nấm cho bạn foster.',
    supportsCount: 5,
    createdAt: '04/09/2026',
    updatedAt: '05/09/2026'
  }
];
