export interface UserNotification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'IDENTITY' | 'APPLICATION' | 'APPOINTMENT' | 'CHECK_IN' | 'RESCUE' | 'REPORT' | 'SYSTEM';
  linkUrl?: string;
  read: boolean;
  createdAt: string;
  group: 'TODAY' | 'EARLIER';
}
