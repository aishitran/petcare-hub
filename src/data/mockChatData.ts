import { QuickPrompt, UserConversation, ChatMessage } from '../types/chat';

export const mockQuickPrompts: QuickPrompt[] = [
  {
    id: 'qp-adoption',
    titleVi: '📋 Quy trình nộp đơn nhận nuôi',
    titleEn: '📋 How to apply for adoption',
    promptVi: 'Tôi muốn tìm hiểu quy trình nộp đơn nhận nuôi một bé thú cưng?',
    promptEn: 'Can you guide me through the 4-step adoption process?',
    responseVi: `Dạ chào bạn! Quy trình nhận nuôi tại PetCare Hub gồm 4 bước tiêu chuẩn:
1. 📝 **Gửi đơn khảo sát 6 bước**: Điền thông tin về môi trường sống, thời gian và kinh nghiệm chăm sóc.
2. 📞 **Trao đổi & Phỏng vấn**: Người bảo trợ sẽ liên hệ trao đổi chi tiết để đảm bảo tương thích.
3. 📜 **Ký cam kết KHÔNG TRỤC LỢI**: Cam kết nuôi dưỡng trọn đời, không bán lại, không nuôi sinh sản thương mại.
4. 📸 **Cập nhật Check-in định kỳ**: Gửi hình ảnh bé định kỳ (1 tuần, 1 tháng, 3 tháng) sau khi đón về nhà.

Bạn có thể bấm vào nút **"Tìm bạn bốn chân"** trên trang chủ hoặc mục **"Tìm thú cưng"** để chọn bé phù hợp nha!`,
    responseEn: `Hello! PetCare Hub adoption workflow consists of 4 standardized steps:
1. 📝 **Submit 6-step survey**: Provide info on living space, schedule, and care experience.
2. 📞 **Interview**: The fosterer/shelter contacts you directly to verify compatibility.
3. 📜 **Sign NO-PROFITEERING Pledge**: Strict commitment for lifelong care, zero commercial breeding/reselling.
4. 📸 **Periodic Check-ins**: Upload pet health updates (1 week, 1 month, 3 months).

Explore available pets in the **"Find Pets"** menu to find your ideal companion!`
  },
  {
    id: 'qp-rescue-sos',
    titleVi: '🚨 Cứu hộ khẩn cấp ngoài đường',
    titleEn: '🚨 Emergency street rescue SOS',
    promptVi: 'Tôi vừa thấy một bé chó/mèo bị tai nạn trên đường, tôi cần làm gì gấp?',
    promptEn: 'I just found an injured pet on the street, what should I do immediately?',
    actionType: 'OPEN_DIRECTORY',
    responseVi: `🚨 **HƯỚNG DẪN CỨU HỘ KHẨN CẤP:**
1. **An toàn hiện trường**: Dừng xe an toàn, không đứng giữa làn xe chạy.
2. **Gọi Hotline trực 24/7**:
   - TP.HCM: 📞 **0938 521 115** (Trạm Sài Gòn Time)
   - Hà Nội: 📞 **0983 611 043** (Trạm CPAP)
   - Đà Nẵng: 📞 **0935 888 999**
   - Cần Thơ: 📞 **0949 111 222**
3. **Báo tin SOS**: Bấm vào nút **"Hotline Cứu hộ 24/7"** trên thanh Header hoặc nút **"Báo tin cứu hộ ngoài đường (SOS)"** để gửi định vị kèm hình ảnh cho tình nguyện viên gần nhất điều phối xe đón!`,
    responseEn: `🚨 **EMERGENCY RESCUE ACTION GUIDE:**
1. **Scene Safety**: Ensure personal safety first away from fast traffic.
2. **Call 24/7 Emergency Hotlines**:
   - HCMC: 📞 **0938 521 115** (Saigon Time Shelter)
   - Hanoi: 📞 **0983 611 043** (CPAP Rescue)
   - Danang: 📞 **0935 888 999**
   - Can Tho: 📞 **0949 111 222**
3. **Broadcast SOS**: Click **"Emergency SOS 24/7"** on the Header or **"Report Street Incident (SOS)"** to broadcast real-time location and photos to nearby rescue dispatchers!`
  },
  {
    id: 'qp-food-fund',
    titleVi: '🍲 Quỹ Tiếp Sức Hạt hoạt động thế nào?',
    titleEn: '🍲 How Food Power Fund works',
    promptVi: 'Quỹ tiếp sức hạt thức ăn hoạt động thế nào và có minh bạch không?',
    promptEn: 'How does the Food Power Fund operate and ensure transparency?',
    actionType: 'OPEN_FOOD_DONATION',
    responseVi: `🍲 **QUỸ TIẾP SỨC HẠT PETCARE HUB:**
- 100% đóng góp được quy đổi thành **bao thức ăn hạt, pate dinh dưỡng và vật tư y tế** trao tận tay các trạm cứu hộ phi lợi nhuận.
- **Minh bạch & Phi lợi nhuận**: PetCare Hub chỉ đóng vai trò trung gian kết nối, không giữ quỹ và cập nhật trực tiếp tiến độ % theo thời gian thực.
- Bạn có thể đóng góp theo từng gói (50k, 150k, 300k, 500k...) hoặc nhập số tiền tùy tâm tại khu vực **"Tiếp Sức Hạt"** trên trang chủ và trang Cứu trợ.`,
    responseEn: `🍲 **PETCARE HUB FOOD POWER FUND:**
- 100% of contributions are directly converted into **kibble bags, wet food, and clinical nutrition** delivered to non-profit shelters.
- **Transparent & Non-Profit**: PetCare Hub acts solely as a connecting bridge, charging 0% platform fees with real-time % progress tracking.
- You can contribute via preset packages ($2, $5, $10...) or custom amounts directly in the **"Food Power"** section on the Home and Rescue pages.`
  },
  {
    id: 'qp-non-profit',
    titleVi: '🛡️ Cam kết "Không trục lợi" là gì?',
    titleEn: '🛡️ What is the "No-Profiteering" pledge?',
    promptVi: 'Cam kết "Không trục lợi" trên PetCare Hub có những điều khoản gì?',
    promptEn: 'What does the "No-Profiteering" welfare commitment include?',
    responseVi: `🛡️ **TIÊU CHUẨN KHÔNG TRỤC LỢI (NO PROFITEERING):**
- **Không buôn bán / chuyển nhượng thương mại**: Thú cưng là thành viên gia đình, tuyệt đối không mua bán kiếm lời.
- **Không nhân giống kinh doanh**: Cam kết triệt sản đúng độ tuổi để bảo vệ sức khỏe và kiểm soát số lượng thú vô gia cư.
- **Minh bạch tài chính**: Mọi chi phí viện phí cứu trợ đều có hóa đơn phòng khám xác thực.
- **Trách nhiệm trọn đời**: Không bỏ rơi, luôn cung cấp môi trường sống an toàn và tiêm phòng đầy đủ.`,
    responseEn: `🛡️ **NO-PROFITEERING WELFARE CRITERIA:**
- **Zero Commercial Reselling**: Pets are family members, never commercial goods.
- **Zero Commercial Breeding**: Mandatory neutering at suitable age to prevent homelessness.
- **Financial Transparency**: All rescue medical bills require verified clinical invoices.
- **Lifelong Responsibility**: Never abandon, provide safe indoor living and full periodic vaccinations.`
  }
];

