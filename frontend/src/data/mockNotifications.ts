import { UserNotification } from '../types/notification';

export const mockNotifications: UserNotification[] = [
  {
    id: 'notif-1',
    userId: 'user-1',
    title: 'Lịch hẹn phỏng vấn nhận nuôi',
    message: 'Bạn có lịch hẹn gặp mặt bé Milo vào lúc 15:30 ngày 10/09/2026 tại Công viên Cảnh Đồi, Quận 7.',
    type: 'APPOINTMENT',
    linkUrl: '/appointments',
    read: false,
    createdAt: 'Hôm nay lúc 09:15',
    group: 'TODAY'
  },
  {
    id: 'notif-2',
    userId: 'user-1',
    title: 'Có đơn nhận nuôi mới cho bé Bông',
    message: 'Lê Thu Thảo vừa gửi đơn xin nhận nuôi bé Bông của bạn. Vui lòng xem xét hồ sơ.',
    type: 'APPLICATION',
    linkUrl: '/my-pet-applications',
    read: false,
    createdAt: 'Hôm nay lúc 10:00',
    group: 'TODAY'
  },
  {
    id: 'notif-3',
    userId: 'user-1',
    title: 'Chào mừng bạn đến với PetCare Hub',
    message: 'Tài khoản của bạn đã sẵn sàng. Bạn có thể tự do gửi đơn nhận nuôi hoặc đăng tin hỗ trợ thú cưng.',
    type: 'SYSTEM',
    linkUrl: '/dashboard',
    read: true,
    createdAt: '3 ngày trước',
    group: 'EARLIER'
  },
  {
    id: 'notif-4',
    userId: 'user-1',
    title: 'Nhắc nhở cập nhật tình trạng bé Đậu Đậu',
    message: 'Đã đến hạn cập nhật tình trạng sức khỏe Tuần 2 cho bé Đậu Đậu sau nhận nuôi.',
    type: 'CHECK_IN',
    linkUrl: '/check-ins',
    read: true,
    createdAt: '5 ngày trước',
    group: 'EARLIER'
  }
];
