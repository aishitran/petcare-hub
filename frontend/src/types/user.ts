export type UserRole = 'GUEST' | 'USER' | 'ADMIN';

export type IdentityStatus = 'UNVERIFIED' | 'PENDING' | 'VERIFIED' | 'FAILED' | 'REJECTED';
export type AccountStatus = 'ACTIVE' | 'RESTRICTED' | 'BANNED' | 'SUSPENDED';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  role: UserRole;
  location: string;
  address?: string;
  occupation: string;
  dob: string;
  joinedDate: string;
  accountStatus: AccountStatus;
  identityStatus: IdentityStatus;
  identityData?: {
    idNumber: string;
    fullName?: string;
    dob?: string;
    frontImage: string;
    backImage: string;
    selfieImage?: string;
  };
  identityDocument?: {
    idNumber: string;
    fullName: string;
    dob: string;
    submittedAt: string;
    verifiedAt?: string;
    rejectionReason?: string;
    frontCardUrl?: string;
    backCardUrl?: string;
  };
  stats?: {
    petsPosted: number;
    petsAdoptedOut: number;
    petsAdoptedIn: number;
    rescuePosts: number;
    reportsSubmitted: number;
  };
  warningCount?: number;
  restrictionReason?: string;
  savedPetIds: string[];
}
