# Petcare Hub — Platform Cứu trợ & Nhận nuôi Thú cưng (Microservices Monorepo)

Petcare Hub là nền tảng cộng đồng phi lợi nhuận hướng tới việc chung tay giúp đỡ những bạn nhỏ khi gặp khó khăn, bị nạn, cần nơi an toàn hoặc tìm kiếm một mái ấm yêu thương.

Dự án được cấu trúc theo mô hình **Monorepo Microservices** phân tách độc lập giữa **Frontend** và **Backend**, giúp các thành viên trong nhóm phát triển độc lập, ngăn ngừa tối đa rủi ro xung đột mã nguồn (Git merge conflicts).

---

## 📁 Cấu trúc Thư mục Monorepo

```
PetcareHub/
├── frontend/                       # Giao diện Web (React 19 + TypeScript + Tailwind CSS)
│   ├── public/                     # Tài nguyên tĩnh (logo, icons, metadata)
│   ├── src/                        # Mã nguồn UI (Components, Contexts, Pages, Utils, Locales)
│   ├── package.json                # @petcare-hub/frontend
│   ├── vite.config.ts              # Cấu hình Vite & Rolldown
│   └── tsconfig.json
│
├── backend/                        # Hệ thống Microservices Backend
│   ├── api-gateway/                # Cổng điều hướng tập trung Reverse Proxy (Port 8000)
│   ├── services/
│   │   ├── auth-service/           # Xác thực & Phân quyền người dùng (Port 8001)
│   │   ├── pet-service/            # Quản lý thú cưng & Quy trình nhận nuôi 5 bước (Port 8002)
│   │   ├── rescue-service/         # SOS khẩn cấp, Trạm cứu hộ & Quỹ lương thực (Port 8003)
│   │   └── chat-service/           # Tin nhắn Real-time WebSocket & Trợ lý cứu hộ (Port 8004)
│   ├── docker-compose.yml          # Điều phối toàn bộ Containers & Databases (Postgres, Mongo, Redis)
│   └── README.md
│
├── packages/                       # Thư viện dùng chung (Shared Domain Modules)
│   └── shared/                     # TypeScript Types, DTOs & Constants (@petcare-hub/shared)
│
├── docs/                           # Tài liệu thiết kế hệ thống & Hướng dẫn
│   └── architecture.md
├── package.json                    # Workspaces Orchestrator ở cấp Root
└── .gitignore
```

---

## 🚀 Hướng dẫn Cài đặt & Khởi chạy

### 1. Cài đặt toàn bộ dependencies:
Tại thư mục gốc của dự án:
```bash
npm install
```

### 2. Khởi chạy Frontend (React + Vite):
```bash
# Chạy từ thư mục gốc:
npm run dev

# Hoặc:
npm run dev:frontend
```
Ứng dụng Frontend sẽ chạy tại: `http://localhost:5173/petcare-hub/`

### 3. Đóng gói Frontend cho Production:
```bash
npm run build
```

### 4. Khởi chạy Backend Microservices (với Docker Compose):
```bash
cd backend
docker compose up --build
```

---

## 🛡️ Lợi ích ngăn ngừa Git Conflict

1. **Phân định rõ phạm vi (Domain Boundaries)**: Frontend team chỉ chỉnh sửa bên trong thư mục `frontend/`, Backend team chỉ chỉnh sửa trong `backend/services/<service-name>/`.
2. **Kiểu dữ liệu chuẩn hóa (Shared Types)**: Mọi Type/DTO dùng chung giữa FE và BE được quản lý tập trung tại `packages/shared/`.
3. **CI/CD Độc lập**: GitHub Actions tự động build `frontend/` và deploy lên GitHub Pages mà không bị phụ thuộc vào mã nguồn Backend.
