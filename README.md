# 🐾 PetCare Hub — Nền tảng Cứu trợ & Nhận nuôi Thú cưng Phi lợi nhuận

> **PetCare Hub** là nền tảng kết nối nhân đạo 100% phi lợi nhuận giữa người nhận nuôi, chủ cứu hộ và mạng lưới các trạm bảo trợ động vật trên toàn quốc. Dự án hướng đến việc loại bỏ nạn buôn bán thú cưng thương mại trá hình, ngăn ngừa tình trạng bỏ rơi, hỗ trợ cứu nạn khẩn cấp và lan tỏa thông điệp yêu thương, bảo vệ động vật.

Dự án được xây dựng theo mô hình **Monorepo Microservices** phân tách độc lập giữa **Frontend (React 19)** và **Backend (API Gateway & Microservices)** nhằm tối ưu hóa hiệu năng, tính module hóa và loại bỏ triệt để xung đột mã nguồn (Git merge conflicts) khi làm việc nhóm.

---

## 🌟 Mục lục

1. [Các Phân Hệ & Chức Năng Chính](#-các-phân-hệ--chức-năng-chính)
   - [1. Tìm kiếm & Nhận nuôi Thú cưng (Adoption Hub)](#1-tìm-kiếm--nhận-nuôi-thú-cưng-adoption-hub)
   - [2. Cứu hộ Khẩn cấp & Hotline 24/7 (Emergency SOS)](#2-cứu-hộ-khẩn-cấp--hotline-247-emergency-sos)
   - [3. Quỹ Lương thực & Tiếp sức Trạm (Supplies & Food Drives)](#3-quỹ-lương-thực--tiếp-sức-trạm-supplies--food-drives)
   - [4. Nhắn tin Real-time & Trợ lý 24/7 (Live Chat & AI Bot)](#4-nhắn-tin-real-time--trợ-lý-247-live-chat--ai-bot)
   - [5. Báo cáo Vi phạm & Giám sát An toàn (Trust & Safety)](#5-báo-cáo-vi-phạm--giám-sát-an-toàn-trust--safety)
   - [6. Không gian Làm việc Người dùng & Admin (Workspaces & Dashboards)](#6-không-gian-làm-việc-người-dùng--admin-workspaces--dashboards)
   - [7. Chiến dịch Cam kết "Nói Không Với Thịt Chó Mèo"](#7-chiến-dịch-cam-kết-nói-không-với-thịt-chó-mèo)
2. [Cấu trúc Thư mục Monorepo](#-cấu-trúc-thư-mục-monorepo)
3. [Kiến trúc Backend Microservices](#-kiến-trúc-backend-microservices)
4. [Hướng dẫn Cài đặt & Khởi chạy](#-hướng-dẫn-cài-đặt--khởi-chạy)
5. [Quy tắc Ngăn ngừa Git Conflict](#-quy-tắc-ngăn-ngừa-git-conflict)

---

## 🚀 Các Phân Hệ & Chức Năng Chính

### 1. Tìm kiếm & Nhận nuôi Thú cưng (Adoption Hub)
- **Khảo sát Nhu cầu & Wizard Nhận nuôi**: Hệ thống câu hỏi gợi ý thông minh giúp người dùng nhanh chóng tìm được bé thú cưng phù hợp với không gian sống, thời gian và kinh nghiệm chăm sóc.
- **Bộ lọc Tìm kiếm Nâng cao**: Lọc linh hoạt theo Giống loài (*Chó, Mèo, Khác như Thỏ/Chuột lang/Chim*), Độ tuổi (*Con, Trưởng thành, Lớn tuổi*), Kích cỡ (*Nhỏ <5kg, Vừa 5-15kg, Lớn >15kg*), Giới tính, Tình trạng sức khỏe (*Đã tiêm phòng, Đã triệt sản*) và Khu vực địa lý.
- **Đăng bài Tìm chủ mới**: Người dùng/Trạm có thể tải lên tối đa 4 hình ảnh (hỗ trợ nút Browse tải ảnh từ máy tính), thông tin sức khỏe, tính cách và câu chuyện của bé.
- **Quy trình Nhận nuôi 5 Bước Chuẩn hóa & Minh bạch**:
  1. **Nộp Hồ sơ Nguyện vọng (Application)**: Người nhận nuôi điền thông tin điều kiện gia đình, nhà ở, thu nhập và cam kết chăm sóc.
  2. **Xét duyệt & Phỏng vấn (Interview & Screening)**: Người đăng tin / Trạm cứu hộ xem xét hồ sơ, trao đổi thêm về kinh nghiệm.
  3. **Đặt Lịch hẹn Gặp mặt (Appointment Scheduling)**: Thống nhất lịch hẹn gặp gỡ trực tiếp để đánh giá độ hòa hợp và tương tác với thú cưng.
  4. **Ký Cam kết Nhận nuôi Phi thương mại (Adoption Commitment)**: Ràng buộc trách nhiệm không bán lại, không ngược đãi, không thả rông và tuân thủ phúc lợi động vật.
  5. **Bàn giao & Check-in Định kỳ (Post-Adoption Tracking)**: Cập nhật hình ảnh, video và sổ khám sức khỏe định kỳ sau nhận nuôi.

---

### 2. Cứu hộ Khẩn cấp & Hotline 24/7 (Emergency SOS)
- **Danh bạ Trạm Cứu hộ Toàn quốc**: Tra cứu tức thì số điện thoại đường dây nóng 24/7, giờ mở cửa, năng lực tiếp nhận, địa chỉ chính xác và bản đồ Google Maps chỉ đường đến các trạm cứu trợ tại TP.HCM, Hà Nội, Đà Nẵng, Cần Thơ,...
- **Báo cáo SOS Hiện trường Siêu tốc (Rapid Street SOS)**: Cho phép người dân phát hiện thú cưng bị tai nạn hoặc bị bỏ rơi ngoài đường tải ảnh chụp, vị trí định vị, loại sự cố và gửi điều phối khẩn cấp đến trạm gần nhất.
- **Cẩm nang Sơ cứu Tại chỗ**: Quy tắc vàng xử lý các trường hợp sốc nhiệt, gãy xương, xuất huyết hoặc ngộ độc trước khi đưa đến cơ sở thú y.

---

### 3. Quỹ Lương thực & Tiếp sức Trạm (Supplies & Food Drives)
- **Thống kê Đợt Quyên góp của Trạm**: Theo dõi các vật phẩm trạm đã nhận theo từng mốc thời gian (*1 tháng, 2 tháng,...*) và theo **Quy mô của từng trạm cứu hộ**.
- **Quản lý Nhu yếu phẩm Thiết yếu**:
  - Thực phẩm & Dinh dưỡng (*Hạt, Pate, Sữa dinh dưỡng ~kg*).
  - Y tế & Chăm sóc (*Thuốc sát trùng, Kháng viêm, Tẩy giun, Vaccine*).
  - Vật dụng sinh hoạt (*Chuồng lưu trú, Đệm nằm, Khay vệ sinh, Cát vệ sinh*).
- **Minh bạch & An toàn Hiện vật**: Hỗ trợ cơ chế gửi hàng qua Shipper hoặc trao tặng tận nơi; tự động hiển thị thông báo đẩy 10 giây khuyến khích **quyên góp bằng vật chất/nhu yếu phẩm thay vì tiền mặt** để tránh trục lợi.

---

### 4. Nhắn tin Real-time & Trợ lý 24/7 (Live Chat & AI Bot)
- **Trợ lý AI Cứu hộ 24/7**: Giải đáp tự động mọi thắc mắc về điều kiện nhận nuôi, cách ly thú cưng mới, hướng dẫn sơ cứu khẩn cấp và thông tin về các trạm bảo trợ.
- **Trò chuyện Cộng đồng P2P (User-to-User Messaging)**: Tích hợp nút *"Nhắn tin cho người đăng"* ngay trên trang chi tiết thú cưng và bài đăng cứu hộ, mở ngay đoạn chat trực tiếp giữa người nhận nuôi và chủ nuôi.
- **Kênh Hỗ trợ Trực tuyến với Admin**: Người dùng có thể gửi tin nhắn hỗ trợ trực tiếp đến đội ngũ Quản trị viên khi cần khiếu nại hoặc hỗ trợ kỹ thuật.
- **Tối ưu hóa Giao tiếp**: Tinh gọn giao diện chat tập trung vào tin nhắn văn bản và hình ảnh xác thực.

---

### 5. Báo cáo Vi phạm & Giám sát An toàn (Trust & Safety)
- **Báo cáo Tài khoản & Bài đăng**: Người dùng có thể gắn cờ vi phạm (mua bán trá hình, lừa tiền cọc, ngược đãi, thông tin sai lệch) kèm **hình ảnh minh chứng** và mô tả chi tiết sự việc.
- **Xác thực Danh tính (Identity Verification)**: Hệ thống xác thực số điện thoại và thông tin cá nhân của người đăng tin để bảo vệ cộng đồng khỏi các hành vi lừa đảo.

---

### 6. Không gian Làm việc Người dùng & Admin (Workspaces & Dashboards)

#### 🧑‍💻 Không gian Người dùng (User Workspace):
- **Bảng điều khiển cá nhân (Dashboard)**: Thống kê nhanh số thú cưng đã đăng, đơn nhận nuôi đang xử lý, lịch hẹn sắp tới.
- **Quản lý Bài đăng (My Pet Posts / My Rescue Posts)**: Tạo mới, cập nhật trạng thái (*Chờ duyệt, Đang tìm chủ, Đã có chủ*), quản lý tối đa 4 hình ảnh/bài.
- **Quản lý Đơn & Lịch hẹn**: Xem chi tiết đơn gửi đi và đơn nhận được cho các bé cưng của mình, phê duyệt/từ chối đơn, tạo lịch hẹn gặp mặt.
- **Cam kết & Nhật ký Check-in**: Ký cam kết số và đăng tải hình ảnh cập nhật sức khỏe định kỳ của thú cưng sau khi về nhà mới.

#### 🛡️ Cổng Quản trị Hệ thống (Admin Portal):
- **Dashboard Thống kê**: Giao diện sáng rõ, hiển thị biểu đồ phễu tăng trưởng, phân bố nhận nuôi theo khu vực và hiệu suất cứu trợ.
- **Kiểm duyệt Bài đăng Thú cưng & Cứu trợ**:
  - Giao diện xem chi tiết bài đăng của Admin đồng bộ, đầy đủ thông tin như người dùng.
  - **Bắt buộc nhập lý do từ chối** khi bấm *Decline* để gửi phản hồi rõ ràng về cho người đăng bài.
- **Quản lý Báo cáo Vi phạm**: Tiếp nhận các tố cáo tài khoản/bài đăng kèm hình ảnh bằng chứng thực tế, tiến hành khóa tài khoản hoặc gỡ bài vi phạm.
- **Nhật ký Hệ thống (Audit Logs)**: Ghi lại đầy đủ thông tin **tài khoản Admin nào đã trực tiếp xử lý log/bài đăng nào** để đảm bảo tính minh bạch và truy vết nội bộ.

---

### 7. Chiến dịch Cam kết "Nói Không Với Thịt Chó Mèo"
- Trang thông tin tuyên truyền giáo dục cộng đồng về phúc lợi động vật, chống trộm cắp thú cưng và phòng ngừa bệnh dại.
- Bộ đếm chữ ký cam kết tương tác thời gian thực (*Live Pledge Counter*) khuyến khích mọi người cùng chung tay lan tỏa lối sống nhân ái.

---

## 📁 Cấu trúc Thư mục Monorepo

```
PetcareHub/
│
├── frontend/                       # 🌐 CLIENT FRONTEND APPLICATION
│   ├── public/                     # Logo, favicon, tài nguyên tĩnh
│   ├── src/
│   │   ├── assets/                 # Hình ảnh, SVG icons
│   │   ├── components/             # UI Components tái sử dụng (Chat, Modals, Layout, Rescue, User)
│   │   ├── context/                # React Contexts (Auth, Data, Language, Theme)
│   │   ├── data/                   # Mock Data & Khởi tạo dữ liệu mẫu
│   │   ├── locales/                # Đa ngôn ngữ (Tiếng Việt `vi.ts`, Tiếng Anh `en.ts`)
│   │   ├── pages/                  # Public Pages, User Workspace & Admin Portal Pages
│   │   ├── types/                  # Types & Interfaces định nghĩa phía client
│   │   ├── utils/                  # Helper format tiền tệ, dịch địa chỉ, tính ngày
│   │   ├── App.tsx                 # Root Component & Điều hướng Routing
│   │   ├── main.tsx                # Entrypoint Client
│   │   └── index.css               # Tailwind CSS & Global Styling
│   ├── package.json                # @petcare-hub/frontend
│   ├── vite.config.ts              # Vite & Rolldown Bundler config
│   ├── tailwind.config.js          # Tailwind CSS theme & color palette
│   └── tsconfig.json
│
├── backend/                        # ⚙️ BACKEND MICROSERVICES SYSTEM
│   ├── api-gateway/                # Reverse Proxy tập trung điều hướng (Port 8000)
│   │   ├── src/server.js
│   │   ├── Dockerfile
│   │   └── package.json
│   ├── services/
│   │   ├── auth-service/           # User Auth, JWT & RBAC Roles (Port 8001)
│   │   ├── pet-service/            # Pet Listings & Adoption Process (Port 8002)
│   │   ├── rescue-service/         # SOS Hotlines, Shelters & Supplies (Port 8003)
│   │   └── chat-service/           # WebSocket Real-time Chat (Port 8004)
│   ├── docker-compose.yml          # Container Orchestration (Postgres, Mongo, Redis, Services)
│   └── README.md
│
├── packages/                       # 📦 SHARED PACKAGES
│   └── shared/                     # Types, Models & DTOs dùng chung (@petcare-hub/shared)
│       ├── src/types/
│       │   ├── pet.ts, rescue.ts, user.ts, shelter.ts, chat.ts, application.ts,...
│       └── src/index.ts
│
├── docs/                           # 📚 TÀI LIỆU DỰ ÁN
│   └── architecture.md             # Sơ đồ thiết kế hệ thống & Quy chuẩn API
├── .github/workflows/deploy.yml    # CI/CD GitHub Actions Deploy Frontend lên GitHub Pages
├── package.json                    # Monorepo Workspaces Orchestrator
└── .gitignore
```

---

## ⚙️ Kiến trúc Backend Microservices

```
                  +-----------------------------------+
                  |   Frontend (React + Vite + TS)    |
                  +-----------------------------------+
                                    | HTTP / REST / WS
                                    v
                  +-----------------------------------+
                  |        API Gateway (:8000)        |
                  +-----------------------------------+
                   /          |             |        \
                  /           |             |         \
                 v            v             v          v
          +------------+ +------------+ +------------+ +------------+
          |    Auth    | |    Pet     | |   Rescue   | |    Chat    |
          |  Service   | |  Service   | |  Service   | |  Service   |
          |   :8001    | |   :8002    | |   :8003    | |   :8004    |
          +------------+ +------------+ +------------+ +------------+
                |              |              |              |
                v              v              v              v
          [ PostgreSQL ] [ PostgreSQL ] [ PostgreSQL ] [Redis/Mongo]
```

---

## 🛠️ Hướng dẫn Cài đặt & Khởi chạy

### 1. Yêu cầu Hệ thống:
- **Node.js**: Phiên bản 18 trở lên (Khuyến nghị Node.js 20 LTS)
- **npm**: Phiên bản 9 trở lên
- **Docker & Docker Compose** *(nếu chạy cụm Microservices & Databases)*

### 2. Cài đặt Dependencies:
Tại thư mục gốc của dự án:
```bash
npm install
```

### 3. Khởi chạy Môi trường Phát triển (Frontend):
```bash
# Lệnh khởi chạy từ root:
npm run dev

# Hoặc chạy trực tiếp gói frontend:
npm run dev:frontend
```
> Ứng dụng web sẽ chạy tại: **`http://localhost:5173/petcare-hub/`**

### 4. Đóng gói Bản Production (Build Frontend):
```bash
npm run build
```

### 5. Khởi chạy Toàn bộ Backend Microservices & Databases (Docker):
```bash
cd backend
docker compose up --build
```

---

## 🛡️ Quy tắc Ngăn ngừa Git Conflict

1. **Phân định rõ khu vực code (Strict Boundary)**:
   - Thành viên phụ trách UI/UX chỉ làm việc bên trong thư mục `frontend/`.
   - Thành viên phụ trách Backend chỉ làm việc trong `backend/services/<tên-service>/`.
2. **Kiểu dữ liệu DTO/Type tập trung**:
   - Khi có thay đổi cấu trúc dữ liệu hoặc Model mới, thực hiện cập nhật tại `packages/shared/` để cả Frontend và Backend đều tái sử dụng đồng bộ.
3. **Quy trình Phân nhánh Git (Branching Workflow)**:
   - Tạo nhánh theo chức năng: `feature/fe-<ten-tinh-nang>` hoặc `feature/be-<ten-service>`.
   - Không commit trực tiếp vào `main`. Luôn tạo Pull Request (PR) để review trước khi merge.
