import { CommunityReport } from '../types/report';

export const mockReports: CommunityReport[] = [
  {
    id: 'rep-1',
    reporterUserId: 'user-2',
    reporterUserName: 'Lê Thu Thảo',
    targetType: 'USER',
    targetId: 'user-4',
    targetTitle: 'Tài khoản có dấu hiệu vi phạm cam kết nhận nuôi',
    targetUserName: 'Nguyễn Hoàng Long',
    reason: 'COMMITMENT_VIOLATION',
    description: 'Người này sau khi nhận nuôi bé cún đã không phản hồi tin nhắn cập nhật tình trạng theo cam kết trong suốt 2 tuần, có dấu hiệu mang thú cưng đi bán lại.',
    evidenceImages: [
      'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=400'
    ],
    status: 'INVESTIGATING',
    investigationNotes: 'Admin đang liên hệ trực tiếp qua số điện thoại để yêu cầu gửi video xác minh tình trạng thú cưng.',
    actionTaken: 'RESTRICTED_ACCOUNT',
    createdAt: '01/09/2026 11:20'
  },
  {
    id: 'rep-2',
    reporterUserId: 'user-1',
    reporterUserName: 'Đặng Quang Minh',
    targetType: 'PET_POST',
    targetId: 'pet-x',
    targetTitle: 'Bài đăng yêu cầu chuyển khoản tiền cọc bất thường',
    reason: 'SCAM',
    description: 'Bài đăng yêu cầu người xin nhận nuôi phải chuyển khoản trước 1 triệu tiền cọc giữ chỗ trước khi cho xem bé trực tiếp.',
    evidenceImages: [],
    status: 'RESOLVED',
    investigationNotes: 'Đã xác minh hành vi lừa đảo chuyển cọc, đã gỡ bài đăng và khóa tài khoản vi phạm vĩnh viễn.',
    actionTaken: 'BANNED_USER',
    resolvedAt: '28/08/2026 15:45',
    createdAt: '28/08/2026 09:10'
  }
];