export const mockUserConversations: UserConversation[] = [
  {
    id: 'conv-1',
    targetUserId: 'user-2',
    targetUserName: 'Lê Thu Thảo',
    targetUserAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80',
    targetUserRole: 'Trưởng Trạm Cứu Hộ & Fosterer',
    targetPetName: 'Bé Miu Vàng (Mèo con 3 tháng)',
    targetPetAvatar: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=200',
    targetPetBreed: 'Mèo Mướp Vàng',
    isOnline: true,
    lastMessage: 'Dạ bé Miu Vàng đã hoàn thành tiêm phòng mũi 2 rồi ạ, bạn có thể ghé trạm thăm bé vào chiều Thứ 7 này nhé! 🐱',
    lastMessageTime: '10:30',
    unreadCount: 1,
    messages: [
      {
        id: 'msg-1-1',
        senderId: 'user-1',
        sender: 'USER',
        text: 'Chào bạn Thảo, mình vừa xem hồ sơ của bé Miu Vàng trên PetCare Hub. Cho mình hỏi bé đã tiêm ngừa và ăn hạt cứng được chưa ạ?',
        timestamp: '10:15',
        senderName: 'Bạn'
      },
      {
        id: 'msg-1-2',
        senderId: 'user-2',
        sender: 'OTHER_USER',
        text: 'Dạ chào bạn! Bé Miu Vàng hiện đã ăn hạt ngâm và hạt khô rất khỏe mạnh, tính cách quấn người lắm ạ.',
        timestamp: '10:20',
        senderName: 'Lê Thu Thảo'
      },
      {
        id: 'msg-1-3',
        senderId: 'user-2',
        sender: 'OTHER_USER',
        text: 'Dạ bé Miu Vàng đã hoàn thành tiêm phòng mũi 2 rồi ạ, bạn có thể ghé trạm thăm bé vào chiều Thứ 7 này nhé! 🐱',
        timestamp: '10:30',
        senderName: 'Lê Thu Thảo'
      }
    ]
  },
  {
    id: 'conv-2',
    targetUserId: 'user-3',
    targetUserName: 'Trần Văn Nam',
    targetUserAvatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=200&auto=format&fit=crop&q=80',
    targetUserRole: 'Tình nguyện viên Cứu hộ SOS',
    targetPetName: 'Cún Bơ (Ca cấp cứu gãy xương)',
    targetPetAvatar: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=200',
    targetPetBreed: 'Chó Cỏ Lai',
    isOnline: true,
    lastMessage: 'Cảm ơn bạn đã gửi 5kg hạt dinh dưỡng tiếp sức cho bé Bơ nhé! Hiện bé đã tập đi lại được rồi. 🐾',
    lastMessageTime: 'Hôm qua',
    unreadCount: 0,
    messages: [
      {
        id: 'msg-2-1',
        senderId: 'user-3',
        sender: 'OTHER_USER',
        text: 'Chào bạn, mình là Nam bên đội tình nguyện tiếp nhận ca cứu hộ Cún Bơ.',
        timestamp: 'Hôm qua 14:00',
        senderName: 'Trần Văn Nam'
      },
      {
        id: 'msg-2-2',
        senderId: 'user-1',
        sender: 'USER',
        text: 'Chào Nam, mình có gửi ủng hộ gói hạt phục hồi cho bé qua Quỹ Tiếp Sức Hạt rồi nhé!',
        timestamp: 'Hôm qua 14:15',
        senderName: 'Bạn'
      },
      {
        id: 'msg-2-3',
        senderId: 'user-3',
        sender: 'OTHER_USER',
        text: 'Cảm ơn bạn đã gửi 5kg hạt dinh dưỡng tiếp sức cho bé Bơ nhé! Hiện bé đã tập đi lại được rồi. 🐾',
        timestamp: 'Hôm qua 14:20',
        senderName: 'Trần Văn Nam'
      }
    ]
  },
  {
    id: 'conv-3',
    targetUserId: 'user-4',
    targetUserName: 'Nguyễn Hoàng Long',
    targetUserAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    targetUserRole: 'Người nuôi tạm (Fosterer Hà Nội)',
    targetPetName: 'Bé Mochi (Chó Poodle cứu hộ)',
    targetPetAvatar: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=200',
    targetPetBreed: 'Poodle Lai',
    isOnline: false,
    lastMessage: 'Hồ sơ nhận nuôi của bạn đã được duyệt. Bạn có thể ghé trao đổi hợp đồng cam kết nhé!',
    lastMessageTime: '2 ngày trước',
    unreadCount: 0,
    messages: [
      {
        id: 'msg-3-1',
        senderId: 'user-4',
        sender: 'OTHER_USER',
        text: 'Chào bạn! Mình đã đọc qua bản khảo sát 6 bước nhận nuôi bé Mochi của bạn.',
        timestamp: '2 ngày trước',
        senderName: 'Nguyễn Hoàng Long'
      },
      {
        id: 'msg-3-2',
        senderId: 'user-4',
        sender: 'OTHER_USER',
        text: 'Hồ sơ nhận nuôi của bạn đã được duyệt. Bạn có thể ghé trao đổi hợp đồng cam kết nhé!',
        timestamp: '2 ngày trước',
        senderName: 'Nguyễn Hoàng Long'
      }
    ]
  }
];

