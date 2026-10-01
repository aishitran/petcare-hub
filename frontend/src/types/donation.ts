export interface FoodDonation {
  id: string;
  campaignId?: string;
  donorName: string;
  donorAvatar?: string;
  amount: number;
  foodPackageName: string;
  kgEquivalent: number;
  message: string;
  createdAt: string;
  isAnonymous?: boolean;
}

export interface BankAccountInfo {
  bankName: string;
  accountNumber: string;
  accountHolder: string;
  branch: string;
  qrPayload?: string;
}

export interface FoodFundCampaign {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  categoryTag: string;
  
  // Organizing Entity & Legal Responsibility (Đơn vị tổ chức & Trách nhiệm trực tiếp)
  organizerName: string;
  organizerType: 'SHELTER' | 'VOLUNTEER_GROUP' | 'COMMUNITY_CAMPAIGN';
  organizerRepresentative: string;
  organizerPhone: string;
  organizerAddress: string;
  verifiedShelter: boolean;
  bankAccount: BankAccountInfo;

  // Financial & Food Metrics
  targetAmount: number;
  currentAmount: number;
  targetKg: number;
  currentKg: number;
  beneficiarySummary: string;
  beneficiarySheltersCount?: number;
  totalDonorsCount: number;
  
  // Timeline & Status
  startDate: string;
  endDate: string;
  status: 'ACTIVE' | 'COMPLETED' | 'UPCOMING';
  
  // Platform Intermediary Disclaimer
  disclaimerNote: string;
  
  // Real-time donor appreciation feed
  recentDonations: FoodDonation[];
}
