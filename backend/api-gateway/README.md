# PetCare Hub - API Gateway

## Overview
The **API Gateway** serves as the central reverse proxy and entry point for all frontend client applications. It decouples the React frontend from individual backend microservices, handling routing, rate limiting, and CORS.

## Port & Endpoints
- **Default Port**: `8000`
- **Healthcheck**: `GET /health`

### Route Mapping
| Frontend Path Prefix | Destination Microservice | Internal Port |
| :--- | :--- | :--- |
| `/api/v1/auth/*` | `auth-service` | `8001` |
| `/api/v1/users/*` | `auth-service` | `8001` |
| `/api/v1/pets/*` | `pet-service` | `8002` |
| `/api/v1/applications/*` | `pet-service` | `8002` |
| `/api/v1/appointments/*` | `pet-service` | `8002` |
| `/api/v1/rescues/*` | `rescue-service` | `8003` |
| `/api/v1/shelters/*` | `rescue-service` | `8003` |
| `/api/v1/donations/*` | `rescue-service` | `8003` |
| `/api/v1/chat/*` | `chat-service` | `8004` |
| `/ws` (WebSocket) | `chat-service` | `8004` |

## Getting Started
```bash
npm install
npm run dev
```
