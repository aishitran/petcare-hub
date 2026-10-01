export type PrimaryActor = 'USER' | 'ORGANIZATION' | 'ADMIN';

export type StaffRoleTitle = 
  | 'Adoption Coordinator' 
  | 'Rescue Staff' 
  | 'Care Staff' 
  | 'Organization Manager';

export interface StaffPermissions {
  managePets: boolean;
  manageApplications: boolean;
  manageAppointments: boolean;
  manageCheckIns: boolean;
  manageContent: boolean;
  manageStaff: boolean;
}

export interface StaffMember {
  id: string;
  name: string;
  email: string;
  phone: string;
  organizationId: string;
  roleTitle: StaffRoleTitle;
  status: 'Active' | 'Inactive';
  avatar: string;
  permissions: StaffPermissions;
  joinedDate: string;
}

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  address: string;
  occupation: string;
  dob: string;
  housingType: 'Căn hộ chung cư' | 'Nhà phố có sân' | 'Nhà riêng' | 'Phòng trọ';
  experienceLevel: 'Chưa từng nuôi' | 'Đã từng nuôi' | 'Nhiều kinh nghiệm';
  hasOtherPets: string;
  phoneVerified: boolean; // Xác thực số điện thoại qua OTP (Thay thế duyệt CCCD)
  savedPetIds: string[];
  followedOrgIds: string[];
}

export interface AdminAccount {
  id: string;
  name: string;
  email: string;
  role: 'PLATFORM_SUPER_ADMIN' | 'PLATFORM_MODERATOR';
  avatar: string;
}

export type PersonaType = 'USER' | 'STAFF' | 'ADMIN';

export interface AuthPersona {
  type: PersonaType;
  id: string;
  displayName: string;
  email: string;
  avatar: string;
  user?: UserAccount;
  staff?: StaffMember;
  organizationId?: string;
  admin?: AdminAccount;
}
