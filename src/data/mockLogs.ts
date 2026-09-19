import { SystemAuditLog } from '../types/systemLog';

export const mockLogs: SystemAuditLog[] = [
  {
    id: 'log-1',
    userId: 'admin-1',
    userName: 'Trần Hoàng (Admin)',
    action: 'APPROVE_PET',
    entity: 'Pet',
    entityId: 'pet-1',
    details: 'Phê duyệt hiển thị công khai bài đăng nhận nuôi bé Milo.',
    ipAddress: '113.161.45.12',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/128.0',
    timestamp: '28/08/2026 10:15:22'
  },
  {
    id: 'log-2',
    userId: 'user-1',
    userName: 'Đặng Quang Minh',
    action: 'CREATE_APPLICATION',
    entity: 'Application',
    entityId: 'app-1',
    details: 'Nộp hồ sơ nhận nuôi bé Milo (Đã hoàn tất bảng khảo sát 6 bước).',
    ipAddress: '42.117.163.92',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) Safari/605.1',
    timestamp: '30/08/2026 14:30:05'
  },
  {
    id: 'log-3',
    userId: 'user-2',
    userName: 'Lê Thu Thảo',
    action: 'APPROVE_APPLICATION',
    entity: 'Application',
    entityId: 'app-1',
    details: 'Chủ nuôi chuyển trạng thái đơn sang INTERVIEW và lên lịch hẹn.',
    oldValue: 'PENDING',
    newValue: 'INTERVIEW',
    ipAddress: '14.232.180.44',
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_5) Mobile/15E148',
    timestamp: '02/09/2026 09:15:10'
  },
  {
    id: 'log-4',
    userId: 'admin-1',
    userName: 'Trần Hoàng (Admin)',
    action: 'RESTRICT_USER',
    entity: 'User',
    entityId: 'user-4',
    details: 'Tạm hạn chế quyền đăng tin của tài khoản Nguyễn Hoàng Long do có báo cáo vi phạm.',
    oldValue: 'ACTIVE',
    newValue: 'RESTRICTED',
    ipAddress: '113.161.45.12',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/128.0',
    timestamp: '01/09/2026 14:00:30'
  },
  {
    id: 'log-5',
    userId: 'user-1',
    userName: 'Đặng Quang Minh',
    action: 'SUBMIT_CHECK_IN',
    entity: 'CheckIn',
    entityId: 'checkin-1',
    details: 'Gửi cập nhật định kỳ Tuần 1 cho bé Đậu Đậu.',
    ipAddress: '42.117.163.92',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
    timestamp: '01/09/2026 20:00:00'
  }
];
