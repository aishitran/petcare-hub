export type OrganizationStatus = 
  | 'PENDING_VERIFICATION' // Chờ xác minh
  | 'UNDER_REVIEW'         // Đang được xem xét
  | 'APPROVED'             // Đã được phê duyệt
  | 'REJECTED'             // Bị từ chối
  | 'SUSPENDED';           // Tạm ngưng hoạt động

export interface VerificationDocument {
  id: string;
  name: string;
  type: 'Giấy phép hoạt động' | 'Giấy xác nhận cơ sở cứu hộ' | 'Hình ảnh cơ sở cứu hộ' | 'Giấy ủy quyền';
  fileUrl: string;
  fileName: string;
  fileSize: string;
  submittedAt: string;
  verified: boolean;
}

export interface ReviewHistoryItem {
  id: string;
  date: string;
  action: 'SUBMITTED' | 'UNDER_REVIEW' | 'APPROVED' | 'REJECTED' | 'SUSPENDED' | 'RESUBMITTED';
  reviewerName: string;
  note: string;
}

export interface OrganizationStats {
  rescuedCount: number;
  adoptedCount: number;
  currentPetCount: number;
  followersCount: number;
  staffCount: number;
  rating: number;
  ratingCount: number;
}

export interface Organization {
  id: string;
  name: string;
  tagline: string;
  description: string;
  location: string;
  address: string;
  contactEmail: string;
  contactPhone: string;
  establishedDate: string;
  status: OrganizationStatus;
  rejectionReason?: string;
  logo: string;
  coverImage: string;
  stats: OrganizationStats;
  verificationDocs: VerificationDocument[];
  socialLinks: {
    facebook?: string;
    website?: string;
    zalo?: string;
  };
  reviewHistory: ReviewHistoryItem[];
  focusAreas: string[];
}
