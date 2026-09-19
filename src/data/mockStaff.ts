import { StaffMember, UserAccount, AdminAccount, AuthPersona } from '../types/actor';

export const mockStaff: StaffMember[] = [
  {
    id: 'staff-0',
    name: 'Vũ Tuấn Kiệt',
    email: 'tuankiet@nhachungrescue.vn',
    phone: '0908 123 450',
    organizationId: 'org-1',
    roleTitle: 'Organization Manager',
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    joinedDate: '10/01/2020',
    permissions: {
      managePets: true,
      manageApplications: true,
      manageAppointments: true,
      manageCheckIns: true,
      manageContent: true,
      manageStaff: true,
    }
  },
  {
    id: 'staff-1',
    name: 'Nguyễn Minh Anh',
    email: 'minhanh@nhachungrescue.vn',
    phone: '0908 123 451',
    organizationId: 'org-1',
    roleTitle: 'Adoption Coordinator',
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    joinedDate: '15/03/2020',
    permissions: {
      managePets: true,
      manageApplications: true,
      manageAppointments: true,
      manageCheckIns: true,
      manageContent: true,
      manageStaff: false,
    }
  },
  {
    id: 'staff-2',
    name: 'Trần Quốc Bảo',
    email: 'quocbao@nhachungrescue.vn',
    phone: '0908 123 452',
    organizationId: 'org-1',
    roleTitle: 'Rescue Staff',
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    joinedDate: '01/06/2021',
    permissions: {
      managePets: true,
      manageApplications: false,
      manageAppointments: false,
      manageCheckIns: true,
      manageContent: false,
      manageStaff: false,
    }
  },
  {
    id: 'staff-3',
    name: 'Lê Thu Hà',
    email: 'thuha@pawsandhope.org.vn',
    phone: '0912 888 991',
    organizationId: 'org-2',
    roleTitle: 'Care Staff',
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    joinedDate: '10/11/2022',
    permissions: {
      managePets: true,
      manageApplications: false,
      manageAppointments: false,
      manageCheckIns: true,
      manageContent: false,
      manageStaff: false,
    }
  },
  {
    id: 'staff-4',
    name: 'Vũ Hoàng Long',
    email: 'hoanglong@pawsandhope.org.vn',
    phone: '0912 888 992',
    organizationId: 'org-2',
    roleTitle: 'Organization Manager',
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
    joinedDate: '05/01/2023',
    permissions: {
      managePets: true,
      manageApplications: true,
      manageAppointments: true,
      manageCheckIns: true,
      manageContent: true,
      manageStaff: true,
    }
  },
  {
    id: 'staff-5',
    name: 'Phạm Hoàng Yến',
    email: 'hoangyen@maiammeonho.vn',
    phone: '0935 777 661',
    organizationId: 'org-3',
    roleTitle: 'Organization Manager',
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    joinedDate: '01/03/2024',
    permissions: {
      managePets: true,
      manageApplications: true,
      manageAppointments: true,
      manageCheckIns: true,
      manageContent: true,
      manageStaff: true,
    }
  }
];

export const mockUsersList: UserAccount[] = [
  {
    id: 'user-1',
    name: 'Hoàng Nam',
    email: 'hoangnam.design@gmail.com',
    phone: '0988 345 678',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    address: 'Chung cư Sunrise City, 23 Nguyễn Hữu Thọ, Tân Hưng, Quận 7, TP.HCM',
    occupation: 'Product Designer',
    dob: '15/06/1998',
    housingType: 'Căn hộ chung cư',
    experienceLevel: 'Đã từng nuôi',
    hasOtherPets: 'Đang nuôi 1 mèo ta 2 tuổi đã triệt sản và tiêm phòng đầy đủ.',
    phoneVerified: true,
    savedPetIds: ['pet-1', 'pet-3'],
    followedOrgIds: ['org-1']
  },
  {
    id: 'user-2',
    name: 'Lê Thu Thảo',
    email: 'thuthao.le@gmail.com',
    phone: '0912 345 999',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    address: '45 Lê Duẩn, Quận 1, TP.HCM',
    occupation: 'Nhân viên văn phòng',
    dob: '20/11/2000',
    housingType: 'Nhà riêng',
    experienceLevel: 'Chưa từng nuôi',
    hasOtherPets: 'Không có',
    phoneVerified: true,
    savedPetIds: [],
    followedOrgIds: []
  },
  {
    id: 'user-3',
    name: 'Trần Văn Mới (Chưa xác thực SĐT)',
    email: 'vanmoi.tran@gmail.com',
    phone: '0933 111 222',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80',
    address: 'Phòng trọ 12/4 Hoàng Hoa Thám, Bình Thạnh, TP.HCM',
    occupation: 'Sinh viên',
    dob: '10/10/2004',
    housingType: 'Phòng trọ',
    experienceLevel: 'Chưa từng nuôi',
    hasOtherPets: 'Không có',
    phoneVerified: false,
    savedPetIds: [],
    followedOrgIds: []
  }
];

