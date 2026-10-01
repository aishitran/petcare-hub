# PetCare Hub - System Architecture & Monorepo Guide

## Monorepo Directory Structure

```
PetcareHub/
├── .github/
│   └── workflows/
│       └── deploy.yml              # CI/CD workflow for building frontend & deploy to GitHub Pages
├── frontend/                       # =================== FRONTEND APP ===================
│   ├── public/                     # Static assets (logo.png, favicon, etc.)
│   ├── src/                        # React 19 + TypeScript + Tailwind CSS UI
│   │   ├── components/             # Reusable UI widgets & layouts
│   │   ├── context/                # Global React contexts (Auth, Data, Language, Theme)
│   │   ├── data/                   # Initial / mock datasets
│   │   ├── locales/                # Vietnamese / English localization
│   │   ├── pages/                  # Public, User Workspace & Admin pages
│   │   ├── types/                  # Local TypeScript type declarations
│   │   ├── utils/                  # Helper utilities & address translators
│   │   ├── App.tsx                 # Root application component
│   │   └── main.tsx                # Client entrypoint
│   ├── index.html
│   ├── package.json                # @petcare-hub/frontend
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   └── tsconfig.json
├── backend/                        # =================== BACKEND MICROSERVICES ==========
│   ├── api-gateway/                # Entrypoint Reverse Proxy (:8000)
│   ├── services/
│   │   ├── auth-service/           # User Auth & Permissions (:8001)
│   │   ├── pet-service/            # Pet Listings & Adoption (:8002)
│   │   ├── rescue-service/         # SOS Hotlines & Shelter Network (:8003)
│   │   └── chat-service/           # Real-time WebSocket Messaging (:8004)
│   ├── docker-compose.yml          # Container orchestration for all microservices & DBs
│   └── README.md
├── packages/                       # =================== SHARED PACKAGES ================
│   └── shared/                     # Shared TypeScript models, interfaces & DTOs
│       ├── src/
│       │   ├── types/
│       │   └── index.ts
│       └── package.json            # @petcare-hub/shared
├── package.json                    # Monorepo root workspaces orchestrator
├── README.md
└── .gitignore
```

## How This Prevents Git Conflicts
1. **Clear Domain Boundary**: Frontend developers work exclusively inside `frontend/`. Backend developers work in their dedicated service folder (`backend/services/<service-name>/`).
2. **Independent Dependencies**: Each microservice and the frontend maintain their own dependencies in `package.json` while root workspaces manage linking.
3. **Shared Source of Truth**: Shared types and DTOs reside in `packages/shared/` to prevent contract mismatch between client and server.
4. **Isolated Deployments**: Frontend can be deployed independently to GitHub Pages / Vercel without triggering backend rebuilds, and microservices can be deployed as independent Docker containers to Cloud Run / Kubernetes.