export const getSmartChatResponse = (userText: string, lang: 'vi' | 'en'): string => {
  const query = userText.toLowerCase();

  if (lang === 'en') {
    if (query.includes('adopt') || query.includes('how to') || query.includes('process') || query.includes('step') || query.includes('form')) {
      return `🐾 To adopt a pet on PetCare Hub, simply go to the **Find Pets** page, click on any furry friend you love, and press **"Apply for Adoption"**. You will complete a brief 6-step survey and our team will coordinate an interview within 24-48 hours!`;
    }
    if (query.includes('emergency') || query.includes('rescue') || query.includes('street') || query.includes('injured') || query.includes('hit') || query.includes('hotline')) {
      return `🚨 **Emergency Hotline 24/7**: You can immediately call our national rescue shelters at **0938 521 115** (HCMC) or **0983 611 043** (Hanoi). Or click the red **"Emergency SOS 24/7"** button in the header to view verified station addresses and directions!`;
    }
    if (query.includes('food') || query.includes('donate') || query.includes('fund') || query.includes('kibble')) {
      return `🍲 You can support our shelter meals via the **Food Power Fund** on the Homepage or Rescue page. Every contribution goes 100% towards purchasing nutritious food packages for shelter animals!`;
    }
    if (query.includes('hello') || query.includes('hi') || query.includes('hey') || query.includes('good')) {
      return `Hello! 😊 How can I assist you with pet adoption, 24/7 emergency rescue stations, or welfare guidance today?`;
    }
    return `Thank you for your message! 🐾 Our PetCare community specialist has noted your request. If this is an urgent animal emergency on the street, please call our 24/7 hotline at **0938 521 115** (HCMC) or **0983 611 043** (Hanoi) for immediate dispatch!`;
  }

  // Vietnamese responses
  if (query.includes('nhận nuôi') || query.includes('đơn') || query.includes('quy trình') || query.includes('thủ tục') || query.includes('bước')) {
    return `🐾 Để nhận nuôi một bé thú cưng tại PetCare Hub, bạn chỉ cần vào mục **"Tìm thú cưng"**, bấm vào hồ sơ bé bạn yêu mến và chọn **"Gửi đơn nhận nuôi"**. Sau khi điền mẫu khảo sát 6 bước, người bảo trợ sẽ liên hệ phỏng vấn bạn trong vòng 24 - 48 giờ nhé!`;
  }
  if (query.includes('cứu hộ') || query.includes('cấp cứu') || query.includes('tai nạn') || query.includes('bị thương') || query.includes('đường') || query.includes('hotline') || query.includes('trạm')) {
    return `🚨 **Đường dây nóng Cứu hộ 24/7**: Bạn có thể gọi ngay **0938 521 115** (TP.HCM - Trạm Sài Gòn Time) hoặc **0983 611 043** (Hà Nội - Trạm CPAP). Bạn cũng có thể bấm nút **"Hotline Cứu hộ 24/7"** trên thanh Menu để tra cứu địa chỉ trạm gần nhất và xem hướng dẫn sơ cứu nhé!`;
  }
  if (query.includes('hạt') || query.includes('tiếp sức') || query.includes('ăn') || query.includes('quyên góp') || query.includes('donate') || query.includes('quỹ')) {
    return `🍲 Bạn có thể đồng hành cùng Quỹ Tiếp Sức Hạt trên Trang chủ hoặc Trang Cứu trợ. 100% khoản đóng góp được quy đổi thành hạt và dinh dưỡng chuyển tận tay các trạm cứu hộ động vật khó khăn!`;
  }
  if (query.includes('chào') || query.includes('alo') || query.includes('hi') || query.includes('hello')) {
    return `Dạ PetCare Hub xin chào bạn! 😊 Bạn đang quan tâm đến việc nhận nuôi bé cún/mèo, cần tra cứu trạm cứu hộ khẩn cấp hay cần hỗ trợ thông tin gì ạ?`;
  }
  return `Cảm ơn tin nhắn của bạn! 🐾 Chuyên viên tư vấn PetCare Hub đã tiếp nhận yêu cầu. Nếu bạn đang gặp trường hợp thú cưng bị nạn khẩn cấp ngoài đường, vui lòng gọi ngay hotline **0938 521 115** (TP.HCM) hoặc **0983 611 043** (Hà Nội) để được đội cứu hộ hỗ trợ kịp thời nhé!`;
};

