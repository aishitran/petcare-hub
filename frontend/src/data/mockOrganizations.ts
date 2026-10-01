import { Organization } from '../types/organization';

export const mockOrganizations: Organization[] = [
  {
    id: 'org-1',
    name: 'Nhà Chung Animal Rescue',
    tagline: 'Cứu hộ, chữa lành và tìm mái ấm trọn đời cho chó mèo cơ nhỡ',
    description: 'Được thành lập từ năm 2019 tại TP. Hồ Chí Minh, Nhà Chung Animal Rescue là tổ chức phi lợi nhuận chuyên tiếp nhận các ca cứu hộ khẩn cấp, chăm sóc y tế, phục hồi tâm lý và tìm kiếm gia đình nhận nuôi mới có trách nhiệm cho chó mèo bị bạo hành hoặc bỏ rơi.',
    location: 'Hồ Chí Minh',
    address: '248/12 Nguyễn Thị Thập, Phường Tân Quy, Quận 7, TP. Hồ Chí Minh',
    contactEmail: 'contact@nhachungrescue.vn',
    contactPhone: '0908 123 456',
    establishedDate: '15/03/2019',
    status: 'APPROVED',
    logo: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=200&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=1200&auto=format&fit=crop&q=80',
    stats: {
      rescuedCount: 324,
      adoptedCount: 268,
      currentPetCount: 16,
      followersCount: 14200,
      staffCount: 5,
      rating: 4.9,
      ratingCount: 184,
    },
    focusAreas: ['Chó mèo bị bỏ rơi', 'Cứu hộ khẩn cấp', 'Triệt sản nhân đạo', 'Giáo dục cộng đồng'],
    verificationDocs: [
      {
        id: 'doc-1',
        name: 'Giấy phép hoạt động cứu trợ động vật',
        type: 'Giấy phép hoạt động',
        fileUrl: '#',
        fileName: 'GiayPhep_NhaChung_2022.pdf',
        fileSize: '2.4 MB',
        submittedAt: '10/01/2026',
        verified: true
      },
      {
        id: 'doc-2',
        name: 'Hình ảnh cơ sở & khu cách ly y tế',
        type: 'Hình ảnh cơ sở cứu hộ',
        fileUrl: '#',
        fileName: 'CoSoVatChat_KhuDieuTri_Q7.pdf',
        fileSize: '8.1 MB',
        submittedAt: '10/01/2026',
        verified: true
      }
    ],
    socialLinks: {
      facebook: 'https://facebook.com/nhachungrescue',
      website: 'https://nhachungrescue.vn',
      zalo: '0908123456'
    },
    reviewHistory: [
      {
        id: 'rev-1',
        date: '10/01/2026',
        action: 'SUBMITTED',
        reviewerName: 'Hệ thống',
        note: 'Tổ chức nộp hồ sơ xin cấp phép hoạt động trên PetCare Hub.'
      },
      {
        id: 'rev-2',
        date: '12/01/2026',
        action: 'APPROVED',
        reviewerName: 'Admin Trần Hoàng',
        note: 'Hồ sơ đầy đủ, cơ sở vật chất đáp ứng tiêu chuẩn cứu hộ và kiểm dịch.'
      }
    ]
  },
  {
    id: 'org-2',
    name: 'Paws & Hope',
    tagline: 'Mang lại hy vọng và mái ấm yêu thương cho thú cưng lang thang',
    description: 'Paws & Hope hoạt động tại Hà Nội với mạng lưới tình nguyện viên rộng khắp, chuyên cứu trợ chó mèo vô gia cư, cung cấp thức ăn, tiêm phòng dại và phối hợp với các gia đình nuôi tạm (Foster) để tìm kiếm chủ nhận nuôi phù hợp.',
    location: 'Hà Nội',
    address: 'Số 45 Ngõ 120 Hoàng Hoa Thám, Ba Đình, Hà Nội',
    contactEmail: 'hello@pawsandhope.org.vn',
    contactPhone: '0912 888 999',
    establishedDate: '20/10/2021',
    status: 'APPROVED',
    logo: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=200&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=1200&auto=format&fit=crop&q=80',
    stats: {
      rescuedCount: 156,
      adoptedCount: 112,
      currentPetCount: 11,
      followersCount: 8900,
      staffCount: 3,
      rating: 4.8,
      ratingCount: 96,
    },
    focusAreas: ['Cứu trợ chó mèo lang thang', 'Chăm sóc nuôi tạm (Foster)', 'Tiêm phòng dại'],
    verificationDocs: [
      {
        id: 'doc-3',
        name: 'Giấy chứng nhận đăng ký hội đồng vật',
        type: 'Giấy phép hoạt động',
        fileUrl: '#',
        fileName: 'DK_PawsHope_HN.pdf',
        fileSize: '3.1 MB',
        submittedAt: '05/02/2026',
        verified: true
      }
    ],
    socialLinks: {
      facebook: 'https://facebook.com/pawshopehanoi',
      website: 'https://pawsandhope.org.vn'
    },
    reviewHistory: [
      {
        id: 'rev-3',
        date: '05/02/2026',
        action: 'SUBMITTED',
        reviewerName: 'Hệ thống',
        note: 'Tổ chức nộp hồ sơ xin cấp phép hoạt động.'
      },
      {
        id: 'rev-4',
        date: '08/02/2026',
        action: 'APPROVED',
        reviewerName: 'Admin Trần Hoàng',
        note: 'Đã xác minh thông tin trụ sở và danh sách nhân sự.'
      }
    ]
  },
  {
    id: 'org-3',
    name: 'Mái Ấm Mèo Nhỏ Đà Nẵng',
    tagline: 'Chăm sóc và phục hồi cho mèo mồ côi sơ sinh và mèo già yếu',
    description: 'Trạm cứu hộ chuyên sâu cho các bé mèo sơ sinh bị bỏ mẹ, mèo khuyết tật hoặc già yếu cần chế độ chăm sóc y tế đặc biệt tại khu vực miền Trung.',
    location: 'Đà Nẵng',
    address: 'K78/14 Dũng Sĩ Thanh Khê, Quận Thanh Khê, TP. Đà Nẵng',
    contactEmail: 'maiammeonho.dn@gmail.com',
    contactPhone: '0935 777 666',
    establishedDate: '01/03/2024',
    status: 'UNDER_REVIEW',
    logo: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=200&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?w=1200&auto=format&fit=crop&q=80',
    stats: {
      rescuedCount: 48,
      adoptedCount: 26,
      currentPetCount: 9,
      followersCount: 3100,
      staffCount: 2,
      rating: 4.7,
      ratingCount: 32,
    },
    focusAreas: ['Mèo sơ sinh mồ côi', 'Mèo khuyết tật', 'Điều trị nội trú'],
    verificationDocs: [
      {
        id: 'doc-4',
        name: 'Giấy chứng nhận đăng ký cơ sở bảo trợ',
        type: 'Giấy phép hoạt động',
        fileUrl: '#',
        fileName: 'HoSo_MaiAmMeoNho_DN.pdf',
        fileSize: '4.5 MB',
        submittedAt: '25/08/2026',
        verified: false
      },
      {
        id: 'doc-5',
        name: 'Giấy chứng nhận đại diện trạm',
        type: 'Giấy ủy quyền',
        fileUrl: '#',
        fileName: 'GiayDaiDien_PhamHoangYen.pdf',
        fileSize: '1.2 MB',
        submittedAt: '25/08/2026',
        verified: false
      }
    ],
    socialLinks: {
      facebook: 'https://facebook.com/maiammeonhodanang'
    },
    reviewHistory: [
      {
        id: 'rev-5',
        date: '25/08/2026',
        action: 'SUBMITTED',
        reviewerName: 'Phạm Hoàng Yến',
        note: 'Nộp hồ sơ thành lập và tài liệu xác minh cơ sở.'
      },
      {
        id: 'rev-6',
        date: '27/08/2026',
        action: 'UNDER_REVIEW',
        reviewerName: 'Admin Trần Hoàng',
        note: 'Đang tiến hành kiểm tra thực tế địa điểm cơ sở tại Đà Nẵng.'
      }
    ]
  },
  {
    id: 'org-4',
    name: 'Trạm Cứu Hộ Sen Vàng',
    tagline: 'Bảo vệ thú cưng bị ngược đãi',
    description: 'Trạm cứu hộ tư nhân tiếp nhận các trường hợp bị ngược đãi tại khu vực Bình Dương.',
    location: 'Bình Dương',
    address: '15 Đại Lộ Bình Dương, Thuận An, Bình Dương',
    contactEmail: 'senvang.rescue@gmail.com',
    contactPhone: '0978 999 111',
    establishedDate: '12/12/2023',
    status: 'REJECTED',
    rejectionReason: 'Hồ sơ thiếu chứng nhận phòng cháy chữa cháy và chưa bổ sung biên bản cam kết vệ sinh môi trường khu vực nuôi nhốt theo quy định an toàn.',
    logo: 'https://images.unsplash.com/photo-1561037404-61cd46aa615b?w=200&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=1200&auto=format&fit=crop&q=80',
    stats: {
      rescuedCount: 20,
      adoptedCount: 5,
      currentPetCount: 4,
      followersCount: 950,
      staffCount: 1,
      rating: 4.0,
      ratingCount: 10,
    },
    focusAreas: ['Cứu hộ chó bị ngược đãi'],
    verificationDocs: [
      {
        id: 'doc-6',
        name: 'Đơn đăng ký hoạt động chưa hoàn thiện',
        type: 'Giấy phép hoạt động',
        fileUrl: '#',
        fileName: 'DonDangKy_SenVang.pdf',
        fileSize: '1.1 MB',
        submittedAt: '15/08/2026',
        verified: false
      }
    ],
    socialLinks: {},
    reviewHistory: [
      {
        id: 'rev-7',
        date: '15/08/2026',
        action: 'SUBMITTED',
        reviewerName: 'Trạm Sen Vàng',
        note: 'Nộp hồ sơ.'
      },
      {
        id: 'rev-8',
        date: '18/08/2026',
        action: 'REJECTED',
        reviewerName: 'Admin Trần Hoàng',
        note: 'Hồ sơ thiếu chứng nhận PCCC và cam kết vệ sinh môi trường.'
      }
    ]
  }
];
