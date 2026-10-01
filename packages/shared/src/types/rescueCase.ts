export interface RescueCase {
  id: string;
  organizationId: string;
  title: string;
  rescueDate: string;
  location: string;
  rescueStory: string;
  animalCount: number;
  photos: string[];
  coverImage: string;
  linkedPetIds: string[];
  status: 'COMPLETED' | 'ONGOING' | 'URGENT';
  internalNotes?: string;
  coordinatorStaffId?: string;
  coordinatorStaffName?: string;
  estimatedCostVND?: number;
}
