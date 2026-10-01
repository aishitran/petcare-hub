import { HandoverRecord } from '../types/handover';

export const mockHandovers: HandoverRecord[] = [
  {
    id: 'handover-1',
    applicationId: 'app-3',
    petId: 'pet-5',
    petName: 'Đậu Đậu',
    petAvatar: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=800&auto=format&fit=crop&q=80',
    posterUserId: 'user-3',
    posterUserName: 'Trần Văn Nam',
    adopterId: 'user-1',
    adopterName: 'Đặng Quang Minh',
    adopterPhone: '0988 345 678',
    handoverDate: '25/08/2026',
    handoverLocation: 'Tại nhà người nhận nuôi — Căn hộ Sunrise City, Q.7',
    checklist: {
      identityConfirmed: true,
      petHealthConditionChecked: true,
      vaccinationBookHandedOver: true,
      medicalRecordsHandedOver: true,
      suppliesAndAccessoriesHandedOver: true,
      commitmentSigned: true
    },
    handoverPhotos: [
      'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=800&auto=format&fit=crop&q=80'
    ],
    notes: 'Bé Đậu Đậu đã được bàn giao an toàn và vui vẻ làm quen với nhà mới của anh Minh.',
    isCompleted: true,
    completedAt: '25/08/2026 16:30'
  }
];
