import { RescueCase } from '../types/rescueCase';

export const mockRescueCases: RescueCase[] = [
  {
    id: 'case-1',
    organizationId: 'org-1',
    title: 'Giải cứu 12 chú chó tại Bình Chánh',
    rescueDate: '12/08/2026',
    location: 'Ấp 4, Xã Vĩnh Lộc B, Huyện Bình Chánh, TP.HCM',
    rescueStory: 'Tiếp nhận thông tin khẩn cấp từ người dân địa phương về đàn chó bị bỏ lại tại khu đất giải tỏa bỏ hoang trong thời tiết mưa bão. Đội cứu hộ Nhà Chung đã khẩn trương đến hiện trường, giải cứu an toàn 12 bé chó trong tình trạng suy dinh dưỡng, viêm da và ướt sũng. Hiện tại các bé đã được sơ cứu, tắm trị liệu và 3 bé Milo, Luna, Bông đã sẵn sàng tìm mái ấm mới!',
    animalCount: 12,
    photos: [
      'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?w=800&auto=format&fit=crop&q=80'
    ],
    coverImage: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=800&auto=format&fit=crop&q=80',
    linkedPetIds: ['pet-1', 'pet-2', 'pet-3'],
    status: 'COMPLETED',
    internalNotes: 'Chi phí cứu hộ và điều trị đợt 1 hết 14.500.000 VNĐ. Có 2 bé cần theo dõi men gan thêm 2 tuần.',
    coordinatorStaffId: 'staff-2',
    coordinatorStaffName: 'Trần Quốc Bảo',
    estimatedCostVND: 14500000
  },
  {
    id: 'case-2',
    organizationId: 'org-1',
    title: 'Tiếp nhận 5 mèo con sơ sinh bị bỏ trong thùng carton tại Quận 1',
    rescueDate: '20/08/2026',
    location: 'Góc đường Nguyễn Du & Pasteur, Phường Bến Nghé, Quận 1, TP.HCM',
    rescueStory: 'Người đi đường phát hiện 1 thùng carton dán kín bên lề đường dưới trời nắng gắt, bên trong có 5 bé mèo chỉ khoảng 3 tuần tuổi còn chưa mở mắt hết. Tình nguyện viên Nhà Chung đã đưa về nuôi bộ bằng sữa chuyên dụng. Bé Bơ và Bé Kem hiện đã ăn hạt ngâm và rất quấn người.',
    animalCount: 5,
    photos: [
      'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?w=800&auto=format&fit=crop&q=80'
    ],
    coverImage: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800&auto=format&fit=crop&q=80',
    linkedPetIds: ['pet-4', 'pet-5'],
    status: 'COMPLETED',
    internalNotes: 'Các bé đã tiêm mũi 1 vắc xin 4 bệnh ngày 28/08/2026.',
    coordinatorStaffId: 'staff-1',
    coordinatorStaffName: 'Nguyễn Minh Anh',
    estimatedCostVND: 4200000
  },
  {
    id: 'case-3',
    organizationId: 'org-2',
    title: 'Cứu trợ chú chó Đậu Đậu bị mắc kẹt trên đê sông Hồng',
    rescueDate: '05/08/2026',
    location: 'Khu vực bãi giữa Sông Hồng, Hoàn Kiếm, Hà Nội',
    rescueStory: 'Đội cứu hộ Paws & Hope phối hợp với người dân thuyền chài để đưa bé Đậu Đậu (chó ta lai 1 tuổi) bị kẹt trong hốc đá khi nước dâng cao. Bé rất ngoan, đã được tiêm vắc xin và triệt sản an toàn.',
    animalCount: 1,
    photos: [
      'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800&auto=format&fit=crop&q=80'
    ],
    coverImage: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800&auto=format&fit=crop&q=80',
    linkedPetIds: ['pet-6'],
    status: 'COMPLETED',
    internalNotes: 'Tình trạng tâm lý ban đầu sợ sệt người lạ, nay đã phục hồi tốt sau 3 tuần chăm sóc tại trạm Paws & Hope.',
    coordinatorStaffId: 'staff-3',
    coordinatorStaffName: 'Lê Thu Hà',
    estimatedCostVND: 3100000
  },
  {
    id: 'case-4',
    organizationId: 'org-3',
    title: 'Chiến dịch chăm sóc mèo con mồ côi bán đảo Sơn Trà',
    rescueDate: '26/08/2026',
    location: 'Chân núi Sơn Trà, TP. Đà Nẵng',
    rescueStory: 'Cứu trợ đàn mèo con bị bỏ rơi gần khu du lịch. Mái Ấm Mèo Nhỏ đang tiếp tục điều trị và chăm sóc dinh dưỡng.',
    animalCount: 4,
    photos: [
      'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=800&auto=format&fit=crop&q=80'
    ],
    coverImage: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=800&auto=format&fit=crop&q=80',
    linkedPetIds: ['pet-7'],
    status: 'ONGOING',
    internalNotes: 'Đang cách ly và điều trị rận tai.',
    coordinatorStaffId: 'staff-5',
    coordinatorStaffName: 'Phạm Hoàng Yến',
    estimatedCostVND: 2500000
  }
];
