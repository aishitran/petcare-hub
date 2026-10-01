export type RescueCategory = 
  | 'FOOD'              // Thức ăn
  | 'WATER'             // Nước uống
  | 'SUPPLIES'          // Vật dụng / Chuồng đệm
  | 'MEDICINE'          // Thuốc men
  | 'MEDICAL_SUPPLIES'  // Vật tư y tế
  | 'PET_CARE'          // Chăm sóc tạm thời
  | 'SHELTER_SUPPORT'   // Hỗ trợ trạm / Chi phí cứu hộ
  | 'OTHER';            // Khác

export type RescuePriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
export type RescueStatus = 'PENDING_APPROVAL' | 'APPROVED' | 'COMPLETED' | 'CANCELLED';

export interface RescuePost {
  id: string;
  creatorUserId: string;
  creatorUserName: string;
  creatorUserAvatar: string;
  creatorUserPhone: string;
  
  // Shelter / Rescue Station Info (Chỗ cứu trợ / Trạm cứu hộ tiếp nhận)
  shelterName: string;
  shelterHotline: string;
  shelterAddress: string;
  isNonProfitCommitment?: boolean; // Cam kết phi lợi nhuận, không trục lợi
  
  title: string;
  category: RescueCategory;
  priority: RescuePriority;
  status: RescueStatus;
  
  description: string;
  quantityNeeded: string; // e.g. "20kg hạt", "5 triệu viện phí", "Chỗ ở tạm 1 tuần"
  quantityFulfilled?: string;
  
  images: string[];
  videoUrl?: string;
  
  requiredDate: string;
  supportLocation: string; // Generalized e.g. "Quận Bình Thạnh, TP.HCM"
  
  contactPerson: string;
  contactPhone: string;
  notes?: string;
  
  supportsCount: number;
  createdAt: string;
  updatedAt: string;
}
