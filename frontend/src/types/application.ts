export type ApplicationStatus = 
  | 'PENDING'       // Application submitted, waiting for review
  | 'INTERVIEW'     // Interview / Appointment scheduled
  | 'APPROVED'      // Approved by pet poster
  | 'REJECTED'      // Rejected with reason
  | 'CANCELLED'     // Cancelled by applicant
  | 'BACKUP';       // Placed in backup queue

export interface ApplicationTimelineEvent {
  id: string;
  status: ApplicationStatus | 'COMMITMENT_SIGNED' | 'HANDED_OVER' | 'CHECK_IN_DUE';
  title: string;
  timestamp: string;
  actorName: string;
  notes?: string;
  completed: boolean;
}

export interface AdoptionApplication {
  id: string;
  petId: string;
  petName: string;
  petAvatar: string;
  petSpecies: 'DOG' | 'CAT' | 'OTHER';
  petBreed: string;
  
  // Poster of the pet
  posterUserId: string;
  posterUserName: string;
  
  // Applicant details
  applicantId: string;
  applicantName: string;
  applicantEmail: string;
  applicantPhone: string;
  applicantDob: string;
  applicantAge: number;
  applicantOccupation: string;
  applicantProvince: string;
  applicantAddress: string;
  
  // Step 2: Adoption reason
  adoptionReason: string;
  reasonForChoosingPet: string;
  
  // Step 3: Living Conditions
  housingType: 'Nhà riêng' | 'Căn hộ chung cư' | 'Phòng trọ' | 'Khác';
  petsAllowedInBuilding: boolean;
  petLivingAreaDescription: string;
  householdMembersCount: number;
  hasChildrenInHome: boolean;
  hasPetAllergiesInHome: boolean;
  
  // Step 4: Pet Care Experience
  hasOwnedPetsBefore: boolean;
  previousPetSpeciesAndDuration?: string;
  currentlyHasPets: boolean;
  currentPetsCount?: number;
  currentPetsDescription?: string;
  
  // Step 5: Care Capacity
  dailyHoursForPet: string;
  primaryCaregiver: string;
  estimatedMonthlyBudget: string;
  medicalCareCapacity: boolean;
  emergencyVetClinicNamed?: string;
  travelOrAwayCarePlan: string;
  
  // Step 6: Adoption Commitment
  agreedToAccurateInfo: boolean;
  agreedToProperCare: boolean;
  agreedNoSellingOrTrading: boolean;
  agreedNoAbandonment: boolean;
  agreedToMedicalCare: boolean;
  agreedToFollowConditions: boolean;
  agreedToPostAdoptionCheckIns: boolean;
  
  // Tracking
  status: ApplicationStatus;
  rejectionReason?: string;
  cancelReason?: string;
  submittedAt: string;
  updatedAt: string;
  
  timeline: ApplicationTimelineEvent[];
}
