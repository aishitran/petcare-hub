import { Appointment, CheckIn, FeedbackRating, CommunityPost } from '../types/community';

export const mockAppointments: Appointment[] = [
  {
    id: 'apt-1',
    organizationId: 'org-1',
    applicationId: 'app-2',
    petId: 'pet-2',
    petName: 'Luna',
    petAvatar: 'https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?w=800&auto=format&fit=crop&q=80',
    applicantId: 'user-2',
    applicantName: 'Trần Thị Mai',
    applicantPhone: '0903 555 444',
    date: '31/08/2026',
    time: '15:00',
    locationType: 'SHELTER',
    locationAddress: 'Trạm Nhà Chung — 248/12 Nguyễn Thị Thập, P. Tân Quy, Quận 7, TP.HCM',
    status: 'SCHEDULED',
    notes: 'Khách đến cùng mẹ để xem phản ứng hòa nhập của bé Luna.',
    assignedStaffName: 'Nguyễn Minh Anh',
    assignedStaffId: 'staff-1',
    createdAt: '27/08/2026'
  },
  {
    id: 'apt-2',
    organizationId: 'org-1',
    applicationId: 'app-1',
    petId: 'pet-1',
    petName: 'Milo',
    petAvatar: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=800&auto=format&fit=crop&q=80',
    applicantId: 'user-1',
    applicantName: 'Hoàng Nam',
    applicantPhone: '0988 345 678',
    date: '02/09/2026',
    time: '09:30',
    locationType: 'HOME_VISIT',
    locationAddress: 'Chung cư Sunrise City, Tân Hưng, Quận 7, TP.HCM',
    status: 'NEEDS_CONFIRMATION',
    notes: 'Kiểm tra thực tế không gian căn hộ và giao lưu với mèo hiện tại của chủ nhà.',
    assignedStaffName: 'Trần Quốc Bảo',
    assignedStaffId: 'staff-2',
    createdAt: '29/08/2026'
  },
  {
    id: 'apt-3',
    organizationId: 'org-2',
    applicationId: 'app-4',
    petId: 'pet-6',
    petName: 'Đậu Đậu',
    petAvatar: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800&auto=format&fit=crop&q=80',
    applicantId: 'user-4',
    applicantName: 'Nguyễn Thu Trang',
    applicantPhone: '0915 666 777',
    date: '01/09/2026',
    time: '16:00',
    locationType: 'SHELTER',
    locationAddress: 'Paws & Hope — Số 45 Ngõ 120 Hoàng Hoa Thám, Ba Đình, Hà Nội',
    status: 'SCHEDULED',
    notes: 'Dắt theo bé Poodle nhà sang test tính cách.',
    assignedStaffName: 'Lê Thu Hà',
    assignedStaffId: 'staff-3',
    createdAt: '28/08/2026'
  }
];

export const mockCheckIns: CheckIn[] = [
  {
    id: 'chk-1',
    organizationId: 'org-1',
    petId: 'pet-5',
    petName: 'Kem',
    petAvatar: 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?w=800&auto=format&fit=crop&q=80',
    adopterId: 'user-8',
    adopterName: 'Phan Thị Yến Vy',
    adopterPhone: '0938 111 222',
    adopterEmail: 'yenvy.pt@gmail.com',
    daysSinceAdoption: 7,
    checkInMilestone: 'Tuần 1',
    scheduledDate: '31/08/2026',
    status: 'COMPLETED',
    adopterFeedback: 'Bé Kem ăn hạt ngâm rất giỏi, đã quen với phòng ngủ và chịu nằm cạnh khi mình làm việc. Rất ngoan và đi vệ sinh đúng thau cát!',
    adopterPhotos: [
      'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?w=800&auto=format&fit=crop&q=80'
    ],
    staffEvaluation: 'Bé thích nghi xuất sắc, thể trạng phát triển tốt.',
    staffAssignedName: 'Nguyễn Minh Anh',
    updatedAt: '31/08/2026 10:30'
  },
  {
    id: 'chk-2',
    organizationId: 'org-1',
    petId: 'pet-10',
    petName: 'Lucky',
    petAvatar: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=800&auto=format&fit=crop&q=80',
    adopterId: 'user-9',
    adopterName: 'Đoàn Quang Khải',
    adopterPhone: '0909 333 444',
    adopterEmail: 'khaidoan@gmail.com',
    daysSinceAdoption: 30,
    checkInMilestone: 'Tháng 1',
    scheduledDate: '31/08/2026',
    status: 'PENDING',
    staffAssignedName: 'Trần Quốc Bảo'
  }
];

