import { PostAdoptionCheckIn } from '../types/checkIn';

export const mockCheckIns: PostAdoptionCheckIn[] = [
  {
    id: 'checkin-1',
    applicationId: 'app-3',
    petId: 'pet-5',
    petName: 'Đậu Đậu',
    petAvatar: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=800&auto=format&fit=crop&q=80',
    adopterId: 'user-1',
    adopterName: 'Đặng Quang Minh',
    weekNumber: 1,
    checkInDate: '01/09/2026',
    healthCondition: 'EXCELLENT',
    eatingHabits: 'Ăn rất tốt',
    dailyActivityLevel: 'Rất năng động',
    mentalState: 'Hòa nhập tốt, vui vẻ',
    photos: [
      'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=800&auto=format&fit=crop&q=80'
    ],
    notes: 'Tuần đầu tiên bé Đậu Đậu hòa nhập rất nhanh! Bé rất quấn chủ, ăn hết sạch hạt và ngủ rất say.',
    hasIssuesOrQuestions: false,
    isOverdueReminder: false,
    isOverdueWarning: false,
    createdAt: '01/09/2026 20:00'
  }
];
