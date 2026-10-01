# PetCare Hub - Backend Microservices Architecture

## Architecture Overview
The PetCare Hub backend is structured as a decentralized, event-ready Microservices Architecture behind a centralized API Gateway.

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

## Services & Ports

| Service | Port | Folder | Responsibility |
| :--- | :--- | :--- | :--- |
| **API Gateway** | `8000` | `backend/api-gateway` | Reverse proxy, route dispatching, rate limiting |
| **Auth Service** | `8001` | `backend/services/auth-service` | User authentication, JWT, RBAC permissions |
| **Pet Service** | `8002` | `backend/services/pet-service` | Pet posts, search/filters, adoption workflow |
| **Rescue Service** | `8003` | `backend/services/rescue-service` | SOS emergencies, shelter directory, food fund |
| **Chat Service** | `8004` | `backend/services/chat-service` | Real-time WebSocket messaging & notifications |

## Running with Docker Compose
To spin up all databases and services in local development:
```bash
cd backend
docker compose up --build
```