export const getUserSimulatedReply = (targetUserName: string, userText: string, lang: 'vi' | 'en'): string => {
  const query = userText.toLowerCase();

  if (lang === 'en') {
    if (query.includes('visit') || query.includes('meet') || query.includes('see') || query.includes('time') || query.includes('when')) {
      return `Hello! You are welcome to visit our shelter to meet the pet this weekend between 2 PM and 5 PM. Please let us know in advance so we can prepare! 🐾`;
    }
    if (query.includes('health') || query.includes('vaccin') || query.includes('shot') || query.includes('food')) {
      return `The pet is currently healthy, eating well, and has completed initial vaccinations and deworming. We have full medical records ready for you!`;
    }
    if (query.includes('thank') || query.includes('ok') || query.includes('great')) {
      return `You are very welcome! Feel free to message me anytime if you have questions about the pet or adoption steps! ❤️`;
    }
    return `Hi! Thank you for reaching out regarding the pet. I received your message: "${userText}". I will check our schedule and reply to you with detailed photos shortly!`;
  }

  // Vietnamese
  if (query.includes('thăm') || query.includes('gặp') || query.includes('khi nào') || query.includes('mấy giờ') || query.includes('địa chỉ') || query.includes('ở đâu')) {
    return `Dạ bạn có thể ghé thăm bé vào chiều Thứ 7 hoặc Chủ nhật tuần này (từ 14h - 17h) tại trạm nhé. Trước khi qua bạn nhắn trước 30 phút để bên mình đón nha! 🐶🐱`;
  }
  if (query.includes('sức khỏe') || query.includes('tiêm') || query.includes('chích') || query.includes('bệnh') || query.includes('ăn')) {
    return `Dạ bé hiện tại sức khỏe rất tốt, ăn uống khỏe và đã được tiêm phòng + tẩy giun đầy đủ theo sổ y bạ của phòng khám thú y liên kết ạ.`;
  }
  if (query.includes('cảm ơn') || query.includes('dạ') || query.includes('ok') || query.includes('vâng')) {
    return `Dạ không có gì ạ! Bạn cứ nhắn cho mình bất cứ khi nào cần thêm hình ảnh hoặc video mới của bé nha! ❤️🐾`;
  }
  return `Chào bạn! Mình là ${targetUserName}. Mình đã nhận được tin nhắn của bạn. Mình sẽ kiểm tra và gửi thêm thông tin chi tiết của bé cho bạn ngay nhé!`;
};
