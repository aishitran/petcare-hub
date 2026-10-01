import { UserProfile } from '../types/user';

export const mockUsers: UserProfile[] = [
  {
    id: 'user-1',
    name: 'Đặng Quang Minh',
    email: 'quangminh.design@gmail.com',
    phone: '0988 345 678',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80',
    role: 'USER',
    location: 'Quận 7, TP. Hồ Chí Minh',
    address: 'Căn hộ Sunrise City, 23 Nguyễn Hữu Thọ, P. Tân Hưng, Q.7, TP.HCM',
    occupation: 'Senior Product Designer',
    dob: '15/06/1996',
    joinedDate: '12/01/2025',
    accountStatus: 'ACTIVE',
    identityStatus: 'VERIFIED',
    stats: {
      petsPosted: 2,
      petsAdoptedOut: 1,
      petsAdoptedIn: 1,
      rescuePosts: 1,
      reportsSubmitted: 0
    },
    warningCount: 0,
    savedPetIds: ['pet-1', 'pet-3', 'pet-5']
  },
  {
    id: 'user-2',
    name: 'Lê Thu Thảo',
    email: 'thuthao.le@gmail.com',
    phone: '0912 345 999',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80',
    role: 'USER',
    location: 'Quận 1, TP. Hồ Chí Minh',
    address: '45 Lê Duẩn, P. Bến Nghé, Quận 1, TP.HCM',
    occupation: 'Chuyên viên Marketing',
    dob: '20/11/1998',
    joinedDate: '18/02/2025',
    accountStatus: 'ACTIVE',
    identityStatus: 'VERIFIED',
    stats: {
      petsPosted: 1,
      petsAdoptedOut: 0,
      petsAdoptedIn: 1,
      rescuePosts: 0,
      reportsSubmitted: 1
    },
    warningCount: 0,
    savedPetIds: ['pet-2', 'pet-4']
  },
  {
    id: 'user-3',
    name: 'Trần Văn Nam',
    email: 'vannam.tran@gmail.com',
    phone: '0933 111 222',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=200&auto=format&fit=crop&q=80',
    role: 'USER',
    location: 'Quận Bình Thạnh, TP. Hồ Chí Minh',
    address: '12/4 Hoàng Hoa Thám, Bình Thạnh, TP.HCM',
    occupation: 'Lập trình viên',
    dob: '10/10/2000',
    joinedDate: '01/08/2026',
    accountStatus: 'ACTIVE',
    identityStatus: 'VERIFIED',
    stats: {
      petsPosted: 1,
      petsAdoptedOut: 0,
      petsAdoptedIn: 0,
      rescuePosts: 1,
      reportsSubmitted: 0
    },
    warningCount: 0,
    savedPetIds: []
  },
  {
    id: 'user-4',
    name: 'Nguyễn Hoàng Long',
    email: 'hoanglong.media@gmail.com',
    phone: '0909 888 777',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    role: 'USER',
    location: 'Quận Cầu Giấy, Hà Nội',
    occupation: 'Nhiếp ảnh tự do',
    dob: '05/04/1994',
    joinedDate: '15/05/2025',
    accountStatus: 'RESTRICTED',
    restrictionReason: 'Bị cảnh cáo vì chậm cập nhật tình trạng thú cưng sau nhận nuôi.',
    identityStatus: 'VERIFIED',
    stats: {
      petsPosted: 0,
      petsAdoptedOut: 0,
      petsAdoptedIn: 1,
      rescuePosts: 0,
      reportsSubmitted: 0
    },
    warningCount: 2,
    savedPetIds: []
  },
  {
    id: 'admin-1',
    name: 'Trần Hoàng',
    email: 'admin@petcarehub.vn',
    phone: '0901 000 999',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80',
    role: 'ADMIN',
    location: 'TP. Hồ Chí Minh',
    occupation: 'Platform Super Administrator',
    dob: '01/01/1990',
    joinedDate: '01/01/2024',
    accountStatus: 'ACTIVE',
    identityStatus: 'VERIFIED',
    stats: {
      petsPosted: 0,
      petsAdoptedOut: 0,
      petsAdoptedIn: 0,
      rescuePosts: 0,
      reportsSubmitted: 0
    },
    warningCount: 0,
    savedPetIds: []
  }
];