export const mockCustomerUser = mockUsersList[0];

export const mockAdmin: AdminAccount = {
  id: 'admin-1',
  name: 'Trần Hoàng (Admin Tổng)',
  email: 'admin@petcarehub.vn',
  role: 'PLATFORM_SUPER_ADMIN',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80'
};

export const demoPersonas: AuthPersona[] = [
  {
    type: 'USER',
    id: 'persona-user',
    displayName: 'Hoàng Nam (Khách — SĐT đã xác thực)',
    email: mockUsersList[0].email,
    avatar: mockUsersList[0].avatar,
    user: mockUsersList[0]
  },
  {
    type: 'USER',
    id: 'persona-user-2',
    displayName: 'Lê Thu Thảo (Khách — SĐT đã xác thực)',
    email: mockUsersList[1].email,
    avatar: mockUsersList[1].avatar,
    user: mockUsersList[1]
  },
  {
    type: 'USER',
    id: 'persona-user-3',
    displayName: 'Trần Văn Mới (Khách — Chưa xác thực SĐT)',
    email: mockUsersList[2].email,
    avatar: mockUsersList[2].avatar,
    user: mockUsersList[2]
  },
  {
    type: 'STAFF',
    id: 'persona-manager-1',
    displayName: 'Vũ Tuấn Kiệt (Quản lý trưởng trạm — Nhà Chung Rescue)',
    email: mockStaff[0].email,
    avatar: mockStaff[0].avatar,
    organizationId: 'org-1',
    staff: mockStaff[0]
  },
  {
    type: 'STAFF',
    id: 'persona-staff-1',
    displayName: 'Nguyễn Minh Anh (Điều phối đơn — Nhà Chung Rescue)',
    email: mockStaff[1].email,
    avatar: mockStaff[1].avatar,
    organizationId: 'org-1',
    staff: mockStaff[1]
  },
  {
    type: 'STAFF',
    id: 'persona-staff-2',
    displayName: 'Trần Quốc Bảo (Nhân viên cứu hộ — Nhà Chung Rescue)',
    email: mockStaff[2].email,
    avatar: mockStaff[2].avatar,
    organizationId: 'org-1',
    staff: mockStaff[2]
  },
  {
    type: 'STAFF',
    id: 'persona-staff-3',
    displayName: 'Lê Thu Hà (Nhân viên chăm sóc — Paws & Hope)',
    email: mockStaff[3].email,
    avatar: mockStaff[3].avatar,
    organizationId: 'org-2',
    staff: mockStaff[3]
  },
  {
    type: 'STAFF',
    id: 'persona-staff-5',
    displayName: 'Phạm Hoàng Yến (Quản lý — Mái Ấm Mèo Nhỏ [Đang chờ duyệt])',
    email: mockStaff[5].email,
    avatar: mockStaff[5].avatar,
    organizationId: 'org-3',
    staff: mockStaff[5]
  },
  {
    type: 'ADMIN',
    id: 'persona-admin',
    displayName: 'Trần Hoàng (Quản trị viên Hệ Thống - Vĩ mô)',
    email: mockAdmin.email,
    avatar: mockAdmin.avatar,
    admin: mockAdmin
  }
];
