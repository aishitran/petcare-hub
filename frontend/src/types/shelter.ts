export type RescueCenterType = 
  | 'RESCUE_TEAM'      // Cứu hộ động vật (Animal Rescue Team)
  | 'SHELTER'          // Trạm cứu trợ (Rescue Shelter)
  | 'VET_CLINIC'       // Phòng khám hỗ trợ (Partner Vet Clinic)
  | 'WELFARE_ORG';     // Tổ chức bảo vệ động vật (Animal Welfare Org)

export type RescueCenterStatus = 'ACTIVE' | 'BUSY' | 'CLOSED';

export type SupportedAnimal = 'DOG' | 'CAT' | 'RABBIT' | 'BIRD' | 'TURTLE' | 'WILDLIFE' | 'OTHER';

export type SupplyCategoryType = 'FOOD' | 'MEDICAL' | 'HYGIENE' | 'OTHER';

export interface ShelterSupplyItem {
  id: string;
  name: string;
  nameEn: string;
  category: SupplyCategoryType;
  quantityNeeded: string; // e.g. "50 kg hạt", "20 liều", "30 bao (150 kg)"
  quantityNeededEn: string;
  quantityReceived?: string;
  quantityReceivedEn?: string;
  urgent?: boolean;
  notes?: string;
  notesEn?: string;
}

export interface ShelterSupplyCategory {
  category: SupplyCategoryType;
  title: string;
  titleEn: string;
  summary: string;
  summaryEn: string;
  itemCount: number;
  items: ShelterSupplyItem[];
}

export interface EmergencyShelter {
  id: string;
  name: string;
  nameEn?: string;
  type: RescueCenterType;
  status: RescueCenterStatus;
  
  city: string;
  district: string;
  address: string;
  addressEn?: string;
  
  phone: string;              // Distinct primary contact phone!
  hotline: string;            // Compatible alias
  secondaryPhone?: string;
  email?: string;
  
  operatingHours: string;     // e.g. "08:00 - 20:00" | "Trực cấp cứu 24/7"
  operatingHoursEn?: string;
  is24_7: boolean;
  
  supportedArea: string;      // e.g. "Toàn TP.HCM & các quận lân cận"
  supportedAreaEn?: string;
  
  supportedAnimals: SupportedAnimal[];
  services: string[];
  servicesEn?: string[];
  
  instructionsForFinder: string;
  instructionsForFinderEn?: string;
  
  googleMapsUrl: string;
  avatarUrl?: string;
  
  isVerified: boolean;
  isNonProfit: boolean;

  // Real-time supply needs of this shelter
  neededSupplies?: ShelterSupplyCategory[];
  
  // Backward compatibility alias for shelterType if referenced
  shelterType?: 'SHELTER' | 'HOSPITAL_PARTNER' | 'VOLUNTEER_TEAM' | RescueCenterType;
}

export type RescueCenter = EmergencyShelter;

