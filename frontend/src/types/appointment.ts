export type AppointmentStatus = 'SCHEDULED' | 'RESCHEDULED' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';

export interface Appointment {
  id: string;
  applicationId: string;
  petId: string;
  petName: string;
  petAvatar?: string;
  
  posterUserId: string;
  posterUserName: string;
  
  applicantId: string;
  applicantName: string;
  applicantPhone: string;
  
  date: string;
  time: string;
  locationAddress?: string;
  locationOrLink?: string;
  format?: 'ONLINE' | 'IN_PERSON';
  meetingType?: 'IN_PERSON_HOME' | 'IN_PERSON_SHELTER_PARK' | 'ONLINE_VIDEO';
  notes?: string;
  status: AppointmentStatus;
  createdAt: string;
  updatedAt: string;
}
