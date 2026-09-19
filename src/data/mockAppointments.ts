import { Appointment } from '../types/appointment';

export const mockAppointments: Appointment[] = [
  {
    id: 'apt-1',
    applicationId: 'app-1',
    petId: 'pet-1',
    petName: 'Milo',
    petAvatar: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=800&auto=format&fit=crop&q=80',
    posterUserId: 'user-2',
    posterUserName: 'Lê Thu Thảo',
    applicantId: 'user-1',
    applicantName: 'Đặng Quang Minh',
    applicantPhone: '0988 345 678',
    date: '10/09/2026',
    time: '15:30',
    locationAddress: 'Công viên Cảnh Đồi, Phú Mỹ Hưng, Quận 7, TP.HCM',
    meetingType: 'IN_PERSON_SHELTER_PARK',
    notes: 'Hẹn gặp tại công viên để bé Milo làm quen với anh Minh và quan sát phản xạ của bé.',
    status: 'CONFIRMED',
    createdAt: '02/09/2026',
    updatedAt: '03/09/2026'
  }
];
