export type AppointmentStatus = 'SCHEDULED' | 'COMPLETED' | 'CANCELLED' | 'NEEDS_CONFIRMATION';

export interface Appointment {
  id: string;
  organizationId: string;
  applicationId: string;
  petId: string;
  petName: string;
  petAvatar: string;
  applicantId: string;
  applicantName: string;
  applicantPhone: string;
  date: string;
  time: string;
  locationType: 'SHELTER' | 'HOME_VISIT' | 'ONLINE_CALL';
  locationAddress: string;
  status: AppointmentStatus;
  notes?: string;
  assignedStaffName: string;
  assignedStaffId: string;
  createdAt: string;
}

export type CheckInStatus = 'PENDING' | 'COMPLETED' | 'FLAGGED_ATTENTION' | 'OVERDUE';

export interface CheckIn {
  id: string;
  organizationId: string;
  petId: string;
  petName: string;
  petAvatar: string;
  adopterId: string;
  adopterName: string;
  adopterPhone: string;
  adopterEmail: string;
  daysSinceAdoption: number;
  checkInMilestone: 'Tuần 1' | 'Tháng 1' | 'Tháng 3' | 'Tháng 6' | 'Năm 1';
  scheduledDate: string;
  status: CheckInStatus;
  adopterFeedback?: string;
  adopterPhotos?: string[];
  staffEvaluation?: string;
  staffAssignedName: string;
  updatedAt?: string;
}

export interface FeedbackRating {
  id: string;
  organizationId: string;
  petId?: string;
  petName?: string;
  authorName: string;
  authorAvatar: string;
  rating: number;
  comment: string;
  createdAt: string;
  response?: {
    staffName: string;
    text: string;
    respondedAt: string;
  };
}

export interface CommunityPost {
  id: string;
  organizationId?: string;
  organizationName?: string;
  organizationLogo?: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  authorRole?: string;
  postType: 'RESCUE_UPDATE' | 'ADOPTION_SUCCESS' | 'EDUCATIONAL' | 'ANNOUNCEMENT' | 'USER_SHARE';
  title: string;
  content: string;
  photos: string[];
  likesCount: number;
  commentsCount: number;
  createdAt: string;
  petId?: string;
  rescueCaseId?: string;
}
