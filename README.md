# PetCare Hub — Nền tảng Cứu trợ & Nhận nuôi Thú cưng

> **PetCare Hub** là nền tảng kết nối giữa người nhận nuôi, chủ cứu hộ và mạng lưới các trạm bảo trợ động vật trên toàn quốc. Dự án hướng đến việc hỗ trợ cứu nạn khẩn cấp, minh bạch hóa quy trình nhận nuôi, kết nối nguồn lực tiếp sức trạm cứu hộ và nâng cao nhận thức bảo vệ động vật.

Dự án sử dụng cấu trúc **Monorepo Microservices**, phân tách rõ ràng giữa **Frontend (React 19)** và **Backend (API Gateway & Microservices)**.

---

## Mục lục

1. [Các Phân hệ & Chức năng Chính](#các-phân-hệ--chức-năng-chính)
   - [1. Tìm kiếm & Nhận nuôi Thú cưng (Adoption Hub)](#1-tìm-kiếm--nhận-nuôi-thú-cưng-adoption-hub)
   - [2. Cứu hộ Khẩn cấp & Hotline 24/7 (Emergency SOS)](#2-cứu-hộ-khẩn-cấp--hotline-247-emergency-sos)
   - [3. Tiếp sức Trạm Cứu hộ & Quỹ Lương thực (Supplies & Food Drives)](#3-tiếp-sức-trạm-cứu-hộ--quỹ-lương-thực-supplies--food-drives)
   - [4. Nhắn tin Trực tuyến & Trợ lý Hỗ trợ (Live Chat & AI Assistant)](#4-nhắn-tin-trực-tuyến--trợ-lý-hỗ-trợ-live-chat--ai-assistant)
   - [5. Báo cáo Vi phạm & Kiểm duyệt Nội dung (Trust & Safety)](#5-báo-cáo-vi-phạm--kiểm-duyệt-nội-dung-trust--safety)
   - [6. Không gian Làm việc Người dùng & Quản trị (Workspaces & Dashboards)](#6-không-gian-làm-việc-người-dùng--quản-trị-workspaces--dashboards)
   - [7. Chiến dịch Cam kết "Nói Không Với Thịt Chó Mèo"](#7-chiến-dịch-cam-kết-nói-không-với-thịt-chó-mèo)
2. [Cấu trúc Thư mục Monorepo](#cấu-trúc-thư-mục-monorepo)
3. [Kiến trúc Backend Microservices](#kiến-trúc-backend-microservices)
4. [Hướng dẫn Cài đặt & Khởi chạy](#hướng-dẫn-cài-đặt--khởi-chạy)

---

## Các Phân hệ & Chức năng Chính

### 1. Tìm kiếm & Nhận nuôi Thú cưng (Adoption Hub)
- **Khảo sát Nhu cầu & Hướng dẫn Nhận nuôi**: Hệ thống câu hỏi gợi ý giúp người dùng nhanh chóng tìm được thú cưng phù hợp với không gian sống, thời gian và kinh nghiệm chăm sóc.
- **Bộ lọc Tìm kiếm Nâng cao**: Lọc theo Giống loài (*Chó, Mèo, Khác như Thỏ, Chuột lang, Chim*), Độ tuổi (*Con, Trưởng thành, Lớn tuổi*), Kích cỡ (*Nhỏ <5kg, Vừa 5-15kg, Lớn >15kg*), Giới tính, Tình trạng sức khỏe (*Đã tiêm phòng, Đã triệt sản*) và Khu vực địa lý.
- **Đăng bài Tìm chủ mới**: Cho phép tải lên tối đa 4 hình ảnh (hỗ trợ nút Browse ảnh từ thiết bị), thông tin sức khỏe, tính cách và câu chuyện của thú cưng.
- **Quy trình Nhận nuôi 5 Bước Chuẩn hóa**:
  1. **Nộp Hồ sơ Nguyện vọng (Application)**: Người nhận nuôi cung cấp thông tin điều kiện sống, nhà ở, thu nhập và thời gian chăm sóc.
  2. **Xét duyệt & Phỏng vấn (Interview & Screening)**: Người đăng tin / Trạm cứu hộ xem xét hồ sơ và trao đổi chi tiết.
  3. **Đặt Lịch hẹn Gặp mặt (Appointment Scheduling)**: Thống nhất lịch hẹn gặp trực tiếp để đánh giá độ hòa hợp và tương tác.
  4. **Ký Cam kết Nhận nuôi (Adoption Commitment)**: Ràng buộc trách nhiệm không bán lại, không ngược đãi, không thả rông và tuân thủ các quy tắc an toàn.
  5. **Bàn giao & Check-in Định kỳ (Post-Adoption Tracking)**: Cập nhật hình ảnh và tình trạng sức khỏe định kỳ của thú cưng sau khi về nhà mới.

---

### 2. Cứu hộ Khẩn cấp & Hotline 24/7 (Emergency SOS)
- **Danh bạ Trạm Cứu hộ Toàn quốc**: Tra cứu số điện thoại hotline 24/7, giờ hoạt động, địa chỉ và bản đồ chỉ đường đến các trạm cứu hộ tại TP.HCM, Hà Nội, Đà Nẵng, Cần Thơ,...
- **Báo cáo SOS Hiện trường Siêu tốc (Rapid Street SOS)**: Cho phép người phát hiện thú cưng bị tai nạn hoặc bỏ rơi ngoài đường tải ảnh chụp hiện trường, vị trí và gửi thông tin điều phối đến trạm cứu hộ gần nhất.
- **Cẩm nang Sơ cứu Tại chỗ**: Hướng dẫn xử lý các tình huống khẩn cấp như sốc nhiệt, gãy xương, xuất huyết hoặc ngộ độc trước khi tiếp cận cơ sở thú y.

---

### 3. Tiếp sức Trạm Cứu hộ & Quỹ Lương thực (Supplies & Food Drives)
- **Thống kê Đợt Quyên góp của Trạm**: Theo dõi các vật phẩm trạm đã tiếp nhận theo từng khoảng thời gian (*1 tháng, 2 tháng,...*) và theo **Quy mô của từng trạm cứu hộ**.
- **Quản lý Nhu yếu phẩm Cần hỗ trợ**:
  - Thực phẩm (*Hạt khô, Pate, Sữa dinh dưỡng ~kg*).
  - Vật tư y tế (*Thuốc sát trùng, Kháng viêm, Tẩy giun, Vaccine*).
  - Đồ dùng chăm sóc (*Chuồng lưu trú, Đệm nằm, Khay vệ sinh, Cát vệ sinh*).
- **Minh bạch Hiện vật**: Hỗ trợ gửi hàng qua đơn vị vận chuyển hoặc trao tặng trực tiếp tại trạm; tích hợp thông báo đẩy 10 giây khuyến khích quyên góp bằng vật chất/nhu yếu phẩm thay vì tiền mặt.

---

### 4. Nhắn tin Trực tuyến & Trợ lý Hỗ trợ (Live Chat & AI Assistant)
- **Trợ lý AI Cứu hộ 24/7**: Tự động giải đáp các thắc mắc thường gặp về quy trình nhận nuôi, cách ly thú cưng mới, hướng dẫn sơ cứu và thông tin liên hệ các trạm.
- **Trò chuyện Trực tiếp (P2P Messaging)**: Nút *"Nhắn tin cho người đăng"* trên trang chi tiết thú cưng và bài đăng cứu hộ giúp mở cuộc trò chuyện trực tiếp giữa người nhận nuôi và chủ bài đăng.
- **Kênh Hỗ trợ với Quản trị viên**: Gửi yêu cầu trợ giúp hoặc phản ánh trực tiếp đến Admin hệ thống.

---

### 5. Báo cáo Vi phạm & Kiểm duyệt Nội dung (Trust & Safety)
- **Báo cáo Tài khoản & Bài đăng**: Người dùng có thể gửi báo cáo vi phạm (thương mại hóa trái phép, thông tin sai lệch, bạo hành) kèm **hình ảnh minh chứng** và mô tả sự việc.
- **Xác thực Danh tính (Identity Verification)**: Xác thực số điện thoại và thông tin cá nhân của người đăng tin nhằm xây dựng môi trường an toàn và tin cậy.

---

### 6. Không gian Làm việc Người dùng & Quản trị (Workspaces & Dashboards)

#### Không gian Người dùng (User Workspace):
- **Bảng điều khiển cá nhân (Dashboard)**: Thống kê bài đăng thú cưng, hồ sơ nhận nuôi đang xử lý, lịch hẹn sắp tới.
- **Quản lý Bài đăng**: Tạo mới và theo dõi trạng thái (*Chờ duyệt, Đang tìm chủ, Đã có chủ*), quản lý tối đa 4 hình ảnh mỗi bài.
- **Quản lý Đơn & Lịch hẹn**: Xem chi tiết đơn gửi đi và đơn nhận được, phê duyệt hoặc từ chối đơn, tạo lịch hẹn gặp mặt.
- **Cam kết & Nhật ký Check-in**: Ký cam kết điện tử và cập nhật nhật ký hình ảnh định kỳ sau nhận nuôi.

#### Cổng Quản trị Hệ thống (Admin Portal):
- **Dashboard Thống kê**: Biểu đồ phễu tăng trưởng, phân bố nhận nuôi theo khu vực và hiệu suất tiếp nhận cứu trợ.
- **Kiểm duyệt Bài đăng Thú cưng & Cứu trợ**:
  - Giao diện xem chi tiết bài đăng đồng bộ giữa User và Admin.
  - Bắt buộc nhập lý do từ chối (*Decline reason*) khi từ chối phê duyệt bài đăng.
- **Quản lý Báo cáo Vi phạm**: Tiếp nhận và xử lý tố cáo kèm ảnh bằng chứng thực tế, khóa tài khoản hoặc gỡ bỏ bài đăng vi phạm.
- **Nhật ký Hệ thống (Audit Logs)**: Ghi nhận thông tin tài khoản Admin nào đã trực tiếp xử lý từng tác vụ kiểm duyệt.

---

### 7. Chiến dịch Cam kết "Nói Không Với Thịt Chó Mèo"
- Trang tuyên truyền nâng cao nhận thức cộng đồng về quyền động vật và phòng chống bệnh dại.
- Bộ đếm chữ ký cam kết tương tác thời gian thực (*Live Pledge Counter*) ghi nhận sự đồng hành của cộng đồng.

---

## Cấu trúc Thư mục Monorepo

```
PetcareHub/
├── frontend/                       # Client Frontend Application
│   ├── public/                     # Logo, favicon, tài nguyên tĩnh
│   ├── src/
│   │   ├── assets/                 # Hình ảnh, SVG icons
│   │   ├── components/             # UI Components (Chat, Modals, Layout, Rescue, User)
│   │   ├── context/                # React Contexts (Auth, Data, Language, Theme)
│   │   ├── data/                   # Mock Data & Dữ liệu mẫu khởi tạo
│   │   ├── locales/                # Đa ngôn ngữ (Tiếng Việt `vi.ts`, Tiếng Anh `en.ts`)
│   │   ├── pages/                  # Public Pages, User Workspace & Admin Portal Pages
│   │   ├── types/                  # Types & Interfaces phía client
│   │   ├── utils/                  # Helper format tiền tệ, dịch địa chỉ, tính ngày
│   │   ├── App.tsx                 # Root Component & Điều hướng Routing
│   │   ├── main.tsx                # Entrypoint Client
│   │   └── index.css               # Tailwind CSS & Global Styling
│   ├── package.json                # @petcare-hub/frontend
│   ├── vite.config.ts              # Cấu hình Vite & Rolldown Bundler
│   ├── tailwind.config.js          # Cấu hình Tailwind CSS
│   └── tsconfig.json
│
├── backend/                        # Backend Microservices System
│   ├── api-gateway/                # Reverse Proxy tập trung điều hướng (Port 8000)
│   │   ├── src/server.js
│   │   ├── Dockerfile
│   │   └── package.json
│   ├── services/
│   │   ├── auth-service/           # User Auth, JWT & Phân quyền RBAC (Port 8001)
│   │   ├── pet-service/            # Quản lý Thú cưng & Quy trình Nhận nuôi (Port 8002)
│   │   ├── rescue-service/         # Hotline SOS, Trạm Cứu hộ & Quỹ Lương thực (Port 8003)
│   │   └── chat-service/           # WebSocket Real-time Chat (Port 8004)
│   ├── docker-compose.yml          # Điều phối Containers (Postgres, Mongo, Redis, Services)
│   └── README.md
│
├── packages/                       # Shared Packages
│   └── shared/                     # Types, Models & DTOs dùng chung (@petcare-hub/shared)
│       ├── src/types/              # pet.ts, rescue.ts, user.ts, shelter.ts, chat.ts,...
│       └── src/index.ts
│
├── docs/                           # Tài liệu Dự án
│   └── architecture.md             # Sơ đồ thiết kế hệ thống & Quy chuẩn API
├── .github/workflows/deploy.yml    # CI/CD GitHub Actions Deploy Frontend lên GitHub Pages
├── package.json                    # Monorepo Workspaces Orchestrator
└── .gitignore
```

---

## Kiến trúc Backend Microservices

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

## Hướng dẫn Cài đặt & Khởi chạy

### 1. Yêu cầu Hệ thống:
- **Node.js**: Phiên bản 18 trở lên (Khuyến nghị Node.js 20 LTS)
- **npm**: Phiên bản 9 trở lên
- **Docker & Docker Compose** *(nếu khởi chạy cụm Microservices & Databases)*

### 2. Cài đặt Dependencies:
Tại thư mục gốc của dự án:
```bash
npm install
```

### 3. Khởi chạy Môi trường Phát triển (Frontend):
```bash
# Khởi chạy từ thư mục gốc:
npm run dev

# Hoặc chạy trực tiếp gói frontend:
npm run dev:frontend
```
> Ứng dụng web chạy tại: **`http://localhost:5173/petcare-hub/`**

### 4. Đóng gói Bản Production (Build Frontend):
```bash
npm run build
```

### 5. Khởi chạy Toàn bộ Backend Microservices & Databases (Docker):
```bash
cd backend
docker compose up --build
```
