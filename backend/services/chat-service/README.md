# PetCare Hub - Chat & Real-Time Messaging Service

## Responsibilities
- Real-time peer-to-peer WebSocket messaging (Adopter <-> Pet Poster/Shelter)
- User to Admin Helpdesk communication channel
- 24/7 automated rescue AI assistant message routing
- In-app notification broadcasting

## Port
- **Port**: `8004`
- **Protocols**: HTTP REST + WebSocket (Socket.io)
- **Database**: Redis (Cache / PubSub) + MongoDB (`petcare_chat_db`)
