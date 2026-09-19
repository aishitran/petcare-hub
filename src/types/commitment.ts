export type CommitmentStatus = 'PENDING' | 'PENDING_SIGNATURE' | 'SIGNED' | 'COMPLETED' | 'CANCELLED';

export interface AdoptionCommitment {
  id: string;
  applicationId: string;
  petId: string;
  petName: string;
  petAvatar?: string;
  
  posterUserId: string;
  posterUserName: string;
  originalOwnerId?: string;
  originalOwnerSignature?: string;
  
  adopterId: string;
  adopterName: string;
  adopterPhone: string;
  adopterIdCardNumber?: string;
  adopterSignature?: string;
  
  commitmentConditions?: string[];
  agreedChecklist?: {
    noProfiteering: boolean; // Cam kết tuyệt đối không trục lợi dưới mọi hình thức
    noCommercialBreeding: boolean; // Không nuôi sinh sản thương mại
    noAbandonment: boolean;
    noSellingOrTrading: boolean;
    timelyVaccination: boolean;
    regularCheckIns: boolean;
    properNutritionAndLivingSpace: boolean;
  };
  
  signatureText?: string;
  status: CommitmentStatus;
  signedAt?: string;
  createdAt: string;
}
