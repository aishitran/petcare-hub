export type ReportTargetType = 'USER' | 'PET' | 'PET_POST' | 'RESCUE_POST' | 'CONTENT' | 'APPLICATION' | 'SUSPICIOUS_BEHAVIOR';
export type ReportReason = 
  | 'SCAM'                    // Lừa đảo / Chiếm đoạt
  | 'FALSE_INFORMATION'       // Thông tin sai sự thật
  | 'COMMERCIAL_SELLING'      // Mua bán thương mại
  | 'ANIMAL_ABUSE'            // Ngược đãi động vật
  | 'FAKE_RESCUE'             // Kêu gọi cứu hộ giả
  | 'INCORRECT_INFO'          // Thông tin không đúng
  | 'HARASSMENT'              // Quấy rối
  | 'PET_ABANDONMENT'         // Bỏ rơi thú cưng
  | 'COMMITMENT_VIOLATION'    // Vi phạm cam kết nhận nuôi
  | 'INAPPROPRIATE_CONTENT'   // Nội dung không phù hợp
  | 'SUSPICIOUS_BEHAVIOR'     // Hành vi đáng ngờ
  | 'OTHER';                  // Lý do khác

export type ReportStatus = 'PENDING' | 'INVESTIGATING' | 'RESOLVED' | 'DISMISSED' | 'REJECTED';

export interface CommunityReport {
  id: string;
  reporterUserId: string;
  reporterUserName: string;
  
  targetType: ReportTargetType;
  targetId: string;
  targetTitle: string;
  targetUserName?: string;
  
  reason: ReportReason;
  description: string;
  evidenceImages: string[];
  
  status: ReportStatus;
  adminNotes?: string;
  investigationNotes?: string;
  actionTaken?: 'WARNED_USER' | 'RESTRICTED_ACCOUNT' | 'BANNED_USER' | 'CONTENT_REMOVED' | 'DISMISSED';
  resolvedAt?: string;
  createdAt: string;
}
