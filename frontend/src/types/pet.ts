export type PetSpecies = 'DOG' | 'CAT' | 'OTHER';
export type PetGender = 'MALE' | 'FEMALE';
export type PetSize = 'SMALL' | 'MEDIUM' | 'LARGE';
export type PetAgeGroup = 'PUPPY_KITTEN' | 'YOUNG' | 'ADULT' | 'SENIOR';

export type PetStatus = 
  | 'WAITING'       // Looking for a home (Sẵn sàng tìm nhà)
  | 'UNDER_REVIEW'  // Adoption in progress (Đang xét duyệt nhận nuôi)
  | 'ADOPTED'       // Adopted (Đã có chủ mới)
  | 'PAUSED'        // Temporarily paused (Tạm dừng nhận nuôi)
  | 'COMING_SOON';  // Coming soon / Under 2 months (Sắp mở nhận nuôi)

export type PetModerationStatus = 'PENDING_APPROVAL' | 'APPROVED' | 'REJECTED';

export interface PetHealth {
  condition?: 'EXCELLENT' | 'GOOD' | 'SPECIAL_CARE' | 'RECOVERING';
  conditionDescription?: string;
  vaccinated?: boolean;
  isVaccinated?: boolean;
  dewormed?: boolean;
  isDewormed?: boolean;
  neutered?: boolean;
  isSterilized?: boolean;
  isRabiesVaccinated?: boolean;
  hasDiseaseOrDisability?: boolean;
  hasSpecialNeeds?: boolean;
  diseaseNotes?: string;
  medicalNotes?: string;
  medicalHistory?: string[];
  currentMedication?: string;
  weightKg?: number;
}

export interface PetPersonality {
  tags?: string[]; // e.g., ['Friendly', 'Playful', 'Calm', 'Good with Kids', 'Good with Dogs']
  traits?: string[];
  friendlyWithPeople?: boolean;
  friendlyWithKids?: boolean;
  goodWithChildren?: boolean;
  friendlyWithDogs?: boolean;
  goodWithDogs?: boolean;
  friendlyWithCats?: boolean;
  goodWithCats?: boolean;
  habits?: string;
  interests?: string;
  specialNotes?: string;
}

export interface PetAdoptionRequirements {
  purpose?: 'ADOPTION' | 'RESCUE' | 'FIND_OWNER' | 'REHOMING';
  postingReason?: string;
  adoptionFee?: number; // Support fee (VND), 0 for free
  conditions?: string[];
  housingType?: 'HOUSE' | 'APARTMENT' | 'ANY';
  financialStability?: boolean;
  requiresPostAdoptionCheckIn?: boolean;
  homeVisitRequired?: boolean;
  minAdopterAge?: number;
  commitmentRequired?: boolean;
  handoverLocation?: string; // Generalized location (e.g. Quận 7, TP.HCM)
}

export interface Pet {
  id: string;
  creatorUserId: string;
  creatorUserName: string;
  creatorUserAvatar: string;
  creatorUserPhone?: string;
  
  name: string;
  species: PetSpecies;
  gender: PetGender;
  ageDisplay?: string;
  age?: string;
  ageGroup?: PetAgeGroup;
  ageMonths?: number;
  breed: string;
  color?: string;
  size: PetSize;
  weightKg?: number;
  location: string; // Generalized e.g. "Quận 7, TP. Hồ Chí Minh"
  description?: string;
  rehomingReason?: string; // Reason for rehoming / poster's story
  adoptionFee?: number;
  
  avatar?: string;
  photos: string[];
  videoUrl?: string;
  
  health: PetHealth;
  personality: PetPersonality;
  adoptionReqs?: PetAdoptionRequirements;
  requirements?: PetAdoptionRequirements;
  
  status: PetStatus;
  moderationStatus: PetModerationStatus;
  rejectionReason?: string;
  
  createdAt: string;
  updatedAt: string;
  viewsCount?: number;
  favoritesCount?: number;
  activeApplicationsCount?: number;
}
