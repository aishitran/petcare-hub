export interface HandoverRecord {
  id: string;
  applicationId: string;
  petId: string;
  petName: string;
  petAvatar: string;
  
  posterUserId: string;
  posterUserName: string;
  
  adopterId: string;
  adopterName: string;
  adopterPhone: string;
  
  handoverDate: string;
  handoverLocation: string;
  
  checklist: {
    identityConfirmed: boolean;
    petHealthConditionChecked: boolean;
    vaccinationBookHandedOver: boolean;
    medicalRecordsHandedOver: boolean;
    suppliesAndAccessoriesHandedOver: boolean;
    commitmentSigned: boolean;
  };
  
  handoverPhotos: string[];
  notes?: string;
  isCompleted: boolean;
  completedAt?: string;
}