export const mockFeedback: FeedbackRating[] = [
  {
    id: 'fb-1',
    organizationId: 'org-1',
    petName: 'Lucky (Đã nhận nuôi)',
    authorName: 'Đoàn Quang Khải',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    comment: 'Quy trình nhận nuôi của Nhà Chung rất rõ ràng, chuyên nghiệp và có tâm. Các bạn nhân viên tư vấn cực kỳ tận tình về dinh dưỡng và hướng dẫn thích nghi cho cún.',
    createdAt: '15/08/2026',
    response: {
      staffName: 'Nguyễn Minh Anh (Nhà Chung)',
      text: 'Cảm ơn anh Khải đã mở rộng vòng tay yêu thương đón bé Lucky. Chúc gia đình luôn nhiều niềm vui bên bạn nhỏ!',
      respondedAt: '16/08/2026'
    }
  },
  {
    id: 'fb-2',
    organizationId: 'org-1',
    petName: 'Kem (Đã nhận nuôi)',
    authorName: 'Phan Thị Yến Vy',
    authorAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    comment: 'Nhà Chung chăm các bé mèo con siêu khéo. Bé Kem về nhà mới không hề sợ hãi mà còn quấn quýt ngay.',
    createdAt: '28/08/2026'
  },
  {
    id: 'fb-3',
    organizationId: 'org-2',
    authorName: 'Nguyễn Văn Hòa',
    authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    comment: 'Paws & Hope hỗ trợ tiêm phòng và làm sổ theo dõi rất cẩn thận trước khi bàn giao cún.',
    createdAt: '20/08/2026'
  }
];

export const mockCommunityPosts: CommunityPost[] = [
  {
    id: 'post-1',
    organizationId: 'org-1',
    organizationName: 'Nhà Chung Animal Rescue',
    organizationLogo: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=200&auto=format&fit=crop&q=80',
    authorId: 'staff-1',
    authorName: 'Nguyễn Minh Anh',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    authorRole: 'Adoption Coordinator',
    postType: 'RESCUE_UPDATE',
    title: 'Hành trình hồi sinh thần kỳ của Milo và đàn cún Bình Chánh',
    content: 'Sau 3 tuần kiên trì điều trị và bổ sung dinh dưỡng, các bé cún trong vụ cứu hộ khu đất giải tỏa Bình Chánh đã hoàn toàn khỏe mạnh, tăng cân và lấy lại bộ lông óng mượt. Đặc biệt bé Milo đã sẵn sàng tìm mái ấm trọn đời!',
    photos: [
      'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=800&auto=format&fit=crop&q=80'
    ],
    likesCount: 145,
    commentsCount: 28,
    createdAt: '30/08/2026',
    rescueCaseId: 'case-1'
  },
  {
    id: 'post-2',
    organizationId: 'org-1',
    organizationName: 'Nhà Chung Animal Rescue',
    organizationLogo: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=200&auto=format&fit=crop&q=80',
    authorId: 'staff-2',
    authorName: 'Trần Quốc Bảo',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    authorRole: 'Rescue Staff',
    postType: 'EDUCATIONAL',
    title: 'Hướng dẫn chuẩn bị nhà trước khi đón cún/mèo cứu hộ về nuôi',
    content: 'Những lưu ý quan trọng về gắn lưới an toàn ban công, cách ly làm quen với thú cưng cũ trong 3 ngày đầu và chế độ ăn nhẹ nhàng chống rối loạn tiêu hóa.',
    photos: [
      'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800&auto=format&fit=crop&q=80'
    ],
    likesCount: 89,
    commentsCount: 12,
    createdAt: '27/08/2026'
  },
  {
    id: 'post-3',
    organizationId: 'org-2',
    organizationName: 'Paws & Hope',
    organizationLogo: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=200&auto=format&fit=crop&q=80',
    authorId: 'staff-3',
    authorName: 'Lê Thu Hà',
    authorAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    authorRole: 'Care Staff',
    postType: 'ADOPTION_SUCCESS',
    title: 'Khoảnh khắc bé Simba tìm được mái ấm tại Cầu Giấy',
    content: 'Chúc mừng Simba đã chính thức về chung một nhà với bạn Trang. Cảm ơn cộng đồng đã luôn đồng hành cùng Paws & Hope!',
    photos: [
      'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=800&auto=format&fit=crop&q=80'
    ],
    likesCount: 210,
    commentsCount: 34,
    createdAt: '26/08/2026'
  }
];
