import { AdoptionCommitment } from '../types/commitment';

export const mockCommitments: AdoptionCommitment[] = [
  {
    id: 'commit-1',
    applicationId: 'app-3',
    petId: 'pet-5',
    petName: 'Đậu Đậu',
    petAvatar: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=800&auto=format&fit=crop&q=80',
    posterUserId: 'user-3',
    posterUserName: 'Trần Văn Nam',
    adopterId: 'user-1',
    adopterName: 'Đặng Quang Minh',
    adopterPhone: '0988 345 678',
    adopterIdCardNumber: '079196008899',
    commitmentConditions: [
      '1. Cam kết tuyệt đối KHÔNG TRỤC LỢI: Không buôn bán lại, không chuyển nhượng thương mại, không nhân giống sinh sản vì mục đích kinh doanh.',
      '2. Cam kết NUÔI DƯỠNG CÓ TRÁCH NHIỆM & KHÔNG BỎ RƠI: Chăm sóc trọn đời, không bỏ rơi bé khi thay đổi chỗ ở hoặc hoàn cảnh sống.',
      '3. Cam kết KHÔNG THẢ RÔNG: Luôn có dây dắt và rào chắn an toàn, không để bé gặp hiểm nguy hoặc tiếp tay cho nạn buôn bán thịt chó mèo.',
      '4. Cam kết CHĂM SÓC Y TẾ: Đảm bảo tiêm phòng dại, vắc xin định kỳ hàng năm và triệt sản đúng tuổi.',
      '5. Cam kết MINH BẠCH: Đồng ý gửi hình ảnh cập nhật sức khỏe định kỳ (1 tuần, 1 tháng, 3 tháng) và liên hệ lại người đăng nếu có biến cố.'
    ],
    agreedChecklist: {
      noProfiteering: true,
      noCommercialBreeding: true,
      noAbandonment: true,
      noSellingOrTrading: true,
      timelyVaccination: true,
      regularCheckIns: true,
      properNutritionAndLivingSpace: true
    },
    signatureText: 'Đặng Quang Minh',
    status: 'SIGNED',
    signedAt: '22/08/2026 10:15',
    createdAt: '22/08/2026'
  }
];
